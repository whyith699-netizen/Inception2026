import React from 'react';

const timelineMilestones = [
  {
    year: '1957',
    title: 'Pendirian SMA Persiapan Klaten',
    desc: 'Didirikan 5 November 1957 dengan 253 siswa dan ditetapkan sebagai SMA Negeri Klaten melalui SK Menteri PP dan K Nomor 5620/B/57.',
  },
  {
    year: '1960',
    title: 'Predikat SMA Negeri ABC',
    desc: 'Status SMA Negeri ABC dengan peminatan budaya, sosial, dan ilmu alam.',
  },
  {
    year: '1965',
    title: 'Pemekaran sekolah',
    desc: 'SMA Negeri ABC dimekarkan menjadi SMA Negeri 1 Klaten dan SMA Negeri 2 Klaten.',
  },
  {
    year: '1994',
    title: 'Sekolah unggulan Jawa Tengah',
    desc: 'Ditetapkan sebagai sekolah unggulan percontohan tingkat karesidenan dan provinsi.',
  },
  {
    year: '2003',
    title: 'Perintis program akselerasi',
    desc: 'Membuka kelas akselerasi perdana dan menerapkan Kurikulum Berbasis Kompetensi.',
  },
  {
    year: '2021',
    title: 'Akreditasi A dengan nilai 98',
    desc: 'BAN-SM memberikan nilai 98 dan peringkat unggul, kemudian dilanjutkan penerapan Kurikulum Merdeka.',
  },
];

const legalRows: [string, string][] = [
  ['Nama resmi', 'SMA Negeri 1 Klaten'],
  ['Sebutan akrab', 'SMANSA, Padmawijaya'],
  ['NPSN', '20309676'],
  ['NSS', '301046002001'],
  ['Tanggal berdiri', '5 November 1957, SK 5620/B/57'],
  ['Akreditasi', 'A dengan nilai 98, BAN-SM 2021'],
  ['Rombongan belajar', '33 rombel kelas X sampai XII'],
  ['Organisasi alumni', 'KAPASSKA'],
  ['Alamat', 'Jl. Merbabu No. 13, Klaten Selatan 57423'],
  ['Telepon', '(0272) 321150'],
];

export const ProfileSections: React.FC = () => {
  return (
    <div className="profile-unified-wrapper" id="profil">
      {/* 1. Profil & Filosofi Padmawijaya */}
      <section className="sec profile-intro-sec">
        <div className="container">
          <div className="section-head-badge" data-reveal="">
            <span className="lbl lbl-lime">SEJARAH DAN IDENTITAS INSTITUSI</span>
            <h2 className="section-heading-lg">Profil SMA Negeri 1 Klaten</h2>
            <p className="section-lead-text">
              Lebih dari enam dekade berdiri di Klaten, sekolah ini dibina untuk
              mencetak lulusan yang berakar pada budaya Jawa, luwes dalam sains, dan siap
              bersaing di tingkat nasional.
            </p>
          </div>

          <div className="philosophy-grid">
            <article className="phil-card card" data-reveal="">
              <span className="sticker-tag">MAKNA NAMA</span>
              <h3 className="phil-title">Nama Kehormatan Padmawijaya</h3>
              <p className="phil-desc">
                Padmawijaya berasal dari bahasa Sanskerta: <em>padma</em> berarti bunga teratai
                merah, dan <em>wijaya</em> berarti kejayaan. Teratai dipilih karena dapat mekar
                indah di atas lumpur tanpa ternoda, lambang moral yang bersih dan akal budi
                yang luhur.
              </p>
            </article>

            <article className="phil-card card" data-reveal="">
              <span className="sticker-tag tag-cyan">MASKOT SEKOLAH</span>
              <h3 className="phil-title">Chiku si Burung Hantu</h3>
              <p className="phil-desc">
                Burung hantu melambangkan ketenangan berpikir, ketajaman nalar, dan kedalaman
                ilmu. Sosok Chiku menjadi penanda identitas civitas akademika Padmawijaya dalam
                setiap kegiatan sekolah.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 2. Sambutan Kepala Sekolah */}
      <section className="sec principal-sec">
        <div className="container">
          <div className="section-head-badge" data-reveal="">
            <span className="lbl lbl-lime">PIMPINAN SEKOLAH</span>
            <h2 className="section-heading">Sambutan Kepala Sekolah</h2>
          </div>

          <div className="principal-card card" data-reveal="">
            <figure className="principal-photo-col">
              <div className="photo-frame-brutal">
                <img
                  src="/images/school/salamkepsek.jpg"
                  alt="Tantri Ambarsari, S.Pd., M.Eng., Kepala Sekolah SMAN 1 Klaten"
                  className="principal-photo"
                  width={340}
                  height={425}
                  loading="lazy"
                />
              </div>
              <figcaption className="photo-label">
                <strong className="principal-name">Tantri Ambarsari, S.Pd., M.Eng.</strong>
                <span className="principal-role">Kepala Sekolah SMAN 1 Klaten</span>
              </figcaption>
            </figure>

            <div className="principal-text-col">
              <p className="principal-greeting">
                Assalamualaikum warahmatullahi wabarakatuh, salam sejahtera untuk kita semua.
              </p>
              <p className="principal-body">
                SMA Negeri 1 Klaten telah menapaki lebih dari enam dekade pengabdian mencetak
                generasi pemimpin bangsa. Kami memegang prinsip bahwa kemajuan teknologi harus
                dipandu oleh keteguhan integritas budi pekerti dan tanggung jawab terhadap
                lingkungan.
              </p>
              <p className="principal-body">
                Melalui Kurikulum Merdeka, 23 ekstrakurikuler, dan fasilitas riset di Kampus
                13, sekolah berkomitmen melahirkan lulusan yang cerdas bernalar, berwawasan
                luas, dan menjunjung tinggi kehormatan almamater Padmawijaya.
              </p>
              <div className="motto-box">
                <span className="motto-label">Motto Sekolah</span>
                <span className="motto-text">Berkarakter, Hebat, Jaya</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Linimasa Sejarah Sejak 1957 */}
      <section className="sec history-sec" id="sejarah">
        <div className="container">
          <div className="section-head-badge" data-reveal="">
            <span className="lbl lbl-lime">PERJALANAN PANJANG SEJAK 1957</span>
            <h2 className="section-heading">Linimasa Sejarah SMAN 1 Klaten</h2>
          </div>

          <div className="timeline-list">
            {timelineMilestones.map((item) => (
              <article className="timeline-row card" data-reveal="" key={item.year}>
                <div className="year-badge">
                  <span className="year-text num">{item.year}</span>
                </div>
                <div className="timeline-content-col">
                  <h3 className="milestone-title">{item.title}</h3>
                  <p className="milestone-desc">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="history-photos-grid">
            <figure className="photo-card card" data-reveal="">
              <div className="hist-img-frame">
                <img
                  src="/images/school/history-foto1.jpg"
                  alt="Arsip pendirian SMA Persiapan Klaten tahun 1957"
                  className="hist-img"
                  width={600}
                  height={400}
                  loading="lazy"
                />
              </div>
              <figcaption className="photo-caption">
                <strong>Arsip pendirian 1957</strong>
                <span>Gedung awal SMA Persiapan Klaten di Jalan Merbabu Nomor 13</span>
              </figcaption>
            </figure>

            <figure className="photo-card card" data-reveal="">
              <div className="hist-img-frame">
                <img
                  src="/images/school/history-foto2a.jpg"
                  alt="Generasi pengajar perintis SMAN 1 Klaten"
                  className="hist-img"
                  width={600}
                  height={400}
                  loading="lazy"
                />
              </div>
              <figcaption className="photo-caption">
                <strong>Generasi pengajar perintis</strong>
                <span>Pondasi etos akademik dan kedisiplinan intelektual sekolah</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 4. Dewan Pendidik dan Tenaga Kependidikan */}
      <section className="sec faculty-sec">
        <div className="container">
          <div className="section-head-badge" data-reveal="">
            <span className="lbl lbl-lime">CIVITAS AKADEMIKA</span>
            <h2 className="section-heading">Dewan Pendidik dan Tenaga Kependidikan</h2>
          </div>

          <figure className="faculty-banner card" data-reveal="">
            <div className="faculty-img-frame">
              <img
                src="/images/school/smansafullteam.jpeg"
                alt="Dewan pengajar dan tenaga kependidikan SMAN 1 Klaten berfoto bersama"
                className="faculty-img"
                width={1280}
                height={720}
                loading="lazy"
              />
            </div>
            <figcaption className="faculty-meta">
              <span>
                Dewan pendidik sekolah meningkatkan mutu pembelajaran melalui kelas riset,
                pendampingan ekstrakurikuler, dan literasi digital bagi seluruh siswa. Daftar
                lengkap 78 pimpinan, guru, dan staf tersedia di halaman{' '}
                <a className="inline-link" href="/direktori">
                  Direktori Civitas &rarr;
                </a>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 5. Identitas Legalitas Institusi */}
      <section className="sec legal-sec">
        <div className="container">
          <div className="section-head-badge" data-reveal="">
            <span className="lbl lbl-lime">DATA RESMI KEMENTERIAN & BAN-SM</span>
            <h2 className="section-heading">Identitas Legalitas Institusi</h2>
          </div>

          <div className="legal-card card" data-reveal="">
            <dl className="legal-grid">
              {legalRows.map(([label, value]) => (
                <div className="legal-item" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <style>{`
        .profile-unified-wrapper {
          border-top: var(--neo-border);
          background-color: var(--neo-bg);
        }

        .section-head-badge {
          margin-bottom: 28px;
        }

        .section-heading-lg {
          font-size: clamp(2rem, 3.8vw, 2.9rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: var(--neo-ink);
          margin-top: 10px;
          margin-bottom: 12px;
        }

        .section-lead-text {
          font-size: 1.1rem;
          color: var(--neo-ink-2);
          line-height: 1.7;
          max-width: 68ch;
        }

        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .phil-card {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sticker-tag {
          align-self: flex-start;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--neon-lime);
          color: var(--neo-ink);
          border: var(--neo-border-thin);
          box-shadow: 2px 2px 0px var(--neo-ink);
          padding: 4px 10px;
          border-radius: var(--r-sm);
        }

        .sticker-tag.tag-cyan {
          background: var(--neon-cyan);
        }

        .phil-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--neo-ink);
          letter-spacing: -0.015em;
        }

        .phil-desc {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--neo-ink-2);
        }

        .phil-desc em {
          font-weight: 700;
          font-style: normal;
          background: rgba(212, 255, 0, 0.45);
          padding: 1px 4px;
          border-bottom: 1.5px solid var(--neo-ink);
        }

        /* Principal Card */
        .principal-card {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 36px;
          padding: 28px;
        }

        .photo-frame-brutal {
          border: var(--neo-border);
          box-shadow: 3px 3px 0px var(--neo-ink);
          border-radius: var(--r-sm);
          overflow: hidden;
          background: #FFFFFF;
        }

        .principal-photo {
          width: 100%;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          object-position: center 15%;
          display: block;
        }

        .photo-label {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 12px;
          font-family: var(--font-mono);
        }

        .principal-name {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--neo-ink);
        }

        .principal-role {
          font-size: 0.78rem;
          color: var(--neo-ink-3);
        }

        .principal-text-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: center;
        }

        .principal-greeting {
          font-weight: 800;
          font-size: 1.05rem;
          color: var(--neo-ink);
        }

        .principal-body {
          font-size: 0.975rem;
          line-height: 1.75;
          color: var(--neo-ink-2);
        }

        .motto-box {
          align-self: flex-start;
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          background: var(--neon-lime);
          border: var(--neo-border);
          box-shadow: 3px 3px 0px var(--neo-ink);
          border-radius: var(--r-sm);
          padding: 10px 18px;
          margin-top: 8px;
        }

        .motto-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--neo-ink-3);
        }

        .motto-text {
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: 1.05rem;
          color: var(--neo-ink);
          letter-spacing: -0.01em;
        }

        /* Timeline */
        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .timeline-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 24px;
          padding: 20px 24px;
          align-items: center;
        }

        .year-badge {
          display: flex;
          align-items: center;
        }

        .year-text {
          font-family: var(--font-mono);
          font-size: 1.4rem;
          font-weight: 800;
          background: var(--neon-yellow);
          color: var(--neo-ink);
          border: var(--neo-border-thin);
          box-shadow: 2px 2px 0px var(--neo-ink);
          padding: 4px 12px;
          border-radius: var(--r-sm);
        }

        .milestone-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--neo-ink);
          margin-bottom: 6px;
        }

        .milestone-desc {
          font-size: 0.92rem;
          line-height: 1.65;
          color: var(--neo-ink-2);
        }

        /* History Photos */
        .history-photos-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .photo-card {
          padding: 12px;
        }

        .hist-img-frame {
          border: var(--neo-border);
          border-radius: var(--r-sm);
          overflow: hidden;
        }

        .hist-img {
          width: 100%;
          aspect-ratio: 3 / 2;
          object-fit: cover;
          display: block;
        }

        .photo-caption {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 12px 6px 4px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--neo-ink-2);
        }

        .photo-caption strong {
          color: var(--neo-ink);
          font-size: 0.88rem;
        }

        /* Faculty Banner */
        .faculty-banner {
          padding: 12px;
        }

        .faculty-img-frame {
          border: var(--neo-border);
          border-radius: var(--r-sm);
          overflow: hidden;
        }

        .faculty-img {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
        }

        .faculty-meta {
          padding: 16px 8px 6px;
          font-size: 0.92rem;
          line-height: 1.65;
          color: var(--neo-ink-2);
        }

        .inline-link {
          color: var(--neo-ink);
          font-weight: 800;
          text-decoration: underline;
          text-decoration-thickness: 2px;
        }

        /* Legal Grid */
        .legal-card {
          padding: 28px;
        }

        .legal-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px 28px;
        }

        .legal-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-bottom: 1.5px solid var(--neo-surface-2);
          padding-bottom: 12px;
        }

        .legal-item dt {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--neo-ink-3);
        }

        .legal-item dd {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--neo-ink);
        }

        @media (max-width: 860px) {
          .philosophy-grid,
          .history-photos-grid,
          .legal-grid {
            grid-template-columns: 1fr;
          }

          .principal-card {
            grid-template-columns: 1fr;
          }

          .timeline-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileSections;
