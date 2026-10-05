export interface BeritaDetailPageProps {
  article: {
    id: string;
    title: string;
    date: Date | string;
    category: string;
    excerpt: string;
    body: string[];
    image: string;
    author?: string;
  };
}

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
      return 'bg-neon-yellow text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold';
    case 'prestasi':
      return 'bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold';
    case 'kegiatan':
      return 'bg-neon-cyan text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold';
    case 'berita':
    default:
      return 'bg-neon-magenta text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold';
  }
}

export default function BeritaDetailPage({ article }: BeritaDetailPageProps) {
  if (!article) {
    return (
      <div className="bg-neo-bg text-neo-ink min-h-screen py-16 px-4">
        <div className="max-w-3xl mx-auto bg-neo-surface border-2 border-neo-ink shadow-neo p-8 text-center rounded-sm">
          <p className="font-mono text-sm text-neo-ink-3 mb-4">Warta Tidak Ditemukan</p>
          <a
            href="/berita"
            className="inline-flex items-center gap-2 bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo px-4 py-2 font-mono font-bold text-xs uppercase"
          >
            &larr; Kembali ke Warta Berita
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-neo-bg text-neo-ink min-h-screen py-8 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-xs uppercase tracking-wider text-neo-ink-3 mb-8 flex items-center flex-wrap gap-2"
        >
          <a href="/" className="hover:text-neo-ink hover:underline">
            Beranda
          </a>
          <span aria-hidden="true" className="text-neo-ink-3">/</span>
          <a href="/berita" className="hover:text-neo-ink hover:underline">
            Warta Berita
          </a>
          <span aria-hidden="true" className="text-neo-ink-3">/</span>
          <span className="text-neo-ink font-bold truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </nav>

        {/* Editorial Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={getCategoryBadgeClass(article.category)}>
              {article.category}
            </span>
            <span className="font-mono text-xs text-neo-ink-3">
              SMA Negeri 1 Klaten
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neo-ink leading-tight tracking-tight mb-6">
            {article.title}
          </h1>

          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs sm:text-sm text-neo-ink-3 border-y-2 border-neo-ink/20 py-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-neo-ink">Rilis:</span>
              <time dateTime={formatIso(article.date)}>
                {formatDate(article.date)}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-neo-ink">Penulis:</span>
              <span>{article.author || 'Sekretariat SMAN 1 Klaten'}</span>
            </div>
          </div>
        </header>

        {/* Gambar Sampul Artikel */}
        <div className="relative mb-10 overflow-hidden border-2 border-neo-ink shadow-neo rounded-sm bg-neo-surface-2">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto max-h-[520px] object-cover"
            loading="eager"
            width={960}
            height={540}
          />
        </div>

        {/* Ringkasan Pembuka (Lede) */}
        {article.excerpt && (
          <div className="mb-8 p-4 sm:p-5 bg-neo-surface border-2 border-neo-ink shadow-neo-sm border-l-4 border-l-neon-lime rounded-sm">
            <p className="font-sans font-medium text-base sm:text-lg text-neo-ink leading-relaxed italic">
              &ldquo;{article.excerpt}&rdquo;
            </p>
          </div>
        )}

        {/* Isi Artikel per Paragraf */}
        <div className="space-y-6 text-base sm:text-lg leading-relaxed text-neo-ink-2 font-sans">
          {article.body.map((par, idx) => (
            <p key={idx} className="text-justify sm:text-left">
              {par}
            </p>
          ))}
        </div>

        {/* Tombol Kembali ke Daftar Berita */}
        <footer className="mt-12 pt-8 border-t-2 border-neo-ink flex flex-wrap items-center justify-between gap-4">
          <a
            href="/berita"
            className="inline-flex items-center gap-2 bg-neo-surface hover:bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo hover:shadow-neo-lg px-6 py-3 font-mono font-bold text-xs uppercase tracking-wider transition-all"
          >
            &larr; Kembali ke Daftar Berita
          </a>

          <span className="font-mono text-xs text-neo-ink-3">
            Arsip Publikasi &middot; SMAN 1 Klaten
          </span>
        </footer>
      </div>
    </article>
  );
}
