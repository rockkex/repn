#!/bin/bash
# Generate 2 male headshots to fix gender-mismatched avatars (David Chen, Marcus Williams)
cd /home/z/my-project

gen() {
  local prompt="$1" out="$2"
  for attempt in 1 2 3 4 5; do
    if z-ai image -p "$prompt" -o "$out" -s 1024x1024 > /dev/null 2>&1; then
      if [ -f "$out" ]; then echo "OK: $out (attempt $attempt)"; return 0; fi
    fi
    echo "retry $attempt for $out..."; sleep $((attempt * 5))
  done
  echo "FAILED: $out"; return 1
}

gen "Professional corporate headshot portrait of an East Asian Chinese man in his mid 40s, short black hair, warm confident smile, wearing a navy blue business blazer with white shirt, neutral gray studio background, centered composition, head and shoulders, professional photography, sharp focus, high quality" "public/images/headshot-david.png"
sleep 3
gen "Professional corporate headshot portrait of a Black African American man in his mid 40s, short hair with slight gray at temples, friendly confident smile, wearing a charcoal gray business blazer with light blue shirt, neutral gray studio background, centered composition, head and shoulders, professional photography, sharp focus, high quality" "public/images/headshot-marcus.png"
