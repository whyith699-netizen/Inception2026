import React from 'react';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
}

export interface NeoFilterBarProps {
  search: string;
  onSearch: (value: string) => void;
  searchLabel: string;
  placeholder: string;
  groups: FilterGroup[];
  values: Record<string, string>;
  onFilter: (key: string, value: string) => void;
  resultCount: number;
  totalCount: number;
  /** Satuan hasil, mis. "ekstrakurikuler" / "personil". */
  noun: string;
  onReset?: () => void;
}

/** Warna chip label per grup, bergilir deterministik: cyan, yellow, magenta. */
const GROUP_CHIP = ['nb-tag--cyan', 'nb-tag--yellow', 'nb-tag--magenta'];

/**
 * Sub-nav pencarian + filter yang dipakai bersama oleh halaman
 * /program, /direktori, /berita, dan /prestasi.
 *
 * ponytail: filter belum disinkronkan ke URL — tambahkan history.replaceState
 * jika data halaman melampaui ~150 item (agar hasil filter bisa dibagikan).
 */
export const NeoFilterBar: React.FC<NeoFilterBarProps> = ({
  search,
  onSearch,
  searchLabel,
  placeholder,
  groups,
  values,
  onFilter,
  resultCount,
  totalCount,
  noun,
  onReset,
}) => {
  const isEmpty = resultCount === 0;

  return (
    <div className="nf-bar">
      <div className="nf-row nf-search-row">
        <span className="nb-tag nb-tag--magenta nf-search-chip">Cari</span>
        <div className="nf-search-field">
          <svg className="nf-search-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            className="nf-input"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={placeholder}
            aria-label={searchLabel}
          />
          {search && (
            <button
              type="button"
              className="nf-clear"
              onClick={() => onSearch('')}
              aria-label="Hapus kata kunci pencarian"
            >
              ×
            </button>
          )}
        </div>
        <span className="nf-count num">
          <strong>{resultCount}</strong> / {totalCount} {noun}
        </span>
      </div>

      {groups.map((group, idx) => (
        <div className="nf-row nf-group-row" key={group.key}>
          <span className={`nb-tag ${GROUP_CHIP[idx % GROUP_CHIP.length]} nf-group-chip`}>
            {group.label}
          </span>
          <div className="nf-pills">
            {group.options.map((opt) => {
              const isActive = (values[group.key] ?? '') === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`nf-pill ${isActive ? 'is-active' : ''}`}
                  onClick={() => onFilter(group.key, opt.value)}
                  aria-pressed={isActive}
                >
                  <span>{opt.label}</span>
                  {opt.count !== undefined && (
                    <span className="nf-pill-count num">{opt.count}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {isEmpty && (
        <div className="nf-row nf-hint-row">
          <span>Tidak ada {noun} yang cocok dengan filter saat ini.</span>
          {onReset && (
            <button type="button" className="nb-reset" onClick={onReset}>
              Reset filter
            </button>
          )}
        </div>
      )}

      <style>{`
        .nf-bar {
          position: sticky;
          top: 64px;
          z-index: 30;
          background: var(--neo-surface);
          border: var(--neo-border);
          border-radius: var(--r-md);
          box-shadow: var(--neo-shadow);
          padding: clamp(14px, 2vw, 20px);
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: clamp(28px, 4vw, 40px);
        }

        .nf-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .nf-search-row {
          padding-bottom: 14px;
          border-bottom: 1.5px solid var(--neo-ink);
        }

        .nf-search-chip { flex-shrink: 0; }

        .nf-search-field {
          position: relative;
          flex: 1;
          min-width: 240px;
        }

        .nf-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: var(--neo-ink-3);
          pointer-events: none;
        }

        .nf-input {
          width: 100%;
          min-height: 42px;
          padding: 9px 36px 9px 36px;
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--neo-ink);
          background: var(--neo-bg);
          border: var(--neo-border);
          border-radius: var(--r-sm);
          box-shadow: var(--neo-shadow-sm);
        }

        .nf-input::placeholder { color: var(--neo-ink-3); }

        .nf-input:focus {
          outline: none;
          background: var(--neo-surface);
          box-shadow: 4px 4px 0px var(--neon-cyan);
        }

        .nf-input::-webkit-search-cancel-button { display: none; }

        .nf-clear {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          font-weight: 800;
          line-height: 1;
          color: var(--neon-lime);
          background: var(--neo-ink);
          border: 1.5px solid var(--neo-ink);
          border-radius: var(--r-sm);
          box-shadow: 2px 2px 0px var(--neo-ink);
          cursor: pointer;
        }

        .nf-clear:hover {
          box-shadow: 2px 2px 0px var(--neon-cyan);
        }

        .nf-count {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--neo-ink-3);
          background: var(--neon-lime);
          border: 1.5px solid var(--neo-ink);
          border-radius: var(--r-sm);
          box-shadow: 2px 2px 0px var(--neo-ink);
          padding: 7px 12px;
          flex-shrink: 0;
        }

        .nf-count strong {
          color: var(--neo-ink);
          font-weight: 800;
        }

        .nf-group-chip { flex-shrink: 0; }

        .nf-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          flex: 1;
        }

        .nf-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--neo-ink);
          background: var(--neo-bg);
          border: 1.5px solid var(--neo-ink);
          border-radius: var(--r-sm);
          box-shadow: 2px 2px 0px var(--neo-ink);
          padding: 7px 12px;
          cursor: pointer;
          transition: transform 0.12s ease, box-shadow 0.12s ease, background-color 0.15s ease;
        }

        .nf-pill:hover {
          background: var(--neo-surface-2);
          transform: translate(-1px, -1px);
        }

        .nf-pill.is-active {
          background: var(--neon-lime);
          font-weight: 800;
          box-shadow: 3px 3px 0px var(--neo-ink);
          transform: translate(-1px, -1px);
        }

        .nf-pill-count {
          font-size: 10px;
          font-weight: 800;
          padding: 1px 6px;
          border: 1px solid var(--neo-ink);
          border-radius: var(--r-sm);
          background: var(--neo-surface);
          color: var(--neo-ink);
        }

        .nf-pill.is-active .nf-pill-count {
          background: var(--neo-ink);
          color: var(--neon-lime);
        }

        .nf-hint-row {
          gap: 12px;
          padding-top: 12px;
          border-top: 1.5px solid var(--neo-ink);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--neo-ink-2);
        }

        @media (max-width: 640px) {
          .nf-search-row { flex-direction: column; align-items: stretch; }
          .nf-search-chip { align-self: flex-start; }
          .nf-count { align-self: flex-start; }
          .nf-group-row { flex-direction: column; align-items: stretch; }
          .nf-group-chip { align-self: flex-start; }
          .nf-pills {
            flex-wrap: nowrap;
            overflow-x: auto;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 4px;
          }
          .nf-pills::-webkit-scrollbar { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nf-pill, .nf-pill:hover, .nf-pill.is-active { transition: none; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default NeoFilterBar;
