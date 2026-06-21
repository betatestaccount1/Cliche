const initialProducts = [
    {
        id: "1",
        title: "Draped Silk Trench Coat",
        vendor: "COUTURE PARIS",
        price: 890,
        oldPrice: 1200,
        category: "women",
        badge: "Pre-order",
        color: "#eae9e5",
        size: "M",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
        description: "Crafted in lightweight, flowing premium mulberry silk weave, features precise drapes, side sash ties, and standard lapels."
    },
    {
        id: "2",
        title: "Structured Linen Blazer",
        vendor: "COS BESPOKE",
        price: 450,
        oldPrice: null,
        category: "women",
        badge: "Hot Buy",
        color: "#111111",
        size: "S",
        image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=800&q=80",
        description: "Minimal structured tailored linen jacket designed with soft padding shoulders, minimal visual lines, and a smooth silk lining inside."
    },
    {
        id: "3",
        title: "Oversized Cashmere Turtleneck",
        vendor: "Aritzia Studio",
        price: 320,
        oldPrice: 400,
        category: "women",
        badge: "Exclusive",
        color: "#c5a880",
        size: "L",
        image: "https://images.unsplash.com/photo-1574164904299-3a102b110380?auto=format&fit=crop&w=800&q=80",
        description: "Spun from highly curated Mongolian wool yarns. Incredibly cozy luxury mockneck styling for transitional seasonal layers."
    },
    {
        id: "4",
        title: "Structured Wool Tailored Suit",
        vendor: "Sartorial Milan",
        price: 950,
        oldPrice: null,
        category: "men",
        badge: "New Season",
        color: "#111111",
        size: "L",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        description: "Handcrafted Italian wool structured suit matching precise double vent contours and timeless modern elegance."
    },
    {
        id: "5",
        title: "Asymmetric Silk Wrap Slip Dress",
        vendor: "Couture Paris",
        price: 520,
        oldPrice: 650,
        category: "women",
        badge: "Limited Drop",
        color: "#eae9e5",
        size: "S",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        description: "A premium 100% natural silk wrap dress with raw cut details, perfect for modern cocktail evenings and luxury dynamic gatherings."
    },
    {
        id: "6",
        title: "Leather Accent Structured Frame Bag",
        vendor: "FARFETCH S.A.",
        price: 780,
        oldPrice: null,
        category: "accessories",
        badge: "Signature",
        color: "#111111",
        size: "One Size",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        description: "Crafted in supple French calfskin leather with dynamic architectural gold-toned latch systems."
    },
    {
        id: "7",
        title: "Bespoke Cashmere Rib Knit Trousers",
        vendor: "Aritzia Studio",
        price: 290,
        oldPrice: 350,
        category: "women",
        badge: "Lounge",
        color: "#eae9e5",
        size: "M",
        image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=800&q=80",
        description: "Lounge-wear redined with elegant luxury ribbed weave and premium ultra-comfortable elastic bands."
    },
    {
        id: "8",
        title: "Raw Cut Denim Overcoat",
        vendor: "COS BESPOKE",
        price: 390,
        oldPrice: null,
        category: "men",
        badge: "Raw Denim",
        color: "#111111",
        size: "XL",
        image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80",
        description: "Unwashed heavy-duty organic indigo denim jacket featuring raw visual edges, metal hardware buttons, and clean side pockets."
    }
];

// Core App Module
class LToileApp {
    constructor() {
        this.initDB();
        this.routes = ['home', 'shop', 'product', 'cart', 'checkout', 'auth', 'dashboard', 'wishlist', 'tracking'];
        this.activeRoute = 'home';

        // Active State Management
        this.cart = JSON.parse(localStorage.getItem('lt_cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('lt_wishlist')) || [];
        this.user = JSON.parse(localStorage.getItem('lt_user')) || null;
        this.searchHistory = JSON.parse(localStorage.getItem('lt_search_history')) || ['Trench', 'Linen', 'Silk', 'Suit'];
        this.orders = JSON.parse(localStorage.getItem('lt_orders')) || [];
        this.compareList = [];

        // Filter States
        this.filters = {
            category: 'all',
            maxPrice: 1000,
            colors: [],
            sizes: [],
            sortBy: 'recommended'
        };

        this.layoutCols = 3;

        // Fire state initiation
        window.addEventListener('hashchange', () => this.handleRouting());
        window.addEventListener('load', () => this.initApp());
    }

    initDB() {
        if (!localStorage.getItem('lt_products')) {
            localStorage.setItem('lt_products', JSON.stringify(initialProducts));
        }
    }

    getProducts() {
        return JSON.parse(localStorage.getItem('lt_products'));
    }

    saveProducts(updatedProducts) {
        localStorage.setItem('lt_products', JSON.stringify(updatedProducts));
    }

    initApp() {
        this.setupNavigation();
        this.setupThemeToggle();
        this.setupSearch();
        this.setupCheckout();
        this.setupDashboard();
        this.setupCompare();
        this.handleRouting();
        this.updateBadges();
        this.setupLogistics();
        this.simulatePWA();
    }

    // High Performance Toast System
    showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = 'toast';

        const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';

        toast.innerHTML = `
                    <div class="toast-content">
                        <i class="fa-solid ${icon} toast-icon"></i>
                        <span class="toast-message">${message}</span>
                    </div>
                    <i class="fa-solid fa-xmark toast-close"></i>
                `;

        container.appendChild(toast);

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 400);
        });

        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.add('hide');
                setTimeout(() => toast.remove(), 400);
            }
        }, 4000);
    }

    updateBadges() {
        document.getElementById('cartBadge').innerText = this.cart.reduce((acc, item) => acc + item.quantity, 0);
        document.getElementById('wishlistBadge').innerText = this.wishlist.length;
    }

    // SPA Routing Mechanism
    handleRouting() {
        const hash = window.location.hash.slice(1) || 'home';
        const routeParts = hash.split('?');
        this.activeRoute = routeParts[0];
        const queryParams = routeParts[1] ? new URLSearchParams(routeParts[1]) : null;

        // Close menu if open
        document.getElementById('navLinks').classList.remove('active');

        // Render views
        const views = document.querySelectorAll('.page-view');
        views.forEach(view => view.classList.remove('active'));

        const targetView = document.getElementById(`view-${this.activeRoute}`);
        if (targetView) {
            targetView.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Header Navigation visual sync
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('data-route') === this.activeRoute) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Specific Routing actions
        if (this.activeRoute === 'home') {
            this.renderHomeViews();
        } else if (this.activeRoute === 'shop') {
            this.renderShopView();
        } else if (this.activeRoute === 'product' && queryParams) {
            this.renderProductDetails(queryParams.get('id'));
        } else if (this.activeRoute === 'cart') {
            this.renderCartView();
        } else if (this.activeRoute === 'checkout') {
            this.renderCheckoutView();
        } else if (this.activeRoute === 'auth') {
            this.renderAuthView();
        } else if (this.activeRoute === 'dashboard') {
            this.renderDashboardView();
        } else if (this.activeRoute === 'wishlist') {
            this.renderWishlistView();
        }
    }

    setupNavigation() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const navLinks = document.getElementById('navLinks');

        sidebarToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.classList.toggle('active');
        });

        window.addEventListener('scroll', () => {
            const header = document.getElementById('mainHeader');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    setupThemeToggle() {
        const btn = document.getElementById('themeToggleBtn');

        // Init saved theme
        const savedTheme = localStorage.getItem('lt_theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        btn.innerHTML = savedTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';

        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('lt_theme', nextTheme);
            btn.innerHTML = nextTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
            this.showToast(`Switched to premium ${nextTheme} styling`, 'success');
        });
    }

    // Simulated PWA Support
    simulatePWA() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                this.showToast("Offline Sync & PWA Ready", "success");
            });
        }
    }

    // ==================== 1. HOME VIEW RENDERER ====================
    renderHomeViews() {
        const products = this.getProducts().slice(0, 4);
        const trendingGrid = document.getElementById('homeTrendingGrid');
        trendingGrid.innerHTML = '';

        products.forEach(p => {
            trendingGrid.appendChild(this.buildProductCard(p));
        });
    }

    buildProductCard(p) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
                    <div class="product-img-wrap">
                        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
                        <img src="${p.image}" alt="${p.title}" class="product-img" loading="lazy">
                        <img src="${p.image}" alt="${p.title}" class="product-img-hover" loading="lazy">
                        <div class="product-actions-overlay">
                            <button class="action-overlay-btn wishlist-add" data-id="${p.id}" title="Add to Wishlist"><i class="fa-regular fa-heart"></i></button>
                            <button class="action-overlay-btn compare-add" data-id="${p.id}" title="Compare Product"><i class="fa-solid fa-code-compare"></i></button>
                            <button class="action-overlay-btn quick-add" data-id="${p.id}" title="Add to Bag"><i class="fa-solid fa-bag-shopping"></i></button>
                        </div>
                    </div>
                    <div class="product-info">
                        <span class="product-vendor">${p.vendor}</span>
                        <a href="#product?id=${p.id}" class="product-title">${p.title}</a>
                        <div class="product-price-row">
                            <span class="product-price">$${p.price}</span>
                            ${p.oldPrice ? `<span class="product-price-old">$${p.oldPrice}</span>` : ''}
                        </div>
                    </div>
                `;

        // Handle Overlay Interactive Actions
        card.querySelector('.wishlist-add').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleWishlist(p.id);
        });
        card.querySelector('.compare-add').addEventListener('click', (e) => {
            e.stopPropagation();
            this.addToCompare(p.id);
        });
        card.querySelector('.quick-add').addEventListener('click', (e) => {
            e.stopPropagation();
            this.addToCart(p.id, p.size, p.color, 1);
        });

        return card;
    }

    // ==================== 2. SHOP VIEW RENDERER ====================
    renderShopView() {
        this.renderShopFilters();
        this.filterAndRenderShopProducts();
    }

    renderShopFilters() {
        const products = this.getProducts();

        // Get unique items
        const categories = ['all', ...new Set(products.map(p => p.category))];
        const colors = [...new Set(products.map(p => p.color))];
        const sizes = [...new Set(products.map(p => p.size))];

        // Render categories checkboxes / options
        const catContainer = document.getElementById('categoryFilterContainer');
        catContainer.innerHTML = '';
        categories.forEach(cat => {
            const activeClass = this.filters.category === cat ? 'style="font-weight: 600; color: var(--accent-gold)"' : '';
            catContainer.innerHTML += `
                        <label class="filter-label" ${activeClass} onclick="app.setCategoryFilter('${cat}')">
                            <span style="text-transform: capitalize">${cat}</span>
                        </label>
                    `;
        });

        // Render colors dots
        const colorContainer = document.getElementById('colorFilterContainer');
        colorContainer.innerHTML = '';
        colors.forEach(col => {
            const activeClass = this.filters.colors.includes(col) ? 'active' : '';
            colorContainer.innerHTML += `
                        <button class="color-dot-btn ${activeClass}" style="background-color: ${col}" onclick="app.toggleColorFilter('${col}')"></button>
                    `;
        });

        // Render sizes
        const sizeContainer = document.getElementById('sizeFilterContainer');
        sizeContainer.innerHTML = '';
        sizes.forEach(sz => {
            const activeClass = this.filters.sizes.includes(sz) ? 'active' : '';
            sizeContainer.innerHTML += `
                        <button class="size-box-btn ${activeClass}" onclick="app.toggleSizeFilter('${sz}')">${sz}</button>
                    `;
        });

        // Handle Slider inputs
        const slider = document.getElementById('priceRangeSlider');
        slider.value = this.filters.maxPrice;
        document.getElementById('priceMaxLabel').innerText = `$${this.filters.maxPrice}`;

        // Unbind previous event listener to avoid memory leak
        slider.oninput = (e) => {
            this.filters.maxPrice = parseInt(e.target.value);
            document.getElementById('priceMaxLabel').innerText = `$${this.filters.maxPrice}`;
            this.filterAndRenderShopProducts();
        };

        // Clear Filter Button action
        document.getElementById('clearFiltersBtn').onclick = () => {
            this.filters = { category: 'all', maxPrice: 1000, colors: [], sizes: [], sortBy: 'recommended' };
            this.renderShopView();
        };

        // Sort Event Handler
        const sortSelect = document.getElementById('shopSortSelect');
        sortSelect.value = this.filters.sortBy;
        sortSelect.onchange = (e) => {
            this.filters.sortBy = e.target.value;
            this.filterAndRenderShopProducts();
        };
    }

    setCategoryFilter(cat) {
        this.filters.category = cat;
        this.renderShopView();
    }

    toggleColorFilter(color) {
        const idx = this.filters.colors.indexOf(color);
        if (idx > -1) {
            this.filters.colors.splice(idx, 1);
        } else {
            this.filters.colors.push(color);
        }
        this.renderShopView();
    }

    toggleSizeFilter(size) {
        const idx = this.filters.sizes.indexOf(size);
        if (idx > -1) {
            this.filters.sizes.splice(idx, 1);
        } else {
            this.filters.sizes.push(size);
        }
        this.renderShopView();
    }

    filterAndRenderShopProducts() {
        // Skeleton loading state animation trigger
        const skeleton = document.getElementById('shopSkeletonLoader');
        const catalogGrid = document.getElementById('shopCatalogGrid');

        skeleton.style.display = 'grid';
        catalogGrid.style.display = 'none';

        setTimeout(() => {
            let products = this.getProducts();

            // Filter Logic
            if (this.filters.category !== 'all') {
                products = products.filter(p => p.category === this.filters.category);
            }
            products = products.filter(p => p.price <= this.filters.maxPrice);

            if (this.filters.colors.length > 0) {
                products = products.filter(p => this.filters.colors.includes(p.color));
            }

            if (this.filters.sizes.length > 0) {
                products = products.filter(p => this.filters.sizes.includes(p.size));
            }

            // Sort Logic
            if (this.filters.sortBy === 'price-low') {
                products.sort((a, b) => a.price - b.price);
            } else if (this.filters.sortBy === 'price-high') {
                products.sort((a, b) => b.price - a.price);
            } else if (this.filters.sortBy === 'alphabetical') {
                products.sort((a, b) => a.title.localeCompare(b.title));
            }

            document.getElementById('shopProductCount').innerText = products.length;

            // Grid render
            catalogGrid.innerHTML = '';
            products.forEach(p => {
                catalogGrid.appendChild(this.buildProductCard(p));
            });

            skeleton.style.display = 'none';
            catalogGrid.style.display = 'grid';
        }, 400);
    }

    // ==================== 3. PRODUCT DETAILS VIEW ====================
    renderProductDetails(productId) {
        const products = this.getProducts();
        const product = products.find(p => p.id === productId);

        if (!product) {
            this.showToast('Product specifications not found.', 'error');
            window.location.hash = '#shop';
            return;
        }

        const detailsBox = document.getElementById('productDetailsBox');
        detailsBox.innerHTML = `
                    <div class="product-gallery-wrap">
                        <div class="gallery-thumbnails">
                            <img src="${product.image}" class="thumb-img active" alt="${product.title}">
                            <img src="${product.image}" class="thumb-img" alt="${product.title}">
                        </div>
                        <div class="gallery-main" id="zoomContainer">
                            <img src="${product.image}" class="gallery-main-img" id="zoomImage" alt="${product.title}">
                        </div>
                    </div>
                    <div class="details-content-box">
                        <span class="details-vendor">${product.vendor}</span>
                        <h1 class="details-title">${product.title}</h1>
                        <p class="details-price">$${product.price}</p>
                        <p class="details-description">${product.description}</p>
                        
                        <div class="option-section">
                            <h4 class="option-title">Color: <span id="selectedDetailColorText" style="text-transform: capitalize; color: var(--accent-gold)">Default</span></h4>
                            <div class="filter-color-dots">
                                <button class="color-dot-btn active" style="background-color: ${product.color}"></button>
                            </div>
                        </div>

                        <div class="option-section">
                            <h4 class="option-title">Size Selected: <span id="selectedDetailSizeText" style="color: var(--accent-gold)">${product.size}</span></h4>
                            <div class="filter-sizes">
                                <button class="size-box-btn active">${product.size}</button>
                            </div>
                        </div>

                        <div class="option-section">
                            <h4 class="option-title">Quantity</h4>
                            <div class="quantity-spinner">
                                <button class="spinner-btn" id="qtyMinusBtn"><i class="fa-solid fa-minus"></i></button>
                                <span class="spinner-value" id="qtyValue">1</span>
                                <button class="spinner-btn" id="qtyPlusBtn"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>

                        <div class="actions-row">
                            <button class="btn btn-primary" id="detailAddCartBtn" style="flex:1"><i class="fa-solid fa-bag-shopping"></i> Add To Bag</button>
                            <button class="btn btn-secondary" id="detailWishlistBtn"><i class="fa-regular fa-heart"></i></button>
                        </div>

                        <div class="product-tabs">
                            <div class="tab-headers">
                                <div class="tab-header active" data-tab="specs">Specs</div>
                                <div class="tab-header" data-tab="delivery">Private Delivery</div>
                            </div>
                            <div class="tab-content active" id="tab-specs">
                                Crafted from custom design yarns sourced sustainably. Features secure double stitches and premium tailored alignment.
                            </div>
                            <div class="tab-content" id="tab-delivery">
                                Free premium priority home delivery. Includes luxury branded packaging boxes and optional customized cards.
                            </div>
                        </div>
                    </div>
                `;

        // Add interactive details page features
        this.setupDetailInteractions(product);
        this.renderRelatedProducts(product);
    }

    setupDetailInteractions(product) {
        let qty = 1;
        const qtyVal = document.getElementById('qtyValue');

        document.getElementById('qtyPlusBtn').onclick = () => {
            qty++;
            qtyVal.innerText = qty;
        };

        document.getElementById('qtyMinusBtn').onclick = () => {
            if (qty > 1) {
                qty--;
                qtyVal.innerText = qty;
            }
        };

        document.getElementById('detailAddCartBtn').onclick = () => {
            this.addToCart(product.id, product.size, product.color, qty);
        };

        document.getElementById('detailWishlistBtn').onclick = () => {
            this.toggleWishlist(product.id);
        };

        // Tab Switcher on Details Page
        const headers = document.querySelectorAll('.tab-header');
        headers.forEach(h => {
            h.onclick = () => {
                headers.forEach(head => head.classList.remove('active'));
                h.classList.add('active');

                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                document.getElementById(`tab-${h.getAttribute('data-tab')}`).classList.add('active');
            };
        });

        // Simple Hover Zoom Logic for Premium Touch UI
        const container = document.getElementById('zoomContainer');
        const img = document.getElementById('zoomImage');

        container.onmousemove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = 'scale(1.5)';
        };

        container.onmouseleave = () => {
            img.style.transform = 'scale(1)';
            img.style.transformOrigin = 'center center';
        };
    }

    renderRelatedProducts(product) {
        const products = this.getProducts().filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
        const grid = document.getElementById('relatedProductsGrid');
        grid.innerHTML = '';

        products.forEach(p => {
            grid.appendChild(this.buildProductCard(p));
        });
    }

    // ==================== 4. CART & STATE ACTIONS ====================
    addToCart(productId, size, color, qty) {
        const products = this.getProducts();
        const product = products.find(p => p.id === productId);

        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId && item.size === size);

        if (existingItem) {
            existingItem.quantity += qty;
        } else {
            this.cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                size: size || product.size || 'M',
                color: color || product.color || '#fff',
                quantity: qty
            });
        }

        localStorage.setItem('lt_cart', JSON.stringify(this.cart));
        this.updateBadges();
        this.showToast(`Successfully added ${qty}x ${product.title} to Bag`, 'success');
    }

    renderCartView() {
        const list = document.getElementById('cartItemsList');
        list.innerHTML = '';

        if (this.cart.length === 0) {
            list.innerHTML = `
                        <div style="text-align: center; padding: 40px;">
                            <i class="fa-solid fa-bag-shopping" style="font-size: 48px; color: var(--text-tertiary); margin-bottom: 20px"></i>
                            <h3 style="font-family: var(--font-serif)">Your Bag is Empty</h3>
                            <p style="color: var(--text-secondary); margin-bottom: 20px">Experience timeless curated collections in the shop.</p>
                            <a href="#shop" class="btn btn-primary">Return to Catalog</a>
                        </div>
                    `;
            this.updateCartSummary(0);
            return;
        }

        this.cart.forEach((item, idx) => {
            const row = document.createElement('div');
            row.className = 'cart-item-row';
            row.innerHTML = `
                        <img src="${item.image}" class="cart-item-img" alt="${item.title}">
                        <div class="cart-item-meta">
                            <span class="cart-item-name">${item.title}</span>
                            <span class="cart-item-attrs">Size: ${item.size} | Color: <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:${item.color}"></span></span>
                            <span class="cart-item-price">$${item.price}</span>
                        </div>
                        <div class="quantity-spinner" style="margin: 0 15px">
                            <button class="spinner-btn" onclick="app.updateCartQty(${idx}, -1)"><i class="fa-solid fa-minus"></i></button>
                            <span class="spinner-value">${item.quantity}</span>
                            <button class="spinner-btn" onclick="app.updateCartQty(${idx}, 1)"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <i class="fa-regular fa-trash-can cart-item-remove" onclick="app.removeFromCart(${idx})"></i>
                    `;
            list.appendChild(row);
        });

        this.calculateCartSummary();
    }

    updateCartQty(idx, change) {
        this.cart[idx].quantity += change;
        if (this.cart[idx].quantity <= 0) {
            this.cart.splice(idx, 1);
        }
        localStorage.setItem('lt_cart', JSON.stringify(this.cart));
        this.updateBadges();
        this.renderCartView();
    }

    removeFromCart(idx) {
        this.cart.splice(idx, 1);
        localStorage.setItem('lt_cart', JSON.stringify(this.cart));
        this.updateBadges();
        this.renderCartView();
        this.showToast('Item removed from Bag', 'success');
    }

    calculateCartSummary(discountPct = 0) {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = parseFloat((subtotal * 0.08).toFixed(2));
        const discount = parseFloat((subtotal * (discountPct / 100)).toFixed(2));
        const total = subtotal + tax - discount;

        document.getElementById('cartSubtotal').innerText = `$${subtotal.toFixed(2)}`;
        document.getElementById('cartTax').innerText = `$${tax.toFixed(2)}`;
        document.getElementById('cartTotal').innerText = `$${total.toFixed(2)}`;

        // Setup Premium Coupon system
        document.getElementById('applyCouponBtn').onclick = () => {
            const code = document.getElementById('couponInput').value;
            if (code === 'LUXURY20') {
                this.showToast('Coupon verified: 20% Discount Auth', 'success');
                this.calculateCartSummary(20);
            } else {
                this.showToast('Invalid Premium Coupon Code', 'error');
                this.calculateCartSummary(0);
            }
        };
    }

    // ==================== 5. Secure Checkout Implementation ====================
    renderCheckoutView() {
        const checkoutList = document.getElementById('checkoutSummaryList');
        checkoutList.innerHTML = '';

        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = parseFloat((subtotal * 0.08).toFixed(2));
        const total = subtotal + tax;

        this.cart.forEach(item => {
            checkoutList.innerHTML += `
                        <div class="summary-row" style="margin-bottom: 10px;">
                            <span>${item.title} (x${item.quantity})</span>
                            <span>$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `;
        });

        document.getElementById('checkoutSettleTotal').innerText = `$${total.toFixed(2)}`;
    }

    setupCheckout() {
        const form = document.getElementById('checkoutForm');

        // Settle interactive method visual
        const options = document.querySelectorAll('.payment-option');
        options.forEach(opt => {
            opt.addEventListener('click', () => {
                options.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                opt.querySelector('input[type="radio"]').checked = true;
            });
        });

        form.onsubmit = (e) => {
            e.preventDefault();

            if (this.cart.length === 0) {
                this.showToast('Your cart bag is empty.', 'error');
                return;
            }

            const formData = new FormData(form);
            const orderId = 'ETOILE-' + Math.floor(100000 + Math.random() * 900000);

            const newOrder = {
                orderId: orderId,
                date: new Date().toLocaleDateString(),
                items: [...this.cart],
                total: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.08,
                status: 'Processed',
                customer: `${formData.get('firstName')} ${formData.get('lastName')}`,
                address: `${formData.get('address')}, ${formData.get('city')}`
            };

            this.orders.push(newOrder);
            localStorage.setItem('lt_orders', JSON.stringify(this.orders));

            // Empty cart
            this.cart = [];
            localStorage.setItem('lt_cart', JSON.stringify(this.cart));
            this.updateBadges();

            this.showToast(`Order Settle Successful! Auth ID: ${orderId}`, 'success');
            window.location.hash = `#tracking?id=${orderId}`;
        };
    }

    // ==================== 6. Secure AUTHENTICATION MODULE ====================
    renderAuthView() {
        const title = document.getElementById('authTitle');
        const form = document.getElementById('authForm');
        const toggleBtn = document.getElementById('toggleAuthModeBtn');

        let isLogin = true;

        toggleBtn.onclick = () => {
            isLogin = !isLogin;
            title.innerText = isLogin ? 'Sign In' : 'Create Account';
            toggleBtn.innerText = isLogin ? 'Sign Up Now' : 'Sign In Now';
        };

        form.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('authEmail').value;
            const password = document.getElementById('authPassword').value;

            // Simulate Server Login Authentication
            this.user = {
                email: email,
                name: email.split('@')[0].toUpperCase(),
                role: 'customer'
            };

            localStorage.setItem('lt_user', JSON.stringify(this.user));
            this.showToast(`Welcome premium guest user, ${this.user.name}!`, 'success');
            window.location.hash = '#dashboard';
        };
    }

    // ==================== 7. CLIENT & ADMIN CRUD DASHBOARD ====================
    renderDashboardView() {
        if (!this.user) {
            window.location.hash = '#auth';
            this.showToast('Secure sign-in access is required.', 'error');
            return;
        }

        // Profile display sync
        document.getElementById('dbProfileName').value = this.user.name;
        document.getElementById('dbProfileEmail').value = this.user.email;

        // Sync tabs visual routing
        const tabItems = document.querySelectorAll('.db-menu-item[data-tab]');
        tabItems.forEach(item => {
            item.onclick = () => {
                tabItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                document.querySelectorAll('.db-tab-content').forEach(c => c.classList.remove('active'));
                document.getElementById(`db-tab-${item.getAttribute('data-tab')}`).classList.add('active');
            };
        });

        this.renderDashboardOrders();
        this.renderCRUDProductGrid();
    }

    renderDashboardOrders() {
        const list = document.getElementById('dbOrdersList');
        list.innerHTML = '';

        if (this.orders.length === 0) {
            list.innerHTML = '<p style="color:var(--text-tertiary)">No structured purchases match your records yet.</p>';
            return;
        }

        this.orders.forEach(order => {
            list.innerHTML += `
                        <div style="background: var(--bg-primary); padding:20px; border-radius: var(--radius-sm); border: 1px solid var(--border-color)">
                            <div style="display:flex; justify-content:space-between; margin-bottom:12px">
                                <div>
                                    <strong>ID: ${order.orderId}</strong>
                                    <div style="font-size:12px; color:var(--text-secondary)">Placed on ${order.date}</div>
                                </div>
                                <span style="color:var(--accent-gold); font-weight:600">${order.status}</span>
                            </div>
                            <div style="font-size:14px">Total Settled Value: <strong>$${order.total.toFixed(2)}</strong></div>
                            <div style="margin-top:10px"><a href="#tracking?id=${order.orderId}" class="btn-text">Track Real-time Logistics</a></div>
                        </div>
                    `;
        });
    }

    // CRITICAL MODULE: SECURE PRODUCT CRUD PANEL
    renderCRUDProductGrid() {
        const grid = document.getElementById('crudProductsGrid');
        grid.innerHTML = '';
        const products = this.getProducts();

        products.forEach(p => {
            const row = document.createElement('div');
            row.className = 'crud-card';
            row.innerHTML = `
                        <img src="${p.image}" class="crud-thumb" alt="${p.title}">
                        <div>
                            <strong style="font-size:13px; display:block">${p.title}</strong>
                            <span style="font-size:11px; color:var(--accent-gold)">$${p.price}</span>
                        </div>
                        <div class="crud-actions">
                            <button class="action-overlay-btn" onclick="app.editProductCrud('${p.id}')" title="Edit Catalog Item"><i class="fa-solid fa-pen"></i></button>
                            <button class="action-overlay-btn" onclick="app.deleteProductCrud('${p.id}')" title="Delete From Database" style="color:#ea5455"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    `;
            grid.appendChild(row);
        });
    }

    setupDashboard() {
        document.getElementById('dashboardLogoutBtn').onclick = () => {
            this.user = null;
            localStorage.removeItem('lt_user');
            this.showToast('Successfully signed out of private platform.', 'success');
            window.location.hash = '#home';
        };

        // Add / Edit submission logic
        const form = document.getElementById('crudFormPanel');
        const openBtn = document.getElementById('openAddProductFormBtn');
        const cancelBtn = document.getElementById('cancelProductCrudBtn');

        openBtn.onclick = () => {
            form.style.display = 'flex';
            document.getElementById('crudFormTitle').innerText = 'Create Catalog Item';
            document.getElementById('crudProductId').value = '';
            form.reset();
        };

        cancelBtn.onclick = () => {
            form.style.display = 'none';
        };

        form.onsubmit = (e) => {
            e.preventDefault();

            const id = document.getElementById('crudProductId').value;
            const title = document.getElementById('crudTitle').value;
            const vendor = document.getElementById('crudVendor').value;
            const price = parseFloat(document.getElementById('crudPrice').value);
            const image = document.getElementById('crudImage').value;
            const category = document.getElementById('crudCategory').value;
            const badge = document.getElementById('crudBadge').value;
            const description = document.getElementById('crudDesc').value;

            let products = this.getProducts();

            if (id) {
                // Edit Flow
                products = products.map(p => {
                    if (p.id === id) {
                        return { ...p, title, vendor, price, image, category, badge, description };
                    }
                    return p;
                });
                this.showToast('Product successfully edited and updated.', 'success');
            } else {
                // Add Flow
                const newProduct = {
                    id: Date.now().toString(),
                    title, vendor, price, image, category, badge, description,
                    color: '#111111',
                    size: 'M'
                };
                products.push(newProduct);
                this.showToast('Custom Product item added successfully.', 'success');
            }

            this.saveProducts(products);
            this.renderCRUDProductGrid();
            form.style.display = 'none';
            form.reset();
        };
    }

    editProductCrud(productId) {
        const products = this.getProducts();
        const p = products.find(item => item.id === productId);

        if (!p) return;

        document.getElementById('crudFormPanel').style.display = 'flex';
        document.getElementById('crudFormTitle').innerText = 'Edit Catalog Item';
        document.getElementById('crudProductId').value = p.id;
        document.getElementById('crudTitle').value = p.title;
        document.getElementById('crudVendor').value = p.vendor;
        document.getElementById('crudPrice').value = p.price;
        document.getElementById('crudImage').value = p.image;
        document.getElementById('crudCategory').value = p.category;
        document.getElementById('crudBadge').value = p.badge || '';
        document.getElementById('crudDesc').value = p.description || '';
    }

    deleteProductCrud(productId) {
        let products = this.getProducts();
        products = products.filter(p => p.id !== productId);
        this.saveProducts(products);
        this.renderCRUDProductGrid();
        this.showToast('Product deleted from active platform.', 'success');
    }

    // ==================== 8. WISHLIST VAULT SYSTEM ====================
    toggleWishlist(productId) {
        const idx = this.wishlist.indexOf(productId);
        if (idx > -1) {
            this.wishlist.splice(idx, 1);
            this.showToast('Removed from saved Vault', 'success');
        } else {
            this.wishlist.push(productId);
            this.showToast('Saved to luxury Vault', 'success');
        }
        localStorage.setItem('lt_wishlist', JSON.stringify(this.wishlist));
        this.updateBadges();
        this.renderWishlistView();
    }

    renderWishlistView() {
        const grid = document.getElementById('wishlistProductsGrid');
        grid.innerHTML = '';

        if (this.wishlist.length === 0) {
            grid.innerHTML = `
                        <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                            <i class="fa-regular fa-heart" style="font-size: 48px; color: var(--text-tertiary); margin-bottom: 20px"></i>
                            <h3 style="font-family: var(--font-serif)">Your Wishlist is Empty</h3>
                            <p style="color: var(--text-secondary)">Explore modern tailoring and save your absolute matches.</p>
                        </div>
                    `;
            return;
        }

        const products = this.getProducts();
        const savedItems = products.filter(p => this.wishlist.includes(p.id));

        savedItems.forEach(p => {
            grid.appendChild(this.buildProductCard(p));
        });
    }

    // ==================== 9. ADVANCED LIVE SEARCH PANEL ====================
    setupSearch() {
        const modal = document.getElementById('searchOverlay');
        const openBtn = document.getElementById('searchOpenBtn');
        const closeBtn = document.getElementById('searchCloseBtn');
        const input = document.getElementById('searchQueryInput');

        openBtn.onclick = () => {
            modal.classList.add('active');
            input.focus();
            this.renderSearchHistory();
        };

        closeBtn.onclick = () => {
            modal.classList.remove('active');
        };

        // Dynamic live suggestions search input logic
        input.oninput = (e) => {
            const query = e.target.value.toLowerCase().trim();
            const list = document.getElementById('searchSuggestionsList');
            list.innerHTML = '';

            if (!query) return;

            const products = this.getProducts();
            const matches = products.filter(p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));

            matches.slice(0, 5).forEach(m => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.innerHTML = `
                            <div style="display:flex; align-items:center; gap:10px">
                                <img src="${m.image}" style="width:30px; height:30px; object-fit:cover; border-radius:3px">
                                <span>${m.title}</span>
                            </div>
                        `;
                item.onclick = () => {
                    this.saveSearchHistoryQuery(m.title);
                    modal.classList.remove('active');
                    window.location.hash = `#product?id=${m.id}`;
                };
                list.appendChild(item);
            });
        };
    }

    saveSearchHistoryQuery(query) {
        if (!this.searchHistory.includes(query)) {
            this.searchHistory.unshift(query);
            if (this.searchHistory.length > 5) this.searchHistory.pop();
            localStorage.setItem('lt_search_history', JSON.stringify(this.searchHistory));
        }
    }

    renderSearchHistory() {
        const list = document.getElementById('searchHistoryList');
        list.innerHTML = '';
        this.searchHistory.forEach(q => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.innerText = q;
            item.onclick = () => {
                document.getElementById('searchQueryInput').value = q;
                document.getElementById('searchQueryInput').dispatchEvent(new Event('input'));
            };
            list.appendChild(item);
        });
    }

    // ==================== 10. REAL-TIME LOGISTICS TRACKING ====================
    setupLogistics() {
        const btn = document.getElementById('triggerTrackBtn');
        const input = document.getElementById('trackingInput');

        btn.onclick = () => {
            const id = input.value.trim();
            if (!id) {
                this.showToast('Please submit an Order ID token.', 'error');
                return;
            }

            const orders = JSON.parse(localStorage.getItem('lt_orders')) || [];
            const match = orders.find(o => o.orderId === id);

            const resArea = document.getElementById('trackingResultArea');

            if (match) {
                resArea.style.display = 'block';
                document.getElementById('trackedOrderId').innerText = match.orderId;
                document.getElementById('trackedOrderDate').innerText = match.date;
                document.getElementById('trackedOrderStatus').innerText = match.status;

                // Visual stepper mapping logic
                const step1 = document.getElementById('track-step-1');
                const step2 = document.getElementById('track-step-2');
                const step3 = document.getElementById('track-step-3');
                const step4 = document.getElementById('track-step-4');

                // Reset visual classes
                [step1, step2, step3, step4].forEach(el => el.classList.remove('active', 'completed'));

                // Map realistic visual sequences
                step1.classList.add('active', 'completed');
                this.showToast('Logs retrieved successfully.', 'success');
            } else {
                // Support simulated fallbacks
                resArea.style.display = 'block';
                document.getElementById('trackedOrderId').innerText = id;
                document.getElementById('trackedOrderDate').innerText = 'Recent Settle';
                document.getElementById('trackedOrderStatus').innerText = 'In Transit';

                document.getElementById('track-step-1').classList.add('completed');
                document.getElementById('track-step-2').classList.add('completed');
                document.getElementById('track-step-3').classList.add('active');
                this.showToast('Simulated generic dynamic details loaded.', 'success');
            }
        };
    }

    // ==================== COMPARISON UTILITY DRAWER ====================
    setupCompare() {
        document.getElementById('closeCompareBtn').onclick = () => {
            document.getElementById('compareDrawer').classList.remove('active');
        };
    }

    addToCompare(productId) {
        const products = this.getProducts();
        const p = products.find(item => item.id === productId);

        if (!p) return;

        if (this.compareList.find(item => item.id === p.id)) {
            this.showToast('This curation is already listed for compare match.', 'error');
            return;
        }

        if (this.compareList.length >= 3) {
            this.compareList.shift();
        }

        this.compareList.push(p);
        this.renderCompareDrawer();
        this.showToast(`${p.title} matching added for Compare`, 'success');
    }

    renderCompareDrawer() {
        const drawer = document.getElementById('compareDrawer');
        const grid = document.getElementById('compareGridList');

        drawer.classList.add('active');
        grid.innerHTML = '';

        this.compareList.forEach((p, idx) => {
            grid.innerHTML += `
                        <div style="min-width: 250px; background: var(--bg-primary); padding:15px; border-radius: var(--radius-sm); border:1px solid var(--border-color); position:relative">
                            <i class="fa-solid fa-xmark" style="position:absolute; top:10px; right:10px; cursor:pointer" onclick="app.removeCompareItem(${idx})"></i>
                            <img src="${p.image}" style="width:100%; aspect-ratio:3/4; object-fit:cover; border-radius:4px; margin-bottom:10px">
                            <strong style="font-size:14px; display:block">${p.title}</strong>
                            <div style="font-size:12px; margin-top:5px; color:var(--text-secondary)">Brand: ${p.vendor}</div>
                            <div style="font-size:12px; color:var(--text-secondary)">Size Spec: ${p.size}</div>
                            <div style="font-weight:600; font-size:14px; margin-top:5px; color:var(--accent-gold)">$${p.price}</div>
                        </div>
                    `;
        });
    }

    removeCompareItem(idx) {
        this.compareList.splice(idx, 1);
        this.renderCompareDrawer();
        if (this.compareList.length === 0) {
            document.getElementById('compareDrawer').classList.remove('active');
        }
    }
}

// Initialize instance
const app = new LToileApp();
