from PIL import Image
img = Image.open('public/test_frame.jpg').convert('L')
pixels = img.getdata()
width, height = img.size
# Find left-most and right-most non-white pixels (envelope is darker than white bg)
leftmost = width
rightmost = 0
for y in range(height):
    for x in range(width):
        p = img.getpixel((x, y))
        if p < 240: # Not pure white
            if x < leftmost: leftmost = x
            if x > rightmost: rightmost = x
print(f"Envelope bounds: left={leftmost}, right={rightmost}, width={rightmost-leftmost}")
