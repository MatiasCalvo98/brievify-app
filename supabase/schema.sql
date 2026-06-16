-- ============================================================
-- Brievify — Schema v1
-- Pegar completo en Supabase → SQL Editor → Run
-- ============================================================

-- ── profiles ────────────────────────────────────────────────
create table if not exists profiles (
  id              uuid primary key default gen_random_uuid(),
  clerk_user_id   text unique not null,
  email           text,
  onboarding_done boolean default false,
  created_at      timestamptz default now()
);

alter table profiles enable row level security;

create policy "select own profile"
  on profiles for select
  using (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

create policy "insert own profile"
  on profiles for insert
  with check (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

create policy "update own profile"
  on profiles for update
  using (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- ── brand_kits ───────────────────────────────────────────────
create table if not exists brand_kits (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid references profiles(id) on delete cascade not null unique,
  brand_name           text,
  logo_url             text,
  color_primary        text default '#1a1a1a',
  color_secondary      text default '#f5f2ec',
  color_accent         text default '#b8ef35',
  typography_style     text default 'moderna'
                         check (typography_style in ('moderna','serif','amigable','custom')),
  business_description text,
  tone                 integer default 60 check (tone between 0 and 100),
  visual_style         text default 'minimal'
                         check (visual_style in ('minimal','moderno','elegante','bold','sobrio','calido')),
  updated_at           timestamptz default now()
);

alter table brand_kits enable row level security;

create policy "crud own brand_kit"
  on brand_kits for all
  using (
    user_id in (
      select id from profiles
      where clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

-- ── pages ────────────────────────────────────────────────────
create table if not exists pages (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references profiles(id) on delete cascade not null,
  page_type       text check (page_type in ('home','landing','collection','product')),
  title           text,
  sections        jsonb default '[]'::jsonb,
  status          text default 'draft'
                    check (status in ('draft','published','discarded')),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

alter table pages enable row level security;

create policy "crud own pages"
  on pages for all
  using (
    user_id in (
      select id from profiles
      where clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

-- ── conversations ────────────────────────────────────────────
create table if not exists conversations (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references profiles(id) on delete cascade not null,
  page_id    uuid references pages(id) on delete set null,
  messages   jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

alter table conversations enable row level security;

create policy "crud own conversations"
  on conversations for all
  using (
    user_id in (
      select id from profiles
      where clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

-- ── Storage bucket para logos y assets ──────────────────────
insert into storage.buckets (id, name, public)
values ('brand-assets', 'brand-assets', false)
on conflict (id) do nothing;

create policy "users can upload own assets"
  on storage.objects for insert
  with check (bucket_id = 'brand-assets' and auth.uid()::text is not null);

create policy "users can read own assets"
  on storage.objects for select
  using (bucket_id = 'brand-assets');
