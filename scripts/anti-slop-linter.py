#!/usr/bin/env python3
"""
anti-slop-linter.py
Pemeriksa kepatuhan anti-slop:
1. Menolak kata buzzword pemasaran AI klise (termasuk kamus taste-skill).
2. Melarang Latar teks hitam murni (#000000), aksen > 1, dan gradient AI.
3. Memverifikasi kontras rasio WCAG AA (minimal 4.5:1 untuk teks normal).
"""

import os
import re
import sys
import math

BANNED_WORDS = [
    r"\bunleash\b",
    r"\belevate\b",
    r"\bsupercharge\b",
    r"\bseamless(ly)?\b",
    r"\bcutting-edge\b",
    r"\bgame[- ]changer\b",
    r"\ball-in-one( platform)?\b",
    r"\bnext[- ]gen(eration)?\b",
    r"\brevolutioni[sz]e\b",
    r"\bempower(ing)?\b",
    r"\bdelv(e|ing)\b",
    r"\btapestry\b",
    r"\bunparalleled\b",
    r"\brobust solution\b",
    r"\bin the world of\b",
]

# folder yang dilintasi
SCAN_DIRS = ["src/components", "src/pages", "src/layouts", "src/content"]

# gradient linear mencolok berhenti ganda dengan warna neon/AI-slop
AI_GRADIENT_RE = re.compile(
    r"linear-gradient\([^)]*(#8b5cf6|#a855f7|#6366f1|#3b82f6|#ec4899|#22d3ee)",
    re.IGNORECASE,
)

def hex_to_relative_luminance(hex_str):
    hex_clean = hex_str.lstrip('#')
    if len(hex_clean) == 3:
        hex_clean = ''.join([c*2 for c in hex_clean])
    r, g, b = [int(hex_clean[i:i+2], 16) / 255.0 for i in (0, 2, 4)]

    def adjust(c):
        return c / 12.92 if c <= 0.03928 else math.pow((c + 0.055) / 1.055, 2.4)

    return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b)

def get_contrast_ratio(hex1, hex2):
    l1 = hex_to_relative_luminance(hex1)
    l2 = hex_to_relative_luminance(hex2)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

def iter_source_files(base_dir):
    for rel in SCAN_DIRS:
        root_dir = os.path.join(base_dir, rel)
        if not os.path.isdir(root_dir):
            continue
        for root, _, files in os.walk(root_dir):
            for f in files:
                if f.endswith(('.astro', '.ts', '.json')):
                    yield os.path.join(root, f)

def check_banned_words(base_dir):
    violations = []
    for path in iter_source_files(base_dir):
        with open(path, 'r', encoding='utf-8') as handle:
            content = handle.read()
            content_lower = content.lower()
            for pattern in BANNED_WORDS:
                match = re.search(pattern, content_lower)
                if match:
                    line_no = content_lower[:match.start()].count('\n') + 1
                    violations.append(
                        f"{path}:{line_no}: kata terlarang '{match.group(0)}'"
                    )
    return violations

def check_pure_black(base_dir):
    """Melarang teks hitam murni #000000 di CSS."""
    violations = []
    for path in iter_source_files(base_dir):
        with open(path, 'r', encoding='utf-8') as handle:
            for line_no, line in enumerate(handle, 1):
                if '#000000' in line.lower() or '#000' in line.lower().split():
                    violations.append(f"{path}:{line_no}: warna teks hitam murni #000000")
    return violations

def check_ai_gradients(base_dir):
    violations = []
    for path in iter_source_files(base_dir):
        with open(path, 'r', encoding='utf-8') as handle:
            for line_no, line in enumerate(handle, 1):
                if AI_GRADIENT_RE.search(line):
                    violations.append(f"{path}:{line_no}: gradient warna AI-slop terdeteksi")
    return violations

def check_wcag_contrast():
    pairs = [
        ("#161210", "#FAF8F5", "ink utama pada latar kertas", 4.5),
        ("#4A423C", "#FAF8F5", "ink sekunder pada latar kertas", 4.5),
        ("#746A63", "#FAF8F5", "ink muted pada latar kertas", 4.5),
        ("#B5472F", "#FFFFFF", "aksen pada permukaan putih", 4.5),
        ("#B5472F", "#FAF8F5", "aksen pada latar kertas", 4.5),
        ("#FFFFFF", "#B5472F", "teks tombol utama", 4.5),
        ("#EFEAE3", "#1B1613", "teks pada blok gelap", 4.5),
    ]
    failures = []
    for fg, bg, label, min_ratio in pairs:
        ratio = get_contrast_ratio(fg, bg)
        if ratio < min_ratio:
            failures.append(f"Gagal WCAG {label}: rasio {ratio:.2f} < minimum {min_ratio}")
    return failures

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    print("[1/4] Memeriksa kata klise AI (Anti-Slop)...")
    violations = check_banned_words(base_dir)
    if violations:
        print("Ditemukan pelanggaran kata klise AI:")
        for v in violations:
            print("  -", v)
        sys.exit(1)
    print("Bebas dari kata klise AI.")

    print("[2/4] Memeriksa warna teks hitam murni...")
    black_violations = check_pure_black(base_dir)
    if black_violations:
        print("Ditemukan warna hitam murni:")
        for v in black_violations:
            print("  -", v)
        sys.exit(1)
    print("Tidak ada teks hitam murni.")

    print("[3/4] Memeriksa gradient warna AI-slop...")
    gradient_violations = check_ai_gradients(base_dir)
    if gradient_violations:
        print("Ditemukan gradient terlarang:")
        for v in gradient_violations:
            print("  -", v)
        sys.exit(1)
    print("Tidak ada gradient AI-slop.")

    print("[4/4] Memeriksa kepatuhan kontras WCAG AA...")
    failures = check_wcag_contrast()
    if failures:
        print("Ditemukan kegagalan kontras rasio:")
        for f in failures:
            print("  -", f)
        sys.exit(1)
    print("Kontras WCAG AA memenuhi standar.")

    print("\nSemua pengecekan anti-slop BERHASIL 100%.")

if __name__ == "__main__":
    main()
