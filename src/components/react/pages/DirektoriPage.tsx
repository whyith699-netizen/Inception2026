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

export function getDisplayRole(role: string, category?: string): 'Kepala Sekolah' | 'Staf' | 'Guru' {
  const r = (role || '').toLowerCase();
  const c = (category || '').toLowerCase();
  if (r.includes('kepala sekolah')) return 'Kepala Sekolah';
  if (r.includes('staff') || r.includes('staf') || c.includes('kependidikan') || c.includes('tata usaha')) {
    return 'Staf';
  }
  return 'Guru';
}

const ROLE_FILTERS = ['Semua', 'Kepala Sekolah', 'Guru', 'Staf'] as const;

export const DirektoriPage = ({ staffGroups = [] }: DirektoriPageProps) => {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('Semua');

  const allPeople = useMemo(() => {
    const list: StaffPerson[] = [];
    (staffGroups || []).forEach((group) => {
      (group.people || []).forEach((p) => {
        list.push({ ...p, category: group.category });
      });
    });
    return list;
  }, [staffGroups]);

  const roleCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Semua: allPeople.length,
      'Kepala Sekolah': 0,
      Guru: 0,
      Staf: 0,
    };
    allPeople.forEach((p) => {
      const r = getDisplayRole(p.role, p.category);
      counts[r] = (counts[r] || 0) + 1;
    });
    return counts;
  }, [allPeople]);

  const filteredPeople = useMemo(() => {
    const query = search.toLowerCase().trim();
    return allPeople.filter((p) => {
      const displayRole = getDisplayRole(p.role, p.category);
      if (selectedRole !== 'Semua' && displayRole !== selectedRole) {
        return false;
      }
      if (!query) return true;
      return (
        p.name.toLowerCase().includes(query) ||
        displayRole.toLowerCase().includes(query) ||
        (p.detail && p.detail.toLowerCase().includes(query)) ||
        (p.email && p.email.toLowerCase().includes(query))
      );
    });
  }, [allPeople, search, selectedRole]);

  return (
    <div className="direktori-page-wrapper bg-neo-bg text-neo-ink">
      {/* 1. Page Header (Editorial) */}
      <section className="page-head sec sec-flush border-b border-neo-ink bg-neo-bg">
        <div className="container">
          <p className="lbl">Direktori sekolah</p>
          <h1 className="page-title">Guru dan staf SMAN 1 Klaten</h1>
          <p className="page-lead">
            Daftar resmi kepala sekolah, tenaga pendidik, dan staf tata usaha yang mengelola
            33 rombongan belajar, kurikulum nasional, serta pembinaan karakter siswa di SMAN 1 Klaten.
          </p>
        </div>
      </section>

      {/* 2. Interactive Directory Island */}
      <section className="sec sec-flush" style={{ paddingTop: 'clamp(32px, 5vw, 56px)', paddingBottom: 'clamp(56px, 8vw, 88px)' }}>
        <div className="container">
          {/* Panel Kontrol & Filter */}
          <div className="bg-neo-surface border-2 border-neo-ink rounded-md shadow-neo p-5 sm:p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-5 border-b border-neo-ink/15">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama guru, staf, atau NIP..."
                  aria-label="Cari nama guru atau staf"
                  className="w-full pl-4 pr-10 py-2.5 bg-neo-bg border-2 border-neo-ink rounded text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:bg-white font-mono shadow-neo-sm transition-colors"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    aria-label="Hapus kata kunci pencarian"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-neon-magenta text-white border border-neo-ink rounded text-xs px-2 py-0.5 font-bold hover:bg-neon-magenta/90 cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Status Counter */}
              <div className="font-mono text-xs text-neo-ink-2">
                Menampilkan <strong className="text-neo-ink font-bold">{filteredPeople.length}</strong> dari {allPeople.length} personil
              </div>
            </div>

            {/* Filter Buttons: Hanya Kepala Sekolah, Guru, Staf */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-neo-ink uppercase mr-2">
                Kategori:
              </span>
              {ROLE_FILTERS.map((cat) => {
                const isActive = selectedRole === cat;
                const count = roleCounts[cat] ?? 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedRole(cat)}
                    className={`font-mono text-xs px-3 py-1.5 border-2 border-neo-ink rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-neon-lime text-neo-ink font-extrabold shadow-neo-sm -translate-y-0.5'
                        : 'bg-neo-bg text-neo-ink hover:bg-neo-surface-2'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded border ${
                      isActive ? 'bg-neo-ink text-white border-neo-ink' : 'bg-white text-neo-ink border-neo-ink/30'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Personil */}
          {filteredPeople.length === 0 ? (
            <div className="text-center py-16 px-6 border-2 border-dashed border-neo-ink bg-neo-surface rounded-md max-w-xl mx-auto space-y-3 shadow-neo">
              <h3 className="font-serif text-xl font-bold text-neo-ink">
                Tidak ada data guru atau staf yang cocok
              </h3>
              <p className="text-sm text-neo-ink-2">
                Silakan sesuaikan kata kunci pencarian atau klik tombol kategori &quot;Semua&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedRole('Semua');
                }}
                className="btn btn-secondary text-xs"
              >
                Tampilkan Semua Personil →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPeople.map((person, idx) => {
                const displayRole = getDisplayRole(person.role, person.category);
                const hasValidPhoto = person.photo && !person.photo.includes('logo.png');
                const initialChar = person.name.replace(/^(Drs\.|Dr\.|Prof\.|Ir\.|H\.|Hj\.)\s*/i, '').charAt(0) || 'S';

                return (
                  <article
                    key={`${person.name}-${idx}`}
                    className="bg-neo-surface border-2 border-neo-ink rounded-md shadow-neo overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-neo-lg transition-all h-full"
                  >
                    <div>
                      {/* Photo Frame 3:4 */}
                      <div className="w-full aspect-[3/4] bg-neo-surface-2 border-b-2 border-neo-ink overflow-hidden relative flex items-center justify-center">
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
                            <div className="w-16 h-16 border-2 border-neo-ink rounded bg-neon-lime flex items-center justify-center font-serif text-3xl font-extrabold text-neo-ink shadow-neo-sm mb-2">
                              {initialChar}
                            </div>
                            <span className="font-mono text-[10px] font-bold text-neo-ink-3 uppercase tracking-wider">
                              SMAN 1 Klaten
                            </span>
                          </div>
                        )}

                        {/* Top-Right Tag */}
                        <span className={`absolute top-2.5 right-2.5 font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 border border-neo-ink rounded shadow-[1.5px_1.5px_0px_#111418] ${
                          displayRole === 'Kepala Sekolah'
                            ? 'bg-neon-lime text-neo-ink'
                            : displayRole === 'Staf'
                            ? 'bg-neon-yellow text-neo-ink'
                            : 'bg-white text-neo-ink'
                        }`}>
                          {displayRole}
                        </span>
                      </div>

                      {/* Info Area */}
                      <div className="p-4">
                        <h3 className="font-serif font-bold text-base text-neo-ink leading-snug line-clamp-2 min-h-[2.6rem]">
                          {person.name}
                        </h3>

                        {person.detail && (
                          <p className="text-xs text-neo-ink-2 mt-2 pt-2 border-t border-neo-ink/10 leading-relaxed font-mono">
                            {person.detail.startsWith('Pangkat/Golongan:')
                              ? `Status: ${person.detail.replace(/Pangkat\/Golongan:\s*/i, '').trim()}`
                              : person.detail}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Footer Card */}
                    <div className="px-4 pb-4 pt-1 flex items-center justify-between text-[11px] font-mono text-neo-ink-3 border-t border-neo-ink/10 mt-auto">
                      <span>SMAN 1 Klaten</span>
                      <span className="font-bold text-neo-ink">Aktif</span>
                    </div>
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
