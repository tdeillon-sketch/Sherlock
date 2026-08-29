# -*- coding: utf-8 -*-
"""Voiles degrades cuits dans les images (pptxgenjs ne gere pas les degrades)."""
from PIL import Image
A = "/home/user/Sherlock/roadtrip-scandinavie/assets/"
INK = (15, 46, 54)


def scrim(src, dst, mode, start, end, amax, flat=0.0, expo=1.25):
    im = Image.open(A + src).convert("RGB")
    W, H = im.size
    mask = Image.new("L", (W, H))
    px = mask.load()
    if mode == "left":
        for x in range(W):
            t = (x / W - start) / (end - start)
            a = int(amax * (1 - max(0.0, min(1.0, t))) ** expo)
            for y in range(H):
                px[x, y] = a
    else:
        for y in range(H):
            t = (y / H - start) / (end - start)
            a = int(amax * max(0.0, min(1.0, t)) ** expo)
            for x in range(W):
                px[x, y] = a
    if flat:
        im = Image.blend(im, Image.new("RGB", (W, H), INK), flat)
    im = Image.composite(Image.new("RGB", (W, H), INK), im, mask)
    im.save(A + dst, quality=94)
    return dst


print(scrim("hero.jpg", "hero_title.jpg", "left", 0.04, 0.82, 246, flat=0.16, expo=1.15))
for n in ("copenhague", "asnen", "vastervik", "stockholm"):
    print(scrim(f"div_{n}.jpg", f"div_{n}_o.jpg", "down", 0.42, 0.70, 252, expo=1.05))
