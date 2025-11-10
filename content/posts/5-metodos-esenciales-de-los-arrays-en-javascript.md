---
title: Los 5 métodos esenciales de los arrays en JavaScript que debes conocer
description: Descubre los 5 métodos esenciales de los array en javascript
isPublished: true
publishedDate: 2023/03/21
modifiedDate: 2023/03/24
tags:
  - Javascript
  - Array
type: post
---

Como sabemos, los arrays son una de las estructuras de datos más utilizadas en JavaScript. Son una forma útil de almacenar y manipular datos. En este artículo, explicaremos los 5 métodos esenciales de los arrays que todo desarrollador de JavaScript debería conocer.

## foreach()

El método `forEach()` se utiliza para iterar sobre un array y ejecutar una función para cada elemento. La función que se pasa como argumento se ejecuta una vez por cada elemento del array. Por ejemplo:

```jsx
const array = [1, 2, 3]
array.forEach((element) => {
  console.log(element)
})
```

Este código imprimirá `1`, `2` y `3` en la consola.

## map()

El método `map()` se utiliza para crear un nuevo array con los resultados de llamar a una función para cada elemento del array original. Nos puede servir para mutar los el array original, devolviendo el nuevo array modificado. Por ejemplo:

```jsx
const array = [1, 2, 3]
const newArray = array.map((element) => {
  return element * 2
})
console.log(newArray)
```

Este código imprimirá `[2, 4, 6]` en la consola.

## pop()

El método `pop()` se utiliza para eliminar el último elemento de un array y devolver ese elemento. Por ejemplo:

```jsx
const array = [1, 2, 3]
const lastElement = array.pop()
console.log(lastElement)
```

Este código imprimirá `3` en la consola y `array` será `[1, 2]`.

## push()

El método `push()` se utiliza para agregar uno o más elementos al final de un array y devolver la nueva longitud del array. Por ejemplo:

```jsx
const array = [1, 2, 3]
const newLength = array.push(4)
console.log(newLength)
```

Este código imprimirá `4` en la consola y `array` será `[1, 2, 3, 4]`.

## indexOf()

El método `indexOf()` se utiliza para buscar el primer índice de un elemento en un array. Si el elemento no se encuentra en el array, devuelve `-1`. Por ejemplo:

```jsx
const array = [1, 2, 3]
const index = array.indexOf(2)
console.log(index)
const indexNotFound = array.indexOf(4)
console.log(indexNotFound)
```

Este código imprimirá `1` para el console log de index y `-1` para indexNotFound

Aquí tienes los 5 métodos que, bajo mi punto de vista, son los esenciales de los arrays en JavaScript y que debes conocer. Espero que hayas encontrado este artículo útil y que puedas aplicar estos métodos para mejorar tus habilidades de programación en JavaScript.
