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
    <div className="bg-neo-bg text-neo-ink min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* 1. Header Hero Direktori */}
        <section aria-labelledby="direktori-heading">
          <div className="bg-neo-surface border-2 border-neo-ink shadow-neo-lg p-6 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold">
                DIREKTORI RESMI SEKOLAH
              </span>
              <span className="font-mono text-xs text-neo-ink-3">
                SMAN 1 Klaten &middot; Tahun Ajaran 2025/2026
              </span>
            </div>

            <h1 id="direktori-heading" className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neo-ink tracking-tight leading-tight mb-4 max-w-4xl">
              Guru dan Pimpinan SMAN 1 Klaten
            </h1>

            <p className="text-neo-ink-2 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
              Struktur pimpinan dan tenaga pendidik yang mengelola 33 rombongan belajar, program hybrid learning, serta kegiatan kesiswaan di SMAN 1 Klaten.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t-2 border-neo-ink">
              <div className="bg-neo-bg border-2 border-neo-ink shadow-neo-sm p-4 flex flex-col gap-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-neo-ink tabular-nums">
                  78
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-neo-ink-2">
                  Pendidik & Staf
                </span>
              </div>

              <div className="bg-neo-bg border-2 border-neo-ink shadow-neo-sm p-4 flex flex-col gap-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-neo-ink tabular-nums">
                  5 Rumpun
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-neo-ink-2">
                  Bidang Keahlian
                </span>
              </div>

              <div className="bg-neo-bg border-2 border-neo-ink shadow-neo-sm p-4 flex flex-col gap-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-neo-ink tabular-nums">
                  33 Rombel
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-neo-ink-2">
                  Kelas X, XI, XII
                </span>
              </div>

              <div className="bg-neon-lime border-2 border-neo-ink shadow-neo-sm p-4 flex flex-col gap-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-neo-ink tabular-nums">
                  100%
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-neo-ink">
                  Guru Tersertifikasi
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Controls Panel: Pencarian & Filter Kategori */}
        <section aria-label="Pencarian dan Filter Direktori" className="directory-filter-island">
          <div className="bg-neo-surface border-2 border-neo-ink shadow-neo p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              {/* Kolom Pencarian Instan */}
              <div className="relative flex-1 max-w-xl">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neo-ink-3 font-mono text-sm pointer-events-none">
                  🔍
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama guru, mata pelajaran, bidang tugas..."
                  aria-label="Cari guru dan staf"
                  className="w-full pl-10 pr-10 py-3 bg-neo-bg border-2 border-neo-ink shadow-neo-sm font-sans text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:bg-white focus:shadow-neo transition-all"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    aria-label="Hapus kata kunci pencarian"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-neon-magenta text-white border border-neo-ink font-mono font-bold text-xs px-2 py-0.5 shadow-neo-sm hover:opacity-90 cursor-pointer"
                  >
                    &times;
                  </button>
                )}
              </div>

              {/* Status Jumlah Tabular Nums */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs sm:text-sm text-neo-ink-2 tabular-nums">
                  Menampilkan <strong className="text-neo-ink font-bold">{filteredPeople.length}</strong> dari{' '}
                  <strong className="text-neo-ink font-bold">{allPeople.length}</strong> personil
                </span>
              </div>
            </div>

            {/* Tombol Tab Kategori */}
            <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-neo-ink/10">
              {CATEGORY_FILTERS.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`font-mono text-xs uppercase px-3.5 py-2 border-2 border-neo-ink transition-all cursor-pointer ${
                      isActive
                        ? 'bg-neon-lime text-neo-ink font-extrabold shadow-neo -translate-x-0.5 -translate-y-0.5'
                        : 'bg-neo-surface text-neo-ink-2 hover:bg-neo-surface-2 shadow-neo-sm font-bold'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Grid Roster Staf & Guru */}
        <section aria-label="Daftar Staf dan Guru">
          {filteredPeople.length === 0 ? (
            <div className="text-center py-16 px-6 border-2 border-dashed border-neo-ink bg-neo-surface shadow-neo max-w-2xl mx-auto space-y-4">
              <h3 className="font-sans text-xl font-bold text-neo-ink">
                Tidak ada personil yang sesuai dengan pencarian
              </h3>
              <p className="text-sm text-neo-ink-2 max-w-md mx-auto leading-relaxed">
                Gunakan kata kunci nama guru, mata pelajaran lain, atau klik tab kategori &quot;Semua&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('Semua');
                }}
                className="mt-2 px-5 py-2.5 bg-neon-lime hover:bg-neon-cyan text-neo-ink border-2 border-neo-ink shadow-neo font-mono font-bold text-xs uppercase cursor-pointer transition-all"
              >
                Reset Pencarian & Kategori &rarr;
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPeople.map((person, idx) => (
                <article
                  key={`${person.name}-${idx}`}
                  className="bg-neo-surface border-2 border-neo-ink shadow-neo hover:shadow-neo-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex flex-col justify-between overflow-hidden"
                >
                  {/* Frame Foto Potret */}
                  <div className="relative w-full aspect-[3/4] bg-neo-surface-2 border-b-2 border-neo-ink overflow-hidden flex items-center justify-center">
                    {person.photo ? (
                      <img
                        src={person.photo}
                        alt={`Potret ${person.name}`}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        width={280}
                        height={373}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neo-surface-2">
                        <span className="font-mono text-4xl font-extrabold text-neo-ink">
                          {person.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Konten Card */}
                  <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="bg-neon-yellow text-neo-ink border border-neo-ink font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 shadow-neo-sm inline-block truncate max-w-full">
                          {person.category}
                        </span>
                        <span className="bg-neon-cyan text-neo-ink border border-neo-ink font-mono text-[11px] font-extrabold uppercase px-2 py-0.5 shadow-neo-sm inline-block">
                          {person.role}
                        </span>
                      </div>

                      <h3 className="font-sans font-bold text-base sm:text-lg text-neo-ink leading-snug line-clamp-2">
                        {person.name}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {person.detail && (
                        <p className="text-xs text-neo-ink-2 leading-relaxed pt-2.5 border-t-2 border-neo-ink/10">
                          {person.detail}
                        </p>
                      )}

                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-neo-ink hover:text-neon-magenta pt-1 transition-colors"
                        >
                          <span>✉</span>
                          <span>{person.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
