import { useState, useMemo, useEffect } from 'react';

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('kategori');
      if (catParam && CATEGORIES.some((c) => c.toLowerCase() === catParam.toLowerCase())) {
        setSelectedCategory(catParam);
      }
    }
  }, []);

  const sortedList = useMemo(() => {
    return [...newsList].sort((a, b) => {
      const timeA = toDate(a.date).getTime();
      const timeB = toDate(b.date).getTime();
      return timeB - timeA;
    });
  }, [newsList]);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'Semua') return sortedList;
    return sortedList.filter(
      (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [sortedList, selectedCategory]);

  const featuredArticle = filteredArticles[0] || null;
  const gridArticles = filteredArticles.slice(1);

  return (
    <div className="berita-page-wrapper">
      {/* 1. Original Page Head */}
      <section className="page-head sec sec-flush">
        <div className="container">
          <p className="lbl">Warta sekolah</p>
          <h1 className="page-title">Kabar dan pengumuman resmi</h1>
          <p className="lede">
            Dokumentasi prestasi, agenda akademik, kebijakan kesiswaan, serta
            kegiatan civitas akademika SMA Negeri 1 Klaten.
          </p>
        </div>
      </section>

      {/* 2. Filter Bar */}
      <div className="container">
        <nav className="filter-bar" aria-label="Penyaring kategori warta">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`filter-link ${isActive ? 'is-active' : ''}`}
              >
                {cat}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3. Featured Post */}
      {featuredArticle && (
        <section className="featured-sec sec sec-flush">
          <div className="container">
            <article className="featured-post">
              <a href={`/berita/${featuredArticle.id}`} className="featured-thumb">
                <img
                  src={featuredArticle.image || '/images/hero-campus.webp'}
                  alt={featuredArticle.title}
                  loading="eager"
                  width={640}
                  height={400}
                />
              </a>
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
            <div className="p-12 text-center bg-neo-surface border border-neo-ink rounded-md">
              <p className="font-serif text-lg font-bold text-neo-ink mb-2">
                Tidak ada artikel pada kategori &ldquo;{selectedCategory}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory('Semua')}
                className="btn btn-secondary text-xs"
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
