import React, { useState, useEffect } from 'react';

interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string[];
  image?: string;
  author?: string;
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'berita' | 'direktori' | 'prestasi'>('berita');

  // Berita states
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [showAddNews, setShowAddNews] = useState(false);
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Berita',
    date: new Date().toISOString().slice(0, 10),
    excerpt: '',
    body: '',
    image: '',
    author: 'Tim Humas SMAN 1 Klaten',
  });

  // Direktori states
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [personForm, setPersonForm] = useState({
    category: 'Dewan Guru MIPA & Sains',
    name: '',
    role: 'Guru',
    detail: 'Civitas Akademika SMA Negeri 1 Klaten',
    photo: '/images/school/logo.png',
  });

  // Prestasi states
  const [showAddAch, setShowAddAch] = useState(false);
  const [achForm, setAchForm] = useState({
    title: '',
    year: '2026',
    category: 'osn',
    categoryLabel: 'OSN & Sains',
    level: 'Nasional',
    medal: 'Medali Emas',
    desc: '',
    delegation: 'Tim Olimpiade Sains SMAN 1 Klaten',
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/auth');
      const data = await res.json();
      setAuthed(Boolean(data.authenticated));
      if (data.authenticated) {
        fetchArticles();
      }
    } catch {
      setAuthed(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pin }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAuthed(true);
        fetchArticles();
      } else {
        setErrorMsg(data.error || 'Akses ditolak');
      }
    } catch {
      setErrorMsg('Gagal terhubung ke server');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    });
    setAuthed(false);
    setPin('');
  };

  const fetchArticles = async () => {
    setLoadingArticles(true);
    try {
      const res = await fetch('/api/admin/berita');
      if (res.ok) {
        const d = await res.json();
        setArticles(d.data || []);
      }
    } finally {
      setLoadingArticles(false);
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Hapus warta: "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/berita?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
      } else {
        alert('Gagal menghapus artikel');
      }
    } catch {
      alert('Terjadi kesalahan jaringan');
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title.trim()) return;

    const payload = {
      ...newsForm,
      body: newsForm.body.split('\n\n').filter(Boolean),
    };

    try {
      const res = await fetch('/api/admin/berita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert('Artikel berhasil disimpan!');
        setShowAddNews(false);
        setNewsForm({
          title: '',
          category: 'Berita',
          date: new Date().toISOString().slice(0, 10),
          excerpt: '',
          body: '',
          image: '',
          author: 'Tim Humas SMAN 1 Klaten',
        });
        fetchArticles();
      } else {
        alert('Gagal menyimpan warta berita');
      }
    } catch {
      alert('Terjadi kesalahan server');
    }
  };

  const handleAddPerson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/direktori', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personForm),
      });
      if (res.ok) {
        alert('Data guru/staf berhasil ditambahkan!');
        setShowAddPerson(false);
        setPersonForm({
          category: 'Dewan Guru MIPA & Sains',
          name: '',
          role: 'Guru',
          detail: 'Civitas Akademika SMA Negeri 1 Klaten',
          photo: '/images/school/logo.png',
        });
      }
    } catch {
      alert('Gagal menambah personil');
    }
  };

  const handleAddAch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/prestasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(achForm),
      });
      if (res.ok) {
        alert('Prestasi baru berhasil dicatat!');
        setShowAddAch(false);
      }
    } catch {
      alert('Gagal mencatat prestasi');
    }
  };

  if (authed === null) {
    return (
      <div className="min-h-screen bg-neo-bg flex items-center justify-center p-4">
        <p className="font-mono text-sm">Memeriksa sesi otorisasi...</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-neo-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border-3 border-neo-ink rounded-lg shadow-neo-lg p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-neon-lime border border-neo-ink font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-neo-sm">
              SISTEM INTERNAL
            </span>
            <span className="font-mono text-xs text-neo-ink-3">SMAN 1 Klaten</span>
          </div>
          <h1 className="font-serif font-bold text-2xl text-neo-ink mb-2">Portal Sekretariat Sekolah</h1>
          <p className="text-xs text-neo-ink-2 mb-6 leading-relaxed">
            Akses dibatasi bagi administrator, pimpinan sekolah, dan staf pengelola sistem informasi resmi.
          </p>

          {errorMsg && (
            <div className="mb-4 p-3 bg-neon-magenta/20 border-2 border-neo-ink rounded text-xs font-mono font-bold text-neo-ink">
              ⚠ {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs font-bold text-neo-ink mb-1">
                Kunci Sandi / PIN Master:
              </label>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan shadow-neo-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-neon-lime border-2 border-neo-ink rounded font-mono font-bold text-neo-ink py-2.5 shadow-neo-sm hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer text-sm"
            >
              Masuk ke Dashboard →
            </button>
          </form>
          <div className="mt-6 pt-4 border-t border-neo-ink/20 text-center">
            <a href="/" className="font-mono text-xs text-neo-ink-3 hover:underline">
              ← Kembali ke Beranda Sekolah
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neo-bg text-neo-ink">
      {/* Top Bar Admin */}
      <header className="bg-white border-b-3 border-neo-ink px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 bg-neon-lime border-2 border-neo-ink rounded-full"></span>
          <div>
            <h1 className="font-serif font-bold text-base sm:text-lg leading-tight">Sekretariat Digital SMANSA</h1>
            <span className="font-mono text-[11px] text-neo-ink-3">Panel Manajemen Konten & Database VPS</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="font-mono text-xs border border-neo-ink px-2.5 py-1 rounded bg-neo-bg hover:bg-neon-cyan"
          >
            Lihat Web ↗
          </a>
          <button
            onClick={handleLogout}
            className="font-mono text-xs bg-neon-magenta text-neo-ink border border-neo-ink px-3 py-1 rounded shadow-neo-sm font-bold hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
          >
            Keluar Sesi
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b-2 border-neo-ink pb-3">
          <button
            onClick={() => setActiveTab('berita')}
            className={`font-mono text-xs font-bold px-4 py-2 rounded border-2 border-neo-ink shadow-neo-sm cursor-pointer ${
              activeTab === 'berita' ? 'bg-neon-lime' : 'bg-white hover:bg-neo-surface-2'
            }`}
          >
            📰 Kelola Warta ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab('direktori')}
            className={`font-mono text-xs font-bold px-4 py-2 rounded border-2 border-neo-ink shadow-neo-sm cursor-pointer ${
              activeTab === 'direktori' ? 'bg-neon-cyan' : 'bg-white hover:bg-neo-surface-2'
            }`}
          >
            👥 Guru & Staf
          </button>
          <button
            onClick={() => setActiveTab('prestasi')}
            className={`font-mono text-xs font-bold px-4 py-2 rounded border-2 border-neo-ink shadow-neo-sm cursor-pointer ${
              activeTab === 'prestasi' ? 'bg-neon-yellow' : 'bg-white hover:bg-neo-surface-2'
            }`}
          >
            🏆 Rekam Prestasi
          </button>
        </div>

        {/* TAB 1: BERITA */}
        {activeTab === 'berita' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-serif font-bold text-2xl">Arsip Warta & Pengumuman</h2>
                <p className="font-mono text-xs text-neo-ink-2">Total {articles.length} warta resmi tersimpan dalam sistem.</p>
              </div>
              <button
                onClick={() => setShowAddNews(!showAddNews)}
                className="bg-neon-lime border-2 border-neo-ink font-mono text-xs font-bold px-4 py-2 rounded shadow-neo-sm hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
              >
                {showAddNews ? '✕ Tutup Form' : '+ Tambah Warta Baru'}
              </button>
            </div>

            {/* Form Tambah Berita */}
            {showAddNews && (
              <div className="bg-white border-3 border-neo-ink rounded-lg shadow-neo-lg p-6 mb-8">
                <h3 className="font-serif font-bold text-xl mb-4">Tulis Berita Baru</h3>
                <form onSubmit={handleCreateArticle} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block font-mono text-xs font-bold mb-1">Judul Berita:</label>
                      <input
                        type="text"
                        required
                        value={newsForm.title}
                        onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                        placeholder="Contoh: Tim Debat SMAN 1 Klaten Raih Juara 1..."
                        className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-1.5 text-sm font-sans"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold mb-1">Kategori:</label>
                      <select
                        value={newsForm.category}
                        onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                        className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-1.5 text-sm font-mono"
                      >
                        <option value="Berita">Berita</option>
                        <option value="Pengumuman">Pengumuman</option>
                        <option value="Prestasi">Prestasi</option>
                        <option value="Kegiatan">Kegiatan</option>
                        <option value="Informasi">Informasi</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs font-bold mb-1">Tanggal Rilis:</label>
                      <input
                        type="date"
                        value={newsForm.date}
                        onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                        className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-1.5 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold mb-1">Path/URL Gambar Sampul (Opsional):</label>
                      <input
                        type="text"
                        value={newsForm.image}
                        onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
                        placeholder="Contoh: /images/berita/sample.jpg (atau kosongkan)"
                        className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-1.5 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold mb-1">Isi Berita (Pisahkan paragraf dengan 2 enter):</label>
                    <textarea
                      rows={5}
                      required
                      value={newsForm.body}
                      onChange={(e) => setNewsForm({ ...newsForm, body: e.target.value })}
                      placeholder="Tuliskan naskah berita lengkap di sini..."
                      className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-2 text-sm font-sans"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddNews(false)}
                      className="px-4 py-2 border border-neo-ink rounded font-mono text-xs"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-neon-lime border-2 border-neo-ink rounded font-mono text-xs font-bold shadow-neo-sm hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
                    >
                      Publikasikan Warta →
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List Berita */}
            {loadingArticles ? (
              <p className="font-mono text-sm py-8 text-center">Memuat daftar berita...</p>
            ) : (
              <div className="space-y-3">
                {articles.slice(0, 30).map((art) => (
                  <div
                    key={art.id}
                    className="bg-white border-2 border-neo-ink rounded p-4 flex flex-wrap items-center justify-between gap-4 shadow-neo-sm hover:bg-neo-surface-2 transition-colors"
                  >
                    <div className="flex-1 min-w-[280px]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] font-bold bg-neon-cyan border border-neo-ink px-2 py-0.5 rounded">
                          {art.category}
                        </span>
                        <span className="font-mono text-[11px] text-neo-ink-3">{art.date}</span>
                        {!art.image && (
                          <span className="font-mono text-[10px] bg-neo-surface-2 border border-neo-ink px-1.5 rounded">
                            Teks saja
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-sm sm:text-base leading-snug">{art.title}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/berita/${art.id}`}
                        target="_blank"
                        className="font-mono text-xs border border-neo-ink px-2.5 py-1 rounded bg-neo-bg hover:bg-neon-lime"
                      >
                        Pratinjau
                      </a>
                      <button
                        onClick={() => handleDeleteArticle(art.id, art.title)}
                        className="font-mono text-xs bg-neon-magenta text-neo-ink border border-neo-ink px-2.5 py-1 rounded hover:bg-red-500 hover:text-white cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
                {articles.length > 30 && (
                  <p className="font-mono text-xs text-center text-neo-ink-3 pt-4">
                    Menampilkan 30 warta teratas dari total {articles.length} artikel.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DIREKTORI */}
        {activeTab === 'direktori' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-serif font-bold text-2xl">Manajemen Guru & Tenaga Kependidikan</h2>
                <p className="font-mono text-xs text-neo-ink-2">Perbarui personil pengajar SMAN 1 Klaten.</p>
              </div>
              <button
                onClick={() => setShowAddPerson(!showAddPerson)}
                className="bg-neon-cyan border-2 border-neo-ink font-mono text-xs font-bold px-4 py-2 rounded shadow-neo-sm hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
              >
                {showAddPerson ? '✕ Tutup Form' : '+ Tambah Guru/Staf'}
              </button>
            </div>

            {showAddPerson && (
              <div className="bg-white border-3 border-neo-ink rounded-lg shadow-neo-lg p-6 mb-8">
                <h3 className="font-serif font-bold text-xl mb-4">Tambah Personil Baru</h3>
                <form onSubmit={handleAddPerson} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs font-bold mb-1">Nama Lengkap & Gelar:</label>
                      <input
                        type="text"
                        required
                        value={personForm.name}
                        onChange={(e) => setPersonForm({ ...personForm, name: e.target.value })}
                        placeholder="Contoh: Drs. Bambang Sutopo, M.Pd."
                        className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-1.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold mb-1">Kelompok/Kategori:</label>
                      <select
                        value={personForm.category}
                        onChange={(e) => setPersonForm({ ...personForm, category: e.target.value })}
                        className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-1.5 text-sm font-mono"
                      >
                        <option value="Pimpinan Sekolah & Komite">Pimpinan Sekolah & Komite</option>
                        <option value="Dewan Guru MIPA & Sains">Dewan Guru MIPA & Sains</option>
                        <option value="Dewan Guru Sosial & Humaniora">Dewan Guru Sosial & Humaniora</option>
                        <option value="Dewan Guru Bahasa & Seni">Dewan Guru Bahasa & Seni</option>
                        <option value="Tenaga Kependidikan & Tata Usaha">Tenaga Kependidikan & Tata Usaha</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs font-bold mb-1">Peran / Jabatan:</label>
                      <input
                        type="text"
                        required
                        value={personForm.role}
                        onChange={(e) => setPersonForm({ ...personForm, role: e.target.value })}
                        placeholder="Guru / Kepala Sekolah / Staff"
                        className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-1.5 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold mb-1">Detail Pangkat/Tugas:</label>
                      <input
                        type="text"
                        value={personForm.detail}
                        onChange={(e) => setPersonForm({ ...personForm, detail: e.target.value })}
                        placeholder="Pangkat/Golongan: Pembina..."
                        className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-1.5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddPerson(false)}
                      className="px-4 py-2 border border-neo-ink rounded font-mono text-xs"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-neon-cyan border-2 border-neo-ink rounded font-mono text-xs font-bold shadow-neo-sm hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
                    >
                      Simpan Personil →
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="p-6 bg-white border-2 border-neo-ink rounded shadow-neo-sm">
              <p className="font-mono text-xs text-neo-ink-2">
                Basis data direktori memuat 78 personil resmi guru & tata usaha. Penambahan baru langsung diintegrasikan ke berkas <code>staff.json</code>.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: PRESTASI */}
        {activeTab === 'prestasi' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-serif font-bold text-2xl">Pencatatan Kejuaraan & Prestasi</h2>
                <p className="font-mono text-xs text-neo-ink-2">Arsip prestasi olimpiade sains, olahraga, seni, dan riset.</p>
              </div>
              <button
                onClick={() => setShowAddAch(!showAddAch)}
                className="bg-neon-yellow border-2 border-neo-ink font-mono text-xs font-bold px-4 py-2 rounded shadow-neo-sm hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
              >
                {showAddAch ? '✕ Tutup Form' : '+ Catat Prestasi Baru'}
              </button>
            </div>

            {showAddAch && (
              <div className="bg-white border-3 border-neo-ink rounded-lg shadow-neo-lg p-6 mb-8">
                <h3 className="font-serif font-bold text-xl mb-4">Catat Prestasi Baru</h3>
                <form onSubmit={handleAddAch} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block font-mono text-xs font-bold mb-1">Judul Kejuaraan:</label>
                      <input
                        type="text"
                        required
                        value={achForm.title}
                        onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                        placeholder="Contoh: Medali Emas OSN Astronomi Tingkat Nasional..."
                        className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-1.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold mb-1">Tahun:</label>
                      <input
                        type="text"
                        required
                        value={achForm.year}
                        onChange={(e) => setAchForm({ ...achForm, year: e.target.value })}
                        className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-1.5 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-mono text-xs font-bold mb-1">Tingkat:</label>
                      <select
                        value={achForm.level}
                        onChange={(e) => setAchForm({ ...achForm, level: e.target.value })}
                        className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-1.5 text-sm font-mono"
                      >
                        <option value="Internasional">Internasional</option>
                        <option value="Nasional">Nasional</option>
                        <option value="Provinsi">Provinsi</option>
                        <option value="Kabupaten">Kabupaten</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold mb-1">Medali / Juara:</label>
                      <input
                        type="text"
                        required
                        value={achForm.medal}
                        onChange={(e) => setAchForm({ ...achForm, medal: e.target.value })}
                        placeholder="Medali Emas / Juara 1"
                        className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-1.5 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold mb-1">Delegasi/Klub:</label>
                      <input
                        type="text"
                        required
                        value={achForm.delegation}
                        onChange={(e) => setAchForm({ ...achForm, delegation: e.target.value })}
                        placeholder="Tim OSN / Smansa Eagles"
                        className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-1.5 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold mb-1">Deskripsi Singkat:</label>
                    <textarea
                      rows={3}
                      required
                      value={achForm.desc}
                      onChange={(e) => setAchForm({ ...achForm, desc: e.target.value })}
                      placeholder="Uraian ringkas pencapaian prestasi..."
                      className="w-full bg-neo-bg border-2 border-neo-ink rounded px-3 py-2 text-sm font-sans"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddAch(false)}
                      className="px-4 py-2 border border-neo-ink rounded font-mono text-xs"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-neon-yellow border-2 border-neo-ink rounded font-mono text-xs font-bold shadow-neo-sm hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
                    >
                      Simpan Prestasi →
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="p-6 bg-white border-2 border-neo-ink rounded shadow-neo-sm">
              <p className="font-mono text-xs text-neo-ink-2">
                Prestasi yang ditambahkan akan otomatis tersimpan dalam berkas data prestasi dan diperbarui di arsip publik.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
