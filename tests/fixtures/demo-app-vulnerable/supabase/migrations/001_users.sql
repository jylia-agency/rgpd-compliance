-- FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
create table public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null, -- ex. jeanne@example.com
  full_name text,
  birth_date date,
  nir text, -- numéro d'inscription au répertoire (fictif)
  password_hash text not null default md5('motdepasse-fictif'),
  created_at timestamptz not null default now()
);

-- Pas de ROW LEVEL SECURITY ; privilèges accordés au rôle anonyme.
grant select, insert, update, delete on public.users to anon;
