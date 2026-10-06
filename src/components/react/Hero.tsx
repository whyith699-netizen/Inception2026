import React from 'react';
import { PaperAirplaneDoodle, SparkleDoodle, CurvedDashedTrail } from './DoodleDecorations';

interface HeroProps {
  heroImage?: string;
}

export const Hero: React.FC<HeroProps> = ({ heroImage = '/images/school/Smansa1.jpg' }) => {
  return (
    <section className="hero-broadside relative overflow-hidden" id="beranda-hero">
      {/* Decorative Neobrutalism Doodles */}
      <div className="absolute top-8 left-4 sm:left-12 opacity-85 doodle-float hidden sm:block">
        <PaperAirplaneDoodle />
      </div>
      <div className="absolute top-16 right-6 sm:right-16 opacity-85 doodle-float-delayed">
        <SparkleDoodle size={32} color="#D4FF00" />
      </div>
      <div className="absolute top-44 left-2 sm:left-8 opacity-75 hidden md:block">
        <CurvedDashedTrail />
      </div>
      <div className="absolute bottom-28 right-4 sm:right-12 opacity-80 doodle-float hidden sm:block">
        <SparkleDoodle size={28} color="#00F0FF" />
      </div>

      <div className="container hero-inner relative z-10">
        {/* Eyebrow Meta Bar with Neon Brutalist Sticker */}
        <div className="hero-meta-bar" data-reveal="">
          <span className="meta-tag">EST. 1957</span>
          <span className="meta-sep" aria-hidden="true">&middot;</span>
          <span className="meta-tag">SMA NEGERI 1 KLATEN</span>
          <span className="meta-sep" aria-hidden="true">&middot;</span>
          <span className="meta-tag">PADMAWIJAYA</span>
          <span className="meta-sep" aria-hidden="true">&middot;</span>
          <span className="meta-coords num">7&deg;42'06.5"S 110&deg;36'09.0"E</span>
        </div>

        {/* Main Headline with Centered Editorial Brutalism */}
        <h1 className="hero-title" data-reveal="">
          Tradisi Keunggulan Akademik dan Budi Luhur di Bumi <em>Padmawijaya</em>.
        </h1>

        {/* Lead Description */}
        <p className="hero-lead" data-reveal="">
          Sekolah rujukan tertua di Klaten yang mendidik 1.190 siswa dalam 33 rombongan belajar
          Kurikulum Merdeka. Memadukan riset sains, 23 ekstrakurikuler, dan sarana kampus
          seluas 15.619 m&sup2; berakreditasi A dengan <strong>Nilai 98 BAN-SM</strong>.
        </p>

        {/* Action Row */}
        <div className="hero-cta-group" data-reveal="">
          <a href="/ppdb" className="btn btn-primary">Informasi PPDB 2026</a>
          <a href="/direktori" className="btn btn-secondary">Direktori 78 Pendidik</a>
          <a href="/alumni" className="btn btn-outline">Portal Alumni &rarr;</a>
        </div>

        {/* Credential Micro-Grid with Brutalist Hard Shadows */}
        <div className="hero-cred-grid" data-reveal="">
          <div className="cred-cell card">
            <span className="cred-num num">98</span>
            <div className="cred-info">
              <strong className="cred-title">Akreditasi A Unggul</strong>
              <span className="cred-sub">SK No. 1347/BAN-SM/2021</span>
            </div>
          </div>
          <div className="cred-cell card">
            <span className="cred-num num">20309676</span>
            <div className="cred-info">
              <strong className="cred-title">NPSN Resmi</strong>
              <span className="cred-sub">NSS: 301046002001</span>
            </div>
          </div>
          <div className="cred-cell card">
            <span className="cred-num num">33 Rombel</span>
            <div className="cred-info">
              <strong className="cred-title">1.190 Siswa</strong>
              <span className="cred-sub">Kampus 15.619 m&sup2;</span>
            </div>
          </div>
        </div>

        {/* Scroll & Peeking Indicator Pill */}
        <div className="hero-peek-pill" data-reveal="">
          <span className="peek-arrow" aria-hidden="true">&darr;</span>
          <span>DOKUMENTASI GEDUNG UTAMA</span>
          <span className="peek-arrow" aria-hidden="true">&darr;</span>
        </div>

        {/* Architectural Showcase Frame (Peeking directly into the initial viewport) */}
        <figure className="hero-showcase" data-reveal="" id="showcase-frame">
          <div className="frame-border">
            <img
              src={heroImage}
              alt="Gedung utama SMA Negeri 1 Klaten di Jalan Merbabu Nomor 13 Klaten Selatan"
              width={1400}
              height={740}
              loading="eager"
              className="hero-img"
            />
            <div className="frame-badge">
              <span className="badge-dot" aria-hidden="true"></span>
              <span>Sekolah Rujukan Jawa Tengah &middot; Nilai 98</span>
            </div>
          </div>
          <figcaption className="hero-caption">
            <span className="caption-title">Gedung Utama</span>
            <span className="sep" aria-hidden="true">&middot;</span>
            <span>Jalan Merbabu Nomor 13, Klaten Selatan 57423</span>
            <span className="sep" aria-hidden="true">&middot;</span>
            <span className="caption-archive">Arsip Dokumentasi Humas SMAN 1 Klaten</span>
          </figcaption>
        </figure>
      </div>

      <style>{`
        .hero-broadside {
          padding: clamp(36px, 5vw, 56px) 0 clamp(48px, 6vw, 72px);
          background-color: var(--neo-bg);
          border-bottom: var(--neo-border);
        }

        .hero-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-meta-bar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: var(--tracking-wide);
          color: var(--neo-ink);
          text-transform: uppercase;
          margin: 0 auto 16px;
          padding: 8px 16px;
          background: var(--neon-lime);
          border: var(--neo-border);
          box-shadow: 3px 3px 0px var(--neo-ink);
          border-radius: var(--r-sm);
        }

        .meta-sep {
          color: var(--neo-ink);
          font-weight: 900;
        }

        .meta-coords {
          color: var(--neo-ink);
          font-variant-numeric: tabular-nums;
        }

        .hero-title {
          font-size: clamp(2.3rem, 5vw, 3.85rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.035em;
          color: var(--neo-ink);
          max-width: 25ch;
          margin: 0 auto 18px;
          text-align: center;
        }

        .hero-title em {
          background: var(--neon-cyan);
          color: var(--neo-ink);
          padding: 0 10px;
          border: var(--neo-border);
          box-shadow: 4px 4px 0px var(--neo-ink);
          font-style: normal;
          display: inline-block;
        }

        .hero-lead {
          font-size: clamp(1.05rem, 1.8vw, 1.2rem);
          line-height: 1.65;
          color: var(--neo-ink-2);
          max-width: 66ch;
          margin: 0 auto 26px;
          text-align: center;
        }

        .hero-lead strong {
          color: var(--neo-ink);
          font-weight: 800;
          background: rgba(212, 255, 0, 0.45);
          padding: 2px 6px;
          border-bottom: 2px solid var(--neo-ink);
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        .hero-cred-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
          max-width: 960px;
          margin: 0 auto 20px;
          text-align: left;
        }

        .cred-cell {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cred-num {
          font-family: var(--font-mono);
          font-size: clamp(1.4rem, 2.3vw, 1.9rem);
          font-weight: 800;
          color: var(--neo-ink);
          letter-spacing: -0.02em;
          line-height: 1;
          background: var(--neon-yellow);
          border: var(--neo-border-thin);
          box-shadow: 2px 2px 0px var(--neo-ink);
          padding: 6px 10px;
        }

        .cred-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cred-title {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--neo-ink);
        }

        .cred-sub {
          font-size: 0.72rem;
          color: var(--neo-ink-3);
          font-family: var(--font-mono);
          font-weight: 600;
        }

        .hero-peek-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--neon-lime);
          color: var(--neo-ink);
          border: var(--neo-border-thin);
          box-shadow: 2px 2px 0px var(--neo-ink);
          padding: 6px 14px;
          border-radius: var(--r-sm);
          margin: 0 auto 16px;
          animation: peekBounce 2s infinite ease-in-out;
        }

        .peek-arrow {
          font-size: 0.9rem;
          font-weight: 900;
        }

        @keyframes peekBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }

        .hero-showcase {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
          border: var(--neo-border-thick);
          border-radius: var(--r-md);
          background: var(--neo-surface);
          box-shadow: var(--neo-shadow-lg);
          overflow: hidden;
          padding: 8px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-showcase:hover {
          transform: translateY(-4px);
          box-shadow: 8px 8px 0px var(--neo-ink);
        }

        .frame-border {
          position: relative;
          border: var(--neo-border);
          border-radius: var(--r-sm);
          overflow: hidden;
        }

        .hero-img {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
        }

        .frame-badge {
          position: absolute;
          bottom: 16px;
          right: 16px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--neon-lime);
          border: var(--neo-border);
          box-shadow: 3px 3px 0px var(--neo-ink);
          border-radius: var(--r-sm);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--neo-ink);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--neon-magenta);
          border: 1px solid var(--neo-ink);
        }

        .hero-caption {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          padding: 14px 14px 6px;
          font-size: 0.825rem;
          color: var(--neo-ink-2);
          font-family: var(--font-mono);
          font-weight: 600;
          text-align: left;
        }

        .caption-title {
          font-weight: 800;
          color: var(--neo-ink);
        }

        .sep {
          color: var(--neo-ink-3);
        }

        .caption-archive {
          margin-left: auto;
        }

        @media (max-width: 840px) {
          .hero-cred-grid {
            grid-template-columns: 1fr;
          }

          .caption-archive {
            margin-left: 0;
          }

          .frame-badge {
            position: static;
            margin: 10px 10px 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
