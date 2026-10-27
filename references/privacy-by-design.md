# Protection des données dès la conception et par défaut (art. 25)

Source : [RGPD art. 25](https://eur-lex.europa.eu/eli/reg/2016/679/oj) ; lignes directrices du [CEPD](https://www.edpb.europa.eu) sur la protection des données dès la conception (vérifier la version en vigueur).

## Questions à poser au code

| Thème | Question | Indice technique |
|---|---|---|
| Minimisation | Chaque champ est-il nécessaire à la finalité ? | Formulaires, colonnes jamais lues |
| Paramètres par défaut | Le réglage le plus protecteur est-il par défaut ? | Profils publics, cases pré-cochées, analytics activés avant consentement |
| Limitation de conservation | Une durée et un mécanisme de purge existent-ils ? | `deleted_at`, `expires_at`, jobs cron, TTL |
| Pseudonymisation / anonymisation | Les identifiants directs sont-ils séparés ? | Tables d'analytics, jeux de test |
| Séparation | Données sensibles isolées, accès restreint ? | Schémas/tables séparés, RLS |
| Transparence | L'utilisateur voit-il quelles données sont collectées ? | Pages de profil, centre de confidentialité |
| Contrôle | Les droits sont-ils exerçables en self-service ? Le self-service est une bonne pratique, pas une obligation générale : son absence est « à vérifier » (processus manuel possible) | Export, suppression de compte |
| Sécurité | Mesures proportionnées aux risques ? | Voir `security-checklist.md` |

## Patterns de correction

- **DTO/serializers** : ne renvoyer que les champs nécessaires.
- **Purge planifiée** : job quotidien supprimant/anonymisant selon la durée définie par le responsable de traitement.
- **Suppression de compte** : cascade maîtrisée + propagation aux sous-traitants + gestion des sauvegardes (expiration).
- **Journal d'audit** : événements sans données personnelles superflues (identifiants techniques plutôt que valeurs).
- **Consentement** : stocker version du texte, date, finalité, choix ; chargement conditionnel des scripts tiers.

Les durées et bases légales sont des décisions du responsable de traitement : le Skill les propose comme **points à valider**.
