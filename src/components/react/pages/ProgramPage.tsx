import { useState, useMemo, type FC } from 'react';

interface AcademicTrack {
  id: string;
  name: string;
  engName: string;
  badge: string;
  color: string;
  summary: string;
  coreSubjects: string[];
  focusPillars: string[];
  careerOutlooks: string[];
}

interface ExtraCurricular {
  id: string;
  name: string;
  category: 'organisasi' | 'sains-tek' | 'seni-bahasa' | 'olahraga' | 'sosial-rohani';
  categoryLabel: string;
  desc: string;
  logo: string;
  schedule: string;
}

const academicTracks: AcademicTrack[] = [
  {
    id: 'mipa-riset',
    name: 'MIPA, Rekayasa & Kelas Riset Ilmiah',
    engName: 'Natural Science & Innovation Hub',
    badge: 'Sains & Teknologi',
    color: 'bg-neon-lime',
    summary: 'Penguatan nalar deduktif matematika analitis, sains murni (Fisika, Kimia, Biologi), metodologi penelitian ilmiah remaja, dan persiapan intensif olimpiade sains nasional (OSN).',
    coreSubjects: [
      'Matematika Tingkat Lanjut & Kalkulus Dasar',
      'Fisika Analitis & Eksperimen Laboratorium',
      'Kimia Organik & Biokimia Terapan',
      'Biologi Sel, Genetika & Ekologi Lapangan',
      'Informatika Pemrograman Algoritma (Python/C++)'
    ],
    focusPillars: [
      'Praktikum Terjadwal di 3 Laboratorium Sains',
      'Penulisan Karya Tulis Ilmiah Remaja Wajib (KIR)',
      'Bimbingan Intensif Kompetisi Sains Nasional'
    ],
    careerOutlooks: [
      'Pendidikan Kedokteran & Biomedis',
      'Teknik Elektro, Mesin & Informatika (ITB, UGM, UI)',
      'Aktuaria, Matematika Murni & Bioteknologi'
    ]
  },
  {
    id: 'ips-kreatif',
    name: 'Ilmu Sosial, Geopolitik & Ekonomi Kreatif',
    engName: 'Social Dynamics & Economic Literacy',
    badge: 'Sosial & Humaniora',
    color: 'bg-neon-cyan',
    summary: 'Pemahaman kritis dinamika masyarakat, geopolitik global, literasi keuangan modern, kewirausahaan berbasis riset, serta analisis data kebijakan publik.',
    coreSubjects: [
      'Ekonomi Makro, Mikro & Pasar Modal',
      'Sosiologi Terapan & Perubahan Sosial',
      'Geografi Spasial, SIG & Mitigasi Kebencanaan',
      'Sejarah Tingkat Lanjut & Kajian Arsip Bangsa',
      'Antropologi Budaya Nusantara & Global'
    ],
    focusPillars: [
      'Laboratorium Simulasi Bursa Saham & Fintech',
      'Kajian Lapangan Sosiologis & Etnografi Klaten',
      'Klinik Debat Hukum Tata Negara & Kebijakan Publik'
    ],
    careerOutlooks: [
      'Ilmu Hukum, Tata Negara & Advokasi',
      'Manajemen Bisnis, Akuntansi & Perbankan',
      'Hubungan Internasional & Kebijakan Publik'
    ]
  },
  {
    id: 'bahasa-global',
    name: 'Bahasa, Diplomasi & Budaya Global',
    engName: 'Global Communication & Humanities',
    badge: 'Bahasa & Diplomasi',
    color: 'bg-neon-yellow',
    summary: 'Penguasaan kemahiran multibahasa (Bahasa Indonesia sastra, Bahasa Inggris diplomasi, Bahasa Jepang/Jerman), retorika komunikasi publik, dan literasi antarbangsa.',
    coreSubjects: [
      'Bahasa & Sastra Indonesia Tingkat Lanjut',
      'Bahasa Inggris Akademik & Retorika Diplomasi',
      'Bahasa Asing Pilihan (Jepang / Jerman)',
      'Kajian Filologi & Sastra Daerah Adiluhung',
      'Jurnalisme Investigatif & Komunikasi Massa'
    ],
    focusPillars: [
      'Sidang Model United Nations (MUN) Dwibahasa',
      'Penerbitan Antologi Sastra & Majalah JUJU',
      'Program Kolaborasi Budaya & Pertukaran Pelajar'
    ],
    careerOutlooks: [
      'Korps Diplomatik & Hubungan Internasional',
      'Linguistik Terapan, Penerjemahan & Penyiaran',
      'Komunikasi Strategis & Industri Kreatif Global'
    ]
  }
];

const curriculumPhases = [
  {
    phase: 'Fase E (Kelas X)',
    theme: 'Fondasi, Pengenalan Diri & Eksplorasi Minat',
    hours: '44 JP per Minggu (Intrakurikuler & P5)',
    points: [
      'Pembelajaran seluruh mata pelajaran umum secara berimbang untuk memetakan potensi peserta didik.',
      'Asesmen diagnostik minat, bakat, dan gaya belajar bekerja sama dengan lembaga psikologi terakreditasi.',
      'Pelaksanaan 3 tema Projek Penguatan Profil Pelajar Pancasila (P5) berbasis kearifan lokal Klaten.',
      'Sosialisasi mata pelajaran pilihan Fase F bersama guru Bimbingan Konseling (BK) dan orang tua.'
    ]
  },
  {
    phase: 'Fase F (Kelas XI & XII)',
    theme: 'Konsentrasi Peminatan, Riset Mandiri & Persiapan PTN',
    hours: '44 JP per Minggu (Mapel Wajib + 20-22 JP Mapel Pilihan)',
    points: [
      'Siswa memilih 4 hingga 5 mata pelajaran pilihan sesuai rencana karier dan program studi perguruan tinggi.',
      'Pengayaan materi olimpiade, pendalaman riset laboratorium, serta penulisan tugas akhir siswa kelas XII.',
      'Try out berkala seleksi nasional berbasis tes (SNBT), bimbingan portofolio SNBP, dan jalur mandiri PTN ternama.',
      'Pelaksanaan pameran karya akhir Projek P5 dan gelar inovasi sains tahunan SMAN 1 Klaten.'
    ]
  }
];

const extracurriculars: ExtraCurricular[] = [
  {
    id: 'osmansa',
    name: 'OSMANSA',
    category: 'organisasi',
    categoryLabel: 'Organisasi & Kepemimpinan',
    desc: 'Organisasi Siswa Intra Sekolah resmi SMAN 1 Klaten yang menggerakkan seluruh program kerja kesiswaan, kepanitiaan, dan kepemimpinan berintegritas.',
    logo: '/images/logoekstra/Osmansa.png',
    schedule: 'Rapat Koordinasi Mingguan'
  },
  {
    id: 'mpk',
    name: 'MPK',
    category: 'organisasi',
    categoryLabel: 'Organisasi & Kepemimpinan',
    desc: 'Majelis Permusyawaratan Kelas yang memegang fungsi legislatif, evaluasi kinerja OSIS, dan penyaluran aspirasi perwakilan kelas.',
    logo: '/images/logoekstra/MPK.png',
    schedule: 'Sidang Pleno Triwulanan'
  },
  {
    id: 'dewan-ambalan',
    name: 'Dewan Ambalan',
    category: 'organisasi',
    categoryLabel: 'Organisasi & Kepemimpinan',
    desc: 'Ambalan Diponegoro - Dewi Sartika, gerakan Pramuka Penegak Gugus Depan SMAN 1 Klaten pembina ketangguhan fisik dan darma bakti.',
    logo: '/images/logoekstra/DewanAmbalanNew.png',
    schedule: 'Jumat, 15.30 WIB'
  },
  {
    id: 'prata',
    name: 'PRATA',
    category: 'organisasi',
    categoryLabel: 'Organisasi & Kepemimpinan',
    desc: 'Pratiyodha Paramita, korps Pasukan Pengibar Bendera Pusaka sekolah berdisiplin baja dan pengawal upacara bendera kenegaraan.',
    logo: '/images/logoekstra/prata.png',
    schedule: 'Selasa & Kamis, 15.30 WIB'
  },
  {
    id: 'emapal',
    name: 'EMAPAL',
    category: 'organisasi',
    categoryLabel: 'Pecinta Alam & Konservasi',
    desc: 'Emansipasi Pecinta Alam, wadah penjelajahan alam bebas, navigasi darat, pendakian gunung, serta pelopor konservasi Sekolah Adiwiyata.',
    logo: '/images/logoekstra/Emapala.png',
    schedule: 'Rabu, 15.30 WIB'
  },
  {
    id: 'kir',
    name: 'KIR Padmawijaya',
    category: 'sains-tek',
    categoryLabel: 'Sains & Riset Ilmiah',
    desc: 'Kelompok Ilmiah Remaja pembina metodologi riset sains alam dan humaniora, langganan juara lomba karya tulis ilmiah tingkat nasional.',
    logo: '/images/logoekstra/KIR.png',
    schedule: 'Senin & Kamis, 15.30 WIB'
  },
  {
    id: 'secure',
    name: 'SECURE',
    category: 'sains-tek',
    categoryLabel: 'Teknologi & Informatika',
    desc: 'SMANSA Educational, Computing, and Research: inkubator pemrograman komputer, web development, keamanan siber, dan persiapan OSN Informatika.',
    logo: '/images/logoekstra/Secure.png',
    schedule: 'Rabu, 15.30 WIB'
  },
  {
    id: 'icomsa',
    name: 'Icomsa',
    category: 'sains-tek',
    categoryLabel: 'Teknologi & Robotika',
    desc: 'Komunitas rekayasa elektronika, robotika mikrokontroler Arduino/ESP32, otomasi cerdas, dan sains terapan generasi muda.',
    logo: '/images/logoekstra/Icomsa.png',
    schedule: 'Selasa, 15.30 WIB'
  },
  {
    id: 'sakla-music',
    name: 'Sakla Music',
    category: 'seni-bahasa',
    categoryLabel: 'Kesenian Musik',
    desc: 'Komunitas kreasi musik modern, festival band antarpelajar, mastering instrumen gitar, bass, drum, keyboard, dan aransemen akustik.',
    logo: '/images/logoekstra/SaklaMusic.png',
    schedule: 'Rabu, 15.30 WIB'
  },
  {
    id: 'sakla-voice',
    name: 'Sakla Voice',
    category: 'seni-bahasa',
    categoryLabel: 'Paduan Suara & Vokal',
    desc: 'Paduan suara resmi SMAN 1 Klaten peraih kejuaraan FLS2N, melatih harmonisasi partitur vokal SATB untuk upacara dan konser tahunan.',
    logo: '/images/logoekstra/SaklaVoice.png',
    schedule: 'Senin, 15.30 WIB'
  },
  {
    id: 'juju',
    name: 'JUJU (Junior Jurnalistik)',
    category: 'seni-bahasa',
    categoryLabel: 'Jurnalistik & Literasi',
    desc: 'Redaksi majalah sekolah JUJU, melatih reportase berita, teknik wawancara narasumber, penulisan opini mendalam, dan penerbitan berkala.',
    logo: '/images/logoekstra/JujuNew.png',
    schedule: 'Kamis, 15.30 WIB'
  },
  {
    id: 'ec',
    name: 'EC (English Club)',
    category: 'seni-bahasa',
    categoryLabel: 'Bahasa & Diplomasi',
    desc: 'Klub bahasa Inggris unggulan pemegang gelar debat LDBI & NSDC, Model UN, speech contest, dan story telling antarsekolah.',
    logo: '/images/logoekstra/EC.png',
    schedule: 'Selasa, 15.30 WIB'
  },
  {
    id: 'sparkle',
    name: 'Sparkle Dance Club',
    category: 'seni-bahasa',
    categoryLabel: 'Seni Tari Kreasi',
    desc: 'Komunitas seni tari modern dan kontemporer yang memadukan keindahan koreografi modern dance dengan spirit gerak tradisional.',
    logo: '/images/logoekstra/Sparkle.png',
    schedule: 'Rabu & Jumat, 15.30 WIB'
  },
  {
    id: 'tsl',
    name: 'TSL (Teater Sapu Lidi)',
    category: 'seni-bahasa',
    categoryLabel: 'Seni Teater & Peran',
    desc: 'Kelompok teater legendaris SMAN 1 Klaten yang membedah naskah drama, olah rasa panggung, tata artistik, dan pementasan monolog.',
    logo: '/images/logoekstra/TSL.png',
    schedule: 'Kamis, 15.30 WIB'
  },
  {
    id: 'daco',
    name: 'DACO (Drawing Art)',
    category: 'seni-bahasa',
    categoryLabel: 'Seni Rupa & Desain',
    desc: 'Drawing Art Community wadah eksplorasi sketsa arsitektur, lukis kanvas, ilustrasi digital komik, kriya, dan pameran galeri seni tahunan.',
    logo: '/images/logoekstra/DACO.png',
    schedule: 'Senin, 15.30 WIB'
  },
  {
    id: 'snapshot',
    name: 'SNAPSHOT',
    category: 'seni-bahasa',
    categoryLabel: 'Fotografi & Sinema',
    desc: 'Klub fotografi jurnalistik dan sinematografi digital pengawal dokumentasi seluruh perhelatan akbar dan portofolio multimedia sekolah.',
    logo: '/images/logoekstra/SnapshotNew.png',
    schedule: 'Jumat, 14.30 WIB'
  },
  {
    id: 'hadroh',
    name: 'Al-Zamartanabil',
    category: 'seni-bahasa',
    categoryLabel: 'Seni Hadroh Islami',
    desc: 'Komunitas hadroh shalawat dan rebana klasik yang melestarikan seni musik Islam adiluhung dalam perayaan hari besar keagamaan.',
    logo: '/images/logoekstra/Hadroh.png',
    schedule: 'Kamis, 15.30 WIB'
  },
  {
    id: 'futsal',
    name: 'Futsal Padmawijaya',
    category: 'olahraga',
    categoryLabel: 'Olahraga Futsal',
    desc: 'Tim futsal kebanggaan sekolah peraih gelar Juara Umum O2SN antarpelajar Klaten, mengasah strategi taktik lapangan dan daya tahan raga.',
    logo: '/images/logoekstra/Futsal.png',
    schedule: 'Selasa & Jumat, 15.30 WIB'
  },
  {
    id: 'eagles',
    name: 'Smansa Eagles',
    category: 'olahraga',
    categoryLabel: 'Bola Basket',
    desc: 'Klub basket putra dan putri peraih trofi DBL Central Java Series, membentuk mental tanding juara, kerja sama tim, dan kepemimpinan.',
    logo: '/images/logoekstra/eagles.png',
    schedule: 'Senin & Kamis, 15.30 WIB'
  },
  {
    id: 'recsa',
    name: 'RECSA (PMR Wira)',
    category: 'sosial-rohani',
    categoryLabel: 'Kemanusiaan & PMR',
    desc: 'Red Cross of SMANSA unit Palang Merah Remaja Wira, garda terdepan siaga bencana, pertolongan pertama gawat darurat, dan bakti sosial.',
    logo: '/images/logoekstra/Recsa.png',
    schedule: 'Rabu, 15.30 WIB'
  },
  {
    id: 'romansa',
    name: 'ROMANSA',
    category: 'sosial-rohani',
    categoryLabel: 'Kerohanian Islam',
    desc: 'Rohani Islam SMAN 1 Klaten pusat pendampingan kajian taklim, peringatan isra mi\'raj/maulid nabi, dan pembinaan karakter akhlakul karimah.',
    logo: '/images/logoekstra/Romansa.png',
    schedule: 'Jumat Siang Ba\'da Salat'
  },
  {
    id: 'persik',
    name: 'PERSIK',
    category: 'sosial-rohani',
    categoryLabel: 'Kerohanian Kristen',
    desc: 'Persekutuan Rohani Kristen pembina persekutuan doa rutin, retreat rohani pemuda, dan pemupukan kasih persaudaraan antarwarga sekolah.',
    logo: '/images/logoekstra/Persik.png',
    schedule: 'Jumat, 11.30 WIB'
  },
  {
    id: 'perkasa',
    name: 'PERKASA',
    category: 'sosial-rohani',
    categoryLabel: 'Kerohanian Katolik',
    desc: 'Pelajar Katolik SMANSA wadah pendalaman iman kristiani, rekoleksi bersama, misa pelajar, dan aksi panggilan sosial di masyarakat.',
    logo: '/images/logoekstra/Perkasa.png',
    schedule: 'Jumat, 11.30 WIB'
  }
];

export const ProgramPage: FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>('mipa-riset');
  const [extraFilter, setExtraFilter] = useState<string>('all');
  const [extraSearch, setExtraSearch] = useState<string>('');

  const extraCategories = [
    { key: 'all', label: 'Semua 23 Ekskul' },
    { key: 'organisasi', label: 'Kepemimpinan & Organisasi' },
    { key: 'sains-tek', label: 'Sains, Riset & Teknologi' },
    { key: 'seni-bahasa', label: 'Kesenian, Budaya & Bahasa' },
    { key: 'olahraga', label: 'Olahraga & Prestasi' },
    { key: 'sosial-rohani', label: 'Kerohanian & Kemanusiaan' }
  ];

  const filteredExtras = useMemo(() => {
    return extracurriculars.filter((item) => {
      const matchCategory = extraFilter === 'all' || item.category === extraFilter;
      const q = extraSearch.toLowerCase();
      const matchSearch =
        extraSearch.trim() === '' ||
        item.name.toLowerCase().indexOf(q) !== -1 ||
        item.desc.toLowerCase().indexOf(q) !== -1 ||
        item.categoryLabel.toLowerCase().indexOf(q) !== -1;

      return matchCategory && matchSearch;
    });
  }, [extraFilter, extraSearch]);

  const activeTrackData = useMemo(() => {
    return academicTracks.filter((t) => t.id === selectedTrack)[0] || academicTracks[0];
  }, [selectedTrack]);

  return (
    <div className="bg-neo-bg text-neo-ink">
      {/* Header Banner */}
      <section className="border-b-2 border-neo-ink bg-neo-surface py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="inline-block bg-neon-lime text-neo-ink border-2 border-neo-ink px-3 py-1 font-mono font-bold text-xs uppercase tracking-wider shadow-neo-sm mb-4">
            Kurikulum Merdeka & Ekosistem Siswa
          </div>
          <h1 className="font-sans font-extrabold text-3xl md:text-5xl text-neo-ink leading-tight mb-4 tracking-tight">
            Program Akademik & 23 Ekstrakurikuler
          </h1>
          <p className="text-neo-ink-2 font-medium text-base md:text-lg max-w-3xl leading-relaxed">
            Struktur pembelajaran berorientasi masa depan yang memfasilitasi 3 peminatan disiplin ilmu,
            pembinaan riset laboratorium analitis, serta katalog lengkap 23 ekstrakurikuler resmi di SMAN 1 Klaten.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8">
            <div className="bg-neo-bg border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs text-neo-ink-3 uppercase block font-bold">Kurikulum Resmi</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink">Kurikulum Merdeka</span>
            </div>
            <div className="bg-neon-cyan text-neo-ink border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs uppercase block font-bold text-neo-ink-3">Peminatan Utama</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink">3 Rumpun Ilmu</span>
            </div>
            <div className="bg-neon-yellow text-neo-ink border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs uppercase block font-bold text-neo-ink-3">Bakat & Minat</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink">23 Ekstrakurikuler</span>
            </div>
            <div className="bg-neon-lime text-neo-ink border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs uppercase block font-bold text-neo-ink-3">Karakter Siswa</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink">Profil Pancasila</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tiga Pilar Peminatan Akademik */}
      <section className="py-12 md:py-16 max-w-6xl mx-auto px-4 md:px-6">
        <div className="mb-8">
          <div className="inline-block bg-neon-cyan text-neo-ink border-2 border-neo-ink px-3 py-1 font-mono font-bold text-xs uppercase tracking-wider shadow-neo-sm mb-2">
            Pilihan Fase F
          </div>
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-neo-ink tracking-tight mb-2">
            Tiga Peminatan Akademik SMAN 1 Klaten
          </h2>
          <p className="text-neo-ink-2 font-medium text-sm md:text-base max-w-2xl">
            Siswa menentukan kombinasi mata pelajaran pilihan sesuai arah studi lanjut di perguruan tinggi dengan pendampingan psikotes diagnostik dan konseling BK.
          </p>
        </div>

        {/* Track Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8" role="tablist">
          {academicTracks.map((track) => (
            <button
              key={track.id}
              type="button"
              onClick={() => setSelectedTrack(track.id)}
              className={`p-4 border-2 border-neo-ink text-left transition-all ${
                selectedTrack === track.id
                  ? 'bg-neo-surface shadow-neo border-3'
                  : 'bg-neo-surface-2/60 shadow-neo-sm hover:bg-neo-surface hover:-translate-x-0.5 hover:-translate-y-0.5'
              }`}
              role="tab"
              aria-selected={selectedTrack === track.id}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono font-bold text-xs px-2 py-0.5 border border-neo-ink ${track.color} text-neo-ink`}>
                  {track.badge}
                </span>
                <span className="font-mono text-xs text-neo-ink-3 font-bold">
                  {selectedTrack === track.id ? '● Terpilih' : 'Pilih'}
                </span>
              </div>
              <h3 className="font-sans font-extrabold text-base md:text-lg text-neo-ink">
                {track.name}
              </h3>
              <p className="font-mono text-xs text-neo-ink-3 mt-1">
                {track.engName}
              </p>
            </button>
          ))}
        </div>

        {/* Detail Selected Track Card */}
        <div className="bg-neo-surface border-3 border-neo-ink shadow-neo p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b-2 border-neo-ink/20 mb-6">
            <div>
              <span className={`inline-block font-mono font-bold text-xs px-3 py-1 border border-neo-ink ${activeTrackData.color} text-neo-ink mb-2`}>
                Rumpun {activeTrackData.badge}
              </span>
              <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-neo-ink">
                {activeTrackData.name}
              </h3>
            </div>
            <a
              href="/#chatbot"
              className="font-mono font-bold text-xs px-4 py-2 bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo-sm hover:shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              Konsultasi Jurusan ke SmansaBot &rarr;
            </a>
          </div>

          <p className="text-base text-neo-ink-2 leading-relaxed mb-8">
            {activeTrackData.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mata Pelajaran Pilihan */}
            <div className="bg-neo-bg border-2 border-neo-ink p-4">
              <span className="font-mono text-xs font-bold text-neo-ink uppercase block mb-3 pb-2 border-b border-neo-ink/20">
                Mata Pelajaran Pilihan:
              </span>
              <ul className="space-y-2">
                {activeTrackData.coreSubjects.map((sub, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-neo-ink-2">
                    <span className="text-neo-ink font-mono font-bold">■</span>
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pilar Pembinaan Riset */}
            <div className="bg-neo-bg border-2 border-neo-ink p-4">
              <span className="font-mono text-xs font-bold text-neo-ink uppercase block mb-3 pb-2 border-b border-neo-ink/20">
                Pilar Pembinaan Unggulan:
              </span>
              <ul className="space-y-2">
                {activeTrackData.focusPillars.map((pil, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-neo-ink-2">
                    <span className="text-neo-ink font-mono font-bold">✦</span>
                    <span>{pil}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prospek Studi Lanjut */}
            <div className="bg-neo-bg border-2 border-neo-ink p-4">
              <span className="font-mono text-xs font-bold text-neo-ink uppercase block mb-3 pb-2 border-b border-neo-ink/20">
                Target Program Studi PTN:
              </span>
              <ul className="space-y-2">
                {activeTrackData.careerOutlooks.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-neo-ink-2">
                    <span className="text-neo-ink font-mono font-bold">&rarr;</span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur Kurikulum Merdeka (Fase E & Fase F) */}
      <section className="py-12 md:py-16 border-t-2 border-neo-ink bg-neo-surface-2/40">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="mb-8">
            <div className="inline-block bg-neon-yellow text-neo-ink border-2 border-neo-ink px-3 py-1 font-mono font-bold text-xs uppercase tracking-wider shadow-neo-sm mb-2">
              Struktur Pembelajaran
            </div>
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-neo-ink tracking-tight mb-2">
              Implementasi Kurikulum Merdeka Terintegrasi
            </h2>
            <p className="text-neo-ink-2 font-medium text-sm md:text-base max-w-2xl">
              Memadukan kurikulum intrakurikuler berbobot, penguatan nalar ilmiah mandiri, dan kokurikuler Projek Penguatan Profil Pelajar Pancasila (P5).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curriculumPhases.map((phase, idx) => (
              <div key={idx} className="bg-neo-surface border-2 border-neo-ink shadow-neo p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-neon-lime text-neo-ink border border-neo-ink">
                      {phase.phase}
                    </span>
                    <span className="font-mono text-xs font-bold text-neo-ink-3">
                      {phase.hours}
                    </span>
                  </div>
                  <h3 className="font-sans font-extrabold text-lg md:text-xl text-neo-ink mb-3">
                    {phase.theme}
                  </h3>
                  <ul className="space-y-2.5 mb-6">
                    {phase.points.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs md:text-sm text-neo-ink-2 leading-relaxed">
                        <span className="text-neo-ink font-bold mt-0.5">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-neo-ink/20 font-mono text-xs text-neo-ink-3 flex items-center justify-between">
                  <span>Asesmen Formatif & Sumatif</span>
                  <span className="text-neo-ink font-bold">Terstandarisasi BAN-SM</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Katalog 23 Ekstrakurikuler Resmi Lengkap */}
      <section className="py-12 md:py-16 border-t-2 border-neo-ink bg-neo-bg" id="ekstrakurikuler-resmi">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-block bg-neon-magenta text-neo-surface border-2 border-neo-ink px-3 py-1 font-mono font-bold text-xs uppercase tracking-wider shadow-neo-sm mb-2">
                Minat, Bakat & Kepemimpinan
              </div>
              <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-neo-ink tracking-tight mb-2">
                Katalog 23 Ekstrakurikuler Resmi
              </h2>
              <p className="text-neo-ink-2 font-medium text-sm md:text-base max-w-2xl">
                Wadah aktualisasi diri seluruh peserta didik di bidang kepemimpinan organisasi, riset olimpiade, kreativitas seni, keolahragaan, dan kerohanian.
              </p>
            </div>
            <div className="text-left md:text-right">
              <span className="font-mono text-xs font-bold text-neo-ink bg-neon-yellow border border-neo-ink px-3 py-1 shadow-neo-sm">
                Total 23 Unit Aktif Terdaftar
              </span>
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="bg-neo-surface border-2 border-neo-ink shadow-neo p-4 md:p-6 mb-8 space-y-4">
            <div>
              <label htmlFor="search-ekskul" className="font-mono text-xs font-bold text-neo-ink uppercase block mb-1.5">
                Cari Ekstrakurikuler:
              </label>
              <input
                id="search-ekskul"
                type="text"
                value={extraSearch}
                onChange={(e) => setExtraSearch(e.target.value)}
                placeholder="Ketik nama ekskul (contoh: OSMANSA, Eagles, KIR, SECURE, Sakla...)"
                className="w-full bg-neo-bg border-2 border-neo-ink px-3 py-2 font-mono text-sm text-neo-ink placeholder:text-neo-ink-3 shadow-neo-sm focus:outline-hidden"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neo-ink/20">
              <span className="font-mono text-xs font-bold text-neo-ink-3 uppercase mr-1">Filter Kategori:</span>
              {extraCategories.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setExtraFilter(c.key)}
                  className={`font-mono text-xs font-bold px-3 py-1.5 border border-neo-ink transition-all ${
                    extraFilter === c.key
                      ? 'bg-neo-ink text-neo-surface shadow-neo-sm'
                      : 'bg-neo-bg text-neo-ink hover:bg-neo-surface-2'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs font-bold text-neo-ink-3">
              Menampilkan <span className="text-neo-ink">{filteredExtras.length}</span> dari 23 ekstrakurikuler
            </span>
            {(extraFilter !== 'all' || extraSearch !== '') && (
              <button
                type="button"
                onClick={() => {
                  setExtraFilter('all');
                  setExtraSearch('');
                }}
                className="font-mono text-xs font-bold text-neo-ink underline"
              >
                Reset Filter ✕
              </button>
            )}
          </div>

          {/* Extracurriculars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExtras.map((extra) => (
              <article
                key={extra.id}
                className="bg-neo-surface border-2 border-neo-ink shadow-neo hover:shadow-neo-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    {/* Logo Box */}
                    <div className="w-14 h-14 bg-neo-bg border-2 border-neo-ink shadow-neo-sm p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={extra.logo}
                        alt={`Logo ${extra.name}`}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                        width={48}
                        height={48}
                        onError={(e) => {
                          // Fallback placeholder jika gambar gagal dimuat
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] font-bold text-neo-ink-3 block uppercase">
                        {extra.categoryLabel}
                      </span>
                      <h3 className="font-sans font-extrabold text-lg text-neo-ink">
                        {extra.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-neo-ink-2 leading-relaxed mb-4">
                    {extra.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-neo-ink/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-neo-ink-3 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 bg-neon-lime border border-neo-ink rounded-full"></span>
                    {extra.schedule}
                  </span>
                  <span className="font-bold text-neo-ink">Terakreditasi</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 border-t-2 border-neo-ink bg-neo-surface">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="bg-neo-bg border-3 border-neo-ink shadow-neo p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="inline-block bg-neon-lime text-neo-ink border-2 border-neo-ink font-mono font-bold text-xs px-2.5 py-0.5 mb-2 shadow-neo-sm">
                Informasi Registrasi Kesiswaan
              </span>
              <h3 className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink mb-2">
                Pendaftaran Ekstrakurikuler Siswa Baru
              </h3>
              <p className="text-sm text-neo-ink-2 max-w-2xl leading-relaxed">
                Setiap peserta didik baru wajib memilih 1 ekstrakurikuler kepemimpinan/pramuka dan maksimal 2 ekstrakurikuler minat bakat saat masa orientasi kesiswaan (MPLS).
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href="/kontak"
                className="inline-block text-center font-mono font-bold text-xs uppercase px-5 py-3 bg-neon-yellow text-neo-ink border-2 border-neo-ink shadow-neo-sm hover:shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                Tanya Kesiswaan &rarr;
              </a>
              <a
                href="/prestasi"
                className="inline-block text-center font-mono font-bold text-xs uppercase px-5 py-3 bg-neo-surface text-neo-ink border-2 border-neo-ink shadow-neo-sm hover:bg-neo-surface-2 transition-all"
              >
                Lihat Prestasi Siswa &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramPage;
