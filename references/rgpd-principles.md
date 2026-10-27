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
| 6 | Bases légales (consentement, contrat, obligation légale, intérêts vitaux, mission d'intérêt public, intérêt légitime) – **à confirmer par le responsable de traitement** |
| 7 | Conditions du consentement (preuve, retrait aussi simple que le don) |
| 8 | Consentement des enfants (services de la société de l'information) |
| 9 / 10 | Catégories particulières de données / données pénales |
| 12 à 14 | Transparence et information des personnes |
| 15 à 22 | Droits : accès (15), rectification (16), effacement (17), limitation (18), notification (19), portabilité (20), opposition (21), décision automatisée (22) |
| 24 | Responsabilité du responsable de traitement |
| 25 | Protection des données dès la conception et par défaut |
| 26 / 28 | Responsables conjoints / sous-traitants (contrat requis) |
| 30 | Registre des activités de traitement |
| 32 | Sécurité du traitement |
| 33 / 34 | Notification des violations à l'autorité (72 h) / aux personnes |
| 35 / 36 | Analyse d'impact (AIPD/DPIA) / consultation préalable |
| 37 à 39 | Délégué à la protection des données |
| 44 à 49 | Transferts hors Union européenne |

## Ce qui est observable dans le code vs. non observable

| Observable (analyse statique) | Non observable → « à vérifier » |
|---|---|
| Schéma, RLS, authentification, logs, SDK tiers, endpoints de droits | Base légale, contrats art. 28, clauses/garanties de transfert, DPO, politique de confidentialité, durées légales, procédure de violation |

## Règle de rédaction

Cite un article uniquement s'il figure ci-dessus ou si tu l'as vérifié dans le texte officiel. Ne cite jamais un numéro de considérant, de délibération ou de lignes directrices dont tu n'es pas certain.
