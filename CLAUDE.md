# CLAUDE.md — PasarLokal Frontend

## Tentang Project
PasarLokal adalah platform e-commerce marketplace berbasis web yang menghubungkan UMKM lokal dengan pembeli. Project ini merupakan tugas kuliah Aplikasi Berbasis Web di Politeknik Elektronika Negeri Surabaya (PENS), Semester 4, D4 Teknik Informatika.

---

## Stack Teknologi

| Komponen | Teknologi |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS (via CDN) |
| Interaktivitas | Vanilla JavaScript |
| HTTP Client | Fetch API |
| Auth Storage | localStorage (JWT token) |
| Backend API | pasarlokal-backend (Laravel) |

---

## Struktur Folder

```
pasarlokal-frontend/
├── index.html              → landing page / homepage
├── auth/
│   ├── login.html          → halaman login
│   └── register.html       → halaman register
├── buyer/
│   ├── catalog.html        → katalog produk (list semua produk)
│   ├── product-detail.html → detail produk
│   ├── cart.html           → keranjang belanja
│   ├── checkout.html       → halaman checkout + ongkir + payment
│   └── orders.html         → riwayat order buyer
├── seller/
│   ├── dashboard.html      → dashboard penjual (statistik)
│   ├── products.html       → kelola produk (list + tambah + edit)
│   └── orders.html         → order masuk ke seller
├── assets/
│   ├── css/
│   │   └── custom.css      → custom CSS tambahan jika perlu
│   ├── js/
│   │   ├── api.js          → fungsi fetch ke backend (base URL, headers)
│   │   ├── auth.js         → fungsi login, logout, cek token
│   │   └── utils.js        → fungsi helper umum
│   └── img/
│       └── logo.png
└── CLAUDE.md
```

---

## Halaman & Fungsinya

### index.html (Landing Page)
- Hero section dengan tagline PasarLokal
- Section fitur unggulan
- Preview produk unggulan (fetch dari API)
- Navbar dengan link ke login/register/katalog

### auth/login.html
- Form login (email + password)
- Setelah login sukses, simpan JWT token ke localStorage
- Redirect ke catalog.html (buyer) atau dashboard.html (seller) sesuai role

### auth/register.html
- Form register (nama, email, password, role: buyer/seller)
- Setelah register sukses, redirect ke login

### buyer/catalog.html
- Grid produk dari API
- Filter kategori
- Search produk
- Klik produk → ke product-detail.html

### buyer/product-detail.html
- Foto produk, nama, harga, deskripsi, stok
- Tombol "Tambah ke Keranjang"
- Info seller

### buyer/cart.html
- List produk di keranjang
- Update quantity / hapus item
- Total harga
- Tombol "Checkout"

### buyer/checkout.html
- Form alamat pengiriman
- Pilih kurir + hitung ongkir (via API RajaOngkir)
- Ringkasan order
- Tombol bayar → trigger Midtrans Snap popup

### buyer/orders.html
- List riwayat order beserta status

### seller/dashboard.html
- Card statistik: total penjualan, jumlah order, produk aktif
- Tabel order terbaru

### seller/products.html
- Tabel list produk milik seller
- Tombol tambah produk (modal/form)
- Tombol edit & hapus produk

### seller/orders.html
- List order masuk
- Tombol update status (proses → kirim)

---

## Koneksi ke Backend

Semua request ke backend menggunakan Fetch API. Base URL disimpan di `api.js`:

```javascript
// assets/js/api.js
const BASE_URL = 'http://localhost:8000/api';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const api = {
  get: (endpoint) =>
    fetch(`${BASE_URL}${endpoint}`, { headers: getHeaders() }).then(r => r.json()),

  post: (endpoint, body) =>
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body)
    }).then(r => r.json()),

  put: (endpoint, body) =>
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body)
    }).then(r => r.json()),

  delete: (endpoint) =>
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(r => r.json()),
};
```

---

## Auth Flow

```
User buka login.html
→ Input email & password
→ POST /api/auth/login
→ Dapat JWT token
→ Simpan ke localStorage: localStorage.setItem('token', token)
→ Simpan juga role: localStorage.setItem('role', role)
→ Redirect sesuai role

Cek auth di setiap halaman protected:
→ Ambil token dari localStorage
→ Kalau null → redirect ke login.html
→ Kalau ada → lanjut render halaman
```

---

## Aturan Coding

### Umum
- Gunakan Tailwind CSS via CDN untuk semua styling
- Komponen yang berulang (navbar, footer) dibuat sebagai fungsi JS yang inject HTML
- Hindari inline style, gunakan Tailwind class
- Semua interaksi dengan backend via `api.js`, jangan fetch langsung di halaman

### Naming Convention
- File HTML: kebab-case (product-detail.html)
- File JS: kebab-case (api.js)
- ID & class HTML: kebab-case (product-card, cart-item)
- Variable JS: camelCase (productList, cartItems)

### Error Handling
- Setiap fetch wajib ada try-catch
- Tampilkan pesan error yang user-friendly (bukan raw error dari console)
- Gunakan toast notification atau alert sederhana

### Responsif
- Semua halaman wajib responsive (mobile-friendly)
- Gunakan Tailwind responsive prefix: sm:, md:, lg:

---

## Midtrans Integration (Frontend)

Halaman checkout.html menggunakan Midtrans Snap:

```html
<!-- Tambahkan script Midtrans Snap di checkout.html -->
<script src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="YOUR_MIDTRANS_CLIENT_KEY"></script>
```

```javascript
// Setelah dapat snap_token dari backend
snap.pay(snapToken, {
  onSuccess: (result) => {
    // Update status order, redirect ke orders.html
  },
  onPending: (result) => {
    // Tampilkan pesan menunggu pembayaran
  },
  onError: (result) => {
    // Tampilkan pesan error
  }
});
```

---

## Catatan Penting
- Backend berjalan di `http://localhost:8000` saat development
- Saat production, ganti BASE_URL di `api.js` ke URL Railway
- Midtrans menggunakan mode **sandbox** (testing)
- Jangan simpan data sensitif selain JWT token di localStorage
- JWT token expired → auto redirect ke login
