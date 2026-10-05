import { useState, type FC } from 'react';

interface FacilityItem {
  id: string;
  name: string;
  category: 'lab' | 'perpus' | 'olahraga' | 'seni' | 'umum';
  categoryLabel: string;
  capacity: string;
  specs: string[];
  desc: string;
  location: string;
  badgeColor: string;
}

const campusPhotos = [
  {
    image: '/images/school/Smansa1.jpg',
    title: 'Gerbang Utama & Fasad Bersejarah',
    area: 'Area Barat Gedung Utama',
    capacity: 'Zona Penyambutan & Protokoler',
    desc: 'Pintu gerbang berarsitektur kolonial cagar budaya yang menjadi ikon SMAN 1 Klaten sejak resmi didirikan pada 5 November 1957.'
  },
  {
    image: '/images/school/Smansa2.jpg',
    title: 'Halaman Dalam & Lapangan Upacara',
    area: 'Pusat Kompleks Sekolah',
    capacity: '1.200 Peserta Upacara',
    desc: 'Halaman luas berlantai paving blok presisi untuk apel bendera hari Senin, peringatan hari besar nasional, dan senam kesegaran jasmani.'
  },
  {
    image: '/images/school/Smansa3.jpg',
    title: 'Kompleks Ruang Kelas Teori & Smart Classroom',
    area: 'Sayap Utara & Timur',
    capacity: '36 Rombel (1.296 Siswa)',
    desc: 'Ruang belajar berstandar sirkulasi silang, pendingin ruangan, proyektor interaktif, dan jaringan Wi-Fi serat optik berkecepatan tinggi.'
  },
  {
    image: '/images/school/Smansa4.jpg',
    title: 'Koridor Laboratorium Sains & Riset',
    area: 'Lantai 1 & 2 Gedung Riset',
    capacity: '36 Siswa per Lab',
    desc: 'Akses penghubung laboratorium Fisika, Kimia, Biologi, dan Komputer dengan display karya ilmiah serta papan keselamatan kerja.'
  },
  {
    image: '/images/school/Smansa5.jpg',
    title: 'Taman Kampus Hijau & Area Diskusi',
    area: 'Kawasan Konservasi Sekolah',
    capacity: '150 Siswa Terbuka',
    desc: 'Ruang terbuka hijau peraih penghargaan Adiwiyata Nasional dengan kanopi pohon rindang, gazebo literasi, dan kolam resapan air.'
  }
];

const facilityData: FacilityItem[] = [
  {
    id: 'lab-fisika',
    name: 'Laboratorium Fisika Terpadu',
    category: 'lab',
    categoryLabel: 'Laboratorium Sains',
    capacity: '36 Siswa Praktikum',
    specs: ['Optik Meja Presisi', 'Sensor Gelombang Vernier', 'Multimeter Digital', 'Kit Mekanika Lanjut'],
    desc: 'Instrumen eksperimen analitis untuk membuktikan hukum mekanika, gelombang bunyi, termodinamika, dan elektromagnetik bagi persiapan OSN.',
    location: 'Gedung Sains Lantai 2',
    badgeColor: 'bg-neon-lime'
  },
  {
    id: 'lab-kimia',
    name: 'Laboratorium Kimia Analitis',
    category: 'lab',
    categoryLabel: 'Laboratorium Sains',
    capacity: '36 Siswa Praktikum',
    specs: ['Lemari Asam Digital', 'Spektrofotometer UV-Vis Mini', 'Eye Washer Darurat', 'Timbangan Analitik 4 Desimal'],
    desc: 'Ruang pengujian reaksi kimia stoikiometri, titrasi asam-basa, dan kimia organik dilengkapi sistem ventilasi udara terstandarisasi.',
    location: 'Gedung Sains Lantai 1',
    badgeColor: 'bg-neon-lime'
  },
  {
    id: 'lab-biologi',
    name: 'Laboratorium Biologi & Bioteknologi',
    category: 'lab',
    categoryLabel: 'Laboratorium Sains',
    capacity: '36 Siswa Praktikum',
    specs: ['36 Mikroskop Binokuler', 'Autoklaf Sterilisasi', 'Inkubator Bakteri', 'Herbarium & Awetan Biologi'],
    desc: 'Sarana pengamatan anatomi jaringan tumbuhan, kultur mikroorganisme, dan uji genetika penunjang materi Kurikulum Merdeka serta KIR.',
    location: 'Gedung Sains Lantai 1',
    badgeColor: 'bg-neon-lime'
  },
  {
    id: 'lab-komputer',
    name: 'Tiga Laboratorium Komputer Terpadu',
    category: 'lab',
    categoryLabel: 'Laboratorium Komputer',
    capacity: '120 Unit Komputer (40 PC/Lab)',
    specs: ['PC Core i7 & RAM 16GB', 'Jaringan LAN Gigabit Redundan', 'Pendingin Ruangan Ganda', 'UPS Sentral Server'],
    desc: 'Pusat asesmen digital ANBK, ujian sekolah terkomputerisasi, pemrograman Python/Web klub SECURE, serta pembelajaran komputasi sains.',
    location: 'Gedung Perpustakaan & Komputer Lantai 2',
    badgeColor: 'bg-neon-cyan'
  },
  {
    id: 'graha-pustaka',
    name: 'Perpustakaan Graha Pustaka & e-Perpus',
    category: 'perpus',
    categoryLabel: 'Perpustakaan & Riset',
    capacity: '100 Pemustaka Serentak',
    specs: ['12.500+ Eksemplar Buku', 'Portal e-Perpus Daring', 'Bilik Diskusi Kedap Suara', 'Katalog Digital OPAC'],
    desc: 'Pusat sumber belajar fisik dan digital yang terkoneksi langsung dengan repositori jurnal ilmiah nasional serta e-book resmi Kemendikbud.',
    location: 'Gedung Graha Pustaka Lantai 1',
    badgeColor: 'bg-neon-yellow'
  },
  {
    id: 'gelanggang-olahraga',
    name: 'Gelanggang Olahraga Dalam Ruangan',
    category: 'olahraga',
    categoryLabel: 'Sarana Olahraga',
    capacity: '500 Penonton Tribun',
    specs: ['Lantai Interlocking Futsal', 'Lapangan Basket Standar Perbasi', 'Net Voli & Bulutangkis', 'Ruang Ganti Atlet'],
    desc: 'Gedung serbaguna olahraga indoor untuk turnamen basket antarpelajar, latihan rutin Smansa Eagles, dan seleksi kejurda bulutangkis.',
    location: 'Kompleks Olahraga Selatan',
    badgeColor: 'bg-neon-magenta'
  },
  {
    id: 'lapangan-terbuka',
    name: 'Lapangan Olahraga Terbuka',
    category: 'olahraga',
    categoryLabel: 'Sarana Olahraga',
    capacity: '800 Partisipan',
    specs: ['Lintasan Lari Pendek', 'Bak Lompat Jauh Pasir Kuarsa', 'Tiang Voli Luar Ruang', 'Penerangan Sorot Malam'],
    desc: 'Area pembinaan kebugaran jasmani, penilaian atletik mata pelajaran PJOK, latihan baris-berbaris PRATA, dan turnamen ekshibisi.',
    location: 'Halaman Tengah SMAN 1 Klaten',
    badgeColor: 'bg-neon-magenta'
  },
  {
    id: 'sanggar-karawitan',
    name: 'Sanggar Karawitan & Seni Peran',
    category: 'seni',
    categoryLabel: 'Kesenian & Budaya',
    capacity: '40 Pelaku Seni',
    specs: ['1 Set Gamelan Pelog & Slendro Lengkap', 'Panggung Latihan Teater Sapu Lidi', 'Peredam Akustik', 'Penyimpanan Wardrobe Tari'],
    desc: 'Ruang pelestarian adiluhung budaya Jawa, gladi bersih pementasan teater TSL, dan olah vokal paduan suara Sakla Voice.',
    location: 'Gedung Kesenian Sisi Timur',
    badgeColor: 'bg-neon-yellow'
  },
  {
    id: 'masjid-al-kautsar',
    name: 'Masjid SMAN 1 Klaten & Sarana Ibadah',
    category: 'umum',
    categoryLabel: 'Sarana Ibadah & Rohani',
    capacity: '600 Jamaah Ibadah',
    specs: ['Ruang Wudhu Terpisah Luas', 'Sound System Sentral', 'Perpustakaan Buku Islami', 'Ruang Khusus Doa Kristiani'],
    desc: 'Pusat pembinaan nilai ketakwaan, salat berjamaah harian, pengajian Jumat rutin ROMANSA, didukung ruang kebaktian PERSIK & PERKASA.',
    location: 'Kompleks Barat Daya Kampus',
    badgeColor: 'bg-neon-lime'
  },
  {
    id: 'ruang-uks',
    name: 'Ruang UKS & Posko Siaga PMR RECSA',
    category: 'umum',
    categoryLabel: 'Kesehatan & Layanan',
    capacity: '8 Ranjang Pasien',
    specs: ['Tabung Oksigen & Regulator', 'Alat Tes Gula Darah & Tensi', 'Obat Pertolongan Pertama Standar PMI', 'Tandu Lipat Siaga'],
    desc: 'Fasilitas tanggap darurat medis siswa dengan pembinaan tenaga kesehatan puskesmas pembantu serta tim relawan PMR Wira RECSA.',
    location: 'Gedung Utama Lantai 1',
    badgeColor: 'bg-neon-cyan'
  },
  {
    id: 'graha-padmawijaya',
    name: 'Aula Pertemuan Graha Padmawijaya',
    category: 'umum',
    categoryLabel: 'Fasilitas Publik & Pertemuan',
    capacity: '800 Kursi Hadirin',
    specs: ['Videotron Panggung 4x3 Meter', 'Sistem Audio Line-Array', 'Pendingin Ruangan Sentral', 'Panggung Orasi Resmi'],
    desc: 'Gedung pertemuan representatif untuk wisuda kelulusan, seminar motivasi alumni KAPASSKA, pameran karya seni, dan rapat orang tua siswa.',
    location: 'Lantai 2 Gedung Utama',
    badgeColor: 'bg-neon-yellow'
  },
  {
    id: 'kantin-adiwiyata',
    name: 'Kantin Sehat Adiwiyata & Koperasi',
    category: 'umum',
    categoryLabel: 'Fasilitas Layanan',
    capacity: '200 Siswa Sekaligus',
    specs: ['Sertifikasi Higienitas Dinkes', 'Zona Daur Ulang Sampah', 'Pembayaran Non-Tunai QRIS', 'Wastafel Cuci Tangan Pedal'],
    desc: 'Kantin ramah lingkungan bebas kemasan plastik sekali pakai yang menyediakan menu makanan bergizi higienis dengan audit berkala.',
    location: 'Sisi Selatan Dekat Gelanggang',
    badgeColor: 'bg-neon-lime'
  }
];

export const FasilitasPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const categories = [
    { key: 'all', label: 'Semua Sarana' },
    { key: 'lab', label: 'Laboratorium & Sains' },
    { key: 'perpus', label: 'Perpustakaan & Riset' },
    { key: 'olahraga', label: 'Sarana Olahraga' },
    { key: 'seni', label: 'Kesenian & Budaya' },
    { key: 'umum', label: 'Layanan & Sarana Umum' }
  ];

  const filteredFacilities = selectedCategory === 'all'
    ? facilityData
    : facilityData.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-neo-bg text-neo-ink">
      {/* Header Banner */}
      <section className="border-b-2 border-neo-ink bg-neo-surface py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="inline-block bg-neon-lime text-neo-ink border-2 border-neo-ink px-3 py-1 font-mono font-bold text-xs uppercase tracking-wider shadow-neo-sm mb-4">
            Sarana & Prasarana Pendidikan
          </div>
          <h1 className="font-sans font-extrabold text-3xl md:text-5xl text-neo-ink leading-tight mb-4 tracking-tight">
            Infrastruktur Kampus SMAN 1 Klaten
          </h1>
          <p className="text-neo-ink-2 font-medium text-base md:text-lg max-w-3xl leading-relaxed">
            Lingkungan belajar seluas 15.619 m² berarsitektur cagar budaya dengan fasilitas laboratorium analitis,
            perpustakaan digital Graha Pustaka, gelanggang olahraga, dan taman hijau Sekolah Adiwiyata Nasional.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8">
            <div className="bg-neo-bg border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs text-neo-ink-3 uppercase block font-bold">Luas Lahan</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink">15.619 m²</span>
            </div>
            <div className="bg-neo-bg border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs text-neo-ink-3 uppercase block font-bold">Laboratorium</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink">6 Unit Terpadu</span>
            </div>
            <div className="bg-neo-bg border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs text-neo-ink-3 uppercase block font-bold">Koleksi Pustaka</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink">12.500+ Buku</span>
            </div>
            <div className="bg-neon-yellow border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs text-neo-ink uppercase block font-bold">Status Lingkungan</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink">Adiwiyata Mandiri</span>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Photo Documentation Section */}
      <section className="py-12 md:py-16 max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-block bg-neon-cyan text-neo-ink border-2 border-neo-ink px-3 py-1 font-mono font-bold text-xs uppercase tracking-wider shadow-neo-sm mb-2">
              Galeri Visual Resmi
            </div>
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-neo-ink tracking-tight">
              Dokumentasi Gedung & Lingkungan Belajar
            </h2>
          </div>
          <p className="text-neo-ink-3 font-mono text-xs">
            Klik foto untuk melihat keterangan resolusi penuh
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campusPhotos.map((photo, idx) => (
            <figure
              key={idx}
              onClick={() => setActivePhoto(idx)}
              className="group cursor-pointer bg-neo-surface border-2 border-neo-ink shadow-neo hover:shadow-neo-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-neo-ink bg-neo-surface-2">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading={idx < 2 ? 'eager' : 'lazy'}
                />
                <span className="absolute top-3 left-3 bg-neon-yellow text-neo-ink font-mono font-bold text-xs px-2.5 py-0.5 border-2 border-neo-ink shadow-neo-sm">
                  {photo.area}
                </span>
              </div>
              <figcaption className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-sans font-bold text-lg text-neo-ink mb-1 group-hover:text-neo-ink-2">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-neo-ink-2 leading-relaxed mb-3">
                    {photo.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-neo-ink/20 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-neo-ink bg-neo-surface-2 px-2 py-0.5 border border-neo-ink">
                    {photo.capacity}
                  </span>
                  <span className="text-neo-ink font-bold group-hover:underline">
                    Lihat &rarr;
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Modal Zoom Photo */}
      {activePhoto !== null && (
        <div
          className="fixed inset-0 z-50 bg-neo-ink/75 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-neo-surface border-3 border-neo-ink shadow-neo-lg max-w-2xl w-full p-6 relative animate-in fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3 -right-3 bg-neon-magenta text-neo-surface border-2 border-neo-ink font-mono font-bold w-9 h-9 flex items-center justify-center shadow-neo-sm hover:scale-105"
              aria-label="Tutup detail foto"
            >
              ✕
            </button>
            <div className="border-2 border-neo-ink mb-4 overflow-hidden bg-neo-surface-2 aspect-[16/10]">
              <img
                src={campusPhotos[activePhoto].image}
                alt={campusPhotos[activePhoto].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="inline-block bg-neon-cyan text-neo-ink font-mono font-bold text-xs px-2.5 py-1 border-2 border-neo-ink shadow-neo-sm mb-2">
              {campusPhotos[activePhoto].area}
            </div>
            <h3 className="font-sans font-extrabold text-xl text-neo-ink mb-2">
              {campusPhotos[activePhoto].title}
            </h3>
            <p className="text-sm text-neo-ink-2 leading-relaxed mb-4">
              {campusPhotos[activePhoto].desc}
            </p>
            <div className="bg-neo-surface-2 border-2 border-neo-ink p-3 flex justify-between items-center text-xs font-mono font-bold">
              <span>Standar Kapasitas:</span>
              <span className="bg-neo-surface border border-neo-ink px-2 py-0.5 text-neo-ink">
                {campusPhotos[activePhoto].capacity}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Facility Cards Grid Section */}
      <section className="py-12 md:py-16 border-t-2 border-neo-ink bg-neo-surface-2/40">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="mb-8">
            <div className="inline-block bg-neon-magenta text-neo-surface border-2 border-neo-ink px-3 py-1 font-mono font-bold text-xs uppercase tracking-wider shadow-neo-sm mb-2">
              Spesifikasi Lengkap
            </div>
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-neo-ink tracking-tight mb-2">
              Katalog Sarana Prasarana Terverifikasi
            </h2>
            <p className="text-neo-ink-2 font-medium text-sm md:text-base max-w-2xl">
              Seluruh fasilitas dirawat secara berkala untuk menunjang aktivitas belajar mengajar,
              riset sains analitis, kegiatan olahraga, dan ibadah seluruh warga SMAN 1 Klaten.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`font-mono text-xs md:text-sm font-bold px-3.5 py-2 border-2 border-neo-ink transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-neo-ink text-neo-surface shadow-neo'
                    : 'bg-neo-surface text-neo-ink shadow-neo-sm hover:-translate-x-0.5 hover:-translate-y-0.5'
                }`}
                role="tab"
                aria-selected={selectedCategory === cat.key}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((fac) => (
              <article
                key={fac.id}
                className="bg-neo-surface border-2 border-neo-ink shadow-neo hover:shadow-neo-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-neo-ink-3 uppercase">
                      {fac.categoryLabel}
                    </span>
                    <span className={`font-mono text-xs font-bold px-2 py-0.5 border border-neo-ink text-neo-ink ${fac.badgeColor}`}>
                      {fac.capacity}
                    </span>
                  </div>

                  <h3 className="font-sans font-extrabold text-lg text-neo-ink mb-2">
                    {fac.name}
                  </h3>

                  <p className="text-xs md:text-sm text-neo-ink-2 leading-relaxed mb-4">
                    {fac.desc}
                  </p>

                  <div className="mb-4">
                    <span className="font-mono text-[11px] font-bold text-neo-ink-3 block mb-1.5 uppercase tracking-wide">
                      Spesifikasi Utama:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {fac.specs.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="bg-neo-surface-2 border border-neo-ink font-mono text-[11px] font-bold text-neo-ink px-2 py-0.5"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-neo-ink/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-neo-ink-3 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 bg-neon-lime border border-neo-ink rounded-full"></span>
                    {fac.location}
                  </span>
                  <span className="text-neo-ink font-bold">Terstandarisasi</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Info Callout Section */}
      <section className="py-12 border-t-2 border-neo-ink bg-neo-bg">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="bg-neo-surface border-3 border-neo-ink shadow-neo p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="inline-block bg-neon-lime text-neo-ink border-2 border-neo-ink font-mono font-bold text-xs px-2.5 py-0.5 mb-2 shadow-neo-sm">
                Standar Sarana Pendidikan
              </span>
              <h3 className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink mb-2">
                Pemanfaatan Sarana & Riset Siswa
              </h3>
              <p className="text-sm text-neo-ink-2 max-w-2xl leading-relaxed">
                Penggunaan laboratorium di luar jam intrakurikuler dan peminjaman buku perpustakaan digital e-Perpus
                dikoordinasikan melalui sekretariat tata usaha di Gedung Utama SMAN 1 Klaten.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href="/kontak"
                className="inline-block text-center font-mono font-bold text-xs uppercase px-5 py-3 bg-neon-yellow text-neo-ink border-2 border-neo-ink shadow-neo-sm hover:shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                Hubungi Tata Usaha &rarr;
              </a>
              <a
                href="https://eperpus.sma1klaten.sch.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center font-mono font-bold text-xs uppercase px-5 py-3 bg-neo-surface text-neo-ink border-2 border-neo-ink shadow-neo-sm hover:bg-neo-surface-2 transition-all"
              >
                Akses e-Perpus Daring &nearr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FasilitasPage;
