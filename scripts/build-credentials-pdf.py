import pymupdf, pathlib

W, H, M = 595.276, 841.89, 54          # A4 and a 54pt margin
INK, GOLD, MUTED = (0.141, 0.165, 0.180), (0.710, 0.506, 0.235), (0.45, 0.47, 0.49)
ROOT = pathlib.Path("public/manovruti")
OUT = ROOT / "manovruti-credentials.pdf"

REGISTRATIONS = [
    ("Chartered Engineer", "Institution of Engineers (India), Kolkata", "AM-145799/6"),
    ("Licensed / Registered Structural Engineer", "DNH PDA", "DNH/PDA/SEOR-1C-01/2025/494"),
    ("Government Registered Engineer", "DNH PDA", "DNH/PDA/CEOR/2024/278"),
    ("Government Approved Valuer", "Indian Institution of Valuers", "CAT-1/A-2863"),
]
PLATES = [
    ("structural-engineer-licence.jpg", "Licensed Structural Engineer",
     "Dharampur Nagarpalika / DNH PDA  ·  DNH/PDA/SEOR-1C-01/2025/494"),
    ("chartered-engineer.jpg", "Chartered Engineer (India)",
     "The Institution of Engineers (India)  ·  AM-145799/6"),
    ("approved-valuer.jpg", "Government Approved Valuer",
     "The Indian Institution of Valuers  ·  CAT-1/A-2863"),
]

doc = pymupdf.open()

# ---- cover -------------------------------------------------------------------------------------
p = doc.new_page(width=W, height=H)
p.draw_rect(pymupdf.Rect(0, 0, W, 232), color=None, fill=INK)
logo = ROOT / "brand/lockup-h-light.png"
if logo.exists():
    lw = 190
    p.insert_image(pymupdf.Rect(M, 62, M + lw, 62 + lw * 479 / 2551), filename=str(logo))
p.insert_text((M, 150), "Credentials", fontname="helv", fontsize=30, color=(1, 1, 1))
p.insert_text((M, 180), "and registrations", fontname="helv", fontsize=30, color=GOLD)
p.insert_text((M, 208), "Manovruti  ·  Silvassa, UT of DNH & DD", fontname="helv", fontsize=9, color=(0.75, 0.77, 0.78))

y = 292
for title, issuer, number in REGISTRATIONS:
    p.draw_line(pymupdf.Point(M, y - 20), pymupdf.Point(W - M, y - 20), color=(0.85, 0.85, 0.84), width=0.6)
    p.insert_text((M, y), title, fontname="hebo", fontsize=12, color=INK)
    p.insert_text((M, y + 17), issuer, fontname="helv", fontsize=9.5, color=MUTED)
    p.insert_text((W - M - pymupdf.get_text_length(number, "helv", 9.5), y + 17),
                  number, fontname="helv", fontsize=9.5, color=GOLD)
    y += 62

p.insert_text((M, H - 74), "The certificates reproduced overleaf are the documents behind these registrations.",
              fontname="helv", fontsize=9, color=MUTED)
p.insert_text((M, H - 58), "Issued to Rajnikant S Rohit, B.E. Civil, A.M.I.E. (India).",
              fontname="helv", fontsize=9, color=MUTED)

# ---- one plate per certificate ------------------------------------------------------------------
for fname, title, sub in PLATES:
    src = ROOT / "certificates" / fname
    if not src.exists():
        continue
    page = doc.new_page(width=W, height=H)
    page.insert_text((M, M + 6), title, fontname="hebo", fontsize=15, color=INK)
    page.insert_text((M, M + 26), sub, fontname="helv", fontsize=9, color=MUTED)
    page.draw_line(pymupdf.Point(M, M + 40), pymupdf.Point(M + 34, M + 40), color=GOLD, width=2)
    # Centre the plate in the space below the caption: insert_image fits inside the rect but
    # settles at its foot, which left the landscape certificates sitting on the bottom margin.
    box = pymupdf.Rect(M, M + 62, W - M, H - M)
    from PIL import Image as _I
    iw, ih = _I.open(src).size
    scale = min(box.width / iw, box.height / ih)
    fw, fh = iw * scale, ih * scale
    fitted = pymupdf.Rect(box.x0 + (box.width - fw) / 2, box.y0 + (box.height - fh) / 2,
                          box.x0 + (box.width - fw) / 2 + fw, box.y0 + (box.height - fh) / 2 + fh)
    page.draw_rect(fitted, color=(0.87, 0.87, 0.86), width=0.7)
    page.insert_image(fitted, filename=str(src), keep_proportion=True)

doc.set_metadata({"title": "Manovruti — Credentials and registrations",
                  "author": "Manovruti", "subject": "Professional registrations and certificates"})
doc.save(str(OUT), garbage=4, deflate=True, clean=True)
print(f"{OUT}  {OUT.stat().st_size/1024:.0f} KB  {doc.page_count} pages")
