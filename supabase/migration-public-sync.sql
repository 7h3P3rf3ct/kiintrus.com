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

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  image_path text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists product_images_product_id_idx on public.product_images(product_id);

alter table public.product_images enable row level security;

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

drop policy if exists "product_images_public_published_select" on public.product_images;
create policy "product_images_public_published_select"
on public.product_images
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.products
    where products.id = product_images.product_id
      and products.status = 'published'
  )
);

drop policy if exists "product_images_owner_or_admin_select" on public.product_images;
create policy "product_images_owner_or_admin_select"
on public.product_images
for select
to authenticated
using (
  exists (
    select 1
    from public.products
    where products.id = product_images.product_id
      and (public.owns_store(products.store_id) or public.is_admin())
  )
);

drop policy if exists "product_images_owner_or_admin_insert" on public.product_images;
create policy "product_images_owner_or_admin_insert"
on public.product_images
for insert
to authenticated
with check (
  exists (
    select 1
    from public.products
    where products.id = product_images.product_id
      and (public.owns_store(products.store_id) or public.is_admin())
  )
);

drop policy if exists "product_images_owner_or_admin_delete" on public.product_images;
create policy "product_images_owner_or_admin_delete"
on public.product_images
for delete
to authenticated
using (
  exists (
    select 1
    from public.products
    where products.id = product_images.product_id
      and (public.owns_store(products.store_id) or public.is_admin())
  )
);
