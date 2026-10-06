import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = false;

interface ChatRequestBody {
  message?: string;
  history?: Array<{
    sender: 'user' | 'bot';
    text: string;
  }>;
}

const SYSTEM_INSTRUCTION = `Kamu adalah SmansaBot AI, asisten virtual dan duta digital resmi SMA Negeri 1 Klaten (Padmawijaya).
Informasi Resmi SMAN 1 Klaten:
- NPSN: 20309676, NSS: 301046002001.
- Berdiri: 5 November 1957.
- Akreditasi: A (Unggul) dengan Nilai 98 dari BAN-SM.
- Alamat Kampus: Jl. Merbabu No. 13, Klaten Selatan, Jawa Tengah 57423. Telepon: (0272) 321150. Email: smansa_klaten@yahoo.com / info@sma1klaten.sch.id.
- Kepala Sekolah: Ibu Tantri Ambarsari, S.Pd., M.Eng.
- Wakasek: Kurikulum (FX. Febriyanto Adi Nugroho, S.Si.), Kesiswaan (Bambang Budianto, S.Pd.), Sarpras (Agus Purnama, S.Pd.), Humas (Resmiyati, S.Pd., M.Pd.).
- Komite Sekolah: Drs. Sumargana, M.S.
- Rombongan Belajar: 33 rombel (Fase E X, Fase F XI, Fase F XII) dengan kurikulum Kurikulum Merdeka.
- Ekstrakurikuler: 23 ekstrakurikuler resmi (OSMANSA, MPK, Dewan Ambalan, PRATA, EMAPALA, RECSA, ROMANSA, PERSIK, PERKASA, Sakla Music, Sakla Voice, Sparkle, TSL, DACO, Al-Zamartanabil, KIR, JUJU, EC, SECURE, Icomsa, SNAPSHOT, Futsal, Smansa Eagles).
- Prestasi: Rekam jejak medali OSN Matematika, Fisika, Astronomi, Kebumian, FLS2N, O2SN.
- Lulusan & Alumni: >90% tembus PTN favorit (UGM, ITB, UI, UNDIP, UNS, UNAIR, ITS). Organisasi Alumni resmi: KAPASSKA. Program beasiswa alumni terkemuka: Beasiswa Angkatan 1976 (total Rp18.000.000 untuk 12 siswa).
- Tokoh Alumni: Prof. Ir. Sudjarwadi, M.Eng., Ph.D. (Rektor UGM 2007-2012), Prof. Dr. Sudharto P. Hadi (Rektor UNDIP 2010-2014), Syamsul Hadi, S.H. (Bupati Klaten 1995-2000), Dr. dr. Eka Julianta Wahjoepramono (Dokter Spesialis Bedah Saraf Dunia), Prof. Hari Muhammad (Dekan FTMD ITB).
- PPDB 2026: 4 Jalur (Zonasi min 55%, Afirmasi min 20%, Prestasi maks 20%, Perpindahan Orang Tua maks 5%).
- Gaya Respon: Sopan, ramah, antusias, ringkas, jelas, akurat, informatif, bernuansa cerdas khas Neobrutalisme modern berwibawa. Berikan informasi yang faktual sesuai data di atas.`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json().catch(() => ({}))) as ChatRequestBody;
    const userQuery = (body.message || '').trim();

    if (!userQuery) {
      return new Response(
        JSON.stringify({
          error: 'Pesan tidak boleh kosong',
          answer: 'Silakan ketik pertanyaan seputar SMA Negeri 1 Klaten.'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';

    // Coba panggil Google AI Studio (Gemini Flash) jika API KEY tersedia
    if (geminiKey) {
      try {
        const contents: any[] = [];

        // Masukkan riwayat percakapan jika ada
        if (Array.isArray(body.history) && body.history.length > 0) {
          const recent = body.history.slice(-6);
          for (const item of recent) {
            contents.push({
              role: item.sender === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }]
            });
          }
        }

        // Masukkan pesan terbaru pengguna
        contents.push({
          role: 'user',
          parts: [{ text: userQuery }]
        });

        // Request ke Google Gemini API (gemini-2.0-flash / gemini-1.5-flash)
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const geminiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }]
            },
            contents,
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 600,
              topP: 0.95
            }
          })
        });

        clearTimeout(timeoutId);

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const generatedText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (generatedText && typeof generatedText === 'string') {
            return new Response(
              JSON.stringify({
                source: 'gemini',
                model: 'gemini-2.0-flash',
                answer: generatedText.trim()
              }),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
          }
        }
      } catch (geminiErr) {
        // Fallback otomatis ke knowledge base lokal bila terjadi kendala jaringan/timeout
        console.warn('Gemini API call failed, falling back to local KB:', geminiErr);
      }
    }

    // Fallback Cerdas: Pencarian Berbasis Knowledge Base Lokal & Berita
    const faqList = await getCollection('faq').catch(() => []);
    const q = userQuery.toLowerCase();
    const words = q.split(/\s+/).filter((w) => w.length > 1);

    let bestMatch: any = null;
    let highestScore = 0;

    for (const item of faqList) {
      let score = 0;
      const data = item.data;
      const qLower = (data.question || '').toLowerCase();
      const catLower = (data.category || '').toLowerCase();
      const ansLower = (data.answer || '').toLowerCase();

      if (qLower.includes(q)) score += 20;
      if (catLower.includes(q)) score += 12;

      for (const kw of data.keywords || []) {
        const kwLower = kw.toLowerCase();
        if (q.includes(kwLower)) {
          score += 8;
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
        bestMatch = data;
      }
    }

    if (highestScore >= 3 && bestMatch) {
      return new Response(
        JSON.stringify({
          source: 'local-kb',
          category: bestMatch.category,
          answer: bestMatch.answer
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fallback jawaban standar dengan informasi kontak akurat
    const defaultResponse = `Terima kasih atas pertanyaan Anda tentang "${userQuery}". Informasi spesifik tersebut belum tercatat lengkap dalam rangkuman ringkas kami. Untuk informasi langsung dan validasi berkas, silakan hubungi Sekretariat SMA Negeri 1 Klaten di Jl. Merbabu No. 13 Klaten Selatan, Telepon (0272) 321150, atau melalui email smansa_klaten@yahoo.com pada hari kerja (Senin–Jumat).`;

    return new Response(
      JSON.stringify({
        source: 'local-fallback',
        answer: defaultResponse
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: 'Terjadi kesalahan pada server AI',
        details: err?.message || String(err)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
