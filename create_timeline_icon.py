import sys
import os
from PIL import Image, ImageOps, ImageStat

def process_timeline_icon(input_path, output_path):
    try:
        # Abrir imagen y convertir a escala de grises
        img = Image.open(input_path).convert("L")
        
        # Analizar esquinas para detectar de forma inteligente si el fondo es blanco o negro
        width, height = img.size
        corners = [
            img.getpixel((0, 0)),
            img.getpixel((width - 1, 0)),
            img.getpixel((0, height - 1)),
            img.getpixel((width - 1, height - 1))
        ]
        avg_corner = sum(corners) / 4.0
        
        # Si el promedio de las esquinas es claro (> 127), el fondo es blanco y el dibujo es oscuro.
        # En ese caso, invertimos la imagen para que el dibujo sea claro y el fondo sea negro (transparente).
        if avg_corner > 127:
            print(f"ℹ️ Detectado fondo CLARO en {os.path.basename(input_path)}. Invirtiendo máscara...")
            alpha_mask = ImageOps.invert(img)
        else:
            print(f"ℹ️ Detectado fondo OSCURO en {os.path.basename(input_path)}.")
            alpha_mask = img
            
        # Filtro de contraste ultra agresivo para remover ruido de fondo (compresión JPEG)
        # Todo valor menor a 90 se vuelve 100% transparente. El resto se escala para ser brillante.
        alpha_mask = alpha_mask.point(lambda p: 0 if p < 90 else min(255, int((p - 90) * 2.2)))
        
        # Crear imagen con color blanco puro (255, 255, 255) y canal Alpha
        color_img = Image.new("RGBA", img.size, color=(255, 255, 255))
        color_img.putalpha(alpha_mask)
        
        # Guardar como WebP
        color_img.save(output_path, "WEBP", quality=100)
        print(f"✅ Éxito: Icono guardado de forma impecable en {output_path}")
        
    except Exception as e:
        print(f"❌ Error al procesar {input_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python create_timeline_icon.py <input> <output>")
        sys.exit(1)
        
    process_timeline_icon(sys.argv[1], sys.argv[2])
