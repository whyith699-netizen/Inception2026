import { useState } from 'react';
import ValueProp from '../ValueProp';

const CAMPUS_GALLERY = [
  {
    image: '/images/school/Smansa1.jpg',
    title: 'Gerbang dan gedung utama',
    desc: 'Arsitektur kampus bersejarah yang menjadi ciri khas SMA Negeri 1 Klaten sejak 1957.',
  },
  {
    image: '/images/school/Smansa2.jpg',
    title: 'Halaman dalam dan lapangan upacara',
    desc: 'Pusat upacara bendera, apel kesiswaan, dan pembinaan olahraga terbuka.',
  },
  {
    image: '/images/school/Smansa3.jpg',
    title: 'Kompleks ruang kelas teori',
    desc: 'Ruang belajar berventilasi silang alami dengan pendingin ruangan dan proyektor digital.',
  },
  {
    image: '/images/school/Smansa4.jpg',
    title: 'Koridor laboratorium sains & riset',
    desc: 'Akses menuju laboratorium fisika analitis, kimia, biologi, dan komputer komputasi.',
  },
  {
    image: '/images/school/Smansa5.jpg',
    title: 'Taman kampus dan area diskusi',
    desc: 'Ruang terbuka hijau berstatus Adiwiyata Mandiri untuk diskusi siswa di sela jam belajar.',
  },
  {
    image: '/images/school/history-foto2a.jpg',
    title: 'Aula dan panggung kreasi seni',
    desc: 'Kawasan panggung terbuka dan ruang ekspresi kebudayaan pelajar lintas generasi sejak 1957.',
  },
];

const FACILITIES_LIST = [
  {
    name: 'Laboratorium sains terpadu',
    desc: 'Lab fisika, kimia, dan biologi dengan instrumen analitis lengkap untuk praktikum kurikulum dan riset ilmiah KIR.',
  },
  {
    name: 'Tiga laboratorium komputer',
    desc: 'Digunakan untuk asesmen digital ANBK, praktikum komputasi pemrograman SECURE, dan pembelajaran hibrida.',
  },
  {
    name: 'Perpustakaan Graha Pustaka & e-Perpus',
    desc: 'Koleksi 12.500+ buku cetak terakreditasi dan portal perpustakaan digital daring terintegrasi.',
  },
  {
    name: 'Gelanggang olahraga dalam ruangan',
    desc: 'Gedung olahraga serbaguna berlantai interlocking untuk basket Smansa Eagles, voli, dan futsal.',
  },
  {
    name: 'Sanggar karawitan dan seni peran',
    desc: 'Ruang pelestarian gamelan Jawa, pementasan teater TSL, olah vokal Sakla Voice, dan seni rupa DACO.',
  },
  {
    name: 'Masjid kampus dan sarana ibadah',
    desc: 'Pusat pembinaan nilai ketakwaan siswa Muslim serta ruang persekutuan doa Kristiani bagi PERSIK & PERKASA.',
  },
];

export const FasilitasPage = () => {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  return (
    <div className="fasilitas-page-wrapper">
      {/* 1. Original Facility Hero */}
      <section className="facility-hero sec sec-flush">
        <div className="container">
          <p className="lbl">Infrastruktur dan ruang belajar</p>
          <h1 className="page-title">Fasilitas pendukung akademik dan kesiswaan</h1>
          <p className="page-lead">
            SMAN 1 Klaten menempati lahan cagar budaya seluas 15.619 m² dengan
            arsitektur terawat, didukung fasilitas laboratorium modern,
            ruang kelas digital, perpustakaan terakreditasi, dan gelanggang olahraga.
          </p>
        </div>
      </section>

      {/* 2. Campus Gallery Grid */}
      <section className="sec sec-flush">
        <div className="container">
          <h2 className="section-heading">Dokumentasi lingkungan sekolah</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAMPUS_GALLERY.map((g, idx) => (
              <article
                className="cursor-pointer group flex flex-col"
                key={idx}
                onClick={() => setActivePhoto(idx)}
              >
                <div className="overflow-hidden rounded-md border border-neo-ink/20 shadow-neo-sm group-hover:shadow-neo transition-all bg-neo-surface-2 aspect-[3/2] mb-3">
                  <img
                    src={g.image}
                    alt={g.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading={idx < 3 ? 'eager' : 'lazy'}
                    width={600}
                    height={400}
                  />
                </div>
                <h3 className="font-serif font-bold text-base text-neo-ink mb-1 group-hover:underline">
                  {g.title}
                </h3>
                <p className="text-xs sm:text-sm text-neo-ink-2 leading-relaxed">
                  {g.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto !== null && (
        <div
          className="fixed inset-0 z-50 bg-neo-ink/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-neo-surface border-2 border-neo-ink shadow-neo max-w-3xl w-full p-6 relative rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3 -right-3 bg-neon-lime border-2 border-neo-ink font-mono font-bold w-8 h-8 flex items-center justify-center shadow-neo-sm text-sm"
              aria-label="Tutup detail foto"
            >
              ×
            </button>
            <div className="border-2 border-neo-ink mb-4 overflow-hidden rounded bg-neo-surface-2 aspect-[3/2]">
              <img
                src={CAMPUS_GALLERY[activePhoto].image}
                alt={CAMPUS_GALLERY[activePhoto].title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif font-bold text-xl text-neo-ink mb-2">
              {CAMPUS_GALLERY[activePhoto].title}
            </h3>
            <p className="text-sm text-neo-ink-2 leading-relaxed">
              {CAMPUS_GALLERY[activePhoto].desc}
            </p>
          </div>
        </div>
      )}

      {/* 3. Hairline-Separated Facilities Grid */}
      <section className="sec sec-flush" style={{ paddingBottom: 'clamp(56px, 8vw, 88px)' }}>
        <div className="container">
          <h2 className="section-heading">Sarana unggulan</h2>
          <div className="facilities-grid">
            {FACILITIES_LIST.map((f, idx) => (
              <article className="facility-item" key={idx}>
                <h3 className="fac-name">{f.name}</h3>
                <p className="fac-desc">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ValueProp Section */}
      <ValueProp />
    </div>
  );
};

export default FasilitasPage;
