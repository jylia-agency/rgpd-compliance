#!/usr/bin/env python3
"""Validate repository structure and expected test fixtures."""

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[2]
ERRORS = []


def fail(path, message):
    ERRORS.append(f"{path}: {message}")


def repository_files():
    return (
        path
        for path in ROOT.rglob("*")
        if path.is_file() and ".git" not in path.relative_to(ROOT).parts
    )


def validate_skill_frontmatter():
    path = ROOT / "SKILL.md"
    text = path.read_text(encoding="utf-8")
    match = re.match(r"\A---\s*\n(.*?)\n---(?:\s*\n|\Z)", text, re.DOTALL)
    if not match:
        fail("SKILL.md", "frontmatter YAML introuvable ou invalide")
        return
    frontmatter = match.group(1)
    if not re.search(r"^name:\s*rgpd-audit\s*$", frontmatter, re.MULTILINE):
        fail("SKILL.md", "le frontmatter doit contenir name: rgpd-audit")
    description = re.search(
        r"^description:\s*(.*?)\s*$", frontmatter, re.MULTILINE
    )
    if not description or not description.group(1).strip("\"' "):
        fail("SKILL.md", "le frontmatter doit contenir une description non vide")


def validate_markdown():
    markdown_files = [path for path in repository_files() if path.suffix.lower() == ".md"]
    link_pattern = re.compile(r"(?<!!)\[[^\]]*\]\(([^)]+)\)")
    quoted_path_pattern = re.compile(r"`((?:references|templates|examples)/[^`]+)`")

    for path in markdown_files:
        relative = path.relative_to(ROOT)
        text = path.read_text(encoding="utf-8", errors="replace")
        for line_number, line in enumerate(text.splitlines(), start=1):
            if "\u2014" in line:
                fail(relative, f"tiret cadratin interdit à la ligne {line_number}")

        for match in link_pattern.finditer(text):
            destination = match.group(1).strip().split()[0].strip("<>")
            parsed = urlsplit(destination)
            if parsed.scheme or destination.startswith("//"):
                continue
            target = unquote(parsed.path)
            target_path = (path.parent / target).resolve() if target else path
            if not target_path.is_file():
                fail(relative, f"lien relatif sans fichier existant : {destination}")

        for match in quoted_path_pattern.finditer(text):
            target = match.group(1).rstrip(".,;:)")
            if not (ROOT / target).exists():
                fail(relative, f"chemin cité introuvable : {target}")


def validate_secret_patterns():
    patterns = re.compile(
        re.escape("sk_" + "live_")
        + r"|"
        + re.escape("sk_" + "test_")
        + r"|"
        + re.escape("ey" + "J")
        + r"[A-Za-z0-9]{10,}"
        + r"|"
        + re.escape("-----" + "BEGIN")
    )
    for path in repository_files():
        relative = path.relative_to(ROOT)
        text = path.read_bytes().decode("utf-8", errors="replace")
        for line_number, line in enumerate(text.splitlines(), start=1):
            if relative.as_posix() == "SKILL.md" and ("sk_" + "live_" + "****") in line:
                continue
            if patterns.search(line):
                fail(relative, f"motif ressemblant à un secret à la ligne {line_number}")


def split_table_row(line):
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def validate_expected_files():
    allowed = {
        "Nature attendue": {
            "Constat technique avéré",
            "Risque potentiel",
            "À vérifier (juridique/organisationnel)",
            "Information",
        },
        "Gravité minimale": {"Critique", "Élevée", "Moyenne", "Faible", "Information"},
        "Confiance attendue": {"Élevé", "Moyen", "Faible"},
    }

    for expected in ROOT.glob("tests/fixtures/*/EXPECTED.md"):
        relative = expected.relative_to(ROOT)
        lines = expected.read_text(encoding="utf-8").splitlines()
        header_index = None
        headers = []
        for index, line in enumerate(lines):
            if line.lstrip().startswith("|"):
                headers = split_table_row(line)
                if "Fichier" in headers and "Nature attendue" in headers:
                    header_index = index
                    break
        if header_index is None:
            fail(relative, "tableau attendu avec colonnes Fichier et Nature attendue introuvable")
            continue

        fixture_root = expected.parent
        for line in lines[header_index + 2 :]:
            if not line.lstrip().startswith("|"):
                break
            cells = split_table_row(line)
            if len(cells) != len(headers):
                fail(relative, "nombre de cellules incohérent dans le tableau")
                continue
            row = dict(zip(headers, cells))
            for column, valid_values in allowed.items():
                value = row.get(column, "")
                parts = [part.strip() for part in value.split("+")]
                if not value or any(part not in valid_values for part in parts):
                    fail(relative, f"valeur invalide dans « {column} » : {value}")

            file_cell = row.get("Fichier", "")
            if "(absent)" in file_cell or "(hors code)" in file_cell:
                continue
            for cited_path in re.findall(r"`([^`]+)`", file_cell):
                if not (fixture_root / cited_path).is_file():
                    fail(relative, f"fichier cité introuvable dans le banc : {cited_path}")


def validate_alias_imports():
    import_pattern = re.compile(r"(?:\bfrom\s*)?['\"]@/([^'\"]+)['\"]")
    for source_root in ROOT.glob("tests/fixtures/*/src"):
        for source in source_root.rglob("*"):
            if not source.is_file() or source.suffix not in {".ts", ".tsx"}:
                continue
            text = source.read_text(encoding="utf-8", errors="replace")
            for match in import_pattern.finditer(text):
                module = match.group(1)
                base = source_root / module
                candidates = [base] if base.suffix in {".ts", ".tsx"} else [
                    base.with_suffix(".ts"),
                    base.with_suffix(".tsx"),
                    base / "index.ts",
                ]
                if not any(candidate.is_file() for candidate in candidates):
                    relative = source.relative_to(ROOT)
                    fail(relative, f"import alias @/{module} introuvable")


def main():
    validate_skill_frontmatter()
    validate_markdown()
    validate_secret_patterns()
    validate_expected_files()
    validate_alias_imports()
    if ERRORS:
        print("\n".join(ERRORS), file=sys.stderr)
        return 1
    print("Validation OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
