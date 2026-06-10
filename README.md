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
