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
- `products` : articles, prix, stock, statut et image.
- `product-images` : bucket Storage public pour les photos produits.
- Les politiques RLS pour separer admin, marchands et catalogue public.

## Etape 3 - Configurer Auth

Dans `Authentication > URL Configuration` :

- Site URL local : `http://localhost:8080/market/`
- Site URL production : `https://market.kiintrus.com/`

Ajouter dans Redirect URLs :

- `http://localhost:8080/market/`
- `https://market.kiintrus.com/`

## Etape 4 - Recuperer les cles publiques

Dans `Project Settings > API`, recuperer :

- Project URL
- Publishable key ou anon public key

Puis creer localement un fichier non versionne :

```bash
cp market/config.example.js market/config.js
```

Remplacer les valeurs dans `market/config.js`.

Important : ne jamais mettre la service role key dans le navigateur.

## Etape 5 - Premier compte admin

1. Creer l'utilisateur admin dans Supabase Auth.
2. Recuperer son `user id`.
3. Inserer son profil admin :

```sql
insert into public.profiles (id, full_name, role)
values ('USER_ID_ICI', 'Kiintrus Admin', 'admin')
on conflict (id) do update
set role = 'admin', full_name = excluded.full_name;
```

## Etape 6 - Prochaine integration dans le code

Une fois `market/config.js` rempli, le dashboard peut etre branche a :

- `supabase.auth.signInWithPassword`
- `supabase.auth.signUp`
- `supabase.from('stores')`
- `supabase.from('products')`
- `supabase.storage.from('product-images').upload`

Le stockage local actuel reste seulement une demo de secours.
