# Rencana Kerja: Penyatuan Halaman Beranda & Profil, Migrasi Penuh Seluruh Komponen ke React (.tsx), dan Perbaikan Kontras Warna Hijau Neon

## Goal
Menyatukan seluruh konten halaman Profil ke dalam Beranda (`src/pages/index.astro`), memigrasikan seluruh komponen antarmuka menjadi komponen **React (.tsx)** secara menyeluruh, serta memperbaiki kontras warna hijau neon agar memiliki keterbacaan sempurna (WCAG AAA) tanpa teks yang hilang di atas latar terang.

---

## Current Context / Assumptions
1. **Pemisahan Halaman Sebelumnya:** Halaman Beranda (`src/pages/index.astro`) dan Profil (`src/pages/profil.astro`) terpisah. User meminta keduanya disatukan ke dalam satu halaman bernama **Beranda** (`/`), dengan memindahkan 100% konten profil (Makna Padmawijaya, Maskot Chiku, Sambutan Kepala Sekolah Tantri Ambarsari, Linimasa Sejarah 1957, Foto Arsip, dan Identitas Legalitas) tanpa ada data yang diubah.
2. **Kondisi Komponen Campuran:** Saat ini komponen halaman sebagian besar masih berformat `.astro` statis (`Hero.astro`, `Programs.astro`, `Curriculum.astro`, `ValueProp.astro`, `Header.astro`, `Footer.astro`, `AlumniSection.astro`, dll.), sementara React baru digunakan pada tiga pulau (`DirectoryLiveFilter.tsx`, `PpdbCalculator.tsx`, `InteractiveSmansaBot.tsx`). User menginginkan seluruh komponen UI dibangun sebagai **React (.tsx)**.
3. **Isu Keterbacaan Warna Hijau:** Variabel `--accent` saat ini dipetakan ke `--neon-lime` (`#D4FF00`). Ketika diterapkan sebagai warna teks (`color: var(--accent)` atau `color: var(--neon-lime)`) pada latar belakang terang (`#F4F5F8` atau putih), teks tersebut menjadi hampir tidak terlihat (rasio kontras < 1.3:1). Warna hijau neon harus difungsikan secara eksklusif sebagai warna *background fill* atau *badge sticker* dengan teks hitam pekat `#111418`, sedangkan teks aksen mandiri wajib menggunakan warna berbobot kontras tinggi.

---

## Architecture & Proposed Approach
1. **Arsitektur Komponen Full React (.tsx):**
   - Membuat folder `src/components/react/` untuk menampung seluruh komponen UI dalam format React JSX (`.tsx`):
     - `Header.tsx` (Navigasi bar atas dengan active state, mobile drawer, dan tombol chat)
     - `Hero.tsx` (Hero terpusat, badge koordinat GPS, headline, micro-credentials, dan peeking photo frame)
     - `ProfileSections.tsx` (Makna Padmawijaya, Maskot Chiku, Sambutan Kepala Sekolah, Linimasa Sejarah 1957, Foto Arsip 1957 & Pendidik, dan Legalitas)
     - `Programs.tsx` (Peminatan MIPA, IPS, Bahasa, dan Kurikulum Merdeka)
     - `Curriculum.tsx` (Struktur mata pelajaran dan jam belajar)
     - `ValueProp.tsx` (Pilar keunggulan sekolah dan fasilitas)
     - `AlumniSection.tsx` (Cuplikan tokoh alumni dan CTA ke `/alumni`)
     - `Footer.tsx` (Footer lengkap dengan identitas sekolah, tautan, dan kredit tim)
   - Komponen Astro utama (`index.astro`, `alumni.astro`, `direktori.astro`, dll.) berperan sebagai *host page container* yang mengoper data dari Astro Content Collections / JSON ke komponen-komponen React ini.
2. **Penyatuan Halaman Profil ke Beranda (`/`):**
   - Seluruh konten dan aset gambar (`salamkepsek.jpg`, `history-foto1.jpg`, `history-foto2a.jpg`, `smansafullteam.jpeg`) dipindahkan ke dalam section beranda dengan ID `#profil` dan `#sejarah`.
   - Halaman `src/pages/profil.astro` dialihkan (*redirect 301*) secara mulus ke `/#profil` agar tautan lama tidak rusak.
   - Menu navigasi atas memperbarui tautan Profil menjadi mengarah ke anchor `/#profil`.
3. **Resolusi Kontras Warna Hijau Neon:**
   - Pisahkan token warna:
     - `--neon-lime-fill: #D4FF00;` (Khusus latar belakang badge, tombol, dan kotak sorotan; selalu dipasangkan dengan warna teks `--neo-ink: #111418` sehingga rasio kontras 14.2:1).
     - `--accent-text: #0E7490;` (Warna aksen teks khusus pada permukaan terang dengan kontras > 7.5:1).
     - `--accent: #111418;` (Memastikan semua aturan CSS `color: var(--accent)` yang ada jatuh ke warna gelap pekat yang terbaca jelas).
   - Seluruh teks yang sebelumnya berwarna hijau neon tanpa pembungkus gelap diubah menjadi badge sticker brutalist atau teks pekat.

---

## Step-by-Step Implementation Tasks

### Task 1: Perbaikan Token CSS & Eliminasi Teks Hijau Tak Terbaca
- **File:** `src/styles/tokens.css` dan `src/styles/global.css`
- **Tindakan:**
  - Ubah `--accent` menjadi `#111418` (bukan `#D4FF00`) agar perintah `color: var(--accent)` tidak lagi menghasilkan teks kuning-hijau pucat di atas latar putih/abu-abu.
  - Tambahkan token `--neo-lime-bg: #D4FF00;` dan `--neo-lime-text: #111418;`.
  - Tambahkan utilitas `.text-contrast-accent` dengan warna hijau hutan berbobot gelap `--neo-green-dark: #14532D;` untuk teks non-badge.
  - Pastikan seluruh class `.lbl-lime` memiliki `background: var(--neon-lime); color: #111418 !important; border: 1.5px solid #111418;`.
- **Verifikasi:** Jalankan `python3 scripts/anti-slop-linter.py`.

### Task 2: Bangun Komponen React `Header.tsx`
- **File:** `src/components/react/Header.tsx`
- **Tindakan:**
  - Migrasikan seluruh logika navigasi, drawer mobile menu, penanda aktif, dan tombol SmansaBot AI dari `Header.astro` ke React TSX.
  - Tambahkan item menu: `Beranda` (`/`), `Profil` (`/#profil`), `Akademik` (`/program`), `Direktori` (`/direktori`), `Berita` (`/berita`), `Alumni` (`/alumni`), dan `PPDB 2026` (`/ppdb`).
  - Pasang state `isOpen` untuk menu toggle mobile.
- **Verifikasi:** Lolos kompilasi TypeScript (`npx astro check`).

### Task 3: Bangun Komponen React `Hero.tsx`
- **File:** `src/components/react/Hero.tsx`
- **Tindakan:**
  - Pindahkan markup dan styling `Hero.astro` ke komponen React murni.
  - Pertahankan posisi teks dan tombol terpusat (`align-items: center; text-align: center;`).
  - Pertahankan bingkai foto arsitektur Kampus 13 yang nongol di viewport awal (*peeking photo frame*) beserta badge koordinat `7°42'06.5"S 110°36'09.0"E` dan micro-credentials (98, 20309676, 33 Rombel).
- **Verifikasi:** Komponen menerima path gambar `heroImage` dan merender HTML identik.

### Task 4: Bangun Komponen React `ProfileSections.tsx` (Penyatuan Konten Profil)
- **File:** `src/components/react/ProfileSections.tsx`
- **Tindakan:**
  - Satukan seluruh data dan konten dari `src/pages/profil.astro`:
    1. **Makna Nama Padmawijaya & Maskot Chiku:** Bunga teratai merah di atas lumpur dan burung hantu lambang ketajaman nalar.
    2. **Sambutan Kepala Sekolah:** Ibu Tantri Ambarsari, S.Pd., M.Eng. dengan foto `salamkepsek.jpg` dan kutipan lengkap tanpa pemotongan.
    3. **Linimasa Sejarah Sejak 1957:** 6 tonggak sejarah lengkap (1957, 1960, 1965, 1994, 2003, 2021) dan 2 arsip foto (`history-foto1.jpg` & `history-foto2a.jpg`).
    4. **Dewan Pengajar & Staf:** Foto tim `smansafullteam.jpeg` dan narasi pengabdian civitas akademika.
    5. **Tabel Legalitas Sekolah:** 10 baris data resmi (NPSN 20309676, NSS 301046002001, SK Pendirian 5620/B/57, Akreditasi Nilai 98, alamat, dan telepon).
  - Terapkan gaya visual Neon Brutalism: kartu berkontras tinggi, border 2px solid `#111418`, dan hard shadow 4px 4px 0px.
- **Verifikasi:** Render seluruh 5 bagian profil secara utuh.

### Task 5: Bangun Komponen React `Programs.tsx`, `Curriculum.tsx`, dan `ValueProp.tsx`
- **Files:**
  - `src/components/react/Programs.tsx`
  - `src/components/react/Curriculum.tsx`
  - `src/components/react/ValueProp.tsx`
  - `src/components/react/AlumniSection.tsx`
- **Tindakan:**
  - Konversi komponen `.astro` tersebut ke React TSX.
  - Perbaiki setiap penggunaan warna teks: gantikan `color: var(--accent)` yang tadinya hijau pucat dengan warna teks gelap berkontras tinggi (`#111418` atau `#3E4651`) dengan badge sticker neon jika membutuhkan aksen visual.
- **Verifikasi:** Kompilasi JSX/TSX valid tanpa error tipe.

### Task 6: Bangun Komponen React `Footer.tsx`
- **File:** `src/components/react/Footer.tsx`
- **Tindakan:**
  - Migrasikan seluruh struktur footer ke React TSX.
  - Pastikan tautan Navigasi Utama mengarah ke `Beranda` (`/`), `Profil & Sejarah` (`/#profil`), `Akademik`, `Direktori`, `Berita`, `Alumni`, dan `PPDB 2026`.
  - Berikan styling brutalist pada kotak kredit tim RANDOM KID dan badge NPSN/NSS.
- **Verifikasi:** Verifikasi render HTML footer.

### Task 7: Integrasikan Seluruh Komponen React ke Beranda (`src/pages/index.astro`)
- **File:** `src/pages/index.astro`
- **Tindakan:**
  - Ubah `index.astro` agar mengimpor komponen-komponen React:
    - `<Header client:load />`
    - `<Hero client:load heroImage="/images/school/Smansa1.jpg" />`
    - `<ProfileSections client:visible />`
    - `<Programs client:visible />`
    - `<Curriculum client:visible />`
    - `<ValueProp client:visible />`
    - `<AlumniSection client:visible items={alumniList} />`
    - `<InteractiveSmansaBot client:idle />`
    - `<Footer client:load />`
  - Halaman `index.astro` kini menjadi portal tunggal komprehensif yang memuat seluruh identitas Beranda dan Profil sekolah.
- **Verifikasi:** Jalankan `pnpm run build`.

### Task 8: Pengalihan Rute Profil (`src/pages/profil.astro`)
- **File:** `src/pages/profil.astro`
- **Tindakan:**
  - Buat pengalihan otomatis (*client-side and meta redirect*) ke `/#profil` agar URL lama tetap mengarahkan pengunjung ke bagian profil di Beranda.
- **Verifikasi:** Akses ke `/profil` langsung mengarah ke `/#profil`.

### Task 9: Penyesuaian Test Suite & Linter
- **Files:**
  - `scripts/anti-slop-linter.py`
  - `scripts/test-react-unification.mjs` (skrip baru)
- **Tindakan:**
  - Tambahkan pemeriksaan otomatis:
    1. Seluruh komponen utama beranda berformat `.tsx` dan dimuat dengan benar.
    2. Bagian profil (sejarah 1957, makna Padmawijaya, maskot Chiku, sambutan kepala sekolah, foto arsip) hadir di `dist/index.html`.
    3. Tidak ada teks berwarna hijau pucat `#D4FF00` di atas latar terang tanpa kontras.
    4. Rute `/alumni`, `/direktori`, `/berita`, `/ppdb`, dan API tetap 100% aktif dan valid.
- **Verifikasi:** `node scripts/test-react-unification.mjs` lolos 100% green.

---

## Tests / Validation Plan
1. **Typecheck & Linter:**
   ```bash
   npx astro check
   python3 scripts/anti-slop-linter.py
   ```
   *Ekspektasi:* 0 error TypeScript, 0 pelanggaran kontras WCAG AA.
2. **Kompilasi Penuh Build Statis:**
   ```bash
   pnpm run build
   ```
   *Ekspektasi:* Kompilasi sukses membangkitkan seluruh halaman statis dan endpoint JSON dalam < 2 detik.
3. **Eksekusi Test Suite:**
   ```bash
   node scripts/test-modern-astro7.mjs
   node scripts/test-neon-brutalism-alumni.mjs
   node scripts/test-react-unification.mjs
   ```
   *Ekspektasi:* Seluruh pengujian (3/3) lulus 100% green.

---

## Risks, Tradeoffs, and Mitigations
- **Risiko Ukuran Bundle JS:** Mengubah seluruh komponen menjadi React client-hydrated dapat meningkatkan ukuran bundle JS jika semua menggunakan `client:load`.
  *Mitigasi:* Gunakan client directives yang selektif dan tepat: `client:load` hanya untuk navigasi Header dan Hero, sementara bagian bawah (`ProfileSections`, `Programs`, `Curriculum`, `AlumniSection`) menggunakan `client:visible` (baru menghidrasi saat terlihat di viewport scroll).
- **Risiko Kehilangan Konten Profil:** Penggabungan profil ke beranda berisiko menghilangkan detail historis.
  *Mitigasi:* Komponen `ProfileSections.tsx` menyalin seluruh teks, data mileston sejarah, kutipan kepala sekolah, dan data legalitas tanpa ada kata yang dipangkas.
- **Keterbacaan Warna Neon:**
  *Mitigasi:* Menetapkan aturan tegas bahwa warna `#D4FF00` dilarang digunakan sebagai warna font untuk teks body/paragraf, dan hanya boleh menjadi warna latar belakang dengan teks hitam pekat `#111418`.
