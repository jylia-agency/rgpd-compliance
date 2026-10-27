-- FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
create table public.documents (
  id bigint generated always as identity primary key,
  org_id uuid not null,
  title text not null,
  content text,
  created_at timestamptz not null default now()
);

alter table public.documents enable row level security;

-- Tout utilisateur connecté lit les documents de toutes les organisations.
create policy "documents_select" on public.documents
  for select to authenticated using (auth.uid() is not null);
create policy "documents_write" on public.documents
  for insert to authenticated with check (auth.uid() is not null);
