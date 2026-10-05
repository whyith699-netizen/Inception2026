import { useState, type FC } from 'react';

interface FormData {
  name: string;
  contact: string;
  category: string;
  subject: string;
  message: string;
}

export const KontakPage: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    category: 'ppdb',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    timestamp: string;
    name: string;
    category: string;
  } | null>(null);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const ticketNum = Math.floor(1000 + Math.random() * 9000);
      const now = new Date();
      const hh = now.getHours() < 10 ? '0' + now.getHours() : '' + now.getHours();
      const mm = now.getMinutes() < 10 ? '0' + now.getMinutes() : '' + now.getMinutes();
      const formattedDate = `${now.getDate()} Mei 2026, ${hh}:${mm} WIB`;

      setSubmittedTicket({
        id: `TU-KLATEN-${ticketNum}`,
        timestamp: formattedDate,
        name: formData.name,
        category: formData.category
      });
      setIsSubmitting(false);
    }, 500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      contact: '',
      category: 'ppdb',
      subject: '',
      message: ''
    });
    setSubmittedTicket(null);
  };

  const categoryLabels: Record<string, string> = {
    ppdb: 'Informasi PPDB 2026 & Seleksi',
    akademik: 'Kurikulum & Peminatan Siswa',
    legalisir: 'Legalisir Ijazah & Layanan Alumni KAPASSKA',
    sarpras: 'Pengaduan Sarana & Fasilitas Belajar',
    kemitraan: 'Kemitraan, Studi Banding & Riset',
    umum: 'Layanan Informasi Umum Tata Usaha'
  };

  return (
    <div className="bg-neo-bg text-neo-ink">
      {/* 1. Page Header (Editorial) */}
      <section className="py-12 sm:py-16 border-b border-neo-ink bg-neo-bg">
        <div className="container">
          <span className="lbl lbl-lime mb-3 inline-block">SEKRETARIAT & LAYANAN PUBLIK</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neo-ink mb-4 max-w-3xl leading-[1.15]">
            Hubungi SMAN 1 Klaten
          </h1>
          <p className="text-neo-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            Saluran komunikasi resmi sekretariat tata usaha SMA Negeri 1 Klaten untuk layanan akademik, informasi PPDB 2026, legalisir ijazah alumni KAPASSKA, dan permohonan kemitraan.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl pt-8 mt-8 border-t border-neo-ink">
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">(0272) 321150</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Telepon Kantor</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">Senin – Kamis</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">07.00 - 15.30 WIB</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">Jumat</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">07.00 - 14.00 WIB</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">Jl. Merbabu 13</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Klaten Selatan</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Grid: Kontak Info & Form */}
      <section className="py-12 sm:py-16 border-b border-neo-ink">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Kolom Kiri: Informasi Sekretariat */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-neo-surface border border-neo-ink shadow-neo-sm p-6">
                <div className="mb-4 pb-3 border-b border-neo-ink/20">
                  <span className="lbl lbl-lime text-[10px] px-2 py-0.5 inline-block mb-1">
                    SEKRETARIAT
                  </span>
                  <h2 className="font-serif font-bold text-xl text-neo-ink">
                    Informasi Kontak Sekolah
                  </h2>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <span className="font-mono text-xs text-neo-ink-3 uppercase block mb-1">
                      Alamat Gedung Utama
                    </span>
                    <p className="font-sans font-semibold text-neo-ink leading-relaxed">
                      Jalan Merbabu Nomor 13, Klaten Selatan, Kabupaten Klaten, Jawa Tengah 57423
                    </p>
                    <p className="font-mono text-xs text-neo-ink-3 mt-0.5">
                      Kawasan Cagar Budaya & Adiwiyata Mandiri
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neo-ink/10">
                    <span className="font-mono text-xs text-neo-ink-3 uppercase block mb-1">
                      Telepon & Pos Elektronik
                    </span>
                    <p className="font-mono text-sm text-neo-ink">
                      Telepon: <strong>(0272) 321150</strong>
                    </p>
                    <p className="font-mono text-xs text-neo-ink-2 mt-0.5">
                      Email: info@sma1klaten.sch.id
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neo-ink/10">
                    <span className="font-mono text-xs text-neo-ink-3 uppercase block mb-1">
                      Jam Kerja Tata Usaha
                    </span>
                    <ul className="space-y-1 font-mono text-xs text-neo-ink-2">
                      <li className="flex justify-between">
                        <span>Senin – Kamis:</span>
                        <strong className="text-neo-ink">07.00 – 15.30 WIB</strong>
                      </li>
                      <li className="flex justify-between">
                        <span>Jumat:</span>
                        <strong className="text-neo-ink">07.00 – 14.00 WIB</strong>
                      </li>
                      <li className="flex justify-between text-neo-ink-3">
                        <span>Sabtu & Minggu:</span>
                        <span>Libur</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Aksesibilitas Kampus */}
              <div className="bg-neo-surface-2 border border-neo-ink p-5">
                <span className="lbl lbl-lime text-[10px] px-2 py-0.5 inline-block mb-2">
                  AKSESIBILITAS KAMPUS
                </span>
                <ul className="space-y-2 text-xs text-neo-ink-2">
                  <li className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-neo-ink font-bold">•</span>
                    <span><strong>1,2 km dari Stasiun Klaten:</strong> 3 menit berkendara atau angkutan kota jalur Merbabu.</span>
                  </li>
                  <li className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-neo-ink font-bold">•</span>
                    <span><strong>800 m dari Alun-Alun Klaten:</strong> Berada di kawasan pusat pendidikan Klaten Selatan.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Kolom Kanan: Form Pengaduan */}
            <div className="lg:col-span-7">
              <div className="bg-neo-surface border border-neo-ink shadow-neo p-6 sm:p-8">
                <div className="mb-6 pb-3 border-b border-neo-ink/20">
                  <span className="lbl lbl-lime text-[10px] px-2 py-0.5 inline-block mb-1">
                    LAYANAN PERSURATAN
                  </span>
                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-neo-ink">
                    Form Pengaduan & Layanan Tata Usaha
                  </h2>
                </div>

                {submittedTicket ? (
                  <div className="bg-neo-bg border border-neo-ink p-6 text-center space-y-4">
                    <span className="lbl lbl-lime mb-2 inline-block">TERKIRIM</span>
                    <h3 className="font-serif font-bold text-xl text-neo-ink mb-1">
                      Pesan Layanan Berhasil Diterima
                    </h3>
                    <p className="text-xs text-neo-ink-2 max-w-md mx-auto leading-relaxed">
                      Laporan Anda telah dicatat oleh sistem administrasi persuratan SMAN 1 Klaten.
                    </p>

                    <div className="bg-neo-surface border border-dashed border-neo-ink p-4 max-w-sm mx-auto text-left font-mono text-xs space-y-2">
                      <div className="flex justify-between border-b border-neo-ink/10 pb-1.5">
                        <span className="text-neo-ink-3">Nomor Tiket:</span>
                        <strong className="text-neo-ink">{submittedTicket.id}</strong>
                      </div>
                      <div className="flex justify-between border-b border-neo-ink/10 pb-1.5">
                        <span className="text-neo-ink-3">Pemohon:</span>
                        <strong className="text-neo-ink">{submittedTicket.name}</strong>
                      </div>
                      <div className="flex justify-between border-b border-neo-ink/10 pb-1.5">
                        <span className="text-neo-ink-3">Kategori:</span>
                        <strong className="text-neo-ink">{categoryLabels[submittedTicket.category] || submittedTicket.category}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neo-ink-3">Waktu:</span>
                        <strong className="text-neo-ink">{submittedTicket.timestamp}</strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn btn-secondary text-xs"
                    >
                      Kirim Pesan Lainnya →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="input-name" className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">
                        Nama Lengkap *
                      </label>
                      <input
                        id="input-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Budi Santoso, S.Pd."
                        className="w-full bg-neo-bg border border-neo-ink p-2.5 text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:ring-1 focus:ring-neo-ink font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="input-contact" className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">
                          Email atau Nomor WA *
                        </label>
                        <input
                          id="input-contact"
                          type="text"
                          required
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          placeholder="08xxxxxxxxxx"
                          className="w-full bg-neo-bg border border-neo-ink p-2.5 text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:ring-1 focus:ring-neo-ink font-sans"
                        />
                      </div>

                      <div>
                        <label htmlFor="select-category" className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">
                          Keperluan Layanan *
                        </label>
                        <select
                          id="select-category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-neo-bg border border-neo-ink p-2.5 text-sm text-neo-ink focus:outline-none focus:ring-1 focus:ring-neo-ink font-sans"
                        >
                          <option value="ppdb">Informasi PPDB 2026</option>
                          <option value="akademik">Kurikulum & Peminatan Siswa</option>
                          <option value="legalisir">Legalisir Ijazah & Layanan Alumni</option>
                          <option value="sarpras">Pengaduan Sarana Prasarana</option>
                          <option value="kemitraan">Kemitraan, Studi Banding & Riset</option>
                          <option value="umum">Layanan Informasi Umum</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="input-subject" className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">
                        Subjek Pesan
                      </label>
                      <input
                        id="input-subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Contoh: Jadwal Verifikasi Berkas Jalur Zonasi"
                        className="w-full bg-neo-bg border border-neo-ink p-2.5 text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:ring-1 focus:ring-neo-ink font-sans"
                      />
                    </div>

                    <div>
                      <label htmlFor="input-message" className="block font-mono text-xs font-bold uppercase text-neo-ink mb-1">
                        Isi Pesan / Pengaduan *
                      </label>
                      <textarea
                        id="input-message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tuliskan pertanyaan, permohonan informasi, atau rincian pengaduan Anda secara jelas..."
                        className="w-full bg-neo-bg border border-neo-ink p-2.5 text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:ring-1 focus:ring-neo-ink font-sans resize-y"
                      ></textarea>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="font-mono text-xs text-neo-ink-3">
                        Pesan dicatat resmi oleh Tata Usaha SMAN 1 Klaten.
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary text-xs w-full sm:w-auto"
                      >
                        {isSubmitting ? 'Memproses...' : 'Kirim Pesan Sekarang ➔'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Peta Lokasi */}
      <section className="py-12 sm:py-16 bg-neo-surface">
        <div className="container">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="lbl lbl-lime text-[10px] px-2 py-0.5 inline-block mb-1">
                PETA KOORDINAT
              </span>
              <h2 className="font-serif font-bold text-2xl text-neo-ink">
                Lokasi Geografis SMAN 1 Klaten
              </h2>
            </div>
            <a
              href="https://maps.google.com/?q=SMA+Negeri+1+Klaten"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-xs"
            >
              Buka di Google Maps ↗
            </a>
          </div>

          <div className="border border-neo-ink shadow-neo-sm overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-neo-surface-2">
            <iframe
              title="Peta Lokasi SMA Negeri 1 Klaten"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.5134107147754!2d110.59897037594553!3d-7.712613576403912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a44136bc73901%3A0xc07ce9fa699131e5!2sSMA%20Negeri%201%20Klaten!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-neo-bg border border-neo-ink p-4">
              <span className="font-mono text-xs font-bold text-neo-ink uppercase block mb-1">Koordinat GPS</span>
              <p className="font-mono text-xs text-neo-ink-2">Lintang: -7.7126° S · Bujur: 110.5990° E</p>
            </div>
            <div className="bg-neo-bg border border-neo-ink p-4">
              <span className="font-mono text-xs font-bold text-neo-ink uppercase block mb-1">Kecamatan & Kode Pos</span>
              <p className="font-mono text-xs text-neo-ink-2">Kecamatan Klaten Selatan · 57423</p>
            </div>
            <div className="bg-neo-bg border border-neo-ink p-4">
              <span className="font-mono text-xs font-bold text-neo-ink uppercase block mb-1">Status Bangunan</span>
              <p className="font-mono text-xs text-neo-ink-2">Cagar Budaya Resmi Sejak 1957</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KontakPage;
