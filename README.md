# rgpd-compliance – Skill RGPD pour Claude Code

Skill open source (`rgpd-audit`) permettant à [Claude Code](https://docs.claude.com/en/docs/claude-code/skills) d'**auditer techniquement un projet** au regard de la protection des données personnelles : identification des données, cartographie des traitements, détection des risques, recommandations de correction et génération de rapport.

> ⚠️ Outil d'aide à l'audit technique. Il ne constitue **ni une certification de conformité RGPD, ni un avis juridique**.

## Objectifs et fonctionnalités

| Fonction | Détail |
|---|---|
| Données personnelles | Identification dans schémas, modèles, formulaires, API |
| Cycle de vie | Collecte, utilisation, stockage, suppression, conservation excessive |
| Authentification / autorisation | Hachage, sessions, MFA, IDOR, rôles |
| API | Sur-exposition de champs, endpoints non protégés |
| Bases de données | Accès, droits, chiffrement, sauvegardes |
| Supabase | Revue des politiques RLS, `service_role`, vues, Storage |
| IA | Données envoyées aux LLM, RAG, décisions automatisées |
| Droits des personnes | Accès, export, rectification, effacement, opposition |
| Journalisation | Traçabilité, PII dans les logs, rétention |
| Transferts | Repérage de services tiers potentiellement hors UE (à vérifier) |
| Livrables | Rapport, registre des traitements, analyse de risques, plan de remédiation |

Technologies : React, Next.js, Node.js, Python, PostgreSQL, Supabase et autres stacks courantes.

## Méthodologie

Découverte → Identification des données → Cartographie → Sécurité → Risques → Classification par gravité → Corrections → Rapport → Vérification après validation.

Chaque constat comporte : identifiant (`RGPD-NNN`), description, fichier/lignes, éléments observés, principe RGPD, gravité, recommandation, statut. Les constats sont distingués en **non-conformités établies**, **risques potentiels** et **points à vérifier juridiquement/organisationnellement**.

## Prérequis

- Claude Code installé ([documentation officielle](https://docs.claude.com/en/docs/claude-code/overview))
- Un projet à auditer, accessible localement
- Aucune dépendance supplémentaire

## Installation

Un Skill est un dossier contenant un `SKILL.md`. Voir la [documentation Anthropic sur les Skills](https://docs.claude.com/en/docs/claude-code/skills).

**Pour tous vos projets (niveau utilisateur)** :
```bash
git clone https://github.com/jylia-agency/rgpd-compliance.git ~/.claude/skills/rgpd-audit
```

**Pour un seul projet** :
```bash
git clone https://github.com/jylia-agency/rgpd-compliance.git .claude/skills/rgpd-audit
```

Redémarrez Claude Code si nécessaire. Le dossier doit porter le nom du Skill (`rgpd-audit`).

## Exemples de commandes

Le Skill est invoqué automatiquement selon votre demande, ou explicitement via `/rgpd-audit`.

| Besoin | Exemple |
|---|---|
| Audit complet | `/rgpd-audit Réalise un audit RGPD complet de ce projet` |
| Supabase | `Examine les politiques RLS de supabase/migrations avec le skill rgpd-audit` |
| Conservation | `Détecte les risques de conservation excessive dans ce projet` |
| IA | `Identifie les données personnelles envoyées à des API d'IA` |
| Registre | `Génère un projet de registre des traitements` |
| Vérification | `Vérifie les corrections des constats RGPD-001 à RGPD-003` |

## Exemple de rapport

Extrait (voir [examples/example-audit.md](examples/example-audit.md)) :

| ID | Gravité | Nature | Localisation | Constat |
|---|---|---|---|---|
| RGPD-001 | Critique | Non-conformité établie | `supabase/migrations/002_orders.sql:1-18` | Table `orders` sans RLS |
| RGPD-002 | Élevée | Risque potentiel | `supabase/migrations/002_orders.sql` | Conservation non bornée |
| RGPD-003 | Élevée | À vérifier | `src/app/api/assistant/route.ts:22-40` | Données envoyées à un LLM tiers |

## Comportement et sécurité

- **Lecture seule par défaut** (outils `Read`, `Grep`, `Glob`).
- Aucune modification, suppression ou envoi de données sans autorisation explicite.
- Secrets et données personnelles masqués dans les rapports.
- Jamais de déclaration de conformité intégrale.

## Structure du dépôt

```text
SKILL.md                 Définition du Skill
references/              Principes RGPD, CNIL, sécurité, privacy by design, IA
templates/               Rapport, registre, analyse de risques, plan de remédiation
examples/example-audit.md Exemple fictif
```

## Limites

- Analyse statique : pas d'exécution, pas d'accès aux données de production.
- Ne détermine pas les bases légales, les contrats de sous-traitance, les garanties de transfert, le besoin de DPO ou d'AIPD.
- Sortie générée par un modèle d'IA : faux positifs/négatifs possibles, à relire par un humain.
- Le droit et les recommandations évoluent : vérifier les sources officielles.

## Sources réglementaires

- CNIL : <https://www.cnil.fr>
- RGPD : <https://eur-lex.europa.eu/eli/reg/2016/679/oj>
- CEPD / EDPB : <https://www.edpb.europa.eu>
- Skills Claude Code : <https://docs.claude.com/en/docs/claude-code/skills>

## Contribuer

Voir [CONTRIBUTING.md](CONTRIBUTING.md). Historique : [CHANGELOG.md](CHANGELOG.md).

## Licence

[MIT](LICENSE)
