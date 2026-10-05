import { useState, useMemo, type FC } from 'react';
import Metrics from '../Metrics';
import AlumniSection from '../AlumniSection';
import alumniJson from '../../../content/alumni/tokoh.json';

interface Achievement {
  id: string;
  year: string;
  title: string;
  category: 'osn' | 'fls2n' | 'o2sn' | 'lktin' | 'adiwiyata';
  categoryLabel: string;
  level: 'Internasional' | 'Nasional' | 'Provinsi' | 'Kabupaten';
  medal: string;
  desc: string;
  delegation: string;
}

const achievementList: Achievement[] = [
  {
    id: 'lkti-pancasila-2026',
    year: '2026',
    title: 'Juara 1 Lomba Karya Tulis Ilmiah Festival Pelajar Pancasila',
    category: 'lktin',
    categoryLabel: 'LKTIN & Riset',
    level: 'Nasional',
    medal: 'Juara 1 Emas',
    desc: 'Riset inovasi sosial dan teknologi tepat guna siswa SMAN 1 Klaten pada ajang bergengsi kepemudaan nasional.',
    delegation: 'Tim Riset Padmawijaya (KIR)'
  },
  {
    id: 'osn-fisika-astro-2026',
    year: '2026',
    title: 'Lolos Seleksi Pelatnas Tahap 1 OSN Fisika & Astronomi',
    category: 'osn',
    categoryLabel: 'OSN & Sains',
    level: 'Nasional',
    medal: 'Finalis Pelatnas',
    desc: 'Lolos seleksi ketat olimpiade sains nasional melalui pendampingan intensif laboratorium fisika SMAN 1 Klaten.',
    delegation: 'Tim Olimpiade Sains SMANSA'
  },
  {
    id: 'osn-fisika-2025',
    year: '2025',
    title: 'Medali Perak OSN Fisika Tingkat Provinsi Jawa Tengah',
    category: 'osn',
    categoryLabel: 'OSN & Sains',
    level: 'Provinsi',
    medal: 'Medali Perak',
    desc: 'Diraih setelah seleksi ketat pembinaan intensif laboratorium sains fisika SMAN 1 Klaten.',
    delegation: 'Delegasi Olimpiade Fisika'
  },
  {
    id: 'o2sn-futsal-2025',
    year: '2025',
    title: 'Juara Umum O2SN Futsal Putra Kabupaten Klaten',
    category: 'o2sn',
    categoryLabel: 'O2SN & Olahraga',
    level: 'Kabupaten',
    medal: 'Juara Umum',
    desc: 'Tim futsal putra sekolah mempertahankan tradisi gelar juara antarpelajar se-Kabupaten Klaten.',
    delegation: 'Tim Futsal Padmawijaya'
  },
  {
    id: 'fls2n-vokal-poster-2025',
    year: '2025',
    title: 'Juara 1 FLS2N Solo Vokal Putri & Juara 2 Desain Poster',
    category: 'fls2n',
    categoryLabel: 'FLS2N & Seni',
    level: 'Kabupaten',
    medal: 'Juara 1 & 2',
    desc: 'Harmonisasi teknik vokal binaan paduan suara Sakla Voice dan kreativitas visual sketsa desain grafis DACO.',
    delegation: 'Sakla Voice & DACO'
  },
  {
    id: 'lkti-undip-2025',
    year: '2025',
    title: 'Juara 1 LKTI Biologi Terapan Tingkat Nasional Universitas Diponegoro',
    category: 'lktin',
    categoryLabel: 'LKTIN & Riset',
    level: 'Nasional',
    medal: 'Juara 1 Emas',
    desc: 'Karya ilmiah bioteknologi pemanfaatan limbah pertanian lokal Klaten menjadi substrat energi terbarukan.',
    delegation: 'Kelompok Ilmiah Remaja (KIR)'
  },
  {
    id: 'osn-kebumian-2024',
    year: '2024',
    title: 'Medali Perunggu OSN Bidang Kebumian & Pemrograman Komputer',
    category: 'osn',
    categoryLabel: 'OSN & Sains',
    level: 'Nasional',
    medal: 'Medali Perunggu',
    desc: 'Prestasi olimpiade sains bidang geologi spasial dan komputasi algoritma binaan laboratorium komputer SMANSA.',
    delegation: 'Klub SECURE & OSN Geosains'
  },
  {
    id: 'debat-ldbi-2024',
    year: '2024',
    title: 'Juara 2 Lomba Debat Bahasa Indonesia (LDBI) Provinsi Jawa Tengah',
    category: 'lktin',
    categoryLabel: 'LKTIN & Riset',
    level: 'Provinsi',
    medal: 'Juara 2 Perak',
    desc: 'Kemahiran argumentasi nalar kritis tata negara dan dialektika isu publik siswa perwakilan English Club & Debat.',
    delegation: 'Tim Debat SMAN 1 Klaten'
  },
  {
    id: 'o2sn-basket-2024',
    year: '2024',
    title: 'Juara 1 O2SN Bola Basket Putra Tingkat Kabupaten Klaten',
    category: 'o2sn',
    categoryLabel: 'O2SN & Olahraga',
    level: 'Kabupaten',
    medal: 'Juara 1 Emas',
    desc: 'Skuad basket Smansa Eagles tampil tak terkalahkan hingga babak final kejuaraan pelajar daerah Klaten.',
    delegation: 'Smansa Eagles Basketball'
  },
  {
    id: 'fls2n-kriya-tari-2023',
    year: '2023',
    title: 'Juara Harapan 1 FLS2N Seni Kriya & Tari Tradisional Jawa Tengah',
    category: 'fls2n',
    categoryLabel: 'FLS2N & Seni',
    level: 'Provinsi',
    medal: 'Juara Harapan 1',
    desc: 'Koreografi tari nusantara dan kreasi kriya kearifan lokal hasil pembinaan Sanggar Karawitan SMANSA.',
    delegation: 'Sanggar Karawitan & Sparkle'
  },
  {
    id: 'adiwiyata-mandiri-2016',
    year: '2016',
    title: 'Penghargaan Sekolah Adiwiyata Nasional Mandiri',
    category: 'adiwiyata',
    categoryLabel: 'Adiwiyata & Lingkungan',
    level: 'Nasional',
    medal: 'Penghargaan Tertinggi',
    desc: 'Apresiasi tertinggi Kementerian LHK dan Kemendikbud atas komitmen pelestarian lingkungan kampus 15.619 m².',
    delegation: 'Komunitas Civitas Hijau & EMAPAL'
  },
  {
    id: 'lkti-kedokteran-2013',
    year: '2013',
    title: 'Juara 1 LKTI Kedokteran Nasional FK Universitas Udayana',
    category: 'lktin',
    categoryLabel: 'LKTIN & Riset',
    level: 'Nasional',
    medal: 'Juara 1 Emas',
    desc: 'Karya ilmiah bidang biomedis siswa SMAN 1 Klaten bersaing dengan perwakilan sekolah rujukan nasional.',
    delegation: 'Kelompok Ilmiah Remaja (KIR)'
  },
  {
    id: 'ioa-astronomi-2004',
    year: '2004',
    title: 'Medali Emas Olimpiade Astronomi Internasional (IOA) di Simeiz Crimea',
    category: 'osn',
    categoryLabel: 'OSN & Sains',
    level: 'Internasional',
    medal: 'Medali Emas Dunia',
    desc: 'Pencapaian legendaris emas dunia di Simeiz Crimea, dilengkapi raihan 2 Medali Emas & 1 Perunggu di OSN Nasional.',
    delegation: 'Praditya Putra & Tim Astronomi SMANSA'
  }
];

export const PrestasiPage: FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const years = ['all', '2026', '2025', '2024', '2023', '2016', '2013', '2004'];
  const categories = [
    { key: 'all', label: 'Semua Bidang' },
    { key: 'osn', label: 'OSN & Sains' },
    { key: 'fls2n', label: 'FLS2N & Seni' },
    { key: 'o2sn', label: 'O2SN & Olahraga' },
    { key: 'lktin', label: 'LKTIN & Riset' },
    { key: 'adiwiyata', label: 'Adiwiyata' }
  ];
  const levels = ['all', 'Internasional', 'Nasional', 'Provinsi', 'Kabupaten'];

  const filteredAchievements = useMemo(() => {
    return achievementList.filter((item) => {
      const matchYear = selectedYear === 'all' || item.year === selectedYear;
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchLevel = selectedLevel === 'all' || item.level === selectedLevel;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.delegation.toLowerCase().includes(q) ||
        item.medal.toLowerCase().includes(q);

      return matchYear && matchCategory && matchLevel && matchSearch;
    });
  }, [selectedYear, selectedCategory, selectedLevel, searchQuery]);

  return (
    <div className="prestasi-page-wrapper">
      {/* 1. Original Prestasi Hero */}
      <section className="prestasi-hero sec sec-flush">
        <div className="container">
          <p className="lbl">Rekam jejak kejuaraan</p>
          <h1 className="page-title">Tradisi prestasi nalar, raga, dan estetika</h1>
          <p className="page-lead">
            Civitas akademika Padmawijaya terus menjaga tradisi kejuaraan sejak 1957,
            mulai dari medali olimpiade sains dunia hingga pembinaan karakter berbasis
            sekolah Adiwiyata Mandiri.
          </p>
        </div>
      </section>

      {/* 2. Official Metrics */}
      <Metrics />

      {/* 3. Achievements Section */}
      <section className="achievements-section sec sec-flush">
        <div className="container">
          <div className="prestasi-search-header">
            <div>
              <h2 className="section-heading mb-1">Arsip kejuaraan terverifikasi</h2>
              <p className="text-xs sm:text-sm text-neo-ink-2 font-mono">
                Menampilkan <strong>{filteredAchievements.length}</strong> catatan prestasi resmi
              </p>
            </div>

            <div className="w-full md:w-72">
              <input
                id="search-achievement"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari olimpiade, seni, riset..."
                className="prestasi-input"
              />
            </div>
          </div>

          {/* Interactive Filters */}
          <div className="prestasi-controls">
            <div className="prestasi-filter-row">
              <span className="prestasi-filter-label">Bidang:</span>
              <div className="flex flex-wrap items-center gap-1.5 flex-1">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setSelectedCategory(c.key)}
                    className={`prestasi-filter-btn ${selectedCategory === c.key ? 'active' : ''}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="prestasi-filter-row">
              <span className="prestasi-filter-label">Tingkat:</span>
              <div className="flex flex-wrap items-center gap-1.5 flex-1">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`prestasi-filter-btn ${selectedLevel === lvl ? 'active' : ''}`}
                  >
                    {lvl === 'all' ? 'Semua' : lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="prestasi-filter-row">
              <span className="prestasi-filter-label">Tahun:</span>
              <div className="flex flex-wrap items-center gap-1.5 flex-1">
                {years.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setSelectedYear(y)}
                    className={`prestasi-filter-btn ${selectedYear === y ? 'active' : ''}`}
                  >
                    {y === 'all' ? 'Semua' : y}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hairline Grid of Achievements */}
          {filteredAchievements.length === 0 ? (
            <div className="bg-neo-surface border-2 border-neo-ink rounded-md p-10 text-center max-w-lg mx-auto shadow-neo">
              <h3 className="font-serif font-bold text-lg text-neo-ink mb-2">
                Tidak ada data prestasi yang cocok
              </h3>
              <p className="text-xs text-neo-ink-2 mb-4">
                Silakan sesuaikan kata kunci pencarian atau ubah filter bidang dan tingkat.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedYear('all');
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                  setSearchQuery('');
                }}
                className="btn btn-secondary text-xs"
              >
                Reset Semua Filter ×
              </button>
            </div>
          ) : (
            <div className="achievements-grid">
              {filteredAchievements.map((a) => (
                <article className="achievement-card" key={a.id}>
                  <div className="card-meta">
                    <span className="year-badge num">{a.year}</span>
                    <span className="level-badge">{a.level}</span>
                    <span className="font-mono text-[10px] uppercase font-bold text-neo-ink bg-neo-bg px-2 py-0.5 border border-neo-ink/30 ml-auto">
                      {a.categoryLabel}
                    </span>
                  </div>
                  <h3 className="ach-title">{a.title}</h3>
                  <p className="ach-desc">{a.desc}</p>
                  <div className="mt-4 pt-3 border-t border-neo-ink/10 flex items-center justify-between font-mono text-xs text-neo-ink-3">
                    <span><strong>Delegasi:</strong> {a.delegation}</span>
                    <span className="font-bold text-neo-ink bg-neon-lime/20 px-1.5 py-0.5 border border-neo-ink/20">
                      {a.medal}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Alumni Section */}
      <AlumniSection items={alumniJson.items} />
    </div>
  );
};

export default PrestasiPage;
