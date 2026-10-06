import { useState, type FormEvent } from 'react';

export interface AlumniItem {
  id: number;
  name: string;
  designation: string;
  image: string;
}

export interface AlumniPageProps {
  items?: AlumniItem[];
}

const REGIONAL_CHAPTERS = [
  { name: 'Pengda Jabodetabek', desc: 'Mencakup DKI Jakarta, Bogor, Depok, Tangerang, dan Bekasi.', badge: 'Jabodetabek' },
  { name: 'Pengda Solo Raya & DIY', desc: 'Pusat temu alumni wilayah Klaten, Surakarta, Sleman, dan Yogyakarta.', badge: 'Jateng-DIY' },
  { name: 'Pengda Jawa Timur', desc: 'Komunitas alumni di Surabaya, Malang, dan sekitarnya.', badge: 'Jatim' },
  { name: 'Pengda Jawa Barat', desc: 'Jejaring civitas perguruan tinggi dan korporasi Bandung & sekitarnya.', badge: 'Jabar' },
  { name: 'Komisariat Diaspora', desc: 'Alumni yang bertugas di luar pulau Jawa dan mancanegara.', badge: 'Diaspora' },
];

export const AlumniPage = ({ items = [] }: AlumniPageProps) => {
  const [formData, setFormData] = useState({
    name: '',
    graduationYear: '',
    phone: '',
    profession: '',
    city: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.graduationYear.trim() || !formData.phone.trim()) {
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="alumni-page-wrapper">
      {/* 1. Hero Section */}
      <section className="alumni-hero">
        <div className="container">
          <div className="hero-card brutal-card">
            <div className="hero-top">
              <span className="lbl lbl-lime">KAPASSKA · SEJAK 1957</span>
              <span className="lbl lbl-cyan">69 ANGKATAN ALUMNI</span>
            </div>
            <h1 className="hero-title">
              Keluarga Alumni <em>Padmawijaya</em> SMA Negeri 1 Klaten
            </h1>
            <p className="hero-lede">
              Wadah persaudaraan dan sinergi puluhan ribu lulusan SMAN 1 Klaten yang berkarya di kancah nasional, memimpin perguruan tinggi, korps diplomatik, lembaga negara, perbankan, riset sains, hingga kewirausahaan global.
            </p>

            <div className="stats-row">
              <div className="stat-pill">
                <span className="stat-num">10.000+</span>
                <span className="stat-lbl">Alumni Tersebar</span>
              </div>
              <div className="stat-pill">
                <span className="stat-num">1957</span>
                <span className="stat-lbl">Tahun Angkatan Perdana</span>
              </div>
              <div className="stat-pill">
                <span className="stat-num">5 Wilayah</span>
                <span className="stat-lbl">Pengurus Daerah</span>
              </div>
              <div className="stat-pill stat-accent">
                <span className="stat-num">Rp 18 Juta</span>
                <span className="stat-lbl">Beasiswa Angkatan 1976 (2026)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tokoh Alumni Berprestasi */}
      <section className="sec" id="tokoh-alumni">
        <div className="container">
          <div className="section-heading" style={{ marginBottom: 'clamp(28px, 4vw, 40px)' }}>
            <span className="lbl lbl-magenta">REKAM JEJAK KARYA</span>
            <h2 className="title-heading">Tokoh Alumni di Tingkat Nasional</h2>
            <p className="desc-heading">
              Profil figur publik lulusan SMAN 1 Klaten yang mendedikasikan keilmuan dan kepemimpinan bagi kemajuan bangsa.
            </p>
          </div>

          {items.length > 0 && (
            <div>
              {/* Featured Lead Alumni: Prof. Ir. Sudjarwadi, M.Eng., Ph.D. */}
              {items[0] && (
                <article className="alumni-spotlight-card">
                  <div className="alumni-spotlight-grid">
                    <div>
                      <div className="w-full aspect-[4/5] max-h-[320px] bg-neo-surface-2 border-2 border-neo-ink rounded shadow-neo-sm overflow-hidden relative">
                        <img
                          src={items[0].image}
                          alt={`Potret ${items[0].name}`}
                          className="w-full h-full object-cover object-top"
                          loading="eager"
                          width={320}
                          height={400}
                        />
                        <span className="alumni-card-badge">
                          Tokoh Utama
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center">
                      <div className="mb-3">
                        <span className="lbl lbl-yellow text-[10px] px-2.5 py-1 inline-block mb-2">
                          MANTAN REKTOR UNIVERSITAS GADJAH MADA (2007–2012)
                        </span>
                        <h3 className="font-serif font-bold text-2xl sm:text-3xl text-neo-ink leading-snug">
                          {items[0].name}
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base text-neo-ink-2 leading-relaxed mb-6 font-sans">
                        Menyelesaikan pendidikan dasar hingga menengah di Klaten sebelum menempuh studi teknik sipil di UGM, Asian Institute of Technology Bangkok, dan University of Iowa. Beliau memimpin Universitas Gadjah Mada sebagai Rektor ke-13, menjadi teladan kepemimpinan berbasis riset kerakyatan, serta senantiasa mendukung kemajuan almamater SMA Negeri 1 Klaten.
                      </p>

                      <div className="pt-4 border-t-2 border-neo-ink flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neo-ink-3">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-neo-bg border border-neo-ink rounded text-neo-ink font-bold">
                            Guru Besar UGM
                          </span>
                          <span className="px-3 py-1 bg-neo-bg border border-neo-ink rounded text-neo-ink font-bold">
                            Alumni Kehormatan
                          </span>
                        </div>
                        <span className="font-bold text-neo-ink pr-2">KAPASSKA Klaten · Nasional</span>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* Grid 6 Tokoh Alumni (Symmetrical 2 rows of 3) */}
              <div className="alumni-grid-six">
                {items.slice(1).map((alumnus) => {
                  const tagMap: Record<number, string> = {
                    2: 'Mantan Rektor Undip',
                    3: 'Mantan Rektor UNS',
                    4: 'Dirut BRI & LPS',
                    5: 'Mantan Dekan FK UGM',
                    6: 'Pakar Bedah Saraf',
                    7: 'Dekan FTMD ITB',
                  };
                  const roleTag = tagMap[alumnus.id] || 'Alumni Nasional';

                  return (
                    <article key={alumnus.id} className="alumni-card-item">
                      <div>
                        {/* Top Photo Frame with Uniform Centered Portrait */}
                        <div className="alumni-card-photo-box">
                          <div className="alumni-card-avatar">
                            <img
                              src={alumnus.image}
                              alt={`Potret ${alumnus.name}`}
                              className="w-full h-full object-cover object-top rounded-full"
                              loading="lazy"
                              width={120}
                              height={120}
                            />
                          </div>
                          <span className="alumni-card-badge">
                            {roleTag}
                          </span>
                        </div>

                        {/* Content Area */}
                        <div className="alumni-card-body">
                          <h3 className="font-serif font-bold text-base text-neo-ink leading-snug line-clamp-2 min-h-[2.8rem] flex items-center">
                            {alumnus.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-neo-ink-2 leading-relaxed">
                            {alumnus.designation}
                          </p>
                        </div>
                      </div>

                      {/* Card Foot */}
                      <div className="alumni-card-footer">
                        <span>KAPASSKA Klaten</span>
                        <span className="alumni-year-chip">
                          Padmawijaya Honor
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Program Beasiswa & Bakti Almamater */}
      <section className="sec sec-flush" style={{ background: 'var(--neo-surface-2)', padding: 'clamp(56px, 8vw, 88px) 0' }} id="beasiswa">
        <div className="container">
          <div className="section-heading">
            <span className="lbl lbl-lime">KEPEDULIAN SOSIAL</span>
            <h2 className="title-heading">Program Beasiswa & Bakti Almamater</h2>
            <p className="desc-heading">
              Aksi nyata alumni KAPASSKA dalam mendukung keberlangsungan studi adik-adik siswa dan kemajuan fasilitas almamater.
            </p>
          </div>

          <div className="program-grid">
            <div className="program-card card">
              <div className="program-header">
                <span className="lbl lbl-yellow" style={{ marginBottom: 0 }}>Beasiswa Aktif</span>
                <span className="program-date">18 September 2026</span>
              </div>
              <h3 className="program-title">Beasiswa Pendidikan Angkatan 1976</h3>
              <div className="program-amount">Rp 18.000.000,-</div>
              <p className="program-desc">
                Bantuan dana pendidikan disalurkan langsung kepada 12 siswa aktif SMAN 1 Klaten yang berprestasi dan membutuhkan dukungan biaya sekolah.
              </p>
            </div>

            <div className="program-card card">
              <div className="program-header">
                <span className="lbl lbl-cyan" style={{ marginBottom: 0 }}>Edukasi</span>
                <span className="program-date">Setiap Semester Genap</span>
              </div>
              <h3 className="program-title">Mentoring Karier & Masuk PTN</h3>
              <div className="program-amount">Sharing Rutin</div>
              <p className="program-desc">
                Sesi kuliah tamu dan bedah jurusan langsung bersama alumni yang berkuliah di UGM, ITB, UI, UNS, serta profesional industri terkemuka.
              </p>
            </div>

            <div className="program-card card">
              <div className="program-header">
                <div className="lbl lbl-magenta" style={{ marginBottom: 0 }}>Pengabdian</div>
                <span className="program-date">Tahunan</span>
              </div>
              <h3 className="program-title">Bakti Almamater & Fasilitas</h3>
              <div className="program-amount">Penguatan Sarpras</div>
              <p className="program-desc">
                Dukungan fasilitas laboratorium komputer, digitalisasi arsip sekolah, serta penunjang riset astronomi dan olimpiade sains nasional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Jejaring Pengurus Daerah & Form Pendaftaran */}
      <section className="sec" id="jejaring-kapasska">
        <div className="container">
          <div className="network-layout">
            {/* Kolom Kiri: Pengurus Daerah */}
            <div className="network-left">
              <span className="lbl lbl-lime">KOMISARIAT WILAYAH</span>
              <h2 className="title-heading">Jejaring Pengurus Daerah KAPASSKA</h2>
              <p className="desc-heading" style={{ marginBottom: '24px' }}>
                Terhubung dengan sesama alumni di kota domisili Anda untuk kolaborasi karier, wirausaha, dan silaturahmi.
              </p>

              <div className="chapters-list">
                {REGIONAL_CHAPTERS.map((ch) => (
                  <div className="chapter-item card" key={ch.name}>
                    <div className="chapter-badge num">{ch.badge}</div>
                    <div className="chapter-info">
                      <h4 className="chapter-name">{ch.name}</h4>
                      <p className="chapter-desc">{ch.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kolom Kanan: Form Pendaftaran Direktori Alumni */}
            <div className="network-right">
              <div className="form-card card">
                <div className="form-top">
                  <span className="lbl lbl-yellow">DATABASE RESMI</span>
                  <h3 className="form-title">Pembaruan Data Alumni</h3>
                  <p className="form-desc">
                    Bantu sekretariat KAPASSKA memetakan potensi alumni dengan memperbarui data kontak dan profesi Anda.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="p-6 bg-neo-bg border border-neo-ink text-center">
                    <span className="lbl lbl-lime mb-2 inline-block">TERCATAT</span>
                    <h4 className="font-serif text-lg font-bold text-neo-ink mb-2">Terima Kasih, Rekan Alumni!</h4>
                    <p className="text-xs text-neo-ink-2 mb-4 leading-relaxed">
                      Data Anda telah berhasil disimpan dalam basis data resmi KAPASSKA SMA Negeri 1 Klaten.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="btn btn-secondary text-xs"
                    >
                      Kirim Data Lain
                    </button>
                  </div>
                ) : (
                  <form className="alumni-form" onSubmit={handleSubmit}>
                    <div className="field-group">
                      <label htmlFor="f-name" className="field-label">Nama Lengkap & Gelar</label>
                      <input
                        id="f-name"
                        type="text"
                        className="field-input"
                        placeholder="contoh: Budi Santoso, S.T., M.T."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="field-group">
                        <label htmlFor="f-year" className="field-label">Tahun Kelulusan</label>
                        <input
                          id="f-year"
                          type="number"
                          min="1957"
                          max="2026"
                          className="field-input num"
                          placeholder="contoh: 2015"
                          value={formData.graduationYear}
                          onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                          required
                        />
                      </div>
                      <div className="field-group">
                        <label htmlFor="f-phone" className="field-label">Nomor WhatsApp</label>
                        <input
                          id="f-phone"
                          type="tel"
                          className="field-input num"
                          placeholder="08xxxxxxxxxx"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="field-group">
                      <label htmlFor="f-job" className="field-label">Profesi / Instansi / Tempat Kerja</label>
                      <input
                        id="f-job"
                        type="text"
                        className="field-input"
                        placeholder="contoh: Dosen Teknik UGM / CEO PT ..."
                        value={formData.profession}
                        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        required
                      />
                    </div>

                    <div className="field-group">
                      <label htmlFor="f-city" className="field-label">Kota Domisili Saat Ini</label>
                      <input
                        id="f-city"
                        type="text"
                        className="field-input"
                        placeholder="contoh: Jakarta Selatan / Yogyakarta"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn">
                      Simpan Data Alumni →
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AlumniPage;
