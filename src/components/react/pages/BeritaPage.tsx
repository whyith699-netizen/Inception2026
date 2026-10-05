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

function getCategoryBadgeClass(category: string): string {
  switch (category.toLowerCase()) {
    case 'pengumuman':
      return 'bg-neon-yellow text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-2.5 py-0.5 font-bold';
    case 'prestasi':
      return 'bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-2.5 py-0.5 font-bold';
    case 'kegiatan':
      return 'bg-neon-cyan text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-2.5 py-0.5 font-bold';
    case 'berita':
    default:
      return 'bg-neon-magenta text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-2.5 py-0.5 font-bold';
  }
}

export default function BeritaPage({ newsList = [] }: BeritaPageProps) {
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
    <div className="bg-neo-bg text-neo-ink min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Warta Sekolah */}
        <header className="mb-10 sm:mb-12 border-b-2 border-neo-ink pb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold">
              Warta Sekolah
            </span>
            <span className="font-mono text-xs text-neo-ink-3">
              SMA Negeri 1 Klaten &middot; Publikasi Resmi
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neo-ink tracking-tight mb-4">
            Kabar Seputar SMANSA
          </h1>
          <p className="text-neo-ink-2 text-base sm:text-lg max-w-3xl leading-relaxed">
            Agenda sekolah, pengumuman resmi dinas, catatan prestasi siswa, dan dinamika kegiatan kesiswaan SMA Negeri 1 Klaten.
          </p>

          {/* Filter Tab Kategori */}
          <nav aria-label="Filter kategori berita" className="flex flex-wrap gap-2 sm:gap-3 mt-6 pt-6 border-t-2 border-neo-ink/20">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono text-xs sm:text-sm uppercase tracking-wider px-3.5 py-1.5 border-2 border-neo-ink transition-all ${
                    isActive
                      ? 'bg-neon-lime text-neo-ink font-bold shadow-neo -translate-x-0.5 -translate-y-0.5'
                      : 'bg-neo-surface text-neo-ink-2 hover:bg-neo-surface-2 shadow-neo-sm font-semibold'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </nav>
        </header>

        {/* Banner Berita Utama */}
        {featuredArticle && (
          <section aria-labelledby="featured-heading" className="mb-12 sm:mb-16">
            <h2 id="featured-heading" className="sr-only">
              Berita Utama Pilihan
            </h2>
            <article className="grid grid-cols-1 lg:grid-cols-12 bg-neo-surface border-2 border-neo-ink shadow-neo-lg rounded-sm overflow-hidden transition-transform">
              <a
                href={`/berita/${featuredArticle.id}`}
                className="lg:col-span-7 relative block aspect-video lg:aspect-auto lg:h-full overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-neo-ink bg-neo-surface-2 group"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="eager"
                  width={960}
                  height={540}
                />
                <span className="absolute top-3 left-3 bg-neon-yellow text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs font-bold uppercase px-2.5 py-1">
                  Sorotan Utama
                </span>
              </a>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={getCategoryBadgeClass(featuredArticle.category)}>
                      {featuredArticle.category}
                    </span>
                    <time
                      dateTime={formatIso(featuredArticle.date)}
                      className="font-mono text-xs text-neo-ink-3"
                    >
                      {formatDate(featuredArticle.date)}
                    </time>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neo-ink mb-3 leading-snug hover:underline">
                    <a href={`/berita/${featuredArticle.id}`}>
                      {featuredArticle.title}
                    </a>
                  </h3>

                  <p className="text-neo-ink-2 text-sm sm:text-base leading-relaxed line-clamp-4 mb-6">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-neo-ink/20 flex items-center justify-between">
                  <span className="font-mono text-xs text-neo-ink-3">
                    {featuredArticle.author || 'Sekretariat SMAN 1 Klaten'}
                  </span>
                  <a
                    href={`/berita/${featuredArticle.id}`}
                    className="inline-flex items-center gap-2 bg-neon-lime hover:bg-neon-cyan text-neo-ink border-2 border-neo-ink shadow-neo px-4 py-2 font-mono font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Baca Lengkapnya &rarr;
                  </a>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* Grid Kartu Artikel */}
        <section aria-labelledby="grid-heading" className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-neo-ink">
            <h2 id="grid-heading" className="font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-neo-ink">
              Arsip Warta ({filteredArticles.length} Artikel)
            </h2>
            <span className="font-mono text-xs text-neo-ink-3">
              Kategori: {selectedCategory}
            </span>
          </div>

          {gridArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {gridArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-neo-surface border-2 border-neo-ink shadow-neo hover:shadow-neo-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all rounded-sm overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <a
                      href={`/berita/${article.id}`}
                      className="block aspect-video overflow-hidden border-b-2 border-neo-ink bg-neo-surface-2 group"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                        width={480}
                        height={270}
                      />
                    </a>

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={getCategoryBadgeClass(article.category)}>
                          {article.category}
                        </span>
                        <time
                          dateTime={formatIso(article.date)}
                          className="font-mono text-xs text-neo-ink-3"
                        >
                          {formatDate(article.date)}
                        </time>
                      </div>

                      <h3 className="font-sans font-bold text-lg text-neo-ink mb-2 leading-snug line-clamp-2 hover:underline">
                        <a href={`/berita/${article.id}`}>{article.title}</a>
                      </h3>

                      <p className="text-neo-ink-2 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t-2 border-neo-ink/10 flex items-center justify-between">
                    <span className="font-mono text-xs text-neo-ink-3 truncate max-w-[140px]">
                      {article.author || 'SMAN 1 Klaten'}
                    </span>
                    <a
                      href={`/berita/${article.id}`}
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider text-neo-ink border-b-2 border-neo-ink hover:bg-neon-lime px-1 py-0.5 transition-colors"
                    >
                      Baca Artikel &rarr;
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : featuredArticle ? (
            <p className="font-mono text-sm text-neo-ink-3 bg-neo-surface border-2 border-neo-ink p-6 shadow-neo text-center">
              Seluruh warta pada kategori ini telah ditampilkan pada sorotan utama di atas.
            </p>
          ) : (
            <div className="bg-neo-surface border-2 border-neo-ink shadow-neo p-10 sm:p-14 text-center my-8 rounded-sm">
              <span className="font-mono text-xs uppercase tracking-wider bg-neon-yellow text-neo-ink border-2 border-neo-ink shadow-neo-sm px-3 py-1 font-bold inline-block mb-3">
                Warta Kosong
              </span>
              <h3 className="font-serif text-2xl font-bold text-neo-ink mb-2">
                Belum Ada Berita di Kategori Ini
              </h3>
              <p className="text-neo-ink-2 text-sm max-w-md mx-auto mb-6">
                Tidak ada publikasi warta yang ditemukan untuk kategori &ldquo;{selectedCategory}&rdquo;. Silakan beralih ke kategori lainnya.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory('Semua')}
                className="inline-flex items-center gap-2 bg-neon-lime hover:bg-neon-cyan text-neo-ink border-2 border-neo-ink shadow-neo px-5 py-2.5 font-mono font-bold text-xs uppercase tracking-wider transition-all"
              >
                Tampilkan Semua Berita
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
