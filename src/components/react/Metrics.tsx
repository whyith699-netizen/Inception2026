import React from 'react';

const stats = [
  {
    value: '1957',
    label: 'Tahun Berdiri',
    sub: '69 tahun mendidik sejak 5 November 1957',
    tag: 'SEJARAH'
  },
  {
    value: '98',
    label: 'Nilai Akreditasi BAN-SM',
    sub: 'Peringkat A Unggul (SK 1347/BAN-SM/2021)',
    tag: 'AKREDITASI'
  },
  {
    value: '1.190',
    label: 'Peserta Didik',
    sub: '33 rombongan belajar kelas X sampai XII',
    tag: 'KAPASITAS'
  },
  {
    value: '94.8%',
    label: 'Serapan PTN & Kampus Top',
    sub: 'Diterima di UGM, ITB, UI, UNS, Undip & global',
    tag: 'PRESTASI'
  }
];

export const Metrics: React.FC = () => {
  return (
    <section className="metrics-section sec">
      <div className="container">
        <div className="metrics-grid">
          {stats.map((item, idx) => (
            <div className="metric-col card" data-reveal="" key={idx}>
              <span className="metric-tag">{item.tag}</span>
              <span className="metric-value num">{item.value}</span>
              <strong className="metric-label">{item.label}</strong>
              <p className="metric-sub">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .metrics-section {
          padding-top: clamp(40px, 5vw, 60px);
          padding-bottom: clamp(40px, 5vw, 60px);
          background-color: var(--neo-bg);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .metric-col {
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
        }

        .metric-tag {
          align-self: flex-start;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          background: var(--neon-lime);
          color: var(--neo-ink);
          border: 1px solid var(--neo-ink);
          padding: 2px 6px;
          border-radius: var(--r-sm);
          margin-bottom: 12px;
          box-shadow: 1.5px 1.5px 0px var(--neo-ink);
        }

        .metric-value {
          font-family: var(--font-mono);
          font-size: clamp(2rem, 3.2vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--neo-ink);
          line-height: 1;
          margin-bottom: 8px;
        }

        .metric-label {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--neo-ink);
          margin-bottom: 6px;
        }

        .metric-sub {
          font-size: 0.82rem;
          line-height: 1.5;
          color: var(--neo-ink-3);
        }

        @media (max-width: 960px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 540px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Metrics;
