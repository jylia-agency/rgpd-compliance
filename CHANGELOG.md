# Changelog

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), versionnement [SemVer](https://semver.org/lang/fr/).

## [Non publié]

## [0.2.0] - 2026-10-27

### Ajouté
- `references/national-law.md` : droit national et textes complémentaires (directive ePrivacy art. 5.3 et 13, repères français, règle de rédaction).
- Compatibilité multi-agents (Claude Code, Codex et agents compatibles Agent Skills) : installation et invocation documentées.
- Registre en deux parties (responsable art. 30.1, sous-traitant art. 30.2) ; section « Consentement, traceurs et prospection » dans la checklist.

### Modifié
- Corrections juridiques : art. 12.3 (délai d'un mois prorogeable), art. 20 (portabilité conditionnelle), art. 30.1/30.2, art. 33.5, art. 35.7, art. 37.1.a, art. 45, art. 8 (seuil national), art. 27.
- Modèle d'AIPD structuré selon l'art. 35.7 ; seuil de deux critères, consultation préalable (art. 36) et avis du DPO.
- Rapport d'audit : rôle de l'organisation, droit national appliqué, traceurs et prospection.
- Formulations neutralisées : lecture seule générique, README et CONTRIBUTING indépendants d'un agent particulier.

### Périmètre
- Le règlement européen sur l'IA est exclu : aucun article ni constat ; mention unique dans les limites du rapport.

## [0.1.0] - 2026-10-27

### Ajouté
- `SKILL.md` : Skill `rgpd-audit` (audit RGPD en lecture seule, méthodologie en 9 étapes).
- `references/` : principes du RGPD, repères CNIL, checklist sécurité, privacy by design, IA et données personnelles.
- `templates/` : rapport d'audit, registre des traitements, analyse de risques, plan de remédiation.
- `examples/example-audit.md` : exemple d'audit fictif.
- `README.md`, `CONTRIBUTING.md`, `LICENSE` (MIT), `.gitignore`.
