import React from 'react';

const facilities = [
  {
    label: 'Sains dan Riset Komputasi',
    title: 'Laboratorium Terpadu dan Graha Pustaka',
    desc: 'Tiga laboratorium komputer, lab kimia, fisika, dan biologi dengan perangkat eksperimen lengkap, serta perpustakaan digital e-Perpus sebagai pusat literasi sekolah.',
    image: '/images/school/Smansa4.jpg',
    alt: 'Koridor laboratorium riset SMA Negeri 1 Klaten',
    link: { href: '/fasilitas', label: 'Lihat Fasilitas Akademik' }
  },
  {
    label: 'Karakter dan Seni Budaya',
    title: 'Sanggar Seni dan Gelanggang Olahraga',
    desc: 'Sanggar karawitan dan teater untuk pelestarian budaya Jawa, didampingi GOR dalam ruangan untuk latihan basket, bulutangkis, dan futsal.',
    image: '/images/school/Smansa3.jpg',
    alt: 'Gedung kompleks kelas SMA Negeri 1 Klaten',
    link: { href: '/program', label: 'Lihat 23 Ekstrakurikuler' }
  }
];

export const ValueProp: React.FC = () => {
  return (
    <section className="value-prop-section sec" id="fasilitas">
      <div className="container">
        <div className="section-intro" data-reveal="">
          <span className="lbl lbl-lime">SARANA DAN PRASARANA</span>
          <h2 className="section-heading">Fasilitas Penunjang Belajar</h2>
        </div>

        <div className="prop-grid">
          {facilities.map((item, idx) => (
            <article className="prop-card card" data-reveal="" key={idx}>
              <figure className="prop-figure">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={720}
                  height={480}
                  loading="lazy"
                  className="prop-photo"
                />
              </figure>
              <div className="prop-body">
                <span className="prop-label-badge">{item.label}</span>
                <h3 className="prop-title">{item.title}</h3>
                <p className="prop-desc-text">{item.desc}</p>
                <a href={item.link.href} className="btn btn-outline prop-btn">
                  <span>{item.link.label}</span>
                  <span className="arrow-ico" aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .value-prop-section {
          padding-top: clamp(48px, 6vw, 76px);
          padding-bottom: clamp(48px, 6vw, 76px);
          border-top: var(--neo-border);
          background-color: var(--neo-bg);
        }

        .section-intro {
          max-width: 720px;
          margin-bottom: clamp(24px, 3.5vw, 36px);
        }

        .section-heading {
          font-size: clamp(1.8rem, 3.2vw, 2.5rem);
          font-weight: 800;
          color: var(--neo-ink);
          letter-spacing: -0.02em;
          margin-top: 8px;
        }

        .prop-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .prop-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .prop-figure {
          border: var(--neo-border);
          border-radius: var(--r-sm);
          overflow: hidden;
          background: #FFFFFF;
        }

        .prop-photo {
          width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          display: block;
        }

        .prop-body {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          flex-grow: 1;
        }

        .prop-label-badge {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--neon-cyan);
          color: var(--neo-ink);
          border: var(--neo-border-thin);
          box-shadow: 2px 2px 0px var(--neo-ink);
          padding: 3px 8px;
          border-radius: var(--r-sm);
        }

        .prop-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--neo-ink);
          letter-spacing: -0.015em;
          line-height: 1.3;
        }

        .prop-desc-text {
          font-size: 0.92rem;
          line-height: 1.65;
          color: var(--neo-ink-2);
          flex-grow: 1;
        }

        .prop-btn {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
        }

        @media (max-width: 860px) {
          .prop-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default ValueProp;
