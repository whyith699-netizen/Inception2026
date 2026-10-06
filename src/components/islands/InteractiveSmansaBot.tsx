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

const STORAGE_KEY = 'smansabot_chat_history_v2';

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
      'padmawijaya', 'visi', 'misi', 'slogan', 'hebat jaya', 'semboyan'
    ],
    question: 'Bagaimana sejarah pendirian 1957, akreditasi nilai 98, dan identitas resmi SMA Negeri 1 Klaten?',
    answer: 'SMA Negeri 1 Klaten (dikenal sebagai Padmawijaya) didirikan pada tanggal 5 November 1957 dan beralamat di Jl. Merbabu No. 13, Klaten Selatan, Jawa Tengah (Kode Pos 57423, Telp 0272-321150). Sekolah ber-NPSN 20309676 dengan predikat Akreditasi A (Unggul) bernilai 98 dari BAN-SM. Slogan sekolah: "SMA Negeri 1 Klaten Berkarakter Hebat Jaya". Visi: "Terwujudnya lulusan yang religius, cerdas, berkarakter, berbudi pekerti luhur, berdaya saing global dan beretika lingkungan".'
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
      'ui', 'undip', 'uns', 'unair', 'its', 'kelulusan', 'snbp', 'snbt', 'iup', 'beasiswa', '1976'
    ],
    question: 'Bagaimana rekam jejak prestasi OSN dan sebaran alumni SMA Negeri 1 Klaten di PTN?',
    answer: 'SMA Negeri 1 Klaten secara konsisten meraih medali emas dan perak dalam Olimpiade Sains Nasional (OSN) bidang Matematika, Fisika, Astronomi, dan Kebumian, serta ajang FLS2N dan O2SN tingkat nasional. Lebih dari 90% lulusan setiap tahunnya diterima di PTN terkemuka seperti UGM, ITB, UI, UNDIP, UNS, UNAIR, dan ITS. Wadah komunikasi alumni resmi berhimpun dalam KAPASSKA dengan program unggulan Beasiswa Angkatan 1976 (total Rp18.000.000 untuk 12 siswa).'
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
  }
];

const CANNED_PILLS = [
  { label: 'Syarat PPDB 2026', query: 'Apa saja syarat dan jalur PPDB SMA Negeri 1 Klaten?' },
  { label: 'Akreditasi & Sejarah', query: 'Kapan SMA Negeri 1 Klaten didirikan dan apa akreditasinya?' },
  { label: 'Kepala Sekolah', query: 'Siapa nama Kepala Sekolah dan Wakil Kepala Sekolah?' },
  { label: '23 Ekskul Resmi', query: 'Apa saja 23 ekstrakurikuler di SMAN 1 Klaten?' },
  { label: 'Beasiswa Alumni', query: 'Bagaimana program Beasiswa Alumni KAPASSKA Angkatan 1976?' }
];

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'b-init',
  sender: 'bot',
  text: 'Halo! Saya SmansaBot AI, asisten digital resmi SMA Negeri 1 Klaten (Padmawijaya). Ada yang bisa saya bantu terkait informasi PPDB, profil sekolah (sejak 1957, Akreditasi A-98), direktori guru, atau ekstrakurikuler?',
  time: 'Sekarang'
};

const formatCurrentTime = (): string => {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
};

export const InteractiveSmansaBot: React.FC<Props> = ({ initialFaq }) => {
  const knowledgeBase = useMemo(() => {
    return initialFaq && initialFaq.length > 0 ? initialFaq : DEFAULT_KNOWLEDGE;
  }, [initialFaq]);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [engineSource, setEngineSource] = useState<'gemini' | 'local'>('local');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesAreaRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Muat riwayat percakapan dari sessionStorage saat awal
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // ignore
    }
    setHasLoadedStorage(true);
  }, []);

  // Simpan riwayat percakapan ke sessionStorage
  useEffect(() => {
    if (!hasLoadedStorage) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages, hasLoadedStorage]);

  // Listener global: CustomEvent 'open-smansabot' dan Escape key
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('open-smansabot', handleOpenEvent);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-smansabot', handleOpenEvent);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Bersihkan timer saat unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, []);

  // Perbaikan Scroll: HANYA scroll di dalam container chat saat modal aktif dibuka
  // TIDAK scroll window browser halaman utama!
  useEffect(() => {
    if (!isOpen) return;
    if (messagesAreaRef.current) {
      messagesAreaRef.current.scrollTop = messagesAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping, streamingText, isOpen]);

  // Pencarian lokal fallback berbasis bobot kata kunci
  const findLocalAnswer = (queryText: string): string => {
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

      if (qLower.includes(q)) score += 15;
      if (catLower.includes(q)) score += 10;

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

    return `Terima kasih atas pertanyaan Anda tentang "${queryText}". Terkait informasi spesifik tersebut, silakan menghubungi Sekretariat SMA Negeri 1 Klaten di Jl. Merbabu No. 13 Klaten Selatan, Telepon (0272) 321150 atau email resmi smansa_klaten@yahoo.com pada hari kerja.`;
  };

  // Kirim pertanyaan ke backend /api/chat dengan fallback otomatis ke basis data lokal
  const handleSend = async (textToSend: string) => {
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

    let finalAnswer = '';
    let sourceMode: 'gemini' | 'local' = 'local';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-5).map((m) => ({ sender: m.sender, text: m.text }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.answer) {
          finalAnswer = data.answer;
          sourceMode = data.source === 'gemini' ? 'gemini' : 'local';
        } else {
          finalAnswer = findLocalAnswer(trimmed);
        }
      } else {
        finalAnswer = findLocalAnswer(trimmed);
      }
    } catch {
      finalAnswer = findLocalAnswer(trimmed);
    }

    setEngineSource(sourceMode);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const thinkDelay = prefersReducedMotion ? 150 : 350;

    typingTimerRef.current = setTimeout(() => {
      if (prefersReducedMotion) {
        const botMsg: ChatMessage = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: finalAnswer,
          time: formatCurrentTime()
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
        setStreamingText('');
        return;
      }

      let charIndex = 0;
      const chunkSize = 4;
      streamIntervalRef.current = setInterval(() => {
        charIndex += chunkSize;
        if (charIndex >= finalAnswer.length) {
          if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
          const botMsg: ChatMessage = {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: finalAnswer,
            time: formatCurrentTime()
          };
          setMessages((prev) => [...prev, botMsg]);
          setIsTyping(false);
          setStreamingText('');
        } else {
          setStreamingText(finalAnswer.slice(0, charIndex));
        }
      }, 14);
    }, thinkDelay);
  };

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

  const toggleModal = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  };

  return (
    <>
      {/* Floating Action Button: persegi, border tebal, hard shadow */}
      <aside aria-label="Widget Asisten SmansaBot AI" className="sb-launcher-wrap">
        <button
          type="button"
          onClick={toggleModal}
          aria-label={isOpen ? 'Tutup Asisten SmansaBot AI' : 'Buka Asisten SmansaBot AI'}
          aria-expanded={isOpen}
          className="sb-launcher"
        >
          <span className="sb-launcher-title">SmansaBot AI</span>
          <span className="sb-launcher-sub">{isOpen ? 'Tutup panel' : 'Tanya SMANSA'}</span>
        </button>
      </aside>

      {/* Floating Modal Dialog Window */}
      {isOpen && (
        <aside aria-label="Jendela Chat SmansaBot AI" className="sb-panel">
          <div className="sb-head">
            <div className="sb-head-main">
              <span className="sb-head-title">SmansaBot AI</span>
              <span className="sb-head-sub">Asisten Resmi SMAN 1 Klaten</span>
            </div>
            <span className={`sb-badge ${engineSource === 'gemini' ? 'sb-badge--gemini' : 'sb-badge--local'}`}>
              {engineSource === 'gemini' ? 'Gemini 2.0 Flash' : 'Basis Data Lokal'}
            </span>
          </div>

          <div className="sb-head-actions">
            {messages.length > 1 && (
              <button type="button" className="sb-btn-quiet" onClick={handleReset}>
                Bersihkan
              </button>
            )}
            <button
              type="button"
              className="sb-btn-close"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup jendela chat"
            >
              Tutup
            </button>
          </div>

          {/* Messages log: scroll container internal, halaman tidak ikut bergerak */}
          <div className="sb-log" role="log" aria-live="polite" ref={messagesAreaRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`sb-row ${msg.sender === 'user' ? 'sb-row--user' : 'sb-row--bot'}`}>
                <div className="sb-meta">
                  <span className="sb-sender">{msg.sender === 'user' ? 'Anda' : 'SmansaBot'}</span>
                  <span className="sb-time">{msg.time}</span>
                </div>
                <div className="sb-bubble">
                  {msg.text.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="sb-row sb-row--bot" aria-label="SmansaBot sedang mengetik tanggapan">
                <div className="sb-meta">
                  <span className="sb-sender">SmansaBot</span>
                  <span className="sb-time">Mengetik</span>
                </div>
                <div className="sb-bubble">
                  {streamingText ? (
                    <>
                      {streamingText.split('\n').map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </>
                  ) : (
                    <span className="sb-typing">...</span>
                  )}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Topik cepat */}
          <div className="sb-topics">
            <span className="sb-topics-label">Topik</span>
            <div className="sb-topics-list">
              {CANNED_PILLS.map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  className="sb-pill"
                  onClick={() => handleSend(pill.query)}
                  disabled={isTyping}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          <form
            className="sb-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              className="sb-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya PPDB, akreditasi, ekskul..."
              disabled={isTyping}
              aria-label="Ketik pertanyaan untuk SmansaBot"
              autoComplete="off"
            />
            <button type="submit" className="sb-send" disabled={isTyping || !input.trim()}>
              Kirim
            </button>
          </form>
        </aside>
      )}

      <style>{`
        .sb-launcher-wrap {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 50;
        }

        .sb-launcher {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          padding: 10px 16px;
          border: 3px solid var(--neo-ink);
          background-color: var(--neon-lime);
          color: var(--neo-ink);
          cursor: pointer;
          box-shadow: var(--neo-shadow);
          transition: transform 0.1s ease, box-shadow 0.1s ease, background-color 0.15s ease;
        }

        .sb-launcher:hover {
          background-color: var(--neon-yellow);
          transform: translate(-2px, -2px);
          box-shadow: var(--neo-shadow-lg);
        }

        .sb-launcher:active {
          transform: translate(2px, 2px);
          box-shadow: var(--neo-shadow-sm);
        }

        .sb-launcher-title {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.8125rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          line-height: 1.1;
        }

        .sb-launcher-sub {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          line-height: 1.2;
          color: var(--neo-ink);
        }

        .sb-panel {
          position: fixed;
          right: 20px;
          bottom: 92px;
          z-index: 50;
          width: calc(100vw - 40px);
          max-width: 420px;
          max-height: min(76dvh, 640px);
          display: flex;
          flex-direction: column;
          border: 3px solid var(--neo-ink);
          background-color: var(--neo-surface);
          box-shadow: var(--neo-shadow-lg);
          overflow: hidden;
        }

        .sb-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          border-bottom: 2px solid var(--neo-ink);
          background-color: var(--neo-ink);
        }

        .sb-head-main {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sb-head-title {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #FFFFFF;
          line-height: 1.2;
        }

        .sb-head-sub {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: #D9DCE2;
          line-height: 1.3;
        }

        .sb-badge {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 4px 8px;
          border: 2px solid var(--neo-ink);
          color: var(--neo-ink);
          white-space: nowrap;
        }

        .sb-badge--gemini { background-color: var(--neon-cyan); }
        .sb-badge--local { background-color: var(--neon-lime); }

        .sb-head-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          padding: 8px 14px;
          border-bottom: 2px solid var(--neo-ink);
          background-color: var(--neo-surface-2);
        }

        .sb-btn-quiet,
        .sb-btn-close {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 6px 10px;
          border: 2px solid var(--neo-ink);
          color: var(--neo-ink);
          background-color: var(--neo-surface);
          cursor: pointer;
        }

        .sb-btn-quiet:hover { background-color: var(--neon-yellow); }
        .sb-btn-close { background-color: var(--neon-magenta); color: #FFFFFF; }
        .sb-btn-close:hover { background-color: var(--neo-ink); }

        .sb-log {
          flex: 1;
          overflow-y: auto;
          padding: 14px;
          background-color: var(--neo-bg);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sb-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-width: 92%;
        }

        .sb-row--user { align-self: flex-end; align-items: flex-end; }
        .sb-row--bot { align-self: flex-start; align-items: flex-start; }

        .sb-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--neo-ink-3);
        }

        .sb-sender { font-weight: 700; }

        .sb-bubble {
          padding: 10px 12px;
          border: 2px solid var(--neo-ink);
          background-color: var(--neo-surface);
          color: var(--neo-ink);
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          line-height: 1.6;
        }

        .sb-bubble p + p { margin-top: 6px; }

        .sb-row--user .sb-bubble {
          background-color: var(--neon-cyan);
          box-shadow: 3px 3px 0px var(--neo-ink);
        }

        .sb-row--bot .sb-bubble {
          box-shadow: 3px 3px 0px rgba(17, 20, 24, 0.25);
        }

        .sb-typing { font-family: var(--font-mono); font-weight: 700; }

        .sb-topics {
          padding: 10px 14px;
          border-top: 2px solid var(--neo-ink);
          background-color: var(--neo-surface);
        }

        .sb-topics-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--neo-ink-3);
          margin-bottom: 6px;
        }

        .sb-topics-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .sb-pill {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 5px 9px;
          border: 2px solid var(--neo-ink);
          background-color: var(--neo-surface);
          color: var(--neo-ink);
          cursor: pointer;
        }

        .sb-pill:hover { background-color: var(--neon-lime); }
        .sb-pill:disabled { opacity: 0.5; cursor: not-allowed; }

        .sb-form {
          display: flex;
          gap: 8px;
          padding: 12px 14px;
          border-top: 2px solid var(--neo-ink);
          background-color: var(--neo-surface-2);
        }

        .sb-input {
          flex: 1;
          min-width: 0;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          padding: 9px 10px;
          border: 2px solid var(--neo-ink);
          background-color: var(--neo-surface);
          color: var(--neo-ink);
        }

        .sb-input::placeholder { color: var(--neo-ink-3); }
        .sb-input:focus { outline: none; box-shadow: inset 0 0 0 2px var(--neon-cyan); }

        .sb-send {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 9px 14px;
          border: 2px solid var(--neo-ink);
          background-color: var(--neon-lime);
          color: var(--neo-ink);
          box-shadow: var(--neo-shadow-sm);
          cursor: pointer;
        }

        .sb-send:hover { background-color: var(--neon-yellow); }
        .sb-send:active { transform: translate(2px, 2px); box-shadow: none; }
        .sb-send:disabled { opacity: 0.5; cursor: not-allowed; }

        @media (max-width: 640px) {
          .sb-panel { right: 12px; bottom: 88px; width: calc(100vw - 24px); }
        }
      `}</style>
    </>
  );
};

export default InteractiveSmansaBot;
