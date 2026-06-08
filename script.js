const WHATSAPP_CATALOG_URL = "https://wa.me/c/22890055053";
const WHATSAPP_ORDER_URL = "https://wa.me/22890055053";

const products = [
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
let query = "";
let cart = [];

const grid = document.querySelector("#productGrid");
const resultCount = document.querySelector("#resultCount");
const searchForm = document.querySelector(".search");
const searchInput = document.querySelector("#searchInput");
const categoryButtons = document.querySelectorAll(".category");
const cartPanel = document.querySelector("#cartPanel");
const overlay = document.querySelector("#overlay");
const cartButton = document.querySelector(".cart-button");
const closeCart = document.querySelector("#closeCart");
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("#cartItems");
const checkoutLink = document.querySelector("#checkoutLink");
const heroSlides = document.querySelectorAll(".hero-slide");

function startHeroCarousel() {
  if (heroSlides.length < 2) return;

  let activeSlide = 0;
  const syncMedia = () => {
    heroSlides.forEach((slide, index) => {
      if (slide.tagName !== "VIDEO") return;

      if (index === activeSlide) {
        slide.currentTime = 0;
        slide.play().catch(() => {});
      } else {
        slide.pause();
      }
    });
  };

  syncMedia();
  window.setInterval(() => {
    heroSlides[activeSlide].classList.remove("active");
    activeSlide = (activeSlide + 1) % heroSlides.length;
    heroSlides[activeSlide].classList.add("active");
    syncMedia();
  }, 4500);
}

function orderUrl(product) {
  const text = product
    ? `Bonjour Kiintrus, je souhaite commander: ${product.name} (${product.price}).`
    : `Bonjour Kiintrus, je souhaite commander les articles de ma selection.`;
  return `${WHATSAPP_ORDER_URL}?text=${encodeURIComponent(text)}`;
}

function renderProducts() {
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const matchesCategory = currentCategory === "all" || product.category === currentCategory;
    const haystack = `${product.name} ${product.store} ${product.description}`.toLowerCase();
    return matchesCategory && haystack.includes(normalizedQuery);
  });

  resultCount.textContent = String(filtered.length);

  grid.innerHTML = filtered
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-visual" style="--tone-a:${product.colors[0]};--tone-b:${product.colors[1]}">
            <span class="tag">${product.tag}</span>
            ${
              product.image
                ? `<img src="${product.image}" alt="${product.imageAlt || product.name}" />`
                : `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[product.icon]}</svg>`
            }
          </div>
          <div class="product-body">
            <span class="store">${product.store}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price-row">
              <span class="price">${product.price}</span>
              ${product.oldPrice ? `<span class="old-price">${product.oldPrice}</span>` : ""}
            </div>
            <div class="product-actions">
              <a href="${orderUrl(product)}" target="_blank" rel="noreferrer">Commander</a>
              <button type="button" aria-label="Ajouter ${product.name} au panier" data-add="${product.id}">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderCart() {
  cartCount.textContent = String(cart.length);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide pour le moment.</p>';
    checkoutLink.href = WHATSAPP_CATALOG_URL;
    checkoutLink.textContent = "Voir le catalogue WhatsApp";
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
    `Bonjour Kiintrus, je souhaite commander ces articles:\n${list}`,
  )}`;
  checkoutLink.textContent = "Commander sur WhatsApp";
}

function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCartPanel() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
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

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    currentCategory = button.dataset.category;
    renderProducts();
  });
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  const product = products.find((item) => item.id === Number(button.dataset.add));
  if (!product) return;

  cart = [...cart, product];
  renderCart();
  openCart();
});

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartPanel);
overlay.addEventListener("click", closeCartPanel);

renderProducts();
renderCart();
startHeroCarousel();
