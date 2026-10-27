# Contribuer

Merci de votre intérêt ! Ce Skill est un outil d'aide à l'audit technique, pas un conseil juridique : la rigueur des sources prime.

## Règles

1. **Sources officielles uniquement** : [CNIL](https://www.cnil.fr), [RGPD (EUR-Lex)](https://eur-lex.europa.eu/eli/reg/2016/679/oj), [CEPD/EDPB](https://www.edpb.europa.eu), [directive ePrivacy](https://eur-lex.europa.eu/eli/dir/2002/58/oj), documentation officielle du format Agent Skills et des agents compatibles.
2. **Ne jamais inventer de référence** (article, délibération, numéro de guide). En cas de doute, renvoyer vers le site officiel et marquer « à vérifier ». Tout nouveau lien officiel doit être inscrit dans le tableau « Sources et date de vérification » de `references/rgpd-principles.md`.
3. **Lecture seule par défaut** : aucune modification du Skill ne doit permettre d'écrire, supprimer ou transmettre des données sans autorisation explicite de l'utilisateur.
4. **Pas de données réelles** dans les exemples : uniquement des données fictives (domaines `example.com`, secrets masqués).
5. **Pas de formulation de certification** : un audit automatisé ne déclare jamais une application « conforme ».
6. Garder le skill générique (tout projet logiciel) et indépendant d'un agent particulier ; ne citer un agent que pour une différence concrète d'installation, d'invocation ou de lecture seule.
7. Le règlement européen sur l'IA est hors périmètre : ne citer aucun de ses articles.
8. Conserver la distinction entre *constat technique avéré*, *risque potentiel* et *vérification juridique ou organisationnelle*. Le skill ne conclut jamais à une violation du RGPD : il décrit des faits techniques et des risques.

## Processus

- Ouvrez une issue pour discuter d'un changement important.
- Une branche par sujet, une Pull Request décrivant la source officielle utilisée.
- Mettez à jour `CHANGELOG.md`.
- Testez systématiquement le skill sur les deux projets de `tests/fixtures/` (`demo-app-vulnerable` et `demo-app-secure`) et mettez à jour leur `EXPECTED.md` si le comportement attendu change.
- Vérifiez : front matter de `SKILL.md` valide (`name`, `description`), liens fonctionnels, `SKILL.md` concis (< 500 lignes), détails déportés dans `references/`.

## Licence

En contribuant, vous acceptez que votre contribution soit publiée sous licence MIT.
