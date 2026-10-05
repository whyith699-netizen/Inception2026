import { useState, useId } from 'react';

interface QuotaItem {
  pct: string;
  title: string;
  desc: string;
  requirements: string[];
}

const QUOTA_DATA: QuotaItem[] = [
  {
    pct: 'Min. 55%',
    title: 'Jalur Zonasi',
    desc: 'Berdasarkan radius jarak domisili pada Kartu Keluarga (KK) ke titik koordinat gerbang SMAN 1 Klaten (Jl. Merbabu No. 13 Klaten).',
    requirements: [
      'KK diterbitkan minimal 1 tahun sebelum tanggal pendaftaran',
      'Titik koordinat domisili tervalidasi pada sistem PPDB Jateng',
      'Surat keterangan domisili khusus kondisi bencana alam/sosial'
    ]
  },
  {
    pct: 'Min. 20%',
    title: 'Jalur Afirmasi',
    desc: 'Dikhususkan bagi calon peserta didik dari keluarga ekonomi kurang mampu, anak panti asuhan, dan penyandang disabilitas.',
    requirements: [
      'Terdaftar aktif dalam DTKS (Data Terpadu Kesejahteraan Sosial)',
      'Memiliki KIP, PIP, atau bukti Program Keluarga Harapan (PKH)',
      'Surat keterangan resmi dinas sosial bagi anak asuh panti'
    ]
  },
  {
    pct: 'Maks. 20%',
    title: 'Jalur Prestasi',
    desc: 'Berdasarkan perpaduan nilai rapor 5 semester dan bobot sertifikat piagam kejuaraan akademik maupun nonakademik berjenjang.',
    requirements: [
      'Akumulasi nilai rapor semester 1 s.d. 5 dilegalisasi kepala sekolah',
      'Piagam kejuaraan resmi berjenjang (OSN, O2SN, FLS2N, Popda)',
      'Sertifikat diterbitkan maksimal 3 tahun sebelum pendaftaran'
    ]
  },
  {
    pct: 'Maks. 5%',
    title: 'Jalur Mutasi Tugas',
    desc: 'Bagi calon siswa yang mengikuti perpindahan tugas kedinasan orang tua/wali atau anak kandung pendidik di SMAN 1 Klaten.',
    requirements: [
      'Surat penugasan resmi dari pimpinan instansi, kantor, atau BUMN',
      'Surat pindah domisili orang tua dari instansi berwenang',
      'SK penugasan aktif bagi putra/putri guru atau tenaga pendidik'
    ]
  }
];

const TIMELINE_DATA = [
  {
    step: '01',
    phase: 'Sosialisasi & Juknis',
    date: '15 – 22 Mei 2026',
    desc: 'Publikasi petunjuk teknis resmi PPDB Jawa Tengah, daya tampung, zonasi wilayah, dan alur pendaftaran.'
  },
  {
    step: '02',
    phase: 'Pembuatan Akun & Verifikasi',
    date: '2 – 12 Juni 2026',
    desc: 'Pengajuan akun daring mandiri, aktivasi token pendaftaran, dan unggah pindaian dokumen persyaratan.'
  },
  {
    step: '03',
    phase: 'Pendaftaran Sekolah',
    date: '15 – 20 Juni 2026',
    desc: 'Pemilihan sekolah dan peminatan secara daring, pemantauan jurnal pergerakan peringkat seleksi realtime.'
  },
  {
    step: '04',
    phase: 'Evaluasi & Validasi',
    date: '21 – 23 Juni 2026',
    desc: 'Uji keabsahan berkas fisik, pembobotan nilai prestasi, serta koordinasi penetapan bersama dinas.'
  },
  {
    step: '05',
    phase: 'Pengumuman & Daftar Ulang',
    date: '25 – 28 Juni 2026',
    desc: 'Pengumuman penetapan siswa baru dan penyerahan berkas fisik daftar ulang resmi di Gedung Utama.'
  }
];

const REQUIREMENTS_DATA = [
  'Fotokopi Kartu Keluarga (KK) yang diterbitkan minimal 1 tahun sebelum tanggal pendaftaran',
  'Fotokopi Akta Kelahiran atau Surat Keterangan Lahir resmi bersurat keterangan sah',
  'Fotokopi Ijazah SMP/MTs sederajat atau Surat Keterangan Lulus (SKL) resmi sekolah asal',
  'Buku Rapor SMP/MTs semester 1 s.d. 5 asli dan salinan legalisasi basah kepala sekolah',
  'Piagam sertifikat kejuaraan resmi berjenjang keabsahan dinas (khusus jalur prestasi)',
  'Dokumen kepesertaan DTKS Kemensos / KIP / Kartu PKH aktif (khusus jalur afirmasi)',
  'Surat penugasan instansi kantor orang tua / SK mengajar (khusus jalur perpindahan tugas)'
];

export default function PpdbPage() {
  const [calcTab, setCalcTab] = useState<'zonasi' | 'prestasi'>('zonasi');
  const [distance, setDistance] = useState<number>(1800); // meter
  const [reportScore, setReportScore] = useState<number>(91.5);
  const [certLevel, setCertLevel] = useState<number>(3); // 0=none, 1=kecamatan, 2=kabupaten, 3=provinsi, 4=nasional

  const distId = useId();
  const scoreId = useId();
  const certId = useId();

  // Zonasi Logic
  const zonasiCutoff = 3500;
  const isZonasiSafe = distance <= 2500;
  const isZonasiCompetitive = distance > 2500 && distance <= zonasiCutoff;

  // Prestasi Logic
  const certBonusMap = [0, 1.5, 3.0, 5.0, 10.0];
  const certBonus = certBonusMap[certLevel] ?? 0;
  const totalPrestasi = Number((reportScore * 0.7 + certBonus * 3).toFixed(2));
  const isPrestasiSafe = totalPrestasi >= 92.5;

  return (
    <div className="bg-neo-bg text-neo-ink">
      {/* 1. Page Header (Editorial) */}
      <section className="py-12 sm:py-16 border-b border-neo-ink bg-neo-bg">
        <div className="container">
          <span className="lbl lbl-lime mb-3 inline-block">PPDB 2026/2027 &middot; JUKNIS RESMI</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neo-ink mb-4 max-w-3xl leading-[1.15]">
            Petunjuk Teknis PPDB SMA Negeri 1 Klaten
          </h1>
          <p className="text-neo-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            Penerimaan peserta didik baru berlangsung transparan dan akuntabel sesuai regulasi Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah tanpa pungutan biaya.
          </p>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-neo-ink text-xs font-mono text-neo-ink-2">
            <span>&bull; Bebas Biaya Pendaftaran</span>
            <span>&bull; Sistem Seleksi Terpusat Jateng</span>
            <span>&bull; Verifikasi Berkas di Gedung Utama</span>
          </div>
        </div>
      </section>

      {/* 2. 4 Kartu Jalur Seleksi */}
      <section className="py-12 sm:py-16 border-b border-neo-ink">
        <div className="container">
          <div className="mb-8">
            <span className="lbl lbl-lime mb-2 inline-block">DISTRIBUSI KUOTA</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neo-ink">Empat Jalur Seleksi Masuk</h2>
            <p className="text-neo-ink-2 text-sm sm:text-base mt-1">
              Alokasi persentase daya tampung resmi sesuai regulasi Pergub Jawa Tengah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUOTA_DATA.map((q) => (
              <article
                key={q.title}
                className="bg-neo-surface border border-neo-ink shadow-neo-sm p-5 flex flex-col justify-between hover:shadow-neo transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-neo-ink/20">
                    <span className="font-mono text-base font-bold text-neo-ink">
                      {q.pct}
                    </span>
                    <span className="font-mono text-[11px] text-neo-ink-3 uppercase">
                      Kuota
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-neo-ink mb-2">
                    {q.title}
                  </h3>

                  <p className="text-neo-ink-2 text-xs sm:text-sm leading-relaxed mb-4">
                    {q.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-neo-ink/10">
                  <p className="font-mono text-[11px] font-bold uppercase text-neo-ink mb-2">
                    Syarat Kunci:
                  </p>
                  <ul className="space-y-1 text-xs text-neo-ink-2">
                    {q.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-snug">
                        <span className="text-neo-ink font-bold">&bull;</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Kalkulator Simulasi Mandiri */}
      <section className="py-12 sm:py-16 border-b border-neo-ink bg-neo-surface">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-neo-ink">
              <div>
                <span className="lbl lbl-lime mb-2 inline-block">SIMULASI MANDIRI</span>
                <h2 id="calc-heading" className="font-serif text-2xl sm:text-3xl font-bold text-neo-ink">
                  Kalkulator Estimasi Peluang PPDB
                </h2>
                <p className="text-neo-ink-2 text-sm mt-1">
                  Uji peluang Anda pada jalur zonasi domisili atau pembobotan nilai rapor jalur prestasi.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCalcTab('zonasi')}
                  className={`font-mono text-xs px-3 py-1.5 border border-neo-ink transition-all cursor-pointer ${
                    calcTab === 'zonasi'
                      ? 'bg-neon-lime text-neo-ink font-bold shadow-neo-sm'
                      : 'bg-neo-bg text-neo-ink-2 hover:bg-neo-surface-2'
                  }`}
                >
                  Jalur Zonasi (Min. 55%)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcTab('prestasi')}
                  className={`font-mono text-xs px-3 py-1.5 border border-neo-ink transition-all cursor-pointer ${
                    calcTab === 'prestasi'
                      ? 'bg-neon-lime text-neo-ink font-bold shadow-neo-sm'
                      : 'bg-neo-bg text-neo-ink-2 hover:bg-neo-surface-2'
                  }`}
                >
                  Jalur Prestasi (Maks. 20%)
                </button>
              </div>
            </div>

            {calcTab === 'zonasi' ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-7 space-y-6">
                  <div>
                    <label
                      htmlFor={distId}
                      className="block font-sans font-bold text-sm text-neo-ink mb-2"
                    >
                      Jarak domisili KK ke SMAN 1 Klaten (Jl. Merbabu No. 13):
                    </label>
                    <div className="flex items-center gap-4 mb-2">
                      <input
                        id={distId}
                        type="range"
                        min="200"
                        max="5000"
                        step="50"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="flex-1 accent-neo-ink cursor-pointer h-2 bg-neo-bg border border-neo-ink rounded-none"
                      />
                      <span className="font-mono text-base font-bold text-neo-ink min-w-[80px] text-right bg-neo-bg border border-neo-ink px-2 py-1">
                        {(distance / 1000).toFixed(2)} km
                      </span>
                    </div>
                    <p className="font-mono text-xs text-neo-ink-3">
                      Batas cut-off reguler tahun lalu berada pada jarak <strong>3,42 km</strong> dari gerbang sekolah.
                    </p>
                  </div>

                  <div className="p-4 bg-neo-bg border border-neo-ink text-xs font-mono text-neo-ink-2 space-y-1">
                    <p className="font-bold text-neo-ink">Radius Panduan:</p>
                    <p>&bull; 0.20 km – 2.50 km : Prioritas utama (Zona 1)</p>
                    <p>&bull; 2.51 km – 3.50 km : Rentang kompetitif kuota</p>
                    <p>&bull; &gt; 3.50 km : Disarankan alternatif prestasi / afirmasi</p>
                  </div>
                </div>

                <div className="md:col-span-5 bg-neo-bg border border-neo-ink p-6 shadow-neo-sm">
                  <span className="lbl lbl-lime text-[10px] px-2 py-0.5 inline-block mb-3">
                    {isZonasiSafe
                      ? 'Prioritas Tinggi (Zona 1 Aman)'
                      : isZonasiCompetitive
                      ? 'Zona Kompetitif'
                      : 'Di Luar Radius Utama'}
                  </span>

                  <h3 className="font-serif text-lg font-bold text-neo-ink mb-2">
                    {isZonasiSafe
                      ? 'Peluang Masuk Zonasi Kuat'
                      : isZonasiCompetitive
                      ? 'Peluang Bersaing di Rentang Kuota'
                      : 'Disarankan Jalur Prestasi'}
                  </h3>

                  <p className="text-neo-ink-2 text-xs leading-relaxed">
                    {isZonasiSafe
                      ? 'Jarak tempat tinggal Anda berada dalam radius aman zonasi utama SMAN 1 Klaten. Peluang penerimaan kuota zonasi sangat tinggi dengan ketentuan Kartu Keluarga sah minimal 1 tahun.'
                      : isZonasiCompetitive
                      ? 'Jarak tempat tinggal masih berada dalam rentang kuota tahun lalu, namun disarankan menyiapkan alternatif sertifikat prestasi sebagai proteksi cadangan.'
                      : 'Jarak melampaui batas aman zonasi tahun sebelumnya. Kami menyarankan Anda mendaftar melalui jalur prestasi nilai rapor atau jalur afirmasi.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-7 space-y-6">
                  <div>
                    <label
                      htmlFor={scoreId}
                      className="block font-sans font-bold text-sm text-neo-ink mb-2"
                    >
                      Rata-rata Nilai Rapor Semester 1–5:
                    </label>
                    <div className="flex items-center gap-4 mb-2">
                      <input
                        id={scoreId}
                        type="range"
                        min="80"
                        max="100"
                        step="0.1"
                        value={reportScore}
                        onChange={(e) => setReportScore(Number(e.target.value))}
                        className="flex-1 accent-neo-ink cursor-pointer h-2 bg-neo-bg border border-neo-ink rounded-none"
                      />
                      <span className="font-mono text-base font-bold text-neo-ink min-w-[70px] text-right bg-neo-bg border border-neo-ink px-2 py-1">
                        {reportScore.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={certId}
                      className="block font-sans font-bold text-sm text-neo-ink mb-2"
                    >
                      Piagam Kejuaraan Berjenjang (OSN/O2SN/FLS2N):
                    </label>
                    <select
                      id={certId}
                      value={certLevel}
                      onChange={(e) => setCertLevel(Number(e.target.value))}
                      className="w-full p-2.5 bg-neo-bg border border-neo-ink text-sm font-medium text-neo-ink focus:outline-none focus:ring-1 focus:ring-neo-ink font-sans"
                    >
                      <option value={0}>Tidak Ada Piagam / Non-kejuaraan (+0.0)</option>
                      <option value={1}>Tingkat Kecamatan (+1.5)</option>
                      <option value={2}>Juara 1–3 Tingkat Kabupaten (+3.0)</option>
                      <option value={3}>Juara 1–3 Tingkat Provinsi (+5.0)</option>
                      <option value={4}>Juara 1–3 Tingkat Nasional / Internasional (+10.0)</option>
                    </select>
                  </div>

                  <p className="font-mono text-xs text-neo-ink-3">
                    Rumus: (Rapor &times; 70%) + (Piagam &times; 3). Cut-off historis berkisar <strong>92.80</strong>.
                  </p>
                </div>

                <div className="md:col-span-5 bg-neo-bg border border-neo-ink p-6 shadow-neo-sm">
                  <span className="font-mono text-xs text-neo-ink-3 uppercase block mb-1">
                    Estimasi Skor Bobot
                  </span>
                  <div className="font-mono text-3xl sm:text-4xl font-bold text-neo-ink mb-2">
                    {totalPrestasi.toFixed(2)}
                  </div>

                  <span className="lbl lbl-lime text-[10px] px-2 py-0.5 inline-block mb-3">
                    {isPrestasiSafe ? 'Ambang Batas Aman' : 'Zona Kompetitif Ketat'}
                  </span>

                  <p className="text-neo-ink-2 text-xs leading-relaxed">
                    {isPrestasiSafe
                      ? 'Skor Anda melampaui cut-off historis jalur prestasi SMAN 1 Klaten. Peluang lolos seleksi jalur prestasi sangat kuat dengan syarat keabsahan sertifikat terverifikasi panitia.'
                      : 'Skor mendekati ambang batas seleksi jalur prestasi. Pastikan keabsahan sertifikat dan kelengkapan berkas terverifikasi resmi oleh panitia sekolah.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Linimasa Pelaksanaan */}
      <section className="py-12 sm:py-16 border-b border-neo-ink">
        <div className="container">
          <div className="mb-8">
            <span className="lbl lbl-lime mb-2 inline-block">LINIMASA SELEKSI</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neo-ink">Tahapan Resmi PPDB 2026</h2>
            <p className="text-neo-ink-2 text-sm sm:text-base mt-1">
              Jadwal pelaksanaan serentak Provinsi Jawa Tengah Tahun Ajaran 2026/2027.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TIMELINE_DATA.map((item) => (
              <div
                key={item.step}
                className="bg-neo-surface border border-neo-ink shadow-neo-sm p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-neo-ink/20">
                    <span className="font-mono text-lg font-bold text-neo-ink">
                      {item.step}
                    </span>
                    <span className="font-mono text-[10px] text-neo-ink-3">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-sm text-neo-ink mb-1">
                    {item.phase}
                  </h3>

                  <p className="text-neo-ink-2 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Berkas Persyaratan */}
      <section className="py-12 sm:py-16 border-b border-neo-ink bg-neo-surface-2">
        <div className="container">
          <div className="mb-8">
            <span className="lbl lbl-lime mb-2 inline-block">DOKUMEN ADMINISTRASI</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neo-ink">Berkas yang Perlu Disiapkan</h2>
            <p className="text-neo-ink-2 text-sm sm:text-base mt-1">
              Siapkan dokumen fisik dan salinan digital pindaian format PDF/JPG.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REQUIREMENTS_DATA.map((req, idx) => (
              <div
                key={idx}
                className="bg-neo-surface border border-neo-ink shadow-neo-sm p-4 flex items-start gap-3"
              >
                <span className="font-mono text-xs font-bold text-neo-ink bg-neo-surface-2 border border-neo-ink px-2 py-0.5 shrink-0">
                  {idx + 1}
                </span>
                <span className="text-neo-ink-2 text-xs sm:text-sm leading-snug">
                  {req}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Meja Bantuan / Helpdesk */}
      <section className="py-12 sm:py-16">
        <div className="container">
          <div className="bg-neo-surface border border-neo-ink shadow-neo p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="lbl lbl-lime text-[10px] px-2 py-0.5 inline-block mb-2">
                MEJA BANTUAN RESMI
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-neo-ink mb-2">
                Butuh Konsultasi Pemilihan Jalur?
              </h3>
              <p className="text-neo-ink-2 text-sm max-w-xl leading-relaxed">
                Tanyakan estimasi zonasi domisili, ketentuan piagam kejuaraan, atau verifikasi berkas bersama panitia helpdesk di Gedung Utama SMAN 1 Klaten atau asisten virtual SmansaBot AI.
              </p>
            </div>

            <a
              href="/#chatbot"
              className="btn btn-primary text-xs whitespace-nowrap"
            >
              Tanya SmansaBot AI &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
