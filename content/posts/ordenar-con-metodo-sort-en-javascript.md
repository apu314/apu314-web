---
title: Cómo ordenar elementos en un array con el método 'sort' en JavaScript
description: Aprender a usar el método sort para ordenar arrays en JavaScript
isPublished: true
publishedDate: 2023/04/03
modifiedDate: 2023/04/02
tags:
  - Javascript
  - Array
type: post
---

El método 'sort' es una función incorporada en JavaScript que se utiliza para ordenar los elementos dentro de un array. En este artículo, aprenderemos a utilizar el método 'sort' en nuestro desarrollos e identificar cuándo es el momento adecuado para utilizarlo.

## ¿Cómo funciona el método 'sort'?

El método 'sort' ordena los elementos de un array en orden alfabético. Si el array contiene números, los ordenará en orden ascendente por defecto. Sin embargo, si deseamos ordenarlos en orden descendente, necesitaremos especificarlo en nuestro código.

## Ejemplo básico

Comencemos con un ejemplo sencillo. Contamos con un array de nombres de frutas que queremos ordenar alfabéticamente. Para ello, utilizaremos el método 'sort' de la siguiente manera:

```jsx
const frutas = ['manzana', 'fresa', 'uva', 'banana']

frutas.sort()

console.log(frutas) // ['banana', 'fresa', 'manzana', 'uva']
```

Este código ordenará el array 'frutas' (mutándolo) en orden alfabético y mostrará el resultado en la consola.

## Ordenando números

Si deseamos ordenar un array de números, vamos a utilizar el método 'sort' de la siguiente manera:

```jsx
const numeros = [2, 5, 1, 10, 8]

numeros.sort((a, b) => a - b)

console.log(numeros)
```

Este código ordenará el array 'numeros' en orden ascendente. Si queremos ordenarlos en orden descendente, basándonos en el array de `numeros` anterior podemos cambiar la función a:

```jsx
numeros.sort((a, b) => b - a)
```

## Ordenando objetos

Si contamos con un array de objetos que queremos ordenar, utilizaremos el método 'sort' de la siguiente manera:

```jsx
const personas = [
  { nombre: 'Maria', edad: 30 },
  { nombre: 'Juan', edad: 20 },
  { nombre: 'Pedro', edad: 25 }
]

personas.sort((a, b) => a.edad - b.edad)

console.log(personas)
```

Este código ordenará el array 'personas' por la propiedad 'edad' de cada objeto.

## ¿Cuándo debería utilizarse el método 'sort'?

El método 'sort' es útil cuando necesitamos ordenar los elementos dentro de un array. Sin embargo, debemos tener en cuenta que éste modifica el array original. Si no queremos modificar el array original, haremos una copia del mismo antes de utilizar el método 'sort'.

## ¿Cuándo no debería utilizarse el método 'sort'?

Al tener un array con elementos que no se pueden comparar, como objetos complejos, no podremos utilizar el método 'sort' para ordenarlos. En este caso, usaremos una función personalizada para ordenar los elementos.

## Conclusiones

En resumen, el método 'sort' es una función útil para ordenar elementos dentro de un array. Puede ser utilizado para ordenar nombres, números y objetos. Recuerda que **el método 'sort' modifica el array original**, por lo que deberás tener cuidado al utilizarlo. Además, si tienes elementos que no se pueden comparar, deberás utilizar una función personalizada para ordenarlos.

¡Espero que este artículo te haya resultado útil! Nos leemos en el siguiente.

Si te ha gustado, no olvides compartirlo en tus redes con tus conocidos para hacer llegar este material a quien lo necesite.
