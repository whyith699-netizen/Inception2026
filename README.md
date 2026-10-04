# SMAN 1 Klaten (Padmawijaya / Kampus 13) — Portal 2026

Portal web resmi modern SMA Negeri 1 Klaten berbasis **Astro 7.3.5** (compiler Rust), **React 19 Islands**, navigasi SPA `<ClientRouter />`, dan desain editorial akademis anti-slop (*warm monochromatic*).

---

## 🚀 Cara Menjalankan Server

### 1. Prasyarat
- **Node.js** >= v20 (disarankan Node v22 atau v26)
- **pnpm** (direkomendasikan) atau npm / bun

### 2. Instalasi Dependensi
```bash
pnpm install
```

### 3. Server Development (Hot Reload)
Gunakan mode ini saat mengedit kode. Perubahan akan langsung tampil di browser:
```bash
pnpm dev
```
Buka di browser: **[http://localhost:4321](http://localhost:4321)**

> Untuk mengganti port default:
> ```bash
> pnpm dev --port 3000
> ```

### 4. Build & Preview Production
Gunakan mode ini untuk menguji performa riil berkas statis teroptimasi:
```bash
pnpm build
pnpm preview
```
Buka di browser: **[http://localhost:4321](http://localhost:4321)**

---

## 🔄 Menjalankan Server di Latar Belakang (Background)

Jika Anda ingin server tetap aktif meskipun terminal ditutup:

### Menyalakan di Background:
```bash
# Mode development
nohup pnpm dev > server.log 2>&1 &

# ATAU mode production preview
nohup pnpm preview > server.log 2>&1 &
```

### Memeriksa Status Server:
```bash
lsof -i :4321
# atau
tail -f server.log
```

### Mematikan Server Background:
```bash
# Mematikan proses berdasarkan port
kill $(lsof -t -i:4321)

# ATAU mematikan proses astro
pkill -f "astro"
```

---

## 🛠️ Perintah Lainnya

| Perintah | Deskripsi |
| :--- | :--- |
| `pnpm dev` | Menjalankan Astro development server di port 4321 |
| `pnpm build` | Kompilasi seluruh halaman statis & endpoint JSON ke folder `dist/` |
| `pnpm preview` | Menjalankan static preview server dari folder `dist/` |
| `pnpm check` | Pemeriksaan tipe TypeScript dan validasi template Astro |
| `pnpm run lint:slop` | Menjalankan linter anti-AI-slop & kepatuhan rasio kontras WCAG AA |

---

## 🧪 Validasi & Test Suite

Proyek ini dilengkapi skrip verifikasi otomatis:
```bash
# 1. Anti-slop linter & WCAG AA contrast check
python3 scripts/anti-slop-linter.py

# 2. Test integrasi Astro 7 modern (Islands, client directives, ClientRouter)
node scripts/test-modern-astro7.mjs

# 3. Test integritas data SSOT, direktori staf, dan redesain Hero
node scripts/test-audit-data-hero.mjs
```

---

## 📡 REST API Endpoints

Astro menyediakan endpoint internal statis siap pakai:
- `GET /api/direktori.json` — 78 civitas akademika riil (Kepala Sekolah, Guru, Staf TU).
- `GET /api/berita.json` — Arsip berita dan kegiatan resmi sekolah.
- `GET /api/ppdb-simulasi.json` — Regulasi kuota, skor zonasi, dan afirmasi PPDB 2026.

---

## 📚 Dokumentasi Sumber Data
Untuk referensi lengkap data resmi, legalitas (NPSN, NSS, BAN-SM), sejarah 1957, daftar 23 ekstrakurikuler, dan alumni KAPASSKA, baca:
👉 **[`docs/SUMBER_DATA_SMAN1_KLATEN.md`](docs/SUMBER_DATA_SMAN1_KLATEN.md)**
