# Runbook Operasional & Panduan Pengujian
**Proyek:** Website Profil SMA Negeri 1 Klaten & Chatbot AI  
**Ajang:** INCEPTION 2026 | **Tim:** RANDOM KID

## 1. Prasyarat Sistem
- **Sistem Operasi:** Linux / macOS / Windows
- **Node.js:** Versi >= 18.0.0 (Diverifikasi pada v26.7.0)
- **Package Manager:** `pnpm` (>= 9.x / 10.x) atau `npm` (>= 10.x)
- **Python:** Versi 3.x (untuk menjalankan automated anti-slop linter)

## 2. Instalasi Dependensi
Jalankan perintah berikut di direktori proyek:
```bash
cd /home/archgha/web-sekolah
pnpm install
```

## 3. Menjalankan Server Pengembangan Lokal
```bash
pnpm run dev
```
Buka browser pada alamat:
`http://localhost:4321`

Fitur yang dapat diuji pada mode interaktif:
1. Navigasi lancar (*smooth scrolling*) ke setiap bagian.
2. Membuka dan menguji percakapan cerdas pada widget **SmansaBot AI**.
3. Mencoba tombol pertanyaan cepat (*suggestion pills*): PPDB, Fasilitas, Ekstrakurikuler, Prestasi.
4. Mengklik tombol mengambang di pojok kanan bawah (*Floating Launcher*).

## 4. Eksekusi Pengujian Otomatis (Anti-Slop Linter)
Menjalankan audit terhadap kata klise AI dan validasi rasio kontras WCAG AA:
```bash
pnpm run lint:slop
```
*Output yang diharapkan:*
```
[1/2] Memeriksa kata klise AI (Anti-Slop)...
✓ Bebas dari kata klise AI.
[2/2] Memeriksa kepatuhan kontras WCAG AA...
✓ Kontras WCAG AA memenuhi standar.

🎉 Semua pengecekan anti-slop BERHASIL 100%!
```

## 5. Kompilasi Produksi (Static Site Build)
Menghasilkan static assets optimal di folder `dist/`:
```bash
pnpm run build
```
*Output yang diharapkan:*
`1 page(s) built in <1s` dengan exit code 0.

## 6. Pratinjau Hasil Kompilasi
Untuk menguji hasil build sebelum rilis:
```bash
pnpm run preview
```
Akses di `http://localhost:4321`.
