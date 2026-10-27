# Checklist de sécurité technique (art. 32 RGPD)

Pour chaque point : ✅ constaté OK · ❌ constat · ❓ non vérifiable. Fichier/ligne à citer, valeurs sensibles masquées.

## Authentification
- [ ] Mots de passe hachés avec algorithme adapté (argon2id, bcrypt, scrypt) – jamais en clair ni MD5/SHA1 simple
- [ ] MFA disponible pour comptes sensibles/administrateurs
- [ ] Limitation des tentatives, verrouillage ou délai progressif
- [ ] Sessions/JWT : expiration, rotation, révocation, secret robuste ; cookies `HttpOnly`, `Secure`, `SameSite`
- [ ] Réinitialisation de mot de passe : jeton à usage unique, expirant, sans énumération de comptes

## Autorisation
- [ ] Contrôle d'accès côté serveur sur chaque route/Server Action/fonction
- [ ] Vérification de propriété de l'objet (anti-IDOR) ; principe du moindre privilège
- [ ] Séparation des rôles admin/utilisateur ; pas de contrôle uniquement côté client

## API
- [ ] Réponses limitées aux champs nécessaires (DTO/`select` explicite), pas de hash, tokens, champs internes
- [ ] Authentification sur endpoints exposant des données personnelles
- [ ] CORS restrictif ; pagination et limitation de débit ; validation des entrées
- [ ] Données personnelles absentes des URL/query strings (logs, referrers)
- [ ] Erreurs sans fuite de données ou de stack trace

## Base de données
- [ ] Comptes applicatifs aux droits minimaux ; pas de superutilisateur applicatif
- [ ] Requêtes paramétrées / ORM
- [ ] Chiffrement en transit (TLS) et au repos ; colonnes très sensibles : chiffrement applicatif à envisager
- [ ] Sauvegardes chiffrées, durée de rétention définie, test de restauration
- [ ] Environnements de test sans données réelles (ou anonymisées)
- [ ] Mécanisme de purge/archivage/anonymisation (jobs, TTL, `pg_cron`…)

## Supabase / PostgreSQL RLS
- [ ] Table de données personnelles sans `ENABLE ROW LEVEL SECURITY` : établir l'exposition réelle par **4 vérifications** avant de classer :
  1. **Schéma exposé** : le schéma (`public` par défaut) est-il exposé par l'API auto-générée (PostgREST) ? (configuration Supabase, `config.toml`)
  2. **Privilèges** : les rôles `anon` / `authenticated` disposent-ils de `GRANT` sur la table (ou de privilèges par défaut) ? Un `REVOKE` les retire-t-il ?
  3. **Clé publique** : la clé publique (`anon`) est-elle utilisée côté client, ou la table n'est-elle accessible que côté serveur avec une clé privée ?
  4. **Autres contrôles** : vue intermédiaire, fonction `SECURITY DEFINER`, proxy/API applicative, filtrage réseau qui empêchent l'accès direct ?
- Classification selon l'exposition réelle :
  - schéma exposé + privilèges accordés + aucun autre contrôle → **Constat technique avéré**, gravité **Critique** (rôle `anon`) ou **Élevée** (rôle `authenticated` seul) ;
  - exposition non déterminable depuis le périmètre analysé → **Risque potentiel**, avec les vérifications à faire ;
  - schéma non exposé ou privilèges révoqués → **Information**, avec recommandation de défense en profondeur (activer RLS malgré tout).
- [ ] Politiques explicites par opération (SELECT/INSERT/UPDATE/DELETE) ; `UPDATE` avec `USING` **et** `WITH CHECK`
- [ ] Couverture complète des opérations : SELECT, INSERT, UPDATE (`USING` + `WITH CHECK`) et DELETE couverts, sans opération laissée ouverte par une politique permissive
- [ ] Pas de `USING (true)` / `WITH CHECK (true)` pour le rôle `anon` ou `authenticated` sur données personnelles (même logique de classification selon l'exposition réelle : schéma exposé + privilèges + pas d'autre contrôle → avéré, Critique pour `anon` / Élevée pour `authenticated` ; exposition non déterminable → risque potentiel ; non exposé ou révoqué → Information)
- [ ] `service_role` et fonctions `SECURITY DEFINER` examinés **séparément** : ils contournent la RLS, donc leurs usages (serveur uniquement, contrôle d'accès applicatif, `search_path` fixé) se vérifient à part
- [ ] Politiques fondées sur `auth.uid()` ; éviter `user_metadata` modifiable par l'utilisateur pour l'autorisation
- [ ] Clé `service_role` jamais dans le client, ni dans `NEXT_PUBLIC_*`, ni dans le dépôt ; seule la clé `anon` est publique
- [ ] Vues : `security_invoker = true` (sinon contournement possible de la RLS selon la version)
- [ ] Fonctions `SECURITY DEFINER` : `search_path` fixé, droits `EXECUTE` limités
- [ ] Storage : buckets privés par défaut, politiques sur `storage.objects`, URLs signées à durée limitée
- [ ] Tables/colonnes exposées via l'API auto-générée (PostgREST) volontairement
- [ ] Tests des politiques avec différents rôles (anon, utilisateur A, utilisateur B)
- Vérifier la documentation officielle Supabase pour les comportements dépendant de la version.

## Isolation entre clients (multi-tenant)
- [ ] Chaque table de données client porte un identifiant d'organisation/client (`org_id`, `tenant_id`…) non nul
- [ ] Les politiques RLS (ou le filtrage serveur) vérifient l'appartenance à l'organisation via une table de membres, et non une valeur fournie par le client
- [ ] Aucune lecture ou écriture inter-organisations possible (jointures, vues, fonctions, Storage, exports) ; pas de `USING (true)` sur les données d'une organisation
- [ ] Tests avec deux organisations distinctes : un utilisateur de l'organisation A ne voit, ne modifie ni ne supprime aucune donnée de l'organisation B

## Secrets et configuration
- [ ] Aucun secret dans le dépôt/historique ; `.env` ignoré par git ; secrets gérés par coffre/variables CI
- [ ] Pas de secret dans le bundle client (`NEXT_PUBLIC_*`, `VITE_*`, `REACT_APP_*`)
- Pour une variable destinée à un secret (ex. clé `service_role`), distinguer :
  - valeur réelle de secret présente dans le dépôt ou son historique : Constat technique avéré, Critique (ne jamais reproduire la valeur) ;
  - variable publique (`NEXT_PUBLIC_*`, `VITE_*`, `REACT_APP_*`) désignée pour un secret et référencée par du code exécuté côté client : Constat technique avéré, Critique, mécanisme d'exposition démontré (toute valeur affectée à la variable est publiée dans le code envoyé au navigateur) ; la valeur réellement utilisée en production reste à vérifier ;
  - variable publique désignée pour un secret déclarée seulement dans un fichier d'exemple ou de configuration, sans usage côté client trouvé : Risque potentiel, gravité Élevée à Critique, confiance Moyenne ;
  - une valeur d'exemple ou fictive ne prouve jamais une fuite ; c'est l'usage dans le code qui établit le mécanisme d'exposition.
- [ ] `DEBUG` désactivé en production ; dépendances à jour (audits de dépendances tels que `npm audit` ou `pip-audit` : à lancer uniquement sur autorisation explicite de l'utilisateur)

## Journalisation et traçabilité
- [ ] Journalisation des accès/actions sensibles (connexion, export, suppression, changement de droits, accès admin)
- [ ] Logs sans mots de passe, jetons, données de santé ou payloads complets ; PII masquée/pseudonymisée
- [ ] Logs horodatés, protégés contre altération, accès restreint, **durée de rétention définie**
- [ ] Capacité de détecter et documenter toute violation, y compris non notifiée (art. 33.5)

## Droits des personnes
- [ ] Accès (art. 15) et export ; portabilité (art. 20) seulement si traitement fondé sur le consentement ou un contrat **et** automatisé : format structuré, lisible par machine
- [ ] Rectification, effacement (y compris sous-traitants, sauvegardes, index de recherche, caches), opposition, retrait du consentement
- [ ] Vérification d'identité proportionnée avant exercice ; traçabilité des demandes
- [ ] Délai d'un mois, prorogeable de deux mois selon la complexité et le nombre de demandes (art. 12.3)
- [ ] Un self-service n'est pas exigé : son absence est à signaler « à vérifier » (processus manuel possible)

## Consentement, traceurs et prospection (voir `national-law.md`)
- [ ] Traceurs et SDK : aucun dépôt/lecture avant consentement sauf strictement nécessaires (ePrivacy art. 5.3 ; France : art. 82 loi Informatique et Libertés)
- [ ] Refus aussi simple que l'acceptation
- [ ] Retrait du consentement possible à tout moment, aussi simplement que le don
- [ ] Preuve du consentement conservée (horodatage, version du texte)
- [ ] Mineurs : seuil d'âge national du consentement numérique (art. 8 ; France 15 ans) pris en compte si base consentement
- [ ] Prospection électronique : opt-in préalable pour les particuliers selon le droit national, pas de case pré-cochée, désinscription dans chaque message

## Transferts internationaux (indices)
- [ ] SDK/API tiers (analytics, e-mail, paiement, monitoring, IA, CDN, polices web) : localisation de l'hébergement et du fournisseur → **à vérifier** (art. 44–49)
- [ ] Pour chaque transfert hors UE : décision d'adéquation ou garanties appropriées identifiées → **à vérifier**
