#!/bin/bash
# Generate all photography for REPN association website
mkdir -p /home/z/my-project/public/images
cd /home/z/my-project/public/images

# Hero + scene photography (wide)
z-ai image -p "photorealistic modern city skyline at dusk with glass office skyscrapers, warm golden window lights, deep blue twilight sky, professional real estate photography, high quality, detailed" -o hero-skyline.png -s 1440x720 &
z-ai image -p "photorealistic diverse business professionals networking at real estate industry conference reception, holding coffee cups, name badges, modern hotel ballroom, warm lighting, candid corporate event photography, high quality" -o networking.png -s 1344x768 &
z-ai image -p "photorealistic large audience attending professional business seminar in conference hall, speaker on stage with large presentation screen, corporate event photography, high quality, detailed" -o seminar.png -s 1344x768 &
wait
z-ai image -p "photorealistic neoclassical state capitol government building exterior with dome, american flag, clear morning sky, architectural photography, high quality" -o capitol.png -s 1344x768 &
z-ai image -p "photorealistic friendly real estate agent in navy suit handing house keys to happy young couple in front of suburban home, golden hour light, professional photography, high quality" -o keys.png -s 1344x768 &
z-ai image -p "photorealistic luxury suburban two-story house exterior with manicured green lawn, blue sky with soft clouds, real estate listing photography, high quality, detailed" -o house.png -s 1024x1024 &
wait
z-ai image -p "photorealistic real estate team meeting in modern office, professionals reviewing documents around conference table, laptops and coffee, natural window light, corporate photography, high quality" -o office-meeting.png -s 1344x768 &
z-ai image -p "photorealistic professional woman attending online webinar on laptop at home office desk, taking notes, screen shows video conference with presenter, over shoulder view, high quality" -o webinar.png -s 1344x768 &
z-ai image -p "photorealistic elegant awards gala dinner in hotel ballroom, people in business attire applauding at round tables, stage with podium and gold accents, event photography, high quality" -o gala.png -s 1344x768 &
wait

# Headshot grids (will be cropped into 9 avatars each)
z-ai image -p "photo collage grid exactly 3 by 3 layout of nine different professional corporate headshots of diverse businesswomen aged 30-55, smiling, business suits and blazers, studio lighting, clean neutral gray background, each photo shows head and shoulders only, photorealistic, high quality" -o headshots-women.png -s 1024x1024 &
z-ai image -p "photo collage grid exactly 3 by 3 layout of nine different professional corporate headshots of diverse businessmen aged 30-55, smiling, business suits and ties, studio lighting, clean neutral gray background, each photo shows head and shoulders only, photorealistic, high quality" -o headshots-men.png -s 1024x1024 &

wait
echo "=== GENERATION DONE ==="
ls -la /home/z/my-project/public/images/
