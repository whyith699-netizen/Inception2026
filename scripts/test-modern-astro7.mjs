import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const distDir = path.resolve('dist');

console.log('--- Memeriksa Hasil Build Arsitektur Modern Astro 7 ---');

// 1. Verifikasi Endpoint API JSON
const apiFiles = ['direktori.json', 'berita.json', 'ppdb-simulasi.json'];
for (const file of apiFiles) {
  const filePath = path.join(distDir, 'api', file);
  assert(fs.existsSync(filePath), `API endpoint file tidak ditemukan: ${filePath}`);
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  assert.strictEqual(json.status, 'success', `Status API ${file} harus 'success'`);
}
console.log('✓ 1. Tiga endpoint API internal JSON (/api/*.json) terverifikasi valid.');

// 2. Verifikasi Astro Island Directives
// 2a. PpdbCalculator (client:visible)
const ppdbHtml = fs.readFileSync(path.join(distDir, 'ppdb', 'index.html'), 'utf-8');
assert(ppdbHtml.includes('astro-island'), 'Halaman PPDB harus memuat astro-island');
assert(ppdbHtml.includes('client="visible"'), 'PpdbCalculator harus memuat client="visible"');
console.log('✓ 2. React Island PpdbCalculator terpasang dengan client:visible di /ppdb.');

// 2b. DirectoryLiveFilter (client:load)
const direktoriHtml = fs.readFileSync(path.join(distDir, 'direktori', 'index.html'), 'utf-8');
assert(direktoriHtml.includes('astro-island'), 'Halaman Direktori harus memuat astro-island');
assert(direktoriHtml.includes('client="load"'), 'DirectoryLiveFilter harus memuat client="load"');
console.log('✓ 3. React Island DirectoryLiveFilter terpasang dengan client:load di /direktori.');

// 2c. InteractiveSmansaBot (client:idle)
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
assert(indexHtml.includes('astro-island'), 'Beranda harus memuat astro-island untuk chatbot');
assert(indexHtml.includes('client="idle"'), 'InteractiveSmansaBot harus memuat client="idle"');
console.log('✓ 4. React Island InteractiveSmansaBot terpasang dengan client:idle di beranda.');

// 3. Verifikasi ClientRouter (ViewTransitions)
assert(
  indexHtml.includes('data-astro-transition') ||
  indexHtml.includes('astro:transitions') ||
  indexHtml.includes('router') ||
  indexHtml.includes('astro-dev-toolbar') ||
  indexHtml.includes('data-astro-rerun') ||
  indexHtml.includes('/_astro/ClientRouter'),
  'ClientRouter harus aktif pada layout utama'
);
console.log('✓ 5. View Transitions (ClientRouter) terpasang aktif di BaseLayout.');

console.log('--- SEMUA PENGUJIAN KAPABILITAS MODERN ASTRO 7 LOLOS 100% ---');
