# -*- coding: utf-8 -*-
import sys, math
from PIL import Image
sys.path.insert(0, "/home/user/Sherlock/roadtrip-scandinavie/build")
from illus import Scene, mix

A = "/home/user/Sherlock/roadtrip-scandinavie/assets/"
WIDE = (1920, 1080)
WIDE_T = (1920, 1560)


def crop_bottom(path, out_h=1080):
    im = Image.open(path)
    W, H = im.size
    im.crop((0, H - out_h, W, H)).save(path, quality=94)
    return path
PORT = (1300, 1500)

NYHAVN = ["#C0492F", "#E0A63E", "#2E6B8C", "#EDE4D2", "#8C5230",
          "#B8843A", "#7C9A5A", "#C9553F", "#DCCB86", "#3F7E93"]


def townrow(s, y, x0, x1, n, hmin, hmax, roof, seed=1):
    s.rng.seed(seed)
    w = (x1 - x0) / n
    for i in range(n):
        x = x0 + w * i
        h = hmin + (hmax - hmin) * s.rng.random()
        s.townhouse(x + w * .04, y, w * .92, h, NYHAVN[i % len(NYHAVN)], roof,
                    gable="step" if s.rng.random() < .55 else "pitch")


def masts(s, y, xs, color, h=.20):
    for x, hh in xs:
        s.line([(x, y), (x, y - h * hh)], color, .0045)
        s.line([(x, y - h * hh * .96), (x + .035, y - h * hh * .55)], color, .0028)


# ============================================================ 1. HERO
def hero():
    s = Scene(*WIDE, seed=3)
    SKY_T, SKY_B = "#16304C", "#F0A472"
    s.sky(.665, SKY_T, SKY_B)
    s.sun(.34, .60, .030, (255, 226, 178), glow=(255, 180, 120), halo=4.5)
    s.birds(9, .05, .55, .16, .34, mix(SKY_T, "#0C1E30", .5))
    s.hills(.640, .085, mix("#F0A472", "#2A4258", .62), n=5, phase=.7)
    s.treeline(.652, .075, mix("#F0A472", "#1E3441", .80), n=52, jitter=.55)
    s.water(.660, 1.0, "#3C6076", "#12283A")
    s.reflect(.34, .662, .93, .020, (255, 205, 150), alpha=95)
    s.ripples(.70, .99, (200, 226, 236), n=42, alpha=52)
    # rive droite
    s.rock(.90, .655, .40, .075, "#16303C", seed=4)
    s.treeline(.660, .105, "#122A34", n=16, jitter=.5, x0=.72, x1=1.06)
    s.stuga(.795, .672, .105, body="#93331F", roof="#181A1B",
            trim="#EFE7DA", windows="#FFCE7A")
    s.reflect(.795, .676, .80, .050, (147, 51, 31), alpha=70)
    s.jetty(.845, .935, .700, "#14262E", posts=4)
    s.canoe(.585, .800, .130, "#101F27", paddlers=2, pc="#101F27")
    s.reflect(.585, .812, .90, .062, (10, 20, 28), alpha=60)
    s.pine(.055, .690, .175, "#0E212B")
    s.pine(.115, .700, .120, "#0E212B")
    s.vignette(48)
    s.grain(4)
    return s.save(A + "hero.jpg")


# ================================================== 2. DIVIDER COPENHAGUE
def div_copenhague():
    s = Scene(*WIDE, seed=11)
    s.sky(.735, "#5E9BBE", "#DCEDF2")
    s.birds(7, .5, .95, .10, .26, "#7B98A8")
    townrow(s, .735, -.01, 1.01, 11, .295, .420, "#33383E", seed=7)
    s.rect(0, .733, 1, .755, "#4A4640")
    masts(s, .755, [(.14, 1.0), (.19, .78), (.47, .92), (.52, .70),
                    (.79, 1.05), (.845, .80)], "#2E3238", h=.30)
    s.water(.755, 1.0, "#2D6B85", "#123B52")
    for i in range(11):
        x = -.01 + 1.02 * (i + .5) / 11
        s.reflect(x, .757, .96, .040, tuple(int(NYHAVN[i % len(NYHAVN)][k:k + 2], 16)
                                            for k in (1, 3, 5)), alpha=78)
    s.ripples(.78, .99, (205, 232, 242), n=46, alpha=55)
    s.sailboat(.30, .880, .105, "#22323C", "#F0EBDF")
    s.sailboat(.665, .930, .130, "#22323C", "#EFE8DA")
    s.vignette(34)
    s.grain(4)
    return s.save(A + "div_copenhague.jpg")


# ======================================================= 3. DIVIDER ASNEN
def div_asnen():
    s = Scene(*WIDE_T, seed=21)
    s.sky(.640, "#3E7FA0", "#F6D69B")
    s.sun(.66, .555, .026, (255, 240, 205), glow=(255, 205, 140), halo=4.0)
    s.hills(.620, .060, mix("#F6D69B", "#41707A", .55), n=4, phase=1.9)
    s.treeline(.632, .088, mix("#F6D69B", "#20463F", .78), n=46, jitter=.55)
    s.water(.640, 1.0, "#48788B", "#173442")
    s.reflect(.66, .642, .90, .018, (255, 226, 172), alpha=100)
    s.ripples(.68, .99, (208, 232, 240), n=44, alpha=50)
    s.treeline(.648, .130, "#123028", n=14, jitter=.45, x0=-.03, x1=.30)
    s.stuga(.205, .670, .135, body="#96351F", roof="#1C1E1E",
            trim="#F2EADC", windows="#FFD183")
    s.reflect(.205, .676, .84, .066, (150, 53, 31), alpha=72)
    s.jetty(.275, .400, .706, "#17332B", posts=5)
    s.canoe(.615, .805, .145, "#12302A", paddlers=2, pc="#12302A")
    s.reflect(.615, .818, .93, .070, (12, 30, 28), alpha=58)
    s.rock(.905, .655, .34, .055, "#1A3A32", seed=9)
    s.pine(.935, .668, .150, "#102A24")
    s.pine(.985, .672, .110, "#102A24")
    s.birds(6, .30, .60, .18, .34, "#5C7F86")
    s.vignette(40)
    s.grain(4)
    s.save(A + "div_asnen.jpg")
    return crop_bottom(A + "div_asnen.jpg")


# ==================================================== 4. DIVIDER VASTERVIK
def div_vastervik():
    s = Scene(*WIDE_T, seed=31)
    s.sky(.615, "#2F6E92", "#CFE6EE")
    s.birds(11, .04, .48, .12, .30, "#6F92A4")
    s.water(.615, 1.0, "#2E6B87", "#0F3247")
    # ilots lointains
    for cx, w, h, c in ((.14, .17, .022, "#4E7C8C"), (.36, .13, .018, "#547F8E"),
                        (.62, .20, .024, "#4A7787"), (.88, .16, .020, "#527C8B")):
        s.rock(cx, .607, w, h, c, seed=int(cx * 100))
        s.pine(cx + w * .12, .612, .030, c)
        s.pine(cx - w * .16, .613, .022, c)
    s.ripples(.64, .99, (200, 228, 240), n=52, alpha=52)
    s.sailboat(.47, .700, .085, "#1D3442", "#EFEADD")
    # ilot principal droite
    s.rock(.845, .600, .46, .105, "#274C4A", seed=5)
    s.rock(.870, .640, .40, .120, "#1B3B3C", seed=6)
    for x, h in ((.735, .155), (.800, .120), (.885, .175), (.955, .135), (1.015, .100)):
        s.pine(x, .655, h, "#12292C")
    s.boathouse(.700, .690, .085, body="#8E3423", roof="#1B1E1E")
    s.reflect(.700, .694, .84, .042, (142, 52, 35), alpha=68)
    # rochers premier plan gauche
    s.rock(.075, .765, .52, .190, "#20403F", seed=8)
    s.rock(-.02, .835, .40, .175, "#173234", seed=12)
    s.pine(.050, .782, .145, "#0E2226")
    s.pine(.140, .795, .105, "#0E2226")
    s.rock(.255, .930, .34, .110, "#142C30", seed=15)
    s.kayak(.335, .855, .255, "#123039", pc="#D9603E")
    s.reflect(.335, .880, .99, .125, (18, 48, 57), alpha=52)
    s.vignette(40)
    s.grain(4)
    s.save(A + "div_vastervik.jpg")
    return crop_bottom(A + "div_vastervik.jpg")


# ==================================================== 5. DIVIDER STOCKHOLM
def div_stockholm():
    s = Scene(*WIDE, seed=41)
    s.sky(.700, "#4A88AE", "#E6EFF0")
    s.birds(8, .05, .40, .10, .24, "#77939F")
    townrow(s, .700, -.01, .62, 8, .215, .300, "#3A3F45", seed=13)
    townrow(s, .700, .62, 1.01, 5, .200, .270, "#3A3F45", seed=17)
    s.spire(.335, .700, .030, .335, "#C6BCA6", "#3E6B6B")
    s.spire(.560, .700, .024, .285, "#BFB6A2", "#5C6E52")
    s.spire(.815, .700, .026, .310, "#C4BAA5", "#3E6B6B")
    s.rect(0, .698, 1, .716, "#4A4640")
    s.water(.716, 1.0, "#2C6A87", "#103449")
    for i in range(13):
        x = .02 + .96 * i / 12
        s.reflect(x, .718, .93, .034, (198, 186, 162), alpha=42)
    s.ripples(.74, .99, (204, 230, 242), n=48, alpha=54)
    s.ferry(.640, .855, .225, "#1D3644", "#EDE6D8")
    s.reflect(.640, .875, .99, .105, (26, 48, 60), alpha=52)
    s.sailboat(.185, .800, .080, "#1F3542", "#EFE9DC")
    s.vignette(36)
    s.grain(4)
    return s.save(A + "div_stockholm.jpg")


# ================================================================= JOURS
def d1_nyhavn():
    s = Scene(*PORT, seed=101)
    s.sky(.660, "#4E86AB", "#F3D5A6")
    s.birds(6, .05, .60, .08, .22, "#7A96A6")
    townrow(s, .660, -.02, 1.02, 4, .360, .520, "#33383E", seed=3)
    s.rect(0, .656, 1, .680, "#4A4640")
    masts(s, .680, [(.20, 1.0), (.30, .74), (.72, .95)], "#2E3238", h=.26)
    s.water(.680, 1.0, "#2E6C86", "#123A50")
    for i in range(4):
        x = -.02 + 1.04 * (i + .5) / 4
        s.reflect(x, .682, .98, .105, tuple(int(NYHAVN[i][k:k + 2], 16)
                                            for k in (1, 3, 5)), alpha=80)
    s.ripples(.72, .99, (206, 232, 242), n=34, alpha=56)
    s.sailboat(.62, .880, .175, "#22323C", "#F0EBDF")
    s.vignette(40); s.grain(4)
    return s.save(A + "d1.jpg")


def d2_canaux():
    s = Scene(*PORT, seed=102)
    s.sky(.520, "#65A2C2", "#DDEDF1")
    s.birds(6, .3, .95, .07, .20, "#7C99A9")
    townrow(s, .520, -.02, 1.02, 5, .180, .280, "#343940", seed=9)
    s.rect(0, .516, 1, .534, "#4A4640")
    s.water(.534, 1.0, "#2F6E88", "#123A50")
    for i in range(5):
        x = -.02 + 1.04 * (i + .5) / 5
        s.reflect(x, .536, .80, .080, tuple(int(NYHAVN[i][k:k + 2], 16)
                                            for k in (1, 3, 5)), alpha=70)
    s.ripples(.56, .78, (206, 232, 242), n=26, alpha=54)
    s.ferry(.500, .655, .390, "#22434F", "#EFE8DA")
    s.reflect(.500, .672, .80, .180, (30, 56, 66), alpha=52)
    # quai + velo au premier plan
    s.rect(0, .790, 1, 1.0, "#5E5A50")
    s.rect(0, .790, 1, .806, "#726D60")
    s.bike(.365, .960, .300, "#16242C")
    s.bike(.700, .975, .260, "#16242C")
    s.vignette(44); s.grain(4)
    return s.save(A + "d2.jpg")


def d3_oresund():
    s = Scene(*PORT, seed=103)
    s.sky(.470, "#5D97BC", "#E2EFF2")
    s.birds(7, .05, .60, .09, .25, "#7B97A7")
    s.water(.470, .790, "#2F6F8B", "#1B4E67")
    s.bridge(.430, -.05, 1.05, "#5A6067", "#7C838A", "#8E959C", py=(.30, .72))
    s.ripples(.50, .78, (200, 228, 240), n=30, alpha=50)
    s.rock(.14, .770, .55, .045, "#2C5A55", seed=3)
    s.treeline(.782, .075, "#1D4340", n=22, jitter=.5)
    s.road(.800, 1.02, .50, .30, .50, 1.35, "#4A4E52", "#DCD8CE", "#EBD98F")
    s.car(.470, .960, .295, "#B0402C")
    s.vignette(42); s.grain(4)
    return s.save(A + "d3.jpg")


def d4_parc():
    s = Scene(*PORT, seed=104)
    s.sky(.360, "#7FB4CC", "#E7F1EE")
    s.water(.360, .500, "#4E8296", "#2E5F72")
    s.ripples(.37, .49, (214, 234, 240), n=16, alpha=46)
    s.treeline(.362, .090, mix("#E7F1EE", "#2A5B4C", .74), n=44, jitter=.5)
    s.treeline(.500, .140, "#245046", n=20, jitter=.45)
    s.rect(0, .535, 1, 1.0, "#2E5E49")
    s.hills(.640, .060, "#27523F", n=3, phase=1.4)
    # ponton de bois en perspective, decale a gauche
    s.poly([(.20, 1.02), (.60, 1.02), (.505, .540), (.415, .540)], "#6E5942")
    for i in range(11):
        t_ = (i / 11) ** 1.55
        y = .540 + (1.02 - .540) * t_
        hw = .046 + (.205 - .046) * t_
        cx = .460 + (.400 - .460) * t_
        s.rect(cx - hw, y, cx + hw, y + .0075 + .010 * t_, "#77613F")
    for x, h, c in ((.055, .430, "#17362E"), (.180, .330, "#1B3D33"),
                    (.815, .460, "#16342C"), (.945, .360, "#1B3D33")):
        s.pine(x, .720, h, c)
    s.pine(.660, .640, .230, "#1F4438")
    s.birch(.760, .900, .330, "#E7E2D6", "#528E60")
    s.birch(.905, .960, .270, "#E7E2D6", "#4A855A")
    s.birds(5, .35, .75, .11, .24, "#6E8E92")
    s.vignette(46); s.grain(4)
    return s.save(A + "d4.jpg")


def d5_canoe():
    s = Scene(*PORT, seed=105)
    s.sky(.430, "#5EA0C0", "#EAF1EC")
    s.birds(7, .1, .65, .09, .24, "#7C99A6")
    s.hills(.412, .045, mix("#EAF1EC", "#3D6F72", .58), n=4, phase=.4)
    s.treeline(.424, .070, mix("#EAF1EC", "#1F4A42", .74), n=40, jitter=.55)
    s.water(.430, 1.0, "#3E7A93", "#123B4E")
    s.ripples(.47, .99, (206, 232, 240), n=40, alpha=52)
    # petites iles
    for cx, w, h in ((.13, .20, .020), (.86, .17, .018)):
        s.rock(cx, .424, w, h, "#1F4A44", seed=int(cx * 90))
        s.pine(cx, .430, .048, "#173C38")
        s.pine(cx + w * .22, .432, .034, "#173C38")
    s.canoe(.500, .700, .420, "#1A3C3E", paddlers=2, pc="#C0472F")
    s.reflect(.500, .735, .99, .200, (22, 52, 56), alpha=56)
    s.vignette(44); s.grain(4)
    return s.save(A + "d5.jpg")


def d6_elan():
    s = Scene(*PORT, seed=106)
    s.sky(.430, "#3E7FA6", "#F7D79C")
    s.sun(.30, .375, .032, (255, 242, 210), glow=(255, 202, 138), halo=4.2)
    s.hills(.420, .045, mix("#F7D79C", "#4A6E6A", .55), n=4, phase=1.2)
    s.treeline(.432, .095, mix("#F7D79C", "#26463C", .74), n=44, jitter=.55)
    s.rect(0, .500, 1, 1.0, "#9AA66A")
    s.hills(.600, .050, "#8B9A5C", n=3, phase=2.1)
    s.rect(0, .680, 1, 1.0, "#7C8C50")
    s.treeline(.520, .110, "#2A4A38", n=15, jitter=.4, x0=-.03, x1=.30)
    s.boathouse(.845, .575, .165, body="#8E3423", roof="#2B2A26")
    s.moose(.410, .945, .300, "#1B2718")
    s.pine(.055, .790, .290, "#1E3A2C")
    s.pine(.960, .855, .245, "#1E3A2C")
    s.birds(5, .45, .82, .14, .26, "#7A8C7A")
    s.vignette(44); s.grain(4)
    return s.save(A + "d6.jpg")


def d7_route():
    s = Scene(*PORT, seed=107)
    s.sky(.395, "#5C9CC0", "#E4EFEE")
    s.birds(6, .1, .60, .08, .22, "#7B98A6")
    s.hills(.385, .042, mix("#E4EFEE", "#40707A", .58), n=4, phase=.9)
    s.water(.395, .450, "#3F7690", "#2E5F78")
    s.treeline(.400, .075, mix("#E4EFEE", "#20493F", .70), n=40, jitter=.5)
    s.rect(0, .450, 1, 1.0, "#3E6B4E")
    s.treeline(.470, .150, "#27523F", n=22, jitter=.5)
    s.road(.470, 1.02, .535, .075, .360, .900, "#4C5054", "#DEDACF", "#EBD98F")
    for x, h in ((.045, .420), (.175, .330), (.895, .450), (.985, .350)):
        s.pine(x, .800, h, "#1C4034")
    s.pine(.310, .620, .210, "#22493A")
    s.pine(.735, .640, .230, "#22493A")
    s.car(.415, .880, .240, "#B0402C")
    s.vignette(44); s.grain(4)
    return s.save(A + "d7.jpg")


def d8_bateau():
    s = Scene(*PORT, seed=108)
    s.sky(.455, "#4E8FB4", "#DCEBEF")
    s.birds(9, .05, .55, .09, .26, "#7594A4")
    s.water(.455, 1.0, "#2F7089", "#0F3448")
    for cx, w, h, c in ((.16, .22, .020, "#4B7A8A"), (.83, .20, .018, "#4F7D8C")):
        s.rock(cx, .447, w, h, c, seed=int(cx * 70))
        s.pine(cx, .453, .034, c)
    s.ripples(.49, .99, (202, 230, 240), n=40, alpha=52)
    # ile principale avec cabane rouge
    s.rock(.66, .500, .62, .075, "#2A5150", seed=4)
    s.rock(.78, .545, .52, .085, "#1D4041", seed=6)
    for x, h in ((.470, .105), (.560, .080), (.855, .120), (.975, .090)):
        s.pine(x, .545, h, "#143035")
    s.boathouse(.660, .560, .130, body="#8E3423", roof="#1D2020")
    s.reflect(.660, .566, .70, .064, (142, 52, 35), alpha=66)
    s.ferry(.400, .760, .420, "#20404E", "#EFE8DA")
    s.reflect(.400, .790, .99, .200, (28, 54, 66), alpha=54)
    s.rock(.05, .900, .55, .130, "#1B3A3C", seed=8)
    s.vignette(44); s.grain(4)
    return s.save(A + "d8.jpg")


def d9_granso():
    s = Scene(*PORT, seed=109)
    s.sky(.340, "#5FA0C2", "#E6F0EF")
    s.birds(8, .30, .95, .07, .21, "#7A98A7")
    s.water(.340, .720, "#31728C", "#164560")
    for cx, w, h in ((.19, .19, .016), (.79, .17, .014)):
        s.rock(cx, .334, w, h, "#4E7C8A", seed=int(cx * 60))
        s.pine(cx, .338, .028, "#41707D")
    s.ripples(.37, .70, (204, 230, 240), n=32, alpha=50)
    s.sailboat(.700, .500, .105, "#1E3641", "#EFE9DC")
    # rivage : ligne d'eau ondulante, sable mouille puis sable sec
    shore, steps = [], 72
    for i in range(steps + 1):
        x = i / steps
        shore.append((x, .720 + .020 * math.sin(x * 6.2 + .9)
                      + .008 * math.sin(x * 15.0 + 2.0)))
    s.poly(shore + [(1, 1.02), (0, 1.02)], "#C4B896")
    s.poly([(x, y + .042) for x, y in shore] + [(1, 1.02), (0, 1.02)], "#DACDAB")
    # blocs de granit poses sur le sable
    s.rock(.150, .742, .150, .052, "#7C857B", seed=3)
    s.rock(.845, .765, .175, .060, "#767F76", seed=5)
    s.rock(.520, .830, .105, .036, "#889087", seed=11)
    s.rock(.060, .905, .230, .070, "#6B746C", seed=13)
    # pointes rocheuses boisees de part et d'autre
    s.rock(.020, .690, .34, .075, "#3C5B54", seed=17)
    s.rock(.985, .672, .32, .085, "#3A5952", seed=19)
    for x, h in ((.045, .150), (.130, .105), (.930, .170), (.995, .120)):
        s.pine(x, .706, h, "#1F4238")
    s.vignette(44); s.grain(4)
    return s.save(A + "d9.jpg")


def d10_kayak():
    s = Scene(*PORT, seed=110)
    s.sky(.440, "#3C7EA4", "#F7CE9A")
    s.sun(.685, .378, .030, (255, 240, 208), glow=(255, 198, 136), halo=4.2)
    s.birds(7, .1, .55, .10, .25, "#6E8C9A")
    for cx, w, h in ((.15, .24, .026), (.55, .18, .020), (.90, .22, .024)):
        c = mix("#F7CE9A", "#26494B", .78)
        s.rock(cx, .430, w, h, c, seed=int(cx * 80))
        s.pine(cx + w * .10, .436, .046, c)
        s.pine(cx - w * .18, .438, .032, c)
    s.water(.440, 1.0, "#3C6E86", "#11374A")
    s.reflect(.685, .442, .92, .020, (255, 220, 168), alpha=104)
    s.ripples(.48, .99, (210, 232, 240), n=40, alpha=50)
    s.kayak(.430, .700, .430, "#14313C", pc="#D9603E")
    s.reflect(.430, .730, .99, .205, (20, 50, 60), alpha=54)
    s.rock(.98, .830, .44, .140, "#152F34", seed=9)
    s.vignette(44); s.grain(4)
    return s.save(A + "d10.jpg")


def d11_stockholm_soir():
    s = Scene(*PORT, seed=111)
    s.sky(.560, "#13294A", "#D98A63")
    s.sun(.22, .500, .022, (255, 220, 180), glow=(255, 160, 110), halo=4.0)
    s.birds(6, .5, .95, .12, .26, "#33465E")
    townrow(s, .560, -.02, .58, 5, .175, .245, "#242A33", seed=23)
    townrow(s, .560, .58, 1.02, 4, .165, .230, "#242A33", seed=29)
    s.spire(.300, .560, .028, .280, "#2A3140", "#1B2430")
    s.spire(.760, .560, .024, .245, "#2A3140", "#1B2430")
    s.rect(0, .556, 1, .576, "#1E252E")
    s.water(.576, 1.0, "#25455C", "#0C1F31")
    for i in range(15):
        x = .03 + .94 * i / 14
        s.reflect(x, .578, .98, .028, (255, 198, 120), alpha=46)
    s.ripples(.62, .99, (170, 200, 220), n=36, alpha=40)
    s.ferry(.605, .800, .300, "#16303F", "#2A3B46")
    s.reflect(.605, .822, .99, .140, (255, 200, 130), alpha=44)
    s.vignette(52); s.grain(4)
    return s.save(A + "d11.jpg")


def d12_vasa():
    s = Scene(*PORT, seed=112)
    s.sky(.520, "#4B8AAE", "#E1EDF0")
    s.birds(8, .05, .50, .08, .22, "#7793A3")
    townrow(s, .520, -.02, 1.02, 6, .130, .195, "#3A3F45", seed=31)
    s.rect(0, .516, 1, .534, "#4A4640")
    s.water(.534, 1.0, "#2C6A87", "#0F3247")
    for i in range(8):
        x = .04 + .92 * i / 7
        s.reflect(x, .536, .74, .046, (196, 184, 160), alpha=40)
    s.ripples(.60, .99, (202, 230, 242), n=34, alpha=52)
    s.tallship(.470, .845, .860, hull="#3A2A1C", sail="#E8DCC2")
    s.reflect(.470, .836, .99, .330, (48, 36, 26), alpha=54)
    s.vignette(44); s.grain(4)
    return s.save(A + "d12.jpg")


def d13_depart():
    s = Scene(*PORT, seed=113)
    s.sky(.640, "#1D3E5E", "#F3C089")
    s.sun(.30, .560, .028, (255, 238, 206), glow=(255, 196, 140), halo=4.4)
    s.plane(.660, .240, .300, "#152B3E", roll=-15)
    s.birds(6, .05, .40, .34, .48, "#4A6478")
    s.water(.640, 1.0, "#33607A", "#10293B")
    s.reflect(.30, .642, .94, .020, (255, 218, 168), alpha=98)
    for cx, w, h in ((.16, .26, .026), (.62, .22, .022), (.94, .24, .024)):
        c = mix("#F3C089", "#1F4247", .80)
        s.rock(cx, .632, w, h, c, seed=int(cx * 75))
        s.pine(cx + w * .10, .638, .044, c)
    s.ripples(.68, .99, (204, 228, 238), n=36, alpha=48)
    s.rock(.06, .855, .52, .150, "#16323A", seed=7)
    s.pine(.075, .872, .140, "#0F252C")
    s.vignette(48); s.grain(4)
    return s.save(A + "d13.jpg")


if __name__ == "__main__":
    for fn in (hero, div_copenhague, div_asnen, div_vastervik, div_stockholm,
               d1_nyhavn, d2_canaux, d3_oresund, d4_parc, d5_canoe, d6_elan,
               d7_route, d8_bateau, d9_granso, d10_kayak, d11_stockholm_soir,
               d12_vasa, d13_depart):
        print("  ", fn())
