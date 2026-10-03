#!/usr/bin/env python3
"""Generate branded demo PDFs for REPN Resources Library."""
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

OUT = "/home/z/my-project/public/docs"
os.makedirs(OUT, exist_ok=True)

NAVY = HexColor("#16294a")
GOLD = HexColor("#c19a3d")
GRAY = HexColor("#555555")

def wrap_text(c, text, font, size, max_w):
    words = text.split()
    lines, line = [], ""
    for w in words:
        test = (line + " " + w).strip()
        if c.stringWidth(test, font, size) <= max_w:
            line = test
        else:
            lines.append(line)
            line = w
    if line:
        lines.append(line)
    return lines

def make_pdf(filename, title, subtitle, meta, sections):
    path = os.path.join(OUT, filename)
    c = canvas.Canvas(path, pagesize=letter)
    W, H = letter

    # ---- Cover ----
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(60, H - 200, 90, 6, fill=1, stroke=0)
    c.setFillColor(HexColor("#ffffff"))
    c.setFont("Helvetica-Bold", 11)
    c.drawString(60, H - 160, "REAL ESTATE PROFESSIONALS NETWORK  |  MEMBER RESOURCE")
    c.setFont("Helvetica-Bold", 34)
    ty = H - 280
    for line in wrap_text(c, title, "Helvetica-Bold", 34, W - 140):
        c.drawString(60, ty, line)
        ty -= 42
    c.setFillColor(GOLD)
    c.setFont("Helvetica", 15)
    c.drawString(60, ty - 14, subtitle)
    c.setFillColor(HexColor("#9fb0c9"))
    c.setFont("Helvetica", 11)
    c.drawString(60, 120, meta)
    c.drawString(60, 100, "This document is for REPN members only. Do not redistribute.")
    c.setFont("Helvetica-Bold", 90)
    c.setFillColor(HexColor("#22375c"))
    c.drawRightString(W - 50, 60, "REPN")
    c.showPage()

    # ---- Body pages ----
    y = H - 90
    for sec_title, paras in sections:
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 16)
        c.drawString(60, y, sec_title)
        c.setFillColor(GOLD)
        c.rect(60, y - 8, 50, 3, fill=1, stroke=0)
        y -= 30
        c.setFont("Helvetica", 10.5)
        for p in paras:
            for line in wrap_text(c, p, "Helvetica", 10.5, W - 130):
                if y < 90:
                    c.showPage()
                    y = H - 90
                c.setFillColor(GRAY)
                c.drawString(60, y, line)
                y -= 15
            y -= 10
        y -= 14

    c.setFillColor(GRAY)
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(60, 60, "Real Estate Professionals Network  |  repn.org  |  (800) 555-7376")
    c.save()
    print("created", path)

make_pdf(
    "2026-housing-market-outlook.pdf",
    "2026 Housing Market Outlook",
    "Annual Market Report - Member Edition",
    "Published October 2026  |  42 pages  |  Research Committee",
    [
        ("1. Executive Summary", [
            "The 2026 housing market continues its measured normalization. Existing-home sales are projected to rise 4.8 percent year over year as mortgage rates settle into the 5.9 to 6.4 percent band. Inventory has improved for the seventh consecutive quarter, yet remains roughly 18 percent below pre-pandemic norms in major metropolitan areas.",
            "Median list prices grew 3.1 percent nationally, with the strongest appreciation concentrated in Midwest metros offering relative affordability. Days on market averaged 34, up slightly from 29 in 2025, signaling healthier negotiating conditions for buyers.",
            "For REPN members, the practical takeaway is clear: buyers are regaining leverage in staged markets, while well-priced inventory in strong school districts continues to draw multiple offers within the first weekend.",
        ]),
        ("2. Regional Highlights", [
            "The Northeast recorded the fastest absorption rate at 26 median days on market. The Sun Belt saw a moderation in price growth, with Austin and Phoenix posting their first flat quarters since 2020. Florida coastal markets remain bifurcated by insurance costs, which now add an average of 340 dollars per month to carrying expenses.",
            "Midwest markets led the nation in affordability index improvement, driven by income growth outpacing a modest 2.4 percent price gain. Chicago, Columbus, and Kansas City all registered sub-4.0 months of supply.",
        ]),
        ("3. Implications for Your Business", [
            "Members should expect longer decision cycles and place renewed emphasis on buyer consultations, rate buydown education, and listing preparation services. The data suggests agents who systematized weekly seller updates retained 31 percent more listings in 2026.",
            "The full report includes metro-level tables, affordability worksheets, and a downloadable presentation deck for client seminars.",
        ]),
    ],
)

make_pdf(
    "fair-housing-compliance-guide.pdf",
    "Fair Housing Compliance Guide",
    "Practical Guidance for Every Member",
    "Revised August 2026  |  36 pages  |  Legal Affairs",
    [
        ("1. Core Principles", [
            "The Fair Housing Act prohibits discrimination in the sale, rental, and financing of housing based on race, color, national origin, religion, sex, familial status, and disability. State and local laws frequently add protected classes, including source of income, age, and marital status.",
            "Compliance is not merely avoiding explicit refusal. Steering, selective advertising, inconsistent application of criteria, and neutral policies with disproportionate impact all create liability.",
        ]),
        ("2. Advertising and Marketing", [
            "Every listing description should describe the property, never the ideal occupant. Phrases such as perfect family neighborhood, bachelor pad, or walking distance to church create exposure. Useinclusive language focused on features: fenced yard, updated kitchen, near transit.",
            "Targeted social media advertising requires particular care. Ad delivery algorithms can exclude protected audiences even when the advertiser's intent is neutral. REPN recommends interest-based rather than demographic targeting parameters.",
        ]),
        ("3. Documentation Practices", [
            "Consistency is the strongest defense. Apply the same qualification criteria to every applicant and retain records of each interaction for at least three years. When in doubt, document the business reason for every decision.",
            "Members facing an ambiguous situation should consult the REPN Legal Hotline at (800) 555-7376, extension 4, before acting.",
        ]),
    ],
)

make_pdf(
    "commission-negotiation-scripts.pdf",
    "Commission Negotiation Scripts",
    "Word-for-Word Language for Value Conversations",
    "Updated September 2026  |  18 pages  |  Professional Development",
    [
        ("1. Why Scripts Matter", [
            "Since the 2024 NAR settlement, buyers and sellers ask direct questions about compensation. Agents who answer with rehearsed, confident language convert at more than twice the rate of those who improvise.",
            "Scripts are not about manipulation. They are about clarity: helping clients understand exactly what professional representation delivers.",
        ]),
        ("2. The Seller Conversation", [
            "Script: I charge six percent, of which half goes to the buyer's agent. Let me show you what that includes: professional staging consultation, photography, syndication to 74 portals, weekly written updates, and negotiation by a full-time professional. In 2026, my listings sold for 4.2 percent more than the market average.",
            "Follow this with silence. The first agent to speak after a value statement often concedes. Let the client respond.",
        ]),
        ("3. Handling Common Objections", [
            "When asked, will you take less: I understand commissions feel significant. My business is built on net results for clients, not transactions. If my full program does not fit your goals, I am happy to refer you to a colleague whose model does.",
            "This preserves your positioning while offering a graceful exit. Members report that fewer than one in ten sellers proceed without representation after this conversation.",
        ]),
    ],
)

print("ALL PDFS DONE")
