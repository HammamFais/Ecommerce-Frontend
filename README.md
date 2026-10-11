<div align="center">

# 🛒 PasarLokal — Frontend

**Platform E-Commerce UMKM Lokal**

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://ecommerce-frontend-two-lilac.vercel.app)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](.)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](.)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](.)

> Tugas UAS Mata Kuliah **Aplikasi Berbasis Web** — D4 Teknik Informatika  
> Politeknik Elektronika Negeri Surabaya (PENS) — Semester 4

---

<!-- Uncomment dan ganti path setelah kamu upload screenshot -->
<!-- ![PasarLokal Preview](assets/img/preview.png) -->

</div>

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🔐 Auth | Register & login dengan role Buyer / Seller, JWT disimpan di localStorage |
| 🛍️ Katalog | Grid produk dengan filter kategori, pencarian, rentang harga & sorting |
| 📦 Detail Produk | Foto produk, stok, deskripsi, info seller, tambah ke keranjang |
| 🛒 Keranjang | Kelola item, update quantity, hapus, total harga real-time |
| 💳 Checkout | Pilih kurir, hitung ongkir via RajaOngkir, bayar via Midtrans Snap |
| 📋 Riwayat Order | Buyer: pantau status pesanan; Seller: update status & kelola pesanan masuk |
| 📊 Dashboard Seller | Statistik penjualan, grafik pendapatan, stok menipis |
| 👤 Profil | Edit data diri, alamat, kota |

---

## 🛠️ Stack Teknologi

| Komponen | Teknologi |
|----------|-----------|
| Markup | HTML5 |
| Styling | Tailwind CSS (CDN) |
| Interaktivitas | Vanilla JavaScript (Fetch API) |
| Auth Storage | localStorage (JWT Token) |
| Payment | Midtrans Snap (Sandbox) |
| Ongkir | RajaOngkir API V2 |
| Deploy | Vercel |
| Backend | Laravel ([Vercel](https://pasarlokal-api.vercel.app)) |

---

## 📁 Struktur Proyek

```
pasarlokal-frontend/
├── index.html              → Landing page / homepage
├── auth/
│   ├── login.html          → Halaman login
│   └── register.html       → Halaman register
├── buyer/
│   ├── catalog.html        → Katalog produk
│   ├── product-detail.html → Detail produk
│   ├── cart.html           → Keranjang belanja
│   ├── checkout.html       → Checkout + ongkir + pembayaran
│   ├── orders.html         → Riwayat order buyer
│   └── profile.html        → Profil buyer
├── seller/
│   ├── dashboard.html      → Dashboard statistik seller
│   ├── products.html       → Kelola produk
│   ├── orders.html         → Pesanan masuk seller
│   └── profile.html        → Profil seller
└── assets/
    ├── css/custom.css
    └── js/
        ├── api.js          → Base URL & wrapper fetch ke backend
        ├── auth.js         → Login, logout, cek token
        └── utils.js        → Helper: format rupiah, navbar, toast, dll
```

---

## 🚀 Cara Menjalankan

### Development (Lokal)
1. Clone repo ini
2. Buka folder dengan VS Code
3. Jalankan **Live Server** (klik kanan `index.html` → Open with Live Server)
4. Pastikan backend sudah berjalan di `http://localhost:8000`

### Production
Akses langsung di:  
🔗 **[ecommerce-frontend-two-lilac.vercel.app](https://ecommerce-frontend-two-lilac.vercel.app)**

---

## 🔑 Demo Akun

| Role | Email | Password |
|------|-------|----------|
| Buyer | buyer@demo.com | password123 |
| Seller | seller@demo.com | password123 |

### Kartu Test Midtrans (Sandbox)
| Field | Value |
|-------|-------|
| Nomor Kartu | 4811 1111 1111 1114 |
| CVV | 123 |
| Expiry | 01/26 |
| OTP | 112233 |

---

## 👥 Data Kelompok

**Kelompok 2 — Teknologi Aplikasi Web E-Commerce**

| No | NRP | Nama |
|---:|:---:|------|
| 1 | 3124600120 | Revalina Salsabila (Reva) |
| 2 | 3124600110 | Ashlihatul Sotya Mahendra (Yaya) |
| 3 | 3124600112 | Akmal Zaida Fari (Akmal) |
| 4 | 3124600114 | Bagas Wicaksono (Bagas) |
| 5 | 3124600113 | Andika Zafka Ujfaulzi (Dika) |
| 6 | 3124600109 | Haiqal Zakky Indi Febriansyah (Haiqal) |
| 7 | 3124600102 | Dimas Reza Ardhana (Dimas) |
| 8 | 3124600098 | Gusthi Pangestu (Gusthi) |
| 9 | 3124600099 | Yusuf Habibullah Santoso (Habib) |
| 10 | 3124600096 | Hammam Hidayatullah (Hammam) |
| 11 | 3124600093 | Ardra Razaan Syaikhah (Ardra) |
| 12 | 3124600094 | Erik Triayuda Wijaya (Erik) |
| 13 | 3124600101 | Faris Akmal Soehartono (Faris) |
| 14 | 3124600106 | Efrapaska Vincesius Panjaitan (Efra) |

### Pembagian Tugas

| Handler | Anggota |
|---------|---------|
| 📊 PPT (maks 4 orang) | Akmal, Yaya, Bagas, Ardra |
| 💻 Coding FE / UI·UX (min 7 orang) | Dimas, Faris, Hammam, Dika, Habib, Gusthi, Haiqal |
| 📝 Laporan / Reference & Plan Writing (maks 3 orang) | Reva, Efra, Erik |

---

<div align="center">

Made with ❤️ for **Aplikasi Berbasis Web** — PENS 2026

</div>
