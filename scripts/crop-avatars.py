#!/usr/bin/env python3
"""Crop 3x3 headshot grids into individual avatar squares."""
from PIL import Image
import os

IMG_DIR = "/home/z/my-project/public/images"

for grid_name, prefix in [("headshots-women.png", "avatar-w"), ("headshots-men.png", "avatar-m")]:
    path = os.path.join(IMG_DIR, grid_name)
    img = Image.open(path).convert("RGB")
    w, h = img.size
    cw, ch = w // 3, h // 3
    idx = 1
    for row in range(3):
        for col in range(3):
            left = col * cw
            top = row * ch
            # inset by 6px to avoid white gutter lines
            crop = img.crop((left + 6, top + 6, left + cw - 6, top + ch - 6))
            # resize to clean 320x320
            crop = crop.resize((320, 320), Image.LANCZOS)
            out = os.path.join(IMG_DIR, f"{prefix}{idx}.jpg")
            crop.save(out, "JPEG", quality=88)
            idx += 1
    print(f"Cropped {grid_name} -> 9 avatars ({prefix}1..9)")

print("DONE")
