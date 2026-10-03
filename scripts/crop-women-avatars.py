#!/usr/bin/env python3
"""Crop the new 9-women headshot grid into avatar-w*.jpg files.
Cells (row-major): 1 Black-curly, 2 East-Asian, 3 blonde, 4 Latina-brown,
5 South-Asian, 6 older-gray, 7 redhead, 8 long-dark, 9 short-black.
Mapping keeps w6 (already distinct) and gives every member a unique face:
  w1(Nicole) <- c6 older-gray, w2(Amanda) <- c7 redhead, w3(Sarah) <- c4 Latina,
  w4(spare)  <- c3 blonde,    w5(Rachel) <- c1 curly,    w7(spare) <- c5 S.Asian,
  w8(Jennifer) <- c2 E.Asian, w9(spare)  <- c9 short-black
"""
from PIL import Image

SRC = "public/images/headshots-women-2.png"
im = Image.open(SRC)
W, H = im.size  # 1024x1024
cw, ch = W / 3.0, H / 3.0

def cell(n: int) -> Image.Image:
    r, c = divmod(n - 1, 3)
    x0, y0 = int(c * cw), int(r * ch)
    # small inset to avoid grid seam lines
    box = (x0 + 8, y0 + 8, x0 + int(cw) - 8, y0 + int(ch) - 8)
    return im.crop(box).resize((320, 320), Image.LANCZOS)

mapping = {
    1: 6,  # avatar-w1 <- cell 6
    2: 7,  # avatar-w2 <- cell 7
    3: 4,  # avatar-w3 <- cell 4
    4: 3,  # avatar-w4 <- cell 3
    5: 1,  # avatar-w5 <- cell 1
    # w6 kept: already a distinct face
    7: 5,  # avatar-w7 <- cell 5
    8: 2,  # avatar-w8 <- cell 2
    9: 9,  # avatar-w9 <- cell 9
}

for avatar_n, cell_n in mapping.items():
    out = f"public/images/avatar-w{avatar_n}.jpg"
    cell(cell_n).save(out, quality=92)
    print(f"avatar-w{avatar_n}.jpg <- cell {cell_n}")

print("done")
