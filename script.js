const WHATSAPP_CATALOG_URL = "https://wa.me/c/22890055053";
const WHATSAPP_ORDER_URL = "https://wa.me/22890055053";

const products = [
  {
    id: 1,
    name: "Smartphone 4G double SIM",
    category: "electronique",
    store: "Kiintrus Tech",
    price: "85 000 F CFA",
    description: "Ecran large, bonne autonomie et accessoires verifies.",
    tag: "Top vente",
    rating: "4.8",
    colors: ["#d9ecff", "#fff0cf"],
    icon: "phone",
  },
  {
    id: 2,
    name: "Ecouteurs sans fil",
    category: "electronique",
    store: "Audio Store",
    price: "12 500 F CFA",
    description: "Son clair, boitier compact et connexion rapide.",
    tag: "Nouveau",
    rating: "4.7",
    colors: ["#e8f7ff", "#dce7ff"],
    icon: "headphones",
  },
  {
    id: 3,
    name: "Sneakers bleu & blanc",
    category: "mode",
    store: "Urban Mode",
    price: "18 000 F CFA",
    description: "Style confortable pour vos sorties et courses.",
    tag: "Mode",
    rating: "4.9",
    colors: ["#eaf1ff", "#ffe2b8"],
    icon: "shoe",
  },
  {
    id: 4,
    name: "Sac a main elegant",
    category: "mode",
    store: "Bella Shop",
    price: "15 000 F CFA",
    description: "Finition soignee, format pratique et look premium.",
    tag: "Offre",
    rating: "4.6",
    colors: ["#fff4df", "#ffd9e3"],
    icon: "bag",
  },
  {
    id: 5,
    name: "Chaise design salon",
    category: "maison",
    store: "Maison Plus",
    price: "28 000 F CFA",
    description: "Assise moderne pour salon, bureau ou boutique.",
    tag: "Maison",
    rating: "4.7",
    colors: ["#e6f8ef", "#d9ecff"],
    icon: "chair",
  },
  {
    id: 6,
    name: "Camera compacte HD",
    category: "electronique",
    store: "Photo Center",
    price: "45 000 F CFA",
    description: "Pour souvenirs, contenus et petites productions.",
    tag: "Qualite",
    rating: "4.8",
    colors: ["#eef2f8", "#d8e6fb"],
    icon: "camera",
  },
  {
    id: 7,
    name: "Kit bebe essentiel",
    category: "famille",
    store: "Baby Corner",
    price: "22 000 F CFA",
    description: "Articles utiles pour le quotidien de la famille.",
    tag: "Famille",
    rating: "4.9",
    colors: ["#fff6d6", "#e5f6ff"],
    icon: "baby",
  },
  {
    id: 8,
    name: "Panier courses maison",
    category: "famille",
    store: "Daily Market",
    price: "10 000 F CFA",
    description: "Produits du quotidien prepares pour livraison.",
    tag: "Rapide",
    rating: "4.5",
    colors: ["#edf9e8", "#fff0d4"],
    icon: "basket",
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
            <svg viewBox="0 0 24 24" aria-hidden="true">${icons[product.icon]}</svg>
          </div>
          <div class="product-body">
            <span class="store">${product.store}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price-row">
              <span class="price">${product.price}</span>
              <span class="rating">★ ${product.rating}</span>
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
