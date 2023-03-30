---
title: Cómo utilizar el método 'filter' en JavaScript
description: Vemos varios ejemplos con distintos niveles de dificultad a la hora de filtrar
  elementos en un array con el método filter()
isPublished: true
publishedDate: 2023/03/27
modifiedDate: 2023/03/30
type: post
tags:
  - Array
  - Javascript
---

En programación, es común tener que trabajar con listas de elementos, y a menudo, necesitamos filtrar los elementos de una lista según ciertas condiciones. En JavaScript, el método filter() nos permite hacer precisamente eso: filtrar elementos de un array según un criterio determinado. En este artículo, exploraremos cómo utilizar el método filter() en JavaScript para filtrar elementos de un array, con ejemplos de distintas dificultades.

## ¿Qué es el método filter()?

El método filter() es un método de los arrays en JavaScript que crea un nuevo array con todos los elementos que cumplan una condición dada por una función. La función de filtrado es pasada como un argumento al método filter(). La función debe devolver un valor booleano que indica si el elemento debe ser incluido en el nuevo array.

## Ejemplos de uso del método filter()

### Ejemplo sencillo

Supongamos que tenemos un array de números y queremos crear un nuevo array con los números pares. Podemos usar el método filter() para lograr esto de la siguiente manera:

```javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const numerosPares = numeros.filter((numero) => numero % 2 === 0)
console.log(numerosPares) // [2, 4, 6, 8, 10]
```

La función de filtrado que pasamos a filter() toma cada elemento del array original y devuelve true si el elemento es par (es decir, si el resto de la división por 2 es 0).

### Ejemplo intermedio

Supongamos que tenemos un array de objetos que representan personas con sus respectivos nombres y edades, y queremos crear un nuevo array con los objetos que tienen una edad mayor o igual a 18. Podemos usar el método filter() de la siguiente manera:

```javascript
const personas = [
  { nombre: 'Juan', edad: 25 },
  { nombre: 'María', edad: 17 },
  { nombre: 'Pedro', edad: 19 },
  { nombre: 'Lucía', edad: 16 },
  { nombre: 'Eva', edad: 32 }
]
const personasMayoresDeEdad = personas.filter((persona) => persona.edad >= 18)
console.log(personasMayoresDeEdad) // [{ nombre: 'Juan', edad: 25 }, { nombre: 'Pedro', edad: 19 }, { nombre: 'Eva', edad: 32 }]
```

En este caso, la función de filtrado comprueba si la edad de cada persona es mayor o igual a 18, y devuelve true si es así.

### Ejemplo avanzado

Supongamos que tenemos un array de objetos que representan productos con sus respectivos nombres, precios y stock, y queremos crear un nuevo array con los productos que están en stock y cuyo precio es menor o igual a 100. Podemos usar el método filter() de la siguiente manera:

```javascript
const productos = [
  { nombre: 'Camisa', precio: 35, stock: 10 },
  { nombre: 'Pantalón', precio: 80, stock: 0 },
  { nombre: 'Zapatillas', precio: 120, stock: 5 },
  { nombre: 'Bolso', precio: 50, stock: 3 },
  { nombre: 'Gorra', precio: 15, stock: 8 }
]
const productosEnStockMenoresA100 = productos.filter(
  (producto) => producto.stock > 0 && producto.precio <= 100
)
console.log(productosEnStockMenoresA100) // [{ nombre: 'Camisa', precio: 35, stock: 10 }, { nombre: 'Bolso', precio: 50, stock: 3 }, { nombre: 'Gorra', precio: 15, stock: 8 }]
```

En este ejemplo, la función de filtrado comprueba si el producto tiene stock y si su precio es menor o igual a 100. Solo los productos que cumplen ambas condiciones son incluidos en el nuevo array.

## Conclusión

El método filter() es una herramienta muy útil en JavaScript para filtrar elementos de un array según ciertas condiciones. En este artículo, hemos visto distintos ejemplos de cómo utilizar el método filter(), desde un ejemplo sencillo hasta uno más avanzado. Espero que estos ejemplos hayan sido útiles para entender mejor cómo utilizar este método en tus proyectos de JavaScript.
