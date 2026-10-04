import React, { useState, useEffect, useRef, useMemo } from 'react';

export interface FaqItem {
  id: string;
  category: string;
  keywords: string[];
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

interface Props {
  initialFaq?: FaqItem[];
}

const STORAGE_KEY = 'smansabot_chat_history_v1';

const DEFAULT_KNOWLEDGE: FaqItem[] = [
  {
    id: 'faq-ppdb',
    category: 'PPDB',
    keywords: [
      'ppdb', 'daftar', 'pendaftaran', 'jalur', 'zonasi', 'prestasi', 'afirmasi',
      'mutasi', 'perpindahan', 'syarat', 'persyaratan', 'berkas', 'kuota', 'jadwal',
      'smp', 'nilai', 'rapor', 'disdikbud', 'jateng', 'seleksi', 'masuk'
    ],
    question: 'Bagaimana jalur seleksi, kuota, dan syarat PPDB di SMA Negeri 1 Klaten?',
    answer: 'PPDB SMA Negeri 1 Klaten mengacu pada regulasi Disdikbud Provinsi Jawa Tengah dengan 4 jalur resmi: 1) Jalur Zonasi (kuota minimal 55%), 2) Jalur Afirmasi keluarga ekonomi tidak mampu & disabilitas (minimal 20%), 3) Jalur Prestasi akademik/kejuaraan (maksimal 20%), dan 4) Jalur Perpindahan Tugas Orang Tua/Wali (maksimal 5%). Berkas wajib: Ijazah/SKL SMP, Kartu Keluarga minimal 1 tahun penerbitan, Akta Kelahiran, Buku Rapor semester 1-5, serta piagam kejuaraan berjenjang jika melalui jalur prestasi. Rincian jadwal dan simulasi dapat diakses pada halaman PPDB.'
  },
  {
    id: 'faq-profil',
    category: 'Profil & Sejarah',
    keywords: [
      'profil', 'sejarah', '1957', 'berdiri', 'didirikan', 'pendirian', 'akreditasi', '98',
      'ban-sm', 'unggul', 'nilai', 'npsn', '20309676', 'alamat', 'lokasi', 'merbabu',
      'kampus 13', 'padmawijaya', 'visi', 'misi', 'slogan', 'hebat jaya', 'semboyan'
    ],
    question: 'Bagaimana sejarah pendirian 1957, akreditasi nilai 98, dan identitas resmi SMA Negeri 1 Klaten?',
    answer: 'SMA Negeri 1 Klaten (dikenal sebagai Padmawijaya atau Kampus 13) didirikan pada tanggal 5 November 1957 dan beralamat di Jl. Merbabu No. 13, Klaten Selatan, Jawa Tengah (Kode Pos 57423, Telp 0272-321150). Sekolah ber-NPSN 20309676 dengan predikat Akreditasi A (Unggul) bernilai 98 dari BAN-SM. Slogan sekolah: "SMA Negeri 1 Klaten Berkarakter Hebat Jaya". Visi: "Terwujudnya lulusan yang religius, cerdas, berkarakter, berbudi pekerti luhur, berdaya saing global dan beretika lingkungan".'
  },
  {
    id: 'faq-direktori',
    category: 'Direktori & Pimpinan',
    keywords: [
      'direktori', 'guru', 'pimpinan', 'kepala sekolah', 'kepsek', 'tantri', 'ambarsari',
      'wakil', 'wakasek', 'kurikulum', 'febriyanto', 'kesiswaan', 'bambang budianto',
      'sarpras', 'sarana', 'agus purnama', 'humas', 'resmiyati', 'komite', 'sumargana',
      'staff', 'staf', 'tenaga kependidikan', 'pengajar'
    ],
    question: 'Siapa Kepala Sekolah dan jajaran pimpinan SMA Negeri 1 Klaten saat ini?',
    answer: 'Pimpinan SMA Negeri 1 Klaten: Kepala Sekolah dijabat oleh Ibu Tantri Ambarsari, S.Pd., M.Eng. Jajaran Wakil Kepala Sekolah: Wakasek Kurikulum dijabat oleh FX. Febriyanto Adi Nugroho, S.Si.; Wakasek Kesiswaan dijabat oleh Bambang Budianto, S.Pd.; Wakasek Sarana & Prasarana dijabat oleh Agus Purnama, S.Pd.; serta Wakasek Humas dijabat oleh Resmiyati, S.Pd., M.Pd. Ketua Komite Sekolah adalah Drs. Sumargana, M.S. Daftar lengkap guru pengampu per mata pelajaran dapat diakses di menu Direktori.'
  },
  {
    id: 'faq-prestasi',
    category: 'Prestasi & Alumni',
    keywords: [
      'prestasi', 'osn', 'olimpiade', 'sains', 'matematika', 'fisika', 'astronomi', 'kebumian',
      'juara', 'emas', 'perak', 'fls2n', 'o2sn', 'alumni', 'kapasska', 'ptn', 'ugm', 'itb',
      'ui', 'undip', 'uns', 'unair', 'its', 'kelulusan', 'snbp', 'snbt', 'iup'
    ],
    question: 'Bagaimana rekam jejak prestasi OSN dan sebaran alumni SMA Negeri 1 Klaten di PTN?',
    answer: 'SMA Negeri 1 Klaten secara konsisten meraih medali emas dan perak dalam Olimpiade Sains Nasional (OSN) bidang Matematika, Fisika, Astronomi, dan Kebumian, serta ajang FLS2N dan O2SN tingkat nasional. Lebih dari 90% lulusan setiap tahunnya diterima di Perguruan Tinggi Negeri (PTN) terkemuka seperti UGM, ITB, UI, UNDIP, UNS, UNAIR, dan ITS melalui jalur SNBP, SNBT, maupun IUP. Wadah komunikasi alumni resmi berhimpun dalam KAPASSKA.'
  },
  {
    id: 'faq-ekskul',
    category: '23 Ekstrakurikuler',
    keywords: [
      'ekskul', 'ekstrakurikuler', '23', 'organisasi', 'osmansa', 'osis', 'mpk', 'dewan ambalan',
      'pramuka', 'prata', 'paskibra', 'emapala', 'pecinta alam', 'recsa', 'pmr', 'romansa',
      'rohis', 'persik', 'rohkris', 'perkasa', 'rohkat', 'sakla music', 'band', 'sakla voice',
      'paduan suara', 'sparkle', 'dance', 'tsl', 'teater', 'daco', 'seni rupa', 'hadroh',
      'zamartanabil', 'kir', 'karya ilmiah', 'juju', 'jurnalistik', 'ec', 'english club',
      'secure', 'it', 'cyber', 'icomsa', 'robotik', 'snapshot', 'fotografi', 'futsal', 'eagles', 'basket'
    ],
    question: 'Apa saja 23 kegiatan ekstrakurikuler resmi di SMA Negeri 1 Klaten?',
    answer: 'SMA Negeri 1 Klaten membina 23 ekstrakurikuler dan organisasi resmi: 1) Kepemimpinan: OSMANSA (OSIS), MPK, Dewan Ambalan (Pramuka), PRATA (Paskibra). 2) Pecinta Alam & Relawan: EMAPALA, RECSA (PMR). 3) Kerohanian: ROMANSA (Rohis), PERSIK (Rohkris), PERKASA (Rohkat). 4) Seni & Budaya: Sakla Music, Sakla Voice, Sparkle (Modern Dance), TSL (Teater Sapu Lidi), DACO (Seni Rupa), Al-Zamartanabil (Hadroh). 5) Riset & Teknologi: KIR, JUJU (Jurnalistik), EC (English Club), SECURE (Teknologi Informasi), Icomsa (Robotika & Komputer), SNAPSHOT (Fotografi). 6) Olahraga: Futsal Padmawijaya, Smansa Eagles (Basket).'
  },
  {
    id: 'faq-fasilitas',
    category: 'Fasilitas Kampus',
    keywords: [
      'fasilitas', 'lab', 'laboratorium', 'komputer', 'fisika', 'kimia', 'biologi',
      'perpustakaan', 'graha pustaka', 'gor', 'indoor', 'lapangan', 'sepak bola',
      'basket', 'badminton', 'audio visual', 'av', 'masjid', 'wifi', 'internet', 'ac'
    ],
    question: 'Apa saja fasilitas pendukung pembelajaran di SMA Negeri 1 Klaten?',
    answer: 'Fasilitas di Kampus SMA Negeri 1 Klaten mencakup: Laboratorium Fisika, Kimia, dan Biologi standar riset; 3 Laboratorium Komputer berkecepatan tinggi; Perpustakaan Digital Graha Pustaka dengan ribuan judul buku dan e-book; Gelanggang Olahraga (GOR) indoor untuk basket dan bulu tangkis; Lapangan sepak bola & upacara; Ruang Audio Visual; Masjid Kampus; serta Wi-Fi fiber optic terdistribusi di setiap ruang kelas ber-AC.'
  },
  {
    id: 'faq-berita',
    category: 'Berita & Pengumuman',
    keywords: [
      'berita', 'pengumuman', 'kabar', 'agenda', 'informasi', 'terbaru', 'terkini',
      'dies natalis', 'workshop', 'literasi', 'ujian', 'uts', 'uas', 'jadwal'
    ],
    question: 'Di mana melihat informasi berita dan pengumuman terbaru sekolah?',
    answer: 'Informasi pengumuman jadwal seleksi PPDB 2026, rekap juara OSN, agenda Dies Natalis ke-69, pendaftaran ekstrakurikuler, dan agenda alumni KAPASSKA dapat disimak secara lengkap pada halaman Berita portal resmi sekolah.'
  },
  {
    id: 'faq-kontak',
    category: 'Kontak & Lokasi',
    keywords: [
      'kontak', 'alamat', 'lokasi', 'telepon', 'telp', 'email', 'jam', 'buka',
      'tata usaha', 'tu', 'layanan', 'kantor', 'surat', 'pos'
    ],
    question: 'Berapa nomor telepon dan di mana alamat SMA Negeri 1 Klaten?',
    answer: 'SMA Negeri 1 Klaten beralamat di Jl. Merbabu No. 13, Klaten Selatan, Kabupaten Klaten, Jawa Tengah (Kode Pos 57423). Telepon sekretariat: (0272) 321150, email: info@sma1klaten.sch.id. Jam pelayanan tata usaha: Senin - Jumat pukul 07.00 - 15.30 WIB.'
  }
];

const CANNED_PILLS = [
  { label: 'Jalur PPDB 2026', query: 'Bagaimana jalur seleksi dan syarat PPDB 2026 di SMA Negeri 1 Klaten?' },
  { label: 'Akreditasi & Sejarah', query: 'Bagaimana sejarah pendirian 1957 dan nilai akreditasi SMA Negeri 1 Klaten?' },
  { label: 'Pimpinan Sekolah', query: 'Siapa Kepala Sekolah dan jajaran pimpinan SMA Negeri 1 Klaten saat ini?' },
  { label: '23 Ekstrakurikuler', query: 'Apa saja 23 kegiatan ekstrakurikuler resmi di SMA Negeri 1 Klaten?' },
  { label: 'Prestasi & Alumni', query: 'Bagaimana rekam jejak prestasi OSN dan sebaran alumni SMA Negeri 1 Klaten di PTN?' },
  { label: 'Fasilitas Kampus', query: 'Apa saja fasilitas unggulan laboratorium, perpustakaan, dan olahraga di SMAN 1 Klaten?' }
];

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'initial-welcome',
  sender: 'bot',
  text: 'Salam sejahtera! Saya SmansaBot, asisten informasi resmi SMA Negeri 1 Klaten (Padmawijaya). Silakan pilih topik pertanyaan cepat di bawah atau ketik langsung pertanyaan Anda seputar PPDB, pimpinan, prestasi, ekskul, akreditasi 98, atau sejarah 1957.',
  time: 'Sekarang'
};

function formatCurrentTime(): string {
  const d = new Date();
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

export default function InteractiveSmansaBot({ initialFaq }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Gabungkan knowledge base dari props Astro dan default fallback
  const knowledgeBase = useMemo<FaqItem[]>(() => {
    if (!initialFaq || initialFaq.length === 0) {
      return DEFAULT_KNOWLEDGE;
    }
    const combined = [...initialFaq];
    for (const def of DEFAULT_KNOWLEDGE) {
      if (!combined.some((item) => item.id === def.id)) {
        combined.push(def);
      }
    }
    return combined;
  }, [initialFaq]);

  // Muat riwayat pesan dari sessionStorage saat komponen aktif di client
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // sessionStorage tidak tersedia atau di-block peramban
    }
    setHasLoadedStorage(true);
  }, []);

  // Simpan riwayat percakapan ke sessionStorage
  useEffect(() => {
    if (!hasLoadedStorage) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore quota errors
    }
  }, [messages, hasLoadedStorage]);

  // Bersihkan interval dan timer saat unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, []);

  // Auto scroll saat ada pesan baru atau efek mengetik
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, streamingText]);

  // Pencarian berbasis bobot kata kunci
  const findBestAnswer = (queryText: string): string => {
    const q = queryText.toLowerCase().trim();
    if (!q) return '';

    const words = q.split(/\s+/).filter((w) => w.length > 1);
    let bestMatch: FaqItem | null = null;
    let highestScore = 0;

    for (const item of knowledgeBase) {
      let score = 0;
      const qLower = item.question.toLowerCase();
      const catLower = item.category.toLowerCase();
      const ansLower = item.answer.toLowerCase();

      // Cocokan frasa utuh
      if (qLower.includes(q)) score += 15;
      if (catLower.includes(q)) score += 10;

      // Cocokan kata kunci terdaftar
      for (const kw of item.keywords) {
        const kwLower = kw.toLowerCase();
        if (q.includes(kwLower)) {
          score += 7;
        } else {
          for (const w of words) {
            if (kwLower === w) score += 4;
            else if (kwLower.includes(w) && w.length >= 3) score += 2;
          }
        }
      }

      // Cocokan kata per kata pada pertanyaan dan jawaban
      for (const w of words) {
        if (qLower.includes(w)) score += 3;
        if (ansLower.includes(w)) score += 1;
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (highestScore >= 3 && bestMatch) {
      return bestMatch.answer;
    }

    return `Terima kasih atas pertanyaan Anda. Terkait "${queryText}", informasi spesifik belum tercatat dalam sistem ringkas kami. Silakan menghubungi Sekretariat SMA Negeri 1 Klaten langsung di Jl. Merbabu No. 13 Klaten Selatan, telepon (0272) 321150, atau via email resmi info@sma1klaten.sch.id pada hari dan jam kerja.`;
  };

  // Kirim pertanyaan dan aktifkan typing indicator & typewriter effect
  const handleSend = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: formatCurrentTime()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setStreamingText('');

    const targetAnswer = findBestAnswer(trimmed);
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Durasi jeda indikator mengetik (bouncing dots)
    const thinkDelay = prefersReducedMotion ? 200 : 450;

    typingTimerRef.current = setTimeout(() => {
      if (prefersReducedMotion) {
        const botMsg: ChatMessage = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: targetAnswer,
          time: formatCurrentTime()
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
        setStreamingText('');
        return;
      }

      // Efek typewriter streaming bertahap
      let charIndex = 0;
      const chunkSize = 3; // Mengetik 3 karakter per tick untuk kelancaran
      streamIntervalRef.current = setInterval(() => {
        charIndex += chunkSize;
        if (charIndex >= targetAnswer.length) {
          if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
          const botMsg: ChatMessage = {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: targetAnswer,
            time: formatCurrentTime()
          };
          setMessages((prev) => [...prev, botMsg]);
          setIsTyping(false);
          setStreamingText('');
        } else {
          setStreamingText(targetAnswer.slice(0, charIndex));
        }
      }, 16);
    }, thinkDelay);
  };

  // Reset percakapan dan sessionStorage
  const handleReset = () => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    setIsTyping(false);
    setStreamingText('');
    setMessages([INITIAL_BOT_MESSAGE]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    inputRef.current?.focus();
  };

  // Navigasi scroll ke kotak chat dari tombol mengambang
  const handleScrollToChat = () => {
    const section = document.getElementById('chatbot');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <div className="smansa-chat-window">
        {/* Chat Window Header */}
        <div className="smansa-header">
          <div className="smansa-bot-info">
            <div className="smansa-avatar-badge" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                <rect x="4" y="8" width="16" height="12" rx="3" />
                <circle cx="9" cy="14" r="1.5" fill="currentColor" />
                <circle cx="15" cy="14" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div>
              <span className="smansa-bot-title">SmansaBot AI</span>
              <span className="smansa-bot-status">Asisten resmi SMAN 1 Klaten &middot; client:idle</span>
            </div>
          </div>

          <div className="smansa-header-actions">
            <span className="smansa-badge-local">Basis Data Lokal</span>
            {messages.length > 1 && (
              <button
                type="button"
                className="smansa-reset-btn"
                onClick={handleReset}
                title="Bersihkan riwayat percakapan"
                aria-label="Bersihkan riwayat percakapan"
              >
                Bersihkan
              </button>
            )}
          </div>
        </div>

        {/* Messages Log (Aman XSS: teks murni React JSX) */}
        <div className="smansa-messages-area" role="log" aria-live="polite">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`smansa-msg-row ${msg.sender === 'user' ? 'smansa-msg-user' : 'smansa-msg-bot'}`}
            >
              <div className="smansa-bubble">
                {msg.text.split('\n').map((line, idx) => (
                  <p key={idx} style={{ margin: idx > 0 ? '6px 0 0' : 0 }}>
                    {line}
                  </p>
                ))}
              </div>
              <span className="smansa-timestamp">{msg.time}</span>
            </div>
          ))}

          {/* Typing Indicator & Streaming Buffer */}
          {isTyping && (
            <div className="smansa-msg-row smansa-msg-bot" aria-label="SmansaBot sedang mengetik tanggapan">
              <div className="smansa-bubble smansa-typing-bubble">
                {streamingText ? (
                  <>
                    {streamingText.split('\n').map((line, idx) => (
                      <p key={idx} style={{ margin: idx > 0 ? '6px 0 0' : 0 }}>
                        {line}
                      </p>
                    ))}
                    <span className="smansa-cursor" aria-hidden="true" />
                  </>
                ) : (
                  <div className="smansa-dots-container" aria-hidden="true">
                    <span className="smansa-dot" />
                    <span className="smansa-dot" />
                    <span className="smansa-dot" />
                  </div>
                )}
              </div>
              <span className="smansa-timestamp">Mengetik...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Canned Question Pills */}
        <div className="smansa-pills-bar">
          <span className="smansa-pills-title">Topik Pilihan</span>
          <div className="smansa-pills-list">
            {CANNED_PILLS.map((pill) => (
              <button
                key={pill.label}
                type="button"
                className="smansa-pill"
                onClick={() => handleSend(pill.query)}
                disabled={isTyping}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form
          className="smansa-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
        >
          <input
            ref={inputRef}
            type="text"
            className="smansa-input-field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan syarat PPDB, akreditasi 98, sejarah 1957, atau fasilitas..."
            disabled={isTyping}
            aria-label="Ketik pertanyaan untuk SmansaBot"
            autoComplete="off"
          />
          <button
            type="submit"
            className="smansa-send-button"
            disabled={isTyping || !input.trim()}
            aria-label="Kirim pertanyaan"
          >
            <span>Kirim</span>
          </button>
        </form>
      </div>

      {/* Floating Chatbot Launcher */}
      <div
        className="smansa-floating-launcher"
        role="button"
        tabIndex={0}
        aria-label="Buka SmansaBot AI"
        onClick={handleScrollToChat}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleScrollToChat();
          }
        }}
      >
        <span className="smansa-launcher-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </span>
        <span className="smansa-launcher-label">Tanya SmansaBot</span>
      </div>

      <style>{`
        .smansa-chat-window {
          background-color: var(--neo-surface);
          border: var(--neo-border);
          border-radius: var(--r-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--neo-shadow-lg);
        }

        .smansa-header {
          background-color: var(--dark);
          color: var(--dark-ink);
          padding: 14px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid var(--dark-hairline);
        }

        .smansa-bot-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .smansa-avatar-badge {
          background-color: var(--dark-2);
          border: 1px solid var(--dark-hairline);
          border-radius: var(--r-sm);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-soft);
          flex-shrink: 0;
        }

        .smansa-bot-title {
          display: block;
          font-weight: 600;
          font-size: 0.9375rem;
          color: var(--dark-ink);
          line-height: 1.3;
        }

        .smansa-bot-status {
          display: block;
          font-size: 0.75rem;
          color: var(--dark-ink-muted);
          line-height: 1.3;
        }

        .smansa-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .smansa-badge-local {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.06em;
          background-color: var(--dark-2);
          color: var(--dark-ink);
          padding: 4px 10px;
          border-radius: var(--r-sm);
          white-space: nowrap;
          border: 1px solid var(--dark-hairline);
        }

        .smansa-reset-btn {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.04em;
          background: transparent;
          color: var(--dark-ink-muted);
          border: 1px solid var(--dark-hairline);
          border-radius: var(--r-sm);
          padding: 4px 8px;
          cursor: pointer;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .smansa-reset-btn:hover {
          color: var(--dark-ink);
          border-color: var(--dark-ink-muted);
        }

        .smansa-messages-area {
          padding: 20px;
          min-height: 280px;
          max-height: 420px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
          background-color: var(--paper);
        }

        .smansa-msg-row {
          display: flex;
          flex-direction: column;
          max-width: 84%;
        }

        .smansa-msg-bot {
          align-self: flex-start;
        }

        .smansa-msg-user {
          align-self: flex-end;
        }

        .smansa-bubble {
          padding: 12px 16px;
          border-radius: var(--r-sm);
          font-size: 0.9375rem;
          line-height: 1.55;
          word-break: break-word;
        }

        .smansa-msg-bot .smansa-bubble {
          background-color: var(--surface);
          color: var(--ink);
          border: 1px solid var(--hairline);
        }

        .smansa-msg-user .smansa-bubble {
          background-color: var(--accent);
          color: var(--on-accent);
        }

        .smansa-typing-bubble {
          background-color: var(--surface);
          border: 1px solid var(--hairline);
          color: var(--ink);
        }

        .smansa-timestamp {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3);
          margin-top: 4px;
          padding: 0 2px;
        }

        .smansa-msg-user .smansa-timestamp {
          align-self: flex-end;
        }

        .smansa-dots-container {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 2px;
        }

        .smansa-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--ink-3);
          animation: smansaDotBounce 1.2s infinite ease-in-out;
        }

        .smansa-dot:nth-child(1) { animation-delay: 0s; }
        .smansa-dot:nth-child(2) { animation-delay: 0.2s; }
        .smansa-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes smansaDotBounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          40% {
            transform: translateY(-5px);
            opacity: 1;
          }
        }

        .smansa-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background-color: var(--accent);
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: smansaBlink 0.8s infinite;
        }

        @keyframes smansaBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .smansa-pills-bar {
          padding: 12px 20px;
          background-color: var(--surface);
          border-top: 1px solid var(--hairline);
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .smansa-pills-title {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-3);
        }

        .smansa-pills-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .smansa-pill {
          background-color: var(--paper);
          border: 1px solid var(--hairline-2);
          color: var(--ink-2);
          font-size: 0.8125rem;
          font-weight: 500;
          padding: 5px 12px;
          border-radius: var(--r-sm);
          cursor: pointer;
          transition: border-color 0.18s ease, color 0.18s ease, background-color 0.18s ease;
        }

        .smansa-pill:hover:not(:disabled) {
          border-color: var(--accent);
          color: var(--accent);
          background-color: var(--accent-soft);
        }

        .smansa-pill:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .smansa-input-form {
          padding: 12px 20px;
          background-color: var(--surface);
          border-top: 1px solid var(--hairline);
          display: flex;
          gap: 10px;
        }

        .smansa-input-field {
          flex: 1;
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          padding: 10px 14px;
          border: 1px solid var(--hairline-2);
          border-radius: var(--r-sm);
          background-color: var(--paper);
          color: var(--ink);
          outline: none;
          transition: border-color 0.18s ease;
        }

        .smansa-input-field::placeholder {
          color: var(--ink-3);
        }

        .smansa-input-field:focus {
          border-color: var(--accent);
        }

        .smansa-send-button {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          font-weight: 500;
          padding: 10px 20px;
          border-radius: var(--r-sm);
          background-color: var(--accent);
          color: var(--on-accent);
          border: 1px solid transparent;
          cursor: pointer;
          transition: background-color 0.18s ease, opacity 0.18s ease;
        }

        .smansa-send-button:hover:not(:disabled) {
          background-color: var(--accent-ink);
        }

        .smansa-send-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .smansa-floating-launcher {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background-color: var(--dark);
          color: var(--dark-ink);
          padding: 10px 16px;
          border-radius: var(--r-sm);
          box-shadow: var(--shadow-2);
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          z-index: 60;
          font-weight: 500;
          font-size: 0.8125rem;
          border: 1px solid var(--dark-hairline);
          transition: background-color 0.2s ease, transform 0.15s ease;
        }

        .smansa-floating-launcher:hover {
          background-color: var(--dark);
          transform: translateY(-1px);
        }

        .smansa-launcher-icon {
          display: flex;
          align-items: center;
          color: var(--accent-soft);
        }

        @media (max-width: 600px) {
          .smansa-pills-bar {
            flex-direction: column;
            align-items: flex-start;
          }
          .smansa-floating-launcher .smansa-launcher-label {
            display: none;
          }
          .smansa-floating-launcher {
            padding: 12px;
            border-radius: var(--r-sm);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .smansa-dot {
            animation: none !important;
          }
          .smansa-cursor {
            animation: none !important;
          }
          .smansa-floating-launcher {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
