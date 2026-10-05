import React from 'react';

const categories = [
  {
    title: 'Olimpiade dan Riset Sains',
    level: 'Tim OSN dan KIR',
    desc: 'Pembinaan laboratorium analitis, kelas riset kelompok, dan pendampingan kompetisi sains nasional.'
  },
  {
    title: 'Geopolitik dan Nalar Kritis',
    level: 'Klub Debat dan Riset Sosial',
    desc: 'Kajian fenomena kemasyarakatan, literasi hukum tata negara, dan praktik berpikir solutif.'
  },
  {
    title: 'Diplomasi dan Bahasa Global',
    level: 'Model UN dan English Club',
    desc: 'Latihan public speaking dwibahasa, retorika logis, dan wawasan hubungan internasional.'
  },
  {
    title: 'Sportivitas dan Kepemimpinan',
    level: 'Basket, Futsal, dan Pramuka',
    desc: 'Pembinaan ketahanan fisik, kepemimpinan organisasi OSMANSA, dan integritas korps.'
  }
];

export const Curriculum: React.FC = () => {
  return (
    <section className="curriculum-section sec" id="kurikulum">
      <div className="container">
        <div className="curriculum-intro" data-reveal="">
          <span className="lbl lbl-lime">PILAR PENGEMBANGAN SISWA</span>
          <h2 className="section-title">Empat Bidang Pengembangan yang Berjalan Berdampingan</h2>
        </div>

        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <article className="category-card card" data-reveal="" key={idx}>
              <div className="category-icon-box">
                <span className="icon-symbol">✦</span>
              </div>
              <h3 className="category-title">{cat.title}</h3>
              <span className="category-level">{cat.level}</span>
              <p className="category-desc">{cat.desc}</p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .curriculum-section {
          padding-top: clamp(48px, 6vw, 76px);
          padding-bottom: clamp(48px, 6vw, 76px);
          border-top: var(--neo-border);
          background-color: var(--neo-bg);
        }

        .curriculum-intro {
          max-width: 720px;
          margin-bottom: clamp(24px, 3.5vw, 36px);
        }

        .section-title {
          font-size: clamp(1.8rem, 3.2vw, 2.5rem);
          font-weight: 800;
          color: var(--neo-ink);
          letter-spacing: -0.02em;
          margin-top: 8px;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .category-card {
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .category-icon-box {
          width: 36px;
          height: 36px;
          background: var(--neon-lime);
          border: var(--neo-border-thin);
          box-shadow: 2px 2px 0px var(--neo-ink);
          border-radius: var(--r-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .icon-symbol {
          font-size: 1.1rem;
          color: var(--neo-ink);
          font-weight: 900;
        }

        .category-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--neo-ink);
          letter-spacing: -0.01em;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .category-level {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: var(--neon-cyan);
          color: var(--neo-ink);
          border: 1px solid var(--neo-ink);
          padding: 2px 8px;
          border-radius: var(--r-sm);
          margin-bottom: 12px;
          box-shadow: 1.5px 1.5px 0px var(--neo-ink);
        }

        .category-desc {
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--neo-ink-2);
        }

        @media (max-width: 1024px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .categories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Curriculum;
