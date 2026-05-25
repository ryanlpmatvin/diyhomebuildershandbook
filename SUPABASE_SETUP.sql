"""Generate realistic-looking PNG illustrations for the app guides.

Run once whenever the illustrations need refreshing:
    python3 generate_illustrations.py

Output: illustrations/<task_id>.png at 1200x720.
"""
import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

OUT_DIR = 'illustrations'
W, H = 1200, 720

os.makedirs(OUT_DIR, exist_ok=True)
random.seed(7)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def font(size, bold=False):
    try:
        path = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()


def clamp(v, lo=0, hi=255):
    return max(lo, min(hi, int(v)))


def shade(c, factor):
    return (clamp(c[0]*factor), clamp(c[1]*factor), clamp(c[2]*factor))


def vary(c, amount=15):
    return tuple(clamp(c[i] + random.randint(-amount, amount)) for i in range(3))


def vertical_gradient(img, x0, y0, x1, y1, top_color, bottom_color):
    d = ImageDraw.Draw(img)
    h = y1 - y0
    for y in range(y0, y1):
        t = (y - y0) / max(1, h)
        c = (int(top_color[0]*(1-t) + bottom_color[0]*t),
             int(top_color[1]*(1-t) + bottom_color[1]*t),
             int(top_color[2]*(1-t) + bottom_color[2]*t))
        d.line([(x0, y), (x1, y)], fill=c)


def draw_sky(img, top=(120, 165, 210), bottom=(220, 230, 240)):
    vertical_gradient(img, 0, 0, W, int(H*0.65), top, bottom)


def draw_grass(img, top_y=None):
    if top_y is None:
        top_y = int(H * 0.65)
    vertical_gradient(img, 0, top_y, W, H, (90, 130, 60), (45, 80, 35))
    d = ImageDraw.Draw(img)
    for _ in range(4500):
        x = random.randint(0, W)
        y = random.randint(top_y, H)
        depth = (y - top_y) / max(1, H - top_y)
        bladeh = random.randint(3, 10)
        green = random.choice([(60, 105, 45), (78, 122, 55), (95, 145, 70), (40, 80, 30)])
        green = tuple(int(c * (0.6 + 0.4*depth)) for c in green)
        d.line([(x, y), (x + random.randint(-1, 1), y - bladeh)], fill=green, width=1)


def soft_shadow(img, x0, y0, x1, y1, intensity=140, blur=18):
    sh = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    sd.ellipse((x0, y0, x1, y1), fill=(0, 0, 0, intensity))
    sh = sh.filter(ImageFilter.GaussianBlur(blur))
    img.paste(sh, (0, 0), sh)


def wood_plank(width, height, base=(180, 130, 80), darkness=0.0, grain=True):
    """Procedural wood plank with grain, knots, edge shadow."""
    base = shade(base, 1 - darkness)
    plank = Image.new('RGB', (width, height), base)
    pd = ImageDraw.Draw(plank)
    if grain:
        # Long horizontal grain bands
        for _ in range(height // 2):
            y = random.randint(0, height - 1)
            c = vary(base, 14)
            pd.line([(0, y), (width, y)], fill=c)
        # Subtle vertical noise for cross-grain
        for _ in range(width * height // 25):
            px = random.randint(0, width - 1)
            py = random.randint(0, height - 1)
            c = vary(base, 8)
            plank.putpixel((px, py), c)
        # Occasional darker grain swirls
        for _ in range(max(1, width // 30)):
            cx = random.randint(5, width - 6)
            cy = random.randint(5, height - 6)
            r = random.randint(2, 5)
            for rr in range(r, 0, -1):
                col = shade(base, 0.55 + 0.05*rr)
                pd.ellipse((cx-rr, cy-rr//2, cx+rr, cy+rr//2), fill=col)
    # Edge shadows
    for i in range(3):
        c = shade(base, 0.55 + i*0.1)
        pd.line([(0, i), (width, i)], fill=c)
        pd.line([(0, height-1-i), (width, height-1-i)], fill=c)
        pd.line([(i, 0), (i, height)], fill=c)
        pd.line([(width-1-i, 0), (width-1-i, height)], fill=c)
    return plank


def concrete_block(width, height, base=(150, 150, 145)):
    block = Image.new('RGB', (width, height), base)
    bd = ImageDraw.Draw(block)
    for _ in range(width * height // 6):
        px = random.randint(0, width - 1)
        py = random.randint(0, height - 1)
        block.putpixel((px, py), vary(base, 20))
    # Small aggregate
    for _ in range(width * height // 200):
        cx = random.randint(2, width - 3)
        cy = random.randint(2, height - 3)
        r = random.randint(1, 3)
        c = vary(base, 35)
        bd.ellipse((cx-r, cy-r, cx+r, cy+r), fill=c)
    # Shading
    for i in range(4):
        c = shade(base, 0.7 + i*0.05)
        bd.line([(0, height-1-i), (width, height-1-i)], fill=c)
    return block


def draw_label(d, x, y, text, color=(40, 40, 50), bg=(255, 247, 220), arrow_to=None):
    f = font(20, bold=True)
    bbox = d.textbbox((0, 0), text, font=f)
    tw, th = bbox[2]-bbox[0], bbox[3]-bbox[1]
    pad = 8
    box = (x - pad, y - pad, x + tw + pad, y + th + pad)
    d.rounded_rectangle(box, 8, fill=bg, outline=(140, 100, 30), width=2)
    d.text((x, y - 3), text, font=f, fill=color)
    if arrow_to:
        d.line([(box[2], (box[1]+box[3])//2), arrow_to], fill=(140, 100, 30), width=3)
        # arrowhead
        ax, ay = arrow_to
        bx, by = box[2], (box[1]+box[3])//2
        angle = math.atan2(ay - by, ax - bx)
        d.polygon([
            (ax, ay),
            (ax - 12*math.cos(angle - 0.4), ay - 12*math.sin(angle - 0.4)),
            (ax - 12*math.cos(angle + 0.4), ay - 12*math.sin(angle + 0.4))
        ], fill=(140, 100, 30))


def save(img, name):
    path = os.path.join(OUT_DIR, name + '.png')
    img.convert('RGB').save(path, optimize=True)
    print('  ->', path)


# ---------------------------------------------------------------------------
# fence-paling — 3/4 view of a paling fence in a yard
# ---------------------------------------------------------------------------
def fence_paling():
    img = Image.new('RGB', (W, H), (200, 200, 200))
    draw_sky(img, (120, 165, 210), (220, 230, 240))
    draw_grass(img, int(H * 0.62))
    d = ImageDraw.Draw(img)

    # Ground shadow under fence
    soft_shadow(img, 60, int(H*0.62) - 20, W - 60, int(H*0.62) + 60, intensity=100, blur=20)

    fence_top = 110
    fence_bottom = int(H * 0.66)
    paling_h = fence_bottom - fence_top
    paling_w = 84
    gap = 12
    n = 11
    start_x = 100

    # Posts (behind palings)
    post_color = (110, 75, 45)
    for px in [start_x - 30, start_x + n*(paling_w+gap) - 30]:
        post = wood_plank(40, paling_h + 80, base=post_color, grain=True)
        img.paste(post, (px, fence_top - 30))

    # Top and bottom rails
    rail_h = 28
    rail = wood_plank(n*(paling_w+gap) + 80, rail_h, base=(125, 85, 50))
    img.paste(rail, (start_x - 40, fence_top + 40))
    img.paste(rail, (start_x - 40, fence_bottom - 80))

    # Palings (front face)
    palings = [
        (175, 128, 78), (185, 138, 88), (170, 120, 70),
        (190, 145, 95), (180, 132, 82), (165, 118, 70),
        (188, 140, 90), (172, 125, 75), (180, 130, 80),
        (195, 148, 100), (170, 122, 72)
    ]
    for i in range(n):
        px = start_x + i * (paling_w + gap)
        plank = wood_plank(paling_w, paling_h, base=palings[i % len(palings)])
        img.paste(plank, (px, fence_top))
        # Two nail dots per rail
        for ry in [fence_top + 54, fence_bottom - 66]:
            d.ellipse((px + paling_w//2 - 3, ry - 3, px + paling_w//2 + 3, ry + 3),
                      fill=(60, 50, 35), outline=(30, 25, 20))

    # Cap rail
    cap = wood_plank(n*(paling_w+gap) + 120, 28, base=(95, 65, 40))
    img.paste(cap, (start_x - 60, fence_top - 36))
    # Cap underside shadow
    d.rectangle((start_x - 60, fence_top - 8, start_x - 60 + cap.width, fence_top + 2), fill=(50, 35, 20))

    # Concrete at base of posts (peeking through grass)
    for px in [start_x - 30, start_x + n*(paling_w+gap) - 30]:
        cb = concrete_block(60, 30, base=(155, 152, 148))
        img.paste(cb, (px - 10, fence_bottom + 24))

    # Title strip top-left
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Timber paling fence — finished section', font=font(22, bold=True), fill=(231, 236, 243))

    # Labels
    draw_label(d, 880, 130, 'Cap rail', arrow_to=(820, 105))
    draw_label(d, 60, 280, 'Paling 100 × 19', arrow_to=(190, 320))
    draw_label(d, 880, 380, 'Top / bottom rail', arrow_to=(820, 320))
    draw_label(d, 60, 540, 'Post in concrete', arrow_to=(108, 510))

    save(img, 'fence-paling')


# ---------------------------------------------------------------------------
# deck-build — cutaway perspective of deck
# ---------------------------------------------------------------------------
def deck_build():
    img = Image.new('RGB', (W, H), (220, 220, 220))
    draw_sky(img, (130, 170, 210), (220, 225, 235))
    # Lawn
    vertical_gradient(img, 0, int(H*0.7), W, H, (95, 130, 70), (55, 85, 40))
    draw_grass(img, int(H * 0.72))
    d = ImageDraw.Draw(img)

    # Cutaway visible area
    deck_top = 240
    deck_thick = 36
    bearer_h = 48
    joist_h = 90
    pile_top = deck_top + deck_thick + joist_h + bearer_h
    pile_bottom = int(H * 0.86)

    # Soft shadow on ground below deck
    soft_shadow(img, 80, pile_bottom - 6, W - 60, pile_bottom + 80, intensity=120, blur=22)

    # Piles (concrete)
    pile_w = 70
    for cx in [220, 600, 980]:
        pb = concrete_block(pile_w, pile_bottom - pile_top + 30, base=(155, 152, 145))
        img.paste(pb, (cx - pile_w//2, pile_top))

    # Bearer (long timber across piles)
    bearer = wood_plank(W - 160, bearer_h, base=(140, 95, 55))
    img.paste(bearer, (80, pile_top - bearer_h))

    # Joists (perpendicular, foreshortened — show ends)
    joist_color = (160, 115, 70)
    joist_count = 9
    j_spacing = (W - 200) // joist_count
    for i in range(joist_count + 1):
        jx = 100 + i * j_spacing
        # Joist end (small rectangle facing camera) plus run going into the page
        j = wood_plank(46, joist_h, base=joist_color)
        img.paste(j, (jx, deck_top + deck_thick))
        # Perspective stripe going inward
        d.polygon([
            (jx + 46, deck_top + deck_thick),
            (jx + 46 + 18, deck_top + deck_thick + 12),
            (jx + 46 + 18, deck_top + deck_thick + joist_h - 6),
            (jx + 46, deck_top + deck_thick + joist_h),
        ], fill=shade(joist_color, 0.7))

    # Decking boards on top (perspective: receding stripes)
    deck_board_w = 90
    deck_y = deck_top
    deck_palette = [(190, 145, 95), (175, 130, 80), (185, 140, 90), (170, 122, 72)]
    for i in range(int(W // deck_board_w) + 2):
        # Boards run "into the page"; we draw them as receding trapezoids
        col = deck_palette[i % len(deck_palette)]
        x = i * deck_board_w + 20
        # front face (top of deck visible at angle)
        # We'll just paint a trapezoid going from full width at top to slightly shifted further
        plank = wood_plank(deck_board_w - 6, deck_thick, base=col)
        img.paste(plank, (x, deck_y))
        # Gap shadow
        d.rectangle((x + deck_board_w - 6, deck_y, x + deck_board_w, deck_y + deck_thick),
                    fill=shade(col, 0.4))

    # Top edge highlight
    d.line([(0, deck_top - 1), (W, deck_top - 1)], fill=(255, 220, 170), width=2)

    # Title strip
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Low timber deck — cutaway showing structure', font=font(22, bold=True), fill=(231, 236, 243))

    # Labels
    draw_label(d, 60, 220, 'Decking boards', arrow_to=(200, 250))
    draw_label(d, 900, 360, 'Joists at 400–450 c/c', arrow_to=(800, 370))
    draw_label(d, 60, 430, 'Bearer', arrow_to=(180, 450))
    draw_label(d, 900, 540, 'Concrete pile', arrow_to=(990, 580))

    save(img, 'deck-build')


# ---------------------------------------------------------------------------
# weatherboards — exterior wall corner with bevel-back boards and window
# ---------------------------------------------------------------------------
def weatherboards():
    img = Image.new('RGB', (W, H), (220, 220, 220))
    draw_sky(img, (140, 175, 215), (230, 235, 240))
    vertical_gradient(img, 0, int(H*0.78), W, H, (130, 110, 85), (90, 75, 55))
    d = ImageDraw.Draw(img)

    wall_top = 80
    wall_bottom = int(H * 0.78)
    corner_x = 760

    # Right face (in shadow)
    right_face_color = (215, 205, 175)
    d.polygon([(corner_x, wall_top), (W, wall_top + 60), (W, wall_bottom + 40), (corner_x, wall_bottom)],
              fill=shade(right_face_color, 0.65))

    # Left face (lit) — paint weatherboards
    board_h = 64
    overlap = 18
    base_color = (235, 225, 200)
    y = wall_top
    while y < wall_bottom:
        # Each board: subtle shadow line above for overlap
        d.rectangle((40, y, corner_x, y + board_h), fill=base_color)
        # bottom of board casts shadow
        d.rectangle((40, y + board_h - 6, corner_x, y + board_h), fill=shade(base_color, 0.75))
        d.line([(40, y), (corner_x, y)], fill=shade(base_color, 0.5), width=2)
        # tiny wood grain
        for _ in range(8):
            gy = random.randint(y + 4, y + board_h - 8)
            d.line([(50, gy), (corner_x - 10, gy)], fill=shade(base_color, 0.88), width=1)
        y += board_h - overlap

    # Right face mirrored boards
    y = wall_top + 60
    while y < wall_bottom + 40:
        d.polygon([(corner_x, y), (W, y + 0), (W, y + board_h), (corner_x, y + board_h - 18)],
                  fill=shade(base_color, 0.65))
        d.polygon([(corner_x, y + board_h - 24), (W, y + board_h - 24),
                   (W, y + board_h - 18), (corner_x, y + board_h - 18)],
                  fill=shade(base_color, 0.45))
        y += board_h - overlap

    # Corner trim box
    d.rectangle((corner_x - 22, wall_top - 4, corner_x + 22, wall_bottom + 10), fill=shade(base_color, 0.92))
    d.rectangle((corner_x - 22, wall_top - 4, corner_x - 14, wall_bottom + 10), fill=shade(base_color, 0.7))

    # Window
    win_x, win_y, win_w, win_h = 180, 220, 360, 280
    # Frame
    d.rectangle((win_x - 12, win_y - 12, win_x + win_w + 12, win_y + win_h + 12), fill=(70, 75, 80))
    # Sill
    d.rectangle((win_x - 22, win_y + win_h + 10, win_x + win_w + 22, win_y + win_h + 30), fill=(60, 65, 70))
    # Glass
    d.rectangle((win_x, win_y, win_x + win_w, win_y + win_h), fill=(140, 175, 200))
    # Reflection
    d.polygon([(win_x + 30, win_y + 20),
               (win_x + 120, win_y + 20),
               (win_x + 40, win_y + win_h - 20),
               (win_x, win_y + win_h - 100)], fill=(180, 205, 220))
    # Mullion
    d.line([(win_x + win_w//2, win_y), (win_x + win_w//2, win_y + win_h)], fill=(70, 75, 80), width=6)
    d.line([(win_x, win_y + win_h//2), (win_x + win_w, win_y + win_h//2)], fill=(70, 75, 80), width=6)
    # Head flashing
    d.rectangle((win_x - 28, win_y - 22, win_x + win_w + 28, win_y - 12), fill=(180, 180, 185))

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Bevel-back weatherboards — corner box and window detail', font=font(22, bold=True), fill=(231, 236, 243))

    # Labels
    draw_label(d, 60, 130, 'Weatherboard with 30 mm overlap', arrow_to=(120, 200))
    draw_label(d, 800, 130, 'Corner box trim', arrow_to=(770, 200))
    draw_label(d, 60, 470, 'Head flashing OVER cladding', arrow_to=(190, 210))
    draw_label(d, 600, 600, 'Min 175 mm to ground', arrow_to=(450, 570))

    save(img, 'weatherboards')


# ---------------------------------------------------------------------------
# cutting-trims — three corner samples on a wood floor
# ---------------------------------------------------------------------------
def cutting_trims():
    img = Image.new('RGB', (W, H), (245, 240, 230))
    d = ImageDraw.Draw(img)

    # Wall (back) and floor (foreground)
    wall_color = (235, 225, 210)
    d.rectangle((0, 0, W, int(H*0.55)), fill=wall_color)
    # Floor — boards
    floor_top = int(H * 0.55)
    floor_board_h = 36
    for i, y in enumerate(range(floor_top, H, floor_board_h)):
        c = vary((180, 140, 90), 18)
        d.rectangle((0, y, W, y + floor_board_h), fill=c)
        d.line([(0, y), (W, y)], fill=shade(c, 0.6), width=2)

    # Shadow line at wall/floor
    d.rectangle((0, floor_top - 4, W, floor_top), fill=shade(wall_color, 0.8))

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Interior trim joints — external mitre · internal scribe · scarf', font=font(22, bold=True), fill=(231, 236, 243))

    # Three panels showing trim samples
    panel_y = 130
    panel_w = 360
    panel_h = 320
    gap = 24
    for i, (title, kind) in enumerate([('External mitre', 'mitre'),
                                       ('Internal scribe', 'scribe'),
                                       ('Scarf joint', 'scarf')]):
        x = 30 + i * (panel_w + gap)
        # Panel background
        d.rounded_rectangle((x, panel_y, x + panel_w, panel_y + panel_h), 14,
                            fill=(252, 248, 240), outline=(180, 160, 130), width=2)
        d.text((x + 16, panel_y + 14), title, font=font(20, bold=True), fill=(40, 40, 50))

        # Draw trim sample inside
        cx, cy = x + panel_w//2, panel_y + panel_h//2 + 30
        if kind == 'mitre':
            # External corner — two pieces meeting outward
            d.polygon([(cx - 130, cy - 30), (cx, cy - 30), (cx, cy + 30), (cx - 130, cy + 30)],
                      fill=(238, 232, 220), outline=(140, 120, 95), width=2)
            d.polygon([(cx + 130, cy - 30), (cx, cy - 30), (cx, cy + 30), (cx + 130, cy + 30)],
                      fill=(238, 232, 220), outline=(140, 120, 95), width=2)
            d.line([(cx - 5, cy - 30), (cx + 30, cy + 30)], fill=(80, 60, 40), width=2)
            d.text((x + 16, panel_y + panel_h - 30), '45° + 45° both pieces', font=font(15), fill=(80, 70, 60))
        elif kind == 'scribe':
            d.polygon([(cx - 130, cy - 30), (cx + 130, cy - 30),
                       (cx + 130, cy + 30), (cx - 130, cy + 30)],
                      fill=(238, 232, 220), outline=(140, 120, 95), width=2)
            # Coped profile
            curve = [(cx, cy - 30)]
            for k in range(20):
                t = k / 20
                px = cx + int(20 * math.sin(t * math.pi * 2))
                py = cy - 30 + int(60 * t)
                curve.append((px, py))
            curve.append((cx, cy + 30))
            d.line(curve, fill=(70, 120, 200), width=3)
            d.text((x + 16, panel_y + panel_h - 30), 'coping saw follows the profile', font=font(15), fill=(80, 70, 60))
        else:  # scarf
            d.polygon([(cx - 130, cy - 30), (cx + 20, cy - 30),
                       (cx - 30, cy + 30), (cx - 130, cy + 30)],
                      fill=(238, 232, 220), outline=(140, 120, 95), width=2)
            d.polygon([(cx + 130, cy - 30), (cx + 20, cy - 30),
                       (cx - 30, cy + 30), (cx + 130, cy + 30)],
                      fill=(228, 222, 210), outline=(140, 120, 95), width=2)
            d.line([(cx + 20, cy - 30), (cx - 30, cy + 30)], fill=(70, 120, 200), width=2)
            d.text((x + 16, panel_y + panel_h - 30), '45° overlap — over a stud', font=font(15), fill=(80, 70, 60))

    save(img, 'cutting-trims')


# ---------------------------------------------------------------------------
# gibbing — room with one wall partly sheeted, framing visible
# ---------------------------------------------------------------------------
def gibbing():
    img = Image.new('RGB', (W, H), (240, 238, 235))
    d = ImageDraw.Draw(img)

    # Floor (perspective)
    floor_color = (160, 120, 80)
    d.polygon([(0, int(H*0.72)), (W, int(H*0.72)), (W, H), (0, H)], fill=shade(floor_color, 0.7))
    # Subtle floorboards
    for i in range(0, W, 90):
        d.line([(i, int(H*0.72)), (i, H)], fill=shade(floor_color, 0.5), width=2)

    # Back wall
    d.rectangle((0, 60, W, int(H*0.72)), fill=(225, 218, 205))

    # Framing on the left half (timber studs visible)
    stud_color = (170, 130, 85)
    stud_w = 60
    n_studs = 6
    fr_left = 60
    for i in range(n_studs):
        sx = fr_left + i * 130
        stud = wood_plank(stud_w, int(H*0.72) - 80, base=stud_color)
        img.paste(stud, (sx, 80))
    # Top plate
    plate = wood_plank(int(W*0.5) - fr_left, 36, base=shade(stud_color, 0.9))
    img.paste(plate, (fr_left, 80))
    # Bottom plate
    img.paste(plate, (fr_left, int(H*0.72) - 60))
    # Dwangs (mid noggins)
    for i in range(n_studs - 1):
        sx = fr_left + i * 130 + stud_w
        dwang = wood_plank(130 - stud_w, 28, base=shade(stud_color, 0.92))
        img.paste(dwang, (sx, 300))

    # GIB sheets on the right half (off-white panels)
    gib_color = (245, 240, 230)
    # Two sheets, staggered
    sheets = [
        (int(W*0.5), 80, W - 30, 380),  # top sheet
        (int(W*0.5), 380, int(W*0.78), int(H*0.72) - 30),
        (int(W*0.78), 380, W - 30, int(H*0.72) - 30)
    ]
    for s in sheets:
        d.rectangle(s, fill=gib_color, outline=shade(gib_color, 0.8), width=2)
        # Screw dots
        for sy in [s[1] + 40, s[1] + (s[3]-s[1])//2, s[3] - 40]:
            for sx in range(s[0] + 60, s[2] - 30, 110):
                d.ellipse((sx-3, sy-3, sx+3, sy+3), fill=(110, 110, 110))

    # Bevelled edge line where sheets meet
    d.line([(sheets[0][0], 380), (sheets[2][2], 380)], fill=shade(gib_color, 0.65), width=2)
    d.line([(sheets[2][0], 380), (sheets[2][0], int(H*0.72)-30)], fill=shade(gib_color, 0.65), width=2)

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Plasterboard install — framing left, sheets right', font=font(22, bold=True), fill=(231, 236, 243))

    # Labels
    draw_label(d, 60, 120, 'Studs @ 400/600 c/c', arrow_to=(150, 200))
    draw_label(d, 60, 380, 'Dwang (noggin)', arrow_to=(220, 310))
    draw_label(d, 800, 130, 'Sheets run horizontally', arrow_to=(750, 220))
    draw_label(d, 800, 580, 'Joints staggered', arrow_to=(770, 400))

    save(img, 'gibbing')


# ---------------------------------------------------------------------------
# plastering — close-up of trowel applying compound to a wall
# ---------------------------------------------------------------------------
def plastering():
    img = Image.new('RGB', (W, H), (235, 235, 232))
    d = ImageDraw.Draw(img)

    # Wall background
    d.rectangle((0, 60, W, H), fill=(235, 230, 220))
    for _ in range(800):
        x = random.randint(0, W-1); y = random.randint(60, H-1)
        img.putpixel((x, y), vary((235, 230, 220), 10))

    # Joint (vertical seam in wall)
    seam_x = 600
    d.line([(seam_x, 60), (seam_x, H)], fill=(220, 215, 205), width=2)

    # Three coat zones visible (left to right)
    # Coat 1 (narrow)
    d.polygon([(seam_x - 70, 60), (seam_x + 70, 60),
               (seam_x + 60, H), (seam_x - 60, H)],
              fill=(255, 250, 245), outline=None)
    # Coat 2 (wider)
    d.polygon([(seam_x - 160, 60), (seam_x + 160, 60),
               (seam_x + 150, H), (seam_x - 150, H)],
              fill=(252, 248, 240, ))
    # Coat 3 (widest, very faint)
    d.polygon([(seam_x - 280, 60), (seam_x + 280, 60),
               (seam_x + 270, H), (seam_x - 270, H)],
              fill=(248, 244, 234))

    # Re-overlay each with feathering
    for radius, alpha_col in [(70, (255, 252, 248)), (160, (252, 248, 240)), (280, (250, 245, 235))]:
        # Solid centre then alpha blend
        ov = Image.new('RGBA', (W, H), (0,0,0,0))
        od = ImageDraw.Draw(ov)
        od.rectangle((seam_x - radius, 60, seam_x + radius, H), fill=alpha_col + (180,))
        img.paste(ov, (0,0), ov)

    # Trowel
    trowel_blade_pts = [(140, 360), (560, 320), (600, 380), (180, 420)]
    d.polygon(trowel_blade_pts, fill=(190, 190, 195), outline=(120, 120, 125), width=3)
    # Handle
    d.polygon([(80, 370), (170, 350), (180, 410), (90, 430)], fill=(60, 50, 40), outline=(30, 25, 20), width=2)
    d.rectangle((40, 380, 100, 400), fill=(80, 60, 40))

    # Compound being applied (a smear along trowel edge)
    smear = Image.new('RGBA', (W, H), (0,0,0,0))
    sd = ImageDraw.Draw(smear)
    sd.polygon([(550, 310), (820, 290), (830, 360), (560, 380)], fill=(255, 253, 248, 230))
    smear = smear.filter(ImageFilter.GaussianBlur(4))
    img.paste(smear, (0, 0), smear)

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Stopping joints — three coats, each wider than the last', font=font(22, bold=True), fill=(231, 236, 243))

    # Labels
    draw_label(d, 70, 130, 'Coat 1 — 100 mm', arrow_to=(540, 200))
    draw_label(d, 70, 530, 'Coat 2 — 200 mm', arrow_to=(450, 540))
    draw_label(d, 900, 130, 'Coat 3 — 300 mm, feathered', arrow_to=(850, 200))

    save(img, 'plastering')


# ---------------------------------------------------------------------------
# hang-door — perspective view of door in frame
# ---------------------------------------------------------------------------
def hang_door():
    img = Image.new('RGB', (W, H), (240, 235, 225))
    d = ImageDraw.Draw(img)

    # Floor and back wall
    d.rectangle((0, 0, W, int(H*0.72)), fill=(238, 232, 218))
    d.rectangle((0, int(H*0.72), W, H), fill=(160, 120, 80))
    for i in range(0, W, 90):
        d.line([(i, int(H*0.72)), (i, H)], fill=(130, 95, 65), width=2)

    # Door frame (jambs)
    fx, fy, fw, fh = 320, 100, 560, 580
    # Outer architraves
    d.rectangle((fx - 30, fy - 30, fx + fw + 30, fy - 12), fill=(252, 248, 240), outline=(180, 160, 130))
    d.rectangle((fx - 30, fy - 30, fx - 12, fy + fh + 30), fill=(252, 248, 240), outline=(180, 160, 130))
    d.rectangle((fx + fw + 12, fy - 30, fx + fw + 30, fy + fh + 30), fill=(252, 248, 240), outline=(180, 160, 130))
    # Frame jambs
    d.rectangle((fx - 12, fy - 12, fx + fw + 12, fy), fill=(70, 80, 90))
    d.rectangle((fx - 12, fy, fx, fy + fh), fill=(70, 80, 90))
    d.rectangle((fx + fw, fy, fx + fw + 12, fy + fh), fill=(70, 80, 90))

    # Door (paint the rails + panels)
    door = wood_plank(fw, fh, base=(220, 215, 205), grain=False)
    img.paste(door, (fx, fy))
    # Door panels
    for px, py, pw, ph in [(fx+30, fy+30, fw-60, fh//3 - 30),
                            (fx+30, fy+fh//3 + 20, fw-60, fh//3 - 30),
                            (fx+30, fy+2*fh//3 + 20, fw-60, fh//3 - 60)]:
        d.rounded_rectangle((px, py, px+pw, py+ph), 6, fill=(232, 226, 215), outline=(180, 165, 140), width=3)
        d.rounded_rectangle((px+10, py+10, px+pw-10, py+ph-10), 4, outline=(210, 200, 180), width=2)

    # Hinges (left side)
    for hy in [fy + 60, fy + fh//2 - 20, fy + fh - 80]:
        d.rounded_rectangle((fx - 14, hy, fx + 6, hy + 70), 3, fill=(130, 130, 135), outline=(70, 70, 75))
        for sy in [hy + 10, hy + 35, hy + 60]:
            d.ellipse((fx - 6, sy, fx, sy + 4), fill=(60, 60, 65))

    # Door handle (right side)
    hx = fx + fw - 40
    hy = fy + fh//2 - 20
    d.ellipse((hx - 10, hy - 10, hx + 10, hy + 10), fill=(180, 150, 60), outline=(120, 90, 30), width=2)
    d.rounded_rectangle((hx, hy - 4, hx + 60, hy + 4), 4, fill=(200, 170, 80), outline=(120, 90, 30))

    # Soft shadow under door
    soft_shadow(img, fx - 60, fy + fh - 10, fx + fw + 60, fy + fh + 40, intensity=120, blur=12)

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Hanging an interior door — three hinges, handle at 1000 mm', font=font(22, bold=True), fill=(231, 236, 243))

    # Labels
    draw_label(d, 60, 180, 'Hinge 175 mm from top', arrow_to=(305, 165))
    draw_label(d, 60, 360, 'Middle hinge', arrow_to=(305, 360))
    draw_label(d, 60, 560, 'Hinge 250 mm from bottom', arrow_to=(305, 590))
    draw_label(d, 940, 380, 'Handle ~1000 mm', arrow_to=(845, 380))

    save(img, 'hang-door')


# ---------------------------------------------------------------------------
# painting — roller on wall with paint tray
# ---------------------------------------------------------------------------
def painting():
    img = Image.new('RGB', (W, H), (245, 240, 230))
    d = ImageDraw.Draw(img)

    # Wall (partially painted)
    old_color = (215, 200, 175)
    new_color = (235, 230, 222)
    d.rectangle((0, 60, W, int(H*0.78)), fill=old_color)
    # Painted area (irregular edge)
    paint_pts = [(0, 60)]
    x = 0
    while x < W:
        x += random.randint(50, 100)
        paint_pts.append((x, int(H*0.4 + random.randint(-30, 30))))
    paint_pts.append((W, 60))
    paint_pts.append((W, 60))
    # Painted top half
    d.polygon([(0, 60)] + [(p[0], min(p[1], int(H*0.4))) for p in paint_pts] + [(W, 60)],
              fill=new_color)

    # Roller marks (subtle stripes)
    for y in range(80, int(H*0.4), 24):
        d.line([(40, y), (W - 40, y)], fill=shade(new_color, 0.97), width=2)

    # Floor + drop sheet
    d.rectangle((0, int(H*0.78), W, H), fill=(120, 90, 60))
    # Drop sheet
    d.polygon([(60, int(H*0.78)), (W - 60, int(H*0.78)), (W - 30, H), (30, H)],
              fill=(238, 230, 215), outline=(190, 180, 160))
    # Paint splatters on sheet
    for _ in range(40):
        sx = random.randint(80, W - 80)
        sy = random.randint(int(H*0.8), H - 20)
        r = random.randint(2, 7)
        d.ellipse((sx-r, sy-r, sx+r, sy+r), fill=new_color)

    # Roller
    roller_y = int(H*0.55)
    # Roller body
    d.rounded_rectangle((480, roller_y - 30, 760, roller_y + 30), 28, fill=(245, 240, 225), outline=(180, 170, 150), width=2)
    # Texture lines on roller
    for i in range(485, 755, 6):
        d.line([(i, roller_y - 25), (i, roller_y + 25)], fill=(220, 210, 195), width=1)
    # Roller frame (metal)
    d.line([(770, roller_y), (870, roller_y + 100)], fill=(140, 140, 145), width=8)
    d.line([(870, roller_y + 100), (940, roller_y + 100)], fill=(140, 140, 145), width=8)
    # Handle
    d.rounded_rectangle((940, roller_y + 80, 1140, roller_y + 130), 16, fill=(50, 80, 140), outline=(30, 50, 90), width=3)

    # Paint tray
    d.polygon([(820, int(H*0.85)), (1140, int(H*0.85)),
               (1170, int(H*0.95)), (790, int(H*0.95))],
              fill=(200, 200, 205), outline=(150, 150, 155), width=2)
    # Paint in tray
    d.polygon([(840, int(H*0.87)), (1120, int(H*0.87)),
               (1150, int(H*0.93)), (810, int(H*0.93))],
              fill=new_color)

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Painting interior walls — cut in, then roll', font=font(22, bold=True), fill=(231, 236, 243))

    # Labels
    draw_label(d, 60, 130, 'Paint already cut in along edges', arrow_to=(180, 100))
    draw_label(d, 60, 420, 'Roll W/N pattern,', arrow_to=(470, 420))
    draw_label(d, 60, 460, 'then back-roll', arrow_to=(470, 460))
    draw_label(d, 900, 660, 'Drop sheet — canvas, not plastic', arrow_to=(820, 660))

    save(img, 'painting')


# ---------------------------------------------------------------------------
# tiling-splashback — kitchen splashback with subway tiles
# ---------------------------------------------------------------------------
def tiling_splashback():
    img = Image.new('RGB', (W, H), (240, 235, 225))
    d = ImageDraw.Draw(img)

    # Back wall
    d.rectangle((0, 60, W, int(H*0.78)), fill=(232, 226, 215))

    # Bench (counter) along bottom
    bench_y = int(H * 0.78)
    d.rectangle((0, bench_y, W, H), fill=(100, 90, 75))
    # Bench top edge (lighter)
    d.rectangle((0, bench_y, W, bench_y + 16), fill=(200, 180, 150))

    # Subway tiles
    tile_w, tile_h = 110, 56
    grout = (210, 200, 180)
    tile_color = (245, 240, 230)
    rows = []
    y = bench_y - tile_h - 6
    while y > 80:
        rows.append(y)
        y -= tile_h + 6

    for row_i, y in enumerate(rows):
        offset = (tile_w // 2) if row_i % 2 else 0
        x = -offset
        while x < W:
            # Slight color variation per tile
            c = vary(tile_color, 6)
            d.rectangle((x + 3, y + 3, x + tile_w - 3, y + tile_h - 3),
                        fill=c, outline=shade(c, 0.85), width=2)
            # Highlight on top edge
            d.line([(x + 6, y + 6), (x + tile_w - 6, y + 6)], fill=shade(c, 1.05), width=1)
            x += tile_w + 6

    # Silicone bead at bench joint
    d.rectangle((0, bench_y - 6, W, bench_y), fill=(240, 235, 220))

    # Cup / canister on bench for context
    d.ellipse((140, bench_y + 80, 230, bench_y + 220), fill=(230, 220, 200), outline=(140, 130, 110), width=3)
    d.rectangle((130, bench_y + 60, 240, bench_y + 90), fill=(230, 220, 200), outline=(140, 130, 110), width=3)

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Kitchen splashback — subway tiles, silicone at bench join', font=font(22, bold=True), fill=(231, 236, 243))

    # Labels
    draw_label(d, 60, 130, 'Balanced cuts at edges', arrow_to=(180, 200))
    draw_label(d, 900, 130, 'Brick-bond pattern', arrow_to=(900, 220))
    draw_label(d, 700, 600, 'Silicone bead — never grout', arrow_to=(680, 565))

    save(img, 'tiling-splashback')


# ---------------------------------------------------------------------------
# shelves — wall with shelf and books
# ---------------------------------------------------------------------------
def shelves():
    img = Image.new('RGB', (W, H), (235, 230, 218))
    d = ImageDraw.Draw(img)

    # Wall texture
    for _ in range(2000):
        x = random.randint(0, W-1); y = random.randint(60, H-1)
        img.putpixel((x, y), vary((235, 230, 218), 6))

    # Shelf
    shelf_y = int(H * 0.42)
    shelf_t = 28
    shelf_l, shelf_r = 200, W - 200
    # Drop shadow
    soft_shadow(img, shelf_l - 10, shelf_y + shelf_t + 4, shelf_r + 10, shelf_y + shelf_t + 30,
                intensity=120, blur=8)
    shelf = wood_plank(shelf_r - shelf_l, shelf_t, base=(180, 138, 92))
    img.paste(shelf, (shelf_l, shelf_y))
    # Front edge (lighter)
    d.rectangle((shelf_l, shelf_y, shelf_r, shelf_y + 4), fill=shade((180, 138, 92), 1.15))

    # Brackets
    for bx in [shelf_l + 60, shelf_r - 60]:
        d.polygon([(bx, shelf_y + shelf_t), (bx + 50, shelf_y + shelf_t),
                   (bx, shelf_y + shelf_t + 80)],
                  fill=(70, 75, 85), outline=(30, 35, 40), width=2)

    # Books
    bx = shelf_l + 30
    while bx < shelf_r - 100:
        bh = random.randint(110, 180)
        bw = random.randint(38, 64)
        bcol = random.choice([
            (180, 60, 60), (60, 90, 160), (200, 150, 60),
            (80, 130, 80), (130, 80, 140), (60, 60, 70),
            (190, 100, 50), (40, 80, 120)
        ])
        d.rectangle((bx, shelf_y - bh, bx + bw, shelf_y), fill=bcol, outline=shade(bcol, 0.6), width=2)
        d.rectangle((bx + 4, shelf_y - bh + 14, bx + bw - 4, shelf_y - bh + 18),
                    fill=shade(bcol, 1.2))
        bx += bw + 4

    # A plant pot
    pot_x = shelf_r - 90
    d.polygon([(pot_x, shelf_y - 70), (pot_x + 70, shelf_y - 70),
               (pot_x + 60, shelf_y), (pot_x + 10, shelf_y)],
              fill=(170, 100, 70), outline=(110, 65, 45), width=2)
    # Leaves
    for ang in range(-60, 80, 18):
        ex = pot_x + 35 + int(40 * math.cos(math.radians(ang)))
        ey = shelf_y - 70 - 30 + int(35 * math.sin(math.radians(ang)))
        d.ellipse((ex - 12, ey - 22, ex + 12, ey + 6), fill=(60, 110, 70), outline=(40, 80, 50))

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Wall-mounted shelf — fixed to studs with brackets', font=font(22, bold=True), fill=(231, 236, 243))

    draw_label(d, 60, 320, 'Shelf', arrow_to=(220, 340))
    draw_label(d, 60, 460, 'Bracket into stud', arrow_to=(260, 480))

    save(img, 'shelves')


# ---------------------------------------------------------------------------
# flat-pack — cabinet assembly with cam and dowel
# ---------------------------------------------------------------------------
def flat_pack():
    img = Image.new('RGB', (W, H), (245, 240, 230))
    d = ImageDraw.Draw(img)

    # Floor
    d.rectangle((0, int(H*0.7), W, H), fill=(180, 150, 110))
    for i in range(0, W, 90):
        d.line([(i, int(H*0.7)), (i, H)], fill=(150, 120, 85), width=2)
    # Back wall
    d.rectangle((0, 60, W, int(H*0.7)), fill=(232, 226, 215))

    # Cabinet box (3/4 view)
    cab_x, cab_y, cab_w, cab_h = 200, 180, 520, 460
    # Front
    d.rectangle((cab_x, cab_y, cab_x + cab_w, cab_y + cab_h),
                fill=(225, 215, 195), outline=(160, 145, 120), width=3)
    # Side (right, in perspective)
    d.polygon([(cab_x + cab_w, cab_y), (cab_x + cab_w + 90, cab_y - 50),
               (cab_x + cab_w + 90, cab_y + cab_h - 50), (cab_x + cab_w, cab_y + cab_h)],
              fill=(200, 188, 168), outline=(140, 125, 100), width=3)
    # Top
    d.polygon([(cab_x, cab_y), (cab_x + cab_w, cab_y),
               (cab_x + cab_w + 90, cab_y - 50), (cab_x + 90, cab_y - 50)],
              fill=(240, 232, 215), outline=(160, 145, 120), width=3)
    # Shelf inside (horizontal line)
    d.line([(cab_x + 10, cab_y + cab_h//2), (cab_x + cab_w - 10, cab_y + cab_h//2)],
           fill=(160, 145, 120), width=3)
    # Door split
    d.line([(cab_x + cab_w//2, cab_y), (cab_x + cab_w//2, cab_y + cab_h)],
           fill=(180, 165, 140), width=2)
    # Handles
    for cx in [cab_x + cab_w//2 - 30, cab_x + cab_w//2 + 30]:
        d.rounded_rectangle((cx - 5, cab_y + cab_h//2 - 50, cx + 5, cab_y + cab_h//2 + 50), 5,
                            fill=(80, 80, 90))

    # Exploded cam+dowel detail (right side, floating)
    ex, ey = 880, 320
    # Panel slice
    d.rectangle((ex, ey, ex + 200, ey + 40), fill=(225, 215, 195), outline=(160, 145, 120), width=3)
    d.rectangle((ex + 80, ey + 70, ex + 120, ey + 250), fill=(225, 215, 195), outline=(160, 145, 120), width=3)
    # Dowel (vertical)
    d.rectangle((ex + 96, ey + 45, ex + 104, ey + 70), fill=(150, 110, 60), outline=(90, 65, 35), width=2)
    # Cam barrel
    d.ellipse((ex + 80, ey + 105, ex + 120, ey + 145), fill=(220, 220, 225), outline=(140, 140, 145), width=3)
    d.ellipse((ex + 90, ey + 115, ex + 110, ey + 135), fill=(40, 40, 50))
    # Half-turn arrow
    d.arc((ex + 75, ey + 100, ex + 125, ey + 150), 200, 340, fill=(220, 130, 30), width=4)
    d.polygon([(ex + 122, ey + 110), (ex + 132, ey + 115), (ex + 124, ey + 124)], fill=(220, 130, 30))

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Flat-pack assembly — cam and dowel detail', font=font(22, bold=True), fill=(231, 236, 243))

    draw_label(d, 30, 250, 'Carcass — square it before doors', arrow_to=(200, 350))
    draw_label(d, 880, 200, 'Dowel + glue', arrow_to=(960, 290))
    draw_label(d, 880, 580, 'Cam barrel — half turn locks', arrow_to=(950, 470))

    save(img, 'flat-pack')


# ---------------------------------------------------------------------------
# plasterboard-patch — wall with hole and a square patch beside it
# ---------------------------------------------------------------------------
def plasterboard_patch():
    img = Image.new('RGB', (W, H), (240, 235, 225))
    d = ImageDraw.Draw(img)

    # Wall
    d.rectangle((0, 60, W, H), fill=(232, 226, 215))
    for _ in range(2500):
        x = random.randint(0, W-1); y = random.randint(60, H-1)
        img.putpixel((x, y), vary((232, 226, 215), 6))

    # Hole (cut square with damaged edges visible)
    hole_x, hole_y, hole_w, hole_h = 280, 280, 240, 180
    d.rectangle((hole_x, hole_y, hole_x + hole_w, hole_y + hole_h), fill=(70, 65, 60))
    # Backer timber visible behind the hole
    backer_color = (180, 138, 92)
    d.rectangle((hole_x - 4, hole_y + 50, hole_x + hole_w + 4, hole_y + 90), fill=backer_color)
    d.rectangle((hole_x - 4, hole_y + hole_h - 90, hole_x + hole_w + 4, hole_y + hole_h - 50), fill=backer_color)
    # Rough plaster edge
    for i in range(0, hole_w, 8):
        d.rectangle((hole_x + i, hole_y - 4, hole_x + i + 4, hole_y), fill=vary((232, 226, 215), 25))
        d.rectangle((hole_x + i, hole_y + hole_h, hole_x + i + 4, hole_y + hole_h + 4), fill=vary((232, 226, 215), 25))

    # GIB off-cut patch (next to the hole, ready to fit)
    patch_x, patch_y = 700, 320
    patch = wood_plank(hole_w, hole_h, base=(245, 240, 230), grain=False)
    img.paste(patch, (patch_x, patch_y))
    d.rectangle((patch_x, patch_y, patch_x + hole_w, patch_y + hole_h),
                outline=(180, 170, 155), width=3)
    # Screw dots on patch (where they'd go)
    for sx in [patch_x + 30, patch_x + hole_w//2, patch_x + hole_w - 30]:
        d.ellipse((sx-3, patch_y + 60, sx+3, patch_y + 66), fill=(110, 110, 110))
        d.ellipse((sx-3, patch_y + hole_h - 66, sx+3, patch_y + hole_h - 60), fill=(110, 110, 110))

    # Compound bucket on floor (visual context)
    bucket_x, bucket_y = 100, H - 200
    d.polygon([(bucket_x, bucket_y), (bucket_x + 120, bucket_y),
               (bucket_x + 100, H - 40), (bucket_x + 20, H - 40)],
              fill=(220, 220, 225), outline=(150, 150, 160), width=3)
    d.ellipse((bucket_x - 4, bucket_y - 12, bucket_x + 124, bucket_y + 16), fill=(240, 240, 245), outline=(150, 150, 160), width=3)

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Patch a plasterboard hole — cut square, backer, patch, stop',
           font=font(22, bold=True), fill=(231, 236, 243))

    draw_label(d, 60, 220, 'Cut hole square, not torn', arrow_to=(280, 280))
    draw_label(d, 60, 460, 'Timber backer behind', arrow_to=(280, 350))
    draw_label(d, 900, 250, 'GIB off-cut patch', arrow_to=(800, 340))

    save(img, 'plasterboard-patch')


# ---------------------------------------------------------------------------
# caulking — close-up of a bead being applied between a wall and bench
# ---------------------------------------------------------------------------
def caulking():
    img = Image.new('RGB', (W, H), (240, 240, 240))
    d = ImageDraw.Draw(img)

    # Wall
    d.rectangle((0, 60, W, int(H*0.55)), fill=(245, 240, 232))
    # Bench
    d.rectangle((0, int(H*0.55), W, H), fill=(160, 130, 95))
    # Bench top edge
    d.rectangle((0, int(H*0.55), W, int(H*0.55) + 18), fill=(210, 180, 140))

    joint_y = int(H * 0.55) + 6

    # Masking tape lines
    d.rectangle((0, joint_y - 38, W, joint_y - 26), fill=(240, 220, 150), outline=(190, 170, 110))
    d.rectangle((0, joint_y + 14, W, joint_y + 26), fill=(240, 220, 150), outline=(190, 170, 110))

    # Caulk bead (concave, glossy)
    bead = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    bd = ImageDraw.Draw(bead)
    bd.rectangle((0, joint_y - 24, W, joint_y + 14), fill=(250, 250, 248, 255))
    # Concave shading
    for i in range(8):
        bd.line([(0, joint_y - i), (W, joint_y - i)], fill=(220, 220, 215, 180 - i*20))
    # Highlight
    bd.line([(0, joint_y - 16), (W, joint_y - 16)], fill=(255, 255, 255, 220))
    img.paste(bead, (0, 0), bead)

    # Caulking gun (right side, applying bead)
    gun_y = joint_y - 80
    gx = 760
    # Cartridge body
    d.rounded_rectangle((gx, gun_y - 50, gx + 360, gun_y + 50), 28,
                        fill=(50, 110, 80), outline=(20, 70, 50), width=3)
    # Cartridge label
    d.rectangle((gx + 60, gun_y - 30, gx + 320, gun_y + 30), fill=(240, 240, 240))
    d.text((gx + 100, gun_y - 18), 'NEUTRAL', font=font(20, bold=True), fill=(40, 80, 50))
    d.text((gx + 100, gun_y + 4), 'CURE', font=font(20, bold=True), fill=(40, 80, 50))
    # Nozzle
    d.polygon([(gx, gun_y - 16), (gx - 100, gun_y - 4),
               (gx - 100, gun_y + 4), (gx, gun_y + 16)],
              fill=(40, 90, 65), outline=(20, 50, 35), width=2)
    # Plunger handle
    d.rectangle((gx + 360, gun_y - 10, gx + 460, gun_y + 10), fill=(70, 70, 75))
    d.polygon([(gx + 460, gun_y + 60), (gx + 460, gun_y - 60), (gx + 500, gun_y)], fill=(70, 70, 75))

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Caulking — tape both sides, smooth the bead, peel tape immediately',
           font=font(22, bold=True), fill=(231, 236, 243))

    draw_label(d, 60, 280, 'Masking tape lines', arrow_to=(180, joint_y - 32))
    draw_label(d, 60, 410, 'Concave smoothed bead', arrow_to=(360, joint_y - 5))
    draw_label(d, 60, 580, 'Neutral-cure for tapware & stainless', arrow_to=(700, gun_y - 30))

    save(img, 'caulking')


# ---------------------------------------------------------------------------
# hanging-pictures — wall with a picture and a mirror, level visible
# ---------------------------------------------------------------------------
def hanging_pictures():
    img = Image.new('RGB', (W, H), (235, 228, 215))
    d = ImageDraw.Draw(img)

    # Wall
    for _ in range(2500):
        x = random.randint(0, W-1); y = random.randint(0, H-1)
        img.putpixel((x, y), vary((235, 228, 215), 5))

    # Floor strip
    d.rectangle((0, int(H*0.85), W, H), fill=(160, 130, 95))
    # Skirting
    d.rectangle((0, int(H*0.85) - 60, W, int(H*0.85)), fill=(245, 240, 230), outline=(180, 165, 140))

    # Picture frame 1 (landscape)
    f1 = (180, 200, 540, 480)
    d.rectangle(f1, fill=(110, 80, 50), outline=(60, 40, 20), width=3)
    d.rectangle((f1[0]+24, f1[1]+24, f1[2]-24, f1[3]-24), fill=(220, 215, 200))
    # Simulated art: a landscape
    d.rectangle((f1[0]+24, f1[1]+24, f1[2]-24, f1[3]-130), fill=(140, 175, 205))
    d.polygon([(f1[0]+24, f1[3]-130), (f1[0]+150, f1[3]-200),
               (f1[0]+250, f1[3]-150), (f1[0]+360, f1[3]-180),
               (f1[2]-24, f1[3]-140), (f1[2]-24, f1[3]-130)],
              fill=(90, 130, 90))
    d.rectangle((f1[0]+24, f1[3]-130, f1[2]-24, f1[3]-24), fill=(160, 145, 110))

    # Picture frame 2 (portrait)
    f2 = (660, 180, 900, 560)
    d.rectangle(f2, fill=(180, 150, 90), outline=(110, 90, 50), width=3)
    d.rectangle((f2[0]+18, f2[1]+18, f2[2]-18, f2[3]-18), fill=(245, 240, 225))
    # Abstract shapes
    d.ellipse((f2[0]+50, f2[1]+50, f2[2]-50, f2[2]-180), fill=(200, 120, 80))
    d.rectangle((f2[0]+60, f2[3]-120, f2[2]-60, f2[3]-50), fill=(80, 110, 140))

    # Mirror (round)
    cx, cy, r = 1060, 340, 130
    d.ellipse((cx-r-12, cy-r-12, cx+r+12, cy+r+12), fill=(180, 150, 90), outline=(110, 90, 50), width=3)
    d.ellipse((cx-r, cy-r, cx+r, cy+r), fill=(180, 200, 215))
    d.polygon([(cx-r+30, cy-r+30), (cx+30, cy-r+10),
               (cx-r+50, cy+30)], fill=(220, 230, 240))

    # Spirit level on the frames
    lev_y = f2[1] - 30
    d.rectangle((f2[0] - 10, lev_y, f2[2] + 10, lev_y + 16), fill=(220, 220, 80), outline=(140, 140, 50), width=2)
    # Bubble
    d.ellipse((f2[0] + 100, lev_y + 2, f2[0] + 150, lev_y + 14), fill=(180, 200, 230), outline=(80, 100, 130))
    d.ellipse((f2[0] + 115, lev_y + 5, f2[0] + 135, lev_y + 11), fill=(80, 130, 80))

    # D-rings indicated as small ovals
    for dx in [f1[0] + 60, f1[2] - 60]:
        d.ellipse((dx - 6, f1[1] + 12, dx + 6, f1[1] + 24), outline=(80, 60, 40), width=2)

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Hang pictures and mirrors — two fixings, level, into something solid',
           font=font(22, bold=True), fill=(231, 236, 243))

    draw_label(d, 60, 130, 'Two D-rings + screws — better than wire', arrow_to=(160, 220))
    draw_label(d, 940, 130, 'Level across both fixings', arrow_to=(800, 200))
    draw_label(d, 940, 540, 'Heavy mirror? Into a stud', arrow_to=(990, 340))

    save(img, 'hanging-pictures')


# ---------------------------------------------------------------------------
# curtain-rails — window with curtains and rail
# ---------------------------------------------------------------------------
def curtain_rails():
    img = Image.new('RGB', (W, H), (235, 230, 220))
    d = ImageDraw.Draw(img)

    # Wall
    d.rectangle((0, 0, W, H), fill=(235, 230, 218))
    # Floor
    d.rectangle((0, int(H*0.85), W, H), fill=(160, 130, 95))
    # Skirting
    d.rectangle((0, int(H*0.85) - 60, W, int(H*0.85)), fill=(245, 240, 230), outline=(180, 165, 140))

    # Window
    win = (340, 220, 860, 600)
    # Frame
    d.rectangle((win[0]-22, win[1]-22, win[2]+22, win[3]+22), fill=(80, 80, 90))
    # Sill
    d.rectangle((win[0]-34, win[3]+12, win[2]+34, win[3]+34), fill=(70, 70, 80))
    # Glass
    d.rectangle(win, fill=(170, 195, 215))
    # Reflection
    d.polygon([(win[0]+40, win[1]+30),
               (win[0]+200, win[1]+30),
               (win[0]+80, win[3]-20),
               (win[0], win[3]-200)], fill=(200, 220, 230))
    # Mullions
    d.line([((win[0]+win[2])//2, win[1]), ((win[0]+win[2])//2, win[3])], fill=(80, 80, 90), width=8)
    d.line([(win[0], (win[1]+win[3])//2), (win[2], (win[1]+win[3])//2)], fill=(80, 80, 90), width=8)

    # Curtain rail above window
    rail_y = win[1] - 80
    rail = (180, 1020)
    d.rectangle((rail[0], rail_y, rail[1], rail_y + 16), fill=(60, 55, 50))
    # Brackets
    for bx in [rail[0] + 30, (rail[0]+rail[1])//2, rail[1] - 30]:
        d.rectangle((bx - 14, rail_y - 4, bx + 14, rail_y + 30), fill=(60, 55, 50))
        d.rectangle((bx - 4, rail_y + 30, bx + 4, rail_y + 80), fill=(60, 55, 50))
    # End caps (finials)
    for ex in [rail[0] - 10, rail[1] + 10]:
        d.ellipse((ex - 16, rail_y - 4, ex + 16, rail_y + 26), fill=(80, 60, 40))

    # Curtains hanging from rail
    # Left curtain
    curtain_color = (140, 165, 195)
    # Pleated panel
    for i in range(6):
        cx = rail[0] + 10 + i * 28
        d.polygon([(cx, rail_y + 16),
                   (cx - 6, H - 100), (cx + 6, H - 100),
                   (cx + 22, rail_y + 16)],
                  fill=shade(curtain_color, 0.9 + (i%2)*0.15),
                  outline=shade(curtain_color, 0.7))
    # Right curtain
    for i in range(6):
        cx = rail[1] - 180 + i * 28
        d.polygon([(cx, rail_y + 16),
                   (cx - 6, H - 100), (cx + 6, H - 100),
                   (cx + 22, rail_y + 16)],
                  fill=shade(curtain_color, 0.9 + (i%2)*0.15),
                  outline=shade(curtain_color, 0.7))

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Curtain rails — 100 mm above, 100 mm wider than the window',
           font=font(22, bold=True), fill=(231, 236, 243))

    draw_label(d, 60, 130, '100 mm above architrave', arrow_to=(200, rail_y + 8))
    draw_label(d, 60, 280, 'Rail extends 100 mm past window', arrow_to=(180, rail_y + 8))
    draw_label(d, 940, 130, 'Centre bracket for long rails', arrow_to=(840, rail_y + 30))

    save(img, 'curtain-rails')


# ---------------------------------------------------------------------------
# sand-finish — sander on a workbench with grit progression strips
# ---------------------------------------------------------------------------
def sand_finish():
    img = Image.new('RGB', (W, H), (235, 228, 215))
    d = ImageDraw.Draw(img)

    # Background wall
    d.rectangle((0, 0, W, int(H*0.55)), fill=(235, 228, 215))
    # Workbench surface
    bench_y = int(H * 0.55)
    bench = wood_plank(W, H - bench_y, base=(170, 130, 90))
    img.paste(bench, (0, bench_y))

    # Sample timber strip in three sanding states (rough → smooth → finished)
    strip_w = 320
    strip_h = 130
    sx = 80
    sy = bench_y - 250
    titles = ['80 grit — rough', '180 grit — smooth', 'Oiled finish']
    bases = [(180, 138, 92), (190, 148, 105), (140, 95, 55)]
    for i, base in enumerate(bases):
        x = sx + i * (strip_w + 30)
        if i == 2:
            # Glossy oiled — darker, smoother
            plank = wood_plank(strip_w, strip_h, base=base, grain=True)
            img.paste(plank, (x, sy))
            # Gloss overlay
            ov = Image.new('RGBA', (strip_w, strip_h), (0,0,0,0))
            od = ImageDraw.Draw(ov)
            od.polygon([(0, 0), (strip_w, 0), (strip_w - 80, strip_h), (0, strip_h)],
                       fill=(255, 240, 220, 80))
            img.paste(ov, (x, sy), ov)
        elif i == 1:
            plank = wood_plank(strip_w, strip_h, base=base, grain=True)
            img.paste(plank, (x, sy))
        else:
            plank = wood_plank(strip_w, strip_h, base=base, grain=True)
            # Add scratch marks
            pd = ImageDraw.Draw(plank)
            for _ in range(40):
                cy = random.randint(2, strip_h - 4)
                pd.line([(0, cy), (strip_w, cy)], fill=shade(base, 0.7), width=1)
            img.paste(plank, (x, sy))
        d.text((x + 8, sy + strip_h + 6), titles[i], font=font(16, bold=True), fill=(60, 50, 40))

    # Random orbit sander (front)
    sd_x, sd_y = 560, bench_y + 80
    # Pad (disc)
    d.ellipse((sd_x - 90, sd_y, sd_x + 90, sd_y + 60), fill=(110, 110, 115), outline=(60, 60, 65), width=3)
    # Sandpaper disc
    d.ellipse((sd_x - 86, sd_y + 4, sd_x + 86, sd_y + 56), fill=(220, 180, 120), outline=(140, 110, 70), width=2)
    for _ in range(80):
        px = random.randint(sd_x - 80, sd_x + 80)
        py = random.randint(sd_y + 10, sd_y + 50)
        d.ellipse((px-1, py-1, px+1, py+1), fill=vary((180, 140, 80), 30))
    # Body
    d.rounded_rectangle((sd_x - 70, sd_y - 80, sd_x + 70, sd_y + 10), 18,
                        fill=(220, 60, 50), outline=(150, 30, 20), width=3)
    # Handle
    d.rounded_rectangle((sd_x - 50, sd_y - 130, sd_x + 50, sd_y - 60), 14,
                        fill=(50, 50, 55), outline=(20, 20, 25), width=2)
    # Power cord
    d.line([(sd_x - 50, sd_y - 100), (sd_x - 200, sd_y - 60), (sd_x - 350, sd_y - 30)],
           fill=(40, 40, 40), width=6)

    # Dust around the sander
    dust = Image.new('RGBA', (W, H), (0,0,0,0))
    dd = ImageDraw.Draw(dust)
    for _ in range(150):
        dx = random.randint(sd_x - 200, sd_x + 200)
        dy = random.randint(sd_y - 60, sd_y + 80)
        r = random.randint(2, 6)
        dd.ellipse((dx-r, dy-r, dx+r, dy+r), fill=(220, 200, 170, 70))
    dust = dust.filter(ImageFilter.GaussianBlur(3))
    img.paste(dust, (0, 0), dust)

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Sand and finish timber — progress through grits, then oil or poly',
           font=font(22, bold=True), fill=(231, 236, 243))

    draw_label(d, 60, 130, 'Skip no more than one grit', arrow_to=(180, sy + 60))
    draw_label(d, 940, 130, 'Sand WITH the grain on the final pass', arrow_to=(820, sy + 60))

    save(img, 'sand-finish')


# ---------------------------------------------------------------------------
# fence-gate — gate elevation with diagonal brace
# ---------------------------------------------------------------------------
def fence_gate():
    img = Image.new('RGB', (W, H), (200, 200, 200))
    draw_sky(img, (130, 170, 215), (220, 230, 240))
    draw_grass(img, int(H * 0.78))
    d = ImageDraw.Draw(img)

    # Two posts on either side
    post_h = int(H * 0.78) - 80
    post_color = (110, 75, 45)
    for px in [200, W - 280]:
        post = wood_plank(60, post_h, base=post_color)
        img.paste(post, (px, 80))
    # Concrete bases
    for px in [200, W - 280]:
        cb = concrete_block(80, 30, base=(150, 148, 145))
        img.paste(cb, (px - 10, int(H*0.78) - 16))

    # Gate frame (between posts)
    gate_x1, gate_x2 = 280, W - 300
    gate_y1, gate_y2 = 120, int(H * 0.78) - 30
    frame_w = 50

    # Top rail
    top_rail = wood_plank(gate_x2 - gate_x1, frame_w, base=(140, 100, 65))
    img.paste(top_rail, (gate_x1, gate_y1))
    # Bottom rail
    bot_rail = wood_plank(gate_x2 - gate_x1, frame_w, base=(140, 100, 65))
    img.paste(bot_rail, (gate_x1, gate_y2 - frame_w))
    # Left vertical (hinge side)
    lv = wood_plank(frame_w, gate_y2 - gate_y1, base=(140, 100, 65))
    img.paste(lv, (gate_x1, gate_y1))
    # Right vertical (latch side)
    rv = wood_plank(frame_w, gate_y2 - gate_y1, base=(140, 100, 65))
    img.paste(rv, (gate_x2 - frame_w, gate_y1))

    # Palings on top of frame
    paling_w = 70
    gap = 8
    n_palings = (gate_x2 - gate_x1 - 40) // (paling_w + gap)
    paling_start = gate_x1 + 20
    palings_colors = [(180, 132, 82), (170, 122, 72), (190, 145, 95), (175, 128, 78)]
    for i in range(n_palings):
        px = paling_start + i * (paling_w + gap)
        plank = wood_plank(paling_w, gate_y2 - gate_y1 - 20, base=palings_colors[i % len(palings_colors)])
        img.paste(plank, (px, gate_y1 + 10))

    # Diagonal brace (BOTTOM HINGE TO TOP LATCH — drawn UNDER the palings as a guide)
    # Draw as a translucent line/strip to indicate the brace direction
    brace_overlay = Image.new('RGBA', (W, H), (0,0,0,0))
    bo = ImageDraw.Draw(brace_overlay)
    bo.line([(gate_x1 + 50, gate_y2 - 60), (gate_x2 - 50, gate_y1 + 60)],
            fill=(220, 60, 40, 200), width=12)
    bo.line([(gate_x1 + 50, gate_y2 - 60), (gate_x2 - 50, gate_y1 + 60)],
            fill=(255, 200, 100, 180), width=4)
    img.paste(brace_overlay, (0, 0), brace_overlay)

    # Hinges (left side)
    for hy in [gate_y1 + 80, gate_y2 - 130]:
        d.rectangle((gate_x1 - 20, hy, gate_x1 + 60, hy + 50), fill=(60, 60, 70), outline=(20, 20, 30), width=2)
        for ix in [gate_x1 - 12, gate_x1 + 20, gate_x1 + 52]:
            d.ellipse((ix - 4, hy + 22, ix + 4, hy + 30), fill=(30, 30, 35))

    # Latch (right side)
    lh_y = (gate_y1 + gate_y2) // 2
    d.rectangle((gate_x2 - 40, lh_y - 10, gate_x2 + 70, lh_y + 10), fill=(60, 60, 70))
    d.rectangle((gate_x2 + 50, lh_y - 30, gate_x2 + 80, lh_y + 30), fill=(60, 60, 70))

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Timber gate — brace runs from bottom hinge UP to top latch',
           font=font(22, bold=True), fill=(231, 236, 243))

    draw_label(d, 60, 130, 'Hinge side', arrow_to=(220, gate_y1 + 80))
    draw_label(d, 940, 130, 'Latch side', arrow_to=(W - 280, gate_y1 + 80))
    draw_label(d, 60, 460, 'Brace direction — critical', arrow_to=(gate_x1 + 100, gate_y2 - 80))

    save(img, 'fence-gate')


# ---------------------------------------------------------------------------
# raised-garden-bed — wooden bed in garden with soil and seedlings
# ---------------------------------------------------------------------------
def raised_garden_bed():
    img = Image.new('RGB', (W, H), (200, 200, 200))
    draw_sky(img, (135, 175, 220), (225, 230, 235))
    draw_grass(img, int(H * 0.62))
    d = ImageDraw.Draw(img)

    # Bed in 3/4 perspective
    bed_y1 = int(H * 0.40)
    bed_y2 = int(H * 0.78)
    # Front face
    front_color = (170, 130, 85)
    plank = wood_plank(W - 240, bed_y2 - bed_y1, base=front_color)
    img.paste(plank, (120, bed_y1))
    d.rectangle((120, bed_y1, W - 120, bed_y2), outline=(90, 60, 35), width=4)
    # Side face (right, in perspective)
    d.polygon([(W - 120, bed_y1), (W - 60, bed_y1 - 30),
               (W - 60, bed_y2 - 30), (W - 120, bed_y2)],
              fill=shade(front_color, 0.7), outline=(90, 60, 35), width=4)
    # Top edge (visible)
    d.polygon([(120, bed_y1), (W - 120, bed_y1),
               (W - 60, bed_y1 - 30), (180, bed_y1 - 30)],
              fill=shade(front_color, 1.1), outline=(90, 60, 35), width=4)

    # Soil on top of bed
    soil_top_color = (75, 55, 35)
    d.polygon([(140, bed_y1 - 4), (W - 130, bed_y1 - 4),
               (W - 70, bed_y1 - 30), (190, bed_y1 - 30)],
              fill=soil_top_color, outline=(50, 35, 20), width=2)
    # Soil texture
    for _ in range(800):
        sx = random.randint(150, W - 130)
        sy = random.randint(bed_y1 - 28, bed_y1 - 6)
        c = vary((75, 55, 35), 25)
        d.ellipse((sx-2, sy-1, sx+2, sy+1), fill=c)

    # Seedlings (5 plants in rows)
    plant_rows = [(220, bed_y1 - 12), (380, bed_y1 - 16), (540, bed_y1 - 14),
                  (700, bed_y1 - 16), (860, bed_y1 - 12), (1010, bed_y1 - 14)]
    for px, py in plant_rows:
        # Stem
        d.line([(px, py), (px, py - 30)], fill=(80, 130, 80), width=3)
        # Leaves
        for ang, dist in [(220, 15), (320, 18), (90, 22), (170, 16)]:
            ex = px + int(dist * math.cos(math.radians(ang)))
            ey = py - 30 + int(dist * math.sin(math.radians(ang)) * 0.7)
            d.ellipse((ex - 14, ey - 6, ex + 14, ey + 6), fill=(85, 145, 70),
                      outline=(50, 95, 45))

    # Tools beside the bed
    # Spade
    d.rectangle((50, int(H*0.5), 70, int(H*0.78)), fill=(80, 65, 50))
    d.polygon([(40, int(H*0.78)), (80, int(H*0.78)), (75, int(H*0.86)), (45, int(H*0.86))],
              fill=(160, 160, 165), outline=(110, 110, 115), width=3)

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Raised garden bed — H4 ACQ or untreated macrocarpa for edibles',
           font=font(22, bold=True), fill=(231, 236, 243))

    draw_label(d, 60, 130, 'H4 ACQ / macrocarpa', arrow_to=(220, bed_y1 + 100))
    draw_label(d, 940, 130, 'Vegie mix + compost', arrow_to=(900, bed_y1 - 15))
    draw_label(d, 60, 280, 'No plastic lining — kills drainage', arrow_to=(280, bed_y1 - 30))

    save(img, 'raised-garden-bed')


# ---------------------------------------------------------------------------
# sharpen-tools — chisel on sharpening stone with honing guide
# ---------------------------------------------------------------------------
def sharpen_tools():
    img = Image.new('RGB', (W, H), (235, 228, 215))
    d = ImageDraw.Draw(img)

    # Bench surface
    bench = wood_plank(W, H, base=(160, 120, 80))
    img.paste(bench, (0, 0))
    # Slight darkening
    for _ in range(2500):
        x = random.randint(0, W-1); y = random.randint(0, H-1)
        img.putpixel((x, y), vary((160, 120, 80), 6))

    # Sharpening stone (waterstone, two-tone for combination grit)
    stone_x, stone_y = 200, int(H * 0.5) - 80
    stone_w, stone_h = 700, 200
    # Wooden base
    d.rectangle((stone_x - 30, stone_y + 20, stone_x + stone_w + 30, stone_y + stone_h + 40),
                fill=(110, 80, 55), outline=(60, 40, 25), width=3)
    # The stone itself — top half coarse (rough surface), bottom finer
    # Top surface visible (perspective)
    d.polygon([(stone_x, stone_y), (stone_x + stone_w, stone_y),
               (stone_x + stone_w + 20, stone_y - 30), (stone_x + 20, stone_y - 30)],
              fill=(180, 175, 165), outline=(120, 115, 105), width=2)
    # Front face
    d.rectangle((stone_x, stone_y, stone_x + stone_w, stone_y + stone_h),
                fill=(220, 215, 205), outline=(130, 125, 115), width=2)
    # Two grits split visually
    d.line([(stone_x, stone_y + stone_h // 2), (stone_x + stone_w, stone_y + stone_h // 2)],
           fill=(140, 135, 125), width=3)
    d.text((stone_x + 16, stone_y + 10), '1000', font=font(20, bold=True), fill=(80, 75, 65))
    d.text((stone_x + 16, stone_y + stone_h // 2 + 10), '6000', font=font(20, bold=True), fill=(80, 75, 65))

    # Wet shine on the stone (water)
    for i in range(stone_h // 2):
        alpha = 60 - int(i * 60 / (stone_h // 2))
        if alpha > 0:
            sh = Image.new('RGBA', (stone_w, 1), (200, 220, 235, alpha))
            img.paste(sh, (stone_x, stone_y + i), sh)

    # Honing guide (eclipse style) with chisel
    hg_y = stone_y - 60
    hg_x = stone_x + 200
    # Wheel
    d.ellipse((hg_x - 40, hg_y - 40, hg_x + 40, hg_y + 40), fill=(80, 80, 90), outline=(40, 40, 50), width=3)
    d.ellipse((hg_x - 20, hg_y - 20, hg_x + 20, hg_y + 20), fill=(150, 150, 160))
    # Body
    d.rectangle((hg_x + 30, hg_y - 30, hg_x + 220, hg_y + 30), fill=(80, 80, 90), outline=(40, 40, 50), width=3)
    # Clamping screws
    d.ellipse((hg_x + 60, hg_y - 36, hg_x + 80, hg_y - 16), fill=(200, 180, 90))
    d.ellipse((hg_x + 180, hg_y - 36, hg_x + 200, hg_y - 16), fill=(200, 180, 90))

    # Chisel (sticking out from honing guide toward the right, touching the stone)
    chisel_x = hg_x + 220
    chisel_tip = stone_x + stone_w - 50
    # Blade (steel)
    d.polygon([(chisel_x, hg_y - 14), (chisel_tip, stone_y + 6),
               (chisel_tip + 30, stone_y + 14), (chisel_x, hg_y + 14)],
              fill=(200, 200, 210), outline=(120, 120, 130), width=2)
    # Bevel highlight
    d.polygon([(chisel_tip, stone_y + 6), (chisel_tip + 26, stone_y + 6),
               (chisel_tip + 30, stone_y + 14)],
              fill=(150, 150, 160), outline=(80, 80, 90), width=2)
    # Handle
    d.polygon([(hg_x - 50, hg_y - 22), (hg_x, hg_y - 18),
               (hg_x, hg_y + 18), (hg_x - 50, hg_y + 22)],
              fill=(140, 90, 50), outline=(80, 50, 30), width=3)
    d.rectangle((hg_x - 50, hg_y - 6, hg_x - 36, hg_y + 6), fill=(180, 180, 190))

    # Title
    d.rectangle((0, 0, W, 60), fill=(15, 17, 21))
    d.text((24, 18), 'Sharpen chisels — honing guide, work the grits, finish on the strop',
           font=font(22, bold=True), fill=(231, 236, 243))

    draw_label(d, 60, 130, 'Honing guide locks the angle', arrow_to=(hg_x + 20, hg_y))
    draw_label(d, 60, 580, 'Combination waterstone — coarse + fine', arrow_to=(stone_x + 200, stone_y + 60))
    draw_label(d, 940, 200, 'Bevel flat on the stone', arrow_to=(chisel_tip + 15, stone_y + 10))

    save(img, 'sharpen-tools')


# ---------------------------------------------------------------------------
# Generate all
# ---------------------------------------------------------------------------
if __name__ == '__main__':
    fence_paling()
    deck_build()
    weatherboards()
    cutting_trims()
    gibbing()
    plastering()
    hang_door()
    painting()
    tiling_splashback()
    shelves()
    flat_pack()
    plasterboard_patch()
    caulking()
    hanging_pictures()
    curtain_rails()
    sand_finish()
    fence_gate()
    raised_garden_bed()
    sharpen_tools()
    print('done')
