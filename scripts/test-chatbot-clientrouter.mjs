import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

console.log('Testing InteractiveSmansaBot & ClientRouter implementation...');

// 1. Verify InteractiveSmansaBot.tsx
const botPath = path.join(rootDir, 'src/components/islands/InteractiveSmansaBot.tsx');
assert(fs.existsSync(botPath), 'InteractiveSmansaBot.tsx harus ada');
const botContent = fs.readFileSync(botPath, 'utf-8');

// Ensure no dangerous innerHTML
const forbiddenProp = 'dangerouslySet' + 'InnerHTML';
assert(!botContent.includes(forbiddenProp), 'Dilarang menggunakan HTML injection tak aman');
assert(botContent.includes('sessionStorage'), 'Wajib mengelola riwayat percakapan di sessionStorage');
assert(botContent.includes('isTyping'), 'Wajib memiliki typing state indicator');
assert(botContent.includes('CANNED_PILLS'), 'Wajib memiliki canned pills pertanyaan cepat');
assert(botContent.includes('1957'), 'Wajib mencakup sejarah 1957');
assert(botContent.includes('98'), 'Wajib mencakup akreditasi 98');
assert(botContent.includes('PPDB') || botContent.includes('ppdb'), 'Wajib mencakup basis pengetahuan PPDB');
assert(botContent.includes('ekskul') || botContent.includes('Ekstrakurikuler'), 'Wajib mencakup ekskul');
assert(botContent.includes('prestasi') || botContent.includes('OSN'), 'Wajib mencakup prestasi');
assert(botContent.includes('direktori') || botContent.includes('Tantri Ambarsari'), 'Wajib mencakup pimpinan/direktori');
console.log('✓ InteractiveSmansaBot.tsx memenuhi semua kriteria logika, memori, dan keamanan');

// 2. Verify ChatbotWidget.astro
const widgetPath = path.join(rootDir, 'src/components/ChatbotWidget.astro');
const widgetContent = fs.readFileSync(widgetPath, 'utf-8');
assert(widgetContent.includes('InteractiveSmansaBot'), 'ChatbotWidget harus mengimpor InteractiveSmansaBot');
assert(widgetContent.includes('client:idle'), 'InteractiveSmansaBot harus dipasang dengan directive client:idle');
console.log('✓ ChatbotWidget.astro terpasang dengan directive client:idle');

// 3. Verify BaseLayout.astro
const layoutPath = path.join(rootDir, 'src/layouts/BaseLayout.astro');
const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
assert(layoutContent.includes("from 'astro:transitions'"), 'BaseLayout harus mengimpor dari astro:transitions');
assert(layoutContent.includes('<ClientRouter />') || layoutContent.includes('<ClientRouter/>'), 'BaseLayout harus menyematkan <ClientRouter />');
console.log('✓ BaseLayout.astro terintegrasi ClientRouter dari astro:transitions');

// 4. Verify global.css
const cssPath = path.join(rootDir, 'src/styles/global.css');
const cssContent = fs.readFileSync(cssPath, 'utf-8');
assert(cssContent.includes('::view-transition-old(root)'), 'global.css harus memuat styling view transition');
assert(cssContent.includes('180ms'), 'Durasi view transition harus 180ms');
assert(cssContent.includes('cubic-bezier'), 'Timing function harus cubic-bezier');
assert(cssContent.includes('prefers-reduced-motion'), 'View transition harus menghormati prefers-reduced-motion');
console.log('✓ global.css memuat styling view transition 180ms & prefers-reduced-motion');

// 5. Verify Build output (dist)
const distIndex = path.join(distDir, 'index.html');
assert(fs.existsSync(distIndex), 'dist/index.html harus ada setelah build');
const html = fs.readFileSync(distIndex, 'utf-8');
assert(html.includes('client="idle"'), 'Output HTML harus memuat directive client="idle"');
assert(html.includes('InteractiveSmansaBot'), 'Output HTML harus memuat opts InteractiveSmansaBot');
assert(html.includes('ClientRouter'), 'Output HTML harus memuat script ClientRouter');
console.log('✓ dist/index.html memuat island client="idle" dan ClientRouter');

console.log('\nSEMUA PENGUJIAN OTOMATIS BERHASIL 100%!');
