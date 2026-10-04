# Rencana Kerja: Refaktor Desain Visual Neon Brutalism & Pembuatan Halaman Alumni (KAPASSKA)

## Goal
Mengadopsi bahasa desain visual **Neon Brutalism** (terinspirasi dari referensi Dribbble: palet warna bertegangan tinggi seperti *Electric Neon Lime* & *Cyan*, garis batas tegas 2–2.5px, bayangan keras *tactile offset* ber-blur 0px, dan *sticker badge*) pada seluruh antarmuka portal SMAN 1 Klaten tanpa mengubah 100% keaslian data riil, serta membangun halaman publik khusus **Alumni** (`src/pages/alumni.astro`).

---

## Current Context / Assumptions
- **Lingkungan Aktif:** Astro 7.3.5 (compiler Rust), React 19.3.0, TypeScript 5.9.3, Node v26.7.0, pnpm 10.33.2.
- **Integritas Data:** Data riil 78 civitas staf/guru, NIP, berita resmi, 23 ekskul, legalitas NPSN 20309676 / NSS 301046002001, dan akreditasi A nilai 98 tidak boleh diubah atau diganti dummy.
- **Kondisi Terkini:** Belum ada halaman `src/pages/alumni.astro` (hanya ada cuplikan `AlumniSection.astro` di beranda); navigasi utama di `Header.astro` belum memiliki tautan langsung ke halaman Alumni; sistem token di `src/styles/tokens.css` masih menggunakan palet monokromatik terakota editorial sebelumnya.

---

## Architecture & Proposed Approach
1. **Sistem Token Neon Brutalism (`tokens.css` & `global.css`):**
   - Mengganti palet warna ke sistem *High-Voltage Neon Brutalism*:
     - Kanvas: Latar teknis bersih `--neo-bg: #F4F5F8;` dengan permukaan kartu `--neo-surface: #FFFFFF;` dan aksen gelap arsitektural `--neo-dark: #0F1217;`.
     - Tinta & Garis Batas: Tinta pekat `--neo-ink: #111418;` dan garis batas tegas `--neo-border: 2px solid #111418;` (bukan hairline tipis).
     - Warna Neon Tegangan Tinggi: *Electric Volt / Neon Lime* (`#D4FF00` atau `#CCFF00`), *Cyber Neon Cyan* (`#00F0FF`), *Neon Pink / Hot Magenta* (`#FF2E93`), dan *Electric Tangerine* (`#FF5500`).
     - Bayangan Taktil Keras (*Zero-Blur Hard Drop Shadow*): `--neo-shadow: 4px 4px 0px #111418;`, `--neo-shadow-lg: 6px 6px 0px #111418;`, `--neo-shadow-neon: 4px 4px 0px #D4FF00;`.
     - Interaktivitas Taktil: Tombol dan kartu tertekan saat disentuh (`transform: translate(2px, 2px); box-shadow: 2px 2px 0px var(--neo-ink);`).
2. **Pembangunan Halaman Khusus Alumni (`src/pages/alumni.astro`):**
   - Menghadirkan portal komprehensif organisasi alumni **KAPASSKA** (Keluarga Alumni Padmawijaya SMAN 1 Klaten).
   - Menampilkan:
     - Header Hero bernuansa Neon Brutalist dengan *sticker badge* "EST. 1957 · 69 ANGKATAN · JEJARING NASIONAL".
     - Galeri Tokoh Alumni Berprestasi lengkap dengan potret berwajah fokus, riwayat karier, dan jabatan pengabdian nasional (Prof. Widodo Muktiyo, Prof. Joko Triyono, Ir. Paulus Insap Santosa, Drs. Eko Hartono MPP Konjen RI, Winarno M.Eng, Agus Mulia S.Pt).
     - Showcase Kontribusi Nyata: Program Penyaluran Beasiswa Pendidikan Rp18 Juta oleh Alumni Angkatan 1976 (berita faktual resmi 18 September 2026).
     - Direktori Komisariat Wilayah (Jabodetabek, Solo Raya & DIY, Jawa Timur, Luar Jawa, Internasional).
     - Formulir Pendaftaran & Pembaruan Database Alumni KAPASSKA (*high-contrast brutalist form card*).
3. **Penyelarasan Komponen & Navigasi:**
   - Menambahkan menu `Alumni` (`/alumni`) di `src/components/Header.astro` dan footer link di `src/components/Footer.astro`.
   - Mengadaptasi komponen interaktif React Islands (`DirectoryLiveFilter.tsx`, `PpdbCalculator.tsx`, `InteractiveSmansaBot.tsx`) dan Hero utama ke gaya Neon Brutalism tanpa merusak fungsi state atau TypeScript.
4. **Verifikasi Kualitas & TDD:**
   - Menyesuaikan pasangan kontras WCAG AA pada `scripts/anti-slop-linter.py` (kontras teks `#111418` pada latar `#D4FF00` adalah 14.2:1, sangat melebihi ambang batas 4.5:1).
   - Membuat test suite `scripts/test-neon-brutalism-alumni.mjs` untuk memvalidasi keberadaan rute `/alumni`, tautan navigasi, token neon brutalism, dan integritas data riil.

---

## Step-by-Step Implementation Tasks

### Task 1: Definisikan Sistem Token Neon Brutalism
- **File:** `src/styles/tokens.css`
- **Tindakan:** Tambahkan variabel CSS token neon brutalism:
  - `--neo-bg: #F4F5F8;`
  - `--neo-surface: #FFFFFF;`
  - `--neo-ink: #111418;`
  - `--neo-ink-muted: #525B67;`
  - `--neo-border-color: #111418;`
  - `--neo-border: 2px solid #111418;`
  - `--neo-border-thick: 3px solid #111418;`
  - `--neon-lime: #D4FF00;`
  - `--neon-cyan: #00F0FF;`
  - `--neon-magenta: #FF2E93;`
  - `--neon-yellow: #FFE600;`
  - `--neon-orange: #FF5500;`
  - `--neo-shadow: 4px 4px 0px #111418;`
  - `--neo-shadow-sm: 2px 2px 0px #111418;`
  - `--neo-shadow-lg: 6px 6px 0px #111418;`
  - `--neo-shadow-lime: 4px 4px 0px #D4FF00;`
  - `--neo-shadow-cyan: 4px 4px 0px #00F0FF;`
  - Pertahankan alias kompatibilitas agar komponen lama tidak rusak.
- **Verifikasi:** Periksa token termuat di CSS build.

### Task 2: Perbarui Utilitas Global Neon Brutalism
- **File:** `src/styles/global.css`
- **Tindakan:**
  - Tambahkan utility classes:
    - `.brutal-card`: border 2px solid, background surface, box-shadow 4px 4px 0px #111418, radius 4px atau 0px.
    - `.brutal-badge`: font-mono uppercase, border 1.5px solid #111418, padding 4px 10px, background neon lime/cyan.
    - `.brutal-btn`: tactile click button dengan hard shadow dan active translation.
    - Atur styling elemen interaktif (hover / focus / active).
- **Verifikasi:** Kompilasi CSS tanpa error sintaks.

### Task 3: Tambahkan Halaman Khusus Alumni
- **File Baru:** `src/pages/alumni.astro`
- **Tindakan:**
  - Import `BaseLayout.astro`, `getEntry('alumni', 'tokoh')`, data KAPASSKA, dan artikel beasiswa 1976.
  - Bangun 4 bagian utama:
    1. **Hero Alumni Brutalist:** Kicker "IKATAN KELUARGA ALUMNI SMAN 1 KLATEN (KAPASSKA)", judul besar dengan aksen neon lime, micro-stats badge: "Ribuan Alumni Tersebar", "69 Tahun Pengabdian", "12 Komisariat Daerah".
    2. **Tokoh Alumni Inspiratif:** Grid kartu brutalist tokoh (Prof. Widodo Muktiyo, Prof. Joko Triyono, Ir. Paulus Insap Santosa, Ph.D, Drs. Eko Hartono MPP Konjen RI, Winarno M.Eng, Agus Mulia S.Pt) lengkap dengan foto wajah fokus (`aspect-ratio: 3/4`, `object-position: top center`), jabatan, dan kontribusi almamater.
    3. **Program Beasiswa & Almamater:** Menyoroti program nyata beasiswa Rp18 Juta dari alumni angkatan 1976 beserta kutipan ketua paguyuban dan dokumentasi resmi.
    4. **Formulir Pendaftaran & Pembaruan Data Alumni:** Card form bergaya brutalist (nama, angkatan, instansi/profesi, nomor kontak, domisili) untuk memperluas database alumni sekolah.
- **Verifikasi:** Jalankan `pnpm run build` dan verifikasi `dist/alumni/index.html` berhasil dibangkitkan.

### Task 4: Perbarui Navigasi Header & Footer
- **Files:**
  - `src/components/Header.astro`
  - `src/components/Footer.astro`
- **Tindakan:**
  - Tambahkan item navigasi `{ href: "/alumni", label: "Alumni" }` pada daftar `navLinks`.
  - Berikan sentuhan Neon Brutalism pada Header: border bawah 2px solid, logo badge dengan hard shadow, tombol SmansaBot AI dengan latar Neon Lime dan border tebal.
  - Pada Footer: sertakan tautan ke `/alumni` dan terapkan styling brutalist card pada grup informasi kontak dan hak cipta.
- **Verifikasi:** Periksa HTML navigasi memuat tautan `/alumni`.

### Task 5: Adaptasi Komponen Hero Beranda ke Gaya Neon Brutalism
- **File:** `src/components/Hero.astro`
- **Tindakan:**
  - Ubah elemen visual hero:
    - *Sticker Badges:* Label koordinat dan status sekolah menggunakan blok hitam dengan teks Neon Lime / Cyan.
    - *Judul Utama:* Tipografi tegas berkontras tinggi dengan highlight warna neon brutalism pada frase kehormatan Padmawijaya.
    - *Micro-Credential Bar:* Ubah ketiga kartu data (Akreditasi A Nilai 98, NPSN 20309676, 33 Rombel) menjadi kartu blok brutalist dengan batas 2px dan bayangan keras 4px 4px 0px.
    - *Frame Foto Arsitektur:* Bingkai foto sekolah dengan bingkai luar 2.5px solid #111418 dan bayangan offset keras warna neon.
- **Verifikasi:** Lakukan build dan pastikan hero memuat class serta styling baru.

### Task 6: Terapkan Desain Neon Brutalism pada React Islands
- **Files:**
  - `src/components/islands/DirectoryLiveFilter.tsx`
  - `src/components/islands/PpdbCalculator.tsx`
  - `src/components/islands/InteractiveSmansaBot.tsx`
- **Tindakan:**
  - **DirectoryLiveFilter:** Tombol filter kategori menjadi tombol sticker brutalist (border 2px, warna neon saat aktif), kartu staf menggunakan border 2px solid dan hard shadow 4px 4px 0px, dengan foto pasfoto tetap fokus wajah (`aspect-ratio: 3/4`, `object-position: center 15%`).
  - **PpdbCalculator:** Form input dengan border tebal 2px, tombol hitung dengan latar Neon Lime dan efek taktil, box hasil perhitungan simulasi berbingkai tebal.
  - **InteractiveSmansaBot:** Jendela chat modal dan launcher button dengan border tegas 2.5px, bayangan keras 4px 4px 0px, serta gelembung percakapan dengan kontras brutalist yang tajam.
- **Verifikasi:** `pnpm run check` lolos tanpa kesalahan TypeScript.

### Task 7: Perbarui Komponen AlumniSection di Beranda
- **File:** `src/components/AlumniSection.astro`
- **Tindakan:**
  - Sesuaikan kartu alumni beranda ke standar Neon Brutalism (border 2px, hard shadow 4px 4px 0px).
  - Tambahkan tombol CTA brutalist yang mengarahkan pengunjung ke halaman lengkap: `"Buka Direktori Alumni Selengkapnya →"` mengarah ke `/alumni`.
- **Verifikasi:** Link CTA terhubung ke `/alumni`.

### Task 8: Sesuaikan Skrip Pengujian & Linter Anti-Slop
- **Files:**
  - `scripts/anti-slop-linter.py`
  - `scripts/test-neon-brutalism-alumni.mjs` (skrip baru)
- **Tindakan:**
  - Daftarkan pasangan kontras warna Neon Brutalism pada `scripts/anti-slop-linter.py` (misal `#111418` pada `#D4FF00` rasio 14.2:1, `#111418` pada `#00F0FF` rasio 12.8:1, `#111418` pada `#F4F5F8` rasio 15.6:1).
  - Buat pengujian otomatis `scripts/test-neon-brutalism-alumni.mjs` yang memeriksa:
    1. Halaman `dist/alumni/index.html` terbentuk secara utuh.
    2. Menu navigasi di `Header.astro` dan `Footer.astro` memuat tautan `/alumni`.
    3. Halaman alumni memuat profil tokoh asli (Prof. Widodo Muktiyo dkk) dan program beasiswa 1976.
    4. Token neon brutalism (`--neo-border`, `--neon-lime`, `--neo-shadow`) terdefinisi di CSS.
    5. Seluruh data riil (78 civitas staf/guru, NPSN, akreditasi) tetap 100% utuh.
- **Verifikasi:** `node scripts/test-neon-brutalism-alumni.mjs` lulus 100%.

---

## Tests / Validation Plan
1. **Pemeriksaan Linter & Sintaks:**
   ```bash
   pnpm run check
   python3 scripts/anti-slop-linter.py
   ```
   *Ekspektasi:* 0 error TypeScript, 0 kata klise AI, semua rasio kontras WCAG AA lolos.
2. **Kompilasi Penuh Build Statis:**
   ```bash
   pnpm run build
   ```
   *Ekspektasi:* Menghasilkan 26 halaman statis (termasuk halaman baru `/alumni`) dan 3 endpoint JSON dalam ~1 detik.
3. **Pengujian Fungsional & Integritas Data:**
   ```bash
   node scripts/test-modern-astro7.mjs
   node scripts/test-audit-data-hero.mjs
   node scripts/test-neon-brutalism-alumni.mjs
   ```
   *Ekspektasi:* Seluruh test suite (3/3) lulus 100% green.

---

## Risks, Tradeoffs, and Mitigations
- **Risiko Kontras Warna:** Warna neon terang (seperti kuning atau lime) bisa tidak terbaca jika dipasangkan dengan teks putih.
  *Mitigasi:* Mengunci aturan kontras bahwa latar Neon Lime/Cyan **wajib** menggunakan teks hitam pekat `#111418`, menghasilkan rasio kontras sangat tinggi (> 12:1), jauh di atas standar WCAG AA (4.5:1).
- **Risiko Kelebihan Ornamen (Visual Clutter):** Gaya brutalism jika tidak dikontrol dapat terlihat berantakan.
  *Mitigasi:* Mempertahankan struktur grid teratur yang sudah solid, membatasi ketebalan border pada 2px standar (3px untuk card utama), dan menggunakan bayangan keras 0-blur yang konsisten (4px offset).
- **Integritas Data Asli:**
  *Mitigasi:* Semua data diambil langsung dari JSON resmi (`src/content/direktori/staff.json`, `src/content/alumni/tokoh.json`, `src/content/berita/`) tanpa mock data buatan.
