import { useState, useMemo, useEffect } from 'react';
import NeoFilterBar from '../NeoFilterBar';
import { PaperAirplaneDoodle, SparkleDoodle, CurvedDashedTrail } from '../DoodleDecorations';

export interface NewsArticle {
  id: string;
  title: string;
  date: Date | string;
  category: 'Berita' | 'Pengumuman' | 'Prestasi' | 'Kegiatan' | 'Informasi' | string;
  excerpt: string;
  body: string[];
  image: string;
  author?: string;
}

interface BeritaPageProps {
  newsList: NewsArticle[];
}

const CATEGORIES = ['Semua', 'Berita', 'Pengumuman', 'Prestasi', 'Kegiatan'];

function toDate(dateInput: Date | string): Date {
  return dateInput instanceof Date ? dateInput : new Date(dateInput);
}

function formatDate(dateInput: Date | string): string {
  const d = toDate(dateInput);
  if (isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

function formatIso(dateInput: Date | string): string {
  const d = toDate(dateInput);
  return isNaN(d.getTime()) ? '' : d.toISOString();
}

export const BeritaPage = ({ newsList = [] }: BeritaPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('kategori');
      if (catParam && CATEGORIES.some((c) => c.toLowerCase() === catParam.toLowerCase())) {
        setSelectedCategory(catParam);
      }
      const query = params.get('q');
      if (query) setSearchQuery(query);
    }
  }, []);

  const sortedList = useMemo(() => {
    return [...newsList].sort((a, b) => {
      const timeA = toDate(a.date).getTime();
      const timeB = toDate(b.date).getTime();
      return timeB - timeA;
    });
  }, [newsList]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Semua: sortedList.length };
    for (const cat of CATEGORIES.slice(1)) {
      counts[cat] = sortedList.filter(
        (item) => item.category.toLowerCase() === cat.toLowerCase()
      ).length;
    }
    return counts;
  }, [sortedList]);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return sortedList.filter((item) => {
      const matchCat =
        selectedCategory === 'Semua' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      if (!matchCat) return false;
      if (!query) return true;
      return (
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.author && item.author.toLowerCase().includes(query)) ||
        item.body.some((paragraph) => paragraph.toLowerCase().includes(query))
      );
    });
  }, [sortedList, selectedCategory, searchQuery]);

  const featuredArticle = filteredArticles[0] || null;
  const gridArticles = filteredArticles.slice(1);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
  };

  return (
    <div className="berita-page-wrapper">
      {/* 1. Original Page Head */}
      <section className="page-head sec sec-flush relative overflow-hidden">
        <div className="absolute top-6 right-8 doodle-float hidden sm:block">
          <PaperAirplaneDoodle flip={true} />
        </div>
        <div className="absolute bottom-4 right-20 doodle-float-delayed">
          <SparkleDoodle size={28} color="#FFE600" />
        </div>
        <div className="container relative z-10">
          <p className="lbl">Warta sekolah</p>
          <h1 className="page-title">Kabar dan pengumuman resmi</h1>
          <p className="lede">
            Dokumentasi prestasi, agenda akademik, kebijakan kesiswaan, serta
            kegiatan civitas akademika SMA Negeri 1 Klaten.
          </p>
          <p className="flex flex-wrap gap-2 mt-4">
            <span className="inline-block bg-neon-lime border-2 border-neo-ink rounded font-mono text-[11px] font-bold text-neo-ink px-2.5 py-1 shadow-neo-sm">
              {sortedList.length} Rilisan Terkini
            </span>
            <span className="inline-block bg-neon-cyan border-2 border-neo-ink rounded font-mono text-[11px] font-bold text-neo-ink px-2.5 py-1 shadow-neo-sm">
              Update Berkala
            </span>
          </p>
        </div>
      </section>

      {/* 2. Sub-nav: pencarian dan filter kategori */}
      <div className="container">
        <NeoFilterBar
          search={searchQuery}
          onSearch={setSearchQuery}
          searchLabel="Cari artikel warta"
          placeholder="Cari berita, pengumuman, atau prestasi..."
          groups={[
            {
              key: 'kategori',
              label: 'Kategori',
              options: CATEGORIES.map((cat) => ({
                value: cat,
                label: cat,
                count: categoryCounts[cat] ?? 0,
              })),
            },
          ]}
          values={{ kategori: selectedCategory }}
          onFilter={(_key, value) => setSelectedCategory(value)}
          resultCount={filteredArticles.length}
          totalCount={sortedList.length}
          noun="artikel"
          onReset={resetFilters}
        />
      </div>

      {/* 3. Featured Post */}
      {featuredArticle && (
        <section className="featured-sec sec sec-flush">
          <div className="container">
            <article className={`featured-post ${!featuredArticle.image ? 'featured-post--no-img' : ''}`}>
              {featuredArticle.image && (
                <a href={`/berita/${featuredArticle.id}`} className="featured-thumb">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    loading="eager"
                    width={640}
                    height={400}
                    onError={(e) => {
                      (e.target as HTMLElement).parentElement!.style.display = 'none';
                    }}
                  />
                </a>
              )}
              <div className="featured-body">
                <div className="post-meta">
                  <span className="post-cat">{featuredArticle.category}</span>
                  <time dateTime={formatIso(featuredArticle.date)}>
                    {formatDate(featuredArticle.date)}
                  </time>
                </div>
                <h2 className="post-title">
                  <a href={`/berita/${featuredArticle.id}`}>{featuredArticle.title}</a>
                </h2>
                <p className="post-excerpt">{featuredArticle.excerpt}</p>
                <a href={`/berita/${featuredArticle.id}`} className="btn-text">
                  Baca selengkapnya →
                </a>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* 4. Post Grid */}
      <section className="list-sec sec sec-flush">
        <div className="container">
          {gridArticles.length > 0 ? (
            <div className="post-grid">
              {gridArticles.map((post) => (
                <article className="post-card" key={post.id}>
                  <a href={`/berita/${post.id}`} className="post-card-link">
                    <div className="post-meta">
                      <span className="post-cat">{post.category}</span>
                      <time dateTime={formatIso(post.date)}>
                        {formatDate(post.date)}
                      </time>
                    </div>
                    <h3 className="post-card-title">{post.title}</h3>
                    <p className="post-card-excerpt">{post.excerpt}</p>
                  </a>
                </article>
              ))}
            </div>
          ) : !featuredArticle ? (
            <div className="nb-empty">
              <span className="nb-tag nb-tag--magenta">Tidak ditemukan</span>
              <p className="font-serif text-lg font-bold text-neo-ink mt-3 mb-5">
                Tidak ada artikel yang cocok dengan kata kunci atau kategori terpilih
              </p>
              <button
                type="button"
                className="nb-reset"
                onClick={resetFilters}
              >
                Tampilkan Semua Berita
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default BeritaPage;
