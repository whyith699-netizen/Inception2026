# PROPOSAL KONSEP DESAIN WEBSITE PROFIL SEKOLAH & CHATBOT AI
## INCEPTION 2026

**Dirancang Oleh:**  
### RANDOM KID
1. **Muhammad Agha Prabswara**
2. **Radithya Asadel Narendra**
3. **Jalu Budi Dhamarsakti**
4. **Miftahu Roifu Valda Anam**

**Asal Sekolah:**  
## SMA NEGERI 1 KLATEN

---

### BAB 1: Deskripsi Singkat Sekolah

#### 1.1 Latar Belakang
Penyampaian informasi institusi pendidikan menengah atas di era digital menghadapi tantangan asimetri informasi dan fragmentasi kanal komunikasi. Pada masa-masa krusial seperti Penerimaan Peserta Didik Baru (PPDB), pembagian konsentrasi peminatan kurikulum, dan sosialisasi kalender akademik, pihak sekolah sering kali menghadapi penumpukan pertanyaan berulang dari ratusan calon siswa dan orang tua. Kanal konvensional seperti papan pengumuman fisik, media sosial yang terdistribusi, atau layanan telepon tata usaha sering kali kewalahan melayani kebutuhan konsultasi serentak selama 24 jam.

SMA Negeri 1 Klaten (SMANSA Klaten) merupakan salah satu sekolah rujukan tertua dan paling berprestasi di Jawa Tengah yang memiliki dinamika kegiatan, prestasi olimpiade sains, serta ragam ekstrakurikuler yang sangat kaya. Keberadaan website profil yang modern, berwibawa, berestetika tinggi (tanpa visual klise/slop AI), serta dilengkapi agen percakapan cerdas (Chatbot AI) interaktif menjadi urgensi nyata. Dengan mengintegrasikan sistem knowledge base sekolah ke dalam arsitektur website statis berkecepatan tinggi, penyampaian informasi profil, keunggulan kurikulum, panduan PPDB, dan transparansi fasilitas dapat diakses secara instan, akurat, dan tanpa jeda oleh seluruh lapisan pemangku kepentingan.

#### 1.2 Jenjang Sekolah
- **Jenjang:** Sekolah Menengah Atas (SMA) Negeri
- **Kurikulum:** Kurikulum Merdeka (Fase E untuk Kelas X eksplorasi minat, serta Fase F untuk Kelas XI & XII dengan peminatan terarah).
- **Rumpun Peminatan:**
  1. *MIPA & Kelas Riset Ilmiah* (Fisika, Kimia, Biologi, Matematika Lanjut, Karya Ilmiah Remaja/KIR).
  2. *Ilmu Sosial & Ekonomi Terapan* (Sosiologi, Geografi, Ekonomi, Geopolitik & Hukum).
  3. *Bahasa & Diplomasi Budaya* (Bahasa & Sastra Indonesia, Bahasa Inggris Lanjut, Bahasa Asing Pilihan, Hubungan Internasional).

#### 1.3 Sekolah yang Diangkat
- **Nama Sekolah:** SMA Negeri 1 Klaten (SMANSA Klaten)
- **NPSN:** 20309689
- **Tahun Berdiri:** 1957 (Lebih dari 69 tahun mengabdi bagi kemajuan pendidikan nasional)
- **Status Akreditasi:** Terakreditasi A (Unggul) berdasarkan Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M).
- **Alamat Resmi:** Jl. Merbabu No. 13, Klaten, Jawa Tengah 57411.

---

### BAB 2: Konsep dan Tujuan Website

#### 2.1 Tujuan Website
1. **Representasi Identitas Akademik yang Berwibawa:** Membangun antarmuka profil web sekolah yang memadukan estetika *Neo-Editorial Academic* dengan palet warna hangat bernuansa organik (`#FBF8F2` cream, `#221610` dark chocolate, `#E85A38` terracotta), serta tipografi editorial yang humanis guna menolak visual generik AI (*anti-slop*).
2. **Sentralisasi Informasi Terpadu:** Menyajikan direktori lengkap profil sekolah, struktur kurikulum, sarana laboratorium, rekam jejak prestasi kejuaraan, serta panduan teknis PPDB dalam tata letak yang ergonomis dan mudah dinavigasi.
3. **Layanan Interaktif 24/7 via Chatbot AI ("SmansaBot"):** Menghadirkan asisten kecerdasan buatan terintegrasi yang mampu menjawab pertanyaan seputar zonasi PPDB, persyaratan administrasi, kegiatan ekstrakurikuler, dan fasilitas sekolah secara real-time tanpa latensi server.
4. **Kinerja Web Ekstrem (Zero-JS Default):** Memanfaatkan arsitektur kompilasi statis modern Astro 7.0 agar halaman dapat dimuat seketika (<1 detik) bahkan pada jaringan seluler berkecepatan rendah.

#### 2.2 Target Pengguna
1. **Calon Peserta Didik Baru:** Membutuhkan transparansi informasi seputar kuota zonasi, jalur prestasi, persyaratan SKL, serta iklim akademik dan pergaulan di SMAN 1 Klaten.
2. **Orang Tua & Wali Murid:** Membutuhkan validitas legalitas sekolah (akreditasi, NPSN), kepastian lingkungan belajar yang aman, fasilitas laboratorium, biaya, dan kontak resmi panitia PPDB/Sekretariat.
3. **Peserta Didik Aktif:** Mengakses pembaruan agenda kalender sekolah, pendaftaran kegiatan ekstrakurikuler, informasi olimpiade, dan panduan persiapan masuk Perguruan Tinggi Negeri (PTN).
4. **Guru & Tenaga Kependidikan:** Menggunakan website sebagai sarana etalase capaian akademik, publikasi riset KIR siswa, dan rujukan komunikasi publik satu pintu.
5. **Alumni & Masyarakat Umum:** Menjalin jejaring kolaborasi, melihat statistik keberhasilan alumni di PTN (UGM, ITB, UI, dll.), serta menyalurkan program beasiswa atau kegiatan kemitraan.

---

### BAB 3: Fitur, Teknologi, dan Rencana Pengembangan

#### 3.1 Daftar Fitur Utama dan Fitur Tambahan
- **Fitur Utama:**
  1. *Landing Page Hero Section:* Visual panggung asimetris berbobot editorial, trust indicators (NPSN, Akreditasi A, Rujukan Jateng), dan tombol aksi cepat menuju Chatbot AI.
  2. *Bilah Metrik Dinamis (Metrics Ribbon):* Menampilkan data kunci institusi: 69 tahun berdiri, 1.150+ siswa aktif, dan 94.8% serapan lulusan di PTN favorit.
  3. *Kartu Program Peminatan Kurikulum Merdeka:* Kartu berwarna modular dengan pembagian rumpun MIPA Riset, IPS Kreatif, dan Bahasa Global beserta poin silabus unggulan.
  4. *Pilar Keunggulan Sekolah:* 4 visual lingkaran fokus capaian (OSN, Debat Hukum, Diplomasi Bahasa, Basket DBL/Paskibra).
  5. *Sarana & Prasarana Interaktif:* Eksplorasi laboratorium sains, perpustakaan digital Graha Pustaka, dan gelanggang olahraga GOR Smansa.
  6. *Pusat Pengumuman & Agenda PPDB:* Banner dinamis informasi teknis jalur zonasi, prestasi, afirmasi, dan mutasi.
  7. *Chatbot AI Terintegrasi ("SmansaBot"):* Widget percakapan interaktif dengan *suggestion pills* pertanyaan cepat, pencarian *knowledge base* multi-kata kunci, dan respon instan.
  8. *Footer Institusional Multi-Tier:* Direktori lengkap, transparansi hukum, kontak WhatsApp admin, peta alamat, serta atribusi tim perancang RANDOM KID.
- **Fitur Tambahan:**
  1. *Linter Otomatis Kepatuhan Anti-Slop (`scripts/anti-slop-linter.py`):* Memastikan zero-buzzwords AI dan kepatuhan kontras warna WCAG AA 4.5:1.
  2. *Sistem Desain Token Google DESIGN.md:* Dokumentasi spesifikasi warna, tipografi rasio Major Third (1.250), dan radius sudut elemen.
  3. *Mode Floating Launcher:* Tombol mengambang di sudut kanan bawah yang memudahkan pengunjung memanggil asisten SmansaBot dari posisi gulir mana pun.

#### 3.2 Teknologi dan Rencana Integrasi Chatbot AI
- **Framework Utama:** **Astro 7.0** (`astro@^7.3.5`) dengan mode kompilasi `output: "static"` (Static Site Generation).
- **Arsitektur Gaya:** Modern Native CSS Custom Properties (CSS Tokens W3C) diturunkan langsung dari spesifikasi `DESIGN.md`. Bebas dari dependensi compiler eksternal yang berat, menjamin kecepatan rendering instan.
- **Manajemen Konten:** Astro Content Collections (`src/content.config.ts`) dengan validasi skema runtime *Zod* untuk data terstruktur program peminatan, agenda PPDB, dan FAQ chatbot.
- **Mekanisme Integrasi Chatbot AI ("SmansaBot"):**
  - *Knowledge Base Engine:* Data pengetahuan sekolah diindeks dalam format koleksi JSON terverifikasi (`src/content/faq/`), mencakup regulasi PPDB Jateng, fasilitas lab, ekstrakurikuler, dan profil sejarah.
  - *Client-Side Smart Search & Natural Language Matcher:* Saat pengguna mengetikkan pertanyaan (misal: "berapa kuota zonasi" atau "ada lab apa saja"), algoritma pencocokan kata kunci dan kesamaan semantik memetakan input ke simpul jawaban yang paling relevan dengan latensi <10ms.
  - *Safe Output Sanitization:* Menggunakan `textContent` murni untuk mencegah kerentanan Cross-Site Scripting (XSS).
  - *Extensibility Model:* Arsitektur chatbot dirancang modular sehingga dapat dihubungkan ke endpoint LLM eksternal (seperti Groq/Llama-3, OpenAI, atau model lokal Ollama) melalui API route `/api/chat` pada pengembangan tahap lanjut.

#### 3.3 Rencana Pengembangan Menuju Tahap Final
1. **Tahap 1 (MVP & Prototyping - Selesai):** Pembangunan struktur inti Astro 7, token styling `DESIGN.md`, komponen landing page, dan implementasi fungsional widget Chatbot AI berbasis offline knowledge base.
2. **Tahap 2 (Pengujian Kualitas & Anti-Slop Audit - Selesai):** Eksekusi automated linter (`python3 scripts/anti-slop-linter.py`), pengecekan aksesibilitas rasio kontras WCAG AA, dan verifikasi zero-error static build (`pnpm run build`).
3. **Tahap 3 (Integrasi Multimedia & Virtual Tour 360°):** Penambahan dokumentasi galeri foto nyata kampus SMAN 1 Klaten dan integrasi tur virtual laboratorium.
4. **Tahap 4 (Penyempurnaan AI Model & RAG Pipeline):** Menghubungkan chatbot ke database vektor Retrieval-Augmented Generation (RAG) untuk membaca dokumen PDF Juknis PPDB Dinas Pendidikan secara utuh.
5. **Tahap 5 (Public Deployment & Launching):** Penerbitan publik melalui platform Cloudflare Pages / Vercel dengan konfigurasi domain kustom resmi sekolah (`sman1klaten.sch.id`).

---

### BAB 4: Desain Antarmuka (Mockup) dan Alur Pengguna

Tautan Proyek Repositori / Demo: `/home/archgha/web-sekolah` (Tersedia lokal dan siap dikompilasi ke direktori `dist/`).

#### 4.1 Halaman Beranda (Landing Page)
- **Tampilan:**
  Bagian atas memuat *sticky header* dengan brand mark **SMANSA.**, badge penanda kompetisi **INCEPTION 2026**, tautan navigasi, dan tombol aksi cepat `Tanya SmansaBot`. Di bawahnya, *Hero Section* menampilkan headline bertipografi Fraunces serif berbobot tinggi: *"Menempa Generasi Unggul, Berkarakter Luhur & Berprestasi Global"*, bilah kepercayaan (NPSN 20309689, Akreditasi A), serta panggung visual asimetris yang menampilkan preview fasilitas sains dan seni. Tepat di bawah hero, terdapat bilah kontras cokelat tua (*Metrics Ribbon*) yang memuat statistik 69 tahun berdiri dan 94.8% kelulusan PTN.
- **Alur Pengguna:**
  Pengunjung yang baru mendarat langsung memahami identitas dan reputasi resmi sekolah dalam 3 detik pertama. Tombol *hero* memberikan pilihan langsung: menjelajahi kurikulum atau langsung membuka sesi konsultasi interaktif dengan asisten AI.

#### 4.2 Halaman Profil Sekolah & Program Pendidikan
- **Tampilan:**
  Bagian ini menyajikan kartu-kartu modular Kurikulum Merdeka yang dirancang dengan warna pembeda (*color-coded cards*): hijau untuk *MIPA & Kelas Riset Ilmiah*, terakota/coral untuk *IPS & Ekonomi Terapan*, serta biru muda untuk *Bahasa & Diplomasi Budaya*. Setiap kartu merangkum target fase (Fase E/F), deskripsi pendekatan nalar, serta 3 poin silabus praktikum utama.
- **Alur Pengguna:**
  Calon siswa atau wali murid dapat membandingkan silabus setiap jurusan secara berdampingan. Di bagian bawah setiap kartu, tersedia tombol interaktif `Tanya Detail Kurikulum via AI ↗` yang langsung mengarahkan pengguna ke Chatbot dengan konteks jurusan terkait.

#### 4.3 Halaman Fasilitas dan Prestasi
- **Tampilan:**
  Menggunakan tata letak split-grid dinamis:
  - *Kartu Kuning Hangat:* Menyorot sarana riset dan literasi (Laboratorium Fisika, Kimia, Biologi, 3 Lab Komputer berkecepatan tinggi, dan Perpustakaan Digital Graha Pustaka).
  - *Kartu Terakota/Coral:* Menyorot sarana ekspresi karakter (GOR Smansa indoor, Sanggar Karawitan berstandar keraton, dan 25+ ekstrakurikuler).
  Di sampingnya, disajikan 4 pilar lingkaran keunggulan sekolah: Tim Olimpiade OSN, Riset Sosial/Debat, Diplomasi Bahasa, dan Olahraga DBL/Garda Paskibra.
- **Alur Pengguna:**
  Pengunjung melihat bukti fisik bahwa SMAN 1 Klaten memfasilitasi minat bakat secara komprehensif. Pengguna dapat mengklik opsi pengecekan ketersediaan alat lab atau daftar kegiatan ekstrakurikuler.

#### 4.4 Chatbot AI - Layanan Informasi Interaktif (SmansaBot)
- **Tampilan:**
  Komponen Chatbot hadir dalam dua bentuk:
  1. *Dedicated Section Window:* Panel percakapan terstruktur di halaman utama dengan avatar SmansaBot, status indikator hijau *Online*, area riwayat percakapan bertipe balon bubble bergaya modern, deretan tombol pertanyaan cepat (*quick suggestion pills*: "Jalur PPDB 2026", "Fasilitas Lab", "Pilihan Ekstrakurikuler", "Visi & Akreditasi", "Prestasi & Alumni PTN"), serta formulir input teks dengan tombol kirim beraksen coral.
  2. *Floating Widget Launcher:* Tombol mengambang di pojok kanan bawah layar bertuliskan `💬 Tanya SmansaBot` yang dapat diakses kapan saja saat menjelajahi halaman.
- **Alur Pengguna:**
  Pengguna dapat memilih salah satu *suggestion pill* atau mengetikkan pertanyaan bebas (misal: "apa syarat jalur prestasi?"). Dalam hitungan 250 milidetik, SmansaBot menganalisis kueri secara semantik dan menyajikan jawaban faktual resmi lengkap dengan nomor narahubung sekretariat sekolah apabila diperlukan informasi lebih lanjut.

#### 4.5 Halaman Kontak, Lokasi, dan Layanan PPDB
- **Tampilan:**
  Bagian penutup menyajikan *Banner Agenda PPDB* berwarna kuning cerah dengan rincian jadwal sosialisasi 18 - 25 Mei 2026, lokasi Aula Graha Smansa, serta tombol registrasi konsultasi. Footer institusional berlatar belakang dark chocolate (`#221610`) merangkum alamat fisik resmi di Jl. Merbabu No. 13 Klaten, nomor telepon kantor, email resmi, kontak WhatsApp sekretariat, legalitas akreditasi, hak cipta sekolah, dan atribusi penuh kepada **Tim RANDOM KID** (Muhammad Agha Prabswara, Radithya Asadel Narendra, Jalu Budi Dhamarsakti, Miftahu Roifu Valda Anam) untuk ajang **INCEPTION 2026**.
- **Alur Pengguna:**
  Pengguna memperoleh kepastian alur pendaftaran PPDB, mengetahui lokasi fisik sekolah melalui alamat yang tertera, serta dapat menghubungi panitia sekolah secara langsung melalui saluran telepon atau WhatsApp satu klik.
