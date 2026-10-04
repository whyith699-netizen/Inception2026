# Sumber Data Resmi & Referensi Lengkap SMA Negeri 1 Klaten (Padmawijaya / Kampus 13)

Dokumen ini disusun sebagai *Single Source of Truth* (SSOT) untuk developer dan AI Agent yang membutuhkan referensi resmi, kredibel, dan terverifikasi mengenai SMA Negeri 1 Klaten.

---

## 1. Identitas & Legalitas Resmi Sekolah

| Parameter | Data Resmi Terverifikasi | Sumber / Referensi |
| :--- | :--- | :--- |
| **Nama Sekolah** | SMA Negeri 1 Klaten | SK Mendikbud RI No. 5620/B/57 |
| **Nama Kehormatan / Julukan** | **Padmawijaya**, **Kampus 13**, **SMANSA Klaten** | Tradisi sekolah sejak 1957 & Ikatan Alumni |
| **NPSN** | **20309676** | Kemendikbudristek Dapodik |
| **NSS** | **301046002001** | Dinas Pendidikan Jawa Tengah |
| **Status Sekolah** | Negeri | Pemerintah Provinsi Jawa Tengah |
| **Peringkat Akreditasi** | **Peringkat A (Unggul)** | BAN-SM Provinsi Jawa Tengah |
| **Nilai Akreditasi** | **98** (Skala 100) | SK BAN-SM No. 1347/BAN-SM/SK/2021 |
| **Tanggal Pendirian** | **5 November 1957** | Tanggal pembentukan SMA Persiapan |
| **Perintis / Pendiri** | Bapak Mochtar (Bupati Klaten saat itu) & Tokoh Pendidikan Klaten | Arsip Sejarah Sekolah & Wikipedia ID |
| **Alamat Kampus** | Jalan Merbabu No. 13, Kelurahan Klaten, Kec. Klaten Selatan, Kab. Klaten, Jawa Tengah 57423 | Domisili resmi Kampus 13 |
| **Koordinat Geografis (GPS)** | **7°42'06.5"S 110°36'09.0"E** (`-7.701806, 110.602500`) | Google Maps / OpenStreetMap |
| **Nomor Telepon / Faks** | **(0272) 321150** | Telepon resmi TU SMAN 1 Klaten |
| **Email Resmi** | `smansa_klaten@yahoo.com` | Kanal administrasi resmi |
| **Portal Resmi (Live)** | `https://www.sma1klaten.sch.id/` | Domain sch.id resmi Dinas/Kominfo |
| **Slogan / Moto** | *"Terwujudnya lulusan unggul, berdaya saing global, dan beretika lingkungan berlandaskan nilai-nilai luhur bangsa."* | Visi resmi sekolah |
| **Maskot Resmi** | **Chiku si Burung Hantu** | Lambang kebijaksanaan & ketajaman ilmu |

---

## 2. API Endpoints Resmi Sekolah (`https://www.sma1klaten.sch.id`)

Portal resmi SMAN 1 Klaten dibangun dengan arsitektur Next.js yang menyediakan endpoint REST API publik format JSON:

### 2.1 Endpoint Staf & Dewan Guru
* **URL:** `https://www.sma1klaten.sch.id/api/staff?limit=100&page=1`
* **Metode:** `GET`
* **Total Record:** **77 personil** (62 Guru + 15 Tenaga Kependidikan/Staf TU)
* **Contoh Struktur Objek:**
  ```json
  {
    "id_staff": 18,
    "name": "Tantri Ambarsari, S.Pd.,M.Eng.",
    "grade": "Pembina  TK. I",
    "position": "Guru",
    "teaching": "",
    "image_url": "/uploads/20241023T155439249Z_a64c8e05-08af-48b6-90bb-7d240065aaf8.jpg"
  }
  ```
* **Resolusi Gambar Staf:** `https://www.sma1klaten.sch.id` + `image_url`

### 2.2 Endpoint Berita & Pengumuman
* **URL:** `https://www.sma1klaten.sch.id/api/news?limit=20&page=1`
* **Metode:** `GET`
* **Total Record:** **175 artikel berita**
* **Contoh Struktur Objek:**
  ```json
  {
    "id": 448,
    "slug": "edukasi-hak-asasi-manusia-11-dosen-fh-undip...",
    "title": "Edukasi Hak Asasi Manusia: 11 Dosen FH Undip Gelar Pengabdian Masyarakat...",
    "desc": "<p>Klaten, 22 September 2026 — SMA Negeri 1 Klaten menerima kunjungan akademis...</p>",
    "url": "/api/images/uploads/20260923T004337710Z_5097c4b4-b5a7-47a2-815e-b194f0e8e135.jpg",
    "status": "PUBLISHED",
    "createdDate": "2026-09-23T00:43:38.044Z"
  }
  ```
* **Resolusi Gambar Berita:** `https://www.sma1klaten.sch.id` + `url`

### 2.3 Endpoint Tokoh Alumni
* **URL:** `https://www.sma1klaten.sch.id/api/alumni?limit=10`
* **Metode:** `GET`
* **Total Record:** **6 tokoh alumni kehormatan**
* **Daftar Tokoh:**
  1. `Prof. DR. Widodo Muktiyo` (Dirjen Kominfo & Guru Besar UNS)
  2. `PROF. DR. JOKO TRIYONO, S.T., M.T.` (Dosen UNS & Direktur AKN Pacitan 2021-2025)
  3. `Ir. Paulus Insap Santosa, M.Sc., Ph.D.` (Dosen Departemen TI & Elektro FT UGM)
  4. `Drs. Eko Hartono, MPP.` (Diplomat, Konsul Jenderal RI Jeddah Purna 2023)
  5. `Winarno, S.Si., M.Eng` (Dosen & Kepala Prodi S-1 Informatika UNS)
  6. `AGUS MULIA S.Pt` (Pengusaha Agribisnis Nasional)

---

## 3. Data Sarana, Prasarana, dan Kapasitas (Wikipedia & Fisik Sekolah)

* **Luas Lahan Kampus:** **15.619 m²**
* **Luas Bangunan:** **6.863 m²**
* **Luas Halaman & Taman:** **7.486 m²**
* **Luas Lapangan Olahraga:** **784 m²**
* **Kapasitas Rombongan Belajar (Rombel):** **33 Rombel**
  - Kelas X: 11 Rombel (X-A s.d. X-K)
  - Kelas XI: 11 Rombel (XI-A s.d. XI-K)
  - Kelas XII: 11 Rombel (XII-A s.d. XII-K)
* **Total Peserta Didik:** **±1.190 siswa**
* **Fasilitas Utama:**
  - Perpustakaan Graha Pustaka (terintegrasi e-Perpus)
  - Laboratorium Sains: Fisika, Kimia, Biologi
  - Laboratorium Komputer & Riset Informatika (Smart Class)
  - Lapangan Basket / Futsal Terbuka & Tertutup
  - Auditorium / Aula Utama Padmawijaya
  - Masjid Kampus & Ruang Pembinaan Rohani
  - Ruang UKS / PMR Prata

---

## 4. Struktur Pimpinan Sekolah

1. **Kepala Sekolah:** Tantri Ambarsari, S.Pd., M.Eng. (Pembina TK. I)
2. **Ketua Komite Sekolah:** Drs. Sumargana, M.S.
3. **Wakil Kepala Sekolah Bidang Kurikulum:** FX. Febriyanto Adi Nugroho, S.Si.
4. **Wakil Kepala Sekolah Bidang Kesiswaan:** Bambang Budianto, S.Pd.
5. **Wakil Kepala Sekolah Bidang Sarana & Prasarana:** Agus Purnama, S.Pd.
6. **Wakil Kepala Sekolah Bidang Hubungan Masyarakat:** Resmiyati, S.Pd., M.Pd.

---

## 5. Daftar 23 Ekstrakurikuler Resmi

1. **OSIS (Osmansa):** Organisasi Siswa Intra Sekolah
2. **MPK:** Majelis Permusyawaratan Kelas
3. **Pramuka (Dewan Ambalan):** Ambalan Pandawa-Srikandi
4. **PMR (Prata):** Palang Merah Remaja
5. **Pecinta Alam (Emapala):** Eksplorasi Alam & Pelestarian Lingkungan
6. **Rohis (Romansa):** Kerohanian Islam
7. **Rokris (Persik):** Persekutuan Kerohanian Kristen
8. **Katolik (Perkasa):** Persekutuan Remaja Katolik Smansa
9. **Band & Musik (Sakla Music):** Pengembangan bakat musik modern
10. **Paduan Suara (Sakla Voice):** Vokal grup & paduan suara sekolah
11. **Jurnalistik (Juju):** Majalah & publikasi siswa
12. **Karya Ilmiah Remaja (KIR):** Riset ilmiah sains & sosial
13. **Futsal:** Tim olahraga futsal prestasi
14. **Basket (Eagles):** Tim basket putra/putri
15. **Bola Voli (Recsa):** Tim voli sekolah
16. **English Club (EC):** Debat bahasa Inggris & speech
17. **Tari Tradisional (Sparkle):** Seni tari Nusantara
18. **Teater (TSL - Teater Sastra Lima):** Seni drama & pementasan
19. **Bela Diri (Secure):** Silat & bela diri praktis
20. **Komputer & Robotika (DACO):** Pemrograman, robotika & IoT
21. **Sinematografi (Icomsa):** Produksi video & film pendek
22. **Fotografi (Snapshot):** Fotografi jurnalistik & seni lensa
23. **Seni Rebana / Hadroh (Al-Zamartanabil):** Musik rebana & sholawat

---

## 6. Jejak Sejarah & Prestasi Kehormatan

* **1957:** Pembentukan SMA Persiapan pada 5 November 1957 dipimpin Bupati Mochtar dengan 253 siswa perdana.
* **1960:** Diberi predikat SMA Negeri ABC.
* **1965:** Pemecahan SMA Negeri ABC menjadi SMA Negeri 1 Klaten dan SMA Negeri 2 Klaten.
* **1981:** Pendirian Yayasan SMA Padmawijaya oleh alumni SMAN 1 Klaten.
* **1994:** Ditunjuk Kanwil Dikbud Jawa Tengah sebagai SMU Unggulan / SMU Plus.
* **2004:** **Pencapaian Internasional Tertinggi:** Medali Emas pada International Olympiad on Astronomy and Astrophysics (IOA) di Simeiz, Crimea, ditambah 2 Medali Emas & 1 Perunggu di Olimpiade Sains Nasional (OSN).
* **2009 (26 Desember):** Deklarasi pendirian resmi **KAPASSKA** (Keluarga Alumni Padmawijaya SMAN 1 Klaten).
* **2016:** Penerima penghargaan **Sekolah Adiwiyata Nasional**.
* **2021:** Penetapan Akreditasi A (Unggul) dengan Nilai 98 oleh BAN-SM (SK 1347/BAN-SM/SK/2021).
* **2026 (18 September):** Penyerahan beasiswa pendidikan Rp18.000.000,- oleh Ikatan Alumni Angkatan 1976.
* **2026 (23 September):** Program kemitraan edukasi pencegahan kekerasan sekolah bersama 11 dosen Fakultas Hukum Universitas Diponegoro (FH Undip).

---

## 7. Pedoman Akses bagi AI Agent

- Jika agent ingin memperbarui data guru, gunakan skrip sinkronisasi atau panggil REST endpoint `https://www.sma1klaten.sch.id/api/staff`.
- Jika agent ingin merujuk fakta legalitas, gunakan tabel pada Seksi 1.
- Dilarang membuat data fiktif mengenai nama sekolah, kepala sekolah, koordinat, atau nilai akreditasi.
