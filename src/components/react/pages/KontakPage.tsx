import { useState, type FC } from 'react';
import { PaperAirplaneDoodle, SparkleDoodle, CurvedDashedTrail } from '../DoodleDecorations';

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
    <div className="kontak-page-wrapper">
      {/* 1. Classic Contact Hero */}
      <section className="contact-hero sec sec-flush relative overflow-hidden">
        <div className="absolute top-6 right-8 doodle-float hidden sm:block">
          <PaperAirplaneDoodle flip={true} />
        </div>
        <div className="absolute bottom-4 right-20 doodle-float-delayed">
          <SparkleDoodle size={28} color="#FF2E93" />
        </div>
        <div className="container relative z-10">
          <p className="lbl">Sekretariat dan layanan informasi</p>
          <h1 className="page-title">Hubungi SMA Negeri 1 Klaten</h1>
          <p className="page-lead">
            Saluran komunikasi sekolah untuk pertanyaan akademik, layanan kesiswaan,
            kemitraan institusi, dan konsultasi pendaftaran peserta didik baru.
          </p>
        </div>
      </section>

      {/* 2. Aksi Cepat Kontak */}
      <section className="contact-body sec sec-flush">
        <div className="container">
          <div className="kontak-quick-actions">
            <a href="tel:+62272321150" className="qa-btn qa-btn--lime">
              <span className="qa-label">Telepon Sekretariat</span>
              <span className="qa-value num">(0272) 321150</span>
            </a>
            <a
              href="https://wa.me/6281234567890"
              className="qa-btn qa-btn--cyan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="qa-label">WhatsApp</span>
              <span className="qa-value num">Chat langsung TU</span>
            </a>
            <a href="mailto:info@sma1klaten.sch.id" className="qa-btn qa-btn--yellow">
              <span className="qa-label">Surel Resmi</span>
              <span className="qa-value">info@sma1klaten.sch.id</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Main Contact Grid */}
      <section className="contact-body sec sec-flush">
        <div className="container">
          <div className="grid-contact">
            {/* Kolom Kiri: Saluran Resmi Sekolah */}
            <div className="contact-info-card">
              <h2 className="card-heading">Saluran resmi sekolah</h2>

              <div className="info-group" style={{ borderTop: 'none', paddingTop: 0 }}>
                <span className="group-title">Alamat gedung utama</span>
                <p>Jalan Merbabu Nomor 13, Klaten Selatan, Kabupaten Klaten, Jawa Tengah 57423</p>
                <p className="text-xs text-neo-ink-3 font-mono mt-1">Kawasan Cagar Budaya & Adiwiyata Mandiri</p>
              </div>

              <div className="info-group">
                <span className="group-title">Telepon kantor & surat elektronik</span>
                <p className="num text-base font-bold">(0272) 321150</p>
                <p className="text-sm font-mono text-neo-ink-2 mt-1">info@sma1klaten.sch.id</p>
              </div>

              <div className="info-group">
                <span className="group-title">Portal layanan daring</span>
                <p>
                  <a className="inline-link" href="http://elearning.sma1klaten.sch.id/" target="_blank" rel="noopener noreferrer">
                    elearning.sma1klaten.sch.id ↗
                  </a>
                </p>
                <p>
                  <a className="inline-link" href="https://eperpus.sma1klaten.sch.id/" target="_blank" rel="noopener noreferrer">
                    eperpus.sma1klaten.sch.id ↗
                  </a>
                </p>
              </div>

              <div className="info-group">
                <span className="group-title">Jam pelayanan tata usaha</span>
                <p>Senin sampai Kamis: <strong>07.00 – 15.30 WIB</strong></p>
                <p>Jumat: <strong>07.00 – 14.00 WIB</strong></p>
                <p className="text-xs text-neo-ink-3 font-mono mt-1">Sabtu, Minggu & Hari Libur Nasional: Tutup</p>
              </div>

              <div className="info-group">
                <span className="group-title">Aksesibilitas transportasi</span>
                <p>• 1,2 km dari Stasiun Klaten (3 menit via angkutan kota jalur Merbabu)</p>
                <p>• 800 meter dari Alun-Alun Klaten (pusat pendidikan Klaten Selatan)</p>
              </div>
            </div>

            {/* Kolom Kanan: Form Pengaduan & Layanan */}
            <div className="contact-form-card">
              <h2 className="card-heading">Kirim pesan ke tata usaha</h2>

              {submittedTicket ? (
                <div className="bg-neo-bg border-2 border-neo-ink rounded-md p-6 text-center space-y-4 shadow-neo-sm">
                  <span className="lbl lbl-lime inline-block">PESAN TERKIRIM</span>
                  <h3 className="font-serif font-bold text-xl text-neo-ink">
                    Laporan Berhasil Diterima
                  </h3>
                  <p className="text-xs text-neo-ink-2 max-w-md mx-auto leading-relaxed">
                    Pesan Anda telah dicatat oleh sistem administrasi persuratan SMAN 1 Klaten.
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
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="input-name">Nama lengkap *</label>
                    <input
                      id="input-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nama lengkap pengirim"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label htmlFor="input-contact">Email / No. WhatsApp *</label>
                      <input
                        id="input-contact"
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="nama@email.com / 08..."
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="select-category">Keperluan layanan *</label>
                      <select
                        id="select-category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="ppdb">Informasi PPDB 2026</option>
                        <option value="akademik">Kurikulum & Peminatan Siswa</option>
                        <option value="legalisir">Legalisir Ijazah & Layanan Alumni</option>
                        <option value="sarpras">Pengaduan Sarana Prasarana</option>
                        <option value="kemitraan">Kemitraan & Studi Banding</option>
                        <option value="umum">Layanan Informasi Umum</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-subject">Subjek pesan</label>
                    <input
                      id="input-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Contoh: Permohonan Verifikasi Berkas PPDB"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-message">Isi pesan atau pertanyaan *</label>
                    <textarea
                      id="input-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan pertanyaan atau permohonan informasi secara lengkap..."
                    ></textarea>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-mono text-xs text-neo-ink-3">
                      Dicatat langsung oleh Tata Usaha SMAN 1 Klaten.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary text-xs w-full sm:w-auto"
                    >
                      {isSubmitting ? 'Memproses...' : 'Kirim Pesan Sekarang →'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Peta Lokasi */}
      <section className="contact-map-sec sec sec-flush" id="peta-lokasi">
        <div className="container">
          <div className="map-header">
            <div>
              <p className="lbl">Peta koordinat</p>
              <h2 className="section-heading mb-0">Lokasi geografis SMAN 1 Klaten</h2>
            </div>
            <a
              href="https://maps.google.com/?q=SMA+Negeri+1+Klaten"
              target="_blank"
              rel="noopener noreferrer"
              className="map-btn"
            >
              Buka di Google Maps ↗
            </a>
          </div>

          <div className="map-frame">
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

          <div className="map-meta-grid">
            <div className="map-meta-card">
              <span className="font-mono text-xs font-bold text-neo-ink uppercase block mb-1">Koordinat GPS</span>
              <p className="font-mono text-xs text-neo-ink-2">Lintang: -7.7126° S · Bujur: 110.5990° E</p>
            </div>
            <div className="map-meta-card">
              <span className="font-mono text-xs font-bold text-neo-ink uppercase block mb-1">Kecamatan & Kode Pos</span>
              <p className="font-mono text-xs text-neo-ink-2">Kecamatan Klaten Selatan · 57423</p>
            </div>
            <div className="map-meta-card">
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
