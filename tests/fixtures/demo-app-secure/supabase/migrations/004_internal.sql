-- FICHIER DE TEST FICTIF : données et code inventés, ne pas utiliser en production.
-- Table interne dans un schéma non exposé par l'API (voir config.toml : seul `public` est exposé).
create schema if not exists private;

create table private.internal_notes (
  id bigint generated always as identity primary key,
  author_email text not null, -- ex. agent@example.com
  note text not null,
  created_at timestamptz not null default now()
);
-- RLS non activée : l'accès passe uniquement par le serveur.
