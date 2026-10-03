#!/bin/bash
# Generate a fresh 3x3 grid of NINE DIFFERENT women headshots (diversity enforced),
# with retry on 429 / failures.
cd /home/z/my-project
OUT="public/images/headshots-women-2.png"
for attempt in 1 2 3 4 5; do
  if z-ai image -p "Professional corporate headshot contact sheet, strict 3x3 grid layout of nine DIFFERENT women, one woman per grid cell, each with clearly different ethnicity and appearance: top row Black woman with natural curly hair, East Asian woman, blonde white woman; middle row Latina woman, South Asian woman, older white woman with gray hair; bottom row redhead woman, Middle Eastern woman with long dark hair, Black woman with short cropped hair; all wearing navy or charcoal business blazers, identical neutral gray studio background, symmetrical grid, professional photography, sharp focus, high quality" -o "$OUT" -s 1024x1024 > /dev/null 2>&1; then
    if [ -f "$OUT" ]; then echo "OK: $OUT (attempt $attempt)"; exit 0; fi
  fi
  echo "retry $attempt..."; sleep $((attempt * 5))
done
echo "FAILED"
exit 1
