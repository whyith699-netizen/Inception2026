# Rencana Kerja: Konversi Penuh Seluruh Halaman ke React JS (.tsx) & Tailwind CSS

## Goal
Mengonversi seluruh tampilan halaman dan antarmuka web SMA Negeri 1 Klaten dari template Astro statis menjadi komponen **React JS (.tsx)** secara menyeluruh dengan sistem penataan gaya **Tailwind CSS**, dengan tetap mempertahankan arsitektur SSG modern Astro 7, integritas data resmi institusi, dan estetika visual Neon Brutalism.

---

## Current Context / Assumptions
1. **Kondisi Eksisting Komponen:**
   - Halaman Beranda (`src/pages/index.astro`) sudah menggunakan 10 komponen React di `src/components/react/` (`Header.tsx`, `Hero.tsx`, `Metrics.tsx`, `ProfileSections.tsx`, `Programs.tsx`, `Curriculum.tsx`, `ValueProp.tsx`, `AlumniSection.tsx`, `EventBanner.tsx`, `Footer.tsx`), namun penataan gayanya masih sebagian besar menggunakan tag `<style>` lokal scoped, belum berbasis utility classes Tailwind CSS.
   - Halaman lainnya (`/alumni`, `/direktori`, `/berita`, `/berita/[slug]`, `/fasilitas`, `/kontak`, `/ppdb`, `/prestasi`, `/program`) masih menuliskan markup HTML di dalam file `.astro` dengan tag `<style>` masing-masing, meskipun beberapa pulau interaktif (`InteractiveSmansaBot.tsx`, `PpdbCalculator.tsx`, `DirectoryLiveFilter.tsx`) sudah berupa React.
2. **Ketiadaan Konfigurasi Tailwind CSS:**
   - Proyek saat ini belum memiliki dependensi Tailwind CSS di `package.json` dan `astro.config.mjs`.
   - Warna dan shadow brutalist saat ini didefinisikan lewat CSS variables di `src/styles/tokens.css` dan `src/styles/global.css`.
3. **Persyaratan Ketat Data & Estetika:**
   - 78 data personil pendidik & staf (`src/content/direktori/staff.json`) wajib 100% utuh.
   - 7 data tokoh alumni nasional (`src/content/alumni/tokoh.json`) beserta fotonya wajib tampil.
   - Nilai akreditasi 98, NPSN 20309676, NSS 301046002001, sejarah 1957, dan filosofi Padmawijaya tidak boleh berubah.
   - Sesuai arahan terakhir: tidak ada lagi sebutan "Kampus 13", melainkan "Gedung Utama" atau "SMAN 1 Klaten".
   - Menghindari AI-slop: tidak ada teks hitam murni `#000000`, tidak ada gradient halus/pudar, hard shadow 0-blur `4px 4px 0px #111418`, dan kontras teks memenuhi WCAG AA/AAA.

---

## Architecture & Proposed Approach
1. **Integrasi Tailwind CSS pada Astro 7:**
   - Menginstal `tailwindcss` dan `@tailwindcss/vite` (atau plugin integrasi resmi Astro).
   - Memetakan token warna brutalist ke konfigurasi Tailwind CSS (`neo-bg: #F4F5F8`, `neo-surface: #FFFFFF`, `neo-surface-2: #E8EBF0`, `neo-ink: #111418`, `neo-ink-2: #3E4651`, `neo-ink-3: #6C7684`, `neon-lime: #D4FF00`, `neon-cyan: #00F0FF`, `neon-magenta: #FF2E93`, `neon-yellow: #FFE600`) serta hard shadows `shadow-neo` (`4px 4px 0px #111418`), `shadow-neo-sm` (`2px 2px 0px #111418`), dan `shadow-neo-lg` (`6px 6px 0px #111418`).
2. **Arsitektur Page Component React (`src/components/react/pages/`):**
   - File `.astro` di `src/pages/` bertindak sebagai container data loader statis (mengambil data dari Content Collections Astro) dan merender Page Component React:
     - `src/components/react/pages/HomePage.tsx`
     - `src/components/react/pages/AlumniPage.tsx`
     - `src/components/react/pages/DirektoriPage.tsx`
     - `src/components/react/pages/BeritaPage.tsx`
     - `src/components/react/pages/BeritaDetailPage.tsx`
     - `src/components/react/pages/FasilitasPage.tsx`
     - `src/components/react/pages/KontakPage.tsx`
     - `src/components/react/pages/PpdbPage.tsx`
     - `src/components/react/pages/PrestasiPage.tsx`
     - `src/components/react/pages/ProgramPage.tsx`
   - Setiap page component dibangun 100% menggunakan React JSX (`.tsx`) dan kelas utilitas Tailwind CSS murni.
3. **Refaktor Komponen Bersama (Shared Components):**
   - Mengonversi `Header.tsx`, `Footer.tsx`, `Hero.tsx`, `ProfileSections.tsx`, `AlumniSection.tsx`, dll. agar menggunakan utility class Tailwind menggantikan blok `<style>`.

---

## Step-by-Step Implementation Tasks

### Task 1: Setup & Integrasi Tailwind CSS di Astro 7
- **Files:** `package.json`, `astro.config.mjs`, `src/styles/global.css`
- **Tindakan:**
  - Tambahkan dependensi `@tailwindcss/vite` dan `tailwindcss` via pnpm.
  - Daftarkan plugin `@tailwindcss/vite` pada konfigurasi Vite di `astro.config.mjs`.
  - Tambahkan arahan `@import "tailwindcss";` pada file CSS utama `src/styles/global.css`.
  - Konfigurasikan `@theme` Tailwind dengan palet warna dan shadow Neon Brutalism:
    ```css
    @theme {
      --color-neo-bg: #F4F5F8;
      --color-neo-surface: #FFFFFF;
      --color-neo-surface-2: #E8EBF0;
      --color-neo-ink: #111418;
      --color-neo-ink-2: #3E4651;
      --color-neo-ink-3: #6C7684;
      --color-neon-lime: #D4FF00;
      --color-neon-cyan: #00F0FF;
      --color-neon-magenta: #FF2E93;
      --color-neon-yellow: #FFE600;
      --shadow-neo-sm: 2px 2px 0px #111418;
      --shadow-neo: 4px 4px 0px #111418;
      --shadow-neo-lg: 6px 6px 0px #111418;
      --font-serif: 'Fraunces', Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', sans-serif;
      --font-mono: 'Space Mono', monospace;
    }
    ```
- **Verifikasi:** Jalankan `pnpm run build` untuk memastikan Vite mengompilasi Tailwind tanpa konflik.

---

### Task 2: Migrasi Header & Footer ke Tailwind CSS
- **Files:** `src/components/react/Header.tsx`, `src/components/react/Footer.tsx`
- **Tindakan:**
  - Gantikan seluruh inline CSS di blok `<style>` dengan class Tailwind:
    - Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
    - Navbar: `bg-neo-surface border-b-2 border-neo-ink sticky top-0 z-50`
    - Brand: `font-bold text-neo-ink tracking-tight`
    - Tombol SmansaBot: `bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo px-4 py-2 font-mono font-bold text-xs uppercase hover:bg-neon-cyan transition-colors`
    - Mobile drawer menu: animasi responsive Tailwind.
    - Footer: `bg-neo-surface border-t-2 border-neo-ink p-8 sm:p-12 text-neo-ink`
- **Verifikasi:** `npx astro check` dan render HTML header/footer memiliki class Tailwind yang valid.

---

### Task 3: Bangun `AlumniPage.tsx` Berbasis React & Tailwind
- **Files:** `src/components/react/pages/AlumniPage.tsx`, `src/pages/alumni.astro`
- **Tindakan:**
  - Pindahkan seluruh konten halaman `/alumni`:
    - Hero KAPASSKA dengan lencana 69 angkatan dan statistik alumni.
    - Grid 7 tokoh alumni riil (Prof. Sudjarwadi, Prof. Sudharto, Prof. Syamsul Hadi, Dr. Rudjito, Prof. Hardyanto, Prof. Eka Julianta, Prof. Hari Muhammad) dengan kartu berbingkai `border-2 border-neo-ink shadow-neo bg-neo-surface`.
    - Bagian Beasiswa Pendidikan Angkatan 1976 (Rp 18.000.000,-).
    - Daftar pengurus daerah (Jabodetabek, Solo Raya & DIY, Jatim, Jabar, Diaspora).
    - Formulir pendataan alumni terhubung state React.
  - Jadikan `src/pages/alumni.astro` hanya mengoper data koleksi ke `<AlumniPage client:load items={alumniList} />`.
- **Verifikasi:** `dist/alumni/index.html` memuat data lengkap dan class Tailwind.

---

### Task 4: Bangun `DirektoriPage.tsx` Berbasis React & Tailwind
- **Files:** `src/components/react/pages/DirektoriPage.tsx`, `src/pages/direktori.astro`
- **Tindakan:**
  - Satukan logika filter interaktif (`DirectoryLiveFilter.tsx`) dan layout direktori menjadi komponen React utuh `DirektoriPage.tsx`.
  - Buat input pencarian dan tab filter kategori guru (Pimpinan, MIPA, IPS, Bahasa, Olahraga, Tenaga Kependidikan) dengan utilitas Tailwind:
    - Input: `w-full p-3 bg-neo-surface border-2 border-neo-ink shadow-neo font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan`
    - Tombol tab: `px-4 py-2 border-2 border-neo-ink font-mono font-bold text-xs shadow-neo-sm`
    - Kartu staf: grid responsive `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`, frame foto aspect-ratio potret dengan `object-cover object-top border-b-2 border-neo-ink`.
  - Perbarui `src/pages/direktori.astro` untuk merender `<DirektoriPage client:load staffGroups={staffData} />`.
- **Verifikasi:** Seluruh 78 data personil staf tampil dan dapat dicari secara real-time.

---

### Task 5: Bangun `BeritaPage.tsx` & `BeritaDetailPage.tsx` Berbasis React & Tailwind
- **Files:** 
  - `src/components/react/pages/BeritaPage.tsx`
  - `src/components/react/pages/BeritaDetailPage.tsx`
  - `src/pages/berita.astro`
  - `src/pages/berita/[slug].astro`
- **Tindakan:**
  - Migrasikan daftar warta berita sekolah ke `BeritaPage.tsx`:
    - Grid artikel dengan tag kategori neon brutalist (`bg-neon-lime text-neo-ink border border-neo-ink px-2 py-0.5 font-mono text-xs`).
    - Banner pengumuman penting di bagian atas.
  - Migrasikan tampilan detail artikel ke `BeritaDetailPage.tsx`:
    - Layout editorial berwibawa: judul berukuran besar `font-serif text-3xl sm:text-5xl font-bold`, metadata tanggal & penulis, bingkai gambar utama, dan typography konten paragraf bersih berjarak proporsional.
  - Perbarui rute `src/pages/berita.astro` dan `src/pages/berita/[slug].astro` untuk memanfaatkan komponen React ini.
- **Verifikasi:** Seluruh artikel berita statis ter-render sempurna saat build.

---

### Task 6: Bangun `PpdbPage.tsx` Berbasis React & Tailwind
- **Files:** `src/components/react/pages/PpdbPage.tsx`, `src/pages/ppdb.astro`
- **Tindakan:**
  - Integrasikan kalkulator simulasi PPDB (`PpdbCalculator.tsx`) dan seluruh informasi panduan pendaftaran PPDB 2026 ke dalam satu komponen React utuh `PpdbPage.tsx`.
  - Berikan penataan gaya Tailwind:
    - 4 Jalur PPDB (Zonasi min 55%, Afirmasi min 20%, Prestasi maks 20%, Mutasi maks 5%) dalam kartu brutalist interaktif.
    - Linimasa tahapan pendaftaran PPDB Mei–Juni 2026.
    - Bagian interaktif kalkulator skor zonasi dan prestasi dengan slider dan select Tailwind yang tajam.
  - Perbarui `src/pages/ppdb.astro` untuk memuat `<PpdbPage client:load />`.
- **Verifikasi:** Simulasi skor PPDB reaktif dan semua instruksi syarat pendaftaran hadir.

---

### Task 7: Bangun `FasilitasPage.tsx` & `PrestasiPage.tsx` Berbasis React & Tailwind
- **Files:**
  - `src/components/react/pages/FasilitasPage.tsx`
  - `src/components/react/pages/PrestasiPage.tsx`
  - `src/pages/fasilitas.astro`
  - `src/pages/prestasi.astro`
- **Tindakan:**
  - `FasilitasPage.tsx`:
    - Galeri fasilitas: Laboratorium Komputer, Lab Fisika/Kimia/Biologi, Perpustakaan Digital e-Perpus, Sarana Olahraga, dan Lapangan Terbuka.
    - Desain visual: grid kartu foto dengan badge tag, border 2px solid hitam, dan deskripsi kapasitas sarana.
  - `PrestasiPage.tsx`:
    - Rekam jejak kejuaraan: OSN, FLS2N, O2SN, LKTIN, dan Adiwiyata.
    - Filter tingkat pencapaian (Nasional, Provinsi, Kabupaten).
  - Hubungkan ke masing-masing file container `.astro`.
- **Verifikasi:** Halaman `/fasilitas` dan `/prestasi` terverifikasi utuh.

---

### Task 8: Bangun `ProgramPage.tsx` & `KontakPage.tsx` Berbasis React & Tailwind
- **Files:**
  - `src/components/react/pages/ProgramPage.tsx`
  - `src/components/react/pages/KontakPage.tsx`
  - `src/pages/program.astro`
  - `src/pages/kontak.astro`
- **Tindakan:**
  - `ProgramPage.tsx`:
    - Struktur kurikulum Merdeka, peminatan MIPA, IPS, dan Bahasa.
    - 23 ekstrakurikuler resmi beserta logo (`logoekstra/*.png`).
  - `KontakPage.tsx`:
    - Peta lokasi Jl. Merbabu No. 13 Klaten Selatan.
    - Informasi kontak resmi: telepon (0272) 321150, email, jam pelayanan loket.
    - Formulir pengaduan & aspirasi masyarakat.
  - Hubungkan ke rute `.astro` terkait.
- **Verifikasi:** Rute `/program` dan `/kontak` dapat diakses dan valid.

---

### Task 9: Refaktor Seluruh Komponen Beranda (`src/components/react/`) Menggunakan Tailwind CSS
- **Files:**
  - `src/components/react/Hero.tsx`
  - `src/components/react/Metrics.tsx`
  - `src/components/react/ProfileSections.tsx`
  - `src/components/react/Programs.tsx`
  - `src/components/react/Curriculum.tsx`
  - `src/components/react/ValueProp.tsx`
  - `src/components/react/AlumniSection.tsx`
  - `src/components/react/EventBanner.tsx`
  - `src/pages/index.astro`
- **Tindakan:**
  - Bersihkan tag `<style>` dari setiap komponen di atas, gantikan dengan utility class Tailwind:
    - Hero: `text-center py-12 lg:py-20 bg-neo-bg border-b-2 border-neo-ink`
    - Badge koordinat: `inline-flex items-center gap-2 bg-neo-surface border border-neo-ink px-3 py-1 font-mono text-xs font-bold shadow-neo-sm`
    - Showcase Gedung Utama: `border-2 border-neo-ink shadow-neo overflow-hidden relative`
    - Profile Sections: kartu makna Padmawijaya, maskot Chiku, linimasa sejarah 1957, sambutan kepala sekolah Tantri Ambarsari, dan tabel legalitas ber-styling Tailwind.
- **Verifikasi:** Tampilan Beranda (`/`) 100% menggunakan Tailwind CSS tanpa sisa tag `<style>` yang berulang.

---

### Task 10: Pembuatan Test Suite Otomatisasi & Verifikasi Akhir
- **Files:** `scripts/test-all-react-tailwind.mjs`, `scripts/anti-slop-linter.py`
- **Tindakan:**
  - Buat skrip pengujian baru `scripts/test-all-react-tailwind.mjs` untuk menguji secara otomatis:
    1. Seluruh 10 file halaman `.astro` mengimpor Page Component React (`.tsx`).
    2. Tidak ada lagi blok `<style>` besar tersisa di halaman yang dimigrasikan.
    3. Seluruh output build `dist/**/*.html` memuat kelas Tailwind (`border-neo-ink`, `shadow-neo`, dll.).
    4. Keutuhan data riil (78 staf, 7 tokoh alumni KAPASSKA, NPSN 20309676).
    5. Ketiadaan frasa "Kampus 13".
- **Verifikasi:** Jalankan seluruh rangkaian tes:
  ```bash
  npx astro check
  python3 scripts/anti-slop-linter.py
  pnpm run build
  node scripts/test-all-react-tailwind.mjs
  ```

---

## Tests / Validation Plan
1. **Type Checking:**
   - Command: `npx astro check`
   - Ekspektasi: 0 errors, 0 warnings pada seluruh file `.tsx` dan `.astro`.
2. **Anti-Slop Linter:**
   - Command: `python3 scripts/anti-slop-linter.py`
   - Ekspektasi: Lolos 100% (tidak ada kata klise AI, tidak ada teks hitam murni `#000000`, rasio kontras WCAG AA terpenuhi).
3. **Build Output & SSR/SSG Generation:**
   - Command: `pnpm run build`
   - Ekspektasi: 26+ file HTML statis sukses digenerate dalam waktu < 2.5 detik.
4. **Verifikasi Suite React & Tailwind:**
   - Command: `node scripts/test-all-react-tailwind.mjs`
   - Ekspektasi: Seluruh pengujian lolos 100% green.

---

## Risks, Tradeoffs, and Mitigations
- **Risiko Ukuran JavaScript Client (Hydration Overhead):**
  - Mengonversi semua page ke React berpotensi membebani browser jika semua komponen dihidrasi penuh.
  - *Mitigasi:* Gunakan `client:visible` atau `client:idle` pada komponen bawah, dan biarkan bagian statis hanya dirender sebagai React static output tanpa hydration JS berlebih kecuali pada komponen yang membutuhkan state interaktif (filter direktori, bot chat, kalkulator PPDB).
- **Risiko Konflik Styling Tailwind vs Global CSS:**
  - Utility classes Tailwind bisa bertabrakan dengan CSS lama di `global.css`.
  - *Mitigasi:* Petakan token variabel CSS lama ke dalam `@theme` Tailwind sehingga class Tailwind memanfaatkan basis variabel yang sama persis secara harmonis.
- **Risiko Kerusakan Tampilan Saat Migrasi Besar:**
  - *Mitigasi:* Eksekusi bertahap per halaman dengan kompilasi dan pengujian otomatis di setiap langkah (TDD cycle).
