# -*- coding: utf-8 -*-
"""Carte du roadtrip Copenhague -> Asnen -> Vastervik -> Stockholm."""
import warnings
warnings.filterwarnings("ignore")
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patheffects import withStroke
from mpl_toolkits.basemap import Basemap

OUT = "/home/user/Sherlock/roadtrip-scandinavie/assets/carte_roadtrip.png"

SEA    = "#0F2E36"
LAND   = "#17444E"
COAST  = "#2E6A76"
BORDER = "#48838E"
ROUTE  = "#E0A64B"
INK    = "#F2F7F8"
MUTED  = "#9FBEC5"
RED    = "#D2563A"

fig = plt.figure(figsize=(9.0, 9.0), dpi=220)
fig.patch.set_facecolor(SEA)
ax = fig.add_axes([0, 0, 1, 1])
ax.set_facecolor(SEA)

m = Basemap(projection="lcc", resolution="h",
            llcrnrlon=9.6, llcrnrlat=54.5, urcrnrlon=20.6, urcrnrlat=60.4,
            lat_0=57.4, lon_0=15.0, ax=ax)

m.drawmapboundary(fill_color=SEA, linewidth=0)
m.fillcontinents(color=LAND, lake_color=SEA)
m.drawcoastlines(linewidth=0.45, color=COAST)
m.drawcountries(linewidth=0.7, color=BORDER)

# ---------------------------------------------------------------- itineraire
seg1 = [(55.676,12.568),(55.612,12.750),(55.571,12.829),(55.605,13.003),
        (55.72,13.55),(55.90,13.90),(56.031,14.152),(56.25,14.42),
        (56.40,14.60),(56.55,14.78)]
seg2 = [(56.55,14.78),(56.72,14.80),(56.879,14.806),(57.02,15.10),
        (57.20,15.40),(57.49,15.84),(57.62,16.20),(57.758,16.638)]
seg3 = [(57.758,16.638),(57.98,16.55),(58.20,16.42),(58.484,16.32),
        (58.591,16.186),(58.75,17.01),(58.95,17.45),(59.15,17.75),(59.329,18.069)]

def smooth(pts, n=260):
    pts = np.array(pts, dtype=float)
    t = np.linspace(0, 1, len(pts))
    tt = np.linspace(0, 1, n)
    lat = np.interp(tt, t, pts[:, 0])
    lon = np.interp(tt, t, pts[:, 1])
    k = 13
    ker = np.ones(k) / k
    lat = np.convolve(np.pad(lat, (k, k), mode="edge"), ker, mode="same")[k:-k]
    lon = np.convolve(np.pad(lon, (k, k), mode="edge"), ker, mode="same")[k:-k]
    return lon, lat

for seg in (seg1, seg2, seg3):
    lo, la = smooth(seg)
    x, y = m(lo, la)
    ax.plot(x, y, color="#000000", lw=6.0, alpha=0.30, zorder=5,
            solid_capstyle="round")
    ax.plot(x, y, color=ROUTE, lw=3.1, zorder=6, solid_capstyle="round")

# --------------------------------------------------------------- villes ref
refs = [("Malmö", 55.605, 13.003, "left", 8, -13),
        ("Göteborg", 57.707, 11.967, "left", 7, 4),
        ("Växjö", 56.879, 14.806, "right", -8, 3),
        ("Kalmar", 56.663, 16.357, "right", -8, 0),
        ("Jönköping", 57.782, 14.165, "right", -8, 2),
        ("Norrköping", 58.591, 16.186, "right", -8, 5),
        ("Vimmerby", 57.666, 15.858, "right", -8, 4)]
for name, la, lo, ha, dx, dy in refs:
    x, y = m(lo, la)
    ax.plot(x, y, "o", ms=3.4, mfc=MUTED, mec=SEA, mew=0.8, zorder=7)
    ax.annotate(name, (x, y), xytext=(dx, dy), textcoords="offset points",
                ha=ha, va="center", fontsize=8.2, color=MUTED, zorder=7,
                fontfamily="DejaVu Sans")

# ------------------------------------------------------------------- etapes
stages = [("1", "Copenhague", "2 nuits", 55.676, 12.568, "right", -26, -4),
          ("2", "Lac Åsnen",  "4 nuits", 56.560, 14.700, "right", -26,  4),
          ("3", "Västervik",  "4 nuits", 57.758, 16.638, "left",   26, -4),
          ("4", "Stockholm",  "2 nuits", 59.329, 18.069, "left",   26,  4)]
for num, name, nights, la, lo, ha, dx, dy in stages:
    x, y = m(lo, la)
    ax.plot(x, y, "o", ms=21, mfc=RED, mec="#FFFFFF", mew=2.0, zorder=9)
    ax.text(x, y, num, ha="center", va="center", fontsize=11.5, weight="bold",
            color="#FFFFFF", zorder=10, fontfamily="DejaVu Sans")
    ax.annotate(name, (x, y), xytext=(dx, dy + 8), textcoords="offset points",
                ha=ha, va="center", fontsize=14.5, weight="bold",
                color=INK, zorder=10, fontfamily="DejaVu Sans",
                path_effects=[withStroke(linewidth=3.4, foreground=SEA)])
    ax.annotate(nights, (x, y), xytext=(dx, dy - 10), textcoords="offset points",
                ha=ha, va="center", fontsize=10.5, color=ROUTE, zorder=10,
                fontfamily="DejaVu Sans",
                path_effects=[withStroke(linewidth=3.0, foreground=SEA)])

# ------------------------------------------------------- temps par tronçon
legs = [("2 h 45  ·  218 km", 55.88, 13.62, -21),
        ("3 h 15 – 3 h 45", 57.16, 15.02, -46),
        ("3 h 15", 58.98, 17.42, -39)]
for label, la, lo, rot in legs:
    x, y = m(lo, la)
    ax.text(x, y, label, ha="center", va="center", fontsize=9.4, rotation=rot,
            rotation_mode="anchor", color="#0F2E36", zorder=11, weight="bold",
            fontfamily="DejaVu Sans",
            bbox=dict(boxstyle="round,pad=0.34", fc=ROUTE, ec="none"))

# ------------------------------------------------------------------ labels
geo = [("SUÈDE", 58.35, 13.55, 13, "#79A6AF", 2.4, "bold"),
       ("DANEMARK", 56.15, 10.15, 11.5, "#79A6AF", 2.2, "bold"),
       ("Mer Baltique", 56.75, 18.95, 12, "#5D8894", 0.0, "normal"),
       ("Gotland", 57.50, 18.50, 8.6, "#8FB3BB", 0.0, "italic"),
       ("Lac Vättern", 58.40, 14.52, 8.2, "#7FA8B1", 0.0, "italic"),
       ("Lac Vänern", 58.92, 13.30, 8.2, "#7FA8B1", 0.0, "italic")]
for txt, la, lo, fs, col, sp, style in geo:
    x, y = m(lo, la)
    kw = dict(ha=("left" if txt == "DANEMARK" else "center"), va="center", fontsize=fs, color=col, zorder=8,
              fontfamily="DejaVu Sans")
    if style == "bold":
        kw["weight"] = "bold"
    elif style == "italic":
        kw["style"] = "italic"
    t = ax.text(x, y, txt, **kw)
    if sp:
        t.set_fontstretch("expanded")

xo, yo = m(16.62, 56.60)
ax.text(xo, yo, "Öland", ha="center", va="center", fontsize=8.6, rotation=-68,
        rotation_mode="anchor", color="#8FB3BB", style="italic", zorder=8,
        fontfamily="DejaVu Sans")

# pont de l'Oresund
x, y = m(12.829, 55.571)
ax.annotate("Pont de l'Øresund", (x, y), xytext=(34, -30),
            textcoords="offset points", ha="left", va="center", fontsize=8.8,
            color=ROUTE, style="italic", zorder=11, fontfamily="DejaVu Sans",
            arrowprops=dict(arrowstyle="-", color=ROUTE, lw=0.9,
                            shrinkA=0, shrinkB=4),
            path_effects=[withStroke(linewidth=3.0, foreground=SEA)])

# rose des vents + echelle
xn, yn = m(10.35, 59.45)
dy_n = 0.055 * (m.ymax - m.ymin)
ax.annotate("", xy=(xn, yn + dy_n), xytext=(xn, yn),
            arrowprops=dict(arrowstyle="-|>", color=MUTED, lw=1.5,
                            mutation_scale=16), zorder=9)
ax.text(xn, yn + dy_n * 1.28, "N", ha="center", va="bottom", fontsize=11.5,
        weight="bold", color=MUTED, zorder=9, fontfamily="DejaVu Sans")
m.drawmapscale(12.25, 54.85, 15.0, 57.4, 200, barstyle="simple", units="km",
               fontsize=8.5, fontcolor=MUTED, fillcolor1=MUTED,
               fillcolor2=SEA, linewidth=0.9, yoffset=9000)
for child in ax.get_children():
    try:
        if child.get_color() == "k":
            child.set_color(MUTED)
    except Exception:
        pass

fig.savefig(OUT, facecolor=SEA, dpi=220)
print("OK ->", OUT)
