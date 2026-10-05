import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

console.log('--- Pengujian Unifikasi Beranda & Profil, Full React Components, dan Kontras Hijau ---');

// 1. Cek file komponen React
const reactDir = path.resolve('src/components/react');
const expectedComponents = [
  'Header.tsx',
  'Hero.tsx',
  'Metrics.tsx',
  'ProfileSections.tsx',
  'Programs.tsx',
  'Curriculum.tsx',
  'ValueProp.tsx',
  'AlumniSection.tsx',
  'EventBanner.tsx',
  'Footer.tsx',
];

for (const comp of expectedComponents) {
  const filePath = path.join(reactDir, comp);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Komponen React tidak ditemukan: ${comp}`);
    process.exit(1);
  }
}
console.log(`✓ 1. Seluruh 10 komponen UI React (.tsx) terverifikasi ada.`);

// 2. Cek dist/index.html memuat konten profil utuh
const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const requiredProfileSnippets = [
  'id="profil"',
  'Padmawijaya',
  'Chiku',
  'Tantri Ambarsari',
  '1957',
  '20309676', // NPSN
  '301046002001', // NSS
  'salamkepsek.jpg',
  'history-foto1.jpg',
  'history-foto2a.jpg',
  'smansafullteam.jpeg',
];

for (const snippet of requiredProfileSnippets) {
  if (!homeHtml.includes(snippet)) {
    console.error(`❌ Konten profil hilang di beranda (dist/index.html): "${snippet}"`);
    process.exit(1);
  }
}
console.log('✓ 2. Konten profil (sejarah 1957, filosofi, Chiku, sambutan kepsek, arsip foto, legalitas) utuh di Beranda.');

// 3. Cek dist/profil/index.html mengalihkan ke /#profil
const profilHtml = fs.readFileSync(path.join(distDir, 'profil/index.html'), 'utf-8');
if (!profilHtml.includes('/#profil')) {
  console.error('❌ Halaman /profil tidak memuat redirect/link ke /#profil');
  process.exit(1);
}
console.log('✓ 3. Halaman rute /profil memiliki pengalihan otomatis ke /#profil.');

// 4. Cek kontras token CSS
const tokensCss = fs.readFileSync(path.resolve('src/styles/tokens.css'), 'utf-8');
if (tokensCss.includes('--accent: var(--neon-lime);')) {
  console.error('❌ Token --accent masih memetakan ke --neon-lime (potensi teks tak terbaca)');
  process.exit(1);
}
console.log('✓ 4. Token --accent telah dimitigasi untuk mencegah teks neon hijau tak terbaca.');

// 5. Cek rute penting lainnya
const otherRoutes = ['alumni/index.html', 'direktori/index.html', 'berita/index.html', 'ppdb/index.html'];
for (const r of otherRoutes) {
  if (!fs.existsSync(path.join(distDir, r))) {
    console.error(`❌ Halaman rute penting tidak ditemukan: ${r}`);
    process.exit(1);
  }
}
console.log('✓ 5. Seluruh rute ekosistem sekolah (/alumni, /direktori, /berita, /ppdb) 100% aktif.');

console.log('\nSEMUA 5/5 PENGUJIAN UNIFIKASI & FULL REACT BERHASIL 100% GREEN!\n');
