#!/bin/bash
# Parallel image searches for REPN association website
mkdir -p /home/z/my-project/scripts/imgsearch
cd /home/z/my-project/scripts/imgsearch

z-ai image-search -q "modern city skyline with office skyscrapers at dusk" -c 4 --gl us --no-rank -o hero.json &
z-ai image-search -q "real estate agent handing house keys to happy couple" -c 4 --gl us --no-rank -o keys.json &
z-ai image-search -q "business people networking at a professional conference event" -c 4 --gl us --no-rank -o networking.json &
z-ai image-search -q "large audience attending a business seminar in conference hall" -c 4 --gl us --no-rank -o conference.json &
z-ai image-search -q "professional businesswoman headshot portrait in business suit smiling" -c 8 --gl us --no-rank -o women.json &
z-ai image-search -q "professional businessman headshot portrait in business suit smiling" -c 8 --gl us --no-rank -o men.json &
z-ai image-search -q "luxury suburban house exterior with green lawn" -c 4 --gl us --no-rank -o house.json &
z-ai image-search -q "real estate team meeting in modern office" -c 4 --gl us --no-rank -o meeting.json &
z-ai image-search -q "person attending online webinar training on laptop" -c 3 --gl us --no-rank -o webinar.json &
z-ai image-search -q "house for sale real estate sign in front yard" -c 3 --gl us --no-rank -o sign.json &

wait
echo "ALL SEARCHES DONE"
ls -la
