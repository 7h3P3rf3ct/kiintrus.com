const STORAGE_KEY = "kiintrus-market-dashboard";
const supabaseConfig = window.KIINTRUS_SUPABASE;
const supabaseClient =
  window.supabase && supabaseConfig?.url && supabaseConfig?.anonKey
    ? window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey)
    : null;
const useSupabase = Boolean(supabaseClient);
const seedCatalog = window.KIINTRUS_SEED_CATALOG || { stores: [], products: [] };
const defaultCategories = [
  { id: "cat-beaute", name: "Beaute", slug: "beaute", status: "active" },
  { id: "cat-mode", name: "Mode & wax", slug: "mode", status: "active" },
  { id: "cat-maison", name: "Maison", slug: "maison", status: "active" },
  { id: "cat-librairie", name: "Librairie", slug: "librairie", status: "active" },
  { id: "cat-accessoires", name: "Accessoires", slug: "accessoires", status: "active" },
];

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
    ...seedCatalog.stores,
  ],
  categories: defaultCategories,
  products: seedCatalog.products,
  activity: [
    "Catalogue actuel importe dans le dashboard.",
    "Les articles publies alimentent automatiquement la vitrine publique.",
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
const createCategoryForm = document.querySelector("#createCategoryForm");
const productStore = document.querySelector("#productStore");
const productCategory = document.querySelector("#productCategory");
const productStoreFilterSelect = document.querySelector("#productStoreFilter");
const productSearch = document.querySelector("#productSearch");
const isLoginPage = Boolean(authView);
const isDashboardPage = Boolean(dashboardView);

function loadState() {
  if (useSupabase) return structuredClone(seedState);
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return saved ? { ...seedState, ...saved } : structuredClone(seedState);
  } catch {
    return structuredClone(seedState);
  }
}

function saveState() {
  if (useSupabase) return;
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
  if (useSupabase && state.session) {
    if (state.session.role === "admin") {
      return {
        id: state.session.profileId,
        name: state.session.fullName || "Kiintrus Admin",
        email: state.session.email,
        role: "admin",
        status: "active",
      };
    }

    return state.stores.find((store) => store.ownerId === state.session.profileId) || {
      id: state.session.profileId,
      name: state.session.fullName || state.session.email,
      email: state.session.email,
      role: "merchant",
      status: "pending",
    };
  }

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
      resolve("assets/hero-marketplace.png");
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "assets/hero-marketplace.png")));
    reader.addEventListener("error", () => resolve("assets/hero-marketplace.png"));
    reader.readAsDataURL(file);
  });
}

function parseCfaPrice(value) {
  return Number(String(value).replace(/[^\d]/g, "")) || 0;
}

function formatCfaPrice(value) {
  return `${Number(value || 0).toLocaleString("fr-FR")} F CFA`;
}

function mapStoreFromDb(store) {
  return {
    id: store.id,
    name: store.name,
    email: store.email,
    phone: store.phone || "",
    role: "merchant",
    status: store.status,
    ownerId: store.owner_id,
  };
}

function mapProductFromDb(product) {
  return {
    id: product.id,
    storeId: product.store_id,
    name: product.name,
    category: product.category,
    price: formatCfaPrice(product.price_cfa),
    priceCfa: product.price_cfa,
    stock: product.stock,
    status: product.status,
    description: product.description,
    image: product.image_url || "assets/hero-marketplace.png",
    imagePath: product.image_path,
    createdAt: product.created_at,
  };
}

function mapCategoryFromDb(category) {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    status: category.status || "active",
  };
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

async function uploadProductImage(file, storeId) {
  if (!useSupabase || !file) return "assets/hero-marketplace.png";

  const extension = file.name.split(".").pop() || "jpg";
  const path = `${storeId}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const { error } = await supabaseClient.storage.from(supabaseConfig.productImagesBucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabaseClient.storage.from(supabaseConfig.productImagesBucket).getPublicUrl(path);
  return {
    url: data.publicUrl,
    path,
  };
}

async function loadSupabaseWorkspace() {
  if (!useSupabase) return;

  const { data: sessionData } = await supabaseClient.auth.getSession();
  const authUser = sessionData.session?.user;
  if (!authUser) {
    state.session = null;
    return;
  }

  const { data: profile, error: profileError } = await supabaseClient
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", authUser.id)
    .single();
  if (profileError) throw profileError;

  state.session = {
    profileId: profile.id,
    fullName: profile.full_name,
    role: profile.role,
    email: authUser.email,
  };

  const { data: stores, error: storesError } = await supabaseClient
    .from("stores")
    .select("id, name, email, phone, status, owner_id")
    .order("created_at", { ascending: false });
  if (storesError) throw storesError;

  const { data: products, error: productsError } = await supabaseClient
    .from("products")
    .select("id, store_id, name, category, description, price_cfa, stock, status, image_url, image_path, created_at")
    .order("created_at", { ascending: false });
  if (productsError) throw productsError;

  const { data: categories, error: categoriesError } = await supabaseClient
    .from("categories")
    .select("id, name, slug, status")
    .order("name", { ascending: true });

  state.stores = stores.map(mapStoreFromDb);
  state.products = products.map(mapProductFromDb);
  state.categories = categoriesError ? defaultCategories : categories.map(mapCategoryFromDb);
  state.activity = [
    categoriesError ? "Supabase charge sans table categories pour le moment." : "Donnees chargees depuis Supabase.",
    ...seedState.activity,
  ];
}

function setPanel(panelName) {
  activePanel = panelName;
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.panel === panelName));
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === `${panelName}Panel`));
}

function renderAuth() {
  const loggedIn = Boolean(currentUser());

  if (isLoginPage && loggedIn) {
    window.location.href = "dashboard.html";
    return;
  }

  if (isDashboardPage && !loggedIn) {
    window.location.href = "index.html";
    return;
  }

  if (authView) authView.hidden = loggedIn;
  if (dashboardView) dashboardView.hidden = !loggedIn;
  if (isDashboardPage && loggedIn) renderDashboard();
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
  if (!isAdmin() && ["stores", "categories"].includes(activePanel)) setPanel("overview");

  renderStoreOptions();
  renderCategoryOptions();
  renderMetrics();
  renderProducts();
  renderStores();
  renderCategories();
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

function renderCategoryOptions() {
  if (!productCategory) return;
  productCategory.innerHTML = state.categories
    .filter((category) => category.status !== "archived")
    .map((category) => `<option value="${escapeHtml(category.slug)}">${escapeHtml(category.name)}</option>`)
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
          : `<div class="row-actions">
              <div class="stock-stepper">
                <button type="button" data-stock="${product.id}" data-delta="-1">-</button>
                <button type="button" data-stock="${product.id}" data-delta="1">+</button>
              </div>
              <div class="status-actions">${productStatusActions(product)}</div>
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
    archived: "Retire",
    rejected: "Rejete",
  }[status] || status;
}

function productStatusActions(product) {
  const actions = [];
  if (isAdmin()) {
    if (product.status !== "published") actions.push({ status: "published", label: "Publier" });
    if (product.status === "published") actions.push({ status: "draft", label: "Depublier" });
    if (product.status !== "archived") actions.push({ status: "archived", label: "Retirer" });
  } else if (product.status === "draft") {
    actions.push({ status: "pending", label: "Soumettre" });
  } else if (product.status === "archived") {
    actions.push({ status: "draft", label: "Restaurer" });
  }

  return actions
    .map(
      (action) =>
        `<button type="button" data-status="${action.status}" data-product="${product.id}">${escapeHtml(action.label)}</button>`,
    )
    .join("");
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

function renderCategories() {
  const list = document.querySelector("#categoryList");
  if (!list) return;
  list.innerHTML = state.categories
    .map(
      (category) => `
        <article class="store-row">
          <strong>${escapeHtml(category.name)}</strong>
          <span>${escapeHtml(category.slug)}</span>
          <span class="status ${category.status === "active" ? "published" : "draft"}">${category.status === "active" ? "Active" : "Masquee"}</span>
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

async function login(email, password) {
  if (useSupabase) {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await loadSupabaseWorkspace();
    renderAuth();
    return true;
  }

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

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#loginEmail").value.trim();
  const password = document.querySelector("#loginPassword").value;
  login(email, password).catch((error) => {
    loginForm.querySelector(".helper-text").textContent = error.message || "Connexion impossible.";
  });
});

registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.querySelector("#registerStore").value.trim();
  const email = document.querySelector("#registerEmail").value.trim();
  const phone = document.querySelector("#registerPhone").value.trim();
  const password = document.querySelector("#registerPassword").value;
  if (!name || !email || !password) return;

  if (useSupabase) {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/market/`,
        data: {
          full_name: name,
          role: "merchant",
        },
      },
    });
    if (error) {
      registerForm.querySelector(".helper-text").textContent = error.message;
      return;
    }

    if (data.session?.user) {
      await supabaseClient.from("store_requests").insert({
        store_name: name,
        email,
        phone,
        user_id: data.session.user.id,
      });
    }

    registerForm.reset();
    registerForm.querySelector(".helper-text").textContent =
      "Demande envoyee. Verifiez l'email marchand puis l'admin pourra valider la boutique.";
    return;
  }

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

logoutButton?.addEventListener("click", async () => {
  if (useSupabase) {
    await supabaseClient.auth.signOut();
  }
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

openNewProduct?.addEventListener("click", () => {
  productForm.reset();
  document.querySelector("#productStock").value = "1";
  document.querySelector("#productStatus").value = isAdmin() ? "published" : "pending";
  productDialog.showModal();
});

closeDialog?.addEventListener("click", () => productDialog.close());

productForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const selectedStoreId = productStore.value;
  const selectedFile = document.querySelector("#productImage").files?.[0];

  if (useSupabase) {
    try {
      const uploaded = await uploadProductImage(selectedFile, selectedStoreId);
      const status = isAdmin() ? document.querySelector("#productStatus").value : "pending";
      const { error } = await supabaseClient.from("products").insert({
        store_id: selectedStoreId,
        name: document.querySelector("#productName").value.trim(),
        category: document.querySelector("#productCategory").value,
        price_cfa: parseCfaPrice(document.querySelector("#productPrice").value),
        stock: Number(document.querySelector("#productStock").value || 0),
        status,
        description: document.querySelector("#productDescription").value.trim(),
        image_url: uploaded.url || uploaded,
        image_path: uploaded.path || null,
        created_by: state.session.profileId,
      });
      if (error) throw error;
      productDialog.close();
      await loadSupabaseWorkspace();
      renderDashboard();
    } catch (error) {
      alert(error.message || "Impossible d'enregistrer l'article.");
    }
    return;
  }

  const product = {
    id: `prod-${Date.now()}`,
    storeId: selectedStoreId,
    name: document.querySelector("#productName").value.trim(),
    category: document.querySelector("#productCategory").value,
    price: document.querySelector("#productPrice").value.trim(),
    stock: Number(document.querySelector("#productStock").value || 0),
    status: document.querySelector("#productStatus").value,
    description: document.querySelector("#productDescription").value.trim(),
    image: await fileToDataUrl(selectedFile),
    createdAt: new Date().toISOString(),
  };
  state.products.push(product);
  state.activity.push(`${product.name} ajoute par ${storeName(product.storeId)}.`);
  saveState();
  productDialog.close();
  renderDashboard();
});

createStoreForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isAdmin()) return;
  const name = document.querySelector("#storeName").value.trim();
  const email = document.querySelector("#storeEmail").value.trim();
  const phone = document.querySelector("#storePhone").value.trim();
  if (!name || !email) return;

  if (useSupabase) {
    supabaseClient
      .from("stores")
      .insert({
        name,
        slug: `${slugify(name)}-${Date.now()}`,
        email,
        phone,
        status: "active",
        created_by: state.session.profileId,
      })
      .then(async ({ error }) => {
        if (error) throw error;
        createStoreForm.reset();
        await loadSupabaseWorkspace();
        renderDashboard();
      })
      .catch((error) => {
        alert(error.message || "Impossible de creer la boutique.");
      });
    return;
  }

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

createCategoryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isAdmin()) return;
  const name = document.querySelector("#categoryName").value.trim();
  const slug = slugify(document.querySelector("#categorySlug").value.trim() || name);
  if (!name || !slug) return;

  if (useSupabase) {
    supabaseClient
      .from("categories")
      .insert({ name, slug, status: "active" })
      .then(async ({ error }) => {
        if (error) throw error;
        createCategoryForm.reset();
        await loadSupabaseWorkspace();
        renderDashboard();
      })
      .catch((error) => {
        alert(error.message || "Impossible de creer la categorie.");
      });
    return;
  }

  state.categories.push({ id: `cat-${Date.now()}`, name, slug, status: "active" });
  state.activity.push(`Categorie ${name} ajoutee.`);
  saveState();
  createCategoryForm.reset();
  renderDashboard();
});

productStoreFilterSelect?.addEventListener("change", (event) => {
  productStoreFilter = event.target.value;
  renderDashboard();
});

productSearch?.addEventListener("input", (event) => {
  productQuery = event.target.value;
  renderDashboard();
});

document.querySelector("#productTable")?.addEventListener("click", (event) => {
  const stockButton = event.target.closest("[data-stock]");
  const statusButton = event.target.closest("[data-status]");
  if (!stockButton && !statusButton) return;

  if (statusButton) {
    const product = state.products.find((item) => item.id === statusButton.dataset.product);
    if (!product) return;
    const nextStatus = statusButton.dataset.status;
    product.status = nextStatus;

    if (useSupabase) {
      supabaseClient
        .from("products")
        .update({ status: nextStatus })
        .eq("id", product.id)
        .then(async ({ error }) => {
          if (error) throw error;
          await loadSupabaseWorkspace();
          renderDashboard();
        })
        .catch((error) => alert(error.message || "Impossible de changer le statut."));
      return;
    }

    state.activity.push(`${product.name} passe en statut ${statusLabel(nextStatus)}.`);
    saveState();
    renderDashboard();
    return;
  }

  const button = stockButton;
  const product = state.products.find((item) => item.id === button.dataset.stock);
  if (!product) return;
  product.stock = Math.max(0, Number(product.stock || 0) + Number(button.dataset.delta));

  if (useSupabase) {
    supabaseClient
      .from("products")
      .update({ stock: product.stock })
      .eq("id", product.id)
      .then(async ({ error }) => {
        if (error) throw error;
        await loadSupabaseWorkspace();
        renderDashboard();
      })
      .catch((error) => alert(error.message || "Impossible de mettre le stock a jour."));
    return;
  }

  state.activity.push(`Stock mis a jour pour ${product.name}.`);
  saveState();
  renderDashboard();
});

async function init() {
  if (useSupabase) {
    try {
      await loadSupabaseWorkspace();
      supabaseClient.auth.onAuthStateChange(async () => {
        await loadSupabaseWorkspace().catch(() => {});
        renderAuth();
      });
    } catch (error) {
      state.activity = [`Supabase: ${error.message}`, ...seedState.activity];
    }
  }
  renderAuth();
}

init();
