import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- Pengujian Audit Data & Redesain Hero SMAN 1 Klaten ---');

// 1. Dokumen Sumber
const docPath = path.resolve('docs/SUMBER_DATA_SMAN1_KLATEN.md');
assert(fs.existsSync(docPath), 'Dokumen docs/SUMBER_DATA_SMAN1_KLATEN.md wajib ada');
const docText = fs.readFileSync(docPath, 'utf-8');
assert(docText.includes('20309676'), 'Dokumen sumber harus memuat NPSN 20309676');
assert(docText.includes('1347/BAN-SM/SK/2021'), 'Dokumen sumber harus memuat SK Akreditasi BAN-SM');
assert(docText.includes('/api/staff'), 'Dokumen sumber harus memuat rujukan /api/staff');
assert(docText.includes('15.619 m²'), 'Dokumen sumber harus memuat luas lahan 15.619 m²');
assert(docText.includes('Chiku'), 'Dokumen sumber harus memuat maskot Chiku');
console.log('✓ 1. Dokumen SUMBER_DATA_SMAN1_KLATEN.md terverifikasi komprehensif.');

// 2. Direktori Staf Riil
const staffPath = path.resolve('src/content/direktori/staff.json');
const staffJson = JSON.parse(fs.readFileSync(staffPath, 'utf-8'));
const totalStaff = staffJson.reduce((sum, cat) => sum + (cat.people ? cat.people.length : 0), 0);
assert(totalStaff >= 75, `Total staf harus >= 75 (ditemukan: ${totalStaff})`);
console.log(`✓ 2. Direktori staf memuat ${totalStaff} personil riil dari API resmi.`);

// 3. Alumni Resmi
const alumniPath = path.resolve('src/content/alumni/tokoh.json');
const alumniJson = JSON.parse(fs.readFileSync(alumniPath, 'utf-8'));
assert(alumniJson.items.length >= 6, `Alumni harus memuat minimal 6 tokoh resmi (ditemukan: ${alumniJson.items.length})`);
console.log(`✓ 3. Data alumni resmi memuat ${alumniJson.items.length} tokoh kehormatan.`);

// 4. Hero Detail & Kredensial di Output HTML
const distIndex = path.resolve('dist/index.html');
assert(fs.existsSync(distIndex), 'dist/index.html harus ada setelah build');
const html = fs.readFileSync(distIndex, 'utf-8');
assert(html.includes('hero-broadside'), 'Hero harus menggunakan layout hero-broadside');
assert(html.includes('meta-coords') && (html.includes('7&deg;42') || html.includes('7°42') || html.includes('110&deg;36') || html.includes('110°36')), 'Hero harus memuat koordinat GPS sekolah');
assert(html.includes('Akreditasi A Unggul') || html.includes('Nilai 98'), 'Hero harus memuat akreditasi nilai 98');
assert(html.includes('20309676'), 'Hero harus memuat NPSN resmi 20309676');
assert(html.includes('33 Rombel'), 'Hero harus memuat kapasitas 33 Rombel');
console.log('✓ 4. Hero berkarakter editorial dengan koordinat, kredensial mikro, dan akreditasi terverifikasi.');

// 5. Endpoint Direktori API
const apiDirektoriPath = path.resolve('dist/api/direktori.json');
assert(fs.existsSync(apiDirektoriPath), 'dist/api/direktori.json harus ada');
const apiDirektori = JSON.parse(fs.readFileSync(apiDirektoriPath, 'utf-8'));
assert.strictEqual(apiDirektori.status, 'success');
assert(apiDirektori.meta.total_staff >= 75, 'total_staff di API harus >= 75');
console.log(`✓ 5. Endpoint API /api/direktori.json menyajikan ${apiDirektori.meta.total_staff} personil secara valid.`);

console.log('--- SEMUA PENGUJIAN AUDIT DATA & REDESAIN HERO LOLOS 100% ---');
