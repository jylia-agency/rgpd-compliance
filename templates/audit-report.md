# Rapport d'audit RGPD technique – [Nom du projet]

| | |
|---|---|
| **Date** | AAAA-MM-JJ |
| **Version du rapport** | 1.0 |
| **Commit / version analysé(e)** | [hash] |
| **Auditeur** | Skill `rgpd-audit` exécuté par [agent utilisé, ex. Claude Code, Codex], analyse statique, lecture seule |
| **Rôle de l'organisation** | [responsable / responsable conjoint / sous-traitant], à confirmer |
| **Droit national appliqué** | France par défaut, à confirmer |
| **Périmètre** | [dépôts, dossiers, environnements analysés] |
| **Hors périmètre / non consulté** | [production, données réelles, contrats, politique de confidentialité…] |

> ⚠️ Cet audit technique automatisé ne constitue ni une certification de conformité ni un avis juridique. Il doit être complété par le responsable de traitement et, le cas échéant, le DPO. Aucune qualification juridique n'est portée : les constats décrivent des faits techniques et des risques.

## 1. Synthèse

- Stack : [frameworks, BDD, hébergement, services tiers]
- Données personnelles identifiées : [catégories]

| Gravité | Constats techniques avérés | Risques potentiels | À vérifier (juridique/orga.) |
|---|---|---|---|
| Critique | 0 | 0 | 0 |
| Élevée | 0 | 0 | 0 |
| Moyenne | 0 | 0 | 0 |
| Faible | 0 | 0 | 0 |

## Couverture de l'audit

- Fichiers et zones analysés : [liste]
- Éléments non consultés : [production, données réelles, contrats…]
- Vérifications non réalisables par analyse statique : [exposition réelle, configuration hébergeur…]
- Limites de confiance : [constats à confirmer, niveau de confiance Faible]

L'absence de constat dans une zone non analysée ne signifie pas l'absence de risque.

## 2. Cartographie des traitements
Voir [registre des traitements](processing-register.md) ou tableau résumé :

| Traitement | Données | Stockage | Sous-traitants / transferts | Durée de conservation |
|---|---|---|---|---|
| | | | | |

## 3. Constats

### RGPD-001 – [Titre]
| Champ | Valeur |
|---|---|
| **Nature** | Constat technique avéré / Risque potentiel / À vérifier (juridique/organisationnel) |
| **Gravité** | Critique / Élevée / Moyenne / Faible / Information |
| **Localisation** | `chemin/fichier.ext:L10-L25` |
| **Exigence concernée** | [ex. art. 32] (point d'attention, jamais un manquement) |
| **Exposition** | [qui peut accéder à quoi, dans quelles conditions, ou « non déterminée »] |
| **Preuves** | `fichier:ligne` (valeurs sensibles masquées) |
| **Niveau de confiance** | Élevé / Moyen / Faible |
| **Méthode de vérification** | [comment le constat a été établi ou comment le confirmer] |
| **Statut** | Ouvert |

**Description** : …

**Éléments observés** (valeurs sensibles masquées) : …

**Recommandation** : …

## 4. Points nécessitant une vérification juridique ou organisationnelle

| ID | Sujet | Question pour le responsable de traitement |
|---|---|---|
| | Rôle (responsable/sous-traitant) | |
| | Base légale | |
| | Information des personnes (art. 13-14) | |
| | Traceurs et prospection (droit national) | |
| | Contrats sous-traitants (art. 28) | |
| | Transferts hors UE (art. 44-49) | |
| | AIPD (art. 35) | |

## 5. Plan d'action
Voir [plan de remédiation](remediation-plan.md).

## 6. Vérification des corrections

| ID | Statut avant | Statut après | Preuve (fichier:ligne) | Date |
|---|---|---|---|---|

## 7. Limites
Analyse statique du code fourni ; aucune exécution, aucun accès aux données réelles ; absence de constat ≠ conformité. Le règlement européen sur l'IA est hors périmètre ; si le projet est concerné par l'IA : évaluation au titre du règlement IA à réaliser séparément.

## 8. Sources
[RGPD](https://eur-lex.europa.eu/eli/reg/2016/679/oj) · [CNIL](https://www.cnil.fr) · [CEPD](https://www.edpb.europa.eu) · [Directive ePrivacy 2002/58/CE](https://eur-lex.europa.eu/eli/dir/2002/58/oj)
