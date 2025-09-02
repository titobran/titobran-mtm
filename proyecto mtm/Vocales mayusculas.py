
nombre = input("Ingresa tu nombre: ")
articulo = input("Ingresa el articulo a comprar: ")
valor_unitario = int(input("Ingresa el valor del articulo: "))
cantidad = int(input("Ingresa la cantidad de articulos: "))

valor = valor_unitario * cantidad



print("Te llamas: {}\ntu articulo es: {}\nsu valor unitario es: {}\nla cantidad de productos es: {}\ntu valor total es: {}".format(nombre, articulo, valor_unitario, cantidad, valor))


