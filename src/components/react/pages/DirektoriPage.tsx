import { useState, useMemo } from 'react';
import NeoFilterBar from '../NeoFilterBar';
import { PaperAirplaneDoodle, SparkleDoodle, CurvedDashedTrail } from '../DoodleDecorations';

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
        (p.role && p.role.toLowerCase().includes(query)) ||
        (p.email && p.email.toLowerCase().includes(query))
      );
    });
  }, [allPeople, search, selectedRole]);

  const resetFilters = () => {
    setSearch('');
    setSelectedRole('Semua');
  };

  return (
    <div className="direktori-page-wrapper bg-neo-bg text-neo-ink">
      {/* 1. Page Header (Editorial) */}
      <section className="page-head sec sec-flush border-b border-neo-ink bg-neo-bg relative overflow-hidden">
        <div className="absolute top-6 right-8 doodle-float hidden sm:block">
          <PaperAirplaneDoodle flip={true} />
        </div>
        <div className="absolute bottom-4 right-20 doodle-float-delayed">
          <SparkleDoodle size={28} color="#D4FF00" />
        </div>
        <div className="container relative z-10">
          <div className="direktori-head-stickers">
            <p className="lbl">Direktori sekolah</p>
            <p className="lbl lbl-magenta nb-sticker">{allPeople.length} Pendidik &amp; Staf</p>
          </div>
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
          {/* Sub-nav: pencarian dan filter peran */}
          <NeoFilterBar
            search={search}
            onSearch={setSearch}
            searchLabel="Cari nama guru atau staf"
            placeholder="Cari nama guru, staf, atau mata pelajaran..."
            groups={[
              {
                key: 'peran',
                label: 'Peran',
                options: ROLE_FILTERS.map((cat) => ({
                  value: cat,
                  label: cat,
                  count: roleCounts[cat] ?? 0,
                })),
              },
            ]}
            values={{ peran: selectedRole }}
            onFilter={(_key, value) => setSelectedRole(value)}
            resultCount={filteredPeople.length}
            totalCount={allPeople.length}
            noun="personil"
            onReset={resetFilters}
          />

          {/* Grid Personil */}
          {filteredPeople.length === 0 ? (
            <div className="nb-empty">
              <span className="nb-tag nb-tag--magenta">Tidak ditemukan</span>
              <h3 className="font-serif text-xl font-bold text-neo-ink mt-3 mb-2">
                Tidak ada data guru atau staf yang cocok
              </h3>
              <p className="text-sm text-neo-ink-2 mb-5">
                Silakan sesuaikan kata kunci pencarian atau klik tombol kategori &quot;Semua&quot;.
              </p>
              <button type="button" className="nb-reset" onClick={resetFilters}>
                Tampilkan Semua Personil
              </button>
            </div>
          ) : (
            <div className="direktori-grid-cards">
              {filteredPeople.map((person, idx) => {
                const displayRole = getDisplayRole(person.role, person.category);
                const hasValidPhoto = person.photo && !person.photo.includes('logo.png');
                const initialChar = person.name.replace(/^(Drs\.|Dr\.|Prof\.|Ir\.|H\.|Hj\.)\s*/i, '').charAt(0) || 'S';

                return (
                  <article
                    key={`${person.name}-${idx}`}
                    className="direktori-person-card"
                  >
                    <div>
                      {/* Photo Frame 3:4 */}
                      <div className="direktori-photo-frame">
                        {hasValidPhoto ? (
                          <img
                            src={person.photo}
                            alt={`Potret ${person.name}`}
                            className="w-full h-full object-cover object-top relative z-10"
                            loading="lazy"
                            width={280}
                            height={373}
                            onError={(e) => {
                              (e.currentTarget as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : null}

                        {/* Fallback inisial — tampil jika foto tidak ada atau gagal dimuat */}
                        <div className={`w-full h-full flex flex-col items-center justify-center p-4 bg-neo-surface-2 text-center ${hasValidPhoto ? 'absolute inset-0' : ''}`}>
                          <div className="w-16 h-16 border-2 border-neo-ink rounded bg-neon-lime flex items-center justify-center font-serif text-3xl font-extrabold text-neo-ink shadow-neo-sm mb-2">
                            {initialChar}
                          </div>
                          <span className="font-mono text-[10px] font-bold text-neo-ink-3 uppercase tracking-wider">
                            SMAN 1 Klaten
                          </span>
                        </div>

                        {/* Top-Right Tag */}
                        <span className={`direktori-role-badge ${
                          displayRole === 'Kepala Sekolah'
                            ? 'bg-neon-lime text-neo-ink'
                            : displayRole === 'Staf'
                            ? 'bg-neon-yellow text-neo-ink'
                            : 'bg-neo-cyan text-neo-ink'
                        }`}>
                          {displayRole}
                        </span>
                      </div>

                      {/* Info Area */}
                      <div className="direktori-card-body">
                        <h3 className="direktori-person-name">
                          {person.name}
                        </h3>

                        {person.detail && (
                          <p className="direktori-status-line">
                            {person.detail.startsWith('Pangkat/Golongan:')
                              ? `Status: ${person.detail.replace(/Pangkat\/Golongan:\s*/i, '').trim()}`
                              : person.detail}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Footer Card */}
                    <div className="direktori-card-footer">
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
