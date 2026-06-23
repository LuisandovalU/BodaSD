from PIL import Image
img = Image.open('public/flor.webp')
width, height = img.size
r, g, b = img.getpixel((width//2, height-1))
print(f"#{r:02x}{g:02x}{b:02x}")
