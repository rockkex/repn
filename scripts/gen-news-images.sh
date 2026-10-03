#!/bin/bash
# Generate 3 missing news featured images for REPN news page (with 429 retry)
cd /home/z/my-project

gen() {
  local prompt="$1" out="$2"
  for attempt in 1 2 3 4 5; do
    if z-ai image -p "$prompt" -o "$out" -s 1344x768 > /dev/null 2>&1; then
      if [ -f "$out" ]; then echo "OK: $out (attempt $attempt)"; return 0; fi
    fi
    echo "retry $attempt for $out..."; sleep $((attempt * 4))
  done
  echo "FAILED: $out"; return 1
}

gen "Diverse group of young real estate professionals receiving scholarship award certificates on a conference stage, warm celebratory lighting, audience applauding, professional event photography, navy blue and gold accents, high quality, detailed" "public/images/scholarships.png"
sleep 3
gen "Friendly attorney consulting with a real estate agent over contract documents at a modern office desk, bookshelf in background, natural window light, professional corporate photography, high quality, detailed" "public/images/legal-hours.png"
sleep 3
gen "Real estate title closing meeting, professional hands signing settlement documents, house keys and small model house on the table, bright modern office, professional corporate photography, high quality, detailed" "public/images/title-partnership.png"
