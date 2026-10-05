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

export default function DirektoriPage({ staffGroups = [] }: DirektoriPageProps) {
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
    <div className="bg-neo-bg text-neo-ink">
      {/* 1. Page Header (Editorial) */}
      <section className="py-12 sm:py-16 border-b border-neo-ink bg-neo-bg">
        <div className="container">
          <span className="lbl lbl-lime mb-3 inline-block">DIREKTORI RESMI SEKOLAH</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neo-ink mb-4 max-w-3xl leading-[1.15]">
            Guru dan Pimpinan SMAN 1 Klaten
          </h1>
          <p className="text-neo-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            Struktur pimpinan, dewan pendidik, dan tenaga kependidikan yang membina 33 rombongan belajar dengan dedikasi akademis dan integritas karakter.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl pt-6 border-t border-neo-ink">
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">78</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Pendidik & Staf</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">5</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Rumpun Bidang</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">33</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Rombel Kelas</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">100%</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Tersertifikasi</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Controls Panel */}
      <section className="py-8 border-b border-neo-ink bg-neo-surface">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama guru, mata pelajaran, bidang..."
                aria-label="Cari guru dan staf"
                className="w-full pl-3 pr-8 py-2 bg-neo-bg border border-neo-ink text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:ring-1 focus:ring-neo-ink font-sans"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Hapus kata kunci pencarian"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neo-ink-3 hover:text-neo-ink font-mono text-xs p-1"
                >
                  &times;
                </button>
              )}
            </div>

            <div className="text-xs font-mono text-neo-ink-2 tabular-nums">
              Menampilkan <strong className="text-neo-ink">{filteredPeople.length}</strong> dari {allPeople.length} personil
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono text-xs px-3 py-1.5 border border-neo-ink transition-all cursor-pointer ${
                    isActive
                      ? 'bg-neon-lime text-neo-ink font-bold shadow-neo-sm'
                      : 'bg-neo-bg text-neo-ink-2 hover:bg-neo-surface-2'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Grid Staf & Guru */}
      <section className="py-12 sm:py-16">
        <div className="container">
          {filteredPeople.length === 0 ? (
            <div className="text-center py-16 px-6 border border-dashed border-neo-ink bg-neo-surface max-w-xl mx-auto space-y-4">
              <h3 className="font-serif text-xl font-bold text-neo-ink">
                Tidak ada data yang sesuai
              </h3>
              <p className="text-sm text-neo-ink-2">
                Coba gunakan kata kunci nama atau pilih kategori lain.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('Semua');
                }}
                className="btn btn-secondary text-xs"
              >
                Reset Filter &rarr;
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPeople.map((person, idx) => (
                <article
                  key={`${person.name}-${idx}`}
                  className="bg-neo-surface border border-neo-ink shadow-neo-sm p-4 flex flex-col justify-between hover:shadow-neo transition-all"
                >
                  <div>
                    <div className="w-full aspect-[3/4] bg-neo-surface-2 border border-neo-ink mb-4 overflow-hidden flex items-center justify-center">
                      {person.photo ? (
                        <img
                          src={person.photo}
                          alt={`Potret ${person.name}`}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                          width={280}
                          height={373}
                        />
                      ) : (
                        <span className="font-mono text-3xl font-bold text-neo-ink-3">
                          {person.name.charAt(0)}
                        </span>
                      )}
                    </div>

                    <div className="mb-2">
                      <span className="lbl lbl-lime text-[10px] px-1.5 py-0.5 inline-block mb-1">
                        {person.category}
                      </span>
                      <h3 className="font-sans font-bold text-sm sm:text-base text-neo-ink leading-snug">
                        {person.name}
                      </h3>
                      <p className="font-mono text-xs text-neo-ink-2 mt-0.5">
                        {person.role}
                      </p>
                    </div>

                    {person.detail && (
                      <p className="text-xs text-neo-ink-3 border-t border-neo-ink/10 pt-2 mt-2 leading-relaxed">
                        {person.detail}
                      </p>
                    )}
                  </div>

                  {person.email && (
                    <a
                      href={`mailto:${person.email}`}
                      className="font-mono text-[11px] text-neo-ink-2 hover:text-neo-ink block truncate border-t border-neo-ink/10 pt-2 mt-2"
                    >
                      ✉ {person.email}
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
