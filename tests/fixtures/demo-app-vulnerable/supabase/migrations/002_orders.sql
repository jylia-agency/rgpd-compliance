-- FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
create table public.orders (
  id bigint generated always as identity primary key,
  user_id uuid not null,
  customer_name text not null,
  shipping_address text not null,
  customer_email text not null, -- ex. client@example.com
  created_at timestamptz not null default now()
  -- Aucune date d'expiration, aucune purge prévue.
);

alter table public.orders enable row level security;
grant select, insert, update, delete on public.orders to anon, authenticated;

create policy "orders_all" on public.orders
  for all to anon, authenticated using (true) with check (true);
