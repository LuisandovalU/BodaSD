import os
import sys
from PIL import Image

def convert_to_webp(input_folder, output_folder, quality=85):
    # Crear carpeta de salida si no existe
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Extensiones soportadas
    valid_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.tiff')

    print(f"Buscando imágenes en: {input_folder}")
    
    converted_count = 0
    for filename in os.listdir(input_folder):
        if filename.lower().endswith(valid_extensions):
            input_path = os.path.join(input_folder, filename)
            
            # Nombre de archivo sin extensión + .webp
            name_without_ext = os.path.splitext(filename)[0]
            output_filename = f"{name_without_ext}.webp"
            output_path = os.path.join(output_folder, output_filename)

            try:
                # Abrir y convertir
                with Image.open(input_path) as img:
                    # Convertir a RGB si tiene transparencia pero queremos guardarlo bien, 
                    # aunque webp soporta RGBA (transparencia).
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGBA")
                    else:
                        img = img.convert("RGB")

                    # Guardar como WebP
                    # method=6 es la máxima compresión (más lento de guardar, pero menor peso)
                    img.save(output_path, 'webp', quality=quality, method=6)
                
                original_size = os.path.getsize(input_path) / 1024
                new_size = os.path.getsize(output_path) / 1024
                
                print(f"✓ Convertido: {filename}")
                print(f"   Tamaño original: {original_size:.1f} KB -> Nuevo: {new_size:.1f} KB")
                converted_count += 1
                
            except Exception as e:
                print(f"✗ Error al convertir {filename}: {e}")

    print(f"\nProceso finalizado. {converted_count} imágenes convertidas.")

if __name__ == "__main__":
    import sys
    
    # Si se pasan argumentos, usarlos. Si no, usar por defecto.
    if len(sys.argv) >= 3:
        input_dir = sys.argv[1]
        output_dir = sys.argv[2]
    else:
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        input_dir = os.path.join(BASE_DIR, 'raw_images')
        output_dir = os.path.join(BASE_DIR, 'public')

    if not os.path.exists(input_dir):
        os.makedirs(input_dir)
        print(f"Se ha creado la carpeta '{input_dir}'.")
    else:
        convert_to_webp(input_dir, output_dir, quality=90)
