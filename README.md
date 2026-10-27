# rgpd-compliance – Skill d'audit RGPD pour agents de code IA

Skill open source (`rgpd-audit`) au format ouvert Agent Skills (`SKILL.md`), utilisable notamment avec [Claude Code](https://docs.claude.com/en/docs/claude-code/skills), [OpenAI Codex](https://developers.openai.com/codex/skills) et tout agent compatible, pour **auditer techniquement un projet** au regard de la protection des données personnelles : identification des données, cartographie des traitements, détection des risques, recommandations de correction et génération de rapport.

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

- Un agent compatible Agent Skills (ex. Claude Code ou Codex)
- Un projet à auditer, accessible localement
- Aucune dépendance supplémentaire

## Installation

Un Skill est un dossier contenant un `SKILL.md`. Le dossier doit porter le nom du Skill (`rgpd-audit`). Documentation : [Claude Code](https://docs.claude.com/en/docs/claude-code/skills), [OpenAI Codex](https://developers.openai.com/codex/skills).

### Claude Code

Tous vos projets (niveau utilisateur) :
```bash
git clone https://github.com/jylia-agency/rgpd-compliance.git ~/.claude/skills/rgpd-audit
```

Un seul projet :
```bash
git clone https://github.com/jylia-agency/rgpd-compliance.git .claude/skills/rgpd-audit
```

Invocation automatique selon votre demande, ou explicite via `/rgpd-audit`. La lecture seule est imposée par `allowed-tools` du `SKILL.md`. Redémarrez l'agent si nécessaire.

### OpenAI Codex

Tous vos projets (niveau utilisateur) :
```bash
git clone https://github.com/jylia-agency/rgpd-compliance.git ~/.agents/skills/rgpd-audit
```

Un seul projet :
```bash
git clone https://github.com/jylia-agency/rgpd-compliance.git .agents/skills/rgpd-audit
```

Invocation automatique selon votre demande, ou explicite via `$rgpd-audit` (ou `/skills` pour lister les skills). Pour la lecture seule, lancer de préférence `codex --sandbox read-only`.

### Utiliser les deux agents

Cloner une seule fois dans `~/.agents/skills/rgpd-audit`, puis créer un lien symbolique :
```bash
ln -s ~/.agents/skills/rgpd-audit ~/.claude/skills/rgpd-audit
```

## Exemples de commandes

Le Skill est invoqué automatiquement selon votre demande, ou explicitement avec la syntaxe propre à chaque agent (`/rgpd-audit` pour Claude Code, `$rgpd-audit` pour Codex).

| Besoin | Exemple |
|---|---|
| Audit complet | `Utilise le skill rgpd-audit pour réaliser un audit RGPD complet de ce projet` |
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

- **Lecture seule par défaut** (outils de lecture et de recherche uniquement).
- Note : hors Claude Code, la lecture seule repose sur les consignes du skill et sur le bac à sable de l'agent.
- Aucune modification, suppression ou envoi de données sans autorisation explicite.
- Secrets et données personnelles masqués dans les rapports.
- Jamais de déclaration de conformité intégrale.

## Structure du dépôt

```text
SKILL.md                 Définition du Skill
references/              Principes RGPD, droit national/ePrivacy, CNIL, sécurité, privacy by design, IA (volet RGPD)
templates/               Rapport, registre, analyse de risques, plan de remédiation
examples/example-audit.md Exemple fictif
```

## Limites

- Périmètre : RGPD, ePrivacy et droit national (France par défaut, adaptable à un autre État membre). Le règlement européen sur l'IA n'est pas couvert (skill distinct).
- Analyse statique : pas d'exécution, pas d'accès aux données de production.
- Ne détermine pas les bases légales, les contrats de sous-traitance, les garanties de transfert, le besoin de DPO ou d'AIPD.
- Sortie générée par un modèle d'IA : faux positifs/négatifs possibles, à relire par un humain.
- Le droit et les recommandations évoluent : vérifier les sources officielles.

## Sources réglementaires

- CNIL : <https://www.cnil.fr>
- RGPD : <https://eur-lex.europa.eu/eli/reg/2016/679/oj>
- CEPD / EDPB : <https://www.edpb.europa.eu>
- Skills Claude Code : <https://docs.claude.com/en/docs/claude-code/skills>
- Skills OpenAI Codex : <https://developers.openai.com/codex/skills>

## Contribuer

Voir [CONTRIBUTING.md](CONTRIBUTING.md). Historique : [CHANGELOG.md](CHANGELOG.md).

## Licence

[MIT](LICENSE)
