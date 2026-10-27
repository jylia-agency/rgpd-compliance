# Principes du RGPD – aide-mémoire pour l'audit technique

Texte officiel : [Règlement (UE) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj). Ce document est un résumé non exhaustif ; le texte officiel fait foi.

## Principes (article 5)

| Article | Principe | Traduction technique à rechercher |
|---|---|---|
| 5.1.a | Licéité, loyauté, transparence | Information des personnes, consentement tracé, pas de traceurs cachés |
| 5.1.b | Limitation des finalités | Réutilisation de données pour d'autres usages (analytics, IA, marketing) |
| 5.1.c | Minimisation | Champs collectés inutiles, `select *`, API sur-exposées |
| 5.1.d | Exactitude | Possibilité de rectification, synchronisation des copies |
| 5.1.e | Limitation de la conservation | Absence de purge/TTL, soft-delete perpétuel, sauvegardes et logs sans rétention |
| 5.1.f | Intégrité et confidentialité | Authentification, autorisation, chiffrement, RLS, secrets |
| 5.2 | Responsabilité (accountability) | Registre, preuves, journalisation, documentation |

## Autres articles utiles

| Article | Sujet |
|---|---|
| 4.5 | Pseudonymisation : les données pseudonymisées restent des données personnelles |
| 6 | Bases légales (consentement, contrat, obligation légale, intérêts vitaux, mission d'intérêt public, intérêt légitime) – **à confirmer par le responsable de traitement** |
| 7 | Conditions du consentement (preuve, retrait aussi simple que le don) |
| 8 | Consentement des enfants (services de la société de l'information) : 16 ans par défaut, abaissable jusqu'à 13 ans (France 15 ans, voir `national-law.md`) |
| 9 / 10 | Catégories particulières de données / données pénales |
| 12 | Modalités d'exercice des droits : délai d'un mois, prorogeable de deux mois selon la complexité et le nombre de demandes, avec information de la personne dans le premier mois (12.3) |
| 13 / 14 | Information des personnes (collecte directe / indirecte) |
| 15 à 22 | Droits : accès (15), rectification (16), effacement (17), limitation (18), notification (19), portabilité (20), opposition (21), décision automatisée (22) |
| 22 (condition) | Décision fondée exclusivement sur un traitement automatisé et produisant des effets juridiques ou affectant la personne de manière significative ; un scoring avec intervention humaine réelle n'entre pas automatiquement dans ce cadre |
| 20 (condition) | Portabilité : uniquement si traitement fondé sur le consentement ou un contrat **et** effectué par des moyens automatisés |
| 24 | Responsabilité du responsable de traitement |
| 25 | Protection des données dès la conception et par défaut |
| 26 / 28 | Responsables conjoints / sous-traitants (contrat requis) |
| 27 | Représentant dans l'UE (responsable ou sous-traitant non établi dans l'Union) |
| 30.1 / 30.2 | Registre des activités de traitement du responsable (30.1) / du sous-traitant (30.2) |
| 32 | Sécurité du traitement |
| 33 / 34 | Notification des violations à l'autorité (72 h après en avoir pris connaissance) / aux personnes ; 33.5 : documentation de toutes les violations, même non notifiées |
| 35 / 36 | Analyse d'impact (AIPD/DPIA) / consultation préalable ; 35.7 : contenu minimal de l'AIPD |
| 37 à 39 | Délégué à la protection des données ; 37.1.a : désignation obligatoire pour les autorités ou organismes publics |
| 44 à 49 | Transferts hors Union européenne ; 45 : décisions d'adéquation (vérifier la liste en vigueur, dont le cadre UE-États-Unis) |

## Rôle de l'organisation auditée

Le rôle (responsable de traitement, responsable conjoint, sous-traitant) est **à déterminer ou à vérifier** : il n'est pas déductible du code seul. Il conditionne le registre (30.1 ou 30.2), les obligations d'information et l'application de l'art. 28. Un même organisme peut cumuler plusieurs rôles selon les traitements.

## Textes complémentaires

ePrivacy et droit national : voir `national-law.md`.

## Hors périmètre

Le règlement européen sur l'IA n'est pas couvert : aucun article ni constat à ce titre. Mention au plus une fois, dans les limites du rapport.

## Ce qui est observable dans le code vs. non observable

| Observable (analyse statique) | Non observable → « à vérifier » |
|---|---|
| Schéma, RLS, authentification, logs, SDK tiers, endpoints de droits | Rôle de l'organisation (responsable/sous-traitant), droit national applicable, base légale, contrats art. 28, clauses/garanties de transfert, DPO, politique de confidentialité, durées légales, procédure de violation |

## Règle de rédaction

Cite un article uniquement s'il figure ci-dessus ou si tu l'as vérifié dans le texte officiel. Ne cite jamais un numéro de considérant, de délibération ou de lignes directrices dont tu n'es pas certain.

## Sources et date de vérification

| Source | URL | Date de vérification |
|---|---|---|
| RGPD | https://eur-lex.europa.eu/eli/reg/2016/679/oj | 2026-10-27 |
| Directive ePrivacy 2002/58/CE | https://eur-lex.europa.eu/eli/dir/2002/58/oj | 2026-10-27 |
| Loi n° 78-17 Informatique et Libertés | https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000886460 | à vérifier |

Les liens ne sont ajoutés ou vérifiés que par les mainteneurs ; l'agent n'en ajoute ni n'en fabrique jamais.
