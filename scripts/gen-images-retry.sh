#!/bin/bash
# Retry missing images sequentially with delays
cd /home/z/my-project/public/images

gen() {
  local prompt="$1" out="$2" size="$3" tries=0
  while [ $tries -lt 4 ]; do
    if [ -f "$out" ]; then echo "EXISTS: $out"; return 0; fi
    if z-ai image -p "$prompt" -o "$out" -s "$size" 2>&1 | grep -q "saved\|Image saved"; then
      echo "OK: $out"; return 0
    fi
    tries=$((tries+1)); echo "RETRY $tries: $out"; sleep 8
  done
  echo "FAILED: $out"; return 1
}

gen "photorealistic modern city skyline at dusk with glass office skyscrapers, warm golden window lights, deep blue twilight sky, professional real estate photography, high quality, detailed" hero-skyline.png 1440x704
sleep 3
gen "photorealistic large audience attending professional business seminar in conference hall, speaker on stage with large presentation screen, corporate event photography, high quality, detailed" seminar.png 1344x768
sleep 3
gen "photorealistic luxury suburban two-story house exterior with manicured green lawn, blue sky with soft clouds, real estate listing photography, high quality, detailed" house.png 1024x1024
sleep 3
gen "photorealistic professional woman attending online webinar on laptop at home office desk, taking notes, screen shows video conference with presenter, over shoulder view, high quality" webinar.png 1344x768

echo "=== RETRY DONE ==="
ls -la /home/z/my-project/public/images/
