# Changelog

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), versionnement [SemVer](https://semver.org/lang/fr/).

## [Non publié]

### Ajouté
- Workflow `release.yml` : création automatique du tag et de la release à partir du CHANGELOG.

## [0.3.2] - 2026-10-27
### Ajouté
- Archive de release `rgpd-audit-vX.Y.Z.zip` prête à importer (dossier racine `rgpd-audit`, sans bancs de test ni fichiers de développement, via `.gitattributes`).
- CI de validation structurelle (`validate.yml`) : frontmatter, liens, tirets cadratins, motifs de secrets, cohérence des `EXPECTED.md` et des bancs de test.
- Dossier `tests/results/` et modèle de consignation des audits réellement exécutés.
- Cas de test `admin-panel.tsx` : clé `service_role` utilisée côté client.
### Modifié
- Secrets : classification selon l'usage côté client ; une variable déclarée dans un fichier d'exemple sans usage est un risque potentiel, pas un constat avéré.

## [0.3.1] - 2026-10-27

### Corrigé
- Bancs de test : `.env.example` versionnés (exception dans `.gitignore`), modules manquants du projet sécurisé ajoutés, cas du schéma privé rendu explicite (REVOKE).
- Constats attendus précisés : envoi au LLM scindé (minimisation / sous-traitance et transferts), éléments attendus sans constat dans le projet sécurisé.
- README : environnement sans accès réseau sortant, niveau de confiance ; SKILL.md : mention conditionnelle du DPO.
- Projet sécurisé : route d'inscription alignée sur le schéma (Supabase Auth + table `profiles`), preuve du consentement datée et versionnée.

## [0.3.0] - 2026-10-27

### Ajouté
- Bancs de test fictifs `tests/fixtures/demo-app-vulnerable/` et `tests/fixtures/demo-app-secure/` (Next.js + Supabase), avec `EXPECTED.md` (résultats attendus et mode d'emploi).
- Champs de constat : exposition, preuves, niveau de confiance (Élevé/Moyen/Faible), méthode de vérification.
- Section obligatoire « Couverture de l'audit » dans le rapport et l'exemple.
- Règle « Pas de verdict juridique » et procédure d'évaluation de l'exposition réelle (Supabase RLS en 4 vérifications).
- Section « Isolation entre clients (multi-tenant) » dans la checklist de sécurité ; détection de l'évaluation de personnes (art. 5.1.d, 22 conditionnel, 35).
- Tableau « Sources et date de vérification » dans `references/rgpd-principles.md`.

### Modifié
- L'ancienne nature de constat « établie » devient « Constat technique avéré » ; « Principe RGPD » devient « Exigence concernée » (point d'attention, jamais manquement).
- Classification selon l'exposition réelle : exposition non établie = risque potentiel.
- Pseudonymisation (art. 4.5), art. 22 précisé, détermination de l'État membre, self-service présenté comme bonne pratique.
- Exemple RGPD-001 refait avec un correctif SQL complet ; README et CONTRIBUTING mis à jour (tests sur les deux fixtures).

## [0.2.1] - 2026-10-27

### Corrigé
- Lecture seule renforcée via `disallowed-tools` pour les agents qui le prennent en charge (`allowed-tools` pré-autorise mais ne restreint pas).
- Installation présentée en un tableau unique multi-agents, avec usage possible par tout LLM ayant accès au code.
- Règle de citation des textes nationaux (Légifrance) et détermination préalable de l'État membre.
- Registre du sous-traitant : identification du sous-traitant (art. 30.2.a).
- Exemptions ePrivacy art. 5.3 complétées ; rôle « responsable conjoint » dans le rapport.

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
