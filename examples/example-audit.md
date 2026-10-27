# Rapport d'audit RGPD technique – « DemoShop » (exemple fictif)

> Exemple **fictif** : application, chemins, valeurs et numéros de ligne sont inventés à titre d'illustration.

| | |
|---|---|
| **Date** | 2026-01-15 |
| **Périmètre** | Dépôt `demoshop` (Next.js 14, Supabase, Stripe, OpenAI) |
| **Hors périmètre** | Production, contrats, politique de confidentialité |

> ⚠️ Audit technique automatisé : ni certification, ni avis juridique.

## Synthèse

| Gravité | Non-conformités établies | Risques potentiels | À vérifier |
|---|---|---|---|
| Critique | 1 | 0 | 0 |
| Élevée | 0 | 1 | 1 |
| Moyenne | 0 | 1 | 1 |

Données identifiées : identité, e-mail, adresse de livraison, historique de commandes, messages envoyés à un assistant IA.

## Constats

### RGPD-001 – Table `orders` sans RLS
| Champ | Valeur |
|---|---|
| Nature | Non-conformité établie |
| Gravité | Critique |
| Localisation | `supabase/migrations/002_orders.sql:1-18` |
| Principe | Intégrité et confidentialité (art. 5.1.f), sécurité (art. 32) |
| Statut | Ouvert |

**Observé** : la table `public.orders` (nom, adresse, e-mail) est créée sans `ENABLE ROW LEVEL SECURITY` ; aucune politique dans les migrations.
**Recommandation** :
```sql
alter table public.orders enable row level security;
create policy "orders_select_own" on public.orders
  for select to authenticated using (auth.uid() = user_id);
```
Tester avec deux utilisateurs distincts. Vérifier qu'aucune clé `service_role` n'est utilisée côté client.

### RGPD-002 – Conservation des commandes non bornée
| Nature | Risque potentiel | Gravité | Élevée |
|---|---|---|---|
| Localisation | `supabase/migrations/002_orders.sql` ; aucun job de purge trouvé | Principe | Art. 5.1.e |

**Observé** : aucun champ d'expiration ni tâche de purge/anonymisation.
**Recommandation** : faire définir les durées par le responsable de traitement (obligations comptables à vérifier), puis planifier une purge/anonymisation.

### RGPD-003 – Messages utilisateurs envoyés à un LLM tiers
| Nature | À vérifier (juridique/orga.) | Gravité | Élevée |
|---|---|---|---|
| Localisation | `src/app/api/assistant/route.ts:22-40` | Principe | Art. 5.1.c, 28, 44-49 |

**Observé** : l'objet utilisateur complet (e-mail inclus) est injecté dans le prompt.
**Recommandation** : n'envoyer que le texte nécessaire ; vérifier contrat de sous-traitance, localisation et conditions de rétention/entraînement du fournisseur ; mentionner dans l'information des personnes.

### RGPD-004 – Journaux contenant des e-mails
| Nature | Risque potentiel | Gravité | Moyenne |
|---|---|---|---|
| Localisation | `src/lib/logger.ts:8` | Principe | Art. 5.1.c, 32 |

**Observé** : `console.log` du corps de requête (valeurs non reproduites ici). **Recommandation** : masquer/pseudonymiser et définir une rétention des logs.

### RGPD-005 – Absence d'endpoint d'export/suppression de compte
| Nature | À vérifier | Gravité | Moyenne |
|---|---|---|---|
| Localisation | `src/app/api/` (aucune route correspondante trouvée) | Principe | Art. 15, 17, 20 |

**Observé** : aucun mécanisme dans le code ; une procédure manuelle peut exister (à confirmer).

## Plan d'action

| Priorité | Constat | Action |
|---|---|---|
| Immédiate | RGPD-001 | Activer RLS + politiques, tester |
| Court terme | RGPD-004 | Masquer les PII dans les logs |
| Court terme | RGPD-003 | Minimiser le prompt ; vérifier contrat/transfert |
| Moyen terme | RGPD-002, 005 | Définir durées, purge, export/suppression |

*Cet audit technique automatisé ne constitue ni une certification ni un avis juridique.*
