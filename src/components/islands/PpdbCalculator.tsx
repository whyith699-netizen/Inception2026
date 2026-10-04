import { useState, useId } from 'react';

// ponytail: basic zonasi distance & score math. upgrade when Juknis PPDB 2026 provincial decree is formalized.
export default function PpdbCalculator() {
  const [tab, setTab] = useState<'zonasi' | 'prestasi'>('zonasi');
  const [distance, setDistance] = useState<number>(1800); // meter
  const [reportScore, setReportScore] = useState<number>(91.5);
  const [certLevel, setCertLevel] = useState<number>(3); // 0=none, 1=kecamatan, 2=kabupaten, 3=provinsi, 4=nasional/internasional

  const distId = useId();
  const scoreId = useId();
  const certId = useId();

  // Estimasi zonasi
  const zonasiCutoff = 3500;
  const isZonasiSafe = distance <= 2500;
  const isZonasiCompetitive = distance > 2500 && distance <= zonasiCutoff;

  // Estimasi prestasi: bobot rapor 70% + bonus sertifikat kejuaraan berjenjang
  const certBonus = [0, 1.5, 3.0, 5.0, 10.0][certLevel] ?? 0;
  const totalPrestasi = Number((reportScore * 0.7 + certBonus * 3).toFixed(2));
  const isPrestasiSafe = totalPrestasi >= 92.5;

  return (
    <div
      className="ppdb-calc-island"
      style={{
        background: 'var(--neo-surface)',
        border: 'var(--neo-border)',
        boxShadow: 'var(--neo-shadow-lg)',
        borderRadius: 'var(--r-md)',
        padding: 'clamp(20px, 3.5vw, 32px)',
        margin: '24px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: 'var(--neo-border)',
          paddingBottom: '16px',
          marginBottom: '24px',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--neo-ink)',
              background: 'var(--neon-yellow)',
              border: '1px solid var(--neo-ink)',
              boxShadow: '2px 2px 0px var(--neo-ink)',
              padding: '2px 8px',
              display: 'inline-block',
              marginBottom: '6px',
            }}
          >
            Pulau Interaktif &middot; client:visible
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.375rem',
              fontWeight: 800,
              margin: 0,
              color: 'var(--neo-ink)',
            }}
          >
            Simulasi Jalur PPDB 2026/2027
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setTab('zonasi')}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              padding: '8px 14px',
              borderRadius: 'var(--r-sm)',
              border: 'var(--neo-border)',
              background: tab === 'zonasi' ? 'var(--neon-lime)' : 'var(--neo-bg)',
              color: 'var(--neo-ink)',
              boxShadow: tab === 'zonasi' ? '3px 3px 0px var(--neo-ink)' : '2px 2px 0px var(--neo-ink)',
              cursor: 'pointer',
              fontWeight: tab === 'zonasi' ? 800 : 700,
              textTransform: 'uppercase',
            }}
          >
            Jalur Zonasi (55%)
          </button>
          <button
            type="button"
            onClick={() => setTab('prestasi')}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              padding: '8px 14px',
              borderRadius: 'var(--r-sm)',
              border: 'var(--neo-border)',
              background: tab === 'prestasi' ? 'var(--neon-lime)' : 'var(--neo-bg)',
              color: 'var(--neo-ink)',
              boxShadow: tab === 'prestasi' ? '3px 3px 0px var(--neo-ink)' : '2px 2px 0px var(--neo-ink)',
              cursor: 'pointer',
              fontWeight: tab === 'prestasi' ? 800 : 700,
              textTransform: 'uppercase',
            }}
          >
            Jalur Prestasi (20%)
          </button>
        </div>
      </div>

      {tab === 'zonasi' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <div>
            <label
              htmlFor={distId}
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--ink)',
                marginBottom: '8px',
              }}
            >
              Jarak domisili KK ke Kampus 13 (Jl. Merbabu No. 13):
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
              }}
            >
              <input
                id={distId}
                type="range"
                min="200"
                max="5000"
                step="50"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--accent)' }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  minWidth: '85px',
                  textAlign: 'right',
                  fontVariantNumeric: 'tabular-nums',
                  color: 'var(--ink)',
                }}
              >
                {(distance / 1000).toFixed(2)} km
              </span>
            </div>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--ink-3)',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Data acuan historis PPDB SMAN 1 Klaten: batas cut-off reguler tahun lalu berada pada jarak <strong>3,42 km</strong>.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--r-sm)',
              background: 'var(--paper-2)',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                color: 'var(--ink-3)',
                letterSpacing: '0.04em',
              }}
            >
              Hasil Estimasi Kelayakan
            </span>
            <div
              style={{
                margin: '8px 0',
                fontSize: '1.0625rem',
                fontWeight: 600,
                color: isZonasiSafe
                  ? 'var(--dot-on-accent)'
                  : isZonasiCompetitive
                  ? 'var(--accent)'
                  : 'var(--ink-3)',
              }}
            >
              {isZonasiSafe
                ? 'Prioritas Tinggi (Zona 1 Aman)'
                : isZonasiCompetitive
                ? 'Zona Kompetitif (Mendekati Batas Kuota)'
                : 'Di Luar Radius Historis Utama'}
            </div>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--ink-2)',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {isZonasiSafe
                ? 'Jarak tempat tinggal Anda berada dalam radius inti Kampus 13. Peluang penerimaan kuota zonasi sangat tinggi dengan ketentuan KK sah minimal 1 tahun.'
                : isZonasiCompetitive
                ? 'Jarak tempat tinggal masih berada dalam rentang kuota tahun lalu, namun disarankan menyiapkan alternatif jalur prestasi sebagai proteksi cadangan.'
                : 'Jarak melampaui batas aman zonasi tahun sebelumnya. Kami menyarankan mendaftar melalui jalur prestasi atau afirmasi.'}
            </p>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label
                htmlFor={scoreId}
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  marginBottom: '8px',
                }}
              >
                Rata-rata Nilai Rapor Semester 1–5:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  id={scoreId}
                  type="range"
                  min="80"
                  max="100"
                  step="0.1"
                  value={reportScore}
                  onChange={(e) => setReportScore(Number(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--accent)' }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    minWidth: '60px',
                    textAlign: 'right',
                    fontVariantNumeric: 'tabular-nums',
                    color: 'var(--ink)',
                  }}
                >
                  {reportScore.toFixed(1)}
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor={certId}
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  marginBottom: '8px',
                }}
              >
                Piagam Kejuaraan Berjenjang Resmi (OSN/O2SN/FLS2N):
              </label>
              <select
                id={certId}
                value={certLevel}
                onChange={(e) => setCertLevel(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 'var(--r-sm)',
                  border: '1px solid var(--hairline)',
                  background: 'var(--surface)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  color: 'var(--ink)',
                }}
              >
                <option value={0}>Tidak Ada Piagam / Non-kejuaraan (+0)</option>
                <option value={1}>Tingkat Kecamatan / Eks-Karesidenan (+1.5)</option>
                <option value={2}>Juara 1–3 Tingkat Kabupaten (+3.0)</option>
                <option value={3}>Juara 1–3 Tingkat Provinsi (+5.0)</option>
                <option value={4}>Juara 1–3 Tingkat Nasional / Internasional (+10.0)</option>
              </select>
            </div>
          </div>

          <div
            style={{
              padding: '20px',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--r-sm)',
              background: 'var(--paper-2)',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                color: 'var(--ink-3)',
                letterSpacing: '0.04em',
              }}
            >
              Estimasi Skor Bobot Akhir
            </span>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '2rem',
                fontWeight: 700,
                color: isPrestasiSafe ? 'var(--dot-on-accent)' : 'var(--accent)',
                margin: '4px 0 8px',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {totalPrestasi.toFixed(2)}
            </div>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--ink-2)',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {isPrestasiSafe
                ? 'Skor Anda melampaui cut-off historis jalur prestasi (92.80). Peluang penerimaan sangat kuat di SMAN 1 Klaten.'
                : 'Skor mendekati ambang batas seleksi jalur prestasi. Pastikan keabsahan sertifikat dan kelengkapan berkas terverifikasi resmi oleh panitia.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
