# Rapport d'audit RGPD technique – « DemoShop » (exemple fictif)

> Exemple **fictif** : application, chemins, valeurs et numéros de ligne sont inventés à titre d'illustration.

| | |
|---|---|
| **Date** | 2026-01-15 |
| **Périmètre** | Dépôt `demoshop` (Next.js 14, Supabase, Stripe, OpenAI) |
| **Hors périmètre** | Production, contrats, politique de confidentialité |

> ⚠️ Audit technique automatisé : ni certification, ni avis juridique.

## Synthèse

| Gravité | Constats techniques avérés | Risques potentiels | À vérifier |
|---|---|---|---|
| Critique | 1 | 0 | 0 |
| Élevée | 0 | 1 | 1 |
| Moyenne | 0 | 1 | 1 |

Données identifiées : identité, e-mail, adresse de livraison, historique de commandes, messages envoyés à un assistant IA.

## Constats

### RGPD-001 – Table `orders` accessible sans authentification
| Champ | Valeur |
|---|---|
| Nature | Constat technique avéré |
| Gravité | Critique |
| Niveau de confiance | Élevé |
| Localisation | `supabase/migrations/002_orders.sql:1-18` |
| Exigence concernée | Intégrité et confidentialité (art. 5.1.f), sécurité (art. 32) : point d'attention |
| Statut | Ouvert |

**Observé** : la table `public.orders` (nom, adresse, e-mail) est créée sans `ENABLE ROW LEVEL SECURITY` ; aucune politique dans les migrations.
**Preuves** : `supabase/migrations/002_orders.sql:1-18` (création de la table, aucun `ENABLE ROW LEVEL SECURITY`) ; `supabase/migrations/002_orders.sql:19` (`grant select, insert, update, delete` au rôle `anon`) ; `src/lib/supabase.ts:4` (clé publique utilisée côté client).
**Exposition** : le schéma `public` est exposé par l'API auto-générée, le rôle `anon` dispose de privilèges sur la table et aucun autre contrôle n'a été trouvé : toute personne disposant de la clé publique peut lire et modifier les commandes sans authentification.
**Exigence concernée** : sécurité du traitement (art. 32) et intégrité et confidentialité (art. 5.1.f), à apprécier par le responsable de traitement.
**Méthode de vérification** : lecture des migrations et de la configuration ; à confirmer par une requête de test avec la clé publique sur un environnement de test (non exécutée dans cet audit).
**Recommandation** :
```sql
alter table public.orders enable row level security;

create policy "orders_select_own" on public.orders
  for select to authenticated using (auth.uid() = user_id);
create policy "orders_insert_own" on public.orders
  for insert to authenticated with check (auth.uid() = user_id);
create policy "orders_update_own" on public.orders
  for update to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "orders_delete_own" on public.orders
  for delete to authenticated using (auth.uid() = user_id);

revoke all on public.orders from anon;
```
Examiner séparément les usages de `service_role` et des fonctions `SECURITY DEFINER` (ils contournent la RLS : serveur uniquement, contrôle d'accès applicatif). Tester avec deux comptes distincts : l'utilisateur A ne doit ni lire, ni modifier, ni supprimer les commandes de l'utilisateur B, et le rôle `anon` ne doit rien obtenir.

### RGPD-002 – Conservation des commandes non bornée
| Nature | Risque potentiel | Gravité | Élevée |
|---|---|---|---|
| Localisation | `supabase/migrations/002_orders.sql` ; aucun job de purge trouvé | Exigence concernée | Art. 5.1.e |
| Niveau de confiance | Moyen | Exposition | Données conservées sans limite de durée visible dans le code |

**Observé** : aucun champ d'expiration ni tâche de purge/anonymisation.
**Recommandation** : faire définir les durées par le responsable de traitement (obligations comptables à vérifier), puis planifier une purge/anonymisation.

### RGPD-003 – Messages utilisateurs envoyés à un LLM tiers
| Nature | À vérifier (juridique/orga.) | Gravité | Élevée |
|---|---|---|---|
| Localisation | `src/app/api/assistant/route.ts:22-40` | Exigence concernée | Art. 5.1.c, 28, 44-49 |
| Niveau de confiance | Élevé | Exposition | Données transmises à un fournisseur tiers (contrat et localisation non vérifiables) |

**Observé** : l'objet utilisateur complet (e-mail inclus) est injecté dans le prompt.
**Recommandation** : n'envoyer que le texte nécessaire ; vérifier contrat de sous-traitance, localisation et conditions de rétention/entraînement du fournisseur ; mentionner dans l'information des personnes.

### RGPD-004 – Journaux contenant des e-mails
| Nature | Risque potentiel | Gravité | Moyenne |
|---|---|---|---|
| Localisation | `src/lib/logger.ts:8` | Exigence concernée | Art. 5.1.c, 32 |
| Niveau de confiance | Moyen | Exposition | Journaux accessibles selon l'hébergeur (non déterminé) |

**Observé** : `console.log` du corps de requête (valeurs non reproduites ici). **Recommandation** : masquer/pseudonymiser et définir une rétention des logs.

### RGPD-005 – Absence d'endpoint d'export/suppression de compte
| Nature | À vérifier | Gravité | Moyenne |
|---|---|---|---|
| Localisation | `src/app/api/` (aucune route correspondante trouvée) | Exigence concernée | Art. 15, 17, 20 |
| Niveau de confiance | Faible | Exposition | Sans objet (une procédure manuelle peut exister) |

**Observé** : aucun mécanisme dans le code ; une procédure manuelle peut exister (à confirmer).

## Couverture de l'audit

- Analysés : migrations `supabase/migrations/`, routes `src/app/api/`, `src/lib/`, variables d'environnement d'exemple.
- Non consultés : production, configuration réelle du projet Supabase, contrats, politique de confidentialité.
- Non vérifiables par analyse statique : exposition effective de l'API, durées de conservation réelles, procédures manuelles de droits.
- Le niveau de confiance reflète ces limites ; l'absence de constat ailleurs ne vaut pas conformité.

## Plan d'action

| Priorité | Constat | Action |
|---|---|---|
| Immédiate | RGPD-001 | Activer RLS + politiques, tester |
| Court terme | RGPD-004 | Masquer les PII dans les logs |
| Court terme | RGPD-003 | Minimiser le prompt ; vérifier contrat/transfert |
| Moyen terme | RGPD-002, 005 | Définir durées, purge, export/suppression |

*Cet audit technique automatisé ne constitue ni une certification ni un avis juridique.*
