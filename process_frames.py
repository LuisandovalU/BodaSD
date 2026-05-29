from PIL import Image, ImageDraw
import sys

def remove_black_bg(img_path, output_path):
    img = Image.open(img_path).convert("RGBA")
    
    # We will use a flood fill algorithm from the corners to replace black with transparent
    width, height = img.size
    
    # Simple thresholding might be better if the envelope doesn't have black inside.
    # But flood fill is safer to not make black text inside transparent.
    
    # Create a mask image for flood fill (L mode, 1 bit)
    mask = Image.new('L', (width, height), 0)
    
    # Get pixel data
    pixels = img.load()
    mask_pixels = mask.load()
    
    # List of starting points (corners and midpoints of edges)
    starts = [(0,0), (width-1,0), (0,height-1), (width-1,height-1), (0, height//2), (width-1, height//2)]
    
    visited = set()
    stack = starts
    
    # Flood fill
    while stack:
        x, y = stack.pop()
        if (x, y) in visited: continue
        if x < 0 or x >= width or y < 0 or y >= height: continue
        
        visited.add((x, y))
        r, g, b, a = pixels[x, y]
        
        # If it's a dark color (near black)
        if r < 20 and g < 20 and b < 20:
            pixels[x, y] = (0, 0, 0, 0) # Make transparent
            
            # Add neighbors to stack
            stack.append((x+1, y))
            stack.append((x-1, y))
            stack.append((x, y+1))
            stack.append((x, y-1))

    img.save(output_path, "WEBP")
    print(f"Saved {output_path}")

remove_black_bg('public/test.jpg', 'public/test_transparent.webp')
