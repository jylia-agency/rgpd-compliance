<!-- FICHIER DE TEST FICTIF : résultats attendus pour un projet inventé, sans donnée réelle. -->
# Résultats attendus – demo-app-secure

Projet fictif corrigé (mêmes fichiers que `demo-app-vulnerable`, défauts corrigés).

**Aucun Constat technique avéré n'est attendu.** Tout autre constat avéré est un faux positif.

| Défaut | Fichier | Nature attendue | Gravité minimale | Exigence concernée | Confiance attendue |
|---|---|---|---|---|---|
| Table privée sans RLS dans un schéma non exposé | `supabase/migrations/004_internal.sql` | Information | Information | art. 25, 32 (défense en profondeur) | Élevé |
| Base légale des traitements non déterminable | (hors code) | À vérifier (juridique/organisationnel) | Moyenne | art. 6 | Faible |
| Contrats de sous-traitance (dont fournisseur LLM) non déterminables | `src/app/api/assistant/route.ts` | À vérifier (juridique/organisationnel) | Moyenne | art. 28 | Faible |
| Transferts hors UE non déterminables | `src/app/api/assistant/route.ts` | À vérifier (juridique/organisationnel) | Moyenne | art. 44-49 | Faible |
| Information des personnes non déterminable | (hors code) | À vérifier (juridique/organisationnel) | Moyenne | art. 13-14 | Faible |

## Comportements attendus

- Aucun fichier du projet n'est modifié (lecture seule).
- Les secrets et données sensibles sont masqués dans le rapport.
- Aucun verdict juridique (« violation », « non conforme », « illégal »).
- La section « Couverture de l'audit » est présente.
- Le droit national France est signalé (« droit national supposé : France, à confirmer »).
- Le règlement européen sur l'IA est mentionné au plus une fois, dans les limites du rapport.
- L'avertissement final (ni certification ni avis juridique) est présent.

## Mode d'emploi

1. Ouvrir l'agent dans le dossier du projet de test (par exemple `tests/fixtures/demo-app-secure/`), avec le skill `rgpd-audit` installé, sans lui accorder de droit d'écriture.
2. Demander : « Utilise le skill rgpd-audit pour réaliser un audit RGPD complet de ce projet ».
3. Comparer le rapport au tableau ci-dessus ligne par ligne : un défaut manquant ou sous-classé est un faux négatif ; un constat avéré en trop est un faux positif.
4. Vérifier les comportements attendus, puis consigner l'écart éventuel dans la Pull Request.
