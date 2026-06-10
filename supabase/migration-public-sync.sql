-- Kiintrus public sync migration.
-- Run this after the original schema if you already created the admin account.
-- This file avoids dollar-quoted function blocks so it is safer to paste in Supabase SQL Editor.

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status text not null default 'active' check (status in ('active', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists categories_status_idx on public.categories(status);

alter table public.categories enable row level security;

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop policy if exists "stores_public_active_select" on public.stores;
create policy "stores_public_active_select"
on public.stores
for select
to anon, authenticated
using (status = 'active');

drop policy if exists "categories_public_active_select" on public.categories;
create policy "categories_public_active_select"
on public.categories
for select
to anon, authenticated
using (status = 'active');

drop policy if exists "categories_admin_all_select" on public.categories;
create policy "categories_admin_all_select"
on public.categories
for select
to authenticated
using (public.is_admin());

drop policy if exists "categories_admin_insert" on public.categories;
create policy "categories_admin_insert"
on public.categories
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "categories_admin_update" on public.categories;
create policy "categories_admin_update"
on public.categories
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());
