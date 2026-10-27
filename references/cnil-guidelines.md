# Repères CNIL

Source : [cnil.fr](https://www.cnil.fr). Les contenus CNIL évoluent : **vérifier la version en vigueur** avant de la citer. Ce fichier ne reproduit pas les textes et ne cite pas de numéros de délibération ; il liste des thèmes à rechercher sur le site officiel.

| Thème | Où chercher sur cnil.fr | Usage dans l'audit |
|---|---|---|
| Sécurité des données personnelles | Guide « La sécurité des données personnelles » | Mesures de sécurité (authentification, sauvegardes, journalisation, chiffrement) |
| Mots de passe | Recommandations relatives aux mots de passe et à l'authentification multifacteur | Politique de mots de passe, MFA, stockage haché |
| Cookies et traceurs | Lignes directrices et recommandation « cookies et autres traceurs » | Bandeau, consentement avant dépôt, refus aussi simple que l'acceptation, durée de validité (à vérifier) |
| Durées de conservation | Pages « limiter la conservation des données » et référentiels sectoriels | Définir durée active / archivage intermédiaire / suppression |
| Registre des traitements | Modèle de registre CNIL | `templates/processing-register.md` |
| AIPD | Outil PIA et liste des traitements nécessitant une AIPD | Décider de l'opportunité d'une AIPD |
| Droits des personnes | Fiches « les droits pour maîtriser vos données » | Endpoints d'accès/export/effacement, délai d'un mois (art. 12.3 RGPD) |
| Violations de données | Page « notifier une violation de données » | Journalisation et détection ; procédure = à vérifier |
| Développeurs | Guide RGPD du développeur | Pratiques de développement |
| Intelligence artificielle | Rubrique « IA » et recommandations sur le développement de systèmes d'IA | `references/ai-data-protection.md` |
| Transferts | Pages « transférer des données hors de l'UE » | Repérage des sous-traitants hors UE |

## Précautions

- Ne pas affirmer qu'une durée précise est « imposée par la CNIL » sans l'avoir vérifiée sur le référentiel applicable.
- Distinguer droit (RGPD, loi Informatique et Libertés) et recommandations/bonnes pratiques.
- Compléter par le [CEPD / EDPB](https://www.edpb.europa.eu) (lignes directrices européennes).
