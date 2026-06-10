# Kiintrus.com

Site vitrine e-commerce pour Kiintrus, inspire d'une experience type Amazon/Nicelia avec catalogue, recherche, categories, panier local et commande WhatsApp.

## Lancer localement

Ouvrir `index.html` dans un navigateur, ou lancer un serveur statique :

```bash
python3 -m http.server 8080
```

Puis visiter `http://localhost:8080`.

## Dashboard marchand

L'interface marchande est separee de la vitrine publique dans `market/`.

En local :

```bash
python3 -m http.server 8080
```

Puis visiter `http://localhost:8080/market/`.

Cette console est prevue pour `market.kiintrus.com`. Elle fonctionne aujourd'hui en demo locale et pourra etre branchee ensuite a Supabase Auth, Database et Storage.

## Backend Supabase

Les fichiers de preparation sont dans `supabase/` :

- `supabase/schema.sql` : tables, RLS policies et bucket Storage.
- `supabase/SETUP.md` : checklist de creation du projet Supabase.
- `market/config.example.js` : modele de configuration locale.

Ordre conseille :

1. Creer le projet Supabase.
2. Executer `supabase/schema.sql`.
3. Configurer Auth avec `https://market.kiintrus.com/`.
4. Copier `market/config.example.js` vers `market/config.js`.
5. Brancher le dashboard a Supabase.
