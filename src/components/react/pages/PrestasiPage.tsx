import { useState, useMemo, type FC } from 'react';
import NeoFilterBar from '../NeoFilterBar';
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

  const countBy = (predicate: (item: Achievement) => boolean) =>
    achievementList.filter(predicate).length;

  const resetFilters = () => {
    setSelectedYear('all');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSearchQuery('');
  };

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
          <p className="flex flex-wrap gap-2 mt-4">
            <span className="inline-block bg-neon-lime border-2 border-neo-ink rounded font-mono text-[11px] font-bold text-neo-ink px-2.5 py-1 shadow-neo-sm">
              {achievementList.length} Rekam Prestasi
            </span>
            <span className="inline-block bg-neon-cyan border-2 border-neo-ink rounded font-mono text-[11px] font-bold text-neo-ink px-2.5 py-1 shadow-neo-sm">
              Sejak 2004 Hingga 2026
            </span>
          </p>
        </div>
      </section>

      {/* 2. Official Metrics */}
      <Metrics />

      {/* 3. Achievements Section */}
      <section className="achievements-section sec sec-flush">
        <div className="container">
          {/* Ringkasan jumlah kejuaraan per tingkat */}
          <div className="prestasi-summary-row">
            <span className="prestasi-filter-label">Ringkasan:</span>
            {levels.map((lvl) => (
              <span className="prestasi-summary-chip" key={lvl}>
                <strong>{lvl === 'all' ? 'Semua' : lvl}</strong>
                <span className="num">
                  {lvl === 'all'
                    ? achievementList.length
                    : countBy((item) => item.level === lvl)}
                </span>
              </span>
            ))}
          </div>

          <div className="prestasi-search-header">
            <div>
              <h2 className="section-heading mb-1">Arsip kejuaraan terverifikasi</h2>
              <p className="text-xs sm:text-sm text-neo-ink-2 font-mono">
                Menampilkan <strong>{filteredAchievements.length}</strong> catatan prestasi resmi
              </p>
            </div>
          </div>

          {/* Sub-nav: pencarian dan filter */}
          <NeoFilterBar
            search={searchQuery}
            onSearch={setSearchQuery}
            searchLabel="Cari prestasi"
            placeholder="Cari olimpiade, seni, riset..."
            groups={[
              {
                key: 'bidang',
                label: 'Bidang',
                options: categories.map((c) => ({
                  value: c.key,
                  label: c.label,
                  count: c.key === 'all' ? achievementList.length : countBy((item) => item.category === c.key),
                })),
              },
              {
                key: 'tingkat',
                label: 'Tingkat',
                options: levels.map((lvl) => ({
                  value: lvl,
                  label: lvl === 'all' ? 'Semua' : lvl,
                  count: lvl === 'all' ? achievementList.length : countBy((item) => item.level === lvl),
                })),
              },
              {
                key: 'tahun',
                label: 'Tahun',
                options: years.map((y) => ({
                  value: y,
                  label: y === 'all' ? 'Semua' : y,
                  count: y === 'all' ? achievementList.length : countBy((item) => item.year === y),
                })),
              },
            ]}
            values={{ bidang: selectedCategory, tingkat: selectedLevel, tahun: selectedYear }}
            onFilter={(key, value) => {
              if (key === 'bidang') setSelectedCategory(value);
              else if (key === 'tingkat') setSelectedLevel(value);
              else setSelectedYear(value);
            }}
            resultCount={filteredAchievements.length}
            totalCount={achievementList.length}
            noun="catatan prestasi"
            onReset={resetFilters}
          />

          {/* Grid of Achievements */}
          {filteredAchievements.length === 0 ? (
            <div className="nb-empty">
              <span className="nb-tag nb-tag--magenta">Tidak ditemukan</span>
              <h3 className="font-serif text-xl font-bold text-neo-ink mt-3 mb-2">
                Tidak ada data prestasi yang cocok
              </h3>
              <p className="text-sm text-neo-ink-2 mb-5">
                Silakan sesuaikan kata kunci pencarian atau ubah filter bidang dan tingkat.
              </p>
              <button type="button" className="nb-reset" onClick={resetFilters}>
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="achievements-grid">
              {filteredAchievements.map((a) => (
                <article className="achievement-card" key={a.id}>
                  <div className="card-meta">
                    <span className="year-badge num">{a.year}</span>
                    <span className={`level-badge level-${a.level.toLowerCase()} nb-sticker`}>{a.level}</span>
                  </div>
                  <h3 className="ach-title">{a.title}</h3>
                  <p className="ach-desc">{a.desc}</p>
                  <div className="ach-foot">
                    <span><strong>Delegasi:</strong> {a.delegation}</span>
                    <span className="ach-medal nb-sticker">{a.medal}</span>
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
