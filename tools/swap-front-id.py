#!/usr/bin/env python3
"""Replace the hero front ID with a new base image, keeping the suit portrait.

Usage: python3 tools/swap-front-id.py [new-id.jpg] [portrait.png]
Defaults: ~/Downloads/front-id-new.jpeg + /tmp/opencode/portrait-flat.png
Only the 1x1 photo box changes; every other element of the new ID is kept.
"""
import sys
from pathlib import Path
from PIL import Image, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
NEW_ID = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Downloads" / "front-id-new.jpeg"
PORTRAIT = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("/tmp/opencode/portrait-flat.png")
DST = ROOT / "assets" / "card-front-real.jpg"

# 1x1 photo box on the new ID (black border detected on front-id-new.jpeg, 1600x2664).
BOX = (796, 484, 1562, 1281)

im = Image.open(NEW_ID).convert("RGB")
W, H = im.size
x0, y0, x1, y1 = BOX
# stay inside the black border
x0 += 6; y0 += 6; x1 -= 6; y1 -= 6
bw, bh = x1 - x0, y1 - y0
print(f"ID {W}x{H}, inner photo box {bw}x{bh} at ({x0},{y0})")

ph = Image.open(PORTRAIT).convert("RGB")
scale = max(bw / ph.width, bh / ph.height)
ph = ph.resize((round(ph.width * scale), round(ph.height * scale)), Image.LANCZOS)
left = (ph.width - bw) // 2
top = int((ph.height - bh) * 0.08)  # head near top, shoulders fill the bottom
ph = ph.crop((left, top, left + bw, top + bh))
ph = ImageEnhance.Brightness(ph).enhance(1.02)
ph = ImageEnhance.Contrast(ph).enhance(1.03)

im.paste(ph, (x0, y0))
im.save(DST, quality=92, subsampling=1, optimize=True)
print("wrote", DST, DST.stat().st_size // 1024, "KB")
