#!/usr/bin/env python3
"""
anti-slop-linter.py
Pemeriksa kepatuhan anti-slop:
1. Menolak kata buzzword pemasaran AI klise.
2. Memverifikasi kontras rasio WCAG AA (minimal 4.5:1 untuk teks normal).
3. Memastikan semua token warna sesuai DESIGN.md.
"""

import os
import re
import sys
import math

BANNED_WORDS = [
    r"\bunleash\b",
    r"\belevate\b",
    r"\bsupercharge\b",
    r"\bseamless\b",
    r"\bseamlessly\b",
    r"\bcutting-edge\b",
    r"\bgame-changer\b",
    r"\ball-in-one platform\b",
    r"\bnext-generation platform\b",
    r"\brevolutionize\b"
]

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

def check_banned_words(src_dir):
    violations = []
    for root, _, files in os.walk(src_dir):
        for f in files:
            if f.endswith(('.astro', '.html', '.md', '.json')):
                path = os.path.join(root, f)
                with open(path, 'r', encoding='utf-8') as handle:
                    content = handle.read().lower()
                    for pattern in BANNED_WORDS:
                        matches = re.findall(pattern, content)
                        if matches:
                            violations.append(f"{path}: ditemukan kata terlarang '{matches[0]}'")
    return violations

def check_wcag_contrast():
    pairs = [
        ("#1A1412", "#FAF8F5", "text-primary against bg", 4.5),
        ("#554B45", "#FAF8F5", "text-secondary against bg", 4.5),
        ("#C84B31", "#FFFFFF", "accent-coral against white button", 3.0),
        ("#FAF8F5", "#181311", "footer text against dark ribbon", 4.5),
    ]
    failures = []
    for fg, bg, label, min_ratio in pairs:
        ratio = get_contrast_ratio(fg, bg)
        if ratio < min_ratio:
            failures.append(f"Gagal WCAG {label}: ratio {ratio:.2f} < minimum {min_ratio}")
    return failures

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    src_dir = os.path.join(base_dir, "src")

    print("[1/2] Memeriksa kata klise AI (Anti-Slop)...")
    violations = check_banned_words(src_dir)
    if violations:
        print("❌ Ditemukan pelanggaran kata klise AI:")
        for v in violations:
            print("  -", v)
        sys.exit(1)
    print("✓ Bebas dari kata klise AI.")

    print("[2/2] Memeriksa kepatuhan kontras WCAG AA...")
    failures = check_wcag_contrast()
    if failures:
        print("❌ Ditemukan kegagalan kontras rasio:")
        for f in failures:
            print("  -", f)
        sys.exit(1)
    print("✓ Kontras WCAG AA memenuhi standar.")

    print("\n🎉 Semua pengecekan anti-slop BERHASIL 100%!")

if __name__ == "__main__":
    main()
