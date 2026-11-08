#!/usr/bin/env python3
"""Generate card-front.png, card-back.png and strap.png for the Lanyard hero.
Run: python3 tools/generate-lanyard-art.py
All art is drawn programmatically so the portfolio stays self-contained.
Swap assets/portrait.jpg in later and re-run with --photo to use a real photo.
"""
import math, random, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
random.seed(7)

INK = (21, 23, 26); BLUE = (31, 58, 147); BLUE_DARK = (21, 42, 107)
NAVY = (19, 38, 92); GOLD = (240, 180, 41); GOLD_DARK = (168, 100, 28)
PAPER = (250, 248, 243); MIST = (233, 238, 248); MUTED = (107, 106, 100)

def font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for p in candidates:
        try: return ImageFont.truetype(p, size)
        except Exception: pass
    return ImageFont.load_default()

def text_center(d, cx, y, s, f, fill):
    box = d.textbbox((0, 0), s, font=f)
    d.text((cx - (box[2]-box[0])/2 - box[0], y), s, font=f, fill=fill)

def rounded(d, box, r, **kw): d.rounded_rectangle(box, radius=r, **kw)

def weave(w, h):
    """Subtle fabric weave overlay (embroidered / laminated texture)."""
    ov = Image.new("RGBA", (w, h), (0, 0, 0, 0)); od = ImageDraw.Draw(ov)
    for y in range(0, h, 3):
        od.line([(0, y), (w, y)], fill=(255, 255, 255, 6 if (y//3) % 2 else 0), width=1)
    for x in range(0, h, 3):
        od.line([(x, 0), (x, h)], fill=(0, 0, 0, 6 if (x//3) % 2 else 0), width=1)
    return ov

def apply_weave(img):
    base = img.convert("RGBA")
    base.alpha_composite(weave(*img.size))
    return base.convert("RGB")

def seal(d, cx, cy, r):
    d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=PAPER, outline=GOLD, width=6)
    d.ellipse([cx-r+14, cy-r+14, cx+r-14, cy+r-14], outline=BLUE, width=2)
    text_center(d, cx, cy-r//2-6, "TUP", font(r//2, True), BLUE_DARK)
    text_center(d, cx, cy+6, "TAGUIG", font(max(10, r//5), True), MUTED)

def jrd_photo(w, h, photo_path=None):
    img = Image.new("RGB", (w, h), MIST)
    d = ImageDraw.Draw(img)
    for x in range(0, w, 40): d.line([(x, 0), (x, h)], fill=(31, 58, 147, 30), width=1)
    for y in range(0, h, 40): d.line([(0, y), (w, y)], fill=(31, 58, 147, 30), width=1)
    d.ellipse([w*0.62-140, h*0.34-140, w*0.62+140, h*0.34+140], fill=(31,58,147,22), outline=(31,58,147,90), width=3)
    d.line([60, int(h*0.66), w-60, int(h*0.66)], fill=INK, width=4)
    text_center(d, w//2, int(h*0.70), "JRD", font(110, True), INK)
    text_center(d, w//2, int(h*0.88), "PORTRAIT PENDING", font(24, True), MUTED)
    if photo_path and Path(photo_path).exists():
        ph = Image.open(photo_path).convert("RGB")
        ph.thumbnail((w, h)); img.paste(ph, ((w-ph.width)//2, (h-ph.height)//2))
    return img

def card_front(photo=None):
    W, H = 1024, 1440
    img = apply_weave(Image.new("RGB", (W, H), PAPER)); d = ImageDraw.Draw(img, "RGBA")
    # header — keep the centre-top clear: the card slot + ring sit there.
    d.rectangle([0, 0, W, 250], fill=BLUE_DARK)
    d.rectangle([0, 250, W, 258], fill=GOLD)
    seal(d, 110, 125, 72)
    # short tagline offset to the right of the slot/ring zone
    d.text((700, 78), "TUP-TAGUIG", font=font(44, True), fill=PAPER)
    d.text((700, 134), "BTVTED", font=font(36, True), fill=GOLD)
    d.text((700, 182), "EST. 1978", font=font(24, True), fill=(180, 195, 235))
    # photo
    ph = jrd_photo(560, 640, photo)
    img.paste(ph, (232, 320)); d = ImageDraw.Draw(img, "RGBA")
    d.rectangle([232, 320, 792, 960], outline=INK, width=4)
    # university name in the clear zone below the photo (slot/ring cover the top centre)
    text_center(d, W//2, 976, "TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES", font(27, True), BLUE_DARK)
    # name block
    text_center(d, W//2, 1020, "JOHN REX B. DURAN", font(58, True), INK)
    text_center(d, W//2, 1092, "Pre-service Teacher", font(34, False), BLUE_DARK)
    d.line([312, 1150, 712, 1150], fill=GOLD_DARK, width=4)
    text_center(d, W//2, 1172, "BTVTED, Major in Computer Programming", font(30, True), INK)
    text_center(d, W//2, 1212, "Field Study · President Diosdado Macapagal HS", font(26, False), MUTED)
    text_center(d, W//2, 1250, "Grade 7 TLE (ICT)  ·  S.Y. 2026-2027", font(26, False), MUTED)
    # footer strip
    d.rectangle([0, 1330, W, H], fill=INK)
    text_center(d, W//2, 1352, "ID NO. 2026-001  ·  TUP-TAGUIG", font(28, True), PAPER)
    return img

def card_back():
    W, H = 1024, 1440
    img = apply_weave(Image.new("RGB", (W, H), BLUE_DARK)); d = ImageDraw.Draw(img, "RGBA")
    d.rectangle([0, 0, W, 8], fill=GOLD); d.rectangle([0, H-8, W, H], fill=GOLD)
    seal(d, W//2, 230, 88)
    text_center(d, W//2, 350, "TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES", font(30, True), PAPER)
    text_center(d, W//2, 395, "TUP-TAGUIG  ·  EST. 1978", font(26, True), GOLD)
    d.line([212, 460, 812, 460], fill=GOLD, width=3)
    rows = [
        ("NAME", "John Rex B. Duran"),
        ("PROGRAM", "BTVTED, Computer Programming"),
        ("PLACEMENT", "Grade 7 TLE (ICT), PDMHS"),
        ("EMAIL", "johnrex.duran@tup.edu.ph"),
        ("GITHUB", "github.com/JayOverFlow"),
    ]
    y = 500
    for k, v in rows:
        text_center(d, W//2, y, k, font(24, True), GOLD); y += 34
        text_center(d, W//2, y, v, font(32, True), PAPER); y += 66
    quote = "I want learners to leave my class able to build something that works and explain why it works."
    # wrapped quote
    words, line, lines = quote.split(), "", []
    for wd in words:
        t = (line + " " + wd).strip()
        if d.textlength(t, font=font(28)) > 760: lines.append(line); line = wd
        else: line = t
    lines.append(line); y += 10
    for ln in lines:
        text_center(d, W//2, y, '"' + ln + '"' if ln == lines[0] else ln, font(28, False), (220, 228, 250)); y += 40
    # barcode
    x = W//2 - 220
    while x < W//2 + 220:
        bw = random.choice([3, 5, 8, 12]); d.rectangle([x, 1210, x+bw, 1300], fill=PAPER); x += bw + random.choice([3, 5, 8])
    text_center(d, W//2, 1312, "2026 · FS1 E-PORTFOLIO", font(24, True), PAPER)
    return img

def strap():
    """Wide embroidered TUP lanyard tape: navy fabric, gold edges, stitched lettering."""
    W, H = 2048, 256
    img = apply_weave(Image.new("RGB", (W, H), NAVY)); d = ImageDraw.Draw(img, "RGBA")
    # gold edge stitching (dashed)
    for y in (22, H-22):
        x = 0
        while x < W:
            d.line([(x, y), (x+22, y)], fill=GOLD, width=6); x += 34
        d.line([(0, y-8), (W, y-8)], fill=(240,180,41,70), width=2)
    # embroidered text, repeated; slight offset shadow = thread depth
    phrase = "TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES"
    f = font(64, True)
    # measure and tile
    unit = phrase + "   ★   TUP   ★   "
    uw = d.textlength(unit, font=f)
    x = 16
    while x < W:
        for dx, dy, col in [(2, 3, (8, 18, 52)), (0, 0, (255, 255, 255))]:
            d.text((x+dx, 88+dy), unit, font=f, fill=col)
        x += uw
    # thread speckle over letters
    for _ in range(2600):
        x, y = random.randrange(W), random.randrange(80, 176)
        d.point((x, y), fill=(255, 255, 255, random.randrange(20, 70)))
    for _ in range(1200):
        x, y = random.randrange(W), random.randrange(H)
        d.point((x, y), fill=(0, 0, 0, random.randrange(15, 50)))
    return img

if __name__ == "__main__":
    photo = None
    if "--photo" in sys.argv:
        i = sys.argv.index("--photo")
        if i + 1 < len(sys.argv): photo = sys.argv[i+1]
    card_front(photo).save(ASSETS / "card-front.png", optimize=True)
    card_back().save(ASSETS / "card-back.png", optimize=True)
    strap().save(ASSETS / "strap.png", optimize=True)
    print("wrote", ASSETS / "card-front.png", ASSETS / "card-back.png", ASSETS / "strap.png")
