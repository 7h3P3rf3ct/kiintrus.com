const STORAGE_KEY = "kiintrus-market-dashboard";

const seedState = {
  session: null,
  stores: [
    {
      id: "store-admin",
      name: "Kiintrus Admin",
      email: "admin@kiintrus.com",
      phone: "+228 90 05 50 53",
      role: "admin",
      status: "active",
    },
    {
      id: "store-efia",
      name: "Efia's Garden Boutique",
      email: "efia@kiintrus.com",
      phone: "+228 90 00 00 01",
      role: "merchant",
      status: "active",
    },
    {
      id: "store-nino",
      name: "Ninosweet Boutique",
      email: "ninosweet@kiintrus.com",
      phone: "+228 90 00 00 02",
      role: "merchant",
      status: "pending",
    },
  ],
  products: [
    {
      id: "prod-1",
      storeId: "store-efia",
      name: "CREME SOLAIRE DR RASHEEL",
      category: "beaute",
      price: "6 000 F CFA",
      stock: 18,
      status: "published",
      description: "Creme solaire DR Rasheel.",
      image: "../assets/products/dr-rasheel-solaire.jpg",
      createdAt: "2026-06-10T09:30:00.000Z",
    },
    {
      id: "prod-2",
      storeId: "store-efia",
      name: "Gel Nettoyant SAFI",
      category: "beaute",
      price: "13 000 F CFA",
      stock: 7,
      status: "pending",
      description: "Gel nettoyant exfoliant anti tache.",
      image: "../assets/products/safi-gel-nettoyant.jpg",
      createdAt: "2026-06-10T10:15:00.000Z",
    },
  ],
  activity: [
    "Dashboard marchand separe de la vitrine publique.",
    "Pret pour branchement Supabase Auth, Database et Storage.",
  ],
};

let state = loadState();
let activePanel = "overview";
let productQuery = "";
let productStoreFilter = "all";

const authView = document.querySelector("#authView");
const dashboardView = document.querySelector("#dashboardView");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const authTabs = document.querySelectorAll("[data-auth-tab]");
const navButtons = document.querySelectorAll("[data-panel]");
const panels = document.querySelectorAll(".panel");
const roleLabel = document.querySelector("#roleLabel");
const workspaceTitle = document.querySelector("#workspaceTitle");
const activeStoreBadge = document.querySelector("#activeStoreBadge");
const logoutButton = document.querySelector("#logoutButton");
const openNewProduct = document.querySelector("#openNewProduct");
const productDialog = document.querySelector("#productDialog");
const closeDialog = document.querySelector("#closeDialog");
const productForm = document.querySelector("#productForm");
const createStoreForm = document.querySelector("#createStoreForm");
const productStore = document.querySelector("#productStore");
const productStoreFilterSelect = document.querySelector("#productStoreFilter");
const productSearch = document.querySelector("#productSearch");

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return saved ? { ...seedState, ...saved } : structuredClone(seedState);
  } catch {
    return structuredClone(seedState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function currentUser() {
  return state.stores.find((store) => store.id === state.session?.storeId) || null;
}

function isAdmin() {
  return currentUser()?.role === "admin";
}

function storeName(storeId) {
  return state.stores.find((store) => store.id === storeId)?.name || "Boutique";
}

function visibleProducts() {
  const user = currentUser();
  if (!user) return [];
  return state.products.filter((product) => {
    const canSee = isAdmin() || product.storeId === user.id;
    const matchesStore = productStoreFilter === "all" || product.storeId === productStoreFilter;
    const haystack = `${product.name} ${product.description} ${storeName(product.storeId)}`.toLowerCase();
    return canSee && matchesStore && haystack.includes(productQuery.toLowerCase());
  });
}

function fileToDataUrl(file) {
  return new Promise((resolve) => {
    if (!file) {
      resolve("../assets/hero-marketplace.png");
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "../assets/hero-marketplace.png")));
    reader.addEventListener("error", () => resolve("../assets/hero-marketplace.png"));
    reader.readAsDataURL(file);
  });
}

function setPanel(panelName) {
  activePanel = panelName;
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.panel === panelName));
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === `${panelName}Panel`));
}

function renderAuth() {
  const loggedIn = Boolean(currentUser());
  authView.hidden = loggedIn;
  dashboardView.hidden = !loggedIn;
  if (loggedIn) renderDashboard();
}

function renderDashboard() {
  const user = currentUser();
  if (!user) return;

  roleLabel.textContent = isAdmin() ? "Admin principale" : "Compte marchand";
  workspaceTitle.textContent = isAdmin() ? "Dashboard Kiintrus Market" : user.name;
  activeStoreBadge.textContent = isAdmin() ? "Toutes les boutiques" : user.name;
  document.querySelectorAll("[data-admin-only]").forEach((node) => {
    node.hidden = !isAdmin();
  });
  if (!isAdmin() && activePanel === "stores") setPanel("overview");

  renderStoreOptions();
  renderMetrics();
  renderProducts();
  renderStores();
  renderActivity();
}

function renderStoreOptions() {
  const activeStores = state.stores.filter((store) => store.role !== "admin");
  const options = [
    ...(isAdmin() ? ['<option value="all">Toutes les boutiques</option>'] : []),
    ...activeStores
      .filter((store) => isAdmin() || store.id === currentUser()?.id)
      .map((store) => `<option value="${store.id}">${escapeHtml(store.name)}</option>`),
  ].join("");

  productStoreFilterSelect.innerHTML = options;
  productStoreFilterSelect.value = productStoreFilter;
  if (!isAdmin()) productStoreFilterSelect.value = currentUser().id;

  productStore.innerHTML = activeStores
    .filter((store) => isAdmin() || store.id === currentUser()?.id)
    .map((store) => `<option value="${store.id}">${escapeHtml(store.name)}</option>`)
    .join("");
}

function renderMetrics() {
  const products = visibleProducts();
  const pendingStores = state.stores.filter((store) => store.status === "pending").length;
  document.querySelector("#metricProducts").textContent = String(products.length);
  document.querySelector("#metricStock").textContent = String(products.reduce((sum, product) => sum + Number(product.stock || 0), 0));
  document.querySelector("#metricStores").textContent = String(isAdmin() ? state.stores.filter((store) => store.role !== "admin").length : 1);
  document.querySelector("#metricPending").textContent = String(
    isAdmin() ? pendingStores + state.products.filter((product) => product.status === "pending").length : products.filter((product) => product.status === "pending").length,
  );
}

function productRow(product, compact = false) {
  return `
    <article class="${compact ? "list-row" : "product-row"}">
      ${compact ? "" : `<img src="${product.image}" alt="${escapeHtml(product.name)}" />`}
      <div>
        <strong>${escapeHtml(product.name)}</strong>
        <span>${escapeHtml(storeName(product.storeId))} · ${escapeHtml(product.price)} · Stock ${Number(product.stock || 0)}</span>
      </div>
      ${compact ? "" : `<span class="status ${product.status}">${statusLabel(product.status)}</span>`}
      ${
        compact
          ? ""
          : `<div class="stock-stepper">
              <button type="button" data-stock="${product.id}" data-delta="-1">-</button>
              <button type="button" data-stock="${product.id}" data-delta="1">+</button>
            </div>`
      }
    </article>
  `;
}

function statusLabel(status) {
  return {
    draft: "Brouillon",
    pending: "En validation",
    published: "Publie",
  }[status] || status;
}

function renderProducts() {
  const products = visibleProducts().slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  document.querySelector("#productTable").innerHTML = products.map((product) => productRow(product)).join("") || emptyMessage("Aucun article trouve.");
  document.querySelector("#recentProducts").innerHTML =
    products
      .slice(0, 5)
      .map((product) => productRow(product, true))
      .join("") || emptyMessage("Aucun article publie pour le moment.");
}

function renderStores() {
  document.querySelector("#storeList").innerHTML = state.stores
    .filter((store) => store.role !== "admin")
    .map(
      (store) => `
        <article class="store-row">
          <strong>${escapeHtml(store.name)}</strong>
          <span>${escapeHtml(store.email)} · ${escapeHtml(store.phone || "Telephone a ajouter")}</span>
          <span class="status ${store.status === "active" ? "published" : "pending"}">${store.status === "active" ? "Actif" : "En attente"}</span>
        </article>
      `,
    )
    .join("");
}

function renderActivity() {
  document.querySelector("#activityList").innerHTML = state.activity
    .slice(-6)
    .reverse()
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");
}

function emptyMessage(message) {
  return `<p class="helper-text">${escapeHtml(message)}</p>`;
}

function login(email) {
  const user = state.stores.find((store) => store.email.toLowerCase() === email.toLowerCase());
  if (!user) return false;
  state.session = { storeId: user.id };
  saveState();
  renderAuth();
  return true;
}

authTabs.forEach((button) => {
  button.addEventListener("click", () => {
    authTabs.forEach((tab) => tab.classList.toggle("active", tab === button));
    document.querySelectorAll(".auth-form").forEach((form) => {
      form.classList.toggle("active", form.id === `${button.dataset.authTab}Form`);
    });
  });
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#loginEmail").value.trim();
  if (!login(email)) {
    loginForm.querySelector(".helper-text").textContent = "Compte introuvable dans cette demo.";
  }
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#registerStore").value.trim();
  const email = document.querySelector("#registerEmail").value.trim();
  const phone = document.querySelector("#registerPhone").value.trim();
  if (!name || !email) return;

  state.stores.push({
    id: `store-${Date.now()}`,
    name,
    email,
    phone,
    role: "merchant",
    status: "pending",
  });
  state.activity.push(`Demande de creation recue pour ${name}.`);
  saveState();
  registerForm.reset();
  registerForm.querySelector(".helper-text").textContent = "Demande envoyee. L'admin pourra valider le compte.";
});

logoutButton.addEventListener("click", () => {
  state.session = null;
  saveState();
  renderAuth();
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => setPanel(button.dataset.panel));
});

document.querySelectorAll("[data-panel-shortcut]").forEach((button) => {
  button.addEventListener("click", () => setPanel(button.dataset.panelShortcut));
});

openNewProduct.addEventListener("click", () => {
  productForm.reset();
  document.querySelector("#productStock").value = "1";
  document.querySelector("#productStatus").value = isAdmin() ? "published" : "pending";
  productDialog.showModal();
});

closeDialog.addEventListener("click", () => productDialog.close());

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const product = {
    id: `prod-${Date.now()}`,
    storeId: productStore.value,
    name: document.querySelector("#productName").value.trim(),
    category: document.querySelector("#productCategory").value,
    price: document.querySelector("#productPrice").value.trim(),
    stock: Number(document.querySelector("#productStock").value || 0),
    status: document.querySelector("#productStatus").value,
    description: document.querySelector("#productDescription").value.trim(),
    image: await fileToDataUrl(document.querySelector("#productImage").files?.[0]),
    createdAt: new Date().toISOString(),
  };
  state.products.push(product);
  state.activity.push(`${product.name} ajoute par ${storeName(product.storeId)}.`);
  saveState();
  productDialog.close();
  renderDashboard();
});

createStoreForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isAdmin()) return;
  const name = document.querySelector("#storeName").value.trim();
  const email = document.querySelector("#storeEmail").value.trim();
  const phone = document.querySelector("#storePhone").value.trim();
  if (!name || !email) return;

  state.stores.push({
    id: `store-${Date.now()}`,
    name,
    email,
    phone,
    role: "merchant",
    status: "active",
  });
  state.activity.push(`Compte marchand cree pour ${name}.`);
  saveState();
  createStoreForm.reset();
  renderDashboard();
});

productStoreFilterSelect.addEventListener("change", (event) => {
  productStoreFilter = event.target.value;
  renderDashboard();
});

productSearch.addEventListener("input", (event) => {
  productQuery = event.target.value;
  renderDashboard();
});

document.querySelector("#productTable").addEventListener("click", (event) => {
  const button = event.target.closest("[data-stock]");
  if (!button) return;
  const product = state.products.find((item) => item.id === button.dataset.stock);
  if (!product) return;
  product.stock = Math.max(0, Number(product.stock || 0) + Number(button.dataset.delta));
  state.activity.push(`Stock mis a jour pour ${product.name}.`);
  saveState();
  renderDashboard();
});

renderAuth();
