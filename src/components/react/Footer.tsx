import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = 2026;

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-header">
              <img
                src="/images/school/logo.png"
                alt="Logo SMAN 1 Klaten"
                className="footer-logo-img"
                width={44}
                height={44}
              />
              <div>
                <span className="footer-logo">SMANSA<span className="dot">.</span></span>
                <span className="brand-motto">Padmawijaya &middot; Klaten</span>
              </div>
            </div>

            <p className="brand-desc">
              SMA Negeri 1 Klaten. Didirikan 5 November 1957. Pusat rujukan pendidikan menengah atas
              tertua di Klaten dengan Akreditasi A (Nilai 98) BAN-SM.
            </p>

            <div className="school-badges">
              <span className="school-code">NPSN: 20309676</span>
              <span className="school-code">NSS: 301046002001</span>
              <span className="school-code">Nilai Akreditasi: 98</span>
            </div>

            <div className="team-credit-box">
              <span className="credit-title">Dirancang oleh Tim RANDOM KID:</span>
              <p className="credit-names">
                Muhammad Agha Prabswara • Radithya Asadel Narendra • Jalu Budi Dhamarsakti
              </p>
              <span className="competition-tag">Karya Kompetisi INCEPTION 2026</span>
            </div>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h4 className="col-title">Portal Akademik</h4>
              <ul className="col-links">
                <li>
                  <a href="http://elearning.sma1klaten.sch.id/" target="_blank" rel="noopener noreferrer">
                    e-Learning SMANSA
                  </a>
                </li>
                <li>
                  <a href="https://eperpus.sma1klaten.sch.id/" target="_blank" rel="noopener noreferrer">
                    e-Perpus Graha Pustaka
                  </a>
                </li>
                <li>
                  <a href="/program#ekstrakurikuler-resmi">23 Ekstrakurikuler Resmi</a>
                </li>
                <li>
                  <a href="/#chatbot">Layanan SmansaBot AI</a>
                </li>
                <li>
                  <a href="/ppdb">Informasi PPDB 2026</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="col-title">Navigasi Utama</h4>
              <ul className="col-links">
                <li><a href="/">Beranda</a></li>
                <li><a href="/#profil">Profil dan Filosofi Padmawijaya</a></li>
                <li><a href="/#sejarah">Linimasa Sejarah Sejak 1957</a></li>
                <li><a href="/program">Kurikulum dan Peminatan</a></li>
                <li><a href="/direktori">Direktori Guru dan Pimpinan</a></li>
                <li><a href="/berita">Berita dan Pengumuman</a></li>
                <li><a href="/fasilitas">Sarana dan Prasarana Kampus</a></li>
                <li><a href="/alumni">Alumni & Komunitas KAPASSKA</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="col-title">Sekretariat dan Kontak</h4>
              <p className="contact-text">
                Jl. Merbabu No. 13, Klaten Selatan, Kabupaten Klaten, Jawa Tengah 57423
              </p>
              <p className="contact-text">Telepon (0272) 321150</p>
              <p className="contact-text">smansa_klaten@yahoo.com</p>

              <div className="social-links-wrap">
                <span className="social-label">Media Sosial Resmi</span>
                <div className="social-links">
                  <a
                    href="https://www.instagram.com/sman1klaten_official/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UC4WNENZW75-C3ENYdDx4TtA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://www.facebook.com/SMANSAKLATEN/?locale=id_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; {currentYear} SMA Negeri 1 Klaten</p>
          <div className="legal-links">
            <a href="/#profil">Keterbukaan Informasi</a>
            <a href="/ppdb">Standar Pelayanan PPDB</a>
            <a href="/kontak">Hubungi Tim</a>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--neo-ink);
          color: #FFFFFF;
          padding: 64px 0 32px;
          margin-top: auto;
          border-top: var(--neo-border-thick);
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.25fr 2fr;
          gap: 48px;
          margin-bottom: 48px;
        }

        .brand-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }

        .footer-logo-img {
          width: 44px;
          height: 44px;
          object-fit: contain;
          background: #FFFFFF;
          border-radius: var(--r-sm);
          padding: 2px;
          border: 1.5px solid var(--neon-lime);
        }

        .footer-logo {
          font-family: var(--font-sans);
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #FFFFFF;
          display: block;
        }

        .dot {
          color: var(--neon-lime);
        }

        .brand-motto {
          font-size: 0.8rem;
          color: var(--neon-cyan);
          font-family: var(--font-mono);
          display: block;
        }

        .brand-desc {
          font-size: 0.92rem;
          line-height: 1.6;
          color: #D1D5DB;
          margin-bottom: 20px;
        }

        .school-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .school-code {
          background-color: #1F2937;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: var(--r-sm);
          color: #FFFFFF;
          border: 1px solid #374151;
        }

        .team-credit-box {
          background-color: #1F2937;
          border: 2px solid var(--neon-lime);
          box-shadow: 3px 3px 0px var(--neon-lime);
          border-radius: var(--r-sm);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .credit-title {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--neon-lime);
        }

        .credit-names {
          font-size: 0.88rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.4;
          margin: 0;
        }

        .competition-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--neon-cyan);
        }

        .footer-cols {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .col-title {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--neon-lime);
          margin-bottom: 16px;
        }

        .col-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .col-links a {
          color: #D1D5DB;
          text-decoration: none;
          font-size: 0.88rem;
          transition: color 0.15s ease, transform 0.1s ease;
          display: inline-block;
        }

        .col-links a:hover {
          color: var(--neon-cyan);
          transform: translateX(2px);
        }

        .contact-text {
          font-size: 0.88rem;
          line-height: 1.55;
          color: #D1D5DB;
          margin-bottom: 8px;
        }

        .social-links-wrap {
          margin-top: 16px;
        }

        .social-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9CA3AF;
          display: block;
          margin-bottom: 8px;
        }

        .social-links {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .social-btn {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: #FFFFFF;
          background: #1F2937;
          border: 1px solid #4B5563;
          padding: 4px 10px;
          border-radius: var(--r-sm);
          text-decoration: none;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .social-btn:hover {
          background-color: var(--neon-lime);
          color: var(--neo-ink);
          border-color: var(--neon-lime);
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #374151;
          padding-top: 24px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .copyright {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: #9CA3AF;
          margin: 0;
        }

        .legal-links {
          display: flex;
          gap: 18px;
        }

        .legal-links a {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: #9CA3AF;
          text-decoration: none;
        }

        .legal-links a:hover {
          color: #FFFFFF;
        }

        @media (max-width: 960px) {
          .footer-top {
            grid-template-columns: 1fr;
          }

          .footer-cols {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .footer-cols {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
