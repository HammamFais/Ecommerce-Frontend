const utils = {
  formatRupiah: (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
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

    const navLinks = isLoggedIn
      ? role === 'seller'
        ? `<a href="/seller/dashboard.html" class="nav-link ${activePage === 'dashboard' ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'}">Dashboard</a>
           <a href="/seller/products.html" class="nav-link ${activePage === 'products' ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'}">Produk Saya</a>
           <a href="/seller/orders.html" class="nav-link ${activePage === 'orders' ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'}">Pesanan</a>`
        : `<a href="/buyer/catalog.html" class="nav-link ${activePage === 'catalog' ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'}">Katalog</a>
           <a href="/buyer/cart.html" class="nav-link relative ${activePage === 'cart' ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'}">
             Keranjang
           </a>
           <a href="/buyer/orders.html" class="nav-link ${activePage === 'orders' ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'}">Pesanan Saya</a>`
      : `<a href="/buyer/catalog.html" class="text-gray-600 hover:text-green-600 transition-colors">Katalog</a>`;

    const authButtons = isLoggedIn
      ? `<div class="flex items-center gap-3">
           <span class="text-sm text-gray-500 hidden sm:block">Halo, <strong class="text-gray-800">${user?.name || 'User'}</strong></span>
           <button onclick="auth.logout()" class="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">Keluar</button>
         </div>`
      : `<div class="flex items-center gap-2">
           <a href="/auth/login.html" class="text-green-600 font-medium text-sm hover:text-green-700 px-3 py-2">Masuk</a>
           <a href="/auth/register.html" class="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">Daftar</a>
         </div>`;

    return `
      <nav class="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <a href="/index.html" class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">PL</span>
              </div>
              <span class="font-bold text-lg text-gray-900">Pasar<span class="text-green-600">Lokal</span></span>
            </a>
            <div class="hidden md:flex items-center gap-6 text-sm font-medium">
              ${navLinks}
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
    if (el) el.innerHTML = utils.renderNavbar(activePage);
  },

  injectFooter: () => {
    const el = document.getElementById('footer');
    if (el) el.innerHTML = utils.renderFooter();
  },
};
