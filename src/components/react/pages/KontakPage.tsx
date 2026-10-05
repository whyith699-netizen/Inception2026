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

    // Simulasi pengiriman data layanan tata usaha
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
    }, 600);
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
      {/* Header Banner */}
      <section className="border-b-2 border-neo-ink bg-neo-surface py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="inline-block bg-neon-cyan text-neo-ink border-2 border-neo-ink px-3 py-1 font-mono font-bold text-xs uppercase tracking-wider shadow-neo-sm mb-4">
            Sekretariat & Layanan Publik
          </div>
          <h1 className="font-sans font-extrabold text-3xl md:text-5xl text-neo-ink leading-tight mb-4 tracking-tight">
            Hubungi SMAN 1 Klaten
          </h1>
          <p className="text-neo-ink-2 font-medium text-base md:text-lg max-w-3xl leading-relaxed">
            Saluran komunikasi resmi sekretariat tata usaha SMA Negeri 1 Klaten untuk layanan akademik,
            konsultasi PPDB 2026, legalisir ijazah alumni KAPASSKA, dan pengaduan sarana prasarana.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8">
            <div className="bg-neo-bg border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs text-neo-ink-3 uppercase block font-bold">Telepon Kantor</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink">(0272) 321150</span>
            </div>
            <div className="bg-neon-lime text-neo-ink border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs uppercase block font-bold text-neo-ink-3">Pelayanan Senin-Kamis</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink">07.00 - 15.30 WIB</span>
            </div>
            <div className="bg-neon-yellow text-neo-ink border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs uppercase block font-bold text-neo-ink-3">Pelayanan Jumat</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink">07.00 - 14.00 WIB</span>
            </div>
            <div className="bg-neo-bg border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs text-neo-ink-3 uppercase block font-bold">Lokasi Kampus</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink">Klaten Selatan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Kontak Info & Form Interaktif */}
      <section className="py-12 md:py-16 max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Kolom Kiri: Informasi Kantor & Layanan (5 Kolom) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neo-surface border-2 border-neo-ink shadow-neo p-6 md:p-7">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-neo-ink">
                <span className="w-3 h-3 bg-neon-magenta border border-neo-ink"></span>
                <h2 className="font-sans font-extrabold text-xl text-neo-ink">
                  Sekretariat Sekolah
                </h2>
              </div>

              <div className="space-y-5 text-sm">
                <div>
                  <span className="font-mono text-xs font-bold text-neo-ink-3 uppercase block mb-1">
                    Alamat Gedung Utama
                  </span>
                  <p className="font-semibold text-neo-ink leading-relaxed">
                    Jalan Merbabu Nomor 13, Klaten Selatan, Kabupaten Klaten, Jawa Tengah 57423
                  </p>
                  <p className="font-mono text-xs text-neo-ink-3 mt-1">
                    (Kawasan Cagar Budaya & Lingkungan Adiwiyata)
                  </p>
                </div>

                <div className="pt-4 border-t border-neo-ink/20">
                  <span className="font-mono text-xs font-bold text-neo-ink-3 uppercase block mb-1">
                    Saluran Telepon & Faksimile
                  </span>
                  <p className="font-mono font-bold text-base text-neo-ink">
                    Telepon: (0272) 321150
                  </p>
                  <p className="font-mono text-xs text-neo-ink-2 mt-0.5">
                    Faksimile: (0272) 321150
                  </p>
                </div>

                <div className="pt-4 border-t border-neo-ink/20">
                  <span className="font-mono text-xs font-bold text-neo-ink-3 uppercase block mb-1">
                    Pos Elektronik (Email)
                  </span>
                  <p className="font-mono text-sm text-neo-ink font-semibold">
                    info@sma1klaten.sch.id
                  </p>
                  <p className="font-mono text-xs text-neo-ink-2">
                    sman1klaten@yahoo.com
                  </p>
                </div>

                <div className="pt-4 border-t border-neo-ink/20">
                  <span className="font-mono text-xs font-bold text-neo-ink-3 uppercase block mb-1">
                    Portal Layanan Digital
                  </span>
                  <div className="space-y-1.5 font-mono text-xs font-bold">
                    <div>
                      <a
                        href="http://elearning.sma1klaten.sch.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-neo-ink hover:underline"
                      >
                        <span>elearning.sma1klaten.sch.id</span>
                        <span aria-hidden="true">&nearr;</span>
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://eperpus.sma1klaten.sch.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-neo-ink hover:underline"
                      >
                        <span>eperpus.sma1klaten.sch.id</span>
                        <span aria-hidden="true">&nearr;</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neo-ink/20">
                  <span className="font-mono text-xs font-bold text-neo-ink-3 uppercase block mb-1">
                    Jam Operasional Tata Usaha
                  </span>
                  <ul className="space-y-1 font-mono text-xs text-neo-ink-2">
                    <li className="flex justify-between">
                      <span>Senin &ndash; Kamis:</span>
                      <strong className="text-neo-ink">07.00 &ndash; 15.30 WIB</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Jumat:</span>
                      <strong className="text-neo-ink">07.00 &ndash; 14.00 WIB</strong>
                    </li>
                    <li className="flex justify-between text-neo-ink-3">
                      <span>Sabtu, Minggu & Libur:</span>
                      <strong>Tutup</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Petunjuk Akses Transportasi */}
            <div className="bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo p-5">
              <span className="font-mono text-xs font-bold uppercase block mb-2 tracking-wider">
                Aksesibilitas Kampus
              </span>
              <ul className="space-y-2 text-xs md:text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-bold">✦</span>
                  <span><strong>1,2 km dari Stasiun Klaten:</strong> Sekitar 3 menit menggunakan kendaraan bermotor atau angkutan kota jalur Merbabu.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">✦</span>
                  <span><strong>800 meter dari Alun-Alun Kota Klaten:</strong> Berada di kawasan pusat pendidikan dan perkantoran Klaten Selatan.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Kolom Kanan: Form Pengaduan & Layanan Interaktif (7 Kolom) */}
          <div className="lg:col-span-7">
            <div className="bg-neo-surface border-2 border-neo-ink shadow-neo p-6 md:p-8">
              <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-neo-ink">
                <div>
                  <span className="inline-block bg-neon-yellow text-neo-ink font-mono font-bold text-xs px-2.5 py-0.5 border border-neo-ink mb-1">
                    Formulir Daring Resmi
                  </span>
                  <h2 className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink">
                    Form Pengaduan & Layanan Tata Usaha
                  </h2>
                </div>
              </div>

              {submittedTicket ? (
                /* Sukses Pengiriman - Tiket Layanan */
                <div className="bg-neo-bg border-3 border-neo-ink p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-neon-lime text-neo-ink border-2 border-neo-ink mx-auto flex items-center justify-center font-mono font-extrabold text-2xl shadow-neo-sm">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-sans font-extrabold text-xl text-neo-ink mb-1">
                      Pesan Layanan Berhasil Diterima
                    </h3>
                    <p className="text-xs md:text-sm text-neo-ink-2 max-w-md mx-auto leading-relaxed">
                      Laporan atau permohonan informasi Anda telah dicatat oleh sistem administrasi persuratan SMAN 1 Klaten.
                    </p>
                  </div>

                  {/* Struk Bukti Tiket */}
                  <div className="bg-neo-surface border-2 border-dashed border-neo-ink p-4 max-w-md mx-auto text-left font-mono text-xs space-y-2">
                    <div className="flex justify-between border-b border-neo-ink/20 pb-2">
                      <span className="text-neo-ink-3">Nomor Tiket:</span>
                      <strong className="text-neo-ink">{submittedTicket.id}</strong>
                    </div>
                    <div className="flex justify-between border-b border-neo-ink/20 pb-2">
                      <span className="text-neo-ink-3">Nama Pemohon:</span>
                      <strong className="text-neo-ink">{submittedTicket.name}</strong>
                    </div>
                    <div className="flex justify-between border-b border-neo-ink/20 pb-2">
                      <span className="text-neo-ink-3">Kategori:</span>
                      <strong className="text-neo-ink">{categoryLabels[submittedTicket.category] || submittedTicket.category}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neo-ink-3">Waktu Pencatatan:</span>
                      <strong className="text-neo-ink">{submittedTicket.timestamp}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-neo-ink-3">
                    Untuk konfirmasi cepat atau keperluan mendesak, silakan hubungi telepon kantor di (0272) 321150 pada jam kerja.
                  </p>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-block font-mono font-bold text-xs uppercase px-5 py-2.5 bg-neon-cyan text-neo-ink border-2 border-neo-ink shadow-neo-sm hover:shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                  >
                    Kirim Pesan Lainnya &rarr;
                  </button>
                </div>
              ) : (
                /* Formulir Input */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="input-name" className="block font-mono text-xs font-bold text-neo-ink uppercase mb-1.5">
                      Nama Lengkap Pemohon / Orang Tua <span className="text-neon-magenta">*</span>
                    </label>
                    <input
                      id="input-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Contoh: Budi Santoso, S.Pd."
                      className="w-full bg-neo-bg border-2 border-neo-ink p-3 font-sans text-sm text-neo-ink placeholder:text-neo-ink-3 shadow-neo-sm focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="input-contact" className="block font-mono text-xs font-bold text-neo-ink uppercase mb-1.5">
                        Email atau Nomor WhatsApp <span className="text-neon-magenta">*</span>
                      </label>
                      <input
                        id="input-contact"
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="contoh@email.com / 08123456789"
                        className="w-full bg-neo-bg border-2 border-neo-ink p-3 font-sans text-sm text-neo-ink placeholder:text-neo-ink-3 shadow-neo-sm focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label htmlFor="select-category" className="block font-mono text-xs font-bold text-neo-ink uppercase mb-1.5">
                        Keperluan Layanan <span className="text-neon-magenta">*</span>
                      </label>
                      <select
                        id="select-category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-neo-bg border-2 border-neo-ink p-3 font-sans text-sm text-neo-ink shadow-neo-sm focus:outline-hidden"
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
                    <label htmlFor="input-subject" className="block font-mono text-xs font-bold text-neo-ink uppercase mb-1.5">
                      Subjek / Judul Pertanyaan
                    </label>
                    <input
                      id="input-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Contoh: Jadwal Verifikasi Berkas Jalur Zonasi PPDB"
                      className="w-full bg-neo-bg border-2 border-neo-ink p-3 font-sans text-sm text-neo-ink placeholder:text-neo-ink-3 shadow-neo-sm focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="input-message" className="block font-mono text-xs font-bold text-neo-ink uppercase mb-1.5">
                      Isi Pesan / Rincian Pengaduan <span className="text-neon-magenta">*</span>
                    </label>
                    <textarea
                      id="input-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan pertanyaan, masukan, permohonan informasi, atau rincian keperluan administrasi Anda secara jelas..."
                      className="w-full bg-neo-bg border-2 border-neo-ink p-3 font-sans text-sm text-neo-ink placeholder:text-neo-ink-3 shadow-neo-sm focus:outline-hidden resize-y"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-mono text-xs text-neo-ink-3">
                      Semua pesan dicatat secara resmi oleh Tata Usaha SMAN 1 Klaten.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto font-mono font-bold text-sm uppercase px-8 py-3.5 bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo hover:shadow-neo-lg hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {isSubmitting ? 'Memproses Pengiriman...' : 'Kirim Pesan Sekarang ➔'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Peta Lokasi Interaktif & Panduan Rute */}
      <section className="py-12 border-t-2 border-neo-ink bg-neo-surface">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="inline-block bg-neon-cyan text-neo-ink border-2 border-neo-ink px-3 py-1 font-mono font-bold text-xs uppercase tracking-wider shadow-neo-sm mb-2">
                Peta Koordinat Presisi
              </div>
              <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-neo-ink tracking-tight">
                Lokasi Geografis SMAN 1 Klaten
              </h2>
            </div>
            <a
              href="https://maps.google.com/?q=SMA+Negeri+1+Klaten"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-bold text-xs px-4 py-2 bg-neo-surface text-neo-ink border-2 border-neo-ink shadow-neo-sm hover:bg-neo-surface-2 transition-all inline-block"
            >
              Buka di Google Maps Langsung &nearr;
            </a>
          </div>

          {/* Frame Peta Brutalist */}
          <div className="border-3 border-neo-ink shadow-neo bg-neo-surface-2 overflow-hidden aspect-[16/9] md:aspect-[21/9]">
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
            <div className="bg-neo-bg border-2 border-neo-ink p-4">
              <span className="font-mono text-xs font-bold text-neo-ink uppercase block mb-1">Koordinat GPS</span>
              <p className="font-mono text-xs text-neo-ink-2">Lintang: -7.7126° S &middot; Bujur: 110.5990° E</p>
            </div>
            <div className="bg-neo-bg border-2 border-neo-ink p-4">
              <span className="font-mono text-xs font-bold text-neo-ink uppercase block mb-1">Kecamatan & Kode Pos</span>
              <p className="font-mono text-xs text-neo-ink-2">Kecamatan Klaten Selatan &middot; 57423</p>
            </div>
            <div className="bg-neo-bg border-2 border-neo-ink p-4">
              <span className="font-mono text-xs font-bold text-neo-ink uppercase block mb-1">Status Cagar Budaya</span>
              <p className="font-mono text-xs text-neo-ink-2">Bangunan Bersejarah Terdaftar Sejak 1957</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KontakPage;
