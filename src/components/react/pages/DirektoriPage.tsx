import { useState, useMemo } from 'react';

export interface StaffPerson {
  name: string;
  role: string;
  detail?: string;
  photo?: string;
  email?: string;
  category?: string;
}

export interface StaffGroup {
  category: string;
  people: StaffPerson[];
}

export interface DirektoriPageProps {
  staffGroups: StaffGroup[];
}

const CATEGORY_FILTERS = [
  'Semua',
  'Pimpinan',
  'Guru MIPA',
  'Guru IPS',
  'Guru Bahasa',
  'Tenaga Kependidikan',
] as const;

function matchCategory(personCategory: string, filter: string): boolean {
  if (filter === 'Semua') return true;
  const cat = (personCategory || '').toLowerCase();
  if (filter === 'Pimpinan') return cat.includes('pimpinan') || cat.includes('komite');
  if (filter === 'Guru MIPA') return cat.includes('mipa') || cat.includes('sains');
  if (filter === 'Guru IPS') return cat.includes('sosial') || cat.includes('humaniora');
  if (filter === 'Guru Bahasa') return cat.includes('bahasa') || cat.includes('seni');
  if (filter === 'Tenaga Kependidikan') return cat.includes('kependidikan') || cat.includes('tata usaha') || cat.includes('staff');
  return cat.includes(filter.toLowerCase());
}

export const DirektoriPage = ({ staffGroups = [] }: DirektoriPageProps) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const allPeople = useMemo(() => {
    const list: StaffPerson[] = [];
    (staffGroups || []).forEach((group) => {
      (group.people || []).forEach((p) => {
        list.push({ ...p, category: group.category });
      });
    });
    return list;
  }, [staffGroups]);

  const filteredPeople = useMemo(() => {
    const query = search.toLowerCase().trim();
    return allPeople.filter((p) => {
      const inCategory = matchCategory(p.category || '', selectedCategory);
      if (!inCategory) return false;
      if (!query) return true;
      return (
        p.name.toLowerCase().includes(query) ||
        p.role.toLowerCase().includes(query) ||
        (p.detail && p.detail.toLowerCase().includes(query)) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.email && p.email.toLowerCase().includes(query))
      );
    });
  }, [allPeople, search, selectedCategory]);

  return (
    <div className="direktori-page-wrapper">
      {/* 1. Original Page Head */}
      <section className="page-head sec sec-flush">
        <div className="container">
          <p className="lbl">Direktori sekolah</p>
          <h1 className="page-title">Guru dan pimpinan SMAN 1 Klaten</h1>
          <p className="lede">
            Struktur pimpinan dan tenaga pendidik yang mengelola 33 rombongan belajar,
            program hybrid learning, serta kegiatan kesiswaan di SMAN 1 Klaten.
          </p>
        </div>
      </section>

      {/* 2. Interactive Directory Island */}
      <section className="sec" style={{ paddingTop: 'clamp(32px, 5vw, 56px)' }}>
        <div className="container">
          {/* Panel Kontrol & Filter */}
          <div className="flex flex-wrap gap-4 justify-between items-center mb-8 pb-6 border-b border-neo-ink/20">
            {/* Search Input */}
            <div className="relative min-w-[280px] flex-1 max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama guru, mata pelajaran, bidang tugas..."
                aria-label="Cari guru dan staf"
                className="w-full px-4 py-3 bg-neo-surface border-2 border-neo-ink rounded shadow-neo-sm text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:shadow-neo font-sans"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Hapus kata kunci pencarian"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-neon-magenta text-white border border-neo-ink rounded text-xs px-2 py-0.5 font-bold hover:bg-neon-magenta/90"
                >
                  ×
                </button>
              )}
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {CATEGORY_FILTERS.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`font-mono text-xs px-3.5 py-2 border-2 border-neo-ink rounded transition-all cursor-pointer uppercase ${
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

          {/* Result Count Status */}
          <div className="flex justify-between items-center mb-6 font-mono text-xs text-neo-ink-2">
            <span>
              Menampilkan <strong>{filteredPeople.length}</strong> dari {allPeople.length} tenaga pendidik & pimpinan
            </span>
            <span className="text-[11px] text-neo-ink-3 uppercase tracking-wider">
              SMAN 1 Klaten · Aktif
            </span>
          </div>

          {/* Staff Grid */}
          {filteredPeople.length === 0 ? (
            <div className="text-center py-16 px-6 border-2 border-dashed border-neo-ink bg-neo-surface rounded-md max-w-xl mx-auto space-y-3">
              <h3 className="font-serif text-xl font-bold text-neo-ink">
                Tidak ada personil yang sesuai
              </h3>
              <p className="text-sm text-neo-ink-2">
                Gunakan kata kunci nama guru, mata pelajaran lain, atau klik kategori &quot;Semua&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('Semua');
                }}
                className="btn btn-secondary text-xs"
              >
                Reset Filter →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPeople.map((person, idx) => {
                const hasValidPhoto = person.photo && !person.photo.includes('logo.png');
                const initialChar = person.name.replace(/^(Drs\.|Dr\.|Prof\.|Ir\.|H\.|Hj\.)\s*/i, '').charAt(0) || 'S';

                return (
                  <article
                    key={`${person.name}-${idx}`}
                    className="bg-neo-surface border-2 border-neo-ink rounded-md shadow-neo p-5 flex flex-col justify-between hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg transition-all h-full"
                  >
                    <div>
                      {/* Photo Frame 3:4 */}
                      <div className="w-full aspect-[3/4] bg-neo-surface-2 border-2 border-neo-ink rounded shadow-neo-sm mb-4 overflow-hidden flex items-center justify-center">
                        {hasValidPhoto ? (
                          <img
                            src={person.photo}
                            alt={`Potret ${person.name}`}
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                            width={280}
                            height={373}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-neo-surface-2 text-center">
                            <div className="w-16 h-16 border-2 border-neo-ink bg-neon-lime flex items-center justify-center font-serif text-3xl font-extrabold text-neo-ink shadow-neo-sm mb-2">
                              {initialChar}
                            </div>
                            <span className="font-mono text-[10px] font-bold text-neo-ink-3 uppercase tracking-wider">
                              SMAN 1 Klaten
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="mb-2">
                        <span className="inline-block font-mono text-[10px] font-extrabold uppercase bg-neon-yellow text-neo-ink border border-neo-ink px-2 py-0.5 shadow-[1.5px_1.5px_0px_#111418] mb-2">
                          {person.category}
                        </span>
                        <h3 className="font-serif font-bold text-base sm:text-lg text-neo-ink leading-snug">
                          {person.name}
                        </h3>
                        <p className="font-mono text-xs font-semibold text-neo-ink-2 mt-1">
                          {person.role}
                        </p>
                      </div>

                      {person.detail && (
                        <p className="text-xs text-neo-ink-2 border-t border-neo-ink/15 pt-2 mt-2 leading-relaxed">
                          {person.detail}
                        </p>
                      )}
                    </div>

                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="font-mono text-[11px] text-neo-ink-2 hover:text-neo-ink block truncate border-t border-neo-ink/15 pt-2 mt-3"
                      >
                        ✉ {person.email}
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DirektoriPage;
