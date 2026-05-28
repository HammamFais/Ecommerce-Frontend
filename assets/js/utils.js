const utils = {
  formatRupiah: (number) => {
    const num = parseFloat(number) || 0;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  },

  formatDate: (dateStr) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    }).format(new Date(dateStr));
  },

  formatDateShort: (dateStr) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric'
    }).format(new Date(dateStr));
  },

  showToast: (message, type = 'success') => {
    const existing = document.getElementById('toast-container');
    if (existing) existing.remove();

    const colors = {
      success: 'bg-green-600',
      error: 'bg-red-500',
      warning: 'bg-orange-500',
      info: 'bg-blue-500'
    };
    const icons = {
      success: '&#10003;',
      error: '&#10007;',
      warning: '&#9888;',
      info: '&#8505;'
    };

    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = `fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${colors[type]} transition-all duration-300 translate-x-0`;
    container.innerHTML = `
      <span class="text-base">${icons[type]}</span>
      <span>${message}</span>
    `;
    document.body.appendChild(container);

    setTimeout(() => {
      container.style.opacity = '0';
      container.style.transform = 'translateX(100%)';
      setTimeout(() => container.remove(), 300);
    }, 3000);
  },

  showLoading: (containerId, message = 'Memuat data...') => {
    const el = document.getElementById(containerId);
    if (el) {
      el.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
          <div class="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-sm">${message}</p>
        </div>
      `;
    }
  },

  showEmpty: (containerId, message = 'Belum ada data.', icon = '&#128230;') => {
    const el = document.getElementById(containerId);
    if (el) {
      el.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
          <span class="text-5xl">${icon}</span>
          <p class="text-base">${message}</p>
        </div>
      `;
    }
  },

  getStatusBadge: (status) => {
    const map = {
      pending: { label: 'Menunggu Pembayaran', class: 'bg-yellow-100 text-yellow-700' },
      paid:    { label: 'Dibayar', class: 'bg-blue-100 text-blue-700' },
      shipped: { label: 'Dikirim', class: 'bg-indigo-100 text-indigo-700' },
      done:    { label: 'Selesai', class: 'bg-green-100 text-green-700' },
      cancelled: { label: 'Dibatalkan', class: 'bg-red-100 text-red-700' },
      success: { label: 'Sukses', class: 'bg-green-100 text-green-700' },
      failed:  { label: 'Gagal', class: 'bg-red-100 text-red-700' },
    };
    const s = map[status] || { label: status, class: 'bg-gray-100 text-gray-700' };
    return `<span class="px-2 py-1 rounded-full text-xs font-semibold ${s.class}">${s.label}</span>`;
  },

  getCategoryLabel: (cat) => {
    const map = {
      makanan: 'Makanan & Minuman',
      kerajinan: 'Kerajinan Tangan',
      fashion: 'Fashion & Pakaian',
      elektronik: 'Elektronik',
      pertanian: 'Pertanian & Kebun',
      lainnya: 'Lainnya'
    };
    return map[cat] || cat;
  },

  getProductImageUrl: (url) => {
    if (!url) return 'https://placehold.co/400x300/e8f5e9/2e7d32?text=PasarLokal';
    if (url.startsWith('http')) return url;
    return `https://ecommerce-backend-production-afa6.up.railway.app/storage/${url}`;
  },

  debounce: (fn, delay = 400) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  getQueryParam: (key) => {
    return new URLSearchParams(window.location.search).get(key);
  },

  renderNavbar: (activePage = '') => {
    const isLoggedIn = auth.isLoggedIn();
    const role = auth.getRole();
    const user = auth.getUser();

    const sellerLinks = [
      { href: '/seller/dashboard.html', page: 'dashboard', label: 'Dashboard',   icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>' },
      { href: '/seller/products.html', page: 'products',  label: 'Produk Saya', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>' },
      { href: '/seller/orders.html',   page: 'orders',    label: 'Pesanan',     icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>' },
    ];
    const buyerLinks = [
      { href: '/buyer/catalog.html', page: 'catalog', label: 'Katalog',      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>' },
      { href: '/buyer/cart.html',    page: 'cart',    label: 'Keranjang',    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>' },
      { href: '/buyer/orders.html',  page: 'orders',  label: 'Pesanan Saya', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>' },
    ];
    const guestLinks = [
      { href: '/buyer/catalog.html', page: 'catalog', label: 'Katalog', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>' },
    ];

    const links = isLoggedIn ? (role === 'seller' ? sellerLinks : buyerLinks) : guestLinks;

    const desktopLinks = links.map(l =>
      `<a href="${l.href}" class="nav-link text-sm font-medium transition-colors ${activePage === l.page ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'}">${l.label}</a>`
    ).join('');

    const dropdownLinks = links.map(l => `
      <a href="${l.href}" class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activePage === l.page ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:bg-gray-50'}">
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">${l.icon}</svg>
        ${l.label}
      </a>`
    ).join('');

    const authButtons = isLoggedIn
      ? `<div class="flex items-center gap-2">
           <span class="text-sm text-gray-500 hidden sm:block">Halo, <strong class="text-gray-800">${user?.name || 'User'}</strong></span>
           <button onclick="auth.logout()" class="hidden md:block bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">Keluar</button>
           <div class="relative md:hidden">
             <button id="hamburger-btn" class="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Menu" aria-expanded="false">
               <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
               </svg>
             </button>
             <div id="mobile-menu"
               class="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50
                      opacity-0 scale-95 pointer-events-none transition-all duration-150 origin-top-right">
               <div class="px-4 py-2 border-b border-gray-100 mb-1">
                 <p class="text-xs text-gray-400">Masuk sebagai</p>
                 <p class="text-sm font-semibold text-gray-800 truncate">${user?.name || 'User'}</p>
               </div>
               <div class="px-2">
                 ${dropdownLinks}
               </div>
               <div class="border-t border-gray-100 mt-1 px-2 pt-1">
                 <button onclick="auth.logout()" class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                   <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                   Keluar
                 </button>
               </div>
             </div>
           </div>
         </div>`
      : `<div class="flex items-center gap-2">
           <a href="/auth/login.html" class="text-green-600 font-medium text-sm hover:text-green-700 px-3 py-2">Masuk</a>
           <a href="/auth/register.html" class="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">Daftar</a>
         </div>`;

    return `
      <nav id="main-navbar" class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <a href="/index.html" class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">PL</span>
              </div>
              <span class="font-bold text-lg text-gray-900">Pasar<span class="text-green-600">Lokal</span></span>
            </a>
            <div class="hidden md:flex items-center gap-6">
              ${desktopLinks}
            </div>
            ${authButtons}
          </div>
        </div>
      </nav>
    `;
  },

  renderFooter: () => {
    return `
      <footer class="bg-gray-900 text-gray-400 py-10 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 bg-gradient-to-br from-green-500 to-green-700 rounded-md flex items-center justify-center">
                <span class="text-white font-bold text-xs">PL</span>
              </div>
              <span class="font-bold text-white">Pasar<span class="text-green-400">Lokal</span></span>
            </div>
            <p class="text-sm text-center">Platform marketplace UMKM lokal</p>
            <p class="text-xs">D4 Teknik Informatika &bull; Semester 4</p>
          </div>
        </div>
      </footer>
    `;
  },

  injectNavbar: (activePage = '') => {
    const el = document.getElementById('navbar');
    if (!el) return;
    el.innerHTML = utils.renderNavbar(activePage);

    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    const openMenu = () => {
      menu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
      menu.classList.add('opacity-100', 'scale-100');
      btn.setAttribute('aria-expanded', 'true');
    };
    const closeMenu = () => {
      menu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
      menu.classList.remove('opacity-100', 'scale-100');
      btn.setAttribute('aria-expanded', 'false');
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        closeMenu();
      }
    });

    // Scroll effect: glassmorphism when scrolled, white at top
    const navbar = document.getElementById('main-navbar');
    const onScroll = () => {
      if (window.scrollY > 10) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        navbar.style.backdropFilter = 'blur(24px) saturate(180%)';
        navbar.style.webkitBackdropFilter = 'blur(24px) saturate(180%)';
        navbar.style.boxShadow = '0 1px 0 rgba(0,0,0,0.06)';
        navbar.style.borderBottom = '1px solid rgba(255,255,255,0.4)';
      } else {
        navbar.style.backgroundColor = 'rgb(255, 255, 255)';
        navbar.style.backdropFilter = 'none';
        navbar.style.webkitBackdropFilter = 'none';
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottom = 'none';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Offset body so content is not hidden under fixed navbar
    document.body.classList.add('pt-16');
  },

  injectFooter: () => {
    const el = document.getElementById('footer');
    if (el) el.innerHTML = utils.renderFooter();
  },
};
