
    utils.injectNavbar('catalog');
    utils.injectFooter();

    const DEMO_EMOJIS = { makanan:'🍱', kerajinan:'👜', fashion:'👗', elektronik:'📱', pertanian:'🌿', lainnya:'🎁' };
    const DEMO_PRODUCTS = {
      1: { id:1, name:'Kue Nastar Spesial', price:45000, category:'makanan', stock:50, image_url:null,
           description:'Nastar premium dengan isian selai nanas asli pilihan. Dibuat dengan mentega berkualitas, tekstur lembut di dalam, renyah di luar. Cocok untuk camilan sehari-hari dan hantaran.',
           seller:{ name:'Dapur Bu Sari', city:'Surabaya' } },
      2: { id:2, name:'Tas Anyaman Bambu', price:120000, category:'kerajinan', stock:15, image_url:null,
           description:'Tas anyaman bambu handmade dari pengrajin lokal Jawa Tengah. Ramah lingkungan, kuat, dan elegan. Cocok untuk belanja atau aktivitas outdoor.',
           seller:{ name:'Kerajinan Nusantara', city:'Solo' } },
      3: { id:3, name:'Teh Herbal Organik', price:35000, category:'pertanian', stock:100, image_url:null,
           description:'Teh herbal organik tanpa pestisida, dipetik langsung dari kebun sendiri di pegunungan Jawa. Kaya antioksidan, baik untuk kesehatan.',
           seller:{ name:'Kebun Sehat', city:'Malang' } },
    };

    const productId = utils.getQueryParam('id');
    let productData = null;

    async function loadProduct() {
      if (!productId) { showError(); return; }

      try {
        const res = await api.get(`/products/${productId}`);
        if (res.success && res.data) {
          renderProduct(res.data);
        } else {
          showError();
        }
      } catch (_) {
        const demo = DEMO_PRODUCTS[productId] || DEMO_PRODUCTS[1];
        renderProduct(demo);
      }
    }

    function renderProduct(p) {
      productData = p;
      document.getElementById('product-skeleton').classList.add('hidden');
      document.getElementById('product-detail').classList.remove('hidden');
      document.title = `${p.name} — PasarLokal`;

      document.getElementById('breadcrumb-name').textContent = p.name;
      document.getElementById('product-name').textContent = p.name;
      document.getElementById('product-price').textContent = utils.formatRupiah(p.price);
      document.getElementById('product-description').textContent = p.description || 'Tidak ada deskripsi tersedia.';
      document.getElementById('product-stock').textContent = `${p.stock} unit`;
      document.getElementById('product-category').textContent = utils.getCategoryLabel(p.category);
      document.getElementById('seller-name').textContent = p.seller?.name || 'UMKM Lokal';

      // Stock badge
      const stockBadge = document.getElementById('product-stock-badge');
      if (p.stock === 0) {
        stockBadge.textContent = 'Habis';
        stockBadge.className = 'bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full';
      } else if (p.stock < 5) {
        stockBadge.textContent = 'Hampir Habis';
        stockBadge.className = 'bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full';
      } else {
        stockBadge.textContent = 'Tersedia';
        stockBadge.className = 'bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full';
      }

      // Image
      const img = document.getElementById('product-image');
      const emojiEl = document.getElementById('product-emoji');
      if (p.image_url) {
        img.src = utils.getProductImageUrl(p.image_url);
        img.alt = p.name;
        img.style.display = 'block';
      } else {
        img.style.display = 'none';
        emojiEl.style.display = 'flex';
        emojiEl.textContent = DEMO_EMOJIS[p.category] || '📦';
      }

      // Disable if out of stock
      if (p.stock === 0) {
        document.getElementById('btn-cart').disabled = true;
        document.getElementById('btn-buy').disabled = true;
        document.getElementById('btn-cart').classList.add('opacity-50', 'cursor-not-allowed');
        document.getElementById('btn-buy').classList.add('opacity-50', 'cursor-not-allowed');
      }

      updateSubtotal();
    }

    function showError() {
      document.getElementById('product-skeleton').classList.add('hidden');
      document.getElementById('product-error').classList.remove('hidden');
    }

    // Quantity controls
    const qtyInput = document.getElementById('qty-input');

    function updateSubtotal() {
      if (!productData) return;
      const qty = parseInt(qtyInput.value) || 1;
      document.getElementById('subtotal-price').textContent = utils.formatRupiah(productData.price * qty);
    }

    document.getElementById('qty-minus').addEventListener('click', () => {
      const val = parseInt(qtyInput.value) || 1;
      if (val > 1) { qtyInput.value = val - 1; updateSubtotal(); }
    });

    document.getElementById('qty-plus').addEventListener('click', () => {
      const val = parseInt(qtyInput.value) || 1;
      const max = productData?.stock || 99;
      if (val < max) { qtyInput.value = val + 1; updateSubtotal(); }
      else utils.showToast(`Stok hanya tersedia ${max} unit`, 'warning');
    });

    qtyInput.addEventListener('input', () => {
      let val = parseInt(qtyInput.value) || 1;
      const max = productData?.stock || 99;
      if (val < 1) val = 1;
      if (val > max) { val = max; utils.showToast(`Stok hanya tersedia ${max} unit`, 'warning'); }
      qtyInput.value = val;
      updateSubtotal();
    });

    // Add to cart
    document.getElementById('btn-cart').addEventListener('click', async () => {
      if (!auth.isLoggedIn()) {
        utils.showToast('Silakan login terlebih dahulu', 'warning');
        setTimeout(() => window.location.href = '../auth/login.html', 1000);
        return;
      }

      const qty = parseInt(qtyInput.value) || 1;
      try {
        const res = await api.post('/cart', { product_id: productData.id, quantity: qty });
        if (res.success) {
          utils.showToast('Produk berhasil ditambahkan ke keranjang! 🛒', 'success');
          utils.updateCartBadge();
        } else {
          utils.showToast(res.message || 'Gagal menambahkan ke keranjang', 'error');
        }
      } catch (_) {
        utils.showToast('Produk ditambahkan ke keranjang (demo)', 'success');
      }
    });

    // Buy now (add to cart then redirect)
    document.getElementById('btn-buy').addEventListener('click', async () => {
      if (!auth.isLoggedIn()) {
        utils.showToast('Silakan login terlebih dahulu', 'warning');
        setTimeout(() => window.location.href = '../auth/login.html', 1000);
        return;
      }

      const qty = parseInt(qtyInput.value) || 1;
      try {
        const res = await api.post('/cart', { product_id: productData.id, quantity: qty });
        const cartItemId = res.data?.id || res.cart_item?.id || res.id;
        if (cartItemId) {
          window.location.href = `/buyer/checkout.html?items=${cartItemId}`;
        } else {
          window.location.href = '/buyer/checkout.html';
        }
      } catch (_) {
        utils.showToast('Gagal menambahkan ke keranjang', 'error');
      }
    });

    loadProduct();
  