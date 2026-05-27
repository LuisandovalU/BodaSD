import sys
from PIL import Image, ImageOps

def create_transparent_text(input_path, output_path, text_color=(94, 10, 22)):
    try:
        # Abrir imagen y convertir a escala de grises
        img = Image.open(input_path).convert("L")
        
        # Invertir colores: el fondo blanco se vuelve negro (transparente) 
        # y el texto oscuro se vuelve blanco (opaco). 
        # Esto preserva el suavizado (anti-aliasing) de los bordes perfectamente.
        alpha_mask = ImageOps.invert(img)
        
        # Crear una imagen vacía del mismo tamaño con el color de texto deseado (R, G, B)
        color_img = Image.new("RGBA", img.size, color=text_color)
        
        # Aplicar la máscara de transparencia
        color_img.putalpha(alpha_mask)
        
        # Guardar como webp
        color_img.save(output_path, "WEBP", quality=100)
        print(f"✅ Éxito: Imagen guardada con fondo transparente en {output_path}")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python create_transparent_text.py <ruta_imagen_original> [ruta_destino]")
        sys.exit(1)
        
    input_file = sys.argv[1]
    
    # Si no se da ruta de destino, guardarla en public/save-our-date.webp por defecto
    if len(sys.argv) >= 3:
        output_file = sys.argv[2]
    else:
        output_file = "public/save-our-date.webp"
        
    # El color (94, 10, 22) corresponde al rojo oscuro #5e0a16 de tu diseño
    create_transparent_text(input_file, output_file, text_color=(94, 10, 22))
