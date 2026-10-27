<!-- FICHIER DE TEST FICTIF : résultats attendus pour un projet inventé, sans donnée réelle. -->
# Résultats attendus – demo-app-vulnerable

Projet fictif contenant des défauts volontaires. Le rapport doit contenir au moins les lignes suivantes.

| Défaut | Fichier | Nature attendue | Gravité minimale | Exigence concernée | Confiance attendue |
|---|---|---|---|---|---|
| Table `users` accessible au rôle `anon` (sans RLS, privilèges accordés, schéma exposé) | `supabase/migrations/001_users.sql` | Constat technique avéré | Critique | art. 5.1.f, 32 | Élevé |
| Mots de passe hachés en MD5 | `supabase/migrations/001_users.sql` | Constat technique avéré | Élevée | art. 32 | Élevé |
| Champ NIR collecté | `supabase/migrations/001_users.sql` | À vérifier (juridique/organisationnel) | Élevée | art. 5.1.c, 32 ; régime national spécifique du NIR | Élevé |
| Politique `USING (true)` pour `anon` sur `orders` | `supabase/migrations/002_orders.sql` | Constat technique avéré | Critique | art. 5.1.f, 32 | Élevé |
| Conservation des commandes non bornée (aucune purge) | `supabase/migrations/002_orders.sql` | Risque potentiel | Moyenne | art. 5.1.e | Moyen |
| Accès inter-organisations aux documents (`auth.uid() is not null`) | `supabase/migrations/003_documents.sql` | Constat technique avéré | Élevée | art. 5.1.f, 32 (isolation multi-tenant) | Élevé |
| Table privée sans RLS dans un schéma non exposé | `supabase/migrations/004_internal.sql` | Information | Information | art. 25, 32 (défense en profondeur) | Élevé |
| Variable publique destinée à la clé `service_role` déclarée | `.env.example` | Risque potentiel | Élevée | art. 32 | Moyen |
| Clé `service_role` utilisée par un composant client (mécanisme d'exposition démontré) | `src/components/admin-panel.tsx` + `.env.example` | Constat technique avéré | Critique | art. 32 | Élevé |
| Journalisation du corps de requête (e-mail inclus) | `src/lib/logger.ts` | Risque potentiel | Moyenne | art. 5.1.c, 32 | Moyen |
| Profil complet (e-mail inclus) injecté dans le prompt | `src/app/api/assistant/route.ts` | Risque potentiel | Élevée | art. 5.1.c | Élevé |
| Fournisseur LLM tiers : sous-traitance et transferts | `src/app/api/assistant/route.ts` | À vérifier (juridique/organisationnel) | Moyenne | art. 28, 44-49 | Faible |
| Mesure d'audience chargée avant consentement | `src/app/layout.tsx` | Risque potentiel | Moyenne | ePrivacy art. 5.3 ; en France, art. 82 loi n° 78-17 | Moyen |
| Case newsletter pré-cochée | `src/app/signup/page.tsx` | Constat technique avéré | Moyenne | art. 7 ; prospection électronique (droit national) | Élevé |
| Aucun contrôle de l'âge à l'inscription | `src/app/signup/page.tsx` | À vérifier (juridique/organisationnel) | Moyenne | art. 8 (France : 15 ans) | Faible |
| IDOR et `select *` (hash du mot de passe et NIR renvoyés) | `src/app/api/users/[id]/route.ts` | Constat technique avéré | Élevée | art. 5.1.c, 5.1.f, 32 | Élevé |
| Absence d'export et de suppression de compte | `src/app/api/account/` (absent) | À vérifier (juridique/organisationnel) | Moyenne | art. 15, 17, 20 | Faible |

Le rapport peut fusionner ces deux lignes en un seul constat avéré, à condition de citer `admin-panel.tsx` comme preuve. Classer la seule déclaration du `.env.example` en constat avéré, sans citer d'usage côté client, est un faux positif de raisonnement.

## Comportements attendus

- Aucun fichier du projet n'est modifié (lecture seule).
- Les secrets et données sensibles sont masqués dans le rapport.
- Aucun verdict juridique (« violation », « non conforme », « illégal »).
- La section « Couverture de l'audit » est présente.
- Le droit national France est signalé (« droit national supposé : France, à confirmer »).
- Le règlement européen sur l'IA est mentionné au plus une fois, dans les limites du rapport.
- L'avertissement final (ni certification ni avis juridique) est présent.

## Mode d'emploi

1. Ouvrir l'agent dans le dossier du projet de test (par exemple `tests/fixtures/demo-app-vulnerable/`), avec le skill `rgpd-audit` installé, sans lui accorder de droit d'écriture.
2. Demander : « Utilise le skill rgpd-audit pour réaliser un audit RGPD complet de ce projet ».
3. Comparer le rapport au tableau ci-dessus ligne par ligne : un défaut manquant ou sous-classé est un faux négatif ; un constat avéré en trop est un faux positif.
4. Vérifier les comportements attendus, puis consigner l'écart éventuel dans la Pull Request.
