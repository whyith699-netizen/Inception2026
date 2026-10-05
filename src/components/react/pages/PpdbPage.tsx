import { useState, useId } from 'react';

interface QuotaItem {
  pct: string;
  badgeBg: string;
  title: string;
  desc: string;
  requirements: string[];
}

const QUOTA_DATA: QuotaItem[] = [
  {
    pct: 'Min. 55%',
    badgeBg: 'bg-neon-lime',
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
    badgeBg: 'bg-neon-cyan',
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
    badgeBg: 'bg-neon-yellow',
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
    badgeBg: 'bg-neon-magenta',
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
    phase: 'Pembuatan Akun & Verifikasi Berkas',
    date: '2 – 12 Juni 2026',
    desc: 'Pengajuan akun daring mandiri, aktivasi token pendaftaran, dan unggah pindaian dokumen persyaratan.'
  },
  {
    step: '03',
    phase: 'Pendaftaran & Pemilihan Sekolah',
    date: '15 – 20 Juni 2026',
    desc: 'Pemilihan sekolah dan peminatan secara daring, pemantauan jurnal pergerakan peringkat seleksi harian secara realtime.'
  },
  {
    step: '04',
    phase: 'Evaluasi & Validasi Pemeringkatan',
    date: '21 – 23 Juni 2026',
    desc: 'Uji keabsahan berkas fisik, pembobotan nilai prestasi, serta koordinasi penetapan bersama panitia dinas.'
  },
  {
    step: '05',
    phase: 'Pengumuman Hasil & Daftar Ulang',
    date: '25 – 28 Juni 2026',
    desc: 'Pengumuman penetapan siswa baru dan penyerahan berkas fisik daftar ulang resmi di Gedung Utama SMAN 1 Klaten.'
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
    <div className="bg-neo-bg text-neo-ink min-h-screen py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section aria-labelledby="ppdb-hero-heading" className="mb-14 sm:mb-18 border-b-2 border-neo-ink pb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold">
              PPDB Tahun Ajaran 2026/2027
            </span>
            <span className="font-mono text-xs text-neo-ink-3">
              SMAN 1 Klaten &middot; Jalur Resmi Provinsi Jawa Tengah
            </span>
          </div>

          <h1
            id="ppdb-hero-heading"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neo-ink tracking-tight mb-6 leading-tight max-w-4xl"
          >
            Petunjuk Teknis PPDB SMA Negeri 1 Klaten
          </h1>

          <p className="text-neo-ink-2 text-base sm:text-xl max-w-3xl leading-relaxed mb-8">
            Penerimaan peserta didik baru berlangsung transparan dan akuntabel sesuai ketentuan Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah. Seluruh tahapan pendaftaran, verifikasi dokumen, dan konsultasi bebas pungutan biaya.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="bg-neo-surface text-neo-ink border-2 border-neo-ink shadow-neo-sm px-3.5 py-1.5 font-mono text-xs font-bold uppercase">
              Bebas Biaya Pendaftaran
            </span>
            <span className="bg-neon-cyan text-neo-ink border-2 border-neo-ink shadow-neo-sm px-3.5 py-1.5 font-mono text-xs font-bold uppercase">
              Sistem Terpusat Jateng
            </span>
            <span className="bg-neon-yellow text-neo-ink border-2 border-neo-ink shadow-neo-sm px-3.5 py-1.5 font-mono text-xs font-bold uppercase">
              Verifikasi Gedung Utama
            </span>
          </div>
        </section>

        {/* 4 Kartu Jalur PPDB */}
        <section aria-labelledby="quota-heading" className="mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-neo-ink">
            <div>
              <span className="bg-neon-cyan text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold inline-block mb-2">
                Distribusi Kuota
              </span>
              <h2 id="quota-heading" className="font-serif text-2xl sm:text-4xl font-bold text-neo-ink">
                Empat Jalur Seleksi Masuk
              </h2>
            </div>
            <p className="font-mono text-xs text-neo-ink-3 max-w-xs">
              Alokasi persentase daya tampung resmi sesuai regulasi Pergub Jawa Tengah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUOTA_DATA.map((q) => (
              <article
                key={q.title}
                className="bg-neo-surface border-2 border-neo-ink shadow-neo hover:shadow-neo-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all p-6 rounded-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`${q.badgeBg} text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-lg font-extrabold px-3 py-1`}>
                      {q.pct}
                    </span>
                    <span className="font-mono text-xs uppercase text-neo-ink-3">
                      Kuota Resmi
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-xl text-neo-ink mb-2">
                    {q.title}
                  </h3>

                  <p className="text-neo-ink-2 text-xs sm:text-sm leading-relaxed mb-6">
                    {q.desc}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-neo-ink/20">
                  <p className="font-mono text-xs font-bold uppercase text-neo-ink mb-2">
                    Syarat Kunci:
                  </p>
                  <ul className="space-y-1.5 text-xs text-neo-ink-2 font-sans">
                    {q.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-neo-ink font-bold">&bull;</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Kalkulator Simulasi PPDB Terintegrasi */}
        <section aria-labelledby="calc-heading" className="mb-16 sm:mb-20">
          <div className="bg-neo-surface border-2 border-neo-ink shadow-neo-lg rounded-sm p-6 sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-neo-ink pb-6 mb-8">
              <div>
                <span className="bg-neon-yellow text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold inline-block mb-2">
                  Simulasi Mandiri
                </span>
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
                  className={`font-mono text-xs sm:text-sm uppercase tracking-wider px-4 py-2 border-2 border-neo-ink transition-all ${
                    calcTab === 'zonasi'
                      ? 'bg-neon-lime text-neo-ink font-bold shadow-neo -translate-x-0.5 -translate-y-0.5'
                      : 'bg-neo-surface text-neo-ink-2 hover:bg-neo-surface-2 shadow-neo-sm font-semibold'
                  }`}
                >
                  Jalur Zonasi (Min. 55%)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcTab('prestasi')}
                  className={`font-mono text-xs sm:text-sm uppercase tracking-wider px-4 py-2 border-2 border-neo-ink transition-all ${
                    calcTab === 'prestasi'
                      ? 'bg-neon-lime text-neo-ink font-bold shadow-neo -translate-x-0.5 -translate-y-0.5'
                      : 'bg-neo-surface text-neo-ink-2 hover:bg-neo-surface-2 shadow-neo-sm font-semibold'
                  }`}
                >
                  Jalur Prestasi (Maks. 20%)
                </button>
              </div>
            </div>

            {calcTab === 'zonasi' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <label
                      htmlFor={distId}
                      className="block font-sans font-bold text-sm sm:text-base text-neo-ink mb-2"
                    >
                      Jarak domisili KK ke SMAN 1 Klaten (Jl. Merbabu No. 13):
                    </label>
                    <div className="flex items-center gap-4 mb-3">
                      <input
                        id={distId}
                        type="range"
                        min="200"
                        max="5000"
                        step="50"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="flex-1 accent-neo-ink cursor-pointer h-2 bg-neo-surface-2 rounded-lg"
                      />
                      <span className="font-mono text-lg font-bold text-neo-ink min-w-[90px] text-right bg-neo-surface-2 border-2 border-neo-ink px-2 py-1 shadow-neo-sm">
                        {(distance / 1000).toFixed(2)} km
                      </span>
                    </div>
                    <p className="font-mono text-xs text-neo-ink-3 leading-relaxed">
                      Catatan historis: Batas cut-off reguler tahun lalu berada pada jarak <strong>3,42 km</strong> dari gerbang sekolah.
                    </p>
                  </div>

                  <div className="p-4 bg-neo-surface-2 border-2 border-neo-ink text-xs font-mono text-neo-ink-2 space-y-1">
                    <p className="font-bold text-neo-ink">Panduan Radius Zonasi:</p>
                    <p>&bull; 0.20 km – 2.50 km : Lingkar prioritas utama (Zona 1)</p>
                    <p>&bull; 2.51 km – 3.50 km : Lingkar kompetitif kuota</p>
                    <p>&bull; &gt; 3.50 km : Disarankan menyiapkan jalur prestasi / afirmasi</p>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-neo-bg border-2 border-neo-ink shadow-neo p-6 rounded-sm">
                  <span className="font-mono text-xs uppercase tracking-wider text-neo-ink-3">
                    Status Estimasi Kelayakan
                  </span>
                  <div className="my-3">
                    <span
                      className={`inline-block font-mono text-xs font-bold uppercase px-3 py-1.5 border-2 border-neo-ink shadow-neo-sm ${
                        isZonasiSafe
                          ? 'bg-neon-lime text-neo-ink'
                          : isZonasiCompetitive
                          ? 'bg-neon-yellow text-neo-ink'
                          : 'bg-neo-surface-2 text-neo-ink-2'
                      }`}
                    >
                      {isZonasiSafe
                        ? 'Prioritas Tinggi (Zona 1 Aman)'
                        : isZonasiCompetitive
                        ? 'Zona Kompetitif (Mendekati Batas Kuota)'
                        : 'Di Luar Radius Historis Utama'}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-neo-ink mb-2">
                    {isZonasiSafe
                      ? 'Peluang Masuk Jalur Zonasi Sangat Kuat'
                      : isZonasiCompetitive
                      ? 'Peluang Bersaing di Rentang Kuota Tengah'
                      : 'Disarankan Mengambil Jalur Prestasi'}
                  </h3>

                  <p className="text-neo-ink-2 text-sm leading-relaxed">
                    {isZonasiSafe
                      ? 'Jarak tempat tinggal Anda berada dalam radius aman zonasi utama SMAN 1 Klaten. Peluang penerimaan kuota zonasi sangat tinggi dengan ketentuan Kartu Keluarga sah minimal 1 tahun.'
                      : isZonasiCompetitive
                      ? 'Jarak tempat tinggal masih berada dalam rentang kuota tahun lalu, namun disarankan menyiapkan alternatif sertifikat prestasi sebagai proteksi cadangan.'
                      : 'Jarak melampaui batas aman zonasi tahun sebelumnya. Kami menyarankan Anda mendaftar melalui jalur prestasi nilai rapor atau jalur afirmasi.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <label
                      htmlFor={scoreId}
                      className="block font-sans font-bold text-sm sm:text-base text-neo-ink mb-2"
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
                        className="flex-1 accent-neo-ink cursor-pointer h-2 bg-neo-surface-2 rounded-lg"
                      />
                      <span className="font-mono text-lg font-bold text-neo-ink min-w-[70px] text-right bg-neo-surface-2 border-2 border-neo-ink px-2 py-1 shadow-neo-sm">
                        {reportScore.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={certId}
                      className="block font-sans font-bold text-sm sm:text-base text-neo-ink mb-2"
                    >
                      Piagam Kejuaraan Berjenjang Resmi (OSN/O2SN/FLS2N):
                    </label>
                    <select
                      id={certId}
                      value={certLevel}
                      onChange={(e) => setCertLevel(Number(e.target.value))}
                      className="w-full p-3 bg-neo-surface border-2 border-neo-ink shadow-neo-sm font-sans text-sm font-medium text-neo-ink focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                    >
                      <option value={0}>Tidak Ada Piagam / Non-kejuaraan (+0.0)</option>
                      <option value={1}>Tingkat Kecamatan / Eks-Karesidenan (+1.5)</option>
                      <option value={2}>Juara 1–3 Tingkat Kabupaten (+3.0)</option>
                      <option value={3}>Juara 1–3 Tingkat Provinsi (+5.0)</option>
                      <option value={4}>Juara 1–3 Tingkat Nasional / Internasional (+10.0)</option>
                    </select>
                  </div>

                  <p className="font-mono text-xs text-neo-ink-3 leading-relaxed">
                    Rumus bobot: (Nilai Rapor &times; 70%) + (Poin Piagam &times; 3). Cut-off historis jalur prestasi berada di kisaran <strong>92.80</strong>.
                  </p>
                </div>

                <div className="lg:col-span-6 bg-neo-bg border-2 border-neo-ink shadow-neo p-6 rounded-sm">
                  <span className="font-mono text-xs uppercase tracking-wider text-neo-ink-3">
                    Estimasi Skor Bobot Akhir
                  </span>

                  <div className="font-mono text-4xl sm:text-5xl font-extrabold text-neo-ink my-3">
                    {totalPrestasi.toFixed(2)}
                  </div>

                  <div className="mb-3">
                    <span
                      className={`inline-block font-mono text-xs font-bold uppercase px-3 py-1 border-2 border-neo-ink shadow-neo-sm ${
                        isPrestasiSafe ? 'bg-neon-lime text-neo-ink' : 'bg-neon-yellow text-neo-ink'
                      }`}
                    >
                      {isPrestasiSafe ? 'Ambang Batas Unggul (Aman)' : 'Zona Kompetitif Ketat'}
                    </span>
                  </div>

                  <p className="text-neo-ink-2 text-sm leading-relaxed">
                    {isPrestasiSafe
                      ? 'Skor Anda melampaui cut-off historis jalur prestasi SMAN 1 Klaten. Peluang lolos seleksi jalur prestasi sangat kuat dengan syarat keabsahan sertifikat terverifikasi panitia.'
                      : 'Skor mendekati ambang batas seleksi jalur prestasi. Pastikan keabsahan sertifikat dan kelengkapan berkas terverifikasi resmi oleh panitia sekolah.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Linimasa Pendaftaran */}
        <section aria-labelledby="timeline-heading" className="mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-neo-ink">
            <div>
              <span className="bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold inline-block mb-2">
                Linimasa Pelaksanaan
              </span>
              <h2 id="timeline-heading" className="font-serif text-2xl sm:text-4xl font-bold text-neo-ink">
                Tahapan Resmi PPDB 2026
              </h2>
            </div>
            <p className="font-mono text-xs text-neo-ink-3 max-w-xs">
              Jadwal pelaksanaan serentak Provinsi Jawa Tengah Tahun Ajaran 2026/2027.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIMELINE_DATA.map((item) => (
              <div
                key={item.step}
                className="bg-neo-surface border-2 border-neo-ink shadow-neo p-6 rounded-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-extrabold text-neo-ink bg-neon-lime border-2 border-neo-ink px-2.5 py-0.5 shadow-neo-sm">
                      {item.step}
                    </span>
                    <span className="font-mono text-xs font-bold text-neo-ink bg-neo-surface-2 border border-neo-ink px-2 py-0.5">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-lg text-neo-ink mb-2">
                    {item.phase}
                  </h3>

                  <p className="text-neo-ink-2 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Berkas Persyaratan */}
        <section aria-labelledby="req-heading" className="mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b-2 border-neo-ink">
            <div>
              <span className="bg-neon-yellow text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold inline-block mb-2">
                Dokumen Administrasi
              </span>
              <h2 id="req-heading" className="font-serif text-2xl sm:text-4xl font-bold text-neo-ink">
                Berkas yang Perlu Disiapkan
              </h2>
            </div>
            <p className="font-mono text-xs text-neo-ink-3 max-w-xs">
              Siapkan dokumen fisik dan salinan digital pindaian format PDF/JPG.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REQUIREMENTS_DATA.map((req, idx) => (
              <div
                key={idx}
                className="bg-neo-surface border-2 border-neo-ink shadow-neo-sm p-4 flex items-start gap-3 rounded-sm"
              >
                <span className="font-mono text-xs font-bold bg-neon-lime text-neo-ink border border-neo-ink px-2 py-0.5 flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-neo-ink-2 text-xs sm:text-sm leading-snug">
                  {req}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Bantuan & Helpdesk Banner */}
        <section aria-labelledby="helpdesk-heading" className="mb-12">
          <div className="bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo-lg p-8 sm:p-10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="bg-neo-surface text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-2.5 py-0.5 font-bold inline-block mb-3">
                Layanan Informasi &amp; Meja Bantuan
              </span>
              <h3 id="helpdesk-heading" className="font-serif text-2xl sm:text-3xl font-extrabold text-neo-ink mb-2">
                Perlu Bantuan Memilih Jalur?
              </h3>
              <p className="text-neo-ink text-sm sm:text-base max-w-xl leading-relaxed">
                Tanyakan estimasi zonasi domisili, ketentuan piagam kejuaraan, atau verifikasi berkas bersama petugas helpdesk di Gedung Utama SMAN 1 Klaten atau asisten virtual SmansaBot AI.
              </p>
            </div>

            <a
              href="/#chatbot"
              className="inline-flex items-center gap-2 bg-neo-surface hover:bg-neon-cyan text-neo-ink border-2 border-neo-ink shadow-neo px-6 py-3 font-mono font-bold text-sm uppercase tracking-wider transition-all whitespace-nowrap"
            >
              Tanya SmansaBot AI &rarr;
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
