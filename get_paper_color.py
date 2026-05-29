from PIL import Image
img = Image.open('public/test.jpg')
pixels = img.load()
width, height = img.size
r_sum, g_sum, b_sum, count = 0, 0, 0, 0
for x in range(width):
    for y in range(height):
        r, g, b = pixels[x, y]
        # Ignore black background
        if r > 50 and g > 50 and b > 50:
            # We want the paper texture at the edges, so let's sample near the corners but not the black
            pass

# Let's just sample a point that is known to be paper texture. 
# Envelope is in center. Let's sample a point slightly above the envelope.
# Actually, the user's screenshot has a very specific paper texture.
print(f"Sample: {pixels[100, 100]}")
