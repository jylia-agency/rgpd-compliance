# IA et protection des données personnelles

Sources : [RGPD](https://eur-lex.europa.eu/eli/reg/2016/679/oj) (notamment art. 5, 6, 13-15, 22, 25, 28, 32, 35, 44-49), rubrique IA de la [CNIL](https://www.cnil.fr), travaux du [CEPD](https://www.edpb.europa.eu).

> **Périmètre** : seul le RGPD appliqué à l'IA est couvert. Le règlement européen sur l'IA est hors périmètre : aucun article ni constat à ce titre. Si le projet est concerné, mentionner une seule fois, dans les limites du rapport : « évaluation au titre du règlement IA à réaliser séparément ».

## Points de détection

| Risque | Indices techniques | Nature par défaut |
|---|---|---|
| Données personnelles envoyées à une API de LLM | Appels `openai`, `anthropic`, `@google/generative-ai`, `mistral`, `langchain`… avec contenus utilisateurs | Risque potentiel ; sous-traitance et transfert = à vérifier |
| Données inutiles dans les prompts | Objet utilisateur complet injecté | Minimisation (art. 5.1.c) |
| Réutilisation pour entraînement/fine-tuning | Export de conversations, datasets | À vérifier (finalité, base légale, information) |
| Journalisation des prompts/réponses | Logs, tables `messages`, outils d'observabilité | Risque potentiel (conservation, accès) |
| Mémoire/RAG/embeddings | Bases vectorielles contenant des PII | Droit à l'effacement à propager aux vecteurs |
| Décision automatisée | Scoring, refus automatique, modération produisant des effets significatifs | À vérifier (art. 22) |
| Données sensibles | Santé, opinions, mineurs en entrée | À vérifier (art. 9, 8), AIPD probable |
| Injection de prompt / fuite | Contexte contenant des données d'autres utilisateurs, outils sans contrôle d'accès | Sécurité (art. 32) |
| Transparence | Utilisateur informé de l'usage de l'IA ? | À vérifier (art. 13-14) |
| Exactitude | Sorties IA stockées comme faits sur une personne | Art. 5.1.d |

## Recommandations types

- Pseudonymiser/anonymiser avant envoi ; n'envoyer que le nécessaire.
- Vérifier les conditions du fournisseur (non-utilisation pour entraînement, rétention, localisation, contrat de sous-traitance).
- Contrôle d'accès appliqué **avant** la construction du contexte (RAG filtré par utilisateur).
- Définir rétention des prompts/réponses ; permettre la suppression.
- Intervention humaine pour décisions à effet significatif.
- Envisager une AIPD (`templates/risk-assessment.md`).
