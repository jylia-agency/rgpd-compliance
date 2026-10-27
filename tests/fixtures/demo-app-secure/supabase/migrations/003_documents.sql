-- FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
create table public.org_members (
  org_id uuid not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  primary key (org_id, user_id)
);
alter table public.org_members enable row level security;
revoke all on public.org_members from anon;
create policy "members_select_own" on public.org_members
  for select to authenticated using (auth.uid() = user_id);

create table public.documents (
  id bigint generated always as identity primary key,
  org_id uuid not null,
  title text not null,
  content text,
  created_at timestamptz not null default now()
);

alter table public.documents enable row level security;
revoke all on public.documents from anon;

-- Accès limité aux membres de l'organisation propriétaire du document.
create policy "documents_select_org" on public.documents
  for select to authenticated
  using (exists (select 1 from public.org_members m where m.org_id = documents.org_id and m.user_id = auth.uid()));
create policy "documents_insert_org" on public.documents
  for insert to authenticated
  with check (exists (select 1 from public.org_members m where m.org_id = documents.org_id and m.user_id = auth.uid()));
create policy "documents_update_org" on public.documents
  for update to authenticated
  using (exists (select 1 from public.org_members m where m.org_id = documents.org_id and m.user_id = auth.uid()))
  with check (exists (select 1 from public.org_members m where m.org_id = documents.org_id and m.user_id = auth.uid()));
create policy "documents_delete_org" on public.documents
  for delete to authenticated
  using (exists (select 1 from public.org_members m where m.org_id = documents.org_id and m.user_id = auth.uid()));
