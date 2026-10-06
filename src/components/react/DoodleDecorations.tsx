import React from 'react';

// Ornamen Pesawat Kertas (Paper Airplane) dengan Jejak Terbang Putus-putus
export const PaperAirplaneDoodle: React.FC<{ className?: string; flip?: boolean }> = ({
  className = '',
  flip = false
}) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none select-none inline-flex items-center gap-2 ${className}`}
  >
    <svg
      width="72"
      height="48"
      viewBox="0 0 72 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transform transition-transform ${flip ? '-scale-x-100' : ''}`}
    >
      {/* Dashed flight trail */}
      <path
        d="M2 38C12 36 18 20 32 24C44 28 42 12 52 14"
        stroke="#111418"
        strokeWidth="2"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
      {/* Paper airplane body */}
      <g transform="translate(48, 4) rotate(12)">
        <polygon
          points="0,18 22,0 12,22 8,14"
          fill="#D4FF00"
          stroke="#111418"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points="22,0 8,14 2,12"
          fill="#00F0FF"
          stroke="#111418"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <line
          x1="22"
          y1="0"
          x2="8"
          y2="14"
          stroke="#111418"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  </div>
);

// Bintang Sparkle 4-Sudut Neobrutalism
export const SparkleDoodle: React.FC<{
  size?: number;
  color?: string;
  className?: string;
}> = ({ size = 24, color = '#FFE600', className = '' }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none select-none inline-block ${className}`}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z"
        fill={color}
        stroke="#111418"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

// Garis Lengkung Putus-putus Dekoratif (Curved Dashed Flight Vector)
export const CurvedDashedTrail: React.FC<{ className?: string }> = ({
  className = ''
}) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none select-none ${className}`}
  >
    <svg
      width="140"
      height="50"
      viewBox="0 0 140 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 45C35 48 45 10 75 14C105 18 115 42 135 15"
        stroke="#111418"
        strokeWidth="2.2"
        strokeDasharray="5 5"
        strokeLinecap="round"
      />
      <circle cx="135" cy="15" r="3.5" fill="#FF2E93" stroke="#111418" strokeWidth="1.5" />
    </svg>
  </div>
);

// Panah Doodle Spiral Berputar
export const HandDrawnArrow: React.FC<{ className?: string }> = ({
  className = ''
}) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none select-none inline-block ${className}`}
  >
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 8 C16 4, 32 6, 32 20 C32 30, 16 32, 18 22 C19 16, 26 18, 30 28 L36 34"
        stroke="#111418"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M26 34 L36 34 L36 24"
        stroke="#111418"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

// Stiker Neobrutalism Mini Badge
export const NeoBadgeTag: React.FC<{
  text: string;
  color?: 'lime' | 'cyan' | 'magenta' | 'yellow';
  className?: string;
}> = ({ text, color = 'lime', className = '' }) => {
  const bgClasses = {
    lime: 'bg-neon-lime',
    cyan: 'bg-neon-cyan',
    magenta: 'bg-neon-magenta text-white',
    yellow: 'bg-neon-yellow'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono text-[11px] font-bold px-2 py-0.5 border-2 border-neo-ink shadow-neo-sm transform -rotate-1 ${bgClasses[color]} ${className}`}
    >
      <span>✦</span>
      <span>{text}</span>
    </span>
  );
};
