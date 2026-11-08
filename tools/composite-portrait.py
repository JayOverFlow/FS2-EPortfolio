#!/usr/bin/env python3
"""Composite a new 1x1 portrait into the enhanced real ID front.
No other element of the ID is touched.
Usage: python3 tools/composite-portrait.py [portrait.jpg]
Default portrait: ~/Downloads/portrait.jpg
The source ID (assets/card-front-real.jpg) is updated in place;
keep a backup first if you want to re-run with a different photo.
"""
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PORTRAIT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Downloads" / "portrait.jpg"
ID = ROOT / "assets" / "card-front-real.jpg"

# 1x1 photo box on the ID, as fractions of the frame (measured on front_ID.jpg).
BOX = (0.505, 0.187, 0.971, 0.490)

im = Image.open(ID).convert("RGB")
W, H = im.size
x0, y0, x1, y1 = (int(BOX[0] * W), int(BOX[1] * H), int(BOX[2] * W), int(BOX[3] * H))
bw, bh = x1 - x0, y1 - y0
print(f"ID {W}x{H}, photo box {bw}x{bh} at ({x0},{y0})")

ph = Image.open(PORTRAIT).convert("RGB")
# Centre-crop the portrait to the box aspect, then fit (cover).
scale = max(bw / ph.width, bh / ph.height)
ph = ph.resize((round(ph.width * scale), round(ph.height * scale)), Image.LANCZOS)
left = (ph.width - bw) // 2
top = int((ph.height - bh) * 0.08)  # head near top, shoulders fill the bottom
ph = ph.crop((left, top, left + bw, top + bh))
# Slight tone match so the new photo sits naturally in the old frame.
from PIL import ImageEnhance
ph = ImageEnhance.Brightness(ph).enhance(1.02)
ph = ImageEnhance.Contrast(ph).enhance(1.03)

im.paste(ph, (x0, y0))
im.save(ID, quality=92, subsampling=1, optimize=True)
print("updated", ID)
