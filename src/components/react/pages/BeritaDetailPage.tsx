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
            ← Kembali ke Warta Berita
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-neo-bg text-neo-ink py-10 sm:py-14">
      <div className="container max-w-3xl">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-xs text-neo-ink-3 mb-6 flex items-center flex-wrap gap-2"
        >
          <a href="/" className="hover:text-neo-ink font-semibold">
            Beranda
          </a>
          <span aria-hidden="true" className="text-neo-ink-3">/</span>
          <a href="/berita" className="hover:text-neo-ink font-semibold">
            Warta Berita
          </a>
          <span aria-hidden="true" className="text-neo-ink-3">/</span>
          <span className="text-neo-ink font-bold">
            {article.category}
          </span>
        </nav>

        {/* Editorial Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="lbl lbl-lime text-[11px] px-2.5 py-0.5 font-bold">
              {article.category}
            </span>
            <span className="font-mono text-xs text-neo-ink-3">
              SMA Negeri 1 Klaten
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neo-ink leading-snug mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-neo-ink-2 border-y border-neo-ink/20 py-2.5 my-4">
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
        {article.image && (
          <div className="mb-8 border-2 border-neo-ink rounded-md shadow-neo overflow-hidden bg-neo-surface-2 aspect-[16/9]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="eager"
              width={800}
              height={450}
            />
          </div>
        )}

        {/* Lede / Ringkasan Editorial */}
        {article.excerpt && (
          <div className="mb-8 p-5 bg-neo-surface border-2 border-neo-ink rounded-md shadow-neo-sm">
            <p className="font-serif italic text-base sm:text-lg text-neo-ink leading-relaxed">
              "{article.excerpt}"
            </p>
          </div>
        )}

        {/* Isi Artikel */}
        <div className="space-y-5 text-base sm:text-lg leading-relaxed text-neo-ink-2 font-sans max-w-[70ch]">
          {article.body.map((par, idx) => (
            <p key={idx}>{par}</p>
          ))}
        </div>

        {/* Footer Artikel */}
        <footer className="mt-12 pt-6 border-t-2 border-neo-ink flex flex-wrap items-center justify-between gap-4">
          <a href="/berita" className="btn btn-secondary text-xs">
            ← Kembali ke Warta Berita
          </a>
          <span className="font-mono text-xs text-neo-ink-3">
            Dokumentasi Resmi · SMAN 1 Klaten
          </span>
        </footer>
      </div>
    </article>
  );
}
