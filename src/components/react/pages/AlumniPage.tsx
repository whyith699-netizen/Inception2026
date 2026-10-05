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
  { region: 'Pengda Jabodetabek', scope: 'DKI Jakarta, Bogor, Depok, Tangerang, Bekasi', contact: 'kapasska.jabodetabek@sma1klaten.sch.id' },
  { region: 'Pengda Solo Raya & DIY', scope: 'Klaten, Surakarta, Sleman, Yogyakarta', contact: 'kapasska.soloraya@sma1klaten.sch.id' },
  { region: 'Pengda Jawa Timur', scope: 'Surabaya, Malang, Sidoarjo, dan sekitarnya', contact: 'kapasska.jatim@sma1klaten.sch.id' },
  { region: 'Pengda Jawa Barat', scope: 'Bandung Raya, Cirebon, Sukabumi', contact: 'kapasska.jabar@sma1klaten.sch.id' },
  { region: 'Komisariat Diaspora', scope: 'Luar Pulau Jawa & Mancanegara', contact: 'kapasska.global@sma1klaten.sch.id' },
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.graduationYear.trim() || !formData.phone.trim()) {
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="bg-neo-bg text-neo-ink">
      {/* 1. Page Header (Editorial) */}
      <section className="py-12 sm:py-16 border-b border-neo-ink bg-neo-bg">
        <div className="container">
          <span className="lbl lbl-lime mb-3 inline-block">KAPASSKA &middot; KELUARGA ALUMNI</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neo-ink mb-4 max-w-3xl leading-[1.15]">
            Jejaring Alumni SMAN 1 Klaten
          </h1>
          <p className="text-neo-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            Keluarga Alumni Padmawijaya SMAN 1 Klaten (KAPASSKA) menghimpun lebih dari 69 angkatan alumni sejak 1957 yang berkiprah di kepemimpinan nasional, perguruan tinggi, kedokteran, korporasi, dan lembaga negara.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl pt-6 border-t border-neo-ink">
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">10.000+</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Alumni Terdata</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">1957</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Angkatan Perdana</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">69</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Generasi Lulusan</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">5</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Pengurus Wilayah</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tokoh Alumni Nasional */}
      <section className="py-12 sm:py-16 border-b border-neo-ink">
        <div className="container">
          <div className="mb-8">
            <span className="lbl lbl-lime mb-2 inline-block">TOKOH KEHORMATAN</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neo-ink">Alumni yang Berkiprah Nasional</h2>
            <p className="text-neo-ink-2 text-sm sm:text-base mt-1 max-w-xl">
              Dedikasi alumni SMAN 1 Klaten pada sektor pendidikan tinggi, perbankan, kesehatan, dan pemerintahan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((alumnus) => (
              <article
                key={alumnus.id}
                className="bg-neo-surface border border-neo-ink shadow-neo-sm p-5 flex flex-col justify-between hover:shadow-neo transition-all"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={alumnus.image}
                      alt={`Potret ${alumnus.name}`}
                      className="w-16 h-16 object-cover object-top border border-neo-ink rounded-none shrink-0 bg-neo-surface-2"
                      loading="lazy"
                    />
                    <div>
                      <span className="lbl lbl-lime text-[10px] px-2 py-0.5 inline-block mb-1">Padmawijaya</span>
                      <h3 className="font-sans font-bold text-base text-neo-ink leading-snug">{alumnus.name}</h3>
                    </div>
                  </div>
                  <p className="text-neo-ink-2 text-xs sm:text-sm leading-relaxed border-t border-neo-ink/20 pt-3">
                    {alumnus.designation}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Program Kepedulian & Beasiswa 1976 */}
      <section className="py-12 sm:py-16 border-b border-neo-ink bg-neo-surface-2">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="lbl lbl-lime mb-2 inline-block">SOLIDARITAS ALUMNI</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neo-ink mb-4">
                Beasiswa Pendidikan Angkatan 1976
              </h2>
              <p className="text-neo-ink-2 text-sm sm:text-base leading-relaxed mb-4">
                Wujud nyata kepedulian lintas generasi alumni KAPASSKA dalam menyokong pendidikan adik-adik siswa di almamater. Dana bantuan disalurkan langsung secara transparan untuk membiayai kelengkapan belajar siswa berprestasi.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-neo-ink-2">
                <span>&bull; Penyerahan: 18 September 2026</span>
                <span>&bull; Penerima: 12 Siswa Berprestasi</span>
                <span>&bull; Pengelola: Komite Beasiswa KAPASSKA</span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-neo-surface border border-neo-ink shadow-neo p-6 sm:p-8">
              <span className="font-mono text-xs text-neo-ink-3 uppercase block mb-1">Total Dana Disalurkan</span>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-neo-ink block mb-4">
                Rp 18.000.000,-
              </span>
              <p className="text-xs text-neo-ink-2 leading-relaxed border-t border-neo-ink/20 pt-3">
                Diserahkan pada silaturahmi akbar alumni di aula SMA Negeri 1 Klaten untuk memastikan tidak ada siswa berprestasi yang terkendala biaya sekolah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pengurus Daerah & Pendataan Alumni */}
      <section className="py-12 sm:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Pengurus Wilayah */}
            <div className="lg:col-span-6">
              <div className="mb-6">
                <span className="lbl lbl-lime mb-2 inline-block">JARINGAN WILAYAH</span>
                <h2 className="font-serif text-2xl font-bold text-neo-ink">Pengurus Daerah KAPASSKA</h2>
                <p className="text-neo-ink-2 text-sm mt-1">
                  Kontak koordinator komisariat alumni di berbagai wilayah domisili.
                </p>
              </div>

              <div className="space-y-3">
                {regionalChapters.map((ch, idx) => (
                  <div key={idx} className="bg-neo-surface border border-neo-ink shadow-neo-sm p-4">
                    <h3 className="font-sans font-bold text-sm text-neo-ink mb-1">{ch.region}</h3>
                    <p className="text-xs text-neo-ink-2 mb-2">{ch.scope}</p>
                    <span className="font-mono text-xs text-neo-ink-3">{ch.contact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Pendataan */}
            <div className="lg:col-span-6">
              <div className="mb-6">
                <span className="lbl lbl-lime mb-2 inline-block">FORMULIR ONLINE</span>
                <h2 className="font-serif text-2xl font-bold text-neo-ink">Pembaruan Data Alumni</h2>
                <p className="text-neo-ink-2 text-sm mt-1">
                  Bantu almamater memperbarui direktori alumni untuk kemitraan, bursa karier, dan silaturahmi.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-neo-surface border border-neo-ink shadow-neo p-6 text-center">
                  <span className="lbl lbl-lime mb-2 inline-block">DATA TERSIMPAN</span>
                  <h3 className="font-serif text-xl font-bold text-neo-ink mb-2">Terima Kasih, Rekan Alumni!</h3>
                  <p className="text-xs text-neo-ink-2 mb-4 leading-relaxed">
                    Data Anda telah masuk ke dalam basis data sekretariat KAPASSKA SMA Negeri 1 Klaten.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ name: '', graduationYear: '', phone: '', profession: '', city: '' });
                      setIsSubmitted(false);
                    }}
                    className="btn btn-secondary text-xs"
                  >
                    Kirim Data Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-neo-surface border border-neo-ink shadow-neo p-6 space-y-4">
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Prasetyo, S.T."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neo-bg border border-neo-ink px-3 py-2 text-sm text-neo-ink focus:outline-none focus:ring-1 focus:ring-neo-ink"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">Tahun Lulus *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: 1998"
                        value={formData.graduationYear}
                        onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                        className="w-full bg-neo-bg border border-neo-ink px-3 py-2 text-sm text-neo-ink focus:outline-none focus:ring-1 focus:ring-neo-ink"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">Nomor Kontak/WA *</label>
                      <input
                        type="tel"
                        required
                        placeholder="08xxxxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neo-bg border border-neo-ink px-3 py-2 text-sm text-neo-ink focus:outline-none focus:ring-1 focus:ring-neo-ink"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">Profesi / Instansi</label>
                      <input
                        type="text"
                        placeholder="Pekerjaan / Perusahaan"
                        value={formData.profession}
                        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        className="w-full bg-neo-bg border border-neo-ink px-3 py-2 text-sm text-neo-ink focus:outline-none focus:ring-1 focus:ring-neo-ink"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">Kota Domisili</label>
                      <input
                        type="text"
                        placeholder="Kota saat ini"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-neo-bg border border-neo-ink px-3 py-2 text-sm text-neo-ink focus:outline-none focus:ring-1 focus:ring-neo-ink"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn btn-primary text-xs py-2.5 mt-2"
                  >
                    Simpan ke Direktori Alumni &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
