-- Kiintrus Market schema
-- Run this in Supabase SQL Editor after creating the project.

create extension if not exists "pgcrypto";

do $$
begin
  create type public.user_role as enum ('admin', 'merchant');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.store_status as enum ('pending', 'active', 'suspended');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.product_status as enum ('draft', 'pending', 'published', 'rejected', 'archived');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.user_role not null default 'merchant',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  email text not null,
  phone text,
  status public.store_status not null default 'pending',
  owner_id uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.store_requests (
  id uuid primary key default gen_random_uuid(),
  store_name text not null,
  email text not null,
  phone text,
  user_id uuid references public.profiles(id) on delete set null,
  status public.store_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  name text not null,
  category text not null,
  description text not null,
  price_cfa integer not null check (price_cfa >= 0),
  stock integer not null default 0 check (stock >= 0),
  status public.product_status not null default 'pending',
  image_url text,
  image_path text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists stores_owner_id_idx on public.stores(owner_id);
create index if not exists stores_status_idx on public.stores(status);
create index if not exists store_requests_user_id_idx on public.store_requests(user_id);
create index if not exists store_requests_status_idx on public.store_requests(status);
create index if not exists products_store_id_idx on public.products(store_id);
create index if not exists products_status_idx on public.products(status);
create index if not exists products_created_at_idx on public.products(created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists stores_set_updated_at on public.stores;
create trigger stores_set_updated_at
before update on public.stores
for each row execute function public.set_updated_at();

drop trigger if exists store_requests_set_updated_at on public.store_requests;
create trigger store_requests_set_updated_at
before update on public.store_requests
for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'merchant')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.owns_store(target_store_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.stores
    where id = target_store_id
      and owner_id = auth.uid()
      and status = 'active'
  );
$$;

alter table public.profiles enable row level security;
alter table public.stores enable row level security;
alter table public.store_requests enable row level security;
alter table public.products enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "store_requests_select_own_or_admin" on public.store_requests;
create policy "store_requests_select_own_or_admin"
on public.store_requests
for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "store_requests_insert_own" on public.store_requests;
create policy "store_requests_insert_own"
on public.store_requests
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "store_requests_admin_update" on public.store_requests;
create policy "store_requests_admin_update"
on public.store_requests
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "stores_select_owner_or_admin" on public.stores;
create policy "stores_select_owner_or_admin"
on public.stores
for select
to authenticated
using (owner_id = auth.uid() or public.is_admin());

drop policy if exists "stores_admin_insert" on public.stores;
create policy "stores_admin_insert"
on public.stores
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "stores_admin_update" on public.stores;
create policy "stores_admin_update"
on public.stores
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "products_public_published_select" on public.products;
create policy "products_public_published_select"
on public.products
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "products_owner_or_admin_select" on public.products;
create policy "products_owner_or_admin_select"
on public.products
for select
to authenticated
using (public.owns_store(store_id) or public.is_admin());

drop policy if exists "products_owner_or_admin_insert" on public.products;
create policy "products_owner_or_admin_insert"
on public.products
for insert
to authenticated
with check (public.owns_store(store_id) or public.is_admin());

drop policy if exists "products_owner_or_admin_update" on public.products;
create policy "products_owner_or_admin_update"
on public.products
for update
to authenticated
using (public.owns_store(store_id) or public.is_admin())
with check (public.owns_store(store_id) or public.is_admin());

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product_images_public_read" on storage.objects;
create policy "product_images_public_read"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'product-images');

drop policy if exists "product_images_authenticated_upload" on storage.objects;
create policy "product_images_authenticated_upload"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'product-images');

drop policy if exists "product_images_authenticated_update" on storage.objects;
create policy "product_images_authenticated_update"
on storage.objects
for update
to authenticated
using (bucket_id = 'product-images')
with check (bucket_id = 'product-images');

drop policy if exists "product_images_authenticated_delete" on storage.objects;
create policy "product_images_authenticated_delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'product-images');
