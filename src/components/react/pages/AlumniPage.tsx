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

const regionalChapters = [
  { name: 'Pengda Jabodetabek', desc: 'Mencakup DKI Jakarta, Bogor, Depok, Tangerang, dan Bekasi.', badge: 'Jabodetabek' },
  { name: 'Pengda Solo Raya & DIY', desc: 'Pusat temu alumni wilayah Klaten, Surakarta, Sleman, dan Yogyakarta.', badge: 'Jateng-DIY' },
  { name: 'Pengda Jawa Timur', desc: 'Komunitas alumni di Surabaya, Malang, dan sekitarnya.', badge: 'Jatim' },
  { name: 'Pengda Jawa Barat', desc: 'Jejaring civitas perguruan tinggi dan korporasi Bandung & sekitarnya.', badge: 'Jabar' },
  { name: 'Komisariat Luar Jawa & Diaspora', desc: 'Alumni yang bertugas di luar pulau Jawa dan mancanegara.', badge: 'Diaspora' },
];

const programHighlights = [
  {
    title: 'Beasiswa Pendidikan Angkatan 1976',
    date: '18 September 2026',
    amount: 'Rp 18.000.000,-',
    desc: 'Bantuan dana pendidikan disalurkan langsung kepada 12 siswa aktif SMAN 1 Klaten yang berprestasi dan membutuhkan dukungan biaya sekolah.',
    tag: 'Beasiswa Aktif',
  },
  {
    title: 'Mentoring Karier & Masuk PTN',
    date: 'Setiap Semester Genap',
    amount: 'Sharing Rutin',
    desc: 'Sesi kuliah tamu dan bedah jurusan langsung bersama alumni yang berkuliah di UGM, ITB, UI, UNS, serta profesional industri.',
    tag: 'Edukasi',
  },
  {
    title: 'Bakti Almamater & Sarana Prasarana',
    date: 'Tahunan',
    amount: 'Penguatan Sarpras',
    desc: 'Dukungan fasilitas laboratorium komputer, digitalisasi arsip sekolah, serta penunjang riset astronomi dan olimpiade sains.',
    tag: 'Pengabdian',
  },
];

export default function AlumniPage({ items = [] }: AlumniPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    graduationYear: '',
    phone: '',
    profession: '',
    city: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedData, setConfirmedData] = useState<typeof formData | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.graduationYear.trim() || !formData.phone.trim()) {
      return;
    }
    setConfirmedData({ ...formData });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      graduationYear: '',
      phone: '',
      profession: '',
      city: '',
    });
    setIsSubmitted(false);
    setConfirmedData(null);
  };

  return (
    <div className="bg-neo-bg text-neo-ink min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* 1. Hero Section KAPASSKA 69 Angkatan */}
        <section aria-labelledby="hero-heading">
          <div className="bg-neo-surface border-2 border-neo-ink shadow-neo-lg p-6 sm:p-10 lg:p-14">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold">
                KAPASSKA &middot; SEJAK 1957
              </span>
              <span className="bg-neon-cyan text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold">
                69 ANGKATAN ALUMNI
              </span>
            </div>

            <h1 id="hero-heading" className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neo-ink tracking-tight leading-tight mb-6 max-w-4xl">
              Keluarga Alumni{' '}
              <span className="bg-neon-lime text-neo-ink px-2 sm:px-3 py-0.5 border-2 border-neo-ink shadow-neo-sm inline-block">
                Padmawijaya
              </span>{' '}
              SMA Negeri 1 Klaten
            </h1>

            <p className="text-neo-ink-2 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mb-10">
              Wadah persaudaraan dan sinergi puluhan ribu lulusan SMAN 1 Klaten yang berkarya di kancah nasional, memimpin perguruan tinggi, korps diplomatik, lembaga negara, perbankan, riset sains, hingga kewirausahaan global.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t-2 border-neo-ink">
              <div className="bg-neo-bg border-2 border-neo-ink shadow-neo-sm p-4 sm:p-5 flex flex-col gap-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-neo-ink tabular-nums">
                  10.000+
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neo-ink-2">
                  Alumni Tersebar
                </span>
              </div>

              <div className="bg-neo-bg border-2 border-neo-ink shadow-neo-sm p-4 sm:p-5 flex flex-col gap-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-neo-ink tabular-nums">
                  1957
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neo-ink-2">
                  Tahun Angkatan Perdana
                </span>
              </div>

              <div className="bg-neo-bg border-2 border-neo-ink shadow-neo-sm p-4 sm:p-5 flex flex-col gap-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-neo-ink tabular-nums">
                  5 Wilayah
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neo-ink-2">
                  Pengurus Daerah
                </span>
              </div>

              <div className="bg-neon-lime border-2 border-neo-ink shadow-neo-sm p-4 sm:p-5 flex flex-col gap-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-neo-ink tabular-nums">
                  Rp 18 Juta
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neo-ink">
                  Beasiswa Angkatan 1976 (2026)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Grid Tokoh Alumni Nasional */}
        <section id="tokoh-alumni" aria-labelledby="tokoh-heading" className="pt-4">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <span className="bg-neon-magenta text-white border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold inline-block mb-3">
              REKAM JEJAK KARYA
            </span>
            <h2 id="tokoh-heading" className="font-sans text-2xl sm:text-4xl lg:text-5xl font-extrabold text-neo-ink tracking-tight mb-3">
              Tokoh Alumni di Tingkat Nasional
            </h2>
            <p className="text-neo-ink-2 text-base sm:text-lg leading-relaxed">
              Profil figur publik lulusan SMAN 1 Klaten yang mendedikasikan keilmuan dan kepemimpinan bagi kemajuan bangsa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((alumnus) => (
              <article
                key={alumnus.id}
                className="bg-neo-surface border-2 border-neo-ink shadow-neo hover:shadow-neo-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex flex-col overflow-hidden"
              >
                <div className="relative w-full aspect-[3/4] bg-neo-surface-2 border-b-2 border-neo-ink overflow-hidden">
                  <img
                    src={alumnus.image}
                    alt={`Potret ${alumnus.name}`}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width={320}
                    height={427}
                  />
                  <span className="absolute top-3 right-3 bg-neon-yellow text-neo-ink border-2 border-neo-ink font-mono text-[10px] font-extrabold px-2.5 py-1 shadow-neo-sm">
                    ALUMNI #{alumnus.id}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-sans text-xl font-bold text-neo-ink leading-snug">
                      {alumnus.name}
                    </h3>
                    <p className="text-sm text-neo-ink-2 leading-relaxed">
                      {alumnus.designation}
                    </p>
                  </div>

                  <div className="pt-4 border-t-2 border-neo-ink/10 flex items-center justify-between">
                    <span className="bg-neon-cyan text-neo-ink border border-neo-ink font-mono text-[11px] font-bold uppercase px-2.5 py-0.5 shadow-neo-sm">
                      Padmawijaya Honor
                    </span>
                    <span className="font-mono text-xs text-neo-ink-3">
                      SMAN 1 Klaten
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. Section Beasiswa Angkatan 1976 & Program Kepedulian */}
        <section id="program-alumni" aria-labelledby="program-heading" className="pt-4">
          <div className="bg-neo-surface-2 border-2 border-neo-ink shadow-neo-lg p-6 sm:p-10 lg:p-12">
            <div className="max-w-3xl mb-8 sm:mb-10">
              <span className="bg-neon-yellow text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold inline-block mb-3">
                AKSI NYATA ALMAMATER
              </span>
              <h2 id="program-heading" className="font-sans text-2xl sm:text-4xl font-extrabold text-neo-ink tracking-tight mb-3">
                Program & Kepedulian Alumni
              </h2>
              <p className="text-neo-ink-2 text-base sm:text-lg leading-relaxed">
                Kontribusi berkelanjutan KAPASSKA untuk memastikan adik-adik kelas di SMAN 1 Klaten mendapatkan akses pendidikan berkualitas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programHighlights.map((prog) => (
                <div
                  key={prog.title}
                  className="bg-neo-surface border-2 border-neo-ink shadow-neo p-6 sm:p-7 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-neon-cyan text-neo-ink border border-neo-ink font-mono text-xs uppercase px-2.5 py-0.5 font-bold shadow-neo-sm">
                        {prog.tag}
                      </span>
                      <span className="font-mono text-xs font-bold text-neo-ink-3 tabular-nums">
                        {prog.date}
                      </span>
                    </div>

                    <h3 className="font-sans text-lg sm:text-xl font-bold text-neo-ink leading-snug">
                      {prog.title}
                    </h3>

                    <div className="inline-block bg-neon-lime text-neo-ink font-mono font-bold text-lg sm:text-xl px-3 py-1 border-2 border-neo-ink shadow-neo-sm">
                      {prog.amount}
                    </div>

                    <p className="text-sm text-neo-ink-2 leading-relaxed">
                      {prog.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Section Pengurus Wilayah & Form Alumni Interaktif */}
        <section id="jejaring-kapasska" aria-labelledby="jejaring-heading" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Kolom Kiri: Pengurus Wilayah */}
            <div className="space-y-6">
              <div>
                <span className="bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold inline-block mb-3">
                  KOMISARIAT WILAYAH
                </span>
                <h2 id="jejaring-heading" className="font-sans text-2xl sm:text-4xl font-extrabold text-neo-ink tracking-tight mb-3">
                  Jejaring Pengurus Daerah KAPASSKA
                </h2>
                <p className="text-neo-ink-2 text-base leading-relaxed">
                  Terhubung dengan sesama alumni di kota domisili Anda untuk kolaborasi karier, wirausaha, dan silaturahmi.
                </p>
              </div>

              <div className="space-y-4">
                {regionalChapters.map((ch) => (
                  <div
                    key={ch.name}
                    className="bg-neo-surface border-2 border-neo-ink shadow-neo p-4 sm:p-5 flex items-start sm:items-center gap-4 hover:shadow-neo-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                  >
                    <span className="bg-neon-magenta text-white font-mono font-bold text-xs uppercase border border-neo-ink shadow-neo-sm px-2.5 py-1.5 shrink-0">
                      {ch.badge}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="font-sans font-bold text-base text-neo-ink">
                        {ch.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-neo-ink-2 leading-relaxed">
                        {ch.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kolom Kanan: Formulir Interaktif Alumni dengan React State */}
            <div className="bg-neo-surface border-2 border-neo-ink shadow-neo p-6 sm:p-8">
              <div className="mb-6">
                <span className="bg-neon-yellow text-neo-ink border-2 border-neo-ink shadow-neo-sm font-mono text-xs uppercase px-3 py-1 font-bold inline-block mb-2">
                  DATABASE RESMI
                </span>
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-neo-ink">
                  Pembaruan Data Alumni
                </h3>
                <p className="text-sm text-neo-ink-2 mt-1 leading-relaxed">
                  Bantu sekretariat KAPASSKA memetakan potensi alumni dengan memperbarui data kontak dan profesi Anda.
                </p>
              </div>

              {isSubmitted && confirmedData ? (
                <div className="bg-neon-lime border-2 border-neo-ink shadow-neo p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-neo-surface text-neo-ink border border-neo-ink font-mono text-xs font-bold uppercase px-2 py-0.5 shadow-neo-sm">
                      BERHASIL DISIMPAN
                    </span>
                    <span className="font-mono text-xs text-neo-ink font-bold">
                      Database Terkini
                    </span>
                  </div>

                  <h4 className="font-sans text-lg font-bold text-neo-ink">
                    Terima kasih, {confirmedData.name}!
                  </h4>

                  <p className="text-sm text-neo-ink leading-relaxed">
                    Data Anda untuk angkatan kelulusan{' '}
                    <strong className="font-mono font-bold underline">
                      {confirmedData.graduationYear}
                    </strong>{' '}
                    berdomisili di <strong>{confirmedData.city}</strong> telah dicatat dalam sistem pusat data KAPASSKA SMAN 1 Klaten.
                  </p>

                  <div className="bg-neo-surface border-2 border-neo-ink p-3 space-y-1 text-xs font-mono text-neo-ink">
                    <p><strong>Profesi:</strong> {confirmedData.profession}</p>
                    <p><strong>Kontak WA:</strong> {confirmedData.phone}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full py-2.5 px-4 bg-neo-surface hover:bg-neo-surface-2 text-neo-ink border-2 border-neo-ink shadow-neo-sm hover:shadow-neo font-mono font-bold text-xs uppercase cursor-pointer transition-all"
                  >
                    Perbarui Data Lainnya &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="alumni-name" className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">
                      Nama Lengkap & Gelar
                    </label>
                    <input
                      id="alumni-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="contoh: Budi Santoso, S.T., M.T."
                      required
                      className="w-full px-3.5 py-2.5 bg-neo-bg border-2 border-neo-ink shadow-neo-sm font-sans text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:bg-white focus:shadow-neo transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="alumni-year" className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">
                        Tahun Kelulusan
                      </label>
                      <input
                        id="alumni-year"
                        type="number"
                        min="1957"
                        max="2026"
                        value={formData.graduationYear}
                        onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                        placeholder="contoh: 2015"
                        required
                        className="w-full px-3.5 py-2.5 bg-neo-bg border-2 border-neo-ink shadow-neo-sm font-mono text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:bg-white focus:shadow-neo transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="alumni-phone" className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">
                        Nomor WhatsApp
                      </label>
                      <input
                        id="alumni-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="08xxxxxxxxxx"
                        required
                        className="w-full px-3.5 py-2.5 bg-neo-bg border-2 border-neo-ink shadow-neo-sm font-mono text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:bg-white focus:shadow-neo transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="alumni-job" className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">
                      Profesi / Instansi / Tempat Kerja
                    </label>
                    <input
                      id="alumni-job"
                      type="text"
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      placeholder="contoh: Dosen Teknik UGM / CEO PT ..."
                      required
                      className="w-full px-3.5 py-2.5 bg-neo-bg border-2 border-neo-ink shadow-neo-sm font-sans text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:bg-white focus:shadow-neo transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="alumni-city" className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">
                      Kota Domisili Saat Ini
                    </label>
                    <input
                      id="alumni-city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="contoh: Jakarta Selatan"
                      required
                      className="w-full px-3.5 py-2.5 bg-neo-bg border-2 border-neo-ink shadow-neo-sm font-sans text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:bg-white focus:shadow-neo transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 px-6 bg-neon-lime hover:bg-neon-cyan text-neo-ink border-2 border-neo-ink shadow-neo hover:shadow-neo-lg active:shadow-neo-sm active:translate-x-0.5 active:translate-y-0.5 transition-all font-mono font-bold text-sm uppercase cursor-pointer"
                  >
                    Simpan Data Alumni &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
