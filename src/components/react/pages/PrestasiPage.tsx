import { useState, useMemo, type FC } from 'react';

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
    medal: 'Finalis Nasional',
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
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('timeline');

  const years = ['all', '2026', '2025', '2024', '2023', '2016', '2013', '2004'];
  const categories = [
    { key: 'all', label: 'Semua Bidang' },
    { key: 'osn', label: 'OSN & Sains' },
    { key: 'fls2n', label: 'FLS2N & Seni' },
    { key: 'o2sn', label: 'O2SN & Olahraga' },
    { key: 'lktin', label: 'LKTIN & Riset' },
    { key: 'adiwiyata', label: 'Adiwiyata & Lingkungan' }
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
        item.title.toLowerCase().indexOf(q) !== -1 ||
        item.desc.toLowerCase().indexOf(q) !== -1 ||
        item.delegation.toLowerCase().indexOf(q) !== -1 ||
        item.medal.toLowerCase().indexOf(q) !== -1;

      return matchYear && matchCategory && matchLevel && matchSearch;
    });
  }, [selectedYear, selectedCategory, selectedLevel, searchQuery]);

  return (
    <div className="bg-neo-bg text-neo-ink">
      {/* 1. Page Header (Editorial) */}
      <section className="py-12 sm:py-16 border-b border-neo-ink bg-neo-bg">
        <div className="container">
          <span className="lbl lbl-lime mb-3 inline-block">REKAM JEJAK PRESTASI</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neo-ink mb-4 max-w-3xl leading-[1.15]">
            Prestasi Siswa SMAN 1 Klaten
          </h1>
          <p className="text-neo-ink-2 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            Tradisi panjang nalar ilmiah, kejujuran sportivitas, dan kreasi estetika civitas akademika Padmawijaya, dari kejuaraan dunia hingga Adiwiyata Mandiri.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl pt-8 mt-8 border-t border-neo-ink">
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">Dunia</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Emas IOA Crimea</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">45+</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Juara Nasional</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">80+</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Gelar Daerah</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neo-ink block">Mandiri</span>
              <span className="font-mono text-xs text-neo-ink-3 uppercase">Status Adiwiyata</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Control Panel */}
      <section className="py-8 bg-neo-surface border-b border-neo-ink">
        <div className="container">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <input
                id="search-achievement"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kejuaraan, OSN, futsal, riset..."
                className="w-full bg-neo-bg border border-neo-ink px-3 py-2 text-sm text-neo-ink placeholder:text-neo-ink-3 focus:outline-none focus:ring-1 focus:ring-neo-ink font-sans"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neo-ink-3 mr-2">Tampilan:</span>
              <button
                type="button"
                onClick={() => setViewMode('timeline')}
                className={`font-mono text-xs px-3 py-1.5 border border-neo-ink transition-all cursor-pointer ${
                  viewMode === 'timeline'
                    ? 'bg-neon-lime text-neo-ink font-bold shadow-neo-sm'
                    : 'bg-neo-bg text-neo-ink-2 hover:bg-neo-surface-2'
                }`}
              >
                Linimasa
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`font-mono text-xs px-3 py-1.5 border border-neo-ink transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-neon-lime text-neo-ink font-bold shadow-neo-sm'
                    : 'bg-neo-bg text-neo-ink-2 hover:bg-neo-surface-2'
                }`}
              >
                Tabel Data
              </button>
            </div>
          </div>

          {/* Filter Rows */}
          <div className="space-y-3 pt-4 border-t border-neo-ink/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-neo-ink-3 uppercase mr-1">Bidang:</span>
              {categories.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setSelectedCategory(c.key)}
                  className={`font-mono text-xs px-2.5 py-1 border border-neo-ink transition-all cursor-pointer ${
                    selectedCategory === c.key
                      ? 'bg-neon-lime text-neo-ink font-bold shadow-neo-sm'
                      : 'bg-neo-bg text-neo-ink-2 hover:bg-neo-surface-2'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-xs text-neo-ink-3 uppercase mr-1">Tahun:</span>
                {years.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setSelectedYear(y)}
                    className={`font-mono text-xs px-2 py-0.5 border border-neo-ink transition-all cursor-pointer ${
                      selectedYear === y
                        ? 'bg-neon-lime text-neo-ink font-bold shadow-neo-sm'
                        : 'bg-neo-bg text-neo-ink-2 hover:bg-neo-surface-2'
                    }`}
                  >
                    {y === 'all' ? 'Semua' : y}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-xs text-neo-ink-3 uppercase mr-1">Tingkat:</span>
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`font-mono text-xs px-2 py-0.5 border border-neo-ink transition-all cursor-pointer ${
                      selectedLevel === lvl
                        ? 'bg-neon-lime text-neo-ink font-bold shadow-neo-sm'
                        : 'bg-neo-bg text-neo-ink-2 hover:bg-neo-surface-2'
                    }`}
                  >
                    {lvl === 'all' ? 'Semua' : lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Area */}
      <section className="py-12 sm:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8 pb-2 border-b border-neo-ink">
            <span className="font-mono text-xs text-neo-ink-2 tabular-nums">
              Menampilkan <strong className="text-neo-ink">{filteredAchievements.length}</strong> rekam jejak prestasi
            </span>
            {(selectedYear !== 'all' || selectedCategory !== 'all' || selectedLevel !== 'all' || searchQuery !== '') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedYear('all');
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                  setSearchQuery('');
                }}
                className="font-mono text-xs text-neo-ink hover:underline"
              >
                Reset Filter ×
              </button>
            )}
          </div>

          {filteredAchievements.length === 0 ? (
            <div className="bg-neo-surface border border-neo-ink p-12 text-center max-w-lg mx-auto">
              <h3 className="font-serif font-bold text-lg text-neo-ink mb-2">
                Tidak ada data prestasi yang cocok
              </h3>
              <p className="text-xs text-neo-ink-2 mb-4">
                Silakan sesuaikan kata kunci atau ubah kombinasi filter.
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
                Tampilkan Semua Prestasi
              </button>
            </div>
          ) : viewMode === 'timeline' ? (
            <div className="relative border-l-2 border-neo-ink ml-3 sm:ml-6 pl-5 sm:pl-8 space-y-6">
              {filteredAchievements.map((item) => (
                <div key={item.id} className="relative">
                  <div className="absolute -left-[27px] sm:-left-[39px] top-2 w-3.5 h-3.5 bg-neon-lime border border-neo-ink rounded-full"></div>

                  <article className="bg-neo-surface border border-neo-ink shadow-neo-sm p-5 hover:shadow-neo transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-neo-ink/10">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs bg-neo-bg border border-neo-ink px-2 py-0.5 text-neo-ink">
                          {item.year}
                        </span>
                        <span className="lbl lbl-lime text-[10px] px-1.5 py-0.5">
                          {item.level}
                        </span>
                        <span className="font-mono text-xs text-neo-ink-3">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-xs text-neo-ink">
                        {item.medal}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-neo-ink mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neo-ink-2 leading-relaxed mb-3">
                      {item.desc}
                    </p>

                    <div className="pt-2 border-t border-neo-ink/10 flex items-center justify-between text-xs font-mono text-neo-ink-3">
                      <span><strong>Delegasi:</strong> {item.delegation}</span>
                      <span>Terverifikasi</span>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto border border-neo-ink shadow-neo-sm bg-neo-surface">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neo-bg text-neo-ink font-mono text-xs uppercase border-b border-neo-ink">
                    <th className="p-3">Tahun</th>
                    <th className="p-3">Ajang Kejuaraan</th>
                    <th className="p-3">Bidang</th>
                    <th className="p-3">Tingkat</th>
                    <th className="p-3">Capaian</th>
                    <th className="p-3">Delegasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neo-ink/10 font-sans text-xs">
                  {filteredAchievements.map((item) => (
                    <tr key={item.id} className="hover:bg-neo-surface-2 transition-colors">
                      <td className="p-3 font-mono font-bold text-neo-ink align-top">
                        {item.year}
                      </td>
                      <td className="p-3 font-bold text-neo-ink align-top max-w-xs">
                        {item.title}
                      </td>
                      <td className="p-3 font-mono text-neo-ink-2 align-top whitespace-nowrap">
                        {item.categoryLabel}
                      </td>
                      <td className="p-3 align-top whitespace-nowrap">
                        <span className="lbl lbl-lime text-[10px] px-1.5 py-0.5">
                          {item.level}
                        </span>
                      </td>
                      <td className="p-3 align-top whitespace-nowrap font-mono font-bold text-neo-ink">
                        {item.medal}
                      </td>
                      <td className="p-3 text-neo-ink-2 align-top">
                        {item.delegation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* 4. Ekosistem Pembinaan Callout */}
      <section className="py-12 sm:py-16 border-t border-neo-ink bg-neo-surface-2">
        <div className="container">
          <div className="bg-neo-surface border border-neo-ink shadow-neo p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="lbl lbl-lime text-[10px] px-2 py-0.5 inline-block mb-2">
                PEMBINAAN BERKELANJUTAN
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-neo-ink mb-2">
                Program Pendampingan Juara SMANSA
              </h3>
              <p className="text-sm text-neo-ink-2 max-w-xl leading-relaxed">
                Persiapan kompetisi dilakukan terstruktur lewat klinik olimpiade sains laboratorium, bimbingan penulisan karya ilmiah remaja (KIR), pelatihan tanding olahraga, serta mentoring berkala bersama jejaring alumni KAPASSKA.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/program" className="btn btn-primary text-xs">
                Katalog Ekstrakurikuler →
              </a>
              <a href="/alumni" className="btn btn-secondary text-xs">
                Jejaring Alumni →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrestasiPage;
