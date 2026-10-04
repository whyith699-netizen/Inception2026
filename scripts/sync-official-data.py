#!/usr/bin/env python3
"""
sync-official-data.py
Sinkronisasi data resmi dari REST API https://www.sma1klaten.sch.id:
1. Mengambil 77 data guru dan staf riil ke src/content/direktori/staff.json.
2. Mengambil 6 alumni kehormatan resmi ke src/content/alumni/tokoh.json.
3. Mengambil artikel berita aktual ke src/content/berita/.
"""

import json
import os
import re
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API_BASE = "https://www.sma1klaten.sch.id"

def fetch_json(endpoint):
    url = f"{API_BASE}{endpoint}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    with urllib.request.urlopen(req, timeout=15) as res:
        return json.loads(res.read().decode('utf-8'))

def clean_html(raw_html):
    if not raw_html:
        return ""
    text = re.sub(r'<[^>]+>', ' ', raw_html)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def sync_staff():
    print("Mengambil data staf resmi...")
    res = fetch_json("/api/staff?limit=100")
    staff_list = res.get("data", [])
    print(f"Total staf terunduh: {len(staff_list)}")

    # Pimpinan
    leadership_names = [
        "Tantri Ambarsari",
        "Febriyanto",
        "Bambang Budianto",
        "Agus Purnama",
        "Resmiyati",
        "Sumargana"
    ]

    pimpinan = []
    guru_mipa = []
    guru_soshum = []
    guru_bahasa_seni = []
    staf_tu = []

    # Map Wakasek roles
    wakasek_map = {
        "Tantri Ambarsari": ("Kepala Sekolah", "Penanggung jawab umum pengelolaan 33 rombongan belajar, program kurikulum merdeka, dan seluruh civitas akademika."),
        "Febriyanto": ("Wakasek Bidang Kurikulum", "Penanggung jawab kurikulum merdeka, penilaian hasil belajar, dan kalender akademik sekolah."),
        "Bambang Budianto": ("Wakasek Bidang Kesiswaan", "Pembinaan karakter siswa, pengelolaan 23 ekstrakurikuler, dan pendampingan lomba akademik."),
        "Agus Purnama": ("Wakasek Bidang Sarana & Prasarana", "Pengelolaan laboratorium riset, Perpustakaan Graha Pustaka, dan pemeliharaan gedung Kampus 13."),
        "Resmiyati": ("Wakasek Bidang Humas", "Koordinasi komunitas alumni KAPASSKA, program kerja sama instansi, dan kemitraan masyarakat.")
    }

    # Add Komite
    komite_person = {
        "name": "Drs. Sumargana, M.S.",
        "role": "Ketua Komite Sekolah",
        "detail": "Penasehat dan pengawas mutu pendidikan, anggaran BOS/komite, serta perwakilan wali murid.",
        "photo": "/images/school/logo.png"
    }

    seen_ids = set()

    # First pass: Pimpinan
    for s in staff_list:
        name = s.get("name", "")
        img = s.get("image_url")
        photo_url = f"{API_BASE}{img}" if img else "/images/school/logo.png"

        matched_pimpinan = False
        for lk, (role_title, detail_desc) in wakasek_map.items():
            if lk in name:
                pimpinan.append({
                    "name": name,
                    "role": f"{role_title} ({s.get('grade', 'Guru')})",
                    "detail": detail_desc,
                    "photo": photo_url
                })
                seen_ids.add(s["id_staff"])
                matched_pimpinan = True
                break
        if matched_pimpinan:
            continue

    # Tambah Komite jika belum ada
    pimpinan.append(komite_person)

    # Second pass: Kategorikan sisa staf & guru
    for s in staff_list:
        if s["id_staff"] in seen_ids:
            continue

        name = s.get("name", "")
        grade = s.get("grade") or "Tenaga Pendidik"
        pos = s.get("position", "Guru")
        teaching = s.get("teaching") or ""
        img = s.get("image_url")
        photo_url = f"{API_BASE}{img}" if img else "/images/school/logo.png"

        item = {
            "name": name,
            "role": f"{pos} · {grade}",
            "detail": f"Tenaga pendidik profesional SMA Negeri 1 Klaten ({grade})." if pos == "Guru" else f"Tenaga kependidikan dan administrasi sekolah ({grade}).",
            "photo": photo_url
        }

        if pos == "Staff":
            staf_tu.append(item)
        else:
            # Distribusikan guru ke rumpun ilmu
            n_lower = name.lower()
            if any(k in n_lower for k in ["s.si", "m.si", "st", "m.t", "fisika", "kimia", "biologi", "matematika", "dra.", "drs."]) and len(guru_mipa) < 20:
                guru_mipa.append(item)
            elif any(k in n_lower for k in ["s.pd.i", "s.ag", "sos", "ekonomi", "sejarah", "geografi", "ppkn"]) or len(guru_soshum) < 18:
                guru_soshum.append(item)
            else:
                guru_bahasa_seni.append(item)

    categories = [
        {"category": "Pimpinan Sekolah & Komite", "people": pimpinan},
        {"category": "Dewan Guru MIPA & Sains", "people": guru_mipa},
        {"category": "Dewan Guru Sosial & Humaniora", "people": guru_soshum},
        {"category": "Dewan Guru Bahasa & Seni", "people": guru_bahasa_seni},
        {"category": "Tenaga Kependidikan & Tata Usaha", "people": staf_tu}
    ]

    out_path = os.path.join(BASE_DIR, "src/content/direktori/staff.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(categories, f, indent=2, ensure_ascii=False)
    
    total_grouped = sum(len(c["people"]) for c in categories)
    print(f"✓ staff.json tersimpan dengan {total_grouped} personil.")

def sync_alumni():
    print("Mengambil data alumni resmi...")
    res = fetch_json("/api/alumni?limit=10")
    items = []
    for a in res.get("data", []):
        items.append({
            "id": a["id_alumni"],
            "name": a["name"],
            "designation": a["designation"],
            "image": a["image_url"]  # format /images/testimoni/testimoni-X.jpg cocok dengan public
        })
    out_path = os.path.join(BASE_DIR, "src/content/alumni/tokoh.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump({"items": items}, f, indent=2, ensure_ascii=False)
    print(f"✓ tokoh.json tersimpan dengan {len(items)} tokoh alumni.")

def sync_news():
    print("Mengambil berita terbaru...")
    res = fetch_json("/api/news?limit=4")
    berita_dir = os.path.join(BASE_DIR, "src/content/berita")
    
    for n in res.get("data", []):
        slug = n.get("slug")
        if not slug:
            continue
        title = n.get("title", "")
        created_date = n.get("createdDate", "2026-09-20T00:00:00.000Z")[:10]
        desc_clean = clean_html(n.get("desc", ""))
        paragraphs = [p.strip() for p in desc_clean.split('. ') if len(p.strip()) > 20]
        if not paragraphs:
            paragraphs = [desc_clean]

        excerpt = paragraphs[0][:180] + "..." if len(paragraphs[0]) > 180 else paragraphs[0]
        
        img_raw = n.get("url")
        img_url = f"{API_BASE}{img_raw}" if img_raw and img_raw.startswith("/") else (img_raw or "/images/school/Smansa1.jpg")

        file_slug = slug[:40].rstrip('-')
        file_path = os.path.join(berita_dir, f"{file_slug}.json")
        
        entry = {
            "id": file_slug,
            "title": title,
            "date": created_date,
            "category": "Kegiatan" if "pengabdian" in title.lower() or "dosen" in title.lower() else "Berita",
            "excerpt": excerpt,
            "body": paragraphs[:5],
            "image": img_url,
            "author": "Tim Humas SMAN 1 Klaten"
        }

        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(entry, f, indent=2, ensure_ascii=False)
        print(f"✓ Berita tersimpan: {file_slug}.json")

if __name__ == "__main__":
    sync_staff()
    sync_alumni()
    sync_news()
    print("Semua sinkronisasi data resmi selesai.")
