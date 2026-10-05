import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('=== Pengujian Komprehensif: Full React JS & Tailwind CSS Seluruh Halaman ===\n');

const pagesDir = path.resolve('src/pages');
const reactPagesDir = path.resolve('src/components/react/pages');
const distDir = path.resolve('dist');

// 1. Verifikasi Seluruh Page Component React (.tsx) Ada
const expectedReactPages = [
  'AlumniPage.tsx',
  'BeritaDetailPage.tsx',
  'BeritaPage.tsx',
  'DirektoriPage.tsx',
  'FasilitasPage.tsx',
  'KontakPage.tsx',
  'PpdbPage.tsx',
  'PrestasiPage.tsx',
  'ProgramPage.tsx',
];

for (const f of expectedReactPages) {
  const p = path.join(reactPagesDir, f);
  assert(fs.existsSync(p), `Komponen React page ${f} harus ada di ${reactPagesDir}`);
  const content = fs.readFileSync(p, 'utf-8');
  assert(
    content.includes('border-neo-ink') || content.includes('shadow-neo') || content.includes('bg-neo-'),
    `${f} harus menggunakan utility class Tailwind CSS Neon Brutalism`
  );
}
console.log(`✓ 1. Seluruh 9 Page Component React (.tsx) terverifikasi ada dan menggunakan Tailwind CSS.`);

// 2. Verifikasi Seluruh File .astro Mengimpor Komponen React
const astroPages = [
  'index.astro',
  'alumni.astro',
  'direktori.astro',
  'berita.astro',
  'berita/[slug].astro',
  'fasilitas.astro',
  'kontak.astro',
  'ppdb.astro',
  'prestasi.astro',
  'program.astro',
];

for (const ap of astroPages) {
  const apPath = path.join(pagesDir, ap);
  assert(fs.existsSync(apPath), `File halaman ${ap} harus ada`);
  const content = fs.readFileSync(apPath, 'utf-8');
  assert(
    content.includes("from '../components/react/") || content.includes("from '../../components/react/"),
    `Halaman ${ap} harus mengimpor komponen dari src/components/react/`
  );
  assert(
    !content.includes('<style>'),
    `Halaman ${ap} tidak boleh lagi memuat blok <style> inline statis besar`
  );
}
console.log(`✓ 2. Seluruh 10 rute halaman Astro (.astro) murni berperan sebagai host container komponen React.`);

// 3. Verifikasi Keberadaan & Keabsahan Build Output HTML
const expectedDistRoutes = [
  'index.html',
  'alumni/index.html',
  'direktori/index.html',
  'berita/index.html',
  'fasilitas/index.html',
  'kontak/index.html',
  'ppdb/index.html',
  'prestasi/index.html',
  'program/index.html',
  'profil/index.html',
];

for (const route of expectedDistRoutes) {
  const p = path.join(distDir, route);
  assert(fs.existsSync(p), `Output build dist/${route} harus berhasil dibangkitkan`);
}
console.log(`✓ 3. Seluruh 10 rute halaman utama berhasil dibangkitkan di dist/.`);

// 4. Verifikasi Integritas Data Riil Sekolah
const distIndex = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const distAlumni = fs.readFileSync(path.join(distDir, 'alumni/index.html'), 'utf-8');
const distDirektori = fs.readFileSync(path.join(distDir, 'direktori/index.html'), 'utf-8');
const distPpdb = fs.readFileSync(path.join(distDir, 'ppdb/index.html'), 'utf-8');

assert(distIndex.includes('20309676'), 'NPSN 20309676 harus tampil');
assert(distIndex.includes('301046002001'), 'NSS 301046002001 harus tampil');
assert(distIndex.includes('1957'), 'Tahun berdiri 1957 harus tampil');
assert(distIndex.includes('98'), 'Nilai akreditasi 98 harus tampil');

// Cek 7 Tokoh Alumni
const alumniNames = ['Sudjarwadi', 'Sudharto', 'Syamsul Hadi', 'Rudjito', 'Hardyanto', 'Eka Julianta', 'Hari Muhammad'];
for (const name of alumniNames) {
  assert(distAlumni.includes(name), `Halaman alumni harus memuat tokoh "${name}"`);
}
assert(distAlumni.includes('18.000.000') || distAlumni.includes('18 Juta'), 'Beasiswa 1976 harus ada di alumni');
console.log(`✓ 4. Integritas data riil (NPSN, NSS, 1957, nilai 98, beasiswa, dan 7 tokoh alumni) 100% terjaga.`);

// 5. Verifikasi Ketiadaan Sebutan "Kampus 13"
const allReactPageFiles = fs.readdirSync(reactPagesDir);
for (const rf of allReactPageFiles) {
  const c = fs.readFileSync(path.join(reactPagesDir, rf), 'utf-8');
  assert(!c.toLowerCase().includes('kampus 13'), `File ${rf} tidak boleh memuat sebutan "Kampus 13"`);
}
console.log(`✓ 5. Ketiadaan frasa "Kampus 13" pada seluruh Page Component React terverifikasi.`);

console.log('\n=== SEMUA 5/5 PENGUJIAN FULL REACT & TAILWIND CSS LOLOS 100% GREEN! ===\n');
