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
- [ ] `ENABLE ROW LEVEL SECURITY` sur toute table du schéma exposé (`public`) contenant des données personnelles
- [ ] Politiques explicites par opération (SELECT/INSERT/UPDATE/DELETE) ; `UPDATE` avec `USING` **et** `WITH CHECK`
- [ ] Pas de `USING (true)` / `WITH CHECK (true)` pour le rôle `anon` ou `authenticated` sur données personnelles
- [ ] Politiques fondées sur `auth.uid()` ; éviter `user_metadata` modifiable par l'utilisateur pour l'autorisation
- [ ] Clé `service_role` jamais dans le client, ni dans `NEXT_PUBLIC_*`, ni dans le dépôt ; seule la clé `anon` est publique
- [ ] Vues : `security_invoker = true` (sinon contournement possible de la RLS selon la version)
- [ ] Fonctions `SECURITY DEFINER` : `search_path` fixé, droits `EXECUTE` limités
- [ ] Storage : buckets privés par défaut, politiques sur `storage.objects`, URLs signées à durée limitée
- [ ] Tables/colonnes exposées via l'API auto-générée (PostgREST) volontairement
- [ ] Tests des politiques avec différents rôles (anon, utilisateur A, utilisateur B)
- Vérifier la documentation officielle Supabase pour les comportements dépendant de la version.

## Secrets et configuration
- [ ] Aucun secret dans le dépôt/historique ; `.env` ignoré par git ; secrets gérés par coffre/variables CI
- [ ] Pas de secret dans le bundle client (`NEXT_PUBLIC_*`, `VITE_*`, `REACT_APP_*`)
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
