import React from 'react';

export interface EventData {
  title: string;
  badge: string;
  description: string;
  time: string;
  location: string;
  dateNum?: string;
  dateMonth?: string;
}

interface EventBannerProps {
  event?: EventData | null;
}

export const EventBanner: React.FC<EventBannerProps> = ({ event }) => {
  if (!event) return null;

  return (
    <section className="event-section sec" id="agenda">
      <div className="container">
        <div className="event-card" data-reveal="">
          <aside className="event-date-col">
            <span className="date-num num">{event.dateNum || '18'}</span>
            <span className="date-month">{event.dateMonth || 'Mei 2026'}</span>
          </aside>

          <div className="event-content-col">
            <span className="lbl lbl-lime">{event.badge}</span>
            <h2 className="event-title">{event.title}</h2>
            <p className="event-desc">{event.description}</p>

            <dl className="event-meta-grid">
              <div className="meta-item">
                <dt className="meta-lbl">Waktu layanan</dt>
                <dd className="meta-val num">{event.time}</dd>
              </div>
              <div className="meta-item">
                <dt className="meta-lbl">Lokasi verifikasi</dt>
                <dd className="meta-val">{event.location}</dd>
              </div>
            </dl>

            <div className="event-actions">
              <a href="/ppdb" className="btn btn-primary">
                Lihat prosedur PPDB &rarr;
              </a>
              <a href="/#chatbot" className="btn btn-outline">
                Tanya syarat ke SmansaBot AI
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .event-section {
          padding-top: clamp(48px, 6vw, 72px);
          padding-bottom: clamp(48px, 6vw, 72px);
          border-top: var(--neo-border);
          background-color: var(--neo-bg);
        }

        .event-card {
          background: var(--neo-surface);
          border: var(--neo-border);
          box-shadow: var(--neo-shadow);
          display: grid;
          grid-template-columns: 180px 1fr;
          overflow: hidden;
        }

        .event-date-col {
          border-right: var(--neo-border);
          padding: 32px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 6px;
          background: var(--neo-surface-2);
        }

        .date-num {
          font-family: var(--font-serif);
          font-size: 3.25rem;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--neo-ink);
        }

        .date-month {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          letter-spacing: 0.06em;
          color: var(--neo-ink-2);
          font-weight: 700;
        }

        .event-content-col {
          padding: clamp(24px, 3vw, 36px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .event-title {
          font-size: clamp(1.4rem, 2.4vw, 1.9rem);
          font-weight: 700;
          margin-bottom: 12px;
          max-width: 30ch;
          color: var(--neo-ink);
        }

        .event-desc {
          font-size: 0.9375rem;
          color: var(--neo-ink-2);
          line-height: 1.65;
          margin-bottom: 22px;
          max-width: 64ch;
        }

        .event-meta-grid {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .meta-item {
          background: var(--neo-bg);
          border: var(--neo-border-thin);
          padding: 10px 16px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .meta-lbl {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--neo-ink-2);
          font-weight: 700;
        }

        .meta-val {
          font-size: 0.875rem;
          color: var(--neo-ink);
          margin: 0;
          font-weight: 600;
        }

        .event-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        @media (max-width: 800px) {
          .event-card {
            grid-template-columns: 1fr;
          }
          .event-date-col {
            border-right: none;
            border-bottom: var(--neo-border);
            flex-direction: row;
            gap: 12px;
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default EventBanner;
