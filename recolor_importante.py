from PIL import Image

def recolor_image():
    # Abrir la imagen importante.webp
    img = Image.open('public/importante.webp').convert('RGBA')
    
    r, g, b, a = img.split()
    
    # #f2e176 es RGB(242, 225, 118)
    r = r.point(lambda _: 242)
    g = g.point(lambda _: 225)
    b = b.point(lambda _: 118)
    
    # Reconstruir la imagen
    new_img = Image.merge("RGBA", (r, g, b, a))
    
    # Guardar
    new_img.save('public/importante_gold.webp', 'WEBP', quality=100)
    print("Imagen importante_gold.webp guardada con éxito.")

if __name__ == "__main__":
    recolor_image()
