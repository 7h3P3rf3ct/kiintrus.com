-- Seed Kiintrus current public catalog into Supabase.
-- Run after supabase/schema.sql. Safe to run multiple times; products are skipped when name + store + image already exist.

insert into public.categories (name, slug, status) values ('Beaute', 'beaute', 'active') on conflict (slug) do update set name = excluded.name, status = excluded.status;
insert into public.categories (name, slug, status) values ('Mode & wax', 'mode', 'active') on conflict (slug) do update set name = excluded.name, status = excluded.status;
insert into public.categories (name, slug, status) values ('Maison', 'maison', 'active') on conflict (slug) do update set name = excluded.name, status = excluded.status;
insert into public.categories (name, slug, status) values ('Librairie', 'librairie', 'active') on conflict (slug) do update set name = excluded.name, status = excluded.status;
insert into public.categories (name, slug, status) values ('Accessoires', 'accessoires', 'active') on conflict (slug) do update set name = excluded.name, status = excluded.status;

insert into public.stores (name, slug, email, phone, status) values ('Efia''s Garden Boutique', 'efia-s-garden-boutique', 'boutique1@kiintrus.com', '+228 90 05 50 53', 'active') on conflict (slug) do update set name = excluded.name, email = excluded.email, phone = excluded.phone, status = excluded.status;
insert into public.stores (name, slug, email, phone, status) values ('LIBRAIRIE', 'librairie', 'boutique2@kiintrus.com', '+228 90 05 50 53', 'active') on conflict (slug) do update set name = excluded.name, email = excluded.email, phone = excluded.phone, status = excluded.status;
insert into public.stores (name, slug, email, phone, status) values ('Fatima Boutique', 'fatima-boutique', 'boutique3@kiintrus.com', '+228 90 05 50 53', 'active') on conflict (slug) do update set name = excluded.name, email = excluded.email, phone = excluded.phone, status = excluded.status;
insert into public.stores (name, slug, email, phone, status) values ('NINOSWEET BOUTIQUE (Enfants)', 'ninosweet-boutique-enfants', 'boutique4@kiintrus.com', '+228 90 05 50 53', 'active') on conflict (slug) do update set name = excluded.name, email = excluded.email, phone = excluded.phone, status = excluded.status;
insert into public.stores (name, slug, email, phone, status) values ('Fandam Boutique', 'fandam-boutique', 'boutique5@kiintrus.com', '+228 90 05 50 53', 'active') on conflict (slug) do update set name = excluded.name, email = excluded.email, phone = excluded.phone, status = excluded.status;
insert into public.stores (name, slug, email, phone, status) values ('Smaat Trade Boutique', 'smaat-trade-boutique', 'boutique6@kiintrus.com', '+228 90 05 50 53', 'active') on conflict (slug) do update set name = excluded.name, email = excluded.email, phone = excluded.phone, status = excluded.status;
insert into public.stores (name, slug, email, phone, status) values ('All items', 'all-items', 'boutique7@kiintrus.com', '+228 90 05 50 53', 'active') on conflict (slug) do update set name = excluded.name, email = excluded.email, phone = excluded.phone, status = excluded.status;

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'CREME SOLAIRE DR RASHEEL', 'beaute', 'Votre creme solaire DR RASHEL.', 6000, 1, 'published', 'https://kiintrus.com/assets/products/dr-rasheel-solaire.jpg'
from public.stores
where stores.slug = 'efia-s-garden-boutique'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'CREME SOLAIRE DR RASHEEL'
      and existing.image_url = 'https://kiintrus.com/assets/products/dr-rasheel-solaire.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'Gel Nettoyant SAFI', 'beaute', 'Gel nettoyant : exfoliant, anti tache, reduit les cernes.', 13000, 1, 'published', 'https://kiintrus.com/assets/products/safi-gel-nettoyant.jpg'
from public.stores
where stores.slug = 'efia-s-garden-boutique'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'Gel Nettoyant SAFI'
      and existing.image_url = 'https://kiintrus.com/assets/products/safi-gel-nettoyant.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'Creme visage jour AIKEN', 'beaute', 'Creme visage jour : reduit taches, boutons et illumine.', 15000, 1, 'published', 'https://kiintrus.com/assets/products/aiken-jour.jpg'
from public.stores
where stores.slug = 'efia-s-garden-boutique'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'Creme visage jour AIKEN'
      and existing.image_url = 'https://kiintrus.com/assets/products/aiken-jour.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'ROMAN "PARTI POUR DE BON"', 'librairie', 'Disponible en precommande uniquement.', 5000, 1, 'published', 'https://kiintrus.com/assets/products/roman-parti-pour-de-bon.jpg'
from public.stores
where stores.slug = 'librairie'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'ROMAN "PARTI POUR DE BON"'
      and existing.image_url = 'https://kiintrus.com/assets/products/roman-parti-pour-de-bon.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'BATON POUR SELFIE', 'accessoires', 'Tige pour poser son telephone et prendre des photos.', 3000, 1, 'published', 'https://kiintrus.com/assets/products/selfie-stick.jpg'
from public.stores
where stores.slug = 'fatima-boutique'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'BATON POUR SELFIE'
      and existing.image_url = 'https://kiintrus.com/assets/products/selfie-stick.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'SHORT + TSHIRT FILLE (NINOSWEET)', 'mode', 'Ensemble pour fille de 3 mois a 2 ans.', 2500, 1, 'published', 'https://kiintrus.com/assets/products/ninosweet-fille-rose.jpg'
from public.stores
where stores.slug = 'ninosweet-boutique-enfants'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'SHORT + TSHIRT FILLE (NINOSWEET)'
      and existing.image_url = 'https://kiintrus.com/assets/products/ninosweet-fille-rose.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'SHORT + TSHIRT FILLE (NINOSWEET)', 'mode', 'Ensemble pour fille de 3 mois a 3 ans. Tailles disponibles.', 2500, 1, 'published', 'https://kiintrus.com/assets/products/ninosweet-fille-rouge.jpg'
from public.stores
where stores.slug = 'ninosweet-boutique-enfants'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'SHORT + TSHIRT FILLE (NINOSWEET)'
      and existing.image_url = 'https://kiintrus.com/assets/products/ninosweet-fille-rouge.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'SHORT + TSHIRT GARCON (NINOSWEET)', 'mode', 'Ensemble garcon de 2 mois a 3 ans. Tailles disponibles.', 2500, 1, 'published', 'https://kiintrus.com/assets/products/ninosweet-garcon.jpg'
from public.stores
where stores.slug = 'ninosweet-boutique-enfants'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'SHORT + TSHIRT GARCON (NINOSWEET)'
      and existing.image_url = 'https://kiintrus.com/assets/products/ninosweet-garcon.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'IMITATION GRAND SUPER', 'mode', 'Imitation des imprimes du Grand Super.', 15000, 1, 'published', 'https://kiintrus.com/assets/products/grand-super-green.jpg'
from public.stores
where stores.slug = 'fandam-boutique'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'IMITATION GRAND SUPER'
      and existing.image_url = 'https://kiintrus.com/assets/products/grand-super-green.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'IMITATION GRAND SUPER', 'mode', 'Imitation des imprimes du Grand Super.', 15000, 1, 'published', 'https://kiintrus.com/assets/products/grand-super-pink.jpg'
from public.stores
where stores.slug = 'fandam-boutique'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'IMITATION GRAND SUPER'
      and existing.image_url = 'https://kiintrus.com/assets/products/grand-super-pink.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'IMITATION GRAND SUPER', 'mode', 'Imitation des imprimes du Grand Super.', 15000, 1, 'published', 'https://kiintrus.com/assets/products/grand-super-blue-pack.jpg'
from public.stores
where stores.slug = 'fandam-boutique'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'IMITATION GRAND SUPER'
      and existing.image_url = 'https://kiintrus.com/assets/products/grand-super-blue-pack.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'Coussins de decoration pour fauteuil', 'maison', 'Coussins decoration fauteuil. Dimensions : 30/30 cm.', 2000, 1, 'published', 'https://kiintrus.com/assets/products/coussins-fauteuil.jpg'
from public.stores
where stores.slug = 'smaat-trade-boutique'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'Coussins de decoration pour fauteuil'
      and existing.image_url = 'https://kiintrus.com/assets/products/coussins-fauteuil.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'Coussins pour le lit', 'maison', 'Coussins dimensions 30/33 cm par coussin.', 3500, 1, 'published', 'https://kiintrus.com/assets/products/coussins-lit.jpg'
from public.stores
where stores.slug = 'smaat-trade-boutique'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'Coussins pour le lit'
      and existing.image_url = 'https://kiintrus.com/assets/products/coussins-lit.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'COMPLEMENTS ALIMENTAIRES PRINCESS', 'beaute', 'Complements alimentaires pour raffermir le corps.', 20000, 1, 'published', 'https://kiintrus.com/assets/products/princess-complements.jpg'
from public.stores
where stores.slug = 'all-items'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'COMPLEMENTS ALIMENTAIRES PRINCESS'
      and existing.image_url = 'https://kiintrus.com/assets/products/princess-complements.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'Mousse nettoyante', 'beaute', 'Mousse nettoyante pour peau acneique et sensible.', 12000, 1, 'published', 'https://kiintrus.com/assets/products/mousse-nettoyante.jpg'
from public.stores
where stores.slug = 'all-items'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'Mousse nettoyante'
      and existing.image_url = 'https://kiintrus.com/assets/products/mousse-nettoyante.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'Creme anti cernes', 'beaute', 'Peau abimee, anti-age, illumine le contour des yeux.', 10000, 1, 'published', 'https://kiintrus.com/assets/products/creme-anti-cernes.jpg'
from public.stores
where stores.slug = 'all-items'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'Creme anti cernes'
      and existing.image_url = 'https://kiintrus.com/assets/products/creme-anti-cernes.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'Toner ALIA', 'beaute', 'Toner : tonifie la peau, regenere et illumine.', 13000, 1, 'published', 'https://kiintrus.com/assets/products/toner-alia.jpg'
from public.stores
where stores.slug = 'all-items'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'Toner ALIA'
      and existing.image_url = 'https://kiintrus.com/assets/products/toner-alia.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'Gel nettoyant ALIA', 'beaute', 'Gel nettoyant : illumine le teint.', 15000, 1, 'published', 'https://kiintrus.com/assets/products/gel-nettoyant-alia.jpg'
from public.stores
where stores.slug = 'all-items'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'Gel nettoyant ALIA'
      and existing.image_url = 'https://kiintrus.com/assets/products/gel-nettoyant-alia.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'Rouleau de jade', 'beaute', 'Rouleau de jade.', 13000, 1, 'published', 'https://kiintrus.com/assets/products/rouleau-jade-set.jpg'
from public.stores
where stores.slug = 'all-items'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'Rouleau de jade'
      and existing.image_url = 'https://kiintrus.com/assets/products/rouleau-jade-set.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'Rouleau de jade', 'beaute', 'Rouleau de jade : massage facial.', 6000, 1, 'published', 'https://kiintrus.com/assets/products/rouleau-jade-massage.jpg'
from public.stores
where stores.slug = 'all-items'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'Rouleau de jade'
      and existing.image_url = 'https://kiintrus.com/assets/products/rouleau-jade-massage.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'Creme visage (nuit) ALIA', 'beaute', 'Creme visage nuit : hydratante, eclaircissante.', 15000, 1, 'published', 'https://kiintrus.com/assets/products/creme-nuit-alia.jpg'
from public.stores
where stores.slug = 'all-items'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'Creme visage (nuit) ALIA'
      and existing.image_url = 'https://kiintrus.com/assets/products/creme-nuit-alia.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'Creme visage AIKEN', 'beaute', 'Creme visage : eclat, protection et cicatrisation.', 13000, 1, 'published', 'https://kiintrus.com/assets/products/creme-visage-aiken.jpg'
from public.stores
where stores.slug = 'all-items'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'Creme visage AIKEN'
      and existing.image_url = 'https://kiintrus.com/assets/products/creme-visage-aiken.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'Creme solaire AIKEN', 'beaute', 'Creme solaire : eclat et protection.', 13000, 1, 'published', 'https://kiintrus.com/assets/products/creme-solaire-aiken.jpg'
from public.stores
where stores.slug = 'all-items'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'Creme solaire AIKEN'
      and existing.image_url = 'https://kiintrus.com/assets/products/creme-solaire-aiken.jpg'
  );

insert into public.products (store_id, name, category, description, price_cfa, stock, status, image_url)
select stores.id, 'Creme visage (nuit) SAFI', 'beaute', 'Creme visage nuit : eclaircit le teint, exfolie le visage.', 15000, 1, 'published', 'https://kiintrus.com/assets/products/creme-nuit-safi.jpg'
from public.stores
where stores.slug = 'all-items'
  and not exists (
    select 1 from public.products existing
    where existing.store_id = stores.id
      and existing.name = 'Creme visage (nuit) SAFI'
      and existing.image_url = 'https://kiintrus.com/assets/products/creme-nuit-safi.jpg'
  );

