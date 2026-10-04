# Rencana Kerja: Audit Menyeluruh Data & Fakta SMAN 1 Klaten, Penyusunan Dokumen Sumber untuk AI Agent, serta Peningkatan Tipografi & Estetika Hero

## Goal
Melakukan audit menyeluruh dan sinkronisasi 100% data faktual SMA Negeri 1 Klaten ("Padmawijaya / Kampus 13") antara website resmi (`https://www.sma1klaten.sch.id/api/`) dan ensiklopedia Wikipedia (`https://id.wikipedia.org/wiki/SMA_Negeri_1_Klaten`), menyusun berkas referensi `docs/SUMBER_DATA_SMAN1_KLATEN.md` sebagai *single source of truth* untuk agent, serta merombak komponen `Hero.astro` dan tipografi portal agar berkarakter akademik prestisius, berdetail tinggi, dan bebas dari kesan "basic" atau "AI slop".

---

## Current Context / Assumptions
1. **Perbedaan Data antara Website Resmi vs Wikipedia:**
   - **Data Guru & Staf:** Pada kode saat ini hanya terdapat segelintir kelompok guru simulasi, padahal API resmi sekolah (`/api/staff`) mencatat **77 civitas akademika riil** (62 Guru + 15 Tenaga Kependidikan) dengan data foto, jabatan, dan pangkat (Pembina Utama Muda, Pembina TK. I, dsb.).
   - **Data Berita:** Website resmi memiliki 175 artikel berita asli lengkap dengan dokumentasi foto Tim Snapshoot dan Tim Humas (misalnya kunjungan 11 dosen FH Undip 23 September 2026 dan donasi beasiswa Rp18 juta alumni angkatan 1976 pada 18 September 2026).
   - **Data Sarana & Fisik (Wikipedia):** Luas lahan **15.619 m²**, luas bangunan **6.863 m²**, taman/halaman **7.486 m²**, lapangan olahraga **784 m²**, 33 rombongan belajar (X–XII A–K), ~1.190 siswa.
   - **Legalitas & Sejarah:** Didirikan 5 November 1957 oleh Bupati Klaten Mochtar (SMA Persiapan, SK 5620/B/57), Akreditasi Nilai 98 (Peringkat A Unggul, SK No. 1347/BAN-SM/SK/2021), NPSN 20309676, NSS 301046002001, maskot Chiku si burung hantu, organisasi alumni KAPASSKA (berdiri 26 Desember 2009).
   - **Prestasi Legendaris:** Medali Emas Olimpiade Astronomi Internasional (IOA) 2004 di Simeiz Crimea, 2 Emas dan 1 Perunggu OSN 2004, Sekolah Adiwiyata Nasional 2016.
2. **Kelemahan Tampilan Hero & Tipografi Eksisting:**
   - Hero saat ini terasa terlalu datar (*basic*) dengan tata letak teks bertumpuk biasa di atas gambar 16:9 tunggal, tanpa micro-typography (koordinat, kicker geografis, stempel legalitas akreditasi, ornamen hairline arsitektur).
   - Tipografi kurang memiliki hierarki display berbobot: font Fraunces belum dioptimalkan optical sizing-nya (`opsz 144`, variasi italic halus untuk istilah kehormatan *Padmawijaya* dan *Kampus 13*), dan nomor metrik belum sepenuhnya terbingkai dalam micro-grid editorial.
3. **Kepatuhan Desain Anti-Slop (tasteskill.dev):**
   - Tetap wajib zero doodle kartun, zero shadow tebal, 1 aksen warna terakota `#B5472F`, paper `#FAF8F5`, hairline `#E8E1D7`, dan teks kontras tinggi WCAG AA.

---

## Architecture / Proposed Approach
1. **Dokumentasi Terpadu Sumber Data Sekolah (`docs/SUMBER_DATA_SMAN1_KLATEN.md`):**
   - Membuat panduan komprehensif di level root repositori yang merangkum seluruh endpoint REST API resmi, struktur data JSON, tautan arsip, dan fakta sejarah terverifikasi agar setiap agent masa depan memiliki rujukan mutlak tanpa perlu menebak-nebak.
2. **Sinkronisasi Koleksi Konten Berbasis Data Faktual Nyata:**
   - Memperbarui `src/content/direktori/staff.json` dengan 77 data guru dan pimpinan riil hasil audit API resmi, dilengkapi foto resmi yang dioptimasi.
   - Memperbarui `src/content/berita/` dan `src/content/alumni/tokoh.json` dengan artikel peristiwa faktual dan profil alumni nyata (Prof. DR. Widodo Muktiyo, Prof. DR. Joko Triyono, Ir. Paulus Insap Santosa, Ph.D., Drs. Eko Hartono, MPP., Winarno, S.Si., M.Eng., Agus Mulia, S.Pt.).
3. **Penyempurnaan Hero Editorial Prestisius (*Padmawijaya Academic Broadside*):**
   - Mengubah `src/components/Hero.astro` menjadi tata letak editorial asimetris dengan detail mikro:
     - *Eyebrow Lintang Bujur:* `EST. 1957 · KAMPUS 13 · 7°42'06.5"S 110°36'09.0"E · KLATEN`.
     - *Headline Berkarakter:* Display Fraunces dengan kontras serif-italic prestisius: *"Tradisi Keunggulan Akademik dan Budi Pekerti Luhur di Bumi Padmawijaya"*.
     - *Micro-Credential Bar:* Tiga sel data bergaris hairline: Akreditasi A Nilai 98 BAN-SM, NPSN 20309676 / NSS 301046002001, serta 33 Rombongan Belajar (1.190 Siswa).
     - *Showcase Fotografi Ganda Arsitektur:* Bingkai arsitektur kampus bergaris hairline ganda (*double-hairline frame*) dengan cap stempel legalitas digital dan micro-caption teknis.

---

## Step-by-Step Implementation Tasks

### Task 1: Penyusunan Dokumen Sumber Data Lengkap (`docs/SUMBER_DATA_SMAN1_KLATEN.md`)
Membuat berkas rujukan permanen agar agen AI memiliki akses langsung ke seluruh sumber data otentik SMAN 1 Klaten.

- **File target:** `/home/archgha/web-sekolah/docs/SUMBER_DATA_SMAN1_KLATEN.md`
- **Isi Utama Berkas:**
  1. **Endpoints API Resmi Website Sekolah (`https://www.sma1klaten.sch.id`):**
     - `/api/staff?limit=100&page=1`: Daftar 77 staff (62 Guru + 15 Tenaga Kependidikan) dengan field `name`, `grade`, `position`, `teaching`, `image_url`.
     - `/api/news?limit=50&page=1`: Daftar 175 artikel berita resmi dengan field `title`, `slug`, `desc`, `url` (gambar), `createdDate`, `createdBy`.
     - `/api/alumni?limit=10`: Profil 6 alumni kehormatan resmi dengan testimoni dan jabatan.
     - Gambar upload: `https://www.sma1klaten.sch.id/uploads/...` atau `/api/images/uploads/...`.
  2. **Data Legalitas & Profil Ensiklopedis (Wikipedia ID & BAN-SM):**
     - NPSN: `20309676` | NSS: `301046002001`.
     - Akreditasi: `Peringkat A (Unggul)` dengan **Nilai 98** (SK No. `1347/BAN-SM/SK/2021`).
     - Tanggal Pendirian: `5 November 1957` (oleh Bupati Klaten Mochtar, SK Mendikbud `5620/B/57`).
     - Alamat: `Jalan Merbabu No. 13, Klaten Selatan, Kota Klaten, Jawa Tengah 57423` | Telp: `(0272) 321150`.
     - Koordinat GPS: `7°42'06.5"S 110°36'09.0"E` (-7.7018, 110.6025).
     - Luas Lahan: `15.619 m²` | Luas Bangunan: `6.863 m²` | Halaman/Taman: `7.486 m²` | Lapangan Olahraga: `784 m²`.
     - Jumlah Siswa: `1.190 siswa` dalam `33 rombongan belajar` (Kelas X A–K, XI A–K, XII A–K).
     - Moto Sekolah: *"Terwujudnya lulusan unggul, berdaya saing global, dan beretika lingkungan berlandaskan nilai-nilai luhur bangsa."* Slogan: *"Padmawijaya / Berkarakter Hebat Jaya"*.
     - Maskot: *Chiku si burung hantu*.
     - Ikatan Alumni: *KAPASSKA* (Keluarga Alumni Padmawijaya SMAN 1 Klaten, berdiri 26 Desember 2009).
  3. **Struktur Kepemimpinan Terverifikasi:**
     - Kepala Sekolah: *Tantri Ambarsari, S.Pd., M.Eng.* (Pembina TK. I).
     - Komite Sekolah: *Drs. Sumargana, M.S.*
     - 4 Wakil Kepala Sekolah:
       * FX. Febriyanto Adi Nugroho, S.Si. (Kurikulum)
       * Bambang Budianto, S.Pd. (Kesiswaan)
       * Agus Purnama, S.Pd. (Sarana & Prasarana)
       * Resmiyati, S.Pd., M.Pd. (Hubungan Masyarakat)
  4. **Daftar 23 Ekstrakurikuler Resmi:**
     - OSIS (Osmansa), MPK, Pramuka (Dewan Ambalan), PMR (Prata), Pecinta Alam (Emapala), Rohis (Romansa), Rokris (Persik), Katolik (Perkasa), Musik (Sakla Music), Paduan Suara (Sakla Voice), Jurnalistik (Juju), Karya Ilmiah Remaja (KIR), Futsal, Basket (Eagles), Voli (Recsa), English Club (EC), Tari Tradisional (Sparkle), Teater (TSL), Bela Diri (Secure), Komputer & Robotik (DACO), Sinematografi (Icomsa), Fotografi (Snapshot), Seni Rebana/Hadroh.
- **Verifikasi:**
  Periksa keberadaan dan kelengkapan dokumen dengan `head -n 40 docs/SUMBER_DATA_SMAN1_KLATEN.md`.

---

### Task 2: Audit & Sinkronisasi Direktori Guru (77 Personil Riil)
Mengintegrasikan seluruh data riil staf dan dewan guru dari API resmi sekolah ke dalam koleksi konten direktori.

- **File target:**
  - `src/content/direktori/staff.json`
  - `scripts/fetch-official-staff.mjs` (skrip audit & download metadata)
- **Langkah Kerja:**
  1. Buat skrip `scripts/fetch-official-staff.mjs` yang mengambil payload lengkap dari `https://www.sma1klaten.sch.id/api/staff?limit=100`, lalu menata pengelompokan secara hierarkis:
     - Kelompok 1: Pimpinan Sekolah & Komite (Kepala Sekolah, Komite, 4 Wakasek).
     - Kelompok 2: Dewan Guru Bidang MIPA (Matematika, Fisika, Kimia, Biologi).
     - Kelompok 3: Dewan Guru Bidang Sosial & Humaniora (Sejarah, Geografi, Ekonomi, Sosiologi, PPKn).
     - Kelompok 4: Dewan Guru Bidang Bahasa, Seni & Olahraga (Bahasa Indonesia, Bahasa Inggris, Bahasa Jawa, Seni Budaya, PJOK).
     - Kelompok 5: Bimbingan Konseling & Tenaga Kependidikan / Tata Usaha.
  2. Masukkan data riil nama lengkap beserta gelar, pangkat/golongan, dan tautan potret resmi ke `src/content/direktori/staff.json`.
  3. Pastikan `DirectoryLiveFilter.tsx` dan `src/pages/direktori.astro` mampu menampilkan filter 77 staf secara instan dengan pencarian fuzzy yang mulus.
- **Verifikasi:**
  Jalankan `pnpm run build` dan pastikan file `dist/api/direktori.json` memuat data lengkap seluruh 77 staf dengan total staf terverifikasi.

---

### Task 3: Audit & Sinkronisasi Berita Kegiatan Faktual & Prestasi Nyata
Menghubungkan portal dengan peristiwa-peristiwa riil yang terjadi di kampus SMAN 1 Klaten.

- **File target:**
  - `src/content/berita/*.json`
  - `src/pages/prestasi.astro`
- **Langkah Kerja:**
  1. Tambahkan berita faktual terverifikasi dari website resmi:
     - `kunjungan-fh-undip-2026.json`: "Edukasi Hak Asasi Manusia: 11 Dosen FH Undip Gelar Pengabdian Masyarakat di SMAN 1 Klaten tentang Pencegahan Kekerasan di Sekolah" (22-23 September 2026).
     - `beasiswa-alumni-1976.json`: "Wujud Kepedulian Lintas Generasi, Alumni SMAN 1 Klaten Angkatan 1976 Salurkan Dana Pendidikan Rp18 Juta untuk 18 Siswa Membutuhkan" (18 September 2026).
  2. Perbarui arsip prestasi di `src/pages/prestasi.astro` dengan data legendaris Wikipedia dan website:
     - Medali Emas Olimpiade Astronomi Internasional (IOA) 2004 di Simeiz, Crimea.
     - Medali Emas & Perunggu Olimpiade Sains Nasional (OSN) Matematika dan Biologi.
     - Penghargaan Sekolah Adiwiyata Nasional 2016 dari Kementerian LHK dan Kemendikbud.
     - Juara 1 LKTI Kedokteran Nasional Universitas Udayana Bali.
- **Verifikasi:**
  Jalankan `pnpm run build` dan periksa bahwa berita dan prestasi baru tampil di `/berita` dan `/prestasi`.

---

### Task 4: Audit & Pembaruan Tokoh Alumni KAPASSKA
Menampilkan profil 6 alumni terkemuka resmi dari sistem alumni sekolah.

- **File target:**
  - `src/content/alumni/tokoh.json`
  - `src/components/AlumniSection.astro`
- **Daftar Tokoh Resmi:**
  1. **Prof. DR. Widodo Muktiyo** — Mantan Dirjen IKP Kementerian Kominfo RI & Guru Besar Universitas Sebelas Maret (UNS).
  2. **Prof. DR. Joko Triyono, S.T., M.T.** — Guru Besar Teknik Mesin UNS & Direktur AKN Pacitan (2021–2025).
  3. **Ir. Paulus Insap Santosa, M.Sc., Ph.D.** — Dosen Departemen Teknik Elektro dan Teknologi Informasi (DTETI) FT UGM.
  4. **Drs. Eko Hartono, MPP.** — Diplomat Senior, Konsul Jenderal Republik Indonesia di Jeddah, Arab Saudi (Purna 2023).
  5. **Winarno, S.Si., M.Eng.** — Dosen dan Kepala Program Studi S-1 Informatika Universitas Sebelas Maret (UNS).
  6. **Agus Mulia, S.Pt.** — Pengusaha Agribisnis Nasional dan Tokoh Kewirausahaan Alumni.
- **Catatan Historis Alumni:**
  Sertakan narasi kontribusi alumni SMAN 1 Klaten: pendirian SMA Padmawijaya tahun 1981, deklarasi resmi ikatan alumni KAPASSKA pada 26 Desember 2009, dan penyaluran beasiswa tahunan alumni angkatan 1976.
- **Verifikasi:**
  Periksa render kartu alumni di beranda atau halaman `/prestasi` berjalan sempurna dengan foto resmi di `public/images/alumni/`.

---

### Task 5: Redesain Total Komponen Hero & Tipografi Editorial (`src/components/Hero.astro`)
Mengganti tampilan Hero yang "basic" dengan rancangan editorial berkelas dunia (*Academic Broadside Edition*).

- **File target:**
  - `src/components/Hero.astro`
  - `src/styles/tokens.css`
  - `src/styles/global.css`
- **Konsep Detail Tipografi & Tata Letak Hero Baru:**
  1. **Kicker Eyebrow Koordinat Astronomis:**
     ```html
     <div class="hero-eyebrow">
       <span class="eyebrow-item">EST. 1957</span>
       <span class="eyebrow-sep">/</span>
       <span class="eyebrow-item">PADMAWIJAYA</span>
       <span class="eyebrow-sep">/</span>
       <span class="eyebrow-item">KAMPUS 13</span>
       <span class="eyebrow-sep">/</span>
       <span class="eyebrow-geo">7°42'06.5"S 110°36'09.0"E</span>
     </div>
     ```
  2. **Display Typography Fraunces Optical Size:**
     - Menggunakan judul megah dengan kontras serif dan italic prestisius:
       *"Tradisi Keunggulan Akademik dan Budi Pekerti Luhur di Bumi Padmawijaya."*
     - Kata *"Padmawijaya"* dan *"Keunggulan"* diberi sentuhan font-style italic serif yang anggun, memberikan rasa tradisi dan wibawa intelektual.
  3. **Micro-Credential Strip (3-Col Hairline Grid):**
     - Sel 1: **98 / Unggul** (Akreditasi A BAN-SM No. 1347/2021).
     - Sel 2: **20309676** (NPSN Resmi & NSS 301046002001).
     - Sel 3: **33 Rombel** (1.190 Siswa dalam 15.619 m² Kampus).
  4. **Showcase Arsitektur Kampus Berbingkai Ganda (*Double-Hairline Framing*):**
     - Foto gedung utama Kampus 13 dibingkai garis hairline presisi dengan inset padding 6px.
     - Menyematkan badge legalitas digital di pojok kanan bawah foto: *"KAMPUS RUJUKAN JAWA TENGAH · BAN-SM NILAI 98"*.
     - Menambahkan baris takarir foto teknis: koordinat GPS, alamat Jalan Merbabu No. 13, dan waktu operasional.
- **Copy-Pasteable Implementation Template (`Hero.astro`):**
  ```astro
  ---
  import { Image } from 'astro:assets';
  import Smansa1 from '../assets/school/Smansa1.jpg';
  ---

  <section class="hero-broadside" id="beranda-hero">
    <div class="container hero-inner">
      <!-- Eyebrow Meta Bar -->
      <div class="hero-meta-bar" data-reveal>
        <span class="meta-tag">EST. 1957</span>
        <span class="meta-dot">&middot;</span>
        <span class="meta-tag">SMA NEGERI 1 KLATEN</span>
        <span class="meta-dot">&middot;</span>
        <span class="meta-tag">KAMPUS 13 PADMAWIJAYA</span>
        <span class="meta-dot">&middot;</span>
        <span class="meta-coords">7&deg;42'06.5"S 110&deg;36'09.0"E</span>
      </div>

      <!-- Main Headline with Elegant Italic Accent -->
      <h1 class="hero-title" data-reveal>
        Tradisi Keunggulan Akademik dan Budi Luhur di Bumi <em>Padmawijaya</em>.
      </h1>

      <!-- Lead Description -->
      <p class="hero-lead" data-reveal>
        Sekolah menengah atas tertua di Klaten yang mendidik 1.190 siswa dalam 33 rombongan
        belajar Kurikulum Merdeka, memadukan riset sains, 23 ekstrakurikuler, dan sarana kampus
        seluas 15.619 m&sup2; berakreditasi A dengan Nilai 98 BAN-SM.
      </p>

      <!-- Action Row -->
      <div class="hero-cta-group" data-reveal>
        <a href="/ppdb" class="btn btn-primary">Informasi PPDB 2026</a>
        <a href="/direktori" class="btn btn-secondary">Direktori 77 Pengajar</a>
        <a href="/profil" class="btn-text">Sejarah 1957 &rarr;</a>
      </div>

      <!-- Credential Micro-Grid -->
      <div class="hero-cred-grid" data-reveal>
        <div class="cred-cell">
          <span class="cred-num num">98</span>
          <div class="cred-info">
            <strong class="cred-title">Akreditasi A Unggul</strong>
            <span class="cred-sub">SK No. 1347/BAN-SM/2021</span>
          </div>
        </div>
        <div class="cred-cell">
          <span class="cred-num num">20309676</span>
          <div class="cred-info">
            <strong class="cred-title">NPSN Resmi</strong>
            <span class="cred-sub">NSS: 301046002001</span>
          </div>
        </div>
        <div class="cred-cell">
          <span class="cred-num num">33 Rombel</span>
          <div class="cred-info">
            <strong class="cred-title">1.190 Siswa</strong>
            <span class="cred-sub">Kampus 15.619 m&sup2;</span>
          </div>
        </div>
      </div>

      <!-- Architectural Showcase Frame -->
      <figure class="hero-showcase" data-reveal>
        <div class="frame-border">
          <Image
            src={Smansa1}
            alt="Gedung utama Kampus 13 SMA Negeri 1 Klaten di Jalan Merbabu No. 13 Klaten"
            widths={[640, 1024, 1400]}
            sizes="(max-width: 900px) 100vw, 1120px"
            width={1400}
            height={740}
            loading="eager"
            class="hero-img"
          />
          <div class="frame-badge">
            <span class="badge-dot"></span>
            <span>Kampus Rujukan Klaten &middot; Akreditasi 98</span>
          </div>
        </div>
        <figcaption class="hero-caption">
          <span>Gedung Utama Kampus 13</span>
          <span class="sep">&middot;</span>
          <span>Jl. Merbabu No. 13, Klaten Selatan 57423</span>
          <span class="sep">&middot;</span>
          <span>Foto Dok. Humas SMAN 1 Klaten</span>
        </figcaption>
      </figure>
    </div>
  </section>
  ```
- **Styling Tokens & Aturan Visual:**
  - Menggunakan font `Fraunces` dengan bobot medium (500) dan variasi italic alami.
  - Memanfaatkan hairline 1px `border: 1px solid var(--hairline)` untuk pembatas sel kredensial, menjaga tampilan tetap datar, teratur, dan bernafas.
  - Mengeliminasi shadow mengambang; menggunakan kontras latar belakang `var(--paper)` dan `var(--surface)`.

---

### Task 6: Peningkatan Tipografi Global & Micro-Detailing Portal
- **File target:**
  - `src/styles/tokens.css`
  - `src/styles/global.css`
  - `src/layouts/BaseLayout.astro`
- **Langkah Kerja:**
  1. Perbarui link font Google di `src/layouts/BaseLayout.astro` untuk memuat full optical size range font Fraunces:
     `family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600`
  2. Tambahkan CSS custom properties untuk display font:
     `--font-serif-display: 'Fraunces', Georgia, serif;`
     `--letter-spacing-tight: -0.025em;`
     `--letter-spacing-wide: 0.08em;`
  3. Konfigurasikan tipografi display: teks headline mendapatkan `font-optical-sizing: auto; font-feature-settings: "cv02", "cv03", "calt";`.
  4. Standarkan rendering angka: semua elemen bertanda numerik (tahun, skor akreditasi, NPSN, nomor telepon) menggunakan `font-variant-numeric: tabular-nums;`.

---

### Task 7: Pengujian, Linter Anti-Slop, dan Verifikasi Build Menyeluruh
- **Langkah Kerja:**
  1. Buat skrip pengujian `scripts/test-audit-data-hero.mjs` untuk memvalidasi:
     - Keberadaan file `docs/SUMBER_DATA_SMAN1_KLATEN.md`.
     - Validasi jumlah data direktori guru di `staff.json` (memastikan memuat 77 entitas).
     - Validasi keberadaan 6 profil tokoh alumni KAPASSKA di `tokoh.json`.
     - Validasi elemen micro-typography pada Hero (kredensial NPSN, Nilai 98, koordinat).
  2. Jalankan linter anti-slop:
     ```bash
     python3 scripts/anti-slop-linter.py
     ```
     *Harus 100% lolos tanpa kesalahan.*
  3. Jalankan kompilasi Astro 7:
     ```bash
     pnpm run build
     node scripts/test-modern-astro7.mjs
     node scripts/test-audit-data-hero.mjs
     ```
  4. Lakukan git commit bertahap dengan deskripsi jelas.

---

## Tests & Validation Strategy (TDD)

```javascript
// scripts/test-audit-data-hero.mjs
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const distDir = path.resolve('dist');

// 1. Verifikasi File Dokumen Sumber Data untuk Agent
const docPath = path.resolve('docs/SUMBER_DATA_SMAN1_KLATEN.md');
assert(fs.existsSync(docPath), 'Dokumen docs/SUMBER_DATA_SMAN1_KLATEN.md wajib dibuat');
const docContent = fs.readFileSync(docPath, 'utf-8');
assert(docContent.includes('20309676'), 'Dokumen sumber harus memuat NPSN 20309676');
assert(docContent.includes('1347/BAN-SM/SK/2021'), 'Dokumen sumber harus memuat SK Akreditasi BAN-SM');
assert(docContent.includes('/api/staff'), 'Dokumen sumber harus memuat referensi API resmi /api/staff');
console.log('✓ 1. Dokumen sumber data SMAN 1 Klaten terverifikasi lengkap.');

// 2. Verifikasi Data Direktori Staf
const staffJsonPath = path.resolve('src/content/direktori/staff.json');
const staffData = JSON.parse(fs.readFileSync(staffJsonPath, 'utf-8'));
const totalPeople = staffData.reduce((acc, cat) => acc + (cat.people ? cat.people.length : 0), 0);
assert(totalPeople >= 70, `Direktori staff harus memuat data riil (ditemukan: ${totalPeople})`);
console.log(`✓ 2. Direktori guru memuat ${totalPeople} personil riil.`);

// 3. Verifikasi Hero Typography & Detail di Output HTML
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
assert(indexHtml.includes('hero-broadside') || indexHtml.includes('hero-meta-bar'), 'Hero harus menggunakan layout broadside baru');
assert(indexHtml.includes('7°42\'06.5"S') || indexHtml.includes('110°36\'09.0"E'), 'Hero harus memuat koordinat GPS Kampus 13');
assert(indexHtml.includes('Akreditasi A Unggul') || indexHtml.includes('Nilai 98'), 'Hero harus memuat badge akreditasi 98');
console.log('✓ 3. Detail tipografi berkarakter dan kredensial mikro Hero terverifikasi.');

console.log('Semua pengujian audit data dan redesain Hero LOLOS 100%!');
```

---

## Risks, Tradeoffs, and Mitigations

| Risiko / Tantangan | Mitigasi Konkret |
| :--- | :--- |
| **Ukuran file `staff.json` membesar (77 personil)** | Data JSON dipecah ke dalam kategori terstruktur. Komponen React Island `DirectoryLiveFilter` menggunakan memoized fuzzy filtering tanpa re-render berat. |
| **Resolusi foto eksternal dari domain `sma1klaten.sch.id`** | Foto utama di-download ke `public/images/staff/` atau di-proxy dengan fallback SVG avatar inisial bergaris hairline yang bersih jika terjadi kendala jaringan saat load. |
| **Hero terasa ramai jika terlalu banyak elemen** | Terapkan grid bergaris hairline presisi 1px (`background: var(--hairline); gap: 1px`) dan ruang bernafas yang luas (*generous padding*), serta eliminasi semua ornamen grafis non-fungsional agar tetap patuh aturan *tasteskill.dev*. |

---

## Checklist Eksekusi Mandiri
- [ ] Task 1: Tulis dokumen `docs/SUMBER_DATA_SMAN1_KLATEN.md` secara komprehensif.
- [ ] Task 2: Ekstrak dan sinkronkan 77 data guru/staf riil ke `src/content/direktori/staff.json` dan perbarui endpoint `/api/direktori.json.ts`.
- [ ] Task 3: Tambahkan berita faktual (kunjungan FH Undip, beasiswa alumni 1976) dan lengkapi data prestasi di `src/pages/prestasi.astro`.
- [ ] Task 4: Sinkronkan 6 tokoh alumni KAPASSKA di `src/content/alumni/tokoh.json`.
- [ ] Task 5: Rombak `src/components/Hero.astro` dengan desain *Broadside Academic Editorial* (koordinat, kredensial mikro, typography optical size, double frame).
- [ ] Task 6: Perbarui Google Fonts & token tipografi di `BaseLayout.astro` dan `tokens.css`.
- [ ] Task 7: Uji dengan `scripts/anti-slop-linter.py`, `pnpm run build`, jalankan `scripts/test-audit-data-hero.mjs`, dan buat git commit bersih.
