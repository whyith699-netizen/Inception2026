import React, { useState, useEffect } from 'react';

interface HeaderProps {
  currentPath?: string;
}

const MORE_LINKS = [
  { href: '/fasilitas', label: 'Fasilitas', note: 'Lab, e-Perpus, GOR' },
  { href: '/prestasi', label: 'Prestasi', note: 'Rekam jejak kejuaraan' },
  { href: '/kontak', label: 'Kontak', note: 'Sekretariat & layanan' },
  { href: '/#profil', label: 'Profil', note: 'Sejarah & identitas' },
];

const pathOf = (href: string) => href.split('#')[0];

export const Header: React.FC<HeaderProps> = ({ currentPath: propPath }) => {
  const [currentPath, setCurrentPath] = useState(propPath || '');
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname.replace(/\/$/, ''));
    }
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [moreOpen]);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/program', label: 'Akademik' },
    { href: '/direktori', label: 'Direktori' },
    { href: '/berita', label: 'Berita' },
    { href: '/alumni', label: 'Alumni' },
    { href: '/ppdb', label: 'PPDB 2026' },
  ];

  const moreActive = MORE_LINKS.some(
    (l) => currentPath !== '' && currentPath === pathOf(l.href)
  );

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="/" className="brand-link" aria-label="Kembali ke beranda">
          <div className="brand-logo-frame">
            <img
              src="/images/school/logo.png"
              alt="Lambang SMA Negeri 1 Klaten"
              className="brand-logo-img"
              width={32}
              height={32}
              loading="eager"
            />
          </div>
          <div className="brand-text">
            <span className="school-name">SMAN 1 KLATEN</span>
            <span className="school-alias">Padmawijaya &middot; Klaten</span>
          </div>
        </a>

        {/* Mobile Navigation Toggle Button */}
        <button
          type="button"
          className={`nav-toggle ${isOpen ? 'is-open' : ''}`}
          aria-expanded={isOpen}
          aria-controls="main-nav"
          aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="nav-toggle-bar" aria-hidden="true"></span>
          <span className="nav-toggle-bar" aria-hidden="true"></span>
          <span className="nav-toggle-bar" aria-hidden="true"></span>
        </button>

        {/* Navigation Bar */}
        <nav className={`main-nav ${isOpen ? 'is-open' : ''}`} id="main-nav" aria-label="Navigasi utama">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isHome = link.href === '/';
              const isAnchor = link.href.includes('#');
              
              let isActive = false;
              if (isHome) {
                isActive = currentPath === '' || currentPath === '/';
              } else if (!isAnchor) {
                const target = link.href.replace(/\/$/, '');
                isActive = currentPath === target || currentPath.startsWith(target + '/');
              }

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}

            {/* Desktop: dropdown "Lainnya" untuk halaman di luar top bar */}
            <li
              className="nav-more has-panel"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setMoreOpen(false);
              }}
            >
              <button
                type="button"
                className={`nav-item nav-more-trigger ${moreActive ? 'active' : ''}`}
                aria-haspopup="menu"
                aria-expanded={moreOpen}
                aria-controls="nav-more-menu"
                onClick={() => setMoreOpen((o) => !o)}
              >
                Lainnya
                <span className="nav-caret" aria-hidden="true">▾</span>
              </button>
              <ul
                id="nav-more-menu"
                role="menu"
                className={`nav-more-panel ${moreOpen ? 'is-open' : ''}`}
              >
                {MORE_LINKS.map((link) => {
                  const isActive = currentPath !== '' && currentPath === pathOf(link.href);
                  return (
                    <li key={link.href}>
                      <a
                        role="menuitem"
                        href={link.href}
                        className="nav-more-link"
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => setMoreOpen(false)}
                      >
                        <strong>{link.label}</strong>
                        <span>{link.note}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>

            {/* Mobile: grup "Informasi lain" — tanpa dropdown bertingkat */}
            <li className="nav-more-group">
              <span className="nav-group-label">Informasi lain</span>
              <ul className="nav-sub-list">
                {MORE_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="nav-item"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            {/* Mobile: CTA SmansaBot disembunyikan di <900px, jadi tampilkan di drawer */}
            <li className="nav-cta-mobile">
              <button
                type="button"
                className="btn-chat-link cursor-pointer w-full text-left bg-transparent border-0"
                onClick={() => {
                  setIsOpen(false);
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('open-smansabot'));
                  }
                }}
              >
                <span className="chat-dot" aria-hidden="true"></span>
                <span>SmansaBot AI</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Action Button: SmansaBot AI */}
        <div className="header-action">
          <button
            type="button"
            className="btn-chat-link cursor-pointer"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('open-smansabot'));
              }
            }}
          >
            <span className="chat-dot" aria-hidden="true"></span>
            <span>SmansaBot AI</span>
          </button>
        </div>
      </div>

      <style>{`
        .site-header {
          height: 64px;
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 40;
          background-color: var(--neo-surface);
          border-bottom: var(--neo-border);
          box-shadow: 0 2px 0px rgba(17, 20, 24, 0.08);
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          width: 100%;
        }

        .brand-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .brand-logo-frame {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-logo-img {
          width: 32px;
          height: 32px;
          object-fit: contain;
          border: 1.5px solid var(--neo-ink);
          border-radius: var(--r-sm);
          box-shadow: 2px 2px 0px var(--neo-ink);
          background: #FFFFFF;
          padding: 2px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .school-name {
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: -0.01em;
          color: var(--neo-ink);
          line-height: 1.2;
        }

        .school-alias {
          font-size: 0.72rem;
          color: var(--neo-ink-3);
          font-family: var(--font-mono);
          letter-spacing: 0.02em;
        }

        .nav-list {
          display: flex;
          align-items: center;
          gap: 6px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          display: inline-block;
          padding: 6px 12px;
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--neo-ink);
          text-decoration: none;
          border-radius: var(--r-sm);
          transition: background-color 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
        }

        .nav-item:hover {
          background-color: var(--neon-cyan);
          color: var(--neo-ink);
          box-shadow: 2px 2px 0px var(--neo-ink);
          transform: translate(-1px, -1px);
        }

        .nav-item.active {
          background-color: var(--neon-lime);
          color: var(--neo-ink);
          border: var(--neo-border-thin);
          box-shadow: 2px 2px 0px var(--neo-ink);
        }

        .header-action {
          display: flex;
          align-items: center;
        }

        .btn-chat-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background-color: var(--neon-lime);
          color: var(--neo-ink);
          border: var(--neo-border);
          box-shadow: var(--neo-shadow-sm);
          border-radius: var(--r-sm);
          text-decoration: none;
          transition: transform 0.12s ease, box-shadow 0.12s ease, background-color 0.15s ease;
        }

        .btn-chat-link:hover {
          background-color: var(--neon-cyan);
          transform: translate(-2px, -2px);
          box-shadow: 3px 3px 0px var(--neo-ink);
        }

        .chat-dot {
          width: 8px;
          height: 8px;
          background-color: var(--neon-magenta);
          border: 1px solid var(--neo-ink);
          border-radius: 50%;
        }

        .nav-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 38px;
          height: 38px;
          padding: 8px;
          background: var(--neon-lime);
          border: var(--neo-border);
          box-shadow: 2px 2px 0px var(--neo-ink);
          border-radius: var(--r-sm);
          cursor: pointer;
        }

        .nav-toggle-bar {
          display: block;
          height: 2.5px;
          width: 100%;
          background: var(--neo-ink);
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .nav-toggle.is-open .nav-toggle-bar:nth-child(1) {
          transform: translateY(7.5px) rotate(45deg);
        }
        .nav-toggle.is-open .nav-toggle-bar:nth-child(2) {
          opacity: 0;
        }
        .nav-toggle.is-open .nav-toggle-bar:nth-child(3) {
          transform: translateY(-7.5px) rotate(-45deg);
        }

        @media (max-width: 900px) {
          .nav-toggle {
            display: flex;
          }

          .main-nav {
            position: absolute;
            top: 64px;
            left: 0;
            right: 0;
            background: var(--neo-surface);
            border-bottom: var(--neo-border);
            box-shadow: var(--neo-shadow-lg);
            padding: 16px 24px;
            display: none;
          }

          .main-nav.is-open {
            display: block;
          }

          .nav-list {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .nav-item {
            display: block;
            padding: 10px 14px;
            border: 1px solid transparent;
          }

          .nav-item:hover, .nav-item.active {
            border: var(--neo-border-thin);
          }

          /* Dropdown "Lainnya" hanya untuk desktop */
          .has-panel {
            display: none;
          }

          .nav-more-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .nav-group-label {
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--neo-ink-3);
            padding: 8px 14px 0;
          }

          .nav-sub-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            list-style: none;
            margin: 0 0 0 14px;
            padding: 0 0 0 10px;
            border-left: var(--neo-border);
          }

          .nav-cta-mobile {
            display: block;
            padding-top: 12px;
          }

          .header-action {
            display: none;
          }
        }

        /* Dropdown "Lainnya" (desktop) */
        .has-panel {
          position: relative;
        }

        .nav-caret {
          font-size: 0.6em;
          margin-left: 4px;
        }

        .nav-more-panel {
          display: none;
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          min-width: 244px;
          padding: 8px;
          list-style: none;
          margin: 0;
          gap: 4px;
          background: var(--neo-surface);
          border: var(--neo-border);
          border-radius: var(--r-md);
          box-shadow: var(--neo-shadow-lg);
          z-index: 50;
        }

        .nav-more-panel.is-open {
          display: grid;
          animation: nbPop 0.12s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes nbPop {
          from { opacity: 0; transform: translateY(-4px); }
        }

        .nav-more-link {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 8px 10px;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--neo-ink);
          border: 1.5px solid transparent;
          border-radius: var(--r-sm);
        }

        .nav-more-link span {
          font-size: 0.68rem;
          font-weight: 400;
          color: var(--neo-ink-3);
        }

        .nav-more-link:hover,
        .nav-more-link[aria-current="page"] {
          border-color: var(--neo-ink);
          background: var(--neon-lime);
          box-shadow: 2px 2px 0px var(--neo-ink);
        }

        .nav-more-link:hover span,
        .nav-more-link[aria-current="page"] span {
          color: var(--neo-ink-2);
        }

        @media (min-width: 901px) {
          .nav-more-group,
          .nav-cta-mobile {
            display: none;
          }
        }

        /* Band 901-1079px: rapatkan padding agar 7 item nav tidak wrap */
        @media (min-width: 901px) and (max-width: 1079px) {
          .header-inner {
            gap: 10px;
          }

          .nav-item {
            padding: 6px 9px;
            font-size: 0.78rem;
          }

          .btn-chat-link {
            padding: 6px 10px;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
