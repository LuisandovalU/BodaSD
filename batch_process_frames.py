import os
from PIL import Image

def remove_black_bg(img_path, output_path):
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # Flood fill starting points
    starts = [(0,0), (width-1,0), (0,height-1), (width-1,height-1), (0, height//2), (width-1, height//2)]
    
    visited = set()
    stack = starts
    
    # Tolerancia para considerar algo como "negro de fondo"
    threshold = 25
    
    while stack:
        x, y = stack.pop()
        if (x, y) in visited: continue
        if x < 0 or x >= width or y < 0 or y >= height: continue
        
        visited.add((x, y))
        r, g, b, a = pixels[x, y]
        
        if r < threshold and g < threshold and b < threshold:
            pixels[x, y] = (0, 0, 0, 0)
            stack.append((x+1, y))
            stack.append((x-1, y))
            stack.append((x, y+1))
            stack.append((x, y-1))

    img.save(output_path, "WEBP", quality=85)
    print(f"Processed {output_path}")

def main():
    directory = 'public/envelope-sequence'
    for i in range(1, 141):
        filename = f"frame-{i:03d}.jpg"
        img_path = os.path.join(directory, filename)
        if os.path.exists(img_path):
            output_path = os.path.join(directory, f"frame-{i:03d}.webp")
            remove_black_bg(img_path, output_path)

if __name__ == "__main__":
    main()
