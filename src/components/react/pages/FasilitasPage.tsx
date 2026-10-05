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
}

const campusPhotos = [
  {
    image: '/images/school/Smansa1.jpg',
    title: 'Gerbang Utama & Fasad Bersejarah',
    area: 'Area Barat Gedung Utama',
    capacity: 'Zona Penyambutan',
    desc: 'Pintu gerbang berarsitektur kolonial cagar budaya yang menjadi ikon SMAN 1 Klaten sejak resmi didirikan pada 5 November 1957.'
  },
  {
    image: '/images/school/Smansa2.jpg',
    title: 'Halaman Dalam & Lapangan Upacara',
    area: 'Pusat Kompleks',
    capacity: '1.200 Peserta Upacara',
    desc: 'Halaman luas berlantai paving blok presisi untuk apel bendera hari Senin, peringatan hari besar nasional, dan kegiatan kesiswaan.'
  },
  {
    image: '/images/school/Smansa3.jpg',
    title: 'Kompleks Ruang Kelas Teori & Smart Classroom',
    area: 'Sayap Utara & Timur',
    capacity: '33 Rombel',
    desc: 'Ruang belajar berstandar sirkulasi silang, pendingin ruangan, proyektor interaktif, dan jaringan Wi-Fi serat optik.'
  },
  {
    image: '/images/school/Smansa4.jpg',
    title: 'Koridor Laboratorium Sains & Riset',
    area: 'Gedung Riset Lantai 1 & 2',
    capacity: '36 Siswa per Lab',
    desc: 'Akses penghubung laboratorium Fisika, Kimia, Biologi, dan Komputer dengan display karya ilmiah serta standar K3.'
  },
  {
    image: '/images/school/Smansa5.jpg',
    title: 'Taman Sekolah & Area Diskusi',
    area: 'Kawasan Hijau',
    capacity: '150 Siswa Terbuka',
    desc: 'Ruang terbuka hijau peraih penghargaan Adiwiyata Mandiri dengan kanopi pohon rindang, gazebo literasi, dan kolam resapan.'
  }
];

const facilityData: FacilityItem[] = [
  {
    id: 'lab-fisika',
    name: 'Laboratorium Fisika Terpadu',
    category: 'lab',
    categoryLabel: 'Laboratorium Sains',
    capacity: '36 Siswa',
    specs: ['Optik Meja Presisi', 'Sensor Gelombang Vernier', 'Multimeter Digital', 'Kit Mekanika Lanjut'],
    desc: 'Instrumen eksperimen analitis untuk membuktikan hukum mekanika, gelombang bunyi, termodinamika, dan elektromagnetik bagi persiapan OSN.',
    location: 'Gedung Sains Lt. 2'
  },
  {
    id: 'lab-kimia',
    name: 'Laboratorium Kimia Analitis',
    category: 'lab',
    categoryLabel: 'Laboratorium Sains',
    capacity: '36 Siswa',
    specs: ['Lemari Asam Digital', 'Spektrofotometer Mini', 'Eye Washer Darurat', 'Timbangan Analitik'],
    desc: 'Ruang pengujian reaksi kimia stoikiometri, titrasi asam-basa, dan kimia organik dilengkapi sistem ventilasi udara terstandarisasi.',
    location: 'Gedung Sains Lt. 1'
  },
  {
    id: 'lab-biologi',
    name: 'Laboratorium Biologi & Bioteknologi',
    category: 'lab',
    categoryLabel: 'Laboratorium Sains',
    capacity: '36 Siswa',
    specs: ['Mikroskop Binokuler', 'Autoklaf Sterilisasi', 'Inkubator Bakteri', 'Herbarium Awetan'],
    desc: 'Sarana pengamatan anatomi jaringan tumbuhan, kultur mikroorganisme, dan uji genetika penunjang materi Kurikulum Merdeka serta KIR.',
    location: 'Gedung Sains Lt. 1'
  },
  {
    id: 'lab-komputer',
    name: 'Tiga Laboratorium Komputer Terpadu',
    category: 'lab',
    categoryLabel: 'Laboratorium Komputer',
    capacity: '120 Unit PC',
    specs: ['PC Core i7 & RAM 16GB', 'LAN Gigabit Redundan', 'Pendingin Ruangan Ganda', 'UPS Sentral Server'],
    desc: 'Pusat asesmen digital ANBK, ujian sekolah terkomputerisasi, pemrograman Python/Web klub SECURE, serta pembelajaran komputasi sains.',
    location: 'Gedung Pustaka Lt. 2'
  },
  {
    id: 'graha-pustaka',
    name: 'Perpustakaan Graha Pustaka & e-Perpus',
    category: 'perpus',
    categoryLabel: 'Perpustakaan & Riset',
    capacity: '100 Pemustaka',
    specs: ['12.500+ Eksemplar Buku', 'Portal e-Perpus Daring', 'Bilik Diskusi Akustik', 'Katalog OPAC'],
    desc: 'Pusat sumber belajar fisik dan digital yang terkoneksi langsung dengan repositori jurnal ilmiah nasional serta e-book resmi Kemendikbud.',
    location: 'Gedung Pustaka Lt. 1'
  },
  {
    id: 'gelanggang-olahraga',
    name: 'Gelanggang Olahraga Dalam Ruangan',
    category: 'olahraga',
    categoryLabel: 'Sarana Olahraga',
    capacity: '500 Penonton',
    specs: ['Lantai Interlocking', 'Basket Standar Perbasi', 'Net Voli & Bulutangkis', 'Ruang Ganti Atlet'],
    desc: 'Gedung serbaguna olahraga indoor untuk turnamen basket antarpelajar, latihan rutin Smansa Eagles, dan seleksi kejurda bulutangkis.',
    location: 'Kompleks Olahraga Selatan'
  },
  {
    id: 'lapangan-terbuka',
    name: 'Lapangan Olahraga Terbuka',
    category: 'olahraga',
    categoryLabel: 'Sarana Olahraga',
    capacity: '800 Partisipan',
    specs: ['Lintasan Lari Pendek', 'Bak Lompat Jauh Pasir', 'Tiang Voli Terbuka', 'Penerangan Sorot'],
    desc: 'Area pembinaan kebugaran jasmani, penilaian atletik mata pelajaran PJOK, latihan baris-berbaris PRATA, dan turnamen ekshibisi.',
    location: 'Halaman Tengah'
  },
  {
    id: 'sanggar-karawitan',
    name: 'Sanggar Karawitan & Seni Peran',
    category: 'seni',
    categoryLabel: 'Kesenian & Budaya',
    capacity: '40 Pelaku Seni',
    specs: ['1 Set Gamelan Pelog & Slendro', 'Panggung Latihan Teater', 'Peredam Akustik', 'Lemari Wardrobe Tari'],
    desc: 'Ruang pelestarian adiluhung budaya Jawa, gladi bersih pementasan teater TSL, dan olah vokal paduan suara Sakla Voice.',
    location: 'Gedung Seni Sisi Timur'
  },
  {
    id: 'masjid-al-kautsar',
    name: 'Masjid SMAN 1 Klaten & Sarana Ibadah',
    category: 'umum',
    categoryLabel: 'Sarana Ibadah & Rohani',
    capacity: '600 Jamaah',
    specs: ['Ruang Wudhu Luas', 'Sound System Sentral', 'Perpustakaan Islami', 'Ruang Doa Kristiani'],
    desc: 'Pusat pembinaan nilai ketakwaan, salat berjamaah harian, pengajian Jumat rutin ROMANSA, didukung ruang kebaktian PERSIK & PERKASA.',
    location: 'Kompleks Barat Daya'
  },
  {
    id: 'ruang-uks',
    name: 'Ruang UKS & Posko Siaga PMR RECSA',
    category: 'umum',
    categoryLabel: 'Kesehatan & Layanan',
    capacity: '8 Ranjang',
    specs: ['Tabung Oksigen Regulator', 'Alat Tes Gula Darah & Tensi', 'Obat Standar PMI', 'Tandu Lipat Siaga'],
    desc: 'Fasilitas tanggap darurat medis siswa dengan pembinaan tenaga kesehatan puskesmas pembantu serta tim relawan PMR Wira RECSA.',
    location: 'Gedung Utama Lt. 1'
  },
  {
    id: 'graha-padmawijaya',
    name: 'Aula Pertemuan Graha Padmawijaya',
    category: 'umum',
    categoryLabel: 'Fasilitas Publik & Pertemuan',
    capacity: '800 Kursi',
    specs: ['Videotron Panggung 4x3m', 'Audio Line-Array', 'AC Sentral', 'Panggung Orasi Resmi'],
    desc: 'Gedung pertemuan representatif untuk wisuda kelulusan, seminar motivasi alumni KAPASSKA, pameran karya seni, dan rapat orang tua siswa.',
    location: 'Gedung Utama Lt. 2'
  },
  {
    id: 'kantin-adiwiyata',
    name: 'Kantin Sehat Adiwiyata & Koperasi',
    category: 'umum',
    categoryLabel: 'Fasilitas Layanan',
    capacity: '200 Siswa',
    specs: ['Sertifikasi Higienitas', 'Zona Pilah Sampah', 'Pembayaran Non-Tunai QRIS', 'Wastafel Pedal'],
    desc: 'Kantin ramah lingkungan bebas kemasan plastik sekali pakai yang menyediakan menu makanan bergizi higienis dengan audit berkala.',
    location: 'Sisi Selatan'
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
      {/* 1. Page Header (Editorial) */}
      <section className="py-12 sm:py-16 border-b border-neo-ink bg-neo-bg">
        <div className="container">
          <span className="lbl lbl-lime mb-3 inline-block">SARANA & PRASARANA PENDIDIKAN</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neo-ink mb-4 max-w-3xl leading-[1.15]">
            Infrastruktur Kampus SMAN 1 Klaten
          </h1>
          <p className="text-neo-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            Lingkungan belajar seluas 15.619 m² berarsitektur cagar budaya dengan fasilitas laboratorium analitis, perpustakaan digital Graha Pustaka, gelanggang olahraga, dan taman hijau Sekolah Adiwiyata Mandiri.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl pt-6 border-t border-neo-ink">
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">15.619 m²</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Luas Lahan</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">6 Unit</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Lab Terpadu</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">12.500+</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Koleksi Pustaka</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">Mandiri</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Status Adiwiyata</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Galeri Foto Gedung */}
      <section className="py-12 sm:py-16 border-b border-neo-ink">
        <div className="container">
          <div className="mb-8">
            <span className="lbl lbl-lime mb-2 inline-block">DOKUMENTASI KAMPUS</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neo-ink">
              Galeri Gedung & Lingkungan Belajar
            </h2>
            <p className="text-neo-ink-2 text-sm sm:text-base mt-1">
              Klik gambar untuk melihat resolusi penuh dan keterangan arsitektur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campusPhotos.map((photo, idx) => (
              <figure
                key={idx}
                onClick={() => setActivePhoto(idx)}
                className="cursor-pointer bg-neo-surface border border-neo-ink shadow-neo-sm hover:shadow-neo transition-all flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-neo-ink bg-neo-surface-2">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading={idx < 2 ? 'eager' : 'lazy'}
                  />
                  <span className="absolute top-2 left-2 lbl lbl-lime text-[10px] px-2 py-0.5">
                    {photo.area}
                  </span>
                </div>
                <figcaption className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-neo-ink mb-1">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-neo-ink-2 leading-relaxed mb-3">
                      {photo.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-neo-ink/10 flex items-center justify-between text-xs font-mono text-neo-ink-3">
                    <span>{photo.capacity}</span>
                    <span className="font-bold text-neo-ink hover:underline">Perbesar &rarr;</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Zoom Photo */}
      {activePhoto !== null && (
        <div
          className="fixed inset-0 z-50 bg-neo-ink/75 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-neo-surface border border-neo-ink shadow-neo max-w-2xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3 -right-3 bg-neo-surface border border-neo-ink font-mono font-bold w-8 h-8 flex items-center justify-center shadow-neo-sm hover:bg-neon-lime text-xs"
              aria-label="Tutup detail foto"
            >
              &times;
            </button>
            <div className="border border-neo-ink mb-4 overflow-hidden bg-neo-surface-2 aspect-[16/10]">
              <img
                src={campusPhotos[activePhoto].image}
                alt={campusPhotos[activePhoto].title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="lbl lbl-lime text-[10px] px-2 py-0.5 inline-block mb-2">
              {campusPhotos[activePhoto].area}
            </span>
            <h3 className="font-serif font-bold text-xl text-neo-ink mb-2">
              {campusPhotos[activePhoto].title}
            </h3>
            <p className="text-sm text-neo-ink-2 leading-relaxed mb-4">
              {campusPhotos[activePhoto].desc}
            </p>
            <div className="bg-neo-bg border border-neo-ink p-3 flex justify-between items-center text-xs font-mono">
              <span className="text-neo-ink-3">Kapasitas Fasilitas:</span>
              <span className="font-bold text-neo-ink">{campusPhotos[activePhoto].capacity}</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Katalog Sarana Prasarana */}
      <section className="py-12 sm:py-16 border-b border-neo-ink bg-neo-surface">
        <div className="container">
          <div className="mb-8">
            <span className="lbl lbl-lime mb-2 inline-block">KATALOG SARPRAS</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neo-ink">
              Daftar Fasilitas Akademik & Olahraga
            </h2>
            <p className="text-neo-ink-2 text-sm sm:text-base mt-1">
              Seluruh fasilitas dirawat secara berkala untuk menunjang kurikulum, praktikum sains, dan kebugaran siswa.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`font-mono text-xs px-3 py-1.5 border border-neo-ink transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-neon-lime text-neo-ink font-bold shadow-neo-sm'
                    : 'bg-neo-bg text-neo-ink-2 hover:bg-neo-surface-2'
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
                className="bg-neo-bg border border-neo-ink shadow-neo-sm p-5 flex flex-col justify-between hover:shadow-neo transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-neo-ink/10">
                    <span className="lbl lbl-lime text-[10px] px-1.5 py-0.5">
                      {fac.categoryLabel}
                    </span>
                    <span className="font-mono text-xs font-bold text-neo-ink-3">
                      {fac.capacity}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-neo-ink mb-2">
                    {fac.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-neo-ink-2 leading-relaxed mb-4">
                    {fac.desc}
                  </p>

                  <div className="mb-4">
                    <span className="font-mono text-[11px] font-bold text-neo-ink-3 block mb-1 uppercase tracking-wide">
                      Spesifikasi:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {fac.specs.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="bg-neo-surface border border-neo-ink/30 font-mono text-[10px] text-neo-ink-2 px-1.5 py-0.5"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-neo-ink/10 flex items-center justify-between text-xs font-mono text-neo-ink-3">
                  <span>📍 {fac.location}</span>
                  <span className="text-neo-ink font-bold">Terstandarisasi</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Layanan Tata Usaha Callout */}
      <section className="py-12 sm:py-16">
        <div className="container">
          <div className="bg-neo-surface border border-neo-ink shadow-neo p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="lbl lbl-lime text-[10px] px-2 py-0.5 inline-block mb-2">
                LAYANAN AKADEMIK
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-neo-ink mb-2">
                Pemanfaatan Sarana & Peminjaman Lab
              </h3>
              <p className="text-sm text-neo-ink-2 max-w-xl leading-relaxed">
                Penggunaan laboratorium untuk kegiatan riset KIR dan akses perpustakaan digital e-Perpus dikoordinasikan melalui sekretariat tata usaha di Gedung Utama SMAN 1 Klaten.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/kontak" className="btn btn-primary text-xs">
                Hubungi Tata Usaha &rarr;
              </a>
              <a
                href="https://eperpus.sma1klaten.sch.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary text-xs"
              >
                Portal e-Perpus &nearr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FasilitasPage;
