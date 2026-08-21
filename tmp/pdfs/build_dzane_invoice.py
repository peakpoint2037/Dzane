from pathlib import Path
from PIL import Image, ImageChops
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import black, white, HexColor
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

ROOT = Path(r"C:\Users\ajaib\sandbox\clothing-protype")
OUT = ROOT / "output" / "pdf"
TMP = ROOT / "tmp" / "pdfs"
LOGO_SRC = Path(r"C:\Users\ajaib\OneDrive\Documents\AJAI BUSINESS\DZANE STITICHING STUDIO\DZANE Logo Final Files\Black\PNG\DZANE Logo-01.png")
OUT.mkdir(parents=True, exist_ok=True)
TMP.mkdir(parents=True, exist_ok=True)
OUTFILE = OUT / "DZANE_Indian_Store_Receipt_Invoice_UPI.pdf"
GRAY = HexColor("#777777")
LIGHT = HexColor("#F3F3F3")


def cropped_logo():
    im = Image.open(LOGO_SRC).convert("RGB")
    bbox = ImageChops.difference(im, Image.new("RGB", im.size, "white")).getbbox()
    im = im.crop(bbox)
    path = TMP / "dzane_invoice_logo.png"
    im.save(path, optimize=True)
    return path


LOGO = cropped_logo()


def line_field(c, label, x, y, width, value=""):
    c.setFillColor(black)
    c.setFont("Helvetica-Bold", 6.2)
    c.drawString(x, y, label.upper())
    offset = c.stringWidth(label.upper(), "Helvetica-Bold", 6.2) + 5
    c.setLineWidth(0.45)
    c.setStrokeColor(GRAY)
    c.line(x + offset, y - 1, x + width, y - 1)
    if value:
        c.setFont("Helvetica", 6.5)
        c.drawString(x + offset + 3, y + 1, value)


def copy_block(c, y0, copy_name):
    page_w, _ = A4
    left, right = 28, page_w - 28
    top = y0 + 374

    # Header
    logo = Image.open(LOGO)
    lh = 43
    lw = lh * logo.width / logo.height
    c.drawImage(ImageReader(logo), left, top - 48, width=lw, height=lh, preserveAspectRatio=True, mask="auto")
    tx = left + lw + 12
    c.setFillColor(black)
    c.setFont("Helvetica-Bold", 15)
    c.drawString(tx, top - 20, "DZANE")
    c.setFont("Helvetica", 6.8)
    c.drawString(tx, top - 32, "STITCHING STUDIO & PREMIUM LADIES WEAR")
    c.setFont("Helvetica-Oblique", 6.3)
    c.drawString(tx, top - 42, "Tailored Grace, Timeless Fit")
    c.setFont("Helvetica-Bold", 11)
    c.drawRightString(right, top - 20, "RECEIPT / INVOICE")
    c.setFont("Helvetica-Bold", 7)
    c.drawRightString(right, top - 34, copy_name.upper())
    c.setFont("Helvetica", 5.8)
    c.drawRightString(right, top - 44, "Ladies Wear | Churidars | Sarees | Custom Stitching")
    c.setLineWidth(1.2)
    c.line(left, top - 55, right, top - 55)

    # Invoice and customer details
    y = top - 71
    line_field(c, "Invoice No.", left, y, 170)
    line_field(c, "Date", left + 183, y, 125)
    line_field(c, "Due Date", left + 320, y, right - (left + 320))
    y -= 17
    line_field(c, "Customer", left, y, 265)
    line_field(c, "Mobile", left + 278, y, right - (left + 278))
    y -= 17
    line_field(c, "Address", left, y, right - left)

    # Items table
    table_top = y - 13
    row_h = 23
    columns = [("Item No.", 52), ("Description / Service", 226), ("Qty", 42), ("Rate (Rs.)", 80), ("Amount (Rs.)", 111)]
    scale = (right - left) / sum(w for _, w in columns)
    columns = [(name, w * scale) for name, w in columns]
    xs = [left]
    for _, width in columns:
        xs.append(xs[-1] + width)
    c.setFillColor(black)
    c.rect(left, table_top - row_h, right - left, row_h, fill=1, stroke=0)
    c.setStrokeColor(GRAY)
    c.setLineWidth(0.4)
    c.rect(left, table_top - row_h * 5, right - left, row_h * 5, fill=0, stroke=1)
    for x in xs[1:-1]:
        c.line(x, table_top, x, table_top - row_h * 5)
    for i in range(1, 5):
        c.line(left, table_top - row_h * i, right, table_top - row_h * i)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 6.5)
    x = left
    for name, width in columns:
        c.drawCentredString(x + width / 2, table_top - 15, name)
        x += width

    # Notes and totals
    base = table_top - row_h * 5
    c.setFillColor(black)
    c.setFont("Helvetica-Bold", 6.2)
    c.drawString(left, base - 14, "NOTES / DELIVERY DETAILS")
    c.setStrokeColor(GRAY)
    c.line(left, base - 31, left + 290, base - 31)
    c.line(left, base - 47, left + 290, base - 47)
    sx = left + 314
    summaries = ["Subtotal", "Discount", "Advance Paid", "BALANCE DUE"]
    sy = base - 10
    for i, label in enumerate(summaries):
        if i == 3:
            c.setFillColor(LIGHT)
            c.rect(sx - 6, sy - 8, right - sx + 6, 17, fill=1, stroke=0)
        c.setFillColor(black)
        c.setFont("Helvetica-Bold" if i == 3 else "Helvetica", 6.5)
        c.drawString(sx, sy, label)
        c.drawRightString(right, sy, "Rs. __________")
        sy -= 14

    # Payment and signatures
    fy = y0 + 24
    c.setFont("Helvetica-Bold", 6.2)
    c.drawString(left, fy + 27, "METHOD OF PAYMENT")
    c.setFont("Helvetica", 6.2)
    c.drawString(left, fy + 15, "Cash [  ]   Debit/Credit Card [  ]   UPI [  ]   E-Transfer [  ]   Cheque [  ]   Other [  ]")
    c.setFont("Helvetica-Oblique", 5.8)
    c.drawString(left + 300, fy + 27, "GST not charged - supplier not registered under GST")
    c.setFont("Helvetica-Bold", 6.2)
    c.drawString(left, fy, "Customer Signature")
    c.setStrokeColor(GRAY)
    c.line(left + 72, fy - 1, left + 190, fy - 1)
    c.drawString(right - 165, fy, "For DZANE")
    c.line(right - 110, fy - 1, right, fy - 1)
    c.setFont("Helvetica", 5.4)
    c.setFillColor(GRAY)
    c.drawCentredString((left + right) / 2, y0 + 8, "Thank you for choosing DZANE. Please keep this receipt for your records.")


c = canvas.Canvas(str(OUTFILE), pagesize=A4, pageCompression=1)
c.setTitle("DZANE Customer Receipt and Invoice - Two Copy")
copy_block(c, 431, "Customer Copy")

# Cut line between copies
c.setStrokeColor(GRAY)
c.setDash(4, 3)
c.setLineWidth(0.6)
c.line(18, 421, A4[0] - 18, 421)
c.setDash()
c.setFillColor(white)
c.rect(A4[0] / 2 - 24, 416, 48, 11, fill=1, stroke=0)
c.setFillColor(GRAY)
c.setFont("Helvetica", 5.2)
c.drawCentredString(A4[0] / 2, 419, "CUT HERE")

copy_block(c, 10, "Store Copy")
c.showPage()
c.save()
print(OUTFILE)
