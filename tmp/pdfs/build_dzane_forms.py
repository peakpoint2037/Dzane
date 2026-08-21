from pathlib import Path
from PIL import Image, ImageChops
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.colors import HexColor, white
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas
from pypdf import PdfReader, PdfWriter

ROOT = Path(r"C:\Users\ajaib\sandbox\clothing-protype")
OUT = ROOT / "output" / "pdf"
TMP = ROOT / "tmp" / "pdfs"
LOGO_SRC = Path(r"C:\Users\ajaib\OneDrive\Documents\AJAI BUSINESS\DZANE STITICHING STUDIO\DZANE Logo Final Files\Black\PNG\DZANE Logo-01.png")
OUT.mkdir(parents=True, exist_ok=True)
TMP.mkdir(parents=True, exist_ok=True)

GREEN = HexColor("#000000")
GOLD = HexColor("#000000")
PALE = HexColor("#F2F2F2")
INK = HexColor("#000000")
GRID = HexColor("#777777")


def prepare_logo():
    im = Image.open(LOGO_SRC).convert("RGB")
    bg = Image.new("RGB", im.size, "white")
    bbox = ImageChops.difference(im, bg).getbbox()
    im = im.crop(bbox)
    target = TMP / "dzane_logo_cropped.png"
    im.save(target, optimize=True)
    return target


LOGO = prepare_logo()


def fit_text(c, text, x, y, width, font="Helvetica-Bold", max_size=8, min_size=5.5):
    size = max_size
    while size > min_size and c.stringWidth(text, font, size) > width - 6:
        size -= 0.25
    c.setFont(font, size)
    c.drawCentredString(x + width / 2, y, text)


def draw_header(c, title, subtitle):
    w, h = landscape(A4)
    c.setFillColor(white)
    c.rect(0, h - 92, w, 92, fill=1, stroke=0)
    logo = Image.open(LOGO)
    ratio = logo.width / logo.height
    lh = 56
    lw = lh * ratio
    c.drawImage(ImageReader(logo), 34, h - 74, width=lw, height=lh, preserveAspectRatio=True, mask="auto")
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(34 + lw + 22, h - 42, "DZANE")
    c.setFont("Helvetica", 8.5)
    c.drawString(34 + lw + 22, h - 58, "STITCHING STUDIO & PREMIUM LADIES WEAR")
    c.setFillColor(INK)
    c.rect(0, h - 94, w, 2, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 19)
    c.drawString(34, h - 130, title)
    c.setFont("Helvetica", 8.5)
    c.setFillColor(GRID)
    c.drawRightString(w - 34, h - 126, subtitle)


def draw_fields(c, labels):
    w, h = landscape(A4)
    y = h - 161
    x = 34
    c.setFillColor(INK)
    for label, width in labels:
        c.setFont("Helvetica-Bold", 8)
        c.drawString(x, y, label.upper())
        c.setStrokeColor(GRID)
        c.setLineWidth(0.6)
        c.line(x, y - 8, x + width, y - 8)
        x += width + 18


def draw_table(c, columns, rows=14, totals=None):
    w, h = landscape(A4)
    x0, x1 = 34, w - 34
    top, bottom = h - 188, 48
    total_width = sum(width for _, width in columns)
    scale = (x1 - x0) / total_width
    cols = [(name, width * scale) for name, width in columns]
    row_h = (top - bottom) / (rows + 2)
    c.setFillColor(GREEN)
    c.rect(x0, top - row_h, x1 - x0, row_h, fill=1, stroke=0)
    c.setStrokeColor(GRID)
    c.setLineWidth(0.45)
    c.rect(x0, bottom, x1 - x0, top - bottom, fill=0, stroke=1)
    xs = [x0]
    for _, width in cols:
        xs.append(xs[-1] + width)
    for x in xs[1:-1]:
        c.line(x, bottom, x, top)
    for i in range(rows + 1):
        y = top - row_h * (i + 1)
        c.line(x0, y, x1, y)
    c.setFillColor(PALE)
    c.rect(x0, bottom, x1 - x0, row_h, fill=1, stroke=0)
    c.setStrokeColor(GRID)
    c.line(x0, bottom + row_h, x1, bottom + row_h)
    c.setFillColor(white)
    x = x0
    for name, width in cols:
        fit_text(c, name, x, top - row_h + row_h / 2 - 3, width)
        x += width
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(x0 + 6, bottom + row_h / 2 - 3, "TOTAL")
    if totals:
        for idx in totals:
            c.setFont("Helvetica", 7)
            c.drawCentredString((xs[idx] + xs[idx + 1]) / 2, bottom + row_h / 2 - 3, "Rs. __________")
    c.setFont("Helvetica", 6.5)
    c.setFillColor(GRID)
    c.drawRightString(w - 34, 24, "DZANE  |  Business Record")


def create_form(filename, title, subtitle, fields, columns, rows=14, totals=None):
    path = OUT / filename
    c = canvas.Canvas(str(path), pagesize=landscape(A4), pageCompression=1)
    c.setTitle(title)
    draw_header(c, title, subtitle)
    draw_fields(c, fields)
    draw_table(c, columns, rows, totals)
    c.showPage()
    c.save()
    return path


forms = [
    create_form("DZANE_Daily_Cash_Book.pdf", "Daily Cash Book", "One sheet per day", [("Date", 115), ("Prepared by", 190), ("Opening cash (Rs.)", 145)], [("Time", 55), ("Description", 210), ("Category", 105), ("Reference", 85), ("Cash In (Rs.)", 95), ("Cash Out (Rs.)", 95), ("Balance (Rs.)", 100)], 14, [4, 5, 6]),
    create_form("DZANE_Income_Tracker.pdf", "Income Tracker", "Monthly sales and other income", [("Month", 180), ("Year", 95), ("Prepared by", 190)], [("Date", 65), ("Description / Item", 210), ("Category", 105), ("Customer", 120), ("Payment Method", 110), ("Reference", 85), ("Amount (Rs.)", 105)], 15, [6]),
    create_form("DZANE_Expense_Tracker.pdf", "Expense Tracker", "Monthly business expenses", [("Month", 180), ("Year", 95), ("Prepared by", 190)], [("Date", 65), ("Expense Description", 205), ("Category", 110), ("Paid To", 120), ("Payment Method", 110), ("Receipt No.", 85), ("Amount (Rs.)", 105)], 15, [6]),
    create_form("DZANE_Incoming_Stock_Revised.pdf", "Incoming Stock", "Record stock and fabric received", [("Month", 180), ("Year", 95), ("Checked by", 190)], [("Date", 62), ("Item / Fabric", 160), ("Category", 95), ("Item Number", 100), ("Qty", 48), ("Unit Cost (Rs.)", 95), ("Total Cost (Rs.)", 100), ("Supplier", 105), ("Notes", 110)], 14, [4, 6]),
    create_form("DZANE_Sold_Items_List_Revised.pdf", "Sold Items List", "Record each item sold", [("Month", 180), ("Year", 95), ("Prepared by", 190)], [("Date", 58), ("Item Sold", 150), ("Category", 90), ("Item Number", 90), ("Qty", 45), ("Unit Price (Rs.)", 92), ("Total (Rs.)", 92), ("Customer", 105), ("Payment", 85), ("Notes", 95)], 14, [4, 6]),
]

writer = PdfWriter()
for form in forms:
    reader = PdfReader(str(form))
    writer.add_page(reader.pages[0])
combined = OUT / "DZANE_Business_Record_Forms_Complete_Set.pdf"
with combined.open("wb") as f:
    writer.write(f)

print("\n".join(str(p) for p in forms + [combined]))
