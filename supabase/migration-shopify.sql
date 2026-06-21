-- Migración: tabla de tiendas Shopify conectadas
-- Correr en Supabase → SQL Editor

create table if not exists shopify_stores (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references profiles(id) on delete cascade not null unique,
  shop_domain   text not null,
  access_token  text not null,
  scope         text,
  connected_at  timestamptz default now()
);

alter table shopify_stores enable row level security;

create policy "crud own shopify store"
  on shopify_stores for all
  using (
    user_id in (
      select id from profiles
      where clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );
