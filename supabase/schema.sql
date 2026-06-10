-- Brievify — Schema de base de datos (Supabase)
-- RLS habilitado en todas las tablas. Políticas por auth.uid() mapeado desde el JWT de Clerk.

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text unique not null,
  created_at timestamptz default now()
);

create table if not exists brand_kits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  brand_name text,
  logo_url text,
  color_primary text,
  color_secondary text,
  color_accent text,
  typography_style text check (typography_style in ('moderna', 'serif', 'amigable', 'custom')),
  business_description text,
  tone integer check (tone between 0 and 100),
  visual_style text check (visual_style in ('minimal', 'moderno', 'elegante', 'bold', 'sobrio', 'cálido')),
  updated_at timestamptz default now()
);

create table if not exists shopify_stores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  shop_domain text unique not null,
  access_token text not null, -- cifrado a nivel de aplicación
  active_theme_id bigint,
  connected_at timestamptz default now()
);

create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  store_id uuid references shopify_stores(id),
  page_type text check (page_type in ('home', 'landing', 'collection', 'product')),
  title text,
  sections jsonb default '[]'::jsonb,
  status text check (status in ('draft', 'published', 'discarded')) default 'draft',
  shopify_page_id bigint,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  page_id uuid references pages(id),
  messages jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

-- RLS
alter table profiles enable row level security;
alter table brand_kits enable row level security;
alter table shopify_stores enable row level security;
alter table pages enable row level security;
alter table conversations enable row level security;
