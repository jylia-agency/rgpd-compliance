-- FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
-- Les mots de passe sont gérés par Supabase Auth (auth.users), jamais stockés ici.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  birth_year int,
  newsletter_opt_in boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
revoke all on public.profiles from anon;

create policy "profiles_select_own" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles
  for delete to authenticated using (auth.uid() = id);
