import sys
from PIL import Image
img = Image.open('public/test_frame.jpg')
points = [(10,10), (1270,10), (10,710), (1270,710), (640,10), (640,710), (10,360), (1270,360)]
for p in points:
    pixel = img.getpixel(p)
    print(f"Point {p}: #{pixel[0]:02x}{pixel[1]:02x}{pixel[2]:02x}")
