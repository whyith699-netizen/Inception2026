import { useState, useMemo, type FC } from 'react';

interface AcademicTrack {
  id: string;
  name: string;
  engName: string;
  badge: string;
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
    schedule: 'Jumat Siang'
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
    { key: 'organisasi', label: 'Organisasi & Kepemimpinan' },
    { key: 'sains-tek', label: 'Sains & Teknologi' },
    { key: 'seni-bahasa', label: 'Kesenian & Bahasa' },
    { key: 'olahraga', label: 'Olahraga' },
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
      {/* 1. Page Header (Editorial) */}
      <section className="py-12 sm:py-16 border-b border-neo-ink bg-neo-bg">
        <div className="container">
          <span className="lbl lbl-lime mb-3 inline-block">KURIKULUM & KESISWAAN</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neo-ink mb-4 max-w-3xl leading-[1.15]">
            Program Akademik & 23 Ekstrakurikuler
          </h1>
          <p className="text-neo-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            Struktur pembelajaran berorientasi masa depan yang memfasilitasi 3 peminatan disiplin ilmu, pembinaan riset laboratorium sains, serta katalog lengkap 23 ekstrakurikuler resmi di SMAN 1 Klaten.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl pt-6 border-t border-neo-ink">
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">Merdeka</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Kurikulum Resmi</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">3 Rumpun</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Peminatan Utama</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">23 Unit</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Ekstrakurikuler</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">Pancasila</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Penguatan Profil</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tiga Peminatan Akademik */}
      <section className="py-12 sm:py-16 border-b border-neo-ink">
        <div className="container">
          <div className="mb-8">
            <span className="lbl lbl-lime mb-2 inline-block">PILIHAN FASE F</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neo-ink">
              Tiga Peminatan Akademik SMAN 1 Klaten
            </h2>
            <p className="text-neo-ink-2 text-sm sm:text-base mt-1">
              Siswa menentukan kombinasi mata pelajaran pilihan sesuai arah studi lanjut di perguruan tinggi.
            </p>
          </div>

          {/* Track Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8" role="tablist">
            {academicTracks.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedTrack(track.id)}
                className={`p-4 border border-neo-ink text-left transition-all cursor-pointer ${
                  selectedTrack === track.id
                    ? 'bg-neo-surface shadow-neo'
                    : 'bg-neo-bg hover:bg-neo-surface-2'
                }`}
                role="tab"
                aria-selected={selectedTrack === track.id}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="lbl lbl-lime text-[10px] px-2 py-0.5">
                    {track.badge}
                  </span>
                  <span className="font-mono text-xs text-neo-ink-3">
                    {selectedTrack === track.id ? '● Terpilih' : 'Pilih'}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-neo-ink">
                  {track.name}
                </h3>
                <p className="font-mono text-xs text-neo-ink-3 mt-1">
                  {track.engName}
                </p>
              </button>
            ))}
          </div>

          {/* Detail Selected Track Card */}
          <div className="bg-neo-surface border border-neo-ink shadow-neo-sm p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neo-ink/20 mb-6">
              <div>
                <span className="lbl lbl-lime text-[10px] px-2 py-0.5 inline-block mb-1">
                  Rumpun {activeTrackData.badge}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-neo-ink">
                  {activeTrackData.name}
                </h3>
              </div>
              <a href="/#chatbot" className="btn btn-secondary text-xs">
                Konsultasi Jurusan &rarr;
              </a>
            </div>

            <p className="text-sm sm:text-base text-neo-ink-2 leading-relaxed mb-6">
              {activeTrackData.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neo-bg border border-neo-ink p-4">
                <span className="font-mono text-xs font-bold text-neo-ink uppercase block mb-3 pb-2 border-b border-neo-ink/10">
                  Mata Pelajaran Pilihan:
                </span>
                <ul className="space-y-1.5 text-xs text-neo-ink-2">
                  {activeTrackData.coreSubjects.map((sub, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-neo-ink font-bold">&bull;</span>
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-neo-bg border border-neo-ink p-4">
                <span className="font-mono text-xs font-bold text-neo-ink uppercase block mb-3 pb-2 border-b border-neo-ink/10">
                  Pilar Pembinaan Unggulan:
                </span>
                <ul className="space-y-1.5 text-xs text-neo-ink-2">
                  {activeTrackData.focusPillars.map((pil, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-neo-ink font-bold">&bull;</span>
                      <span>{pil}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-neo-bg border border-neo-ink p-4">
                <span className="font-mono text-xs font-bold text-neo-ink uppercase block mb-3 pb-2 border-b border-neo-ink/10">
                  Target Studi Lanjut PTN:
                </span>
                <ul className="space-y-1.5 text-xs text-neo-ink-2">
                  {activeTrackData.careerOutlooks.map((out, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-neo-ink font-bold">&rarr;</span>
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Struktur Kurikulum Merdeka */}
      <section className="py-12 sm:py-16 border-b border-neo-ink bg-neo-surface">
        <div className="container">
          <div className="mb-8">
            <span className="lbl lbl-lime mb-2 inline-block">STRUKTUR PEMBELAJARAN</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neo-ink">
              Implementasi Kurikulum Merdeka Terintegrasi
            </h2>
            <p className="text-neo-ink-2 text-sm sm:text-base mt-1">
              Memadukan kurikulum intrakurikuler berbobot, penguatan nalar ilmiah mandiri, dan kokurikuler Projek Penguatan Profil Pelajar Pancasila (P5).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curriculumPhases.map((phase, idx) => (
              <div key={idx} className="bg-neo-bg border border-neo-ink shadow-neo-sm p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-neo-ink/10">
                    <span className="lbl lbl-lime text-[10px] px-2 py-0.5">
                      {phase.phase}
                    </span>
                    <span className="font-mono text-xs text-neo-ink-3">
                      {phase.hours}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-neo-ink mb-3">
                    {phase.theme}
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {phase.points.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs text-neo-ink-2 leading-relaxed">
                        <span className="text-neo-ink font-bold">&check;</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-neo-ink/10 font-mono text-xs text-neo-ink-3 flex items-center justify-between">
                  <span>Asesmen Terstandarisasi</span>
                  <span className="text-neo-ink font-bold">BAN-SM Nilai 98</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Katalog 23 Ekstrakurikuler Resmi */}
      <section className="py-12 sm:py-16" id="ekstrakurikuler-resmi">
        <div className="container">
          <div className="mb-8">
            <span className="lbl lbl-lime mb-2 inline-block">BAKAT & MINAT</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neo-ink">
              Katalog 23 Ekstrakurikuler Resmi
            </h2>
            <p className="text-neo-ink-2 text-sm sm:text-base mt-1">
              Wadah aktualisasi diri seluruh peserta didik di bidang kepemimpinan, riset sains, kreativitas seni, dan keolahragaan.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="bg-neo-surface border border-neo-ink shadow-neo-sm p-5 mb-8 space-y-4">
            <div>
              <input
                id="search-ekskul"
                type="text"
                value={extraSearch}
                onChange={(e) => setExtraSearch(e.target.value)}
                placeholder="Cari ekskul (contoh: OSMANSA, Eagles, KIR, SECURE, Sakla...)"
                className="w-full bg-neo-bg border border-neo-ink px-3 py-2 text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:ring-1 focus:ring-neo-ink font-sans"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neo-ink/10">
              {extraCategories.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setExtraFilter(c.key)}
                  className={`font-mono text-xs px-2.5 py-1 border border-neo-ink transition-all cursor-pointer ${
                    extraFilter === c.key
                      ? 'bg-neon-lime text-neo-ink font-bold shadow-neo-sm'
                      : 'bg-neo-bg text-neo-ink hover:bg-neo-surface-2'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-neo-ink">
            <span className="font-mono text-xs text-neo-ink-2 tabular-nums">
              Menampilkan <strong className="text-neo-ink">{filteredExtras.length}</strong> dari 23 ekstrakurikuler
            </span>
            {(extraFilter !== 'all' || extraSearch !== '') && (
              <button
                type="button"
                onClick={() => {
                  setExtraFilter('all');
                  setExtraSearch('');
                }}
                className="font-mono text-xs text-neo-ink hover:underline"
              >
                Reset Filter &times;
              </button>
            )}
          </div>

          {/* Extracurriculars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExtras.map((extra) => (
              <article
                key={extra.id}
                className="bg-neo-surface border border-neo-ink shadow-neo-sm p-5 flex flex-col justify-between hover:shadow-neo transition-all"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-3 pb-3 border-b border-neo-ink/10">
                    <div className="w-12 h-12 bg-neo-bg border border-neo-ink p-1 flex items-center justify-center shrink-0">
                      <img
                        src={extra.logo}
                        alt={`Logo ${extra.name}`}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                        width={44}
                        height={44}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <span className="lbl lbl-lime text-[10px] px-1.5 py-0.5 inline-block mb-1">
                        {extra.categoryLabel}
                      </span>
                      <h3 className="font-serif font-bold text-base text-neo-ink">
                        {extra.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neo-ink-2 leading-relaxed mb-4">
                    {extra.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-neo-ink/10 flex items-center justify-between text-xs font-mono text-neo-ink-3">
                  <span>Jadwal: {extra.schedule}</span>
                  <span className="font-bold text-neo-ink">Aktif</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Callout */}
      <section className="py-12 sm:py-16 border-t border-neo-ink bg-neo-surface-2">
        <div className="container">
          <div className="bg-neo-surface border border-neo-ink shadow-neo p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="lbl lbl-lime text-[10px] px-2 py-0.5 inline-block mb-2">
                INFORMASI REGISTRASI
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-neo-ink mb-2">
                Pendaftaran Ekstrakurikuler Siswa Baru
              </h3>
              <p className="text-sm text-neo-ink-2 max-w-xl leading-relaxed">
                Setiap peserta didik baru wajib memilih 1 ekstrakurikuler kepemimpinan/pramuka dan maksimal 2 ekstrakurikuler minat bakat saat masa orientasi kesiswaan (MPLS).
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/kontak" className="btn btn-primary text-xs">
                Tanya Kesiswaan &rarr;
              </a>
              <a href="/prestasi" className="btn btn-secondary text-xs">
                Rekam Jejak Prestasi &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramPage;
