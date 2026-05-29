from PIL import Image
img = Image.open('public/sebasdani.webp')
# El original es blanco con alpha. 
# Solo reemplazamos el color blanco por vino (94, 10, 22) manteniendo el alpha
r, g, b, a = img.split()
r = r.point(lambda _: 94)
g = g.point(lambda _: 10)
b = b.point(lambda _: 22)
new_img = Image.merge("RGBA", (r, g, b, a))
new_img.save('public/sebasdani_wine.webp', 'WEBP', quality=100)
print("Done")
