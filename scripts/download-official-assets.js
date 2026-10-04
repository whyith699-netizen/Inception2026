import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.resolve(__dirname, '..', 'public', 'images');

const assets = [
  // Core Logo & School Footage
  { url: 'https://sma1klaten.sch.id/images/logo.png', dest: 'school/logo.png' },
  { url: 'https://sma1klaten.sch.id/images/Smansa1.jpg', dest: 'school/Smansa1.jpg' },
  { url: 'https://sma1klaten.sch.id/images/Smansa2.jpg', dest: 'school/Smansa2.jpg' },
  { url: 'https://sma1klaten.sch.id/images/Smansa3.jpg', dest: 'school/Smansa3.jpg' },
  { url: 'https://sma1klaten.sch.id/images/Smansa4.jpg', dest: 'school/Smansa4.jpg' },
  { url: 'https://sma1klaten.sch.id/images/Smansa5.jpg', dest: 'school/Smansa5.jpg' },
  { url: 'https://sma1klaten.sch.id/images/salamkepsek.jpg', dest: 'school/salamkepsek.jpg' },
  { url: 'https://sma1klaten.sch.id/images/smansafullteam.jpeg', dest: 'school/smansafullteam.jpeg' },
  { url: 'https://sma1klaten.sch.id/images/visimisibutantri.jpg', dest: 'school/visimisibutantri.jpg' },
  { url: 'https://sma1klaten.sch.id/images/history/Foto1.jpg', dest: 'school/history-foto1.jpg' },
  { url: 'https://sma1klaten.sch.id/images/history/Foto2a.jpg', dest: 'school/history-foto2a.jpg' },

  // Extracurricular Logos
  { url: 'https://sma1klaten.sch.id/images/logoekstra/Osmansa.png', dest: 'logoekstra/Osmansa.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/MPK.png', dest: 'logoekstra/MPK.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/DewanAmbalanNew.png', dest: 'logoekstra/DewanAmbalanNew.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/prata.png', dest: 'logoekstra/prata.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/Emapala.png', dest: 'logoekstra/Emapala.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/Romansa.png', dest: 'logoekstra/Romansa.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/Persik.png', dest: 'logoekstra/Persik.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/Perkasa.png', dest: 'logoekstra/Perkasa.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/SaklaMusic.png', dest: 'logoekstra/SaklaMusic.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/SaklaVoice.png', dest: 'logoekstra/SaklaVoice.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/JujuNew.png', dest: 'logoekstra/JujuNew.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/KIR.png', dest: 'logoekstra/KIR.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/Futsal.png', dest: 'logoekstra/Futsal.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/eagles.png', dest: 'logoekstra/eagles.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/Recsa.png', dest: 'logoekstra/Recsa.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/EC.png', dest: 'logoekstra/EC.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/Sparkle.png', dest: 'logoekstra/Sparkle.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/TSL.png', dest: 'logoekstra/TSL.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/Secure.png', dest: 'logoekstra/Secure.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/DACO.png', dest: 'logoekstra/DACO.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/Icomsa.png', dest: 'logoekstra/Icomsa.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/SnapshotNew.png', dest: 'logoekstra/SnapshotNew.png' },
  { url: 'https://sma1klaten.sch.id/images/logoekstra/Hadroh.png', dest: 'logoekstra/Hadroh.png' },

  // Alumni Menyapa
  { url: 'https://sma1klaten.sch.id/images/testimoni/testimoni-1.jpg', dest: 'alumni/testimoni-1.jpg' },
  { url: 'https://sma1klaten.sch.id/images/testimoni/testimoni-2.jpg', dest: 'alumni/testimoni-2.jpg' },
  { url: 'https://sma1klaten.sch.id/images/testimoni/testimoni-3.jpg', dest: 'alumni/testimoni-3.jpg' },
  { url: 'https://sma1klaten.sch.id/images/testimoni/testimoni-4.jpeg', dest: 'alumni/testimoni-4.jpeg' },
  { url: 'https://sma1klaten.sch.id/images/testimoni/testimoni-5.jpg', dest: 'alumni/testimoni-5.jpg' },
  { url: 'https://sma1klaten.sch.id/images/testimoni/testimoni-6.jpg', dest: 'alumni/testimoni-6.jpg' }
];

async function downloadAll() {
  console.log(`Mulai mengunduh ${assets.length} aset resmi dari sma1klaten.sch.id...`);
  for (const item of assets) {
    const targetPath = path.join(baseDir, item.dest);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    try {
      const res = await fetch(item.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const fileStream = fs.createWriteStream(targetPath);
      await pipeline(res.body, fileStream);
      console.log(`✓ [${res.status}] ${item.dest}`);
    } catch (err) {
      console.error(`✗ Gagal mengunduh ${item.url}:`, err.message);
    }
  }
  console.log('Semua aset berhasil diunduh ke folder public/images/!');
}

downloadAll();
