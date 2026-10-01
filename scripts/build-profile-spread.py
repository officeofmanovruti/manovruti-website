"""
Build the company-profile collage on /about from the real PDF pages.

Run it again whenever the company profile is replaced:

    pdftoppm -png -r 90 public/manovruti/manovruti-company-profile.pdf /tmp/pp/p
    python3 scripts/build-profile-spread.py /tmp/pp public/manovruti/photos/company-profile-spread.jpg

An optional third argument scales everything, for a print- or presentation-resolution copy. Render
the pages at a matching DPI or the cards will be upscaled:

    pdftoppm -png -r 200 public/manovruti/manovruti-company-profile.pdf /tmp/pphd/p
    python3 scripts/build-profile-spread.py /tmp/pphd ~/Desktop/profile-spread-hd.jpg 3

Needs poppler (`brew install poppler`) for pdftoppm and Pillow for the composition.

A tilted grid of page cards, each with a soft drop shadow, composed large and then rotated and
cropped so the tilt runs off every edge. The pages are our own document rendered with pdftoppm —
nothing here comes from anyone else's site.
"""
import glob, os, sys
from PIL import Image, ImageFilter

SRC   = sorted(glob.glob(os.path.join(sys.argv[1], "*.png")))
OUT   = sys.argv[2]
S     = float(sys.argv[3]) if len(sys.argv) > 3 else 1   # 1 = the size the site uses
ANGLE = -20                # the reference tilts its fan about this far
# Everything below scales together, so the composition is identical at any output size.
W, H  = int(1600 * S), int(900 * S)
CARD_W = int(300 * S)      # page card width before rotation
GAP_X, GAP_Y = int(46 * S), int(46 * S)
SHADOW_BLUR, SHADOW_Y, SHADOW_A = 16 * S, int(9 * S), 46

cards = []
for f in SRC:
    im = Image.open(f).convert("RGB")
    h = round(CARD_W * im.height / im.width)
    cards.append(im.resize((CARD_W, h), Image.LANCZOS))
CARD_H = cards[0].height

# A canvas big enough that the rotated crop never sees an edge.
CW, CH = int(3000 * S), int(2400 * S)
canvas = Image.new("RGB", (CW, CH), "#ffffff")
shadow = Image.new("L", (CW, CH), 0)

cols = CW // (CARD_W + GAP_X) + 2
rows = CH // (CARD_H + GAP_Y) + 2
i = 0
for c in range(cols):
    # every other column drops half a card, so the grid reads as a staggered spread
    y0 = -CARD_H // 2 + (CARD_H + GAP_Y) // 2 * (c % 2)
    for r in range(rows):
        x = c * (CARD_W + GAP_X)
        y = y0 + r * (CARD_H + GAP_Y)
        card = cards[i % len(cards)]
        i += 1
        shadow.paste(SHADOW_A, (x, y + SHADOW_Y), Image.new("L", card.size, SHADOW_A))
        canvas.paste(card, (x, y))

shadow = shadow.filter(ImageFilter.GaussianBlur(SHADOW_BLUR))
base = Image.new("RGB", (CW, CH), "#ffffff")
base.paste(Image.new("RGB", (CW, CH), "#2b2f33"), (0, 0), shadow)
base.paste(canvas, (0, 0), Image.new("L", (CW, CH), 0).point(lambda v: 0))
# redraw the cards over the blurred shadow layer
i = 0
for c in range(cols):
    y0 = -CARD_H // 2 + (CARD_H + GAP_Y) // 2 * (c % 2)
    for r in range(rows):
        x = c * (CARD_W + GAP_X)
        y = y0 + r * (CARD_H + GAP_Y)
        base.paste(cards[i % len(cards)], (x, y))
        i += 1

rot = base.rotate(ANGLE, resample=Image.BICUBIC, expand=True, fillcolor="#ffffff")
cx, cy = rot.width // 2, rot.height // 2
crop = rot.crop((cx - W // 2, cy - H // 2, cx + W // 2, cy + H // 2))
crop.save(OUT, quality=88, optimize=True)
print("wrote", OUT, crop.size, round(os.path.getsize(OUT) / 1024), "KB")
