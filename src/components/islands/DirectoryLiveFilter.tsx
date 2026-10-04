import { useState, useMemo } from 'react';

export interface Person {
  name: string;
  role: string;
  detail?: string;
  photo?: string;
  email?: string;
  category?: string;
}

export interface CategoryGroup {
  category: string;
  people: Person[];
}

interface Props {
  initialGroups: CategoryGroup[];
}

const FILTER_CATEGORIES = [
  'Semua',
  'Guru',
  'Staff',
  'Pimpinan',
  'MIPA & Sains',
  'Sosial & Humaniora',
  'Bahasa & Seni',
] as const;

function matchCategory(personCategory: string | undefined, personRole: string | undefined, selected: string): boolean {
  if (selected === 'Semua') return true;
  if (selected === 'Guru') return personRole === 'Guru';
  if (selected === 'Staff') return personRole === 'Staff';

  const cat = (personCategory || '').toLowerCase();
  const target = selected.toLowerCase();

  if (target === 'pimpinan') return cat.includes('pimpinan');
  if (target === 'mipa & sains') return cat.includes('mipa') || cat.includes('sains');
  if (target === 'sosial & humaniora') return cat.includes('sosial') || cat.includes('humaniora');
  if (target === 'bahasa & seni') return cat.includes('bahasa') || cat.includes('seni');

  return cat.includes(target);
}

// ponytail: client-side memoized list filter. upgrade to paginated worker if staff count exceeds 200.
export default function DirectoryLiveFilter({ initialGroups }: Props) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const allPeople = useMemo(() => {
    const list: Person[] = [];
    initialGroups.forEach((group) => {
      group.people.forEach((p) => {
        list.push({ ...p, category: group.category });
      });
    });
    return list;
  }, [initialGroups]);

  const filteredPeople = useMemo(() => {
    const query = search.toLowerCase().trim();

    return allPeople.filter((p) => {
      const inCategory = matchCategory(p.category, p.role, selectedCategory);
      if (!inCategory) return false;

      if (!query) return true;

      return (
        p.name.toLowerCase().includes(query) ||
        p.role.toLowerCase().includes(query) ||
        (p.detail && p.detail.toLowerCase().includes(query)) ||
        (p.category && p.category.toLowerCase().includes(query))
      );
    });
  }, [allPeople, search, selectedCategory]);

  return (
    <div className="directory-filter-island">
      {/* Panel Kontrol & Filter */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--hairline)',
        }}
      >
        {/* Kolom Pencarian Instan */}
        <div style={{ position: 'relative', minWidth: '280px', flex: '1 1 320px' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama guru, mata pelajaran, bidang tugas..."
            aria-label="Cari guru dan staf"
            style={{
              width: '100%',
              padding: '12px 36px 12px 14px',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-sans)',
              background: 'var(--neo-surface)',
              border: 'var(--neo-border)',
              boxShadow: '3px 3px 0px var(--neo-ink)',
              borderRadius: 'var(--r-sm)',
              color: 'var(--neo-ink)',
              outline: 'none',
            }}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Hapus kata kunci pencarian"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'var(--neon-magenta)',
                border: '1px solid var(--neo-ink)',
                borderRadius: '2px',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '1rem',
                lineHeight: 1,
                padding: '2px 6px',
                fontWeight: 800,
              }}
            >
              &times;
            </button>
          )}
        </div>

        {/* Tombol Penyaring Kategori */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {FILTER_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  padding: '8px 14px',
                  borderRadius: 'var(--r-sm)',
                  border: 'var(--neo-border)',
                  background: isActive ? 'var(--neon-lime)' : 'var(--neo-surface)',
                  color: 'var(--neo-ink)',
                  boxShadow: isActive ? '3px 3px 0px var(--neo-ink)' : '2px 2px 0px var(--neo-ink)',
                  cursor: 'pointer',
                  fontWeight: isActive ? 800 : 700,
                  textTransform: 'uppercase',
                  transform: isActive ? 'translate(-1px, -1px)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Indikator Hitungan Tabular Nums & Label Island */}
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--ink-3)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          Menampilkan {filteredPeople.length} dari {allPeople.length} tenaga pendidik & pimpinan
        </span>
        <span
          style={{
            fontSize: '0.6875rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--ink-3)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Pulau Interaktif &middot; client:load
        </span>
      </div>

      {/* Grid Personil atau State Kosong */}
      {filteredPeople.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 24px',
            border: '1px dashed var(--hairline)',
            borderRadius: 'var(--r-md)',
            background: 'var(--paper-2)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              color: 'var(--ink)',
              margin: '0 0 8px',
            }}
          >
            Tidak ada personil yang sesuai dengan pencarian
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--ink-3)', margin: 0 }}>
            Gunakan kata kunci nama guru, mata pelajaran lain, atau klik kategori &quot;Semua&quot;.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredPeople.map((person, idx) => (
            <article
              key={`${person.name}-${idx}`}
              style={{
                background: 'var(--neo-surface)',
                border: 'var(--neo-border)',
                borderRadius: 'var(--r-md)',
                boxShadow: 'var(--neo-shadow)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              <div>
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '3 / 4',
                    maxHeight: '320px',
                    borderRadius: 'var(--r-sm)',
                    marginBottom: '16px',
                    overflow: 'hidden',
                    background: 'var(--neo-surface-2)',
                    border: 'var(--neo-border)',
                    boxShadow: '2px 2px 0px var(--neo-ink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={`Potret ${person.name}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 15%',
                        display: 'block',
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: 'var(--neo-ink)',
                      }}
                    >
                      {person.name.charAt(0)}
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--neo-ink)',
                    background: 'var(--neon-yellow)',
                    border: '1px solid var(--neo-ink)',
                    padding: '2px 8px',
                    boxShadow: '2px 2px 0px var(--neo-ink)',
                    display: 'inline-block',
                    marginBottom: '8px',
                    fontWeight: 800,
                  }}
                >
                  {person.category}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.125rem',
                    color: 'var(--neo-ink)',
                    margin: '0 0 4px',
                    fontWeight: 800,
                  }}
                >
                  {person.name}
                </h3>
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'var(--neo-ink)',
                    background: 'var(--neon-cyan)',
                    border: '1px solid var(--neo-ink)',
                    padding: '2px 8px',
                    boxShadow: '2px 2px 0px var(--neo-ink)',
                    marginBottom: '10px',
                  }}
                >
                  {person.role}
                </span>
              </div>
              {person.detail && (
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--neo-ink-2)',
                    margin: 0,
                    lineHeight: 1.5,
                    borderTop: '1.5px solid var(--neo-border-color)',
                    paddingTop: '12px',
                  }}
                >
                  {person.detail}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
