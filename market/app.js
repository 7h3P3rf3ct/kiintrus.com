const STORAGE_KEY = "kiintrus-market-dashboard";
const supabaseConfig = window.KIINTRUS_SUPABASE;
const supabaseClient =
  window.supabase && supabaseConfig?.url && supabaseConfig?.anonKey
    ? window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey)
    : null;
const useSupabase = Boolean(supabaseClient);
const seedCatalog = window.KIINTRUS_SEED_CATALOG || { stores: [], products: [] };
const defaultCategories = [
  { id: "cat-beaute", name: "Beauté", slug: "beaute", status: "active" },
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
    "Catalogue actuel importé dans le marketplace.",
    "Les articles publiés alimentent automatiquement la vitrine publique.",
  ],
};

let state = loadState();
let activePanel = "overview";
let productQuery = "";
let productStoreFilter = "all";
let productStatusFilter = "all";

const authView = document.querySelector("#authView");
const dashboardView = document.querySelector("#dashboardView");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const authTabs = document.querySelectorAll("[data-auth-tab]");
const navButtons = document.querySelectorAll("[data-panel]");
const panels = document.querySelectorAll(".panel");
const roleLabel = document.querySelector("#roleLabel");
const workspaceTitle = document.querySelector("#workspaceTitle");
const logoutButton = document.querySelector("#logoutButton");
const accountLogoutButton = document.querySelector("#accountLogoutButton");
const openNewProduct = document.querySelector("#openNewProduct");
const openNewStore = document.querySelector("#openNewStore");
const openNewCategory = document.querySelector("#openNewCategory");
const productDialog = document.querySelector("#productDialog");
const storeDialog = document.querySelector("#storeDialog");
const categoryDialog = document.querySelector("#categoryDialog");
const closeDialog = document.querySelector("#closeDialog");
const closeStoreDialog = document.querySelector("#closeStoreDialog");
const closeCategoryDialog = document.querySelector("#closeCategoryDialog");
const productForm = document.querySelector("#productForm");
const storeForm = document.querySelector("#storeForm");
const accountForm = document.querySelector("#accountForm");
const categoryForm = document.querySelector("#categoryForm");
const productStore = document.querySelector("#productStore");
const productCategoryInput = document.querySelector("#productCategoryInput");
const productCategoryPicker = document.querySelector("#productCategoryPicker");
const productStoreFilterSelect = document.querySelector("#productStoreFilter");
const productStatusFilterSelect = document.querySelector("#productStatusFilter");
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
  const name = state.stores.find((store) => store.id === storeId)?.name || "Boutique";
  return name === "All items" ? "Sélection Kiintrus" : name;
}

function visibleStores() {
  return state.stores
    .filter((store) => store.role !== "admin" && store.name !== "All items")
    .sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));
}

function formStores() {
  return state.stores
    .filter((store) => store.role !== "admin")
    .sort((a, b) => storeName(a.id).localeCompare(storeName(b.id), "fr", { sensitivity: "base" }));
}

function activeCategories() {
  return state.categories
    .filter((category) => category.status !== "archived")
    .sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));
}

function findCategoryByNameOrSlug(value) {
  const slug = slugify(value);
  return state.categories.find((category) => category.slug === slug || category.name.toLowerCase() === value.toLowerCase());
}

function visibleProducts() {
  const user = currentUser();
  if (!user) return [];
  return state.products.filter((product) => {
    const canSee = isAdmin() || product.storeId === user.id;
    const matchesStore = productStoreFilter === "all" || product.storeId === productStoreFilter;
    const matchesStatus = productStatusFilter === "all" || product.status === productStatusFilter;
    const haystack = `${product.name} ${product.description} ${storeName(product.storeId)}`.toLowerCase();
    return canSee && matchesStore && matchesStatus && haystack.includes(productQuery.toLowerCase());
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
    slug: store.slug,
    email: store.email,
    phone: store.phone || "",
    role: "merchant",
    status: store.status,
    ownerId: store.owner_id,
  };
}

function mapProductFromDb(product) {
  const images = (product.images || []).sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));
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
    image: product.image_url || images[0]?.image_url || "assets/hero-marketplace.png",
    imagePath: product.image_path,
    images: images.map((image) => ({
      id: image.id,
      url: image.image_url,
      path: image.image_path,
      sortOrder: image.sort_order,
    })),
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

async function uploadProductImages(files, storeId) {
  const list = Array.from(files || []).filter(Boolean);
  if (!list.length) return [];

  if (!useSupabase) {
    return Promise.all(list.map((file) => fileToDataUrl(file)));
  }

  const uploads = [];
  for (const file of list) {
    uploads.push(await uploadProductImage(file, storeId));
  }
  return uploads;
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

  let imagesByProduct = {};
  if (products?.length) {
    const { data: images } = await supabaseClient
      .from("product_images")
      .select("id, product_id, image_url, image_path, sort_order")
      .in(
        "product_id",
        products.map((product) => product.id),
      )
      .order("sort_order", { ascending: true });
    imagesByProduct = (images || []).reduce((acc, image) => {
      acc[image.product_id] = [...(acc[image.product_id] || []), image];
      return acc;
    }, {});
  }

  const { data: categories, error: categoriesError } = await supabaseClient
    .from("categories")
    .select("id, name, slug, status")
    .order("name", { ascending: true });

  state.stores = stores.map(mapStoreFromDb);
  state.products = products.map((product) => mapProductFromDb({ ...product, images: imagesByProduct[product.id] || [] }));
  state.categories = categoriesError ? defaultCategories : categories.map(mapCategoryFromDb);
  state.activity = [
    categoriesError ? "Données chargées sans table catégories pour le moment." : "Données chargées.",
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
  workspaceTitle.textContent = isAdmin() ? "Kiintrus Marketplace" : user.name;
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
  renderAccount();
  renderActivity();
}

function renderStoreOptions() {
  const options = [
    ...(isAdmin() ? ['<option value="all">Toutes les boutiques</option>'] : []),
    ...visibleStores()
      .filter((store) => isAdmin() || store.id === currentUser()?.id)
      .map((store) => `<option value="${store.id}">${escapeHtml(store.name)}</option>`),
  ].join("");

  productStoreFilterSelect.innerHTML = options;
  if (!Array.from(productStoreFilterSelect.options).some((option) => option.value === productStoreFilter)) {
    productStoreFilter = "all";
  }
  productStoreFilterSelect.value = productStoreFilter;
  if (!isAdmin()) productStoreFilterSelect.value = currentUser().id;

  productStore.innerHTML = formStores()
    .filter((store) => isAdmin() || store.id === currentUser()?.id)
    .map((store) => `<option value="${store.id}">${escapeHtml(storeName(store.id))}</option>`)
    .join("");
}

function renderCategoryOptions() {
  if (!productCategoryPicker) return;
  productCategoryPicker.innerHTML = [
    '<option value="">Choisir</option>',
    ...activeCategories().map((category) => `<option value="${escapeHtml(category.slug)}">${escapeHtml(category.name)}</option>`),
  ].join("");
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
    <article class="${compact ? "list-row" : "product-row"}" ${compact ? "" : `data-edit-product="${product.id}"`} tabindex="${compact ? "-1" : "0"}">
      ${compact ? "" : `<img src="${product.image}" alt="${escapeHtml(product.name)}" />`}
      <div>
        <strong>${escapeHtml(product.name)}</strong>
        <span>${escapeHtml(storeName(product.storeId))} · ${escapeHtml(product.price)} · Stock ${Number(product.stock || 0)} · ${(product.images?.length || 1)} photo(s)</span>
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
    published: "Publié",
    archived: "Retiré",
    rejected: "Rejeté",
  }[status] || status;
}

function productStatusActions(product) {
  const actions = [];
  if (isAdmin()) {
    if (product.status !== "published") actions.push({ status: "published", label: "Publier" });
    if (product.status === "published") actions.push({ status: "draft", label: "Dépublier" });
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
  document.querySelector("#productTable").innerHTML = products.map((product) => productRow(product)).join("") || emptyMessage("Aucun article trouvé.");
  document.querySelector("#recentProducts").innerHTML =
    products
      .slice(0, 5)
      .map((product) => productRow(product, true))
      .join("") || emptyMessage("Aucun article publié pour le moment.");
}

function renderStores() {
  document.querySelector("#storeList").innerHTML = state.stores
    .filter((store) => store.role !== "admin")
    .sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }))
    .map(
      (store) => `
        <article class="store-card" data-edit-store="${store.id}" tabindex="0">
          <div>
            <strong>${escapeHtml(storeName(store.id))}</strong>
            <span>${escapeHtml(store.email)} · ${escapeHtml(store.phone || "Téléphone à ajouter")}</span>
          </div>
          <small>${state.products.filter((product) => product.storeId === store.id).length} article(s)</small>
          <span class="status ${store.status === "active" ? "published" : "pending"}">${store.status === "active" ? "Actif" : "En attente"}</span>
        </article>
      `,
    )
    .join("");
}

function renderAccount() {
  const user = currentUser();
  if (!user || !accountForm) return;
  document.querySelector("#accountName").value = user.name || "";
  document.querySelector("#accountEmail").value = user.email || "";
  document.querySelector("#accountRole").value = isAdmin() ? "Admin principale" : "Marchand";
}

function renderCategories() {
  const list = document.querySelector("#categoryList");
  if (!list) return;
  list.innerHTML = state.categories
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }))
    .map(
      (category) => `
        <article class="store-card" data-edit-category="${category.id}" tabindex="0">
          <div>
            <strong>${escapeHtml(category.name)}</strong>
            <span>${escapeHtml(category.slug)}</span>
          </div>
          <small>${state.products.filter((product) => product.category === category.slug).length} article(s)</small>
          <span class="status ${category.status === "active" ? "published" : "draft"}">${category.status === "active" ? "Active" : "Masquée"}</span>
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
      "Demande envoyée. Vérifiez l’email marchand puis l’admin pourra valider la boutique.";
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
  state.activity.push(`Demande de création reçue pour ${name}.`);
  saveState();
  registerForm.reset();
  registerForm.querySelector(".helper-text").textContent = "Demande envoyée. L’admin pourra valider le compte.";
});

logoutButton?.addEventListener("click", async () => {
  await logout();
});

accountLogoutButton?.addEventListener("click", async () => {
  await logout();
});

async function logout() {
  if (useSupabase) {
    await supabaseClient.auth.signOut();
  }
  state.session = null;
  saveState();
  renderAuth();
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => setPanel(button.dataset.panel));
});

document.querySelectorAll("[data-panel-shortcut]").forEach((button) => {
  button.addEventListener("click", () => setPanel(button.dataset.panelShortcut));
});

openNewProduct?.addEventListener("click", () => {
  openProductDialog();
});

closeDialog?.addEventListener("click", () => productDialog.close());

function fillProductDialog(product) {
  productForm.reset();
  document.querySelector("#productId").value = product?.id || "";
  document.querySelector("#productDialogTitle").textContent = product ? "Modifier l'article" : "Ajouter un produit";
  productStore.value = product?.storeId || productStore.value;
  const category = state.categories.find((item) => item.slug === product?.category);
  productCategoryInput.value = category?.name || product?.category || "";
  productCategoryPicker.value = category?.slug || "";
  document.querySelector("#productName").value = product?.name || "";
  document.querySelector("#productPrice").value = product?.price || "";
  document.querySelector("#productStock").value = Number(product?.stock ?? 1);
  document.querySelector("#productStatus").value = product?.status || (isAdmin() ? "published" : "pending");
  document.querySelector("#productDescription").value = product?.description || "";
  const images = product?.images?.length ? product.images.map((image) => image.url) : product?.image ? [product.image] : [];
  document.querySelector("#productImagePreview").innerHTML =
    images.map((image) => `<img src="${escapeHtml(image)}" alt="${escapeHtml(product?.name || "Article")}" />`).join("") ||
    `<span>Aucune photo ajoutée.</span>`;
}

function openProductDialog(productId = null) {
  renderStoreOptions();
  renderCategoryOptions();
  const product = productId ? state.products.find((item) => item.id === productId) : null;
  fillProductDialog(product);
  productDialog.showModal();
}

productForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const productId = document.querySelector("#productId").value;
  const selectedStoreId = productStore.value;
  const selectedFiles = document.querySelector("#productImage").files;
  const categoryName = productCategoryInput.value.trim();
  const existingCategory = findCategoryByNameOrSlug(categoryName);
  const category = existingCategory?.slug || slugify(categoryName);
  if (!categoryName || !category) return;

  if (useSupabase) {
    try {
      if (!existingCategory && isAdmin()) {
        await supabaseClient.from("categories").insert({ name: categoryName, slug: category, status: "active" });
      }
      const uploadedImages = await uploadProductImages(selectedFiles, selectedStoreId);
      const status = isAdmin() ? document.querySelector("#productStatus").value : "pending";
      const payload = {
        store_id: selectedStoreId,
        name: document.querySelector("#productName").value.trim(),
        category,
        price_cfa: parseCfaPrice(document.querySelector("#productPrice").value),
        stock: Number(document.querySelector("#productStock").value || 0),
        status,
        description: document.querySelector("#productDescription").value.trim(),
      };
      if (uploadedImages.length) {
        payload.image_url = uploadedImages[0].url || uploadedImages[0];
        payload.image_path = uploadedImages[0].path || null;
      }

      const request = productId
        ? supabaseClient.from("products").update(payload).eq("id", productId).select("id").single()
        : supabaseClient
            .from("products")
            .insert({ ...payload, created_by: state.session.profileId })
            .select("id")
            .single();
      const { data, error } = await request;
      if (error) throw error;

      if (uploadedImages.length) {
        const targetProductId = productId || data.id;
        await supabaseClient.from("product_images").delete().eq("product_id", targetProductId);
        const { error: imagesError } = await supabaseClient.from("product_images").insert(
          uploadedImages.map((image, index) => ({
            product_id: targetProductId,
            image_url: image.url || image,
            image_path: image.path || null,
            sort_order: index,
          })),
        );
        if (imagesError) throw imagesError;
      }
      productDialog.close();
      await loadSupabaseWorkspace();
      renderDashboard();
    } catch (error) {
      alert(error.message || "Impossible d'enregistrer l'article.");
    }
    return;
  }

  const uploadedImages = await uploadProductImages(selectedFiles, selectedStoreId);
  if (!existingCategory) {
    state.categories.push({ id: `cat-${Date.now()}`, name: categoryName, slug: category, status: "active" });
  }
  const existingProduct = state.products.find((item) => item.id === productId);
  const product = existingProduct || {
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  Object.assign(product, {
    storeId: selectedStoreId,
    name: document.querySelector("#productName").value.trim(),
    category,
    price: document.querySelector("#productPrice").value.trim(),
    stock: Number(document.querySelector("#productStock").value || 0),
    status: document.querySelector("#productStatus").value,
    description: document.querySelector("#productDescription").value.trim(),
  });
  if (uploadedImages.length) {
    product.image = uploadedImages[0];
    product.images = uploadedImages.map((url, index) => ({ url, sortOrder: index }));
  }
  if (!existingProduct) state.products.push(product);
  state.activity.push(`${product.name} ${existingProduct ? "modifié" : "ajouté"} par ${storeName(product.storeId)}.`);
  saveState();
  productDialog.close();
  renderDashboard();
});

openNewStore?.addEventListener("click", () => openStoreDialog());
closeStoreDialog?.addEventListener("click", () => storeDialog.close());

function openStoreDialog(storeId = null) {
  const store = storeId ? state.stores.find((item) => item.id === storeId) : null;
  storeForm.reset();
  document.querySelector("#storeDialogTitle").textContent = store ? "Modifier la boutique" : "Ajouter une boutique";
  document.querySelector("#storeId").value = store?.id || "";
  document.querySelector("#storeName").value = store?.name || "";
  document.querySelector("#storeSlug").value = store?.slug || "";
  document.querySelector("#storeEmail").value = store?.email || "";
  document.querySelector("#storePhone").value = store?.phone || "";
  document.querySelector("#storeStatus").value = store?.status || "active";
  storeDialog.showModal();
}

storeForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isAdmin()) return;
  const storeId = document.querySelector("#storeId").value;
  const name = document.querySelector("#storeName").value.trim();
  const slug = slugify(document.querySelector("#storeSlug").value.trim() || name);
  const email = document.querySelector("#storeEmail").value.trim();
  const phone = document.querySelector("#storePhone").value.trim();
  const status = document.querySelector("#storeStatus").value;
  if (!name || !email) return;

  if (useSupabase) {
    const payload = { name, slug, email, phone, status };
    const request = storeId
      ? supabaseClient.from("stores").update(payload).eq("id", storeId)
      : supabaseClient.from("stores").insert({ ...payload, created_by: state.session.profileId });
    request
      .then(async ({ error }) => {
        if (error) throw error;
        storeDialog.close();
        await loadSupabaseWorkspace();
        renderDashboard();
      })
      .catch((error) => {
        alert(error.message || "Impossible de créer la boutique.");
      });
    return;
  }

  const existingStore = state.stores.find((store) => store.id === storeId);
  if (existingStore) {
    Object.assign(existingStore, { name, slug, email, phone, status });
  } else {
    state.stores.push({
      id: `store-${Date.now()}`,
      name,
      slug,
      email,
      phone,
      role: "merchant",
      status,
    });
  }
  state.activity.push(`Boutique ${name} ${existingStore ? "modifiée" : "créée"}.`);
  saveState();
  storeDialog.close();
  renderDashboard();
});

openNewCategory?.addEventListener("click", () => openCategoryDialog());
closeCategoryDialog?.addEventListener("click", () => categoryDialog.close());

function openCategoryDialog(categoryId = null) {
  const category = categoryId ? state.categories.find((item) => item.id === categoryId) : null;
  categoryForm.reset();
  document.querySelector("#categoryDialogTitle").textContent = category ? "Modifier la catégorie" : "Ajouter une catégorie";
  document.querySelector("#categoryId").value = category?.id || "";
  document.querySelector("#categoryName").value = category?.name || "";
  document.querySelector("#categorySlug").value = category?.slug || "";
  document.querySelector("#categoryStatus").value = category?.status || "active";
  categoryDialog.showModal();
}

categoryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isAdmin()) return;
  const categoryId = document.querySelector("#categoryId").value;
  const name = document.querySelector("#categoryName").value.trim();
  const slug = slugify(document.querySelector("#categorySlug").value.trim() || name);
  const status = document.querySelector("#categoryStatus").value;
  if (!name || !slug) return;

  if (useSupabase) {
    const request = categoryId
      ? supabaseClient.from("categories").update({ name, slug, status }).eq("id", categoryId)
      : supabaseClient.from("categories").insert({ name, slug, status });
    request
      .then(async ({ error }) => {
        if (error) throw error;
        categoryDialog.close();
        await loadSupabaseWorkspace();
        renderDashboard();
      })
      .catch((error) => {
        alert(error.message || "Impossible d’enregistrer la catégorie.");
      });
    return;
  }

  const existingCategory = state.categories.find((category) => category.id === categoryId);
  if (existingCategory) {
    Object.assign(existingCategory, { name, slug, status });
  } else {
    state.categories.push({ id: `cat-${Date.now()}`, name, slug, status });
  }
  state.activity.push(`Catégorie ${name} ${existingCategory ? "modifiée" : "ajoutée"}.`);
  saveState();
  categoryDialog.close();
  renderDashboard();
});

productStoreFilterSelect?.addEventListener("change", (event) => {
  productStoreFilter = event.target.value;
  renderDashboard();
});

productStatusFilterSelect?.addEventListener("change", (event) => {
  productStatusFilter = event.target.value;
  renderDashboard();
});

productSearch?.addEventListener("input", (event) => {
  productQuery = event.target.value;
  renderDashboard();
});

document.querySelector("#productTable")?.addEventListener("click", (event) => {
  const row = event.target.closest("[data-edit-product]");
  const stockButton = event.target.closest("[data-stock]");
  const statusButton = event.target.closest("[data-status]");
  if (!stockButton && !statusButton && row) {
    openProductDialog(row.dataset.editProduct);
    return;
  }
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

document.querySelector("#storeList")?.addEventListener("click", (event) => {
  const card = event.target.closest("[data-edit-store]");
  if (!card) return;
  openStoreDialog(card.dataset.editStore);
});

document.querySelector("#categoryList")?.addEventListener("click", (event) => {
  const card = event.target.closest("[data-edit-category]");
  if (!card) return;
  openCategoryDialog(card.dataset.editCategory);
});

productCategoryPicker?.addEventListener("change", (event) => {
  const category = state.categories.find((item) => item.slug === event.target.value);
  if (category) productCategoryInput.value = category.name;
});

accountForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fullName = document.querySelector("#accountName").value.trim();
  if (useSupabase && state.session?.profileId) {
    const { error } = await supabaseClient.from("profiles").update({ full_name: fullName }).eq("id", state.session.profileId);
    if (error) {
      alert(error.message || "Impossible de mettre le compte à jour.");
      return;
    }
    await loadSupabaseWorkspace();
  } else if (state.session?.storeId) {
    const user = currentUser();
    if (user) user.name = fullName;
    saveState();
  }
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
