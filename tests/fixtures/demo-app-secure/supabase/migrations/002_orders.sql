-- FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
create table public.orders (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  shipping_address text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '3 years'
);

alter table public.orders enable row level security;
revoke all on public.orders from anon;

create policy "orders_select_own" on public.orders
  for select to authenticated using (auth.uid() = user_id);
create policy "orders_insert_own" on public.orders
  for insert to authenticated with check (auth.uid() = user_id);
create policy "orders_update_own" on public.orders
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "orders_delete_own" on public.orders
  for delete to authenticated using (auth.uid() = user_id);

-- Purge quotidienne ; la durée est à valider par le responsable de traitement.
select cron.schedule('purge_orders', '0 3 * * *', $$delete from public.orders where expires_at < now()$$);
