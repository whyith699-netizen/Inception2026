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

export default function BeritaDetailPage({ article }: BeritaDetailPageProps) {
  if (!article) {
    return (
      <div className="bg-neo-bg text-neo-ink py-16">
        <div className="container text-center">
          <p className="font-mono text-sm text-neo-ink-3 mb-4">Warta Tidak Ditemukan</p>
          <a href="/berita" className="btn btn-secondary text-xs">
            &larr; Kembali ke Warta Berita
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-neo-bg text-neo-ink py-12 sm:py-16">
      <div className="container max-w-4xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-xs text-neo-ink-3 mb-6 flex items-center flex-wrap gap-2 uppercase tracking-wider"
        >
          <a href="/" className="hover:text-neo-ink">
            Beranda
          </a>
          <span aria-hidden="true">&middot;</span>
          <a href="/berita" className="hover:text-neo-ink">
            Warta Berita
          </a>
          <span aria-hidden="true">&middot;</span>
          <span className="text-neo-ink truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </nav>

        {/* Editorial Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="lbl lbl-lime text-[10px] px-2 py-0.5">
              {article.category}
            </span>
            <span className="font-mono text-xs text-neo-ink-3">
              SMA Negeri 1 Klaten
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neo-ink leading-[1.18] tracking-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-neo-ink-3 border-y border-neo-ink/20 py-3">
            <div>
              <span className="text-neo-ink font-bold">Rilis:</span>{' '}
              <time dateTime={formatIso(article.date)}>
                {formatDate(article.date)}
              </time>
            </div>
            <div>
              <span className="text-neo-ink font-bold">Penulis:</span>{' '}
              <span>{article.author || 'Sekretariat SMAN 1 Klaten'}</span>
            </div>
          </div>
        </header>

        {/* Gambar Sampul Artikel */}
        <div className="mb-8 border border-neo-ink shadow-neo-sm overflow-hidden bg-neo-surface-2">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto max-h-[500px] object-cover"
            loading="eager"
            width={960}
            height={540}
          />
        </div>

        {/* Lede / Ringkasan */}
        {article.excerpt && (
          <div className="mb-8 p-5 bg-neo-surface border-l-4 border-l-neon-lime border border-neo-ink shadow-neo-sm">
            <p className="font-sans font-medium text-base text-neo-ink leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        )}

        {/* Isi Artikel */}
        <div className="space-y-5 text-base sm:text-lg leading-relaxed text-neo-ink-2 font-sans">
          {article.body.map((par, idx) => (
            <p key={idx}>{par}</p>
          ))}
        </div>

        {/* Footer Artikel */}
        <footer className="mt-12 pt-6 border-t border-neo-ink flex flex-wrap items-center justify-between gap-4">
          <a href="/berita" className="btn btn-secondary text-xs">
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
