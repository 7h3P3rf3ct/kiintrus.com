# Configuration Supabase pour Kiintrus Market

## Etape 1 - Creer le projet

1. Aller sur Supabase.
2. Creer un nouveau projet `kiintrus-market`.
3. Choisir une region proche de vos utilisateurs.
4. Garder le mot de passe database dans un endroit sur.

## Etape 2 - Executer le schema

1. Ouvrir `SQL Editor`.
2. Copier tout le contenu de `supabase/schema.sql`.
3. Executer le script.

Le script cree :

- `profiles` : profil utilisateur lie a Supabase Auth.
- `stores` : boutiques marchandes.
- `categories` : categories actives visibles dans le dashboard et les filtres.
- `products` : articles, prix, stock, statut et image.
- `product_images` : galerie de photos supplementaires par article.
- `product-images` : bucket Storage public pour les photos produits.
- Les politiques RLS pour separer admin, marchands et catalogue public.

## Etape 3 - Importer le catalogue actuel

1. Ouvrir `SQL Editor`.
2. Copier tout le contenu de `supabase/seed-current-catalog.sql`.
3. Executer le script.

Ce script ajoute les boutiques et articles actuels du site avec le statut `published`. Il peut etre relance sans dupliquer les articles deja importes.

## Etape 4 - Configurer Auth

Dans `Authentication > URL Configuration` :

- Site URL local : `http://localhost:8080/market/`
- Site URL production : `https://market.kiintrus.com/`

Ajouter dans Redirect URLs :

- `http://localhost:8080/market/`
- `https://market.kiintrus.com/`

## Etape 5 - Recuperer les cles publiques

Dans `Project Settings > API`, recuperer :

- Project URL
- Publishable key ou anon public key

Le projet contient deja `market/supabase-config.js` avec l'URL projet et la cle publique anon.

Pour un environnement prive/local different, vous pouvez aussi creer un fichier non versionne :

```bash
cp market/config.example.js market/config.js
```

Remplacer les valeurs dans `market/config.js`, puis adapter le chargement si necessaire.

Important : ne jamais mettre la service role key dans le navigateur.

## Etape 6 - Premier compte admin

1. Creer l'utilisateur admin dans Supabase Auth.
2. Recuperer son `user id`.
3. Inserer son profil admin :

```sql
insert into public.profiles (id, full_name, role)
values ('USER_ID_ICI', 'Kiintrus Admin', 'admin')
on conflict (id) do update
set role = 'admin', full_name = excluded.full_name;
```

## Etape 7 - Integration dans le code

Le dashboard utilise deja :

- `supabase.auth.signInWithPassword`
- `supabase.auth.signUp`
- `supabase.from('stores')`
- `supabase.from('categories')`
- `supabase.from('products')`
- `supabase.from('product_images')`
- `supabase.storage.from('product-images').upload`

La vitrine publique lit les articles `published` depuis Supabase. Les articles `draft`, `pending`, `rejected` ou `archived` ne sont pas affiches sur le site.

Dans la version actuelle, `market/` charge deja Supabase si `market/supabase-config.js` est present. Le mode local sert uniquement de secours si le client Supabase n'est pas disponible.
