from PIL import Image

def recolor_image():
    # Abrir la imagen regalos.webp que actualmente es blanca con transparencia
    img = Image.open('public/regalos.webp').convert('RGBA')
    
    r, g, b, a = img.split()
    
    # #750f06 es RGB(117, 15, 6)
    r = r.point(lambda _: 117)
    g = g.point(lambda _: 15)
    b = b.point(lambda _: 6)
    
    # Reconstruir la imagen con el nuevo color y el alpha original
    new_img = Image.merge("RGBA", (r, g, b, a))
    
    # Guardar la nueva versión
    new_img.save('public/regalos_wine.webp', 'WEBP', quality=100)
    print("Imagen regalos_wine.webp guardada con éxito.")

if __name__ == "__main__":
    recolor_image()
