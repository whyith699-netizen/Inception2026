# Google DESIGN.md Specification: SMAN 1 Klaten - INCEPTION 2026
**Tim Perancang:** RANDOM KID (SMA Negeri 1 Klaten)  
**Anggota Tim:** Muhammad Agha Prabswara, Radithya Asadel Narendra, Jalu Budi Dhamarsakti, Miftahu Roifu Valda Anam  
**Kompetisi:** INCEPTION 2026

## 1. Overview
Sistem desain web profil resmi dan Chatbot AI SMA Negeri 1 Klaten (SMANSA Klaten). Mengadopsi estetika Neo-Editorial Akademik modern dengan palet warna berbobot hangat, kontras tinggi yang ramah pembaca, tipografi berkarakter (Fraunces + Plus Jakarta Sans), dan nol elemen klise AI (anti-slop).

## 2. Token Specification

### Colors
- `background`: `#FBF8F2` (Warm cream canvas, WCAG AA compliant)
- `text-primary`: `#221610` (Deep chocolate brown, rasio kontras 14.8:1)
- `text-secondary`: `#5C4D44` (Muted umber brown, rasio kontras 6.2:1)
- `accent-coral`: `#E85A38` (Terracotta/Coral red untuk CTA & tombol aksi utama, rasio kontras 4.7:1)
- `accent-coral-hover`: `#D14929`
- `accent-yellow`: `#F9BC2C` (Sun yellow untuk highlight agenda & chatbot badge)
- `accent-green`: `#3BA85C` (Kelly green untuk modul sains, riset & status operasional)
- `accent-blue`: `#3B88C8` (Sky blue untuk modul wawasan global & bahasa)
- `surface`: `#FFFFFF` (Card container utama)
- `surface-muted`: `#F3EDE2` (Container sekunder)
- `border-subtle`: `#E5DACB` (Hairline separator solid 1px)
- `dark-ribbon`: `#221610` (Bilah kontras statistik & footer institusional)
- `dark-ribbon-text`: `#FBF8F2`

### Typography
- Mathematical Scale: 1.250 (Major Third)
- Heading Family: `'Fraunces', Georgia, serif` (Karakter akademik berwibawa, letter-spacing: -0.02em, line-height: 1.15)
- Body Family: `'Plus Jakarta Sans', system-ui, sans-serif` (Keterbacaan tinggi untuk informasi detail, line-height: 1.6)
- Monospace Family: `'Space Mono', monospace` (Untuk kode NPSN, akreditasi, dan telemetry/data bot)

### Components & Radii
- Pill buttons: `border-radius: 9999px`
- Interactive cards: `border-radius: 24px`
- Chatbot floating widget: `border-radius: 20px`, containment hairline border `1px solid var(--color-border)`

## 3. Aturan Anti-Slop (Do's & Don'ts)
- **Do:** Cantumkan fakta riil SMAN 1 Klaten (NPSN 20309689, Akreditasi A, berdiri 1957, alamat Jl. Merbabu No. 13 Klaten).
- **Do:** Gunakan CTA berorientasi tindakan nyata ("Buka Chatbot SmansaBot ↗", "Unduh Alur PPDB 2026 ↗").
- **Don't:** Dilarang menggunakan gradien neon ungu/pink sintetis khas template AI generic.
- **Don't:** Dilarang menggunakan kata klise hampa ("unleash your potential", "supercharge your future", "seamless AI experience").
