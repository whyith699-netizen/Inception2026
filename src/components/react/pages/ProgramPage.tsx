import { useState, useMemo } from 'react';
import Programs from '../Programs';
import NeoFilterBar from '../NeoFilterBar';
import { PaperAirplaneDoodle, SparkleDoodle, CurvedDashedTrail } from '../DoodleDecorations';
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

const matchesCategory = (category: string, selectedCat: string): boolean => {
  const cat = (category || '').toLowerCase();
  switch (selectedCat) {
    case 'Kepemimpinan':
      return cat.includes('kepemimpinan') || cat.includes('kepecintaalaman');
    case 'Sains & Teknologi':
      return cat.includes('sains') || cat.includes('riset') || cat.includes('teknologi');
    case 'Seni & Bahasa':
      return cat.includes('seni') || cat.includes('bahasa') || cat.includes('jurnalistik') || cat.includes('media');
    case 'Olahraga':
      return cat.includes('olahraga');
    case 'Kerohanian & Sosial':
      return cat.includes('kerohanian') || cat.includes('kemanusiaan');
    default:
      return true;
  }
};

export const ProgramPage = () => {
  const [selectedCat, setSelectedCat] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allExtras = ekstraData.items || [];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Semua: allExtras.length };
    for (const cat of EXTRA_CATEGORIES.slice(1)) {
      counts[cat] = allExtras.filter((item) => matchesCategory(item.category, cat)).length;
    }
    return counts;
  }, [allExtras]);

  const filteredExtras = useMemo(() => {
    return allExtras.filter((item) => {
      const matchCat =
        selectedCat === 'Semua' || matchesCategory(item.category, selectedCat);

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
      <section className="program-hero sec sec-flush relative overflow-hidden">
        <div className="absolute top-6 right-8 doodle-float hidden sm:block">
          <PaperAirplaneDoodle flip={true} />
        </div>
        <div className="absolute bottom-4 right-16 doodle-float-delayed">
          <SparkleDoodle size={30} color="#00F0FF" />
        </div>
        <div className="container relative z-10">
          <p className="lbl">Akademik dan kesiswaan</p>
          <h1 className="page-title">Kurikulum Merdeka dan ekosistem minat bakat</h1>
          <p className="page-lead">
            Pembelajaran yang menghargai keunikan potensi setiap peserta didik melalui
            fase eksplorasi, pendalaman rumpun disiplin ilmu, dan pembinaan 23
            ekstrakurikuler resmi.
          </p>
          <p className="flex flex-wrap gap-2 mt-4">
            <span className="inline-block bg-neon-lime border-2 border-neo-ink rounded font-mono text-[11px] font-bold text-neo-ink px-2.5 py-1 shadow-neo-sm">
              {allExtras.length} Ekstrakurikuler Resmi
            </span>
            <span className="inline-block bg-neon-cyan border-2 border-neo-ink rounded font-mono text-[11px] font-bold text-neo-ink px-2.5 py-1 shadow-neo-sm">
              Kurikulum Merdeka
            </span>
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
            <div className="ekskul-head-stickers">
              <span className="lbl lbl-cyan nb-sticker">Kurikulum Merdeka</span>
              <span className="lbl lbl-yellow nb-sticker">23 Ekskul</span>
            </div>
            <h2 className="section-heading">23 ekstrakurikuler resmi</h2>
            <p className="page-lead" style={{ marginBottom: '24px' }}>
              Wadah pembinaan kepemimpinan, penalaran ilmiah, kreasi seni,
              ketangkasan raga, dan keteguhan rohani civitas akademika Padmawijaya.
            </p>
          </div>

          {/* Sub-nav: pencarian dan filter kategori */}
          <NeoFilterBar
            search={searchQuery}
            onSearch={setSearchQuery}
            searchLabel="Cari ekstrakurikuler"
            placeholder="Cari ekstrakurikuler (contoh: OSMANSA, KIR, Basket...)"
            groups={[
              {
                key: 'kategori',
                label: 'Kategori',
                options: EXTRA_CATEGORIES.map((cat) => ({
                  value: cat,
                  label: cat,
                  count: categoryCounts[cat] ?? 0,
                })),
              },
            ]}
            values={{ kategori: selectedCat }}
            onFilter={(_key, value) => setSelectedCat(value)}
            resultCount={filteredExtras.length}
            totalCount={allExtras.length}
            noun="ekstrakurikuler"
            onReset={() => {
              setSearchQuery('');
              setSelectedCat('Semua');
            }}
          />

          {/* Ekskul Grid */}
          {filteredExtras.length === 0 ? (
            <div className="nb-empty">
              <span className="nb-tag nb-tag--magenta">Tidak ditemukan</span>
              <h3 className="font-serif text-xl font-bold text-neo-ink mt-3 mb-2">
                Tidak ada ekstrakurikuler yang cocok
              </h3>
              <p className="text-sm text-neo-ink-2 mb-5">
                Silakan sesuaikan kata kunci atau pilih kategori &quot;Semua&quot;.
              </p>
              <button
                type="button"
                className="nb-reset"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCat('Semua');
                }}
              >
                Reset filter
              </button>
            </div>
          ) : (
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
                    <span className="ekskul-cat self-start nb-sticker">
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
          )}

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
