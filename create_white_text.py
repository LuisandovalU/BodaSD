import sys
from PIL import Image

def create_white_transparent(input_path, output_path):
    try:
        # Abrir imagen en escala de grises.
        # Las letras blancas serán brillantes (valores altos) y el fondo negro será oscuro (valores bajos).
        alpha_mask = Image.open(input_path).convert("L")
        
        # Umbral más alto para eliminar cualquier ruido de fondo jpeg (evita el "cuadro" o "halo" fantasma)
        # Todo valor menor a 140 se vuelve 100% transparente.
        alpha_mask = alpha_mask.point(lambda p: 0 if p < 140 else min(255, int((p - 140) * 2.2)))

        # Crear una imagen vacía del mismo tamaño con color blanco sólido (R, G, B)
        color_img = Image.new("RGBA", alpha_mask.size, color=(255, 255, 255))
        
        # Aplicar la máscara de transparencia. 
        # Lo que era blanco puro en la original se vuelve 100% opaco, 
        # y lo negro puro se vuelve 100% transparente.
        color_img.putalpha(alpha_mask)
        
        # Guardar como webp
        color_img.save(output_path, "WEBP", quality=100)
        print(f"✅ Éxito: Imagen guardada con fondo transparente en {output_path}")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python create_white_text.py <input> <output>")
        sys.exit(1)
        
    create_white_transparent(sys.argv[1], sys.argv[2])
