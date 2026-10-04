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
  'Pimpinan',
  'Sains & Riset',
  'Sosial & Humaniora',
  'Bahasa & Seni',
  'Tenaga Kependidikan',
] as const;

function matchCategory(personCategory: string | undefined, selected: string): boolean {
  if (selected === 'Semua') return true;
  if (!personCategory) return false;
  if (personCategory === selected) return true;

  const target = selected.toLowerCase();
  const cat = personCategory.toLowerCase();

  if (target === 'pimpinan') return cat.includes('pimpinan');
  if (target === 'sains & riset') return cat.includes('sains') || cat.includes('riset');
  if (target === 'sosial & humaniora') return cat.includes('sosial') || cat.includes('humaniora');
  if (target === 'bahasa & seni') return cat.includes('bahasa') || cat.includes('seni');
  if (target === 'tenaga kependidikan') return cat.includes('kependidikan') || cat.includes('administrasi');

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
      const inCategory = matchCategory(p.category, selectedCategory);
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
              padding: '10px 36px 10px 14px',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-sans)',
              background: 'var(--surface)',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--r-sm)',
              color: 'var(--ink)',
              outline: 'none',
              transition: 'border-color 0.15s ease',
            }}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Hapus kata kunci pencarian"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--ink-3)',
                cursor: 'pointer',
                fontSize: '1.125rem',
                lineHeight: 1,
                padding: '4px',
              }}
            >
              &times;
            </button>
          )}
        </div>

        {/* Tombol Penyaring Kategori */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {FILTER_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  padding: '6px 12px',
                  borderRadius: 'var(--r-sm)',
                  border: '1px solid var(--hairline)',
                  background: isActive ? 'var(--ink)' : 'var(--surface)',
                  color: isActive ? 'var(--paper)' : 'var(--ink-2)',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease, color 0.15s ease',
                  fontWeight: isActive ? 600 : 400,
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
            gap: '1px',
            background: 'var(--hairline)',
            border: '1px solid var(--hairline)',
            borderRadius: 'var(--r-md)',
            overflow: 'hidden',
          }}
        >
          {filteredPeople.map((person, idx) => (
            <article
              key={`${person.name}-${idx}`}
              style={{
                background: 'var(--surface)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'background 0.15s ease',
              }}
            >
              <div>
                {person.photo && (
                  <img
                    src={person.photo}
                    alt={`Potret ${person.name}`}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: 'var(--r-sm)',
                      marginBottom: '16px',
                      background: 'var(--paper-2)',
                    }}
                    loading="lazy"
                  />
                )}
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--accent)',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  {person.category}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.125rem',
                    color: 'var(--ink)',
                    margin: '0 0 4px',
                    fontWeight: 600,
                  }}
                >
                  {person.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'var(--ink-2)',
                    margin: '0 0 8px',
                  }}
                >
                  {person.role}
                </p>
              </div>
              {person.detail && (
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--ink-3)',
                    margin: 0,
                    lineHeight: 1.5,
                    borderTop: '1px solid var(--hairline)',
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
