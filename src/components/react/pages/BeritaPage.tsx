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
    <div className="bg-neo-bg text-neo-ink">
      {/* 1. Page Header (Editorial) */}
      <section className="py-12 sm:py-16 border-b border-neo-ink bg-neo-bg">
        <div className="container">
          <span className="lbl lbl-lime mb-3 inline-block">WARTA SEKOLAH</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neo-ink mb-4 max-w-3xl leading-[1.15]">
            Kabar Seputar SMANSA
          </h1>
          <p className="text-neo-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            Agenda sekolah, pengumuman resmi dinas, catatan prestasi siswa, dan dinamika kegiatan kesiswaan SMA Negeri 1 Klaten.
          </p>

          {/* Filter Tab Kategori */}
          <div className="flex flex-wrap gap-2 pt-6 border-t border-neo-ink">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono text-xs px-3 py-1.5 border border-neo-ink transition-all cursor-pointer ${
                    isActive
                      ? 'bg-neon-lime text-neo-ink font-bold shadow-neo-sm'
                      : 'bg-neo-surface text-neo-ink-2 hover:bg-neo-surface-2'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Banner Berita Utama */}
      {featuredArticle && (
        <section className="py-12 border-b border-neo-ink bg-neo-surface">
          <div className="container">
            <span className="lbl lbl-lime text-[10px] px-2 py-0.5 inline-block mb-4">
              SOROTAN UTAMA
            </span>
            <article className="grid grid-cols-1 lg:grid-cols-12 border border-neo-ink shadow-neo-sm overflow-hidden bg-neo-surface">
              <a
                href={`/berita/${featuredArticle.id}`}
                className="lg:col-span-7 relative block aspect-video lg:aspect-auto lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-neo-ink bg-neo-surface-2 group"
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
              </a>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="lbl lbl-lime text-[10px] px-2 py-0.5">
                      {featuredArticle.category}
                    </span>
                    <time
                      dateTime={formatIso(featuredArticle.date)}
                      className="font-mono text-xs text-neo-ink-3"
                    >
                      {formatDate(featuredArticle.date)}
                    </time>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neo-ink mb-3 leading-snug hover:underline">
                    <a href={`/berita/${featuredArticle.id}`}>
                      {featuredArticle.title}
                    </a>
                  </h2>

                  <p className="text-neo-ink-2 text-sm sm:text-base leading-relaxed line-clamp-4 mb-6">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-neo-ink/20 flex items-center justify-between">
                  <span className="font-mono text-xs text-neo-ink-3">
                    {featuredArticle.author || 'Tim Humas SMAN 1 Klaten'}
                  </span>
                  <a
                    href={`/berita/${featuredArticle.id}`}
                    className="btn btn-secondary text-xs"
                  >
                    Baca Lengkapnya →
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* 3. Grid Kartu Artikel */}
      <section className="py-12 sm:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-neo-ink">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-neo-ink">
              Arsip Warta ({filteredArticles.length} Publikasi)
            </h2>
            <span className="font-mono text-xs text-neo-ink-3">
              Kategori: {selectedCategory}
            </span>
          </div>

          {gridArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-neo-surface border border-neo-ink shadow-neo-sm p-4 flex flex-col justify-between hover:shadow-neo transition-all"
                >
                  <div>
                    <a
                      href={`/berita/${article.id}`}
                      className="block aspect-video overflow-hidden border border-neo-ink mb-4 bg-neo-surface-2 group"
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

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="lbl lbl-lime text-[10px] px-1.5 py-0.5">
                          {article.category}
                        </span>
                        <time
                          dateTime={formatIso(article.date)}
                          className="font-mono text-xs text-neo-ink-3"
                        >
                          {formatDate(article.date)}
                        </time>
                      </div>

                      <h3 className="font-serif font-bold text-base sm:text-lg text-neo-ink mb-2 leading-snug line-clamp-2 hover:underline">
                        <a href={`/berita/${article.id}`}>{article.title}</a>
                      </h3>

                      <p className="text-neo-ink-2 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neo-ink/10 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-neo-ink-3 truncate max-w-[140px]">
                      {article.author || 'SMAN 1 Klaten'}
                    </span>
                    <a
                      href={`/berita/${article.id}`}
                      className="font-mono text-xs font-bold text-neo-ink hover:underline"
                    >
                      Baca Artikel →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : featuredArticle ? (
            <p className="font-mono text-sm text-neo-ink-3 bg-neo-surface border border-neo-ink p-6 text-center">
              Seluruh warta pada kategori ini telah ditampilkan pada sorotan utama di atas.
            </p>
          ) : (
            <div className="bg-neo-surface border border-neo-ink p-10 text-center max-w-lg mx-auto">
              <span className="lbl lbl-lime mb-2 inline-block">WARTA KOSONG</span>
              <h3 className="font-serif text-xl font-bold text-neo-ink mb-2">
                Belum Ada Berita di Kategori Ini
              </h3>
              <p className="text-neo-ink-2 text-xs mb-4">
                Tidak ada publikasi warta yang ditemukan untuk kategori “{selectedCategory}”.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory('Semua')}
                className="btn btn-secondary text-xs"
              >
                Tampilkan Semua Berita
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
