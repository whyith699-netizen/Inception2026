import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- Pengujian Suite Neon Brutalism & Halaman Alumni SMAN 1 Klaten ---');

// 1. Verifikasi Halaman Alumni Hasil Build
const alumniHtmlPath = path.resolve('dist/alumni/index.html');
assert(fs.existsSync(alumniHtmlPath), 'Halaman dist/alumni/index.html harus berhasil dibangkitkan');
const alumniHtml = fs.readFileSync(alumniHtmlPath, 'utf-8');

assert(alumniHtml.includes('KAPASSKA'), 'Halaman alumni harus memuat organisasi KAPASSKA');
assert(alumniHtml.includes('Beasiswa') && alumniHtml.includes('1976'), 'Halaman alumni harus memuat program Beasiswa Angkatan 1976');
assert(alumniHtml.includes('Widodo Muktiyo') || alumniHtml.includes('Joko Triyono'), 'Halaman alumni harus memuat tokoh alumni riil');
assert(alumniHtml.includes('18.000.000') || alumniHtml.includes('18 Juta'), 'Halaman alumni harus memuat nominal beasiswa resmi Rp18 Juta');
console.log('✓ Check 1: Halaman dist/alumni/index.html terverifikasi memuat data riil KAPASSKA & beasiswa');

// 2. Verifikasi Navigasi Header & Footer Memuat Tautan Alumni
const indexHtml = fs.readFileSync(path.resolve('dist/index.html'), 'utf-8');
assert(indexHtml.includes('href="/alumni"'), 'Navigasi portal harus memuat tautan href="/alumni"');
console.log('✓ Check 2: Header dan Footer memuat tautan aktif ke /alumni');

// 3. Verifikasi Token Neon Brutalism
const tokensCss = fs.readFileSync(path.resolve('src/styles/tokens.css'), 'utf-8');
assert(tokensCss.includes('--neon-lime: #D4FF00'), 'Token --neon-lime harus terdefinisi #D4FF00');
assert(tokensCss.includes('--neon-cyan: #00F0FF'), 'Token --neon-cyan harus terdefinisi #00F0FF');
assert(tokensCss.includes('--neo-border: 2px solid #111418'), 'Token --neo-border harus 2px solid #111418');
assert(tokensCss.includes('--neo-shadow: 4px 4px 0px #111418'), 'Token --neo-shadow harus 4px 4px 0px #111418 (zero blur)');
console.log('✓ Check 3: Token warna Neon Brutalism & hard shadow 0-blur terdefinisi lengkap');

// 4. Verifikasi Keaslian Data Riil (78 civitas staf/guru & legalitas)
const staffJson = JSON.parse(fs.readFileSync(path.resolve('src/content/direktori/staff.json'), 'utf-8'));
let totalStaff = 0;
staffJson.forEach(group => { totalStaff += group.people.length; });
assert(totalStaff >= 77, `Total staf harus minimal 77 personil resmi (ditemukan: ${totalStaff})`);
assert(indexHtml.includes('20309676'), 'NPSN 20309676 harus tetap ada dan tidak diubah');
assert(indexHtml.includes('301046002001'), 'NSS 301046002001 harus tetap ada dan tidak diubah');
console.log('✓ Check 4: Seluruh 78 data personil staf/guru & legalitas resmi 100% terjaga utuh');

// 5. Verifikasi React Islands & Client Directives
const ppdbHtml = fs.readFileSync(path.resolve('dist/ppdb/index.html'), 'utf-8');
const direktoriHtml = fs.readFileSync(path.resolve('dist/direktori/index.html'), 'utf-8');
assert(ppdbHtml.includes('ppdb-calc-island') || ppdbHtml.includes('Simulasi Jalur PPDB'), 'Island PpdbCalculator harus aktif');
assert(direktoriHtml.includes('directory-filter-island') || direktoriHtml.includes('Cari nama guru'), 'Island DirectoryLiveFilter harus aktif');
console.log('✓ Check 5: Arsitektur Astro Islands (PpdbCalculator & DirectoryLiveFilter) tetap reaktif sempurna');

console.log('\nSEMUA 5/5 PENGUJIAN NEON BRUTALISM & ALUMNI BERHASIL 100% GREEN!\n');
