import React from 'react';

export interface ProgramItem {
  id: string;
  title: string;
  targetGrade: string;
  description: string;
  curriculumPoints: string[];
}

interface ProgramsProps {
  programs?: ProgramItem[];
}

const defaultPrograms: ProgramItem[] = [
  {
    id: 'mipa-riset',
    title: 'MIPA dan Riset Terapan',
    targetGrade: 'Fase F (Kelas XI - XII)',
    description: 'Fokus penguatan kalkulus, mekanika, bioteknologi, kimia organik, dan metodologi riset ilmiah untuk persiapan olimpiade dan perguruan tinggi teknik/kedokteran.',
    curriculumPoints: [
      'Olimpiade Sains Nasional (OSN) & Riset Ilmiah Remaja (KIR)',
      'Praktikum terpadu di laboratorium sains modern SMANSA',
      'Matematika tingkat lanjut dan komputasi sains dasar'
    ]
  },
  {
    id: 'ips-kreatif',
    title: 'IPS dan Ekonomi Modern',
    targetGrade: 'Fase F (Kelas XI - XII)',
    description: 'Mendalami ekonomi makro, sosiologi terapan, geografi spasial, dan akuntansi bisnis guna membentuk calon analis kebijakan, diplomat, dan wirausahawan etis.',
    curriculumPoints: [
      'Studi lapangan sosial dan analisis dinamika kemasyarakatan',
      'Literasi finansial, pasar modal, dan simulasi perbankan',
      'Riset sosiologis dan penulisan esai ilmiah populer'
    ]
  },
  {
    id: 'bahasa-global',
    title: 'Bahasa dan Diplomasi Budaya',
    targetGrade: 'Fase F (Kelas XI - XII)',
    description: 'Penguasaan kemahiran Bahasa Inggris, Bahasa Indonesia sastra, Bahasa Asing pilihan (Jepang/Jerman), serta diplomasi budaya dan komunikasi publik.',
    curriculumPoints: [
      'Model United Nations (MUN) dan debat bahasa Inggris/Indonesia',
      'Kajian filologi budaya Jawa dan sastra kontemporer',
      'Penerjemahan teks dan public speaking berbobot'
    ]
  }
];

const cardLabels: Record<string, string> = {
  'mipa-riset': 'Riset dan Sains Terapan',
  'ips-kreatif': 'Sosial dan Ekonomi Modern',
  'bahasa-global': 'Diplomasi dan Budaya'
};

export const Programs: React.FC<ProgramsProps> = ({ programs = defaultPrograms }) => {
  return (
    <section className="programs-section sec" id="program">
      <div className="container">
        <div className="section-header" data-reveal="">
          <div>
            <span className="lbl lbl-lime">KURIKULUM MERDEKA</span>
            <h2 className="section-title">Tiga Pilar Peminatan Akademik</h2>
          </div>
          <a href="/program" className="btn btn-outline">
            Lihat Silabus Lengkap &rarr;
          </a>
        </div>

        <div className="programs-grid">
          {programs.map((item) => (
            <article className="program-card card" data-reveal="" key={item.id}>
              <div className="card-top-row">
                <span className="sticker-label">{cardLabels[item.id] || 'Peminatan'}</span>
                <span className="card-grade num">{item.targetGrade}</span>
              </div>

              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.description}</p>

              <ul className="points-list">
                {item.curriculumPoints.map((point, idx) => (
                  <li key={idx}>
                    <span className="point-bullet" aria-hidden="true">■</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="card-footer">
                <a href="/#chatbot" className="card-chat-link">
                  <span>Konsultasi Jurusan ke SmansaBot</span>
                  <span className="arrow-ico" aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .programs-section {
          padding-top: clamp(48px, 6vw, 76px);
          padding-bottom: clamp(48px, 6vw, 76px);
          border-top: var(--neo-border);
          background-color: var(--neo-bg);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: clamp(24px, 3.5vw, 36px);
          gap: 20px;
          flex-wrap: wrap;
        }

        .section-title {
          font-size: clamp(1.8rem, 3.2vw, 2.5rem);
          font-weight: 800;
          color: var(--neo-ink);
          letter-spacing: -0.02em;
          margin-top: 8px;
        }

        .programs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .program-card {
          padding: 28px;
          display: flex;
          flex-direction: column;
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 14px;
        }

        .sticker-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: var(--neon-cyan);
          color: var(--neo-ink);
          border: var(--neo-border-thin);
          box-shadow: 2px 2px 0px var(--neo-ink);
          padding: 3px 8px;
          border-radius: var(--r-sm);
        }

        .card-grade {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--neo-ink-3);
          border: 1px solid var(--neo-surface-2);
          padding: 2px 6px;
          border-radius: var(--r-sm);
          background: var(--neo-surface-2);
        }

        .card-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--neo-ink);
          letter-spacing: -0.015em;
          margin-bottom: 12px;
        }

        .card-desc {
          font-size: 0.92rem;
          line-height: 1.65;
          color: var(--neo-ink-2);
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .points-list {
          list-style: none;
          margin: 0 0 24px 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .points-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--neo-ink);
        }

        .point-bullet {
          color: var(--neo-ink);
          font-size: 0.65rem;
          margin-top: 4px;
        }

        .card-footer {
          border-top: 1.5px solid var(--neo-surface-2);
          padding-top: 16px;
          margin-top: auto;
        }

        .card-chat-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--neo-ink);
          text-decoration: none;
        }

        .card-chat-link:hover .arrow-ico {
          transform: translateX(4px);
        }

        .arrow-ico {
          transition: transform 0.15s ease;
        }

        @media (max-width: 960px) {
          .programs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Programs;
