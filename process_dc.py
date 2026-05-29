from PIL import Image, ImageOps
img = Image.open('/Users/luisalbertosandovalramos/Desktop/Fotos/dc.jpeg').convert('L')
# Invertir: letras oscuras se vuelven brillantes, fondo claro se vuelve oscuro
alpha = ImageOps.invert(img)
# Limpiar el fondo: Todo lo que no sea la letra (valor < 100) lo forzamos a 0.
# Y lo que es la letra lo escalamos para que sea bien opaco.
alpha = alpha.point(lambda p: 0 if p < 130 else min(255, int((p - 130) * 2.5)))
color_img = Image.new("RGBA", alpha.size, color=(255, 255, 255))
color_img.putalpha(alpha)
color_img.save('public/dc.webp', 'WEBP', quality=100)
print("done")
