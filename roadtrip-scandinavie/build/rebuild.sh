#!/bin/bash
set -e
R=/home/user/Sherlock/roadtrip-scandinavie
cd $R/build
node deck.js
python3 /root/.claude/skills/synced/*/pptx/scripts/office/validate.py $R/Roadtrip-Scandinavie-12-nuits.pptx | tail -3
python3 /root/.claude/skills/synced/*/pptx/scripts/office/soffice.py --headless \
  --convert-to pdf --outdir $R/build $R/Roadtrip-Scandinavie-12-nuits.pptx > /dev/null 2>&1
python3 - << 'PY'
import pymupdf, os, glob
d = "/home/user/Sherlock/roadtrip-scandinavie/build/"
for f in glob.glob(d + "slide-*.png"): os.remove(f)
doc = pymupdf.open(d + "Roadtrip-Scandinavie-12-nuits.pdf")
for i, pg in enumerate(doc, 1):
    pg.get_pixmap(dpi=100).save(f"{d}slide-{i:02d}.png")
print("slides rendus :", doc.page_count)
PY
