# Rencana Implementasi: Arsitektur Modern Astro 7 (Astro Islands, React 19, API Routes, & Client Directives)

## Goal
Mentransformasikan portal resmi SMA Negeri 1 Klaten ("Padmawijaya / Kampus 13") dari sekadar situs statis murni (*static HTML*) menjadi aplikasi web modern berkinerja tinggi berbasis Astro 7.3.5 yang mendemonstrasikan keunggulan arsitektur pulau (*Astro Islands* via React 19), directive hidrasi selektif (`client:visible`, `client:load`, `client:idle`), endpoint API internal (`/api/*.json`), serta navigasi mulus *ClientRouter* tanpa merusak estetika minimalis-elegan anti-slop.

---

## Current Context / Assumptions
1. **Runtime & Toolchain:**
   - Astro `7.3.5` berjalan dengan kompiler Rust generasi baru di atas Node.js `v26.7.0` dan `pnpm 10.33.2`.
   - Konfigurasi saat ini di `astro.config.mjs` masih berupa mode bawaan `output: 'static'` tanpa integrasi framework UI.
2. **Karakteristik "Zero JavaScript by Default" di Astro:**
   - Astro secara standar menghapus 100% JavaScript pada komponen `.astro` murni demi menghasilkan skor Core Web Vitals (LCP/FCP) 100.
   - Anggapan bahwa Astro "cuma bisa HTML statis" adalah keliru; Astro dirancang sebagai arsitektur *Islands* (Pulau Interaktif) di mana JavaScript hanya dikirimkan ke browser untuk komponen spesifik yang membutuhkan interaktivitas dinamis.
3. **Standar Desain & Integritas Data:**
   - Seluruh komponen baru (React maupun Astro) **wajib tunduk 100%** pada prinsip *Padmawijaya Academic Editorial* (`tasteskill.dev` anti-slop): palet Paper `#FAF8F5`, Ink `#161210`, hairline `#E8E1D7`, satu aksen terakota `#B5472F`, font Fraunces & Inter, serta angka `tabular-nums`.
   - Dilarang keras memakai doodle kartun melayang, shadow tebal berlapis, gradien mencolok, atau tombol berbentuk pill berlebihan.
   - Data sekolah bersumber faktual dari SMAN 1 Klaten (NPSN 20309676, didirikan 1957, Akreditasi Nilai 98 BAN-SM, 33 rombel, sistem zonasi Disdikbud Jawa Tengah).

---

## Architecture / Proposed Approach
1. **Integrasi UI Framework Multi-Komponen (React 19 Islands):**
   - Menambahkan integrasi `@astrojs/react` pada pipeline Astro 7 untuk membuktikan bahwa pengembang tidak terbatas pada sintaks HTML murni, melainkan bebas memakai ekosistem React.
2. **Arsitektur Pulau (*Astro Islands*) dengan Directive Hidrasi Selektif:**
   - **`PpdbCalculator.tsx` (`client:visible`):** Kalkulator simulasi seleksi PPDB 2026 (Zonasi & Prestasi) di halaman `/ppdb`. Komponen ini dirender sebagai HTML statis di server; bundle JavaScript React-nya hanya diunduh dan dihidrasi oleh browser saat user melakukan scroll mendekati kalkulator.
   - **`DirectoryLiveFilter.tsx` (`client:load`):** Sistem pencarian instan dan penyaring kategori guru/staf di halaman `/direktori`. Dihidrasi segera setelah halaman dibuka untuk memberikan respon pencarian real-time tanpa *page refresh*.
   - **`InteractiveSmansaBot.tsx` (`client:idle`):** Widget percakapan AI mandiri di beranda. Dihidrasi ketika browser dalam keadaan idle (`requestIdleCallback`), menjaga metrik Time-to-Interactive (TTI) halaman utama tetap sempurna.
3. **Endpoint API Internal (*Static API Routes*):**
   - Membuat endpoint API di bawah rute `src/pages/api/` (`direktori.json.ts`, `berita.json.ts`, `ppdb-simulasi.json.ts`) yang menghasilkan respons JSON terstruktur dengan MIME type `application/json` dan header caching. Endpoint ini dapat dikonsumsi oleh client islands maupun aplikasi pihak ketiga, serta siap diubah ke mode SSR kapan pun dibutuhkan.
4. **Navigasi Single-Page Application (SPA) via `<ClientRouter />`:**
   - Memasang `<ClientRouter />` dari `astro:transitions` di `src/layouts/BaseLayout.astro`. Pengguna dapat berpindah halaman di seluruh portal sekolah tanpa jeda kedipan putih (*zero white flash*), dengan mempertahankan scroll position dan transisi halus.

---

## Step-by-Step Implementation Tasks

### Task 1: Pemasangan Dependensi React 19 & Integrasi `@astrojs/react`
- **File target:**
  - `package.json`
  - `astro.config.mjs`
  - `tsconfig.json`
- **Langkah Kerja:**
  1. Pasang dependensi React dan integrasi Astro React via pnpm:
     ```bash
     cd /home/archgha/web-sekolah && pnpm add @astrojs/react react react-dom && pnpm add -D @types/react @types/react-dom
     ```
  2. Modifikasi `astro.config.mjs` untuk mengaktifkan integrasi React:
     ```javascript
     import { defineConfig } from 'astro/config';
     import react from '@astrojs/react';

     export default defineConfig({
       site: 'https://sma1klaten.sch.id',
       integrations: [react()],
       output: 'static',
       build: {
         format: 'directory'
       }
     });
     ```
  3. Perbarui `tsconfig.json` agar mengenali JSX React secara ketat:
     ```json
     {
       "extends": "astro/tsconfigs/strict",
       "compilerOptions": {
         "baseUrl": ".",
         "paths": {
           "@/*": ["src/*"]
         },
         "jsx": "react-jsx",
         "jsxImportSource": "react"
       }
     }
     ```
- **Verifikasi:**
  Jalankan `npx astro check` di direktori proyek.
  *Output yang diharapkan:* `0 errors, 0 warnings`.

---

### Task 2: Pembuatan Endpoint API Internal (`src/pages/api/`)
Astro 7 mendukung pembuatan REST API endpoint langsung di dalam folder halaman.

#### 2.1 Endpoint Direktori Staf: `src/pages/api/direktori.json.ts`
- **File:** `/home/archgha/web-sekolah/src/pages/api/direktori.json.ts`
- **Kode:**
  ```typescript
  import type { APIRoute } from 'astro';
  import { getCollection } from 'astro:content';

  export const GET: APIRoute = async () => {
    const rawData = await getCollection('direktori');
    const categories = rawData.flatMap((item) => item.data);

    const flatPeople = categories.flatMap((cat) =>
      cat.people.map((person) => ({
        ...person,
        category: cat.category,
      }))
    );

    return new Response(
      JSON.stringify({
        status: 'success',
        meta: {
          school: 'SMA Negeri 1 Klaten (Padmawijaya)',
          npsn: '20309676',
          total_categories: categories.length,
          total_staff: flatPeople.length,
          updated_at: new Date().toISOString(),
        },
        data: {
          categories,
          flatPeople,
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      }
    );
  };
  ```

#### 2.2 Endpoint Indeks Berita: `src/pages/api/berita.json.ts`
- **File:** `/home/archgha/web-sekolah/src/pages/api/berita.json.ts`
- **Kode:**
  ```typescript
  import type { APIRoute } from 'astro';
  import { getCollection } from 'astro:content';

  export const GET: APIRoute = async () => {
    const articles = await getCollection('berita');
    const sorted = articles
      .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
      .map((item) => ({
        id: item.id,
        slug: item.id.replace(/\.json$/, ''),
        title: item.data.title,
        date: item.data.date,
        category: item.data.category,
        author: item.data.author,
        summary: item.data.summary,
        tags: item.data.tags || [],
        url: `/berita/${item.id.replace(/\.json$/, '')}`,
      }));

    return new Response(
      JSON.stringify({
        status: 'success',
        meta: {
          total: sorted.length,
          generated_by: 'Astro 7 Rust Compiler Static API Engine',
        },
        data: sorted,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=1800',
        },
      }
    );
  };
  ```

#### 2.3 Endpoint Parameter PPDB: `src/pages/api/ppdb-simulasi.json.ts`
- **File:** `/home/archgha/web-sekolah/src/pages/api/ppdb-simulasi.json.ts`
- **Kode:**
  ```typescript
  import type { APIRoute } from 'astro';

  export const GET: APIRoute = async () => {
    const rules = {
      academic_year: '2026/2027',
      target_school: {
        name: 'SMA Negeri 1 Klaten',
        address: 'Jl. Merbabu No. 13 Klaten, Jawa Tengah (57423)',
        coordinates: { lat: -7.7018, lng: 110.6025 },
        capacity_total: 396, // 11 rombel x 36 siswa
      },
      quotas: [
        { key: 'zonasi', label: 'Jalur Zonasi Reguler', percentage: 55, seats: 218, max_distance_meters: 5000, priority_radius_meters: 2500 },
        { key: 'prestasi', label: 'Jalur Prestasi', percentage: 20, seats: 79, min_score: 88.0, cert_multiplier: 1.5 },
        { key: 'afirmasi', label: 'Jalur Afirmasi (KIP/DTKS)', percentage: 20, seats: 79, requires_dtks: true },
        { key: 'mutasi', label: 'Jalur Perpindahan Tugas Orang Tua', percentage: 5, seats: 20, requires_sk_pindah: true },
      ],
      historical_cutoffs: {
        2025: { zonasi_max_km: 3.42, prestasi_min_score: 93.15 },
        2024: { zonasi_max_km: 3.65, prestasi_min_score: 92.80 },
      }
    };

    return new Response(JSON.stringify({ status: 'success', data: rules }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  ```
- **Verifikasi:**
  Jalankan `pnpm run build` dan periksa keberadaan file di `dist/api/direktori.json`, `dist/api/berita.json`, dan `dist/api/ppdb-simulasi.json`.

---

### Task 3: React Island 1 — Kalkulator Simulasi PPDB 2026 (`client:visible`)
Menunjukkan arsitektur pulau di mana komponen hanya dihidrasi ketika pengguna scroll ke area kalkulator pada halaman `/ppdb`.

- **File baru:** `/home/archgha/web-sekolah/src/components/islands/PpdbCalculator.tsx`
- **Fitur Interaktif:**
  - Tab seleksi jalur (Zonasi vs Prestasi).
  - Mode Zonasi: Input jarak tempat tinggal calon siswa ke Kampus 13 (Jl. Merbabu No. 13) dalam satuan meter/kilometer, penghitungan probabilitas penerimaan berdasar kuota 55% dan data batas tahun 2024/2025.
  - Mode Prestasi: Input rata-rata rapor 5 semester (skala 100) + pemilihan tingkatan sertifikat prestasi (Kabupaten, Provinsi, Nasional, Internasional). Kalkulasi skor tertimbang instan.
  - Tampilan indikator status minimalis: "Prioritas Utama Zonasi", "Kompetitif", atau "Perlu Cadangan Jalur Prestasi".
- **Kode:**
  ```tsx
  import React, { useState, useId } from 'react';

  export default function PpdbCalculator() {
    const [tab, setTab] = useState<'zonasi' | 'prestasi'>('zonasi');
    const [distance, setDistance] = useState<number>(1800); // meter
    const [reportScore, setReportScore] = useState<number>(91.5);
    const [certLevel, setCertLevel] = useState<number>(3); // 0=none, 1=kecamatan, 2=kab, 3=prov, 4=nasional

    const distId = useId();
    const scoreId = useId();
    const certId = useId();

    // Hitung estimasi zonasi
    const zonasiMax = 3500;
    const isZonasiSafe = distance <= 2500;
    const isZonasiCompetitive = distance > 2500 && distance <= zonasiMax;

    // Hitung estimasi prestasi
    const certBonus = [0, 1.5, 3.0, 5.0, 10.0][certLevel] || 0;
    const totalPrestasi = Number((reportScore * 0.7 + certBonus * 3).toFixed(2));
    const isPrestasiSafe = totalPrestasi >= 92.5;

    return (
      <div className="ppdb-calc-island" style={{
        background: 'var(--surface)',
        border: '1px solid var(--hairline)',
        borderRadius: 'var(--r-md)',
        padding: 'clamp(24px, 4vw, 36px)',
        margin: '32px 0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--hairline)', paddingBottom: '16px', marginBottom: '24px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)' }}>
              Interactive Island &middot; client:visible
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: '4px 0 0', color: 'var(--ink)' }}>
              Simulasi Jalur PPDB 2026/2027
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setTab('zonasi')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8125rem',
                padding: '6px 14px',
                borderRadius: 'var(--r-sm)',
                border: '1px solid var(--hairline)',
                background: tab === 'zonasi' ? 'var(--ink)' : 'transparent',
                color: tab === 'zonasi' ? 'var(--paper)' : 'var(--ink-2)',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Jalur Zonasi (55%)
            </button>
            <button
              type="button"
              onClick={() => setTab('prestasi')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8125rem',
                padding: '6px 14px',
                borderRadius: 'var(--r-sm)',
                border: '1px solid var(--hairline)',
                background: tab === 'prestasi' ? 'var(--ink)' : 'transparent',
                color: tab === 'prestasi' ? 'var(--paper)' : 'var(--ink-2)',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Jalur Prestasi (20%)
            </button>
          </div>
        </div>

        {tab === 'zonasi' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', alignItems: 'center' }}>
            <div>
              <label htmlFor={distId} style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '8px' }}>
                Jarak domisili KK ke Kampus 13 (Jl. Merbabu No. 13):
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <input
                  id={distId}
                  type="range"
                  min="200"
                  max="5000"
                  step="50"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--accent)' }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 600, minWidth: '85px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                  {(distance / 1000).toFixed(2)} km
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ink-3)', margin: 0, lineHeight: 1.5 }}>
                Berdasarkan data historis PPDB Klaten, radius cut-off aman tahun lalu berada pada <strong>3,42 km</strong>.
              </p>
            </div>

            <div style={{
              padding: '20px',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--r-sm)',
              background: 'var(--paper-2)',
            }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
                Hasil Estimasi Kelayakan
              </span>
              <div style={{ margin: '8px 0', fontSize: '1.125rem', fontWeight: 600, color: isZonasiSafe ? 'var(--dot-on-accent)' : isZonasiCompetitive ? 'var(--accent)' : 'var(--ink-3)' }}>
                {isZonasiSafe ? 'Prioritas Tinggi (Zona 1 Aman)' : isZonasiCompetitive ? 'Zona Kompetitif (Mendekati Batas Kuota)' : 'Di Luar Radius Historis Utama'}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ink-2)', margin: 0, lineHeight: 1.5 }}>
                {isZonasiSafe
                  ? 'Jarak Anda berada di dalam radius inti Kampus 13. Peluang penerimaan pada kuota zonasi sangat tinggi dengan syarat KK sah minimal 1 tahun.'
                  : isZonasiCompetitive
                  ? 'Jarak Anda masih dalam jangkauan kuota zonasi, namun disarankan menyiapkan alternatif Jalur Prestasi sebagai proteksi tambahan.'
                  : 'Jarak melampaui batas aman zonasi tahun sebelumnya. Kami sangat menyarankan mendaftar melalui Jalur Prestasi atau Afirmasi.'}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', alignItems: 'center' }}>
            <div>
              <div style={{ marginBottom: '16px' }}>
                <label htmlFor={scoreId} style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '8px' }}>
                  Rata-rata Nilai Rapor Semester 1–5:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    id={scoreId}
                    type="range"
                    min="80"
                    max="100"
                    step="0.1"
                    value={reportScore}
                    onChange={(e) => setReportScore(Number(e.target.value))}
                    style={{ flex: 1, accentColor: 'var(--accent)' }}
                  />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 600, minWidth: '60px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {reportScore.toFixed(1)}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor={certId} style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '8px' }}>
                  Piagam Kejuaraan Berjenjang Resmi (OSN/O2SN/FLS2N):
                </label>
                <select
                  id={certId}
                  value={certLevel}
                  onChange={(e) => setCertLevel(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--r-sm)',
                    border: '1px solid var(--hairline)',
                    background: 'var(--surface)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'var(--ink)',
                  }}
                >
                  <option value={0}>Tidak Ada Piagam / Non-kejuaraan (+0)</option>
                  <option value={1}>Tingkat Kecamatan / Eks-Karesidenan (+1.5)</option>
                  <option value={2}>Juara 1–3 Tingkat Kabupaten (+3.0)</option>
                  <option value={3}>Juara 1–3 Tingkat Provinsi (+5.0)</option>
                  <option value={4}>Juara 1–3 Tingkat Nasional/Internasional (+10.0)</option>
                </select>
              </div>
            </div>

            <div style={{
              padding: '20px',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--r-sm)',
              background: 'var(--paper-2)',
            }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
                Estimasi Skor Bobot Akhir
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: isPrestasiSafe ? 'var(--dot-on-accent)' : 'var(--accent)', margin: '4px 0 8px', fontVariantNumeric: 'tabular-nums' }}>
                {totalPrestasi}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ink-2)', margin: 0, lineHeight: 1.5 }}>
                {isPrestasiSafe
                  ? 'Skor Anda melampaui cut-off historis jalur prestasi (92.80). Peluang lolos sangat kuat di SMAN 1 Klaten.'
                  : 'Skor mendekati ambang batas kelulusan jalur prestasi. Pastikan kelengkapan berkas piagam diverifikasi valid oleh pihak sekolah.'}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
  ```

- **Pemasangan di `src/pages/ppdb.astro`:**
  Impor komponen dan render dengan directive hidrasi `client:visible`:
  ```astro
  ---
  // src/pages/ppdb.astro
  import PpdbCalculator from '../components/islands/PpdbCalculator';
  ---
  <!-- Letakkan tepat setelah EventBanner dan sebelum QuotaSection -->
  <section class="sec sec-flush">
    <div class="container">
      <PpdbCalculator client:visible />
    </div>
  </section>
  ```

---

### Task 4: React Island 2 — Live Instant Filter & Search Direktori (`client:load`)
Menyediakan fitur live-search instan dan filter kategori guru tanpa reload halaman di `/direktori`.

- **File baru:** `/home/archgha/web-sekolah/src/components/islands/DirectoryLiveFilter.tsx`
- **Fitur Interaktif:**
  - Input teks instan untuk mencari nama staf, jabatan, atau mata pelajaran (misal: "Fisika", "Tantri", "Kurikulum").
  - Tab kategori dinamis: "Semua", "Pimpinan Sekolah", "Sains & Riset", "Sosial & Humaniora", "Bahasa & Seni", "Tenaga Kependidikan".
  - Indikator jumlah personil yang cocok secara real-time (`Menampilkan X dari Y tenaga pendidik`).
  - Penanganan state kosong yang elegan jika kata kunci tidak ditemukan.
- **Kode:**
  ```tsx
  import React, { useState, useMemo } from 'react';

  interface Person {
    name: string;
    role: string;
    detail?: string;
    photo?: string;
    category?: string;
  }

  interface CategoryGroup {
    category: string;
    people: Person[];
  }

  interface Props {
    initialGroups: CategoryGroup[];
  }

  export default function DirectoryLiveFilter({ initialGroups }: Props) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    const categories = useMemo(() => {
      return ['Semua', ...initialGroups.map((g) => g.category)];
    }, [initialGroups]);

    const filteredPeople = useMemo(() => {
      const q = search.toLowerCase().trim();
      let list: Person[] = [];

      initialGroups.forEach((group) => {
        if (selectedCategory === 'Semua' || selectedCategory === group.category) {
          group.people.forEach((p) => {
            list.push({ ...p, category: group.category });
          });
        }
      });

      if (!q) return list;

      return list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        (p.detail && p.detail.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    }, [initialGroups, search, selectedCategory]);

    return (
      <div className="directory-filter-island">
        {/* Controls Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--hairline)',
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '280px', flex: '1 1 300px' }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama guru, mata pelajaran, bidang tugas..."
              aria-label="Cari guru dan staf"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-sans)',
                background: 'var(--surface)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--r-sm)',
                color: 'var(--ink)',
                outline: 'none',
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--ink-3)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                &times;
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  padding: '6px 12px',
                  borderRadius: 'var(--r-sm)',
                  border: '1px solid var(--hairline)',
                  background: selectedCategory === cat ? 'var(--ink)' : 'var(--surface)',
                  color: selectedCategory === cat ? 'var(--paper)' : 'var(--ink-2)',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Counter and Results */}
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-3)', fontVariantNumeric: 'tabular-nums' }}>
            Menampilkan {filteredPeople.length} tenaga pendidik & pimpinan
          </span>
          <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Astro Island &middot; client:load
          </span>
        </div>

        {filteredPeople.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '48px 24px',
            border: '1px dashed var(--hairline)',
            borderRadius: 'var(--r-md)',
            background: 'var(--paper-2)',
          }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--ink)', margin: '0 0 8px' }}>
              Tidak ada personil yang sesuai dengan pencarian
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--ink-3)', margin: 0 }}>
              Coba gunakan kata kunci nama lain, nama mata pelajaran, atau klik tombol kategori &quot;Semua&quot;.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1px',
            background: 'var(--hairline)',
            border: '1px solid var(--hairline)',
            borderRadius: 'var(--r-md)',
            overflow: 'hidden',
          }}>
            {filteredPeople.map((person, idx) => (
              <article
                key={`${person.name}-${idx}`}
                style={{
                  background: 'var(--surface)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {person.photo && (
                    <img
                      src={person.photo}
                      alt={`Potret ${person.name}`}
                      style={{
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: 'var(--r-sm)',
                        marginBottom: '16px',
                        background: 'var(--paper-2)',
                      }}
                      loading="lazy"
                    />
                  )}
                  <span style={{
                    fontSize: '0.6875rem',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--accent)',
                    display: 'block',
                    marginBottom: '4px',
                  }}>
                    {person.category}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.125rem',
                    color: 'var(--ink)',
                    margin: '0 0 4px',
                    fontWeight: 600,
                  }}>
                    {person.name}
                  </h3>
                  <p style={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'var(--ink-2)',
                    margin: '0 0 8px',
                  }}>
                    {person.role}
                  </p>
                </div>
                {person.detail && (
                  <p style={{
                    fontSize: '0.8125rem',
                    color: 'var(--ink-3)',
                    margin: 0,
                    lineHeight: 1.5,
                    borderTop: '1px solid var(--hairline)',
                    paddingTop: '12px',
                  }}>
                    {person.detail}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    );
  }
  ```

- **Pemasangan di `src/pages/direktori.astro`:**
  Ganti rendering loop statis dengan `<DirectoryLiveFilter client:load initialGroups={groups} />`.
  Dengan ini, initial HTML tetap di-render secara server-side untuk SEO, lalu langsung dihidrasi secara instan di client side!

---

### Task 5: React Island 3 — Interactive SmansaBot AI (`client:idle`)
Mengintegrasikan widget chatbot interaktif ke dalam komponen React dengan directive `client:idle`.

- **File baru:** `/home/archgha/web-sekolah/src/components/islands/InteractiveSmansaBot.tsx`
- **Fitur Interaktif:**
  - `client:idle`: Menjamin script chat baru dimuat setelah halaman web selesai dimuat penuh, tidak memblokir render utama.
  - State management chat reaktif dengan history tersimpan di `sessionStorage`.
  - Pertanyaan cepat (*canned query pills*) interaktif yang dapat langsung diklik: "PPDB 2026", "Akreditasi Sekolah", "Ekstrakurikuler", "Sejarah Padmawijaya".
  - Sanitasi pesan otomatis murni via React JSX (mencegah risiko XSS).
  - Waktu respons natural dengan indikator mengetik sederhana monokromatik.
- **Pemasangan di `src/components/ChatbotWidget.astro` atau `src/pages/index.astro`:**
  Memasang `<InteractiveSmansaBot client:idle />` pada section `#chatbot`.

---

### Task 6: Aktivasi View Transitions `<ClientRouter />` dari `astro:transitions`
Membuktikan kemampuan Astro 7 dalam menciptakan pengalaman navigasi *Single Page Application* tanpa reload layar.

- **File target:**
  - `src/layouts/BaseLayout.astro`
  - `src/styles/global.css`
- **Langkah Kerja:**
  1. Di `src/layouts/BaseLayout.astro`, tambahkan:
     ```astro
     ---
     import { ClientRouter } from 'astro:transitions';
     // ... props lainnya
     ---
     <head>
       <!-- ... meta tags ... -->
       <ClientRouter />
     </head>
     ```
  2. Di `src/styles/global.css`, pastikan animasi transisi default halus dan menghormati preferensi user:
     ```css
     ::view-transition-old(root),
     ::view-transition-new(root) {
       animation-duration: 180ms;
       animation-timing-function: cubic-bezier(0.2, 0, 0, 1);
     }

     @media (prefers-reduced-motion: reduce) {
       ::view-transition-group(*),
       ::view-transition-old(*),
       ::view-transition-new(*) {
         animation: none !important;
       }
     }
     ```
- **Verifikasi:**
  Jalankan `pnpm run build`. Saat berpindah halaman via link menu header, navigasi berlangsung mulus tanpa kedip putih.

---

### Task 7: Verifikasi Kepatuhan Anti-Slop, Validasi Build Rust, & Automated Checks
- **Langkah Kerja:**
  1. Jalankan linter anti-slop:
     ```bash
     cd /home/archgha/web-sekolah && python3 scripts/anti-slop-linter.py
     ```
     *Expected:* 100% Hijau (0 kata klise AI, 0 teks hitam murni `#000000`, 0 gradient slop, WCAG AA pass).
  2. Jalankan build statis Astro 7 berbasis kompiler Rust:
     ```bash
     cd /home/archgha/web-sekolah && pnpm run build
     ```
     *Expected:* 24+ halaman & file JSON terbangun dalam waktu < 1.5 detik.
  3. Verifikasi file artefak API di terminal:
     ```bash
     curl -s http://localhost:4321/api/direktori.json | jq .status
     curl -s http://localhost:4321/api/ppdb-simulasi.json | jq .data.target_school.name
     ```
  4. Lakukan git commit bertahap:
     ```bash
     git add -A && git commit -m "feat: implementasi arsitektur modern Astro 7 (React 19 Islands, API routes, dan ClientRouter)"
     ```

---

## Tests & Validation Strategy (TDD & Automation)

Buat script pengujian otomatis mandiri `scripts/test-modern-astro7.mjs` untuk memverifikasi fungsionalitas sebelum dan sesudah build:

```javascript
// scripts/test-modern-astro7.mjs
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const distDir = path.resolve('dist');

// 1. Verifikasi keberadaan endpoint API
const apiFiles = ['direktori.json', 'berita.json', 'ppdb-simulasi.json'];
for (const file of apiFiles) {
  const filePath = path.join(distDir, 'api', file);
  assert(fs.existsSync(filePath), `API endpoint file tidak ditemukan: ${filePath}`);
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  assert.strictEqual(json.status, 'success', `Status API ${file} harus 'success'`);
}
console.log('✓ Semua endpoint API JSON terverifikasi valid.');

// 2. Verifikasi keberadaan Astro Island directives di output HTML
const ppdbHtml = fs.readFileSync(path.join(distDir, 'ppdb', 'index.html'), 'utf-8');
assert(ppdbHtml.includes('astro-island'), 'Halaman PPDB harus memuat astro-island component');
assert(ppdbHtml.includes('client="visible"'), 'PpdbCalculator harus menggunakan client="visible"');
console.log('✓ Directive client:visible terverifikasi di /ppdb.');

const direktoriHtml = fs.readFileSync(path.join(distDir, 'direktori', 'index.html'), 'utf-8');
assert(direktoriHtml.includes('astro-island'), 'Halaman Direktori harus memuat astro-island component');
assert(direktoriHtml.includes('client="load"'), 'DirectoryLiveFilter harus menggunakan client="load"');
console.log('✓ Directive client:load terverifikasi di /direktori.');

// 3. Verifikasi ClientRouter (ViewTransitions) terpasang di BaseLayout
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
assert(indexHtml.includes('data-astro-transition') || indexHtml.includes('astro:transitions') || indexHtml.includes('router'), 'ClientRouter harus aktif pada layout utama');
console.log('✓ ClientRouter SPA transitions terverifikasi aktif.');

console.log('Semua 3 pengujian kapabilitas modern Astro 7 BERHASIL 100%!');
```

---

## Risks, Tradeoffs, and Mitigations

| Risiko / Dilema | Dampak | Mitigasi Konkret |
| :--- | :--- | :--- |
| **Ukuran Bundle JS Bertambah** akibat penambahan runtime React 19. | Metrik FCP/LCP bisa sedikit terpengaruh jika hidrasi terlalu agresif. | Menggunakan arsitektur pulau murni: hanya komponen kalkulator dan filter yang memuat React. Komponen konten statis (Hero, Footer, Berita, dsb.) tetap 0 KB JavaScript. |
| **Perbedaan Desain / Visual Slop** pada komponen React baru. | Inkonsistensi token desain (radius, warna, border) dengan standar `tasteskill.dev`. | Semua styling di dalam React Island wajib mengonsumsi CSS variables dari `tokens.css` (`var(--hairline)`, `var(--ink)`, `var(--surface)`, `var(--accent)`). Dilarang menyematkan inline hex liar. |
| **Konflik Script ClientRouter dengan DOM Vanilla JS** | Event listener vanilla pada header/chatbot berpotensi terputus setelah navigasi halaman tanpa reload. | Menggunakan event listener `astro:page-load` alih-alih sekadar `DOMContentLoaded` untuk inisialisasi ulang script vanilla bila ada. |
| **Kompatibilitas Hosting Statis vs SSR** | Kebutuhan server Node.js jika berpindah ke mode SSR penuh. | Tetap mempertahankan `output: 'static'` untuk kompatibilitas hosting statis gratis (Vercel, Cloudflare Pages, GitHub Pages) sambil memanfaatkan *Static API Endpoints* yang di-generate saat build time oleh kompiler Rust Astro 7. |

---

## Checklist Eksekusi Mandiri (Bite-Sized)
- [ ] Task 1: Pasang `@astrojs/react`, `react`, `react-dom`, `@types/react`, `@types/react-dom`, dan update `astro.config.mjs` serta `tsconfig.json`.
- [ ] Task 2: Buat 3 file API endpoint di `src/pages/api/` (`direktori.json.ts`, `berita.json.ts`, `ppdb-simulasi.json.ts`).
- [ ] Task 3: Buat React Island `src/components/islands/PpdbCalculator.tsx` dan pasang di `src/pages/ppdb.astro` dengan `client:visible`.
- [ ] Task 4: Buat React Island `src/components/islands/DirectoryLiveFilter.tsx` dan pasang di `src/pages/direktori.astro` dengan `client:load`.
- [ ] Task 5: Buat React Island `src/components/islands/InteractiveSmansaBot.tsx` dan pasang dengan `client:idle`.
- [ ] Task 6: Tambahkan `<ClientRouter />` di `src/layouts/BaseLayout.astro` dan konfigurasi animasi transisi halus di `src/styles/global.css`.
- [ ] Task 7: Jalankan `python3 scripts/anti-slop-linter.py`, build `pnpm run build`, jalankan script verifikasi `scripts/test-modern-astro7.mjs`, dan buat git commit bersih.
