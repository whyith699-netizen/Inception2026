import EventBanner, { type EventData } from '../EventBanner';
import PpdbCalculator from '../../islands/PpdbCalculator';

const PPDB_EVENT: EventData = {
  title: 'Posko Layanan & Verifikasi Akun PPDB Jateng 2026',
  badge: 'AGENDA PPDB RESMI',
  description: 'Pendampingan aktivasi akun pendaftaran, verifikasi berkas fisik, dan konsultasi pemilihan jalur seleksi PPDB SMA Negeri 1 Klaten oleh panitia resmi.',
  time: 'Senin – Jumat, 08.00 – 14.00 WIB',
  location: 'Aula Graha Padmawijaya, SMAN 1 Klaten',
  dateNum: '15',
  dateMonth: 'Mei 2026',
};

const QUOTAS = [
  {
    pct: '55%',
    title: 'Jalur zonasi',
    desc: 'Berdasarkan jarak domisili pada kartu keluarga ke lokasi sekolah. Kartu keluarga harus diterbitkan minimal satu tahun sebelum pendaftaran.',
  },
  {
    pct: '20%',
    title: 'Jalur afirmasi',
    desc: 'Dipersembahkan bagi calon peserta didik dari keluarga ekonomi kurang mampu yang terdaftar pada DTKS dan anak panti asuhan.',
  },
  {
    pct: '20%',
    title: 'Jalur prestasi',
    desc: 'Berdasarkan nilai rapor lima semester terakhir dan piagam kejuaraan akademik maupun nonakademik yang berjenjang resmi.',
  },
  {
    pct: '5%',
    title: 'Jalur mutasi orang tua',
    desc: 'Bagi calon siswa yang orang tuanya mengalami perpindahan tugas dinas atau anak tenaga pendidik di sekolah ini.',
  },
];

const REQUIREMENTS = [
  'Fotokopi kartu keluarga',
  'Fotokopi akta kelahiran',
  'Fotokopi ijazah atau surat keterangan lulus',
  'Fotokopi rapor lima semester terakhir',
  'Piagam prestasi bagi pendaftar jalur prestasi',
  'Dokumen pendukung DTKS bagi pendaftar jalur afirmasi',
];

export const PpdbPage = () => {
  return (
    <div className="ppdb-page-wrapper bg-neo-bg text-neo-ink">
      {/* 1. Original Hero Section */}
      <section className="ppdb-hero sec sec-flush">
        <div className="container">
          <p className="lbl">Penerimaan siswa baru</p>
          <h1 className="page-title">Petunjuk teknis PPDB 2026/2027</h1>
          <p className="page-lead">
            Penerimaan peserta didik baru berjalan melalui sistem resmi Dinas
            Pendidikan dan Kebudayaan Provinsi Jawa Tengah. Seluruh tahapan
            diverifikasi sekolah tanpa pungutan biaya.
          </p>
        </div>
      </section>

      {/* 2. Official Agenda Event Banner */}
      <EventBanner event={PPDB_EVENT} />

      {/* 3. Interactive PPDB Calculator */}
      <section className="sec sec-flush" style={{ paddingTop: 'clamp(32px, 5vw, 48px)', paddingBottom: 0 }}>
        <div className="container">
          <PpdbCalculator />
        </div>
      </section>

      {/* 4. Quota Distribution Section */}
      <section className="quota-section">
        <div className="container">
          <h2 className="section-heading">Pembagian kuota jalur seleksi</h2>
          <div className="quota-grid">
            {QUOTAS.map((q) => (
              <article className="quota-card" key={q.title}>
                <span className="quota-pct num">{q.pct}</span>
                <h3 className="quota-title">{q.title}</h3>
                <p className="quota-desc">{q.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Requirements Section */}
      <section className="req-section">
        <div className="container">
          <h2 className="section-heading">Berkas yang disiapkan</h2>
          <ul className="req-list">
            {REQUIREMENTS.map((r, i) => (
              <li className="req-item" key={i}>
                <span className="req-mark" aria-hidden="true"></span>
                <span>{r}</span>
              </li>
            ))}
          </ul>

          {/* CTA Box */}
          <div className="ppdb-cta">
            <div>
              <h3 className="cta-title">Perlu bantuan atau verifikasi berkas?</h3>
              <p className="cta-desc">
                Posko PPDB luring buka setiap hari kerja pukul 08.00–14.00 WIB
                di aula sekolah untuk pendampingan pendaftaran akun dan cetak bukti ajuan.
              </p>
            </div>
            <a href="/kontak" className="btn btn-primary">
              Hubungi Panitia PPDB →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PpdbPage;
