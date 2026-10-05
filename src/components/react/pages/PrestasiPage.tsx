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

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Internasional':
        return 'bg-neon-magenta text-neo-surface';
      case 'Nasional':
        return 'bg-neon-lime text-neo-ink';
      case 'Provinsi':
        return 'bg-neon-cyan text-neo-ink';
      case 'Kabupaten':
        return 'bg-neon-yellow text-neo-ink';
      default:
        return 'bg-neo-surface-2 text-neo-ink';
    }
  };

  return (
    <div className="bg-neo-bg text-neo-ink">
      {/* Header Banner */}
      <section className="border-b-2 border-neo-ink bg-neo-surface py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="inline-block bg-neon-yellow text-neo-ink border-2 border-neo-ink px-3 py-1 font-mono font-bold text-xs uppercase tracking-wider shadow-neo-sm mb-4">
            Rekam Jejak Kejuaraan & Prestasi
          </div>
          <h1 className="font-sans font-extrabold text-3xl md:text-5xl text-neo-ink leading-tight mb-4 tracking-tight">
            Prestasi Siswa SMAN 1 Klaten
          </h1>
          <p className="text-neo-ink-2 font-medium text-base md:text-lg max-w-3xl leading-relaxed">
            Tradisi panjang nalar ilmiah, kejujuran sportivitas, dan kreasi estetika civitas akademika Padmawijaya.
            Mulai dari medali emas dunia di Simeiz Crimea hingga gelar juara umum olimpiade dan Adiwiyata Mandiri.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8">
            <div className="bg-neon-magenta text-neo-surface border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs uppercase block font-bold text-neo-surface/90">Tingkat Dunia</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl">Emas IOA Crimea</span>
            </div>
            <div className="bg-neon-lime text-neo-ink border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs uppercase block font-bold text-neo-ink-3">OSN & LKTIN</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl">45+ Juara Nasional</span>
            </div>
            <div className="bg-neon-cyan text-neo-ink border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs uppercase block font-bold text-neo-ink-3">FLS2N & O2SN</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl">80+ Gelar Daerah</span>
            </div>
            <div className="bg-neon-yellow text-neo-ink border-2 border-neo-ink p-3 md:p-4 shadow-neo-sm">
              <span className="font-mono text-xs uppercase block font-bold text-neo-ink-3">Lingkungan Hidup</span>
              <span className="font-sans font-extrabold text-xl md:text-2xl">Adiwiyata Mandiri</span>
            </div>
          </div>
        </div>
      </section>

      {/* Control Panel: Filters, Search & View Switcher */}
      <section className="py-8 bg-neo-surface-2 border-b-2 border-neo-ink">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
            {/* Search Input */}
            <div className="flex-1 max-w-md">
              <label htmlFor="search-achievement" className="font-mono text-xs font-bold text-neo-ink uppercase block mb-1.5">
                Cari Prestasi / Siswa:
              </label>
              <input
                id="search-achievement"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik nama ajang, OSN, futsal, riset..."
                className="w-full bg-neo-surface border-2 border-neo-ink px-3 py-2 font-mono text-sm text-neo-ink placeholder:text-neo-ink-3 shadow-neo-sm focus:outline-hidden"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-end gap-2">
              <div className="flex border-2 border-neo-ink bg-neo-surface shadow-neo-sm p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('timeline')}
                  className={`font-mono text-xs font-bold px-3 py-1.5 transition-all ${
                    viewMode === 'timeline'
                      ? 'bg-neo-ink text-neo-surface'
                      : 'text-neo-ink hover:bg-neo-surface-2'
                  }`}
                >
                  Linimasa
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`font-mono text-xs font-bold px-3 py-1.5 transition-all ${
                    viewMode === 'table'
                      ? 'bg-neo-ink text-neo-surface'
                      : 'text-neo-ink hover:bg-neo-surface-2'
                  }`}
                >
                  Tabel Data
                </button>
              </div>
            </div>
          </div>

          {/* Filter Rows */}
          <div className="space-y-3">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-neo-ink-3 uppercase mr-1">Bidang:</span>
              {categories.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setSelectedCategory(c.key)}
                  className={`font-mono text-xs font-bold px-3 py-1 border border-neo-ink transition-all ${
                    selectedCategory === c.key
                      ? 'bg-neon-lime text-neo-ink shadow-neo-sm'
                      : 'bg-neo-surface text-neo-ink hover:bg-neo-surface-2'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Year & Level Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neo-ink/20">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-xs font-bold text-neo-ink-3 uppercase mr-1">Tahun:</span>
                {years.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setSelectedYear(y)}
                    className={`font-mono text-xs font-bold px-2.5 py-0.5 border border-neo-ink transition-all ${
                      selectedYear === y
                        ? 'bg-neo-ink text-neo-surface'
                        : 'bg-neo-surface text-neo-ink hover:bg-neo-surface-2'
                    }`}
                  >
                    {y === 'all' ? 'Semua' : y}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-xs font-bold text-neo-ink-3 uppercase mr-1">Tingkat:</span>
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`font-mono text-xs font-bold px-2.5 py-0.5 border border-neo-ink transition-all ${
                      selectedLevel === lvl
                        ? 'bg-neon-cyan text-neo-ink shadow-neo-sm'
                        : 'bg-neo-surface text-neo-ink hover:bg-neo-surface-2'
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

      {/* Main Content Area */}
      <section className="py-12 md:py-16 max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <p className="font-mono text-xs font-bold text-neo-ink-3">
            Menampilkan <span className="text-neo-ink">{filteredAchievements.length}</span> rekam jejak prestasi
          </p>
          {(selectedYear !== 'all' || selectedCategory !== 'all' || selectedLevel !== 'all' || searchQuery !== '') && (
            <button
              type="button"
              onClick={() => {
                setSelectedYear('all');
                setSelectedCategory('all');
                setSelectedLevel('all');
                setSearchQuery('');
              }}
              className="font-mono text-xs font-bold text-neo-ink underline hover:text-neo-ink-2"
            >
              Reset Filter ✕
            </button>
          )}
        </div>

        {filteredAchievements.length === 0 ? (
          <div className="bg-neo-surface border-2 border-neo-ink shadow-neo p-12 text-center">
            <span className="font-mono text-2xl font-bold block mb-2">✦</span>
            <h3 className="font-sans font-bold text-lg text-neo-ink mb-2">
              Tidak ada data prestasi yang cocok
            </h3>
            <p className="text-sm text-neo-ink-2 max-w-md mx-auto mb-4">
              Silakan sesuaikan kata kunci pencarian atau ubah kombinasi filter tahun dan bidang kejuaraan.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedYear('all');
                setSelectedCategory('all');
                setSelectedLevel('all');
                setSearchQuery('');
              }}
              className="font-mono font-bold text-xs px-4 py-2 bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo-sm"
            >
              Tampilkan Semua Prestasi
            </button>
          </div>
        ) : viewMode === 'timeline' ? (
          /* Timeline View */
          <div className="relative border-l-3 border-neo-ink ml-4 md:ml-8 pl-6 md:pl-10 space-y-8">
            {filteredAchievements.map((item) => (
              <div key={item.id} className="relative group">
                {/* Node on Timeline Line */}
                <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 bg-neon-lime border-2 border-neo-ink shadow-neo-sm flex items-center justify-center font-mono font-bold text-[10px] text-neo-ink">
                  ★
                </div>

                <article className="bg-neo-surface border-2 border-neo-ink shadow-neo hover:shadow-neo-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-neo-ink text-neo-surface font-mono font-bold text-xs px-2.5 py-1">
                        {item.year}
                      </span>
                      <span className={`font-mono font-bold text-xs px-2.5 py-1 border border-neo-ink ${getLevelBadgeClass(item.level)}`}>
                        {item.level}
                      </span>
                      <span className="font-mono text-xs font-bold text-neo-ink-3 uppercase">
                        {item.categoryLabel}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-xs bg-neon-yellow text-neo-ink px-2.5 py-1 border border-neo-ink shadow-neo-sm">
                      {item.medal}
                    </span>
                  </div>

                  <h3 className="font-sans font-extrabold text-lg md:text-xl text-neo-ink mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-neo-ink-2 leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  <div className="pt-3 border-t border-neo-ink/20 flex flex-wrap items-center justify-between text-xs font-mono">
                    <span className="text-neo-ink-2">
                      <strong className="text-neo-ink">Delegasi:</strong> {item.delegation}
                    </span>
                    <span className="text-neo-ink-3">Tervalidasi Sekolah</span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        ) : (
          /* Interactive Table View */
          <div className="overflow-x-auto border-2 border-neo-ink shadow-neo bg-neo-surface">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neo-ink text-neo-surface font-mono text-xs uppercase border-b-2 border-neo-ink">
                  <th className="p-3 md:p-4">Tahun</th>
                  <th className="p-3 md:p-4">Ajang Kejuaraan</th>
                  <th className="p-3 md:p-4">Bidang</th>
                  <th className="p-3 md:p-4">Tingkat</th>
                  <th className="p-3 md:p-4">Capaian</th>
                  <th className="p-3 md:p-4">Delegasi / Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neo-ink/20 font-sans text-xs md:text-sm">
                {filteredAchievements.map((item) => (
                  <tr key={item.id} className="hover:bg-neo-surface-2/70 transition-colors">
                    <td className="p-3 md:p-4 font-mono font-bold text-neo-ink align-top">
                      {item.year}
                    </td>
                    <td className="p-3 md:p-4 font-bold text-neo-ink align-top max-w-xs">
                      {item.title}
                    </td>
                    <td className="p-3 md:p-4 font-mono text-xs text-neo-ink-2 align-top whitespace-nowrap">
                      {item.categoryLabel}
                    </td>
                    <td className="p-3 md:p-4 align-top whitespace-nowrap">
                      <span className={`inline-block font-mono font-bold text-xs px-2 py-0.5 border border-neo-ink ${getLevelBadgeClass(item.level)}`}>
                        {item.level}
                      </span>
                    </td>
                    <td className="p-3 md:p-4 align-top whitespace-nowrap">
                      <span className="inline-block font-mono font-bold text-xs bg-neon-yellow text-neo-ink px-2 py-0.5 border border-neo-ink">
                        {item.medal}
                      </span>
                    </td>
                    <td className="p-3 md:p-4 text-xs text-neo-ink-2 align-top max-w-sm leading-relaxed">
                      <p className="font-semibold text-neo-ink mb-1">{item.delegation}</p>
                      <p>{item.desc}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Pembinaan & Mentoring Callout */}
      <section className="py-12 border-t-2 border-neo-ink bg-neo-surface">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="bg-neo-bg border-3 border-neo-ink shadow-neo p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="inline-block bg-neon-cyan text-neo-ink border-2 border-neo-ink font-mono font-bold text-xs px-2.5 py-0.5 mb-2 shadow-neo-sm">
                Ekosistem Pembinaan Prestasi
              </span>
              <h3 className="font-sans font-extrabold text-xl md:text-2xl text-neo-ink mb-2">
                Program Pendampingan Juara SMANSA
              </h3>
              <p className="text-sm text-neo-ink-2 max-w-2xl leading-relaxed">
                Persiapan kompetisi dilakukan terstruktur lewat klinik olimpiade sains laboratorium,
                bimbingan penulisan karya ilmiah remaja (KIR), pelatihan tanding Smansa Eagles, serta mentoring berkala
                bersama jejaring alumni KAPASSKA di perguruan tinggi nasional.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href="/program"
                className="inline-block text-center font-mono font-bold text-xs uppercase px-5 py-3 bg-neon-lime text-neo-ink border-2 border-neo-ink shadow-neo-sm hover:shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                Lihat 23 Ekstrakurikuler &rarr;
              </a>
              <a
                href="/alumni"
                className="inline-block text-center font-mono font-bold text-xs uppercase px-5 py-3 bg-neo-surface text-neo-ink border-2 border-neo-ink shadow-neo-sm hover:bg-neo-surface-2 transition-all"
              >
                Jejaring Alumni KAPASSKA &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrestasiPage;
