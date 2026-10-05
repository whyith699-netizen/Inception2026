import React from 'react';

export interface AlumniItem {
  id: number;
  name: string;
  designation: string;
  image: string;
}

interface AlumniSectionProps {
  items?: AlumniItem[];
}

export const AlumniSection: React.FC<AlumniSectionProps> = ({ items = [] }) => {
  return (
    <section className="alumni-section sec" id="alumni-menyapa">
      <div className="container">
        <div className="section-header" data-reveal="">
          <span className="lbl lbl-lime">KAPASSKA &middot; KELUARGA ALUMNI PADMAWIJAYA</span>
          <h2 className="section-title">Alumni yang Berkarya di Tingkat Nasional</h2>
          <p className="section-desc">
            Lulusan SMAN 1 Klaten yang memimpin perguruan tinggi, lembaga negara, perbankan
            nasional, kedokteran saraf, hingga korps diplomatik Indonesia.
          </p>
        </div>

        <div className="alumni-grid">
          {items.map((alumnus) => (
            <article className="alumni-card card" data-reveal="" key={alumnus.id}>
              <div className="alumni-avatar-wrap">
                <img
                  src={alumnus.image}
                  alt={`Potret ${alumnus.name}`}
                  className="alumni-img"
                  loading="lazy"
                  width={80}
                  height={80}
                />
              </div>
              <div className="alumni-info">
                <span className="alumni-pill">Alumni SMANSA</span>
                <h3 className="alumni-name">{alumnus.name}</h3>
                <p className="alumni-role">{alumnus.designation}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="alumni-cta-row" data-reveal="">
          <a href="/alumni" className="btn btn-primary">
            Buka Portal & Direktori Lengkap Alumni KAPASSKA &rarr;
          </a>
        </div>
      </div>

      <style>{`
        .alumni-section {
          padding-top: clamp(48px, 6vw, 80px);
          padding-bottom: clamp(48px, 6vw, 80px);
          border-top: var(--neo-border);
          background-color: var(--neo-bg);
        }

        .section-header {
          max-width: 680px;
          margin-bottom: clamp(28px, 4vw, 40px);
        }

        .section-title {
          font-size: clamp(1.8rem, 3.2vw, 2.5rem);
          font-weight: 800;
          color: var(--neo-ink);
          letter-spacing: -0.02em;
          margin-top: 8px;
          margin-bottom: 12px;
        }

        .section-desc {
          font-size: 1rem;
          color: var(--neo-ink-2);
          line-height: 1.65;
        }

        .alumni-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 36px;
        }

        .alumni-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .alumni-avatar-wrap {
          width: 80px;
          height: 80px;
          border-radius: var(--r-sm);
          overflow: hidden;
          background: var(--neo-surface-2);
          border: var(--neo-border);
          box-shadow: 2px 2px 0px var(--neo-ink);
        }

        .alumni-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }

        .alumni-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
        }

        .alumni-pill {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          background: var(--neon-yellow);
          color: var(--neo-ink);
          border: 1px solid var(--neo-ink);
          padding: 2px 6px;
          border-radius: var(--r-sm);
          box-shadow: 1.5px 1.5px 0px var(--neo-ink);
        }

        .alumni-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--neo-ink);
          line-height: 1.35;
          margin-top: 4px;
        }

        .alumni-role {
          font-size: 0.85rem;
          color: var(--neo-ink-2);
          line-height: 1.5;
        }

        .alumni-cta-row {
          display: flex;
          justify-content: flex-start;
        }

        @media (max-width: 960px) {
          .alumni-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default AlumniSection;
