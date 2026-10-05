import { useState, useMemo } from 'react';
import Programs from '../Programs';
import ekstraData from '../../../content/ekstrakurikuler/daftar.json';

const CURRICULUM_PILLARS = [
  {
    title: 'Olimpiade dan riset sains',
    level: 'Tim OSN dan KIR',
    icon: '🔬',
    desc: 'Pembinaan laboratorium analitis, kelas riset kelompok, dan pendampingan kompetisi sains nasional di bawah arahan guru pembina dan peneliti LIPI/BRIN.',
  },
  {
    title: 'Geopolitik dan nalar kritis',
    level: 'Klub debat dan riset sosial',
    icon: '🌐',
    desc: 'Kajian fenomena kemasyarakatan, literasi hukum tata negara, dan praktik berpikir solutif menghadapi tantangan global dan kebencanaan spasial.',
  },
  {
    title: 'Diplomasi dan bahasa global',
    level: 'Model UN dan English Club',
    icon: '🗣',
    desc: 'Latihan public speaking dwibahasa, retorika logis, penulisan antologi sastra JUJU, dan penguasaan bahasa asing pilihan (Jepang/Jerman).',
  },
  {
    title: 'Sportivitas dan kepemimpinan',
    level: 'Basket, futsal, dan pramuka',
    icon: '🏆',
    desc: 'Pembinaan ketahanan fisik, kepemimpinan organisasi kesiswaan OSMANSA/MPK, kedisiplinan korps Paskibra, dan integritas kepanduan.',
  },
];

const EXTRA_CATEGORIES = [
  'Semua',
  'Kepemimpinan',
  'Sains & Teknologi',
  'Seni & Bahasa',
  'Olahraga',
  'Kerohanian & Sosial',
];

export const ProgramPage = () => {
  const [selectedCat, setSelectedCat] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allExtras = ekstraData.items || [];

  const filteredExtras = useMemo(() => {
    return allExtras.filter((item) => {
      let matchCat = selectedCat === 'Semua';
      if (!matchCat) {
        const cat = (item.category || '').toLowerCase();
        if (selectedCat === 'Kepemimpinan') matchCat = cat.includes('kepemimpinan') || cat.includes('kepecintaalaman');
        else if (selectedCat === 'Sains & Teknologi') matchCat = cat.includes('sains') || cat.includes('riset') || cat.includes('teknologi');
        else if (selectedCat === 'Seni & Bahasa') matchCat = cat.includes('seni') || cat.includes('bahasa') || cat.includes('jurnalistik') || cat.includes('media');
        else if (selectedCat === 'Olahraga') matchCat = cat.includes('olahraga');
        else if (selectedCat === 'Kerohanian & Sosial') matchCat = cat.includes('kerohanian') || cat.includes('kemanusiaan');
      }
      
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchCat && matchQuery;
    });
  }, [allExtras, selectedCat, searchQuery]);

  return (
    <div className="program-page-wrapper">
      {/* 1. Original Program Hero */}
      <section className="program-hero sec sec-flush">
        <div className="container">
          <p className="lbl">Akademik dan kesiswaan</p>
          <h1 className="page-title">Kurikulum Merdeka dan ekosistem minat bakat</h1>
          <p className="page-lead">
            Pembelajaran yang menghargai keunikan potensi setiap peserta didik melalui
            fase eksplorasi, pendalaman rumpun disiplin ilmu, dan pembinaan 23
            ekstrakurikuler resmi.
          </p>
        </div>
      </section>

      {/* 2. Three Academic Tracks (Programs.tsx) */}
      <Programs />

      {/* 3. Four Pillars of Curriculum Development */}
      <section className="curriculum-section sec" id="kurikulum">
        <div className="container">
          <div className="curriculum-intro">
            <p className="lbl">Pilar pengembangan siswa</p>
            <h2 className="section-heading">Empat bidang pengembangan yang berjalan berdampingan</h2>
          </div>

          <div className="categories-grid">
            {CURRICULUM_PILLARS.map((pillar) => (
              <article className="category-card card" key={pillar.title}>
                <div className="category-icon-wrapper">
                  <span className="text-xl" role="img" aria-label={pillar.title}>{pillar.icon}</span>
                </div>
                <h3 className="category-title">{pillar.title}</h3>
                <span className="category-level">{pillar.level}</span>
                <p className="category-desc">{pillar.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 23 Official Extracurriculars Gallery */}
      <section className="ekskul-gallery-section sec" id="ekstrakurikuler-resmi">
        <div className="container">
          <div className="section-header">
            <p className="lbl">Pengembangan karakter dan bakat</p>
            <h2 className="section-heading">23 ekstrakurikuler resmi</h2>
            <p className="page-lead" style={{ marginBottom: '24px' }}>
              Wadah pembinaan kepemimpinan, penalaran ilmiah, kreasi seni,
              ketangkasan raga, dan keteguhan rohani civitas akademika Padmawijaya.
            </p>

            {/* Controls: Search and Filter Pills */}
            <div className="flex flex-wrap gap-4 items-center justify-between mb-8 pb-5 border-b border-neo-ink/20">
              <div className="relative min-w-[280px] flex-1 max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari ekstrakurikuler (contoh: OSMANSA, KIR, Basket...)"
                  className="w-full px-4 py-2.5 bg-neo-surface border-2 border-neo-ink rounded shadow-neo-sm text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:shadow-neo font-sans"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neo-ink-3 hover:text-neo-ink"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {EXTRA_CATEGORIES.map((cat) => {
                  const isActive = selectedCat === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCat(cat)}
                      className={`font-mono text-xs px-3 py-1.5 border-2 border-neo-ink rounded transition-all cursor-pointer ${
                        isActive
                          ? 'bg-neon-lime text-neo-ink font-extrabold shadow-neo-sm -translate-x-0.5 -translate-y-0.5'
                          : 'bg-neo-surface text-neo-ink font-bold shadow-[2px_2px_0px_#111418] hover:bg-neo-surface-2'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Ekskul Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExtras.map((item) => (
              <article className="ekskul-card card" key={item.id}>
                <div className="flex-1 flex flex-col">
                  <div className="ekskul-logo-box shrink-0">
                    <img
                      src={item.logo}
                      alt={`Logo ${item.name}`}
                      className="ekskul-logo-img"
                      loading="lazy"
                      width={48}
                      height={48}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="ekskul-cat self-start">
                    {item.category}
                  </span>
                  <h3 className="ekskul-name">
                    {item.name}
                  </h3>
                  <p className="ekskul-desc">
                    {item.desc}
                  </p>
                </div>
                <div className="ekskul-foot">
                  <span>Unit Resmi</span>
                  <span className="font-bold text-neo-ink">SMAN 1 Klaten</span>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Information Callout */}
          <div className="ppdb-cta" style={{ marginTop: 'clamp(40px, 6vw, 64px)' }}>
            <div>
              <h3 className="cta-title">Pendaftaran Ekstrakurikuler Siswa Baru</h3>
              <p className="cta-desc">
                Setiap peserta didik baru wajib memilih 1 ekstrakurikuler kepemimpinan/pramuka dan maksimal 2 ekstrakurikuler minat bakat saat masa orientasi kesiswaan (MPLS).
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/kontak" className="btn btn-primary">
                Tanya Pembina Kesiswaan →
              </a>
              <a href="/prestasi" className="btn btn-secondary">
                Lihat Rekam Prestasi →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramPage;
