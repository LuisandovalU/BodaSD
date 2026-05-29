from PIL import Image

for i in range(1, 5):
    img_path = f'/Users/luisalbertosandovalramos/Desktop/foto{i}.jpeg'
    try:
        with Image.open(img_path) as img:
            print(f"{img_path}: {img.size}")
    except Exception as e:
        print(f"Error reading {img_path}: {e}")
