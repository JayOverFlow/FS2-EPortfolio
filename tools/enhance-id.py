#!/usr/bin/env python3
"""Lighting/clarity enhancement for the front ID photo.
No elements are added, removed, moved, or cropped — only tone/colour/sharpness.
Usage: python3 tools/enhance-id.py [input.jpg] [output.jpg]
"""
import sys
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Downloads" / "front_ID.jpg"
DST = Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / "assets" / "card-front-real.jpg"

im = Image.open(SRC).convert("RGB")
W, H = im.size
print(f"input {W}x{H}")

# Grey-world white balance: per-channel mean normalisation (PIL-only, no numpy).
def grey_world(img):
    r, g, b = img.split()
    means = []
    for ch in (r, g, b):
        hist = ch.histogram()
        total = sum(hist)
        means.append(sum(i * n for i, n in enumerate(hist)) / max(total, 1))
    avg = sum(means) / 3
    gains = [avg / m if m else 1.0 for m in means]
    out = []
    for ch, gain in zip((r, g, b), gains):
        lut = [min(255, max(0, int(i * gain))) for i in range(256)]
        out.append(ch.point(lut))
    return Image.merge("RGB", out)

im = im.filter(ImageFilter.SMOOTH_MORE) if False else im
# Tone only — no white-balance/autocontrast (both cast on a blue-dominant ID).
im = ImageEnhance.Brightness(im).enhance(1.07)
im = ImageEnhance.Contrast(im).enhance(1.10)
im = ImageEnhance.Color(im).enhance(1.08)
im = im.filter(ImageFilter.UnsharpMask(radius=2, percent=85, threshold=2))
im = im.filter(ImageFilter.UnsharpMask(radius=6, percent=35, threshold=3))

# HD web size: keep the full frame, just cap the longest side (no crop).
MAX_SIDE = 3400
scale = min(1.0, MAX_SIDE / max(W, H))
if scale < 1.0:
    im = im.resize((round(W * scale), round(H * scale)), Image.LANCZOS)
print(f"output {im.size[0]}x{im.size[1]}")

DST.parent.mkdir(parents=True, exist_ok=True)
im.save(DST, quality=92, subsampling=1, optimize=True)
print("wrote", DST, DST.stat().st_size // 1024, "KB")
