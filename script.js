const WHATSAPP_CATALOG_URL = "https://wa.me/c/22890055053";
const WHATSAPP_ORDER_URL = "https://wa.me/22890055053";
const supabaseConfig = window.KIINTRUS_SUPABASE;
const publicSupabaseClient =
  window.supabase && supabaseConfig?.url && supabaseConfig?.anonKey
    ? window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey)
    : null;

const translations = {
  fr: {
    strip: "Livraison rapide et fiable",
    whatsappCatalog: "Catalogue WhatsApp",
    searchLabel: "Rechercher un article",
    searchPlaceholder: "Rechercher smartphone, chaussure, sac...",
    searchAction: "Lancer la recherche",
    languageLabel: "Choisir la langue",
    order: "Commander",
    cartLabel: "Voir le panier",
    navAll: "Tout",
    navPromos: "Promos",
    navElectronics: "Electronique",
    navFashion: "Mode",
    navHome: "Maison",
    navDeals: "Bons plans",
    navDelivery: "Livraison",
    navSupport: "Service Client",
    heroEyebrow: "Commandez, souriez, recevez.",
    heroTitle: 'Le <span class="highlight-word">sourire</span> <span class="keep-together">en un click.</span>',
    heroText:
      "Retrouvez plusieurs boutiques au meme endroit, commandez vos articles et faites-vous livrer avec un service qui verifie la qualite avant expedition.",
    viewCatalog: "Voir le catalogue WhatsApp",
    exploreItems: "Explorer les articles",
    verifiedIncluded: "Verification incluse",
    beforeDelivery: "Avant livraison",
    popularStores: "Boutiques populaires",
    categoriesTitle: "Commandez tout au meme endroit",
    openFullCatalog: "Ouvrir le catalogue complet",
    catAll: "Tout",
    catAllDesc: "Selection Kiintrus",
    catBeauty: "Beaute",
    catBeautyDesc: "Soins visage, cremes, gels",
    catFashion: "Mode & wax",
    catFashionDesc: "Tissus, ensembles, enfants",
    catHome: "Maison",
    catHomeDesc: "Coussins et deco",
    catBooks: "Librairie",
    catBooksDesc: "Romans et precommandes",
    catAccessories: "Accessoires",
    catAccessoriesDesc: "Selfie, gadgets utiles",
    catalog: "Catalogue",
    featuredItems: "Tout",
    heroPrev: "Faire defiler a gauche",
    heroNext: "Faire defiler a droite",
    itemsLabel: "articles",
    securePayment: "Paiement securise",
    securePaymentText: "Un parcours simple et rassurant.",
    reliableDelivery: "Livraison fiable",
    reliableDeliveryText: "Suivi clair jusqu'a reception.",
    verifiedQuality: "Qualite verifiee",
    verifiedQualityText: "Les articles sont controles avant depart.",
    howItWorks: "Comment ca marche",
    deliveryTitle: "Du catalogue WhatsApp a votre porte.",
    deliveryText:
      "Kiintrus rassemble des boutiques partenaires, facilite la commande et prend soin de l'etape sensible : verifier que l'article correspond avant de vous le livrer.",
    stepChoose: "Choisissez",
    stepChooseText: "Parcourez les articles du site ou du catalogue WhatsApp.",
    stepOrder: "Commandez",
    stepOrderText: "Envoyez votre demande avec le nom de l'article et votre zone.",
    stepReceive: "Recevez",
    stepReceiveText: "L'article est verifie, emballe, puis livre rapidement.",
    cart: "Panier",
    yourSelection: "Votre selection",
    closeCart: "Fermer le panier",
    closeFilterPanel: "Fermer le menu",
    filterMenu: "Menu",
    filterTitle: "Tout",
    filterCategories: "Categories",
    filterStores: "Boutiques",
    filterDeals: "Filtres",
    filterAll: "Tous les articles",
    filterLowPrice: "Petits prix",
    storeAll: "Toutes les boutiques",
    backToTop: "Revenir en haut",
    productDetails: "Details article",
    closeProductDetail: "Fermer la fiche article",
    choices: "Choix disponibles",
    colorsLabel: "Couleurs",
    sizesLabel: "Tailles",
    descriptionLabel: "Description",
    similarItems: "Articles similaires",
    viewDetails: "Voir les details",
    orderOnWhatsapp: "Commander sur WhatsApp",
    footerText: "Plateforme de commerce en ligne, boutiques partenaires, verification qualite et livraison.",
    services: "Services",
    onlineOrder: "Commande en ligne",
    preDeliveryCheck: "Verification avant livraison",
    fastDelivery: "Livraison rapide",
    emptyCart: "Votre panier est vide pour le moment.",
    addToCart: "Ajouter",
    title: "Kiintrus - Le sourire en un click",
  },
  en: {
    strip: "Fast and reliable delivery",
    whatsappCatalog: "WhatsApp Catalog",
    searchLabel: "Search for an item",
    searchPlaceholder: "Search smartphone, shoes, bag...",
    searchAction: "Search",
    languageLabel: "Choose language",
    order: "Order",
    cartLabel: "View cart",
    navAll: "All",
    navPromos: "Promos",
    navElectronics: "Electronics",
    navFashion: "Fashion",
    navHome: "Home",
    navDeals: "Deals",
    navDelivery: "Delivery",
    navSupport: "Customer Service",
    heroEyebrow: "Order, smile, receive.",
    heroTitle: 'The <span class="highlight-word">smile</span> <span class="keep-together">in one click.</span>',
    heroText:
      "Find several stores in one place, order your items, and get them delivered with a service that checks quality before dispatch.",
    viewCatalog: "View WhatsApp Catalog",
    exploreItems: "Explore items",
    verifiedIncluded: "Verification included",
    beforeDelivery: "Before delivery",
    popularStores: "Popular stores",
    categoriesTitle: "Order everything in one place",
    openFullCatalog: "Open full catalog",
    catAll: "All",
    catAllDesc: "Kiintrus selection",
    catBeauty: "Beauty",
    catBeautyDesc: "Face care, creams, gels",
    catFashion: "Fashion & wax",
    catFashionDesc: "Fabrics, outfits, kids",
    catHome: "Home",
    catHomeDesc: "Cushions and decor",
    catBooks: "Bookstore",
    catBooksDesc: "Novels and pre-orders",
    catAccessories: "Accessories",
    catAccessoriesDesc: "Selfie, useful gadgets",
    catalog: "Catalog",
    featuredItems: "All",
    heroPrev: "Scroll left",
    heroNext: "Scroll right",
    itemsLabel: "items",
    securePayment: "Secure payment",
    securePaymentText: "A simple and reassuring process.",
    reliableDelivery: "Reliable delivery",
    reliableDeliveryText: "Clear tracking until reception.",
    verifiedQuality: "Verified quality",
    verifiedQualityText: "Items are checked before dispatch.",
    howItWorks: "How it works",
    deliveryTitle: "From WhatsApp catalog to your door.",
    deliveryText:
      "Kiintrus brings partner stores together, makes ordering easier, and takes care of the sensitive step: checking that the item matches before delivery.",
    stepChoose: "Choose",
    stepChooseText: "Browse items on the site or in the WhatsApp catalog.",
    stepOrder: "Order",
    stepOrderText: "Send your request with the item name and your area.",
    stepReceive: "Receive",
    stepReceiveText: "The item is checked, packed, then delivered quickly.",
    cart: "Cart",
    yourSelection: "Your selection",
    closeCart: "Close cart",
    closeFilterPanel: "Close menu",
    filterMenu: "Menu",
    filterTitle: "All",
    filterCategories: "Categories",
    filterStores: "Stores",
    filterDeals: "Filters",
    filterAll: "All products",
    filterLowPrice: "Low prices",
    storeAll: "All stores",
    backToTop: "Back to top",
    productDetails: "Item details",
    closeProductDetail: "Close item details",
    choices: "Available options",
    colorsLabel: "Colors",
    sizesLabel: "Sizes",
    descriptionLabel: "Description",
    similarItems: "Similar items",
    viewDetails: "View details",
    orderOnWhatsapp: "Order on WhatsApp",
    footerText: "Online commerce platform, partner stores, quality check and delivery.",
    services: "Services",
    onlineOrder: "Online order",
    preDeliveryCheck: "Pre-delivery check",
    fastDelivery: "Fast delivery",
    emptyCart: "Your cart is empty for now.",
    addToCart: "Add",
    title: "Kiintrus - The smile in one click",
  },
};

let currentLanguage = "fr";

let products = [
  {
    id: 1,
    name: "CREME SOLAIRE DR RASHEEL",
    category: "beaute",
    store: "Efia's Garden Boutique",
    price: "6 000 F CFA",
    description: "Votre creme solaire DR RASHEL.",
    tag: "Soin",
    image: "assets/products/dr-rasheel-solaire.jpg",
    imageAlt: "Creme solaire DR Rasheel",
    colors: ["#fff4d5", "#eaf3ff"],
    icon: "beauty",
  },
  {
    id: 2,
    name: "Gel Nettoyant SAFI",
    category: "beaute",
    store: "Efia's Garden Boutique",
    price: "13 000 F CFA",
    description: "Gel nettoyant : exfoliant, anti tache, reduit les cernes.",
    tag: "Soin",
    image: "assets/products/safi-gel-nettoyant.jpg",
    imageAlt: "Gel nettoyant SAFI",
    colors: ["#ffe1ec", "#fff7fb"],
    icon: "beauty",
  },
  {
    id: 3,
    name: "Creme visage jour AIKEN",
    category: "beaute",
    store: "Efia's Garden Boutique",
    price: "15 000 F CFA",
    description: "Creme visage jour : reduit taches, boutons et illumine.",
    tag: "Soin",
    image: "assets/products/aiken-jour.jpg",
    imageAlt: "Creme visage jour AIKEN",
    colors: ["#fff9c7", "#e8f3ff"],
    icon: "beauty",
  },
  {
    id: 4,
    name: 'ROMAN "PARTI POUR DE BON"',
    category: "librairie",
    store: "LIBRAIRIE",
    price: "5 000 F CFA",
    oldPrice: "7 000 F CFA",
    description: "Disponible en precommande uniquement.",
    tag: "Livre",
    image: "assets/products/roman-parti-pour-de-bon.jpg",
    imageAlt: "Roman Parti pour de bon",
    colors: ["#ffe6cf", "#d7f0e1"],
    icon: "book",
  },
  {
    id: 5,
    name: "BATON POUR SELFIE",
    category: "accessoires",
    store: "Fatima Boutique",
    price: "3 000 F CFA",
    description: "Tige pour poser son telephone et prendre des photos.",
    tag: "Accessoire",
    image: "assets/products/selfie-stick.jpg",
    imageAlt: "Baton pour selfie",
    colors: ["#eef2f8", "#fff2d8"],
    icon: "camera",
  },
  {
    id: 6,
    name: "SHORT + TSHIRT FILLE (NINOSWEET)",
    category: "mode",
    store: "NINOSWEET BOUTIQUE (Enfants)",
    price: "2 500 F CFA",
    description: "Ensemble pour fille de 3 mois a 2 ans.",
    tag: "Enfant",
    image: "assets/products/ninosweet-fille-rose.jpg",
    imageAlt: "Short et tshirt fille Ninosweet rose",
    colors: ["#ffdbe7", "#fff4d5"],
    icon: "baby",
  },
  {
    id: 7,
    name: "SHORT + TSHIRT FILLE (NINOSWEET)",
    category: "mode",
    store: "NINOSWEET BOUTIQUE (Enfants)",
    price: "2 500 F CFA",
    description: "Ensemble pour fille de 3 mois a 3 ans. Tailles disponibles.",
    tag: "Enfant",
    image: "assets/products/ninosweet-fille-rouge.jpg",
    imageAlt: "Short et tshirt fille Ninosweet rouge",
    colors: ["#ffe0d9", "#fff4f1"],
    icon: "baby",
  },
  {
    id: 8,
    name: "SHORT + TSHIRT GARCON (NINOSWEET)",
    category: "mode",
    store: "NINOSWEET BOUTIQUE (Enfants)",
    price: "2 500 F CFA",
    description: "Ensemble garcon de 2 mois a 3 ans. Tailles disponibles.",
    tag: "Enfant",
    image: "assets/products/ninosweet-garcon.jpg",
    imageAlt: "Short et tshirt garcon Ninosweet",
    colors: ["#eaf7ff", "#fff9d8"],
    icon: "baby",
  },
  {
    id: 9,
    name: "IMITATION GRAND SUPER",
    category: "mode",
    store: "Fandam Boutique",
    price: "15 000 F CFA",
    description: "Imitation des imprimes du Grand Super.",
    tag: "Wax",
    image: "assets/products/grand-super-green.jpg",
    imageAlt: "Tissu imitation Grand Super vert",
    colors: ["#e8f2ff", "#d9f7e9"],
    icon: "fabric",
  },
  {
    id: 10,
    name: "IMITATION GRAND SUPER",
    category: "mode",
    store: "Fandam Boutique",
    price: "15 000 F CFA",
    description: "Imitation des imprimes du Grand Super.",
    tag: "Wax",
    image: "assets/products/grand-super-pink.jpg",
    imageAlt: "Tissu imitation Grand Super colore",
    colors: ["#ffe2f7", "#e6f0ff"],
    icon: "fabric",
  },
  {
    id: 11,
    name: "IMITATION GRAND SUPER",
    category: "mode",
    store: "Fandam Boutique",
    price: "15 000 F CFA",
    description: "Imitation des imprimes du Grand Super.",
    tag: "Wax",
    image: "assets/products/grand-super-blue-pack.jpg",
    imageAlt: "Tissu imitation Grand Super bleu",
    colors: ["#e8f2ff", "#fff0cf"],
    icon: "fabric",
  },
  {
    id: 12,
    name: "Coussins de decoration pour fauteuil",
    category: "maison",
    store: "Smaat Trade Boutique",
    price: "2 000 F CFA",
    description: "Coussins decoration fauteuil. Dimensions : 30/30 cm.",
    tag: "Maison",
    image: "assets/products/coussins-fauteuil.jpg",
    imageAlt: "Coussins de decoration pour fauteuil",
    colors: ["#ffe1c6", "#e8f0ff"],
    icon: "home",
  },
  {
    id: 13,
    name: "Coussins pour le lit",
    category: "maison",
    store: "Smaat Trade Boutique",
    price: "3 500 F CFA",
    description: "Coussins dimensions 30/33 cm par coussin.",
    tag: "Maison",
    image: "assets/products/coussins-lit.jpg",
    imageAlt: "Coussins pour le lit",
    colors: ["#d8f8e8", "#dbe9ff"],
    icon: "home",
  },
  {
    id: 14,
    name: "COMPLEMENTS ALIMENTAIRES PRINCESS",
    category: "beaute",
    store: "All items",
    price: "20 000 F CFA",
    description: "Complements alimentaires pour raffermir le corps.",
    tag: "Bien-etre",
    image: "assets/products/princess-complements.jpg",
    imageAlt: "Complements alimentaires Princess",
    colors: ["#fff6b8", "#ffe3d8"],
    icon: "beauty",
  },
  {
    id: 15,
    name: "Mousse nettoyante",
    category: "beaute",
    store: "All items",
    price: "12 000 F CFA",
    description: "Mousse nettoyante pour peau acneique et sensible.",
    tag: "Soin",
    image: "assets/products/mousse-nettoyante.jpg",
    imageAlt: "Mousse nettoyante",
    colors: ["#d8fff1", "#eef2ff"],
    icon: "beauty",
  },
  {
    id: 16,
    name: "Creme anti cernes",
    category: "beaute",
    store: "All items",
    price: "10 000 F CFA",
    description: "Peau abimee, anti-age, illumine le contour des yeux.",
    tag: "Soin",
    image: "assets/products/creme-anti-cernes.jpg",
    imageAlt: "Creme anti cernes",
    colors: ["#eed6ff", "#ffd8f5"],
    icon: "beauty",
  },
  {
    id: 17,
    name: "Toner ALIA",
    category: "beaute",
    store: "All items",
    price: "13 000 F CFA",
    description: "Toner : tonifie la peau, regenere et illumine.",
    tag: "Soin",
    image: "assets/products/toner-alia.jpg",
    imageAlt: "Toner ALIA",
    colors: ["#ffe1e8", "#fff7fb"],
    icon: "beauty",
  },
  {
    id: 18,
    name: "Gel nettoyant ALIA",
    category: "beaute",
    store: "All items",
    price: "15 000 F CFA",
    description: "Gel nettoyant : illumine le teint.",
    tag: "Soin",
    image: "assets/products/gel-nettoyant-alia.jpg",
    imageAlt: "Gel nettoyant ALIA",
    colors: ["#ffd7d7", "#fff3ec"],
    icon: "beauty",
  },
  {
    id: 19,
    name: "Rouleau de jade",
    category: "beaute",
    store: "All items",
    price: "13 000 F CFA",
    description: "Rouleau de jade.",
    tag: "Accessoire",
    image: "assets/products/rouleau-jade-set.jpg",
    imageAlt: "Rouleau de jade set",
    colors: ["#e5fff3", "#f5fff9"],
    icon: "beauty",
  },
  {
    id: 20,
    name: "Rouleau de jade",
    category: "beaute",
    store: "All items",
    price: "6 000 F CFA",
    description: "Rouleau de jade : massage facial.",
    tag: "Accessoire",
    image: "assets/products/rouleau-jade-massage.jpg",
    imageAlt: "Rouleau de jade massage facial",
    colors: ["#dbf8e7", "#fff6d8"],
    icon: "beauty",
  },
  {
    id: 21,
    name: "Creme visage (nuit) ALIA",
    category: "beaute",
    store: "All items",
    price: "15 000 F CFA",
    description: "Creme visage nuit : hydratante, eclaircissante.",
    tag: "Soin",
    image: "assets/products/creme-nuit-alia.jpg",
    imageAlt: "Creme visage nuit ALIA",
    colors: ["#ffd8dc", "#fff3e8"],
    icon: "beauty",
  },
  {
    id: 22,
    name: "Creme visage AIKEN",
    category: "beaute",
    store: "All items",
    price: "13 000 F CFA",
    description: "Creme visage : eclat, protection et cicatrisation.",
    tag: "Soin",
    image: "assets/products/creme-visage-aiken.jpg",
    imageAlt: "Creme visage AIKEN",
    colors: ["#dff3ff", "#fff8c7"],
    icon: "beauty",
  },
  {
    id: 23,
    name: "Creme solaire AIKEN",
    category: "beaute",
    store: "All items",
    price: "13 000 F CFA",
    description: "Creme solaire : eclat et protection.",
    tag: "Soin",
    image: "assets/products/creme-solaire-aiken.jpg",
    imageAlt: "Creme solaire AIKEN",
    colors: ["#fff8c7", "#eef7ff"],
    icon: "beauty",
  },
  {
    id: 24,
    name: "Creme visage (nuit) SAFI",
    category: "beaute",
    store: "All items",
    price: "15 000 F CFA",
    description: "Creme visage nuit : eclaircit le teint, exfolie le visage.",
    tag: "Soin",
    image: "assets/products/creme-nuit-safi.jpg",
    imageAlt: "Creme visage nuit SAFI",
    colors: ["#ffe2f0", "#fff8df"],
    icon: "beauty",
  },
];

const fallbackProducts = products.map((product) => ({ ...product }));
const categoryTranslationKeys = {
  beaute: "catBeauty",
  mode: "catFashion",
  maison: "catHome",
  accessoires: "catAccessories",
  librairie: "catBooks",
};
const fallbackCategories = ["beaute", "mode", "maison", "accessoires", "librairie"];

const icons = {
  phone: '<path d="M8 2.8h8a2 2 0 0 1 2 2v14.4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4.8a2 2 0 0 1 2-2Z"/><path d="M10 18h4"/>',
  headphones: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h3v6H5a1 1 0 0 1-1-1v-5ZM20 14h-3v6h2a1 1 0 0 0 1-1v-5Z"/>',
  shoe: '<path d="M4 15.5c2.8.7 5.5.3 7.5-1.3l2.6-2.1 5 4.5c.7.6.3 1.9-.7 1.9H5.3c-.8 0-1.3-.4-1.3-1.2v-1.8Z"/><path d="M12.5 13.3 15 16M15 11.8l2.7 2.6"/>',
  bag: '<path d="M6 8h12l1 12H5L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  chair: '<path d="M7 4h10v8H7zM8 12l-2 8M16 12l2 8M7 16h10"/>',
  camera: '<path d="M4 7h4l1.5-2h5L16 7h4v12H4z"/><path d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>',
  baby: '<path d="M9 10a3 3 0 0 1 6 0M7 13h10v6H7z"/><path d="M9 16h.01M15 16h.01M10 6l-1.5-2M14 6 15.5 4"/>',
  basket: '<path d="M5 10h14l-2 10H7L5 10Z"/><path d="m8 10 4-6 4 6M9 14v2M12 14v2M15 14v2"/>',
  beauty: '<path d="M8 3h8l-1 5H9L8 3Z"/><path d="M9 8h6l1 11H8L9 8Z"/><path d="M10 13h4"/>',
  book: '<path d="M5 4h9a3 3 0 0 1 3 3v15H8a3 3 0 0 1-3-3V4Z"/><path d="M8 4v15a3 3 0 0 0 3 3M9 8h4"/>',
  fabric: '<path d="M5 5c4 2 8-2 14 0v14c-6-2-10 2-14 0V5Z"/><path d="M8 7v12M12 5v12M16 5v12"/>',
  home: '<path d="M4 12 12 5l8 7"/><path d="M6 10.5V20h12v-9.5"/><path d="M10 20v-5h4v5"/>',
};

let currentCategory = "all";
let currentStore = "all";
let currentSpecialFilter = "all";
let query = "";
let cart = [];
let activeProduct = null;
let heroScrollTimer;
let heroScrollPaused = false;

const grid = document.querySelector("#productGrid");
const resultCount = document.querySelector("#resultCount");
const searchForm = document.querySelector(".search");
const searchInput = document.querySelector("#searchInput");
const categoryFilterList = document.querySelector("#categoryFilters");
const storeFilterList = document.querySelector("#storeFilters");
const specialFilterButtons = document.querySelectorAll("[data-special-filter]");
const quickFilterButtons = document.querySelectorAll("[data-quick-filter]");
const cartPanel = document.querySelector("#cartPanel");
const filterPanel = document.querySelector("#filterPanel");
const productDetailPanel = document.querySelector("#productDetailPanel");
const productDetailTitle = document.querySelector("#productDetailTitle");
const productDetailContent = document.querySelector("#productDetailContent");
const overlay = document.querySelector("#overlay");
const cartButton = document.querySelector(".cart-button");
const openFilterPanelButton = document.querySelector("#openFilterPanel");
const closeFilterPanelButton = document.querySelector("#closeFilterPanel");
const closeProductDetailButton = document.querySelector("#closeProductDetail");
const closeCart = document.querySelector("#closeCart");
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("#cartItems");
const checkoutLink = document.querySelector("#checkoutLink");
const heroShelf = document.querySelector("#heroShelf");
const heroPrev = document.querySelector("#heroPrev");
const heroNext = document.querySelector("#heroNext");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroBackground = document.querySelector(".hero-background");
const languageSelect = document.querySelector("#languageSelect");
const backToTop = document.querySelector("#backToTop");

function t(key) {
  return translations[currentLanguage][key] || translations.fr[key] || key;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatCfaPrice(value) {
  return `${Number(value || 0).toLocaleString("fr-FR")} F CFA`;
}

function categoryLabel(category) {
  const key = categoryTranslationKeys[category];
  if (key) return t(key);
  return String(category || "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function isPlaceholderStore(store) {
  return normalizedProductIdentity(store) === "all items";
}

function displayStore(store) {
  return isPlaceholderStore(store) ? t("catalog") : store;
}

function categoryFilterValue(type, value) {
  return type === "tag" ? `tag:${value}` : value;
}

function productMatchesCategoryFilter(product, value) {
  if (value === "all") return true;
  if (String(value).startsWith("tag:")) return product.tag === String(value).replace("tag:", "");
  return product.category === value;
}

function categoryFilterOptions() {
  const options = new Map();
  const addOption = (type, value, label) => {
    if (!value || !label) return;
    const key = normalizedProductIdentity(label);
    if (!options.has(key)) options.set(key, { value: categoryFilterValue(type, value), label });
  };

  fallbackCategories.forEach((category) => addOption("category", category, categoryLabel(category)));
  products.forEach((product) => {
    addOption("category", product.category, categoryLabel(product.category));
    addOption("tag", product.tag, product.tag);
  });

  return Array.from(options.values()).sort((a, b) => a.label.localeCompare(b.label, currentLanguage, { sensitivity: "base" }));
}

function tagForCategory(category) {
  return {
    beaute: "Soin",
    mode: "Mode",
    maison: "Maison",
    accessoires: "Accessoire",
    librairie: "Livre",
  }[category] || categoryLabel(category);
}

function iconForCategory(category) {
  return {
    beaute: "beauty",
    mode: "fabric",
    maison: "home",
    accessoires: "camera",
    librairie: "book",
  }[category] || "basket";
}

function uniqueList(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function normalizeList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(/[,\n|]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function mapProductFromDb(product) {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    store: product.stores?.name || "Kiintrus",
    price: formatCfaPrice(product.price_cfa),
    description: product.description,
    tag: tagForCategory(product.category),
    image: product.image_url || "assets/hero-marketplace.png",
    images: normalizeList(product.image_urls || product.gallery_urls || product.gallery_images),
    imageAlt: product.name,
    colors: ["#eaf3ff", "#fff4d5"],
    choiceColors: normalizeList(product.colors_available || product.color_options),
    sizes: normalizeList(product.sizes || product.size_options),
    icon: iconForCategory(product.category),
    stock: product.stock,
  };
}

async function loadPublishedProducts() {
  if (!publicSupabaseClient) return;

  const { data, error } = await publicSupabaseClient
    .from("products")
    .select("id, name, category, description, price_cfa, stock, status, image_url, created_at, stores(name)")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    products = fallbackProducts.map((product) => ({ ...product }));
    return;
  }

  products = [...data.map(mapProductFromDb), ...fallbackProducts.map((product) => ({ ...product }))];
  if (!products.some((product) => productMatchesCategoryFilter(product, currentCategory))) currentCategory = "all";
  if (!products.some((product) => product.store === currentStore) || isPlaceholderStore(currentStore)) currentStore = "all";
}

function renderDynamicFilters() {
  if (categoryFilterList) {
    categoryFilterList.innerHTML = categoryFilterOptions()
      .map(
        (category) =>
          `<button class="filter-option ${currentCategory === category.value ? "active" : ""}" type="button" data-category="${escapeHtml(category.value)}">${escapeHtml(category.label)}</button>`,
      )
      .join("");
  }

  if (storeFilterList) {
    const stores = Array.from(new Set(products.map((product) => product.store).filter((store) => store && !isPlaceholderStore(store)))).sort((a, b) =>
      a.localeCompare(b, currentLanguage, { sensitivity: "base" }),
    );
    storeFilterList.innerHTML = [
      `<button class="filter-option ${currentStore === "all" ? "active" : ""}" type="button" data-store="all">${t("storeAll")}</button>`,
      ...stores.map(
        (store) =>
          `<button class="filter-option ${currentStore === store ? "active" : ""}" type="button" data-store="${escapeHtml(store)}">${escapeHtml(store)}</button>`,
      ),
    ].join("");
  }
}

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "fr";
  document.documentElement.lang = currentLanguage;
  document.title = t("title");
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", t("title"));
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", t("title"));

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    node.innerHTML = t(node.dataset.i18nHtml);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAria));
  });

  if (languageSelect) languageSelect.value = currentLanguage;
  renderDynamicFilters();
  renderHeroShelf();
  renderProducts();
  renderCart();
}

function startHeroCarousel() {
  const playHeroBackground = () => {
    if (!heroBackground) return;
    heroBackground.muted = true;
    heroBackground.defaultMuted = true;
    heroBackground.playsInline = true;
    heroBackground.setAttribute("muted", "");
    heroBackground.setAttribute("playsinline", "");
    heroBackground.setAttribute("webkit-playsinline", "");
    heroBackground.play().catch(() => {});
  };

  playHeroBackground();
  ["pointerdown", "touchstart", "scroll"].forEach((eventName) => {
    window.addEventListener(eventName, playHeroBackground, { passive: true });
  });

  if (heroSlides.length < 2) return;

  let activeSlide = Math.max(
    0,
    Array.from(heroSlides).findIndex((slide) => slide.classList.contains("active")),
  );
  let slideTimer;
  let resumeVideo;

  const stopVideos = () => {
    heroSlides.forEach((slide) => {
      if (slide.tagName === "VIDEO") {
        slide.pause();
        slide.currentTime = 0;
      }
    });
  };

  const armSlide = (slide, resetVideo = true) => {
    if (slide.tagName === "VIDEO") {
      slide.muted = true;
      slide.defaultMuted = true;
      slide.playsInline = true;
      slide.setAttribute("muted", "");
      slide.setAttribute("playsinline", "");
      slide.setAttribute("webkit-playsinline", "");
      if (resetVideo) slide.currentTime = 0;
      slide.addEventListener("ended", nextSlide, { once: true });
      resumeVideo = () => {
        if (heroSlides[activeSlide] === slide && slide.paused) {
          slide.play().catch(() => {});
        }
      };
      window.requestAnimationFrame(resumeVideo);
      slide.addEventListener("canplay", resumeVideo, { once: true });
      slide.addEventListener(
        "playing",
        () => {
          const fallbackDelay = Number.isFinite(slide.duration) ? (slide.duration - slide.currentTime + 0.5) * 1000 : 11000;
          slideTimer = window.setTimeout(nextSlide, fallbackDelay);
        },
        { once: true },
      );
      slide.play().catch(() => {});
      return;
    }

    slideTimer = window.setTimeout(nextSlide, 4500);
  };

  const showSlide = (index) => {
    window.clearTimeout(slideTimer);
    heroSlides[activeSlide].classList.remove("active");
    activeSlide = index;
    const slide = heroSlides[activeSlide];
    stopVideos();
    slide.classList.add("active");
    armSlide(slide);
  };

  function nextSlide() {
    showSlide((activeSlide + 1) % heroSlides.length);
  }

  armSlide(heroSlides[activeSlide], false);
  ["pointerdown", "touchstart", "scroll"].forEach((eventName) => {
    window.addEventListener(eventName, () => resumeVideo?.(), { passive: true });
  });
}

function orderUrl(product) {
  const text = product
    ? currentLanguage === "en"
      ? `Hello Kiintrus, I would like to order: ${product.name} (${product.price}).`
      : `Bonjour Kiintrus, je souhaite commander: ${product.name} (${product.price}).`
    : currentLanguage === "en"
      ? `Hello Kiintrus, I would like to order the items in my selection.`
      : `Bonjour Kiintrus, je souhaite commander les articles de ma selection.`;
  return `${WHATSAPP_ORDER_URL}?text=${encodeURIComponent(text)}`;
}

function normalizedProductIdentity(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

function productGroupKey(product) {
  return [product.category, product.price, normalizedProductIdentity(product.name)].join("|");
}

function productVariants(product) {
  const key = productGroupKey(product);
  return products.filter((item) => productGroupKey(item) === key);
}

function groupProductList(list) {
  const groups = new Map();
  list.forEach((product) => {
    const key = productGroupKey(product);
    if (!groups.has(key)) {
      groups.set(key, { ...product, variants: [] });
    }
    groups.get(key).variants.push(product);
  });

  return Array.from(groups.values()).map((product) => {
    if (product.variants.length < 2) return product;
    const variantImages = uniqueList(product.variants.flatMap((variant) => productImages(variant)));
    return {
      ...product,
      image: variantImages[0] || product.image,
      images: variantImages,
      colors: uniqueList(product.variants.flatMap((variant) => variant.colors || [])),
      tag: product.tag || product.variants[0].tag,
    };
  });
}

function variantLabel(product, index, variants) {
  const baseLabel = product.tag || categoryLabel(product.category) || `${currentLanguage === "en" ? "Option" : "Choix"} ${index + 1}`;
  const duplicates = variants.filter((item) => (item.tag || categoryLabel(item.category)) === baseLabel);
  return duplicates.length > 1 ? `${baseLabel} ${duplicates.indexOf(product) + 1}` : baseLabel;
}

function productImages(product) {
  const directImages = uniqueList([
    product.image,
    ...normalizeList(product.images),
    ...normalizeList(product.gallery),
    ...normalizeList(product.galleryImages),
  ]);
  if (product.variants?.length > 1) {
    return uniqueList([...directImages, ...product.variants.flatMap((variant) => productImages(variant))]).slice(0, 8);
  }
  const siblingImages = products
    .filter(
      (item) =>
        String(item.id) !== String(product.id) &&
        item.image &&
        (item.name === product.name || (item.category === product.category && item.store === product.store)),
    )
    .map((item) => item.image);
  return uniqueList([...directImages, ...siblingImages]).slice(0, 6);
}

function productColors(product) {
  const explicitColors = normalizeList(product.choiceColors || product.colorOptions || product.availableColors);
  if (explicitColors.length) return explicitColors;
  if (product.category === "mode") return ["Rose", "Rouge", "Bleu", "Vert"];
  if (product.category === "maison") return ["Orange", "Bleu", "Vert"];
  if (product.category === "beaute") return ["Standard"];
  return ["Standard"];
}

function productSizes(product) {
  const explicitSizes = normalizeList(product.sizes || product.sizeOptions || product.availableSizes);
  if (explicitSizes.length) return explicitSizes;
  const name = String(product.name || "").toLowerCase();
  if (name.includes("ninosweet")) return ["3 mois", "6 mois", "12 mois", "2 ans", "3 ans"];
  if (name.includes("grand super")) return ["6 yards", "12 yards"];
  if (product.category === "maison") return ["30/30 cm", "30/33 cm"];
  return [];
}

function relatedProducts(product, limit = 4) {
  return groupProductList(
    products.filter(
      (item) =>
        productGroupKey(item) !== productGroupKey(product) && (item.category === product.category || item.store === product.store),
    ),
  ).slice(0, limit);
}

function heroTitle(product) {
  const name = String(product.name || "");
  if (name.includes("DR RASHEEL")) return "DR Rasheel";
  if (name.includes("NINOSWEET")) return "Ninosweet";
  if (name.includes("COUSSINS") || name.includes("Coussins")) return "Coussins";
  if (name.includes("SELFIE")) return "Selfie";
  if (name.includes("GRAND SUPER")) return "Grand Super";
  if (name.length > 22) return `${name.slice(0, 20).trim()}...`;
  return name;
}

function renderHeroShelf() {
  if (!heroShelf) return;

  const heroProducts = products.filter((product) => product.image).slice(0, 14);
  const loopProducts = heroProducts.length > 1 ? [...heroProducts, ...heroProducts] : heroProducts;
  heroShelf.innerHTML = loopProducts
    .map(
      (product) => `
        <a class="hero-card" href="#catalogue" data-hero-product="${escapeHtml(product.id)}">
          <span>${escapeHtml(categoryLabel(product.category))}</span>
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt || product.name)}" />
          <strong>${escapeHtml(heroTitle(product))}</strong>
        </a>
      `,
    )
    .join("");
  heroShelf.scrollLeft = 0;
  heroShelf.dataset.loopSize = String(heroProducts.length);
  startHeroInfiniteScroll();
}

function startHeroInfiniteScroll() {
  window.clearInterval(heroScrollTimer);
  if (!heroShelf || heroShelf.children.length < 2) return;

  heroScrollTimer = window.setInterval(() => {
    if (heroScrollPaused || productDetailPanel?.classList.contains("open")) return;
    const resetPoint = heroShelf.scrollWidth / 2;
    if (!resetPoint || heroShelf.scrollLeft >= resetPoint) {
      heroShelf.scrollLeft = 0;
      return;
    }
    const firstCard = heroShelf.querySelector(".hero-card");
    const gap = parseFloat(getComputedStyle(heroShelf).columnGap || "0");
    const step = firstCard ? firstCard.getBoundingClientRect().width + gap : heroShelf.clientWidth * 0.6;
    heroShelf.scrollBy({ left: step, behavior: "smooth" });
  }, 2600);
}

function renderProducts() {
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = groupProductList(
    products
      .filter((product) => {
        const matchesCategory = productMatchesCategoryFilter(product, currentCategory);
        const matchesStore = currentStore === "all" || product.store === currentStore;
        const matchesSpecialFilter =
          currentSpecialFilter === "all" ||
          (currentSpecialFilter === "promos" && Boolean(product.oldPrice)) ||
          (currentSpecialFilter === "lowPrice" && Number(product.price.replace(/\D/g, "")) <= 5000);
        const haystack = `${product.name} ${product.store} ${product.description}`.toLowerCase();
        return matchesCategory && matchesStore && matchesSpecialFilter && haystack.includes(normalizedQuery);
      })
      .sort((a, b) => {
        const categoryOrder = categoryLabel(a.category).localeCompare(categoryLabel(b.category), currentLanguage, { sensitivity: "base" });
        if (categoryOrder) return categoryOrder;
        const nameOrder = a.name.localeCompare(b.name, currentLanguage, { sensitivity: "base" });
        if (nameOrder) return nameOrder;
        return a.store.localeCompare(b.store, currentLanguage, { sensitivity: "base" });
      }),
  );

  if (resultCount) resultCount.textContent = String(filtered.length);

  grid.innerHTML = filtered
    .map(
      (product) => {
        const gallery = productImages(product);
        return `
        <article class="product-card" data-product="${escapeHtml(product.id)}" tabindex="0" aria-label="${escapeHtml(`${t("viewDetails")} ${product.name}`)}">
          <div class="product-visual" style="--tone-a:${(product.colors || ["#eaf3ff", "#fff4d5"])[0]};--tone-b:${(product.colors || ["#eaf3ff", "#fff4d5"])[1]}">
            <span class="tag">${escapeHtml(product.tag || tagForCategory(product.category))}</span>
            ${
              gallery.length
                ? `<img class="product-card-image" src="${escapeHtml(gallery[0])}" alt="${escapeHtml(product.imageAlt || product.name)}" data-images="${escapeHtml(gallery.join("|"))}" data-image-index="0" />
                  ${
                    gallery.length > 1
                      ? `<button class="product-image-arrow product-image-arrow-prev" type="button" aria-label="Image precedente" data-image-step="-1" data-stop-card>
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <button class="product-image-arrow product-image-arrow-next" type="button" aria-label="Image suivante" data-image-step="1" data-stop-card>
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                        </button>`
                      : ""
                  }`
                : `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[product.icon || iconForCategory(product.category)]}</svg>`
            }
          </div>
          <div class="product-body">
            <span class="store">${escapeHtml(displayStore(product.store))}</span>
            <h3>${escapeHtml(product.name)}</h3>
            <div class="price-row">
              <span class="price">${escapeHtml(product.price)}</span>
              ${product.oldPrice ? `<span class="old-price">${escapeHtml(product.oldPrice)}</span>` : ""}
            </div>
            <div class="product-actions">
              <a href="${orderUrl(product)}" target="_blank" rel="noreferrer" data-stop-card>${t("order")}</a>
              <button type="button" aria-label="${escapeHtml(`${t("addToCart")} ${product.name}`)}" data-add="${product.id}" data-stop-card>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
          </div>
        </article>
      `;
      },
    )
    .join("");
}

function changeProductCardImage(button) {
  const visual = button.closest(".product-visual");
  const image = visual?.querySelector(".product-card-image");
  const images = (image?.dataset.images || "").split("|").filter(Boolean);
  if (!image || images.length < 2) return;

  const step = Number(button.dataset.imageStep || 1);
  const currentIndex = Number(image.dataset.imageIndex || 0);
  const nextIndex = (currentIndex + step + images.length) % images.length;
  image.dataset.imageIndex = String(nextIndex);
  image.src = images[nextIndex];
}

function renderOptionGroup(label, values) {
  if (!values.length) return "";
  return `
    <div class="detail-option-group">
      <h4>${escapeHtml(label)}</h4>
      <div class="detail-options">
        ${values.map((value, index) => `<button type="button" class="${index === 0 ? "active" : ""}">${escapeHtml(value)}</button>`).join("")}
      </div>
    </div>
  `;
}

function renderVariantGroup(product) {
  const variants = productVariants(product);
  if (variants.length < 2) return "";

  return `
    <div class="detail-option-group">
      <h4>${currentLanguage === "en" ? "Variants" : "Variantes"}</h4>
      <div class="detail-options">
        ${variants
          .map(
            (variant, index) =>
              `<button type="button" class="${String(variant.id) === String(product.id) ? "active" : ""}" data-open-product="${escapeHtml(variant.id)}">${escapeHtml(variantLabel(variant, index, variants))}</button>`,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderProductDetail(product) {
  const images = productImages(product);
  const similar = relatedProducts(product);
  productDetailTitle.textContent = product.name;
  productDetailContent.innerHTML = `
    <div class="detail-layout">
      <div class="detail-gallery">
        <div class="detail-main-image">
          ${
            images[0]
              ? `<img id="detailMainImage" src="${escapeHtml(images[0])}" alt="${escapeHtml(product.imageAlt || product.name)}" />`
              : `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[product.icon || iconForCategory(product.category)]}</svg>`
          }
        </div>
        <div class="detail-thumbs">
          ${images
            .map(
              (image, index) => `
                <button type="button" class="${index === 0 ? "active" : ""}" data-detail-image="${escapeHtml(image)}">
                  <img src="${escapeHtml(image)}" alt="" />
                </button>
              `,
            )
            .join("")}
        </div>
      </div>
      <div class="detail-info">
        <span class="store">${escapeHtml(displayStore(product.store))}</span>
        <h3>${escapeHtml(product.name)}</h3>
        <div class="price-row">
          <span class="price">${escapeHtml(product.price)}</span>
          ${product.oldPrice ? `<span class="old-price">${escapeHtml(product.oldPrice)}</span>` : ""}
        </div>
        <section class="detail-block">
          <h4>${t("choices")}</h4>
          ${renderVariantGroup(product)}
          ${renderOptionGroup(t("colorsLabel"), productColors(product))}
          ${renderOptionGroup(t("sizesLabel"), productSizes(product))}
        </section>
        <section class="detail-block">
          <h4>${t("descriptionLabel")}</h4>
          <p>${escapeHtml(product.description || "")}</p>
        </section>
        <div class="detail-actions">
          <a href="${orderUrl(product)}" target="_blank" rel="noreferrer">${t("order")}</a>
          <button type="button" data-add="${escapeHtml(product.id)}">${t("addToCart")}</button>
        </div>
      </div>
    </div>
    ${
      similar.length
        ? `
          <section class="similar-products">
            <h3>${t("similarItems")}</h3>
            <div class="similar-grid">
              ${similar
                .map(
                  (item) => `
                    <button type="button" class="similar-card" data-open-product="${escapeHtml(item.id)}">
                      ${item.image ? `<img src="${escapeHtml(item.image)}" alt="" />` : ""}
                      <span>${escapeHtml(heroTitle(item))}</span>
                      <strong>${escapeHtml(item.price)}</strong>
                    </button>
                  `,
                )
                .join("")}
            </div>
          </section>
        `
        : ""
    }
  `;
}

function openProductDetail(product) {
  activeProduct = product;
  closeCartPanel();
  closeFilterPanel();
  renderProductDetail(product);
  productDetailPanel.classList.add("open");
  overlay.classList.add("open");
  productDetailPanel.setAttribute("aria-hidden", "false");
}

function closeProductDetail() {
  productDetailPanel?.classList.remove("open");
  productDetailPanel?.setAttribute("aria-hidden", "true");
  activeProduct = null;
  if (!cartPanel?.classList.contains("open") && !filterPanel?.classList.contains("open")) overlay.classList.remove("open");
}

function renderCart() {
  cartCount.textContent = String(cart.length);

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">${t("emptyCart")}</p>`;
    checkoutLink.href = WHATSAPP_CATALOG_URL;
    checkoutLink.innerHTML = `<span data-i18n="viewCatalog">${t("viewCatalog")}</span>`;
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (product) => `
        <div class="cart-item">
          <strong>${product.name}</strong>
          <span>${product.price} · ${product.store}</span>
        </div>
      `,
    )
    .join("");

  const list = cart.map((product) => `- ${product.name} (${product.price})`).join("\n");
  checkoutLink.href = `${WHATSAPP_ORDER_URL}?text=${encodeURIComponent(
    currentLanguage === "en"
      ? `Hello Kiintrus, I would like to order these items:\n${list}`
      : `Bonjour Kiintrus, je souhaite commander ces articles:\n${list}`,
  )}`;
  checkoutLink.innerHTML = `<span data-i18n="orderOnWhatsapp">${t("orderOnWhatsapp")}</span>`;
}

function openCart() {
  closeFilterPanel();
  closeProductDetail();
  cartPanel.classList.add("open");
  overlay.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCartPanel() {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
  if (!filterPanel?.classList.contains("open")) overlay.classList.remove("open");
}

function openFilters() {
  closeCartPanel();
  filterPanel.classList.add("open");
  overlay.classList.add("open");
  filterPanel.setAttribute("aria-hidden", "false");
  openFilterPanelButton?.setAttribute("aria-expanded", "true");
}

function closeFilterPanel() {
  filterPanel?.classList.remove("open");
  filterPanel?.setAttribute("aria-hidden", "true");
  openFilterPanelButton?.setAttribute("aria-expanded", "false");
  if (!cartPanel?.classList.contains("open")) overlay.classList.remove("open");
}

function closePanels() {
  closeCartPanel();
  closeFilterPanel();
  closeProductDetail();
}

function setActiveButton(buttons, activeButton) {
  buttons.forEach((button) => button.classList.toggle("active", button === activeButton));
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  query = searchInput.value;
  renderProducts();
  document.querySelector("#catalogue").scrollIntoView({ behavior: "smooth", block: "start" });
});

searchInput.addEventListener("input", () => {
  query = searchInput.value;
  renderProducts();
});

categoryFilterList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  currentCategory = button.dataset.category;
  setActiveButton(categoryFilterList.querySelectorAll("[data-category]"), button);
  renderProducts();
  document.querySelector("#catalogue").scrollIntoView({ behavior: "smooth", block: "start" });
});

storeFilterList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-store]");
  if (!button) return;
  currentStore = button.dataset.store;
  setActiveButton(storeFilterList.querySelectorAll("[data-store]"), button);
  renderProducts();
  document.querySelector("#catalogue").scrollIntoView({ behavior: "smooth", block: "start" });
});

specialFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentSpecialFilter = button.dataset.specialFilter;
    setActiveButton(specialFilterButtons, button);
    renderProducts();
    document.querySelector("#catalogue").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

quickFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentSpecialFilter = button.dataset.quickFilter === "deals" ? "lowPrice" : button.dataset.quickFilter;
    const matchingPanelButton = Array.from(specialFilterButtons).find(
      (item) => item.dataset.specialFilter === currentSpecialFilter,
    );
    if (matchingPanelButton) setActiveButton(specialFilterButtons, matchingPanelButton);
    renderProducts();
    document.querySelector("#catalogue").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

grid.addEventListener("click", (event) => {
  const imageArrow = event.target.closest("[data-image-step]");
  if (imageArrow) {
    changeProductCardImage(imageArrow);
    return;
  }

  const button = event.target.closest("[data-add]");
  if (button) {
    const product = products.find((item) => String(item.id) === String(button.dataset.add));
    if (!product) return;

    cart = [...cart, product];
    renderCart();
    openCart();
    return;
  }

  if (event.target.closest("[data-stop-card]")) return;
  const card = event.target.closest("[data-product]");
  if (!card) return;
  const product = products.find((item) => String(item.id) === String(card.dataset.product));
  if (product) openProductDetail(product);
});

grid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest("[data-product]");
  if (!card) return;
  event.preventDefault();
  const product = products.find((item) => String(item.id) === String(card.dataset.product));
  if (product) openProductDetail(product);
});

productDetailContent?.addEventListener("click", (event) => {
  const thumb = event.target.closest("[data-detail-image]");
  if (thumb) {
    const image = thumb.dataset.detailImage;
    const mainImage = document.querySelector("#detailMainImage");
    if (mainImage && image) mainImage.src = image;
    productDetailContent.querySelectorAll("[data-detail-image]").forEach((item) => item.classList.toggle("active", item === thumb));
    return;
  }

  const optionButton = event.target.closest(".detail-options button");
  if (optionButton) {
    const product = products.find((item) => String(item.id) === String(optionButton.dataset.openProduct));
    if (product) {
      openProductDetail(product);
      return;
    }
    optionButton.parentElement.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === optionButton));
    return;
  }

  const similarButton = event.target.closest("[data-open-product]");
  if (similarButton) {
    const product = products.find((item) => String(item.id) === String(similarButton.dataset.openProduct));
    if (product) openProductDetail(product);
    return;
  }

  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    const product = products.find((item) => String(item.id) === String(addButton.dataset.add));
    if (!product) return;
    cart = [...cart, product];
    renderCart();
    openCart();
  }
});

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartPanel);
openFilterPanelButton?.addEventListener("click", () => {
  currentCategory = "all";
  currentStore = "all";
  currentSpecialFilter = "all";
  renderDynamicFilters();
  setActiveButton(specialFilterButtons, Array.from(specialFilterButtons).find((button) => button.dataset.specialFilter === "all"));
  renderProducts();
  openFilters();
});
closeFilterPanelButton?.addEventListener("click", closeFilterPanel);
closeProductDetailButton?.addEventListener("click", closeProductDetail);
overlay.addEventListener("click", closePanels);
languageSelect?.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});
heroPrev?.addEventListener("click", () => {
  heroShelf?.scrollBy({ left: -Math.round(heroShelf.clientWidth * 0.82), behavior: "smooth" });
});
heroNext?.addEventListener("click", () => {
  heroShelf?.scrollBy({ left: Math.round(heroShelf.clientWidth * 0.82), behavior: "smooth" });
});
heroShelf?.addEventListener("click", (event) => {
  const card = event.target.closest("[data-hero-product]");
  if (!card) return;
  event.preventDefault();
  const product = products.find((item) => String(item.id) === String(card.dataset.heroProduct));
  if (product) openProductDetail(product);
});
["pointerdown", "touchstart", "wheel"].forEach((eventName) => {
  heroShelf?.addEventListener(
    eventName,
    () => {
      heroScrollPaused = true;
      window.clearTimeout(heroShelf.resumeTimer);
      heroShelf.resumeTimer = window.setTimeout(() => {
        heroScrollPaused = false;
      }, 1800);
    },
    { passive: true },
  );
});
backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
window.addEventListener(
  "scroll",
  () => {
    backToTop?.classList.toggle("visible", window.scrollY > 420);
  },
  { passive: true },
);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanels();
});

async function initPublicSite() {
  applyLanguage("fr");
  await loadPublishedProducts();
  renderDynamicFilters();
  renderHeroShelf();
  renderProducts();
  startHeroCarousel();
}

initPublicSite();
