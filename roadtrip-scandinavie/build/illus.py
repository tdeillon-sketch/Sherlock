# -*- coding: utf-8 -*-
"""Moteur d'illustration plate nordique (PIL, supersampling)."""
import math, random
from PIL import Image, ImageDraw, ImageFilter


def hx(c):
    c = c.lstrip("#")
    return tuple(int(c[i:i + 2], 16) for i in (0, 2, 4))


def mix(a, b, t):
    a, b = (hx(a) if isinstance(a, str) else a), (hx(b) if isinstance(b, str) else b)
    return tuple(int(round(a[i] + (b[i] - a[i]) * t)) for i in range(3))


class Scene:
    SS = 2

    def __init__(self, w, h, seed=0):
        self.W, self.H = w, h
        self.w, self.h = w * self.SS, h * self.SS
        self.img = Image.new("RGB", (self.w, self.h), (255, 255, 255))
        self.d = ImageDraw.Draw(self.img, "RGBA")
        self.rng = random.Random(seed)

    # ---------------------------------------------------------- primitives
    def P(self, pts):
        return [(x * self.w, y * self.h) for x, y in pts]

    def poly(self, pts, color):
        self.d.polygon(self.P(pts), fill=color)

    def rect(self, x0, y0, x1, y1, color):
        self.d.rectangle([x0 * self.w, y0 * self.h, x1 * self.w, y1 * self.h],
                         fill=color)

    def ell(self, cx, cy, rx, ry, color):
        self.d.ellipse([(cx - rx) * self.w, (cy - ry) * self.h,
                        (cx + rx) * self.w, (cy + ry) * self.h], fill=color)

    def line(self, pts, color, width):
        self.d.line(self.P(pts), fill=color, width=max(1, int(width * self.w)),
                    joint="curve")

    # -------------------------------------------------------------- fonds
    def sky(self, y1, c_top, c_bot):
        n = int(y1 * self.h) + 1
        for i in range(n):
            t = i / max(1, n - 1)
            self.d.line([(0, i), (self.w, i)], fill=mix(c_top, c_bot, t))

    def water(self, y0, y1, c_top, c_bot):
        n0, n1 = int(y0 * self.h), int(y1 * self.h)
        for i in range(n0, n1 + 1):
            t = (i - n0) / max(1, n1 - n0)
            self.d.line([(0, i), (self.w, i)], fill=mix(c_top, c_bot, t))

    def sun(self, cx, cy, r, color, glow=None, halo=3.0):
        if glow:
            for k in range(9, 0, -1):
                a = int(16 * (1 - k / 10.0)) + 4
                rr = r * (1 + halo * k / 9.0)
                self.d.ellipse([(cx - rr) * self.w, (cy - rr * self.w / self.h) * self.h,
                                (cx + rr) * self.w, (cy + rr * self.w / self.h) * self.h],
                               fill=glow + (a,))
        self.ell(cx, cy, r, r * self.w / self.h, color)

    def ripples(self, y0, y1, color, n=26, alpha=70, wmin=.05, wmax=.26):
        for _ in range(n):
            y = self.rng.uniform(y0, y1)
            x = self.rng.uniform(-.02, .95)
            ln = self.rng.uniform(wmin, wmax) * (0.35 + (y - y0) / max(1e-6, y1 - y0))
            th = max(1, int(0.0022 * self.h * (0.4 + (y - y0) / max(1e-6, y1 - y0))))
            self.d.line([(x * self.w, y * self.h), ((x + ln) * self.w, y * self.h)],
                        fill=color + (alpha,), width=th)

    def reflect(self, cx, y0, y1, halfw, color, alpha=55):
        n = int((y1 - y0) * self.h)
        for i in range(max(1, n)):
            y = y0 + (y1 - y0) * i / max(1, n)
            t = i / max(1, n)
            hw = halfw * (1 + 1.6 * t)
            a = int(alpha * (1 - t) ** 1.4)
            if a <= 0:
                continue
            if self.rng.random() < .22:
                continue
            self.d.line([(cx - hw) * self.w, y * self.h,
                         (cx + hw) * self.w, y * self.h],
                        fill=color + (a,), width=max(1, int(.0016 * self.h)))

    # ------------------------------------------------------------ paysage
    def hills(self, ybase, amp, color, n=7, phase=0.0, ytop=None):
        pts, steps = [], 90
        for i in range(steps + 1):
            x = i / steps
            y = ybase - amp * (0.55 + 0.45 * math.sin(phase + x * n * 1.7)) \
                * (0.6 + 0.4 * math.sin(phase * 1.7 + x * n * 0.6))
            pts.append((x, y))
        pts += [(1, 1.02), (0, 1.02)]
        self.poly(pts, color)

    def pine(self, x, ybase, h, color, w=None, trunk=True):
        w = w or h * 0.30
        tiers = 4
        for i in range(tiers):
            t = i / tiers
            yt = ybase - h * (1 - t * 0.68)
            yb = ybase - h * (0.60 - t * 0.60) * 0.98 - h * 0.02
            ww = w * (0.28 + 0.72 * t)
            self.poly([(x, yt), (x + ww, yb), (x - ww, yb)], color)
        if trunk:
            self.rect(x - w * .085, ybase - h * .10, x + w * .085, ybase, color)

    def treeline(self, ybase, h, color, n=40, jitter=.35, x0=-.02, x1=1.02):
        for i in range(n):
            x = x0 + (x1 - x0) * (i + self.rng.uniform(-.4, .4)) / n
            hh = h * (1 - jitter / 2 + self.rng.uniform(0, jitter))
            self.pine(x, ybase + h * .04, hh, color, trunk=False)
        self.rect(0, ybase, 1, min(1, ybase + h * .10), color)

    def birch(self, x, ybase, h, trunk_c, leaf_c):
        self.rect(x - h * .010, ybase - h, x + h * .010, ybase, trunk_c)
        for dy, r in ((.78, .16), (.60, .19), (.42, .15)):
            self.ell(x + (r * .12), ybase - h * dy, r * h * .8, r * h * .95, leaf_c)

    def rock(self, cx, ytop, w, h, color, seed=None):
        rng = random.Random(seed if seed is not None else self.rng.random())
        pts, steps = [], 16
        for i in range(steps + 1):
            t = i / steps
            a = math.pi * t
            r = 1 - 0.22 * rng.random()
            pts.append((cx - w / 2 + w * t, ytop + h * (1 - math.sin(a) * r)))
        pts += [(cx + w / 2, ytop + h * 1.5), (cx - w / 2, ytop + h * 1.5)]
        self.poly(pts, color)

    # -------------------------------------------------------------- objets
    def stuga(self, x, ybase, w, body="#8E3423", roof="#2A2622", trim="#F4F1EA",
              windows="#F6D68A", door=True):
        h = w * 0.62
        self.poly([(x - w / 2, ybase - h), (x + w / 2, ybase - h),
                   (x + w / 2, ybase), (x - w / 2, ybase)], body)
        self.poly([(x - w * .58, ybase - h), (x, ybase - h - w * .34),
                   (x + w * .58, ybase - h)], roof)
        self.rect(x - w / 2, ybase - h, x + w / 2, ybase - h + w * .045, trim)
        for dx in (-.24, .24):
            self.rect(x + w * dx - w * .085, ybase - h * .78,
                      x + w * dx + w * .085, ybase - h * .48, trim)
            self.rect(x + w * dx - w * .068, ybase - h * .755,
                      x + w * dx + w * .068, ybase - h * .505, windows)
        if door:
            self.rect(x - w * .055, ybase - h * .40, x + w * .055, ybase, trim)

    def boathouse(self, x, ybase, w, body="#8E3423", roof="#2A2622"):
        h = w * 0.55
        self.rect(x - w / 2, ybase - h, x + w / 2, ybase, body)
        self.poly([(x - w * .56, ybase - h), (x, ybase - h - w * .30),
                   (x + w * .56, ybase - h)], roof)
        self.rect(x - w * .16, ybase - h * .62, x + w * .16, ybase, "#3A2A22")

    def jetty(self, x0, x1, y, color, posts=5):
        th = (x1 - x0) * .045
        self.rect(x0, y - th, x1, y, color)
        for i in range(posts):
            px = x0 + (x1 - x0) * (i + .5) / posts
            self.rect(px - th * .22, y, px + th * .22, y + th * 2.4, color)

    def canoe(self, cx, cy, w, color, paddlers=2, pc=None):
        pc = pc or color
        h = w * .17
        self.poly([(cx - w / 2, cy), (cx - w * .40, cy + h),
                   (cx + w * .40, cy + h), (cx + w / 2, cy),
                   (cx + w * .34, cy - h * .30), (cx - w * .34, cy - h * .30)],
                  color)
        for i in range(paddlers):
            px = cx - w * .17 + w * .34 * i
            self.ell(px, cy - h * 1.35, w * .050, w * .050 * self.w / self.h, pc)
            self.poly([(px - w * .052, cy - h * .25), (px + w * .052, cy - h * .25),
                       (px + w * .036, cy - h * 1.15), (px - w * .036, cy - h * 1.15)],
                      pc)
            sgn = 1 if i % 2 == 0 else -1
            self.line([(px - w * .11 * sgn, cy - h * 1.5),
                       (px + w * .13 * sgn, cy + h * .5)], pc, w * .012)

    def kayak(self, cx, cy, w, color, pc=None):
        pc = pc or color
        h = w * .11
        self.poly([(cx - w / 2, cy), (cx - w * .36, cy + h),
                   (cx + w * .36, cy + h), (cx + w / 2, cy)], color)
        self.ell(cx, cy - h * 1.5, w * .055, w * .055 * self.w / self.h, pc)
        self.poly([(cx - w * .055, cy), (cx + w * .055, cy),
                   (cx + w * .040, cy - h * 1.3), (cx - w * .040, cy - h * 1.3)], pc)
        self.line([(cx - w * .21, cy - h * 2.3), (cx + w * .21, cy - h * .1)],
                  pc, w * .013)

    def sailboat(self, cx, cy, w, hull, sail):
        h = w * 1.15
        self.poly([(cx - w * .30, cy - h * .92), (cx + w * .26, cy - h * .10),
                   (cx - w * .30, cy - h * .10)], sail)
        self.poly([(cx - w * .34, cy - h * .88), (cx - w * .40, cy - h * .10),
                   (cx - w * .34, cy - h * .10)], sail)
        self.line([(cx - w * .32, cy - h * .95), (cx - w * .32, cy - h * .05)],
                  hull, w * .022)
        self.poly([(cx - w / 2, cy - h * .10), (cx + w / 2, cy - h * .10),
                   (cx + w * .30, cy + h * .05), (cx - w * .34, cy + h * .05)], hull)

    def ferry(self, cx, cy, w, hull, sup, win="#F6D68A"):
        h = w * .30
        self.poly([(cx - w / 2, cy - h * .55), (cx + w / 2, cy - h * .55),
                   (cx + w * .40, cy + h * .18), (cx - w * .42, cy + h * .18)], hull)
        self.rect(cx - w * .30, cy - h * 1.30, cx + w * .16, cy - h * .55, sup)
        self.rect(cx - w * .10, cy - h * 1.75, cx + w * .08, cy - h * 1.30, sup)
        for i in range(6):
            px = cx - w * .27 + w * .075 * i
            self.rect(px, cy - h * 1.10, px + w * .036, cy - h * .82, win)
        self.rect(cx + w * .19, cy - h * 1.6, cx + w * .215, cy - h * .55, sup)

    def tallship(self, cx, ybase, w, hull="#2B2118", sail="#EADFC8"):
        h = w * .30 * self.w / self.h
        X = lambda px: cx + w * px
        Y = lambda py: ybase - h * py

        def A(pts, col):
            self.poly([(X(a), Y(b)) for a, b in pts], col)

        A([(-.50, 1.28), (-.33, 1.30), (-.24, 1.00), (.02, .90), (.26, .96),
           (.46, 1.16), (.52, 1.14), (.47, .34), (.32, .02), (-.24, .00),
           (-.44, .30)], hull)
        A([(-.50, 1.28), (-.33, 1.30), (-.31, 1.02), (-.49, 1.00)],
          mix(hull, "#C9A24A", .42))
        light = mix(hull, "#E7C98A", .55)
        for row in (.74, .50):
            for k in range(8):
                px = -.28 + .092 * k
                if px > .38:
                    break
                self.rect(X(px), Y(row), X(px + .036), Y(row - .13), light)
        rig = mix(hull, "#0A0908", .30)
        for mx, mh, ny in ((-.22, 3.05, 3), (.03, 3.75, 3), (.27, 2.70, 2)):
            top = 1.05 + mh
            self.line([(X(mx), Y(1.00)), (X(mx), Y(top))], rig, w * .011)
            for k in range(ny):
                yy = 1.35 + (mh - .55) * (k + .55) / ny
                yw = .20 - .045 * k
                self.line([(X(mx - yw), Y(yy)), (X(mx + yw), Y(yy))], rig, w * .0075)
            self.line([(X(mx), Y(top)), (X(mx - .19), Y(1.05))], rig, w * .0026)
            self.line([(X(mx), Y(top)), (X(mx + .19), Y(1.05))], rig, w * .0026)
        self.line([(X(.46), Y(1.10)), (X(.80), Y(1.60))], rig, w * .010)
        A([(.52, 1.16), (.76, 1.54), (.60, 1.10)], sail)

    def circ_out(self, cx, cy, r, color, width):
        ry = r * self.w / self.h
        self.d.ellipse([(cx - r) * self.w, (cy - ry) * self.h,
                        (cx + r) * self.w, (cy + ry) * self.h],
                       outline=color, width=max(2, int(width * self.w)))

    def bike(self, cx, ybase, w, color):
        r = w * .285
        ry = r * self.w / self.h
        yc = ybase - ry
        for dx in (-w * .335, w * .335):
            self.circ_out(cx + dx, yc, r, color, w * .038)
        th = w * .030
        self.line([(cx - w * .335, yc), (cx + w * .02, yc)], color, th)
        self.line([(cx + w * .02, yc), (cx + w * .335, yc)], color, th)
        self.line([(cx + w * .02, yc), (cx - w * .10, yc - ry * .95)], color, th)
        self.line([(cx - w * .335, yc), (cx - w * .10, yc - ry * .95)], color, th)
        self.line([(cx - w * .10, yc - ry * .95), (cx + w * .17, yc - ry * 1.02)], color, th)
        self.line([(cx + w * .335, yc), (cx + w * .17, yc - ry * 1.02)], color, th)
        self.line([(cx + w * .10, yc - ry * 1.06), (cx + w * .25, yc - ry * 1.06)], color, th * .85)
        self.line([(cx + w * .10, yc - ry * 1.02), (cx - w * .16, yc - ry * .98)], color, th * .85)

    def townhouse(self, x, ybase, w, h, body, roof, gable="step"):
        self.rect(x, ybase - h, x + w, ybase, body)
        if gable == "step":
            self.poly([(x, ybase - h), (x, ybase - h - w * .20),
                       (x + w * .30, ybase - h - w * .20),
                       (x + w * .30, ybase - h - w * .40),
                       (x + w * .70, ybase - h - w * .40),
                       (x + w * .70, ybase - h - w * .20),
                       (x + w, ybase - h - w * .20), (x + w, ybase - h)], body)
            self.rect(x, ybase - h - w * .24, x + w, ybase - h - w * .20, roof)
        else:
            self.poly([(x - w * .04, ybase - h), (x + w / 2, ybase - h - w * .42),
                       (x + w * 1.04, ybase - h)], roof)
        rows, cols = 3, 3
        wc = "#F7E3AE"
        for r in range(rows):
            for c in range(cols):
                wx = x + w * (.16 + .29 * c)
                wy = ybase - h * (.86 - .27 * r)
                self.rect(wx, wy, wx + w * .15, wy + h * .155, wc)
                self.d.rectangle([(wx) * self.w, wy * self.h,
                                  (wx + w * .15) * self.w, (wy + h * .155) * self.h],
                                 outline=roof, width=max(1, int(w * .022 * self.w)))
        self.rect(x + w * .40, ybase - h * .27, x + w * .60, ybase, roof)

    def spire(self, x, ybase, w, h, body, roof, spike=True):
        self.rect(x - w / 2, ybase - h, x + w / 2, ybase, body)
        self.poly([(x - w * .62, ybase - h), (x, ybase - h - w * 1.15),
                   (x + w * .62, ybase - h)], roof)
        if spike:
            self.line([(x, ybase - h - w * 1.10), (x, ybase - h - w * 2.0)],
                      roof, w * .10)

    def moose(self, cx, ybase, h, color):
        k = self.h / self.w
        X = lambda px: cx + h * px * k
        Y = lambda py: ybase - h * py

        def A(pts):
            self.poly([(X(a), Y(b)) for a, b in pts], color)

        # pattes (arriere puis avant)
        for lx, lw, bx in ((-.70, .028, -.03), (-.60, .025, .01),
                           (-.16, .026, .02), (-.06, .024, -.01)):
            A([(lx - lw, .58), (lx + lw, .58), (lx + lw * .8 + bx, .0),
               (lx - lw * .8 + bx, .0)])
        # corps
        A([(-.78, .82), (-.55, .89), (-.22, 1.00), (-.05, .95), (-.01, .80),
           (.00, .60), (-.20, .52), (-.50, .53), (-.72, .60), (-.80, .70)])
        # encolure
        A([(-.14, .98), (.18, 1.03), (.23, .80), (-.02, .68)])
        # tete allongee
        A([(.15, 1.04), (.34, 1.03), (.50, .94), (.57, .84), (.53, .755),
           (.38, .775), (.24, .82), (.15, .90)])
        # fanon
        A([(.19, .84), (.30, .84), (.285, .60), (.20, .645)])
        # oreilles
        A([(.19, 1.02), (.06, 1.09), (.20, 1.10)])
        # bois palmes : ramure proche puis lointaine
        A([(.26, 1.05), (.10, 1.15), (-.03, 1.27), (.08, 1.33), (.23, 1.23),
           (.33, 1.10)])
        A([(-.03, 1.27), (-.10, 1.36), (.02, 1.33)])
        A([(.09, 1.32), (.07, 1.42), (.17, 1.32)])
        A([(.32, 1.06), (.48, 1.16), (.63, 1.28), (.73, 1.24), (.60, 1.12),
           (.42, 1.04)])
        A([(.63, 1.28), (.72, 1.37), (.75, 1.26)])
        A([(.50, 1.19), (.53, 1.30), (.61, 1.24)])

    def plane(self, cx, cy, w, color, roll=-14):
        a = math.radians(roll)
        k = self.w / self.h

        def T(pts):
            out = []
            for px, py in pts:
                rx = px * math.cos(a) - py * math.sin(a)
                ry = px * math.sin(a) + py * math.cos(a)
                out.append(((cx + w * rx) * self.w, (cy + w * ry * k) * self.h))
            return out

        # fuselage
        self.d.polygon(T([(-.46, .012), (-.30, .045), (.20, .050), (.40, .034),
                          (.50, .000), (.40, -.034), (.20, -.050),
                          (-.30, -.045), (-.46, -.012)]), fill=color)
        # aile principale (fleche)
        self.d.polygon(T([(.02, .012), (-.30, .215), (-.40, .215), (-.16, .000),
                          (-.40, -.215), (-.30, -.215), (.02, -.012)]), fill=color)
        # empennage horizontal
        self.d.polygon(T([(-.34, .010), (-.48, .105), (-.55, .105), (-.46, .000),
                          (-.55, -.105), (-.48, -.105), (-.34, -.010)]), fill=color)
        # derive
        self.d.polygon(T([(-.36, .000), (-.50, -.012), (-.56, -.028),
                          (-.42, -.030)]), fill=color)

    def birds(self, n, x0, x1, y0, y1, color, s=.013):
        for _ in range(n):
            x = self.rng.uniform(x0, x1)
            y = self.rng.uniform(y0, y1)
            ss = s * self.rng.uniform(.65, 1.3)
            self.line([(x - ss, y), (x - ss * .35, y - ss * .55), (x, y)], color, ss * .22)
            self.line([(x, y), (x + ss * .35, y - ss * .55), (x + ss, y)], color, ss * .22)

    def road(self, ytop, ybot, xtop, wtop, xbot, wbot, road_c, edge_c, dash_c):
        self.poly([(xtop - wtop / 2, ytop), (xtop + wtop / 2, ytop),
                   (xbot + wbot / 2, ybot), (xbot - wbot / 2, ybot)], road_c)
        for sgn in (-1, 1):
            self.poly([(xtop + sgn * wtop * .50, ytop), (xtop + sgn * wtop * .56, ytop),
                       (xbot + sgn * wbot * .56, ybot), (xbot + sgn * wbot * .50, ybot)],
                      edge_c)
        n = 7
        for i in range(n):
            t0 = (i + .12) / n
            t1 = (i + .58) / n
            t0, t1 = t0 ** 1.7, t1 ** 1.7
            for t, tt in ((t0, t1),):
                y0 = ytop + (ybot - ytop) * t
                y1 = ytop + (ybot - ytop) * tt
                x0 = xtop + (xbot - xtop) * t
                x1 = xtop + (xbot - xtop) * tt
                w0 = (wtop + (wbot - wtop) * t) * .035
                w1 = (wtop + (wbot - wtop) * tt) * .035
                self.poly([(x0 - w0, y0), (x0 + w0, y0), (x1 + w1, y1), (x1 - w1, y1)],
                          dash_c)

    def car(self, cx, ybase, w, body, glass="#BFD7DE"):
        h = w * .30
        self.poly([(cx - w / 2, ybase - h * .55), (cx - w * .30, ybase - h * .55),
                   (cx - w * .16, ybase - h * 1.05), (cx + w * .14, ybase - h * 1.05),
                   (cx + w * .30, ybase - h * .55), (cx + w / 2, ybase - h * .55),
                   (cx + w / 2, ybase - h * .10), (cx - w / 2, ybase - h * .10)], body)
        self.poly([(cx - w * .27, ybase - h * .60), (cx - w * .15, ybase - h * .98),
                   (cx + w * .12, ybase - h * .98), (cx + w * .25, ybase - h * .60)],
                  glass)
        for dx in (-.29, .29):
            self.ell(cx + w * dx, ybase - h * .10, w * .10, w * .10 * self.w / self.h,
                     "#1B1A18")

    def bridge(self, y, x0, x1, deck_c, pylon_c, cable_c, py=(.34, .66)):
        th = (x1 - x0) * .012
        self.rect(x0, y - th, x1, y + th * .5, deck_c)
        for p in py:
            px = x0 + (x1 - x0) * p
            top = y - (x1 - x0) * .21
            self.rect(px - th * .55, top, px + th * .55, y + th * .5, pylon_c)
            for k in range(1, 7):
                d = (x1 - x0) * .085 * k / 6.0 * 1.7
                self.line([(px, top + (x1 - x0) * .012), (px - d, y - th)], cable_c, th * .17)
                self.line([(px, top + (x1 - x0) * .012), (px + d, y - th)], cable_c, th * .17)
        for k in range(9):
            px = x0 + (x1 - x0) * (k + .5) / 9
            self.rect(px - th * .25, y + th * .5, px + th * .25, y + th * 3.2, pylon_c)

    def vignette(self, strength=42):
        v = Image.new("L", (self.w, self.h), 0)
        dv = ImageDraw.Draw(v)
        m = int(min(self.w, self.h) * .55)
        dv.ellipse([-m * .35, -m * .35, self.w + m * .35, self.h + m * .35], fill=255)
        v = v.filter(ImageFilter.GaussianBlur(min(self.w, self.h) * .16))
        dark = Image.new("RGB", (self.w, self.h), (6, 20, 26))
        self.img = Image.composite(self.img, Image.blend(self.img, dark, strength / 255), v)

    def grain(self, amount=5):
        n = Image.effect_noise((self.w, self.h), amount * 6).convert("L")
        self.img = Image.blend(self.img, Image.merge("RGB", (n, n, n)), amount / 190)

    def save(self, path):
        out = self.img.resize((self.W, self.H), Image.LANCZOS)
        out.save(path, quality=94)
        return path
