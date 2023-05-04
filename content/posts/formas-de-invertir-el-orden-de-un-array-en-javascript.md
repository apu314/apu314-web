---
title: Distintas formas de invertir el orden de los elementos de un array en JavaScript
description: Vemos cómo invertir el orden en los arrays en javascript con ejemplos sencillos
isPublished: true
publishedDate: 2023/04/24
modifiedDate: 2023/05/04
type: post
tags:
  - Array
  - Javascript
---

Hola de nuevo!

Alguna vez has necesitado _‘darle la vuelta’_ (o invertir los elementos) de un array en javascript? Te traigo algunas formas de hacerlo y unos ejemplos sencillos para entenderlo mejor.

## reverse()

El método `reverse()` propio de los arrays muta el original, además de devolver la referencia al array original.

```jsx
const originalArray = [1, 2, 3, 4, 5]
const reversed = originalArray.reverse()
console.log('originalArray', originalArray) // [ 5, 4, 3, 2, 1 ]
console.log('reversed', reversed) // [ 5, 4, 3, 2, 1 ]

originalArray.push(6)
console.log('originalArray.push(6)-->', originalArray) // [ 5, 4, 3, 2, 1, 6 ]
console.log('reversed -->', reversed) // [ 5, 4, 3, 2, 1, 6 ]
```

En cambio, si hacemos un spread del array original, estamos creando un nuevo array. De esta forma no mutamos el array original.

```javascript
const originalArray1 = [1, 2, 3, 4, 5]
const reversedArray = [...originalArray1].reverse()

console.log('originalArray', originalArray) // [ 1, 2, 3, 4, 5 ]
console.log('reversed', reversed) // [ 5, 4, 3, 2, 1 ]

originalArray.push(6)
console.log('originalArray.push(6)-->', originalArray) // [ 1, 2, 3, 4, 5, 6 ]
console.log('reversed -->', reversed) // [ 5, 4, 3, 2, 1 ]
```

## toReversed()

Este método hace lo mismo que en el spread operator, devuelve un nuevo array invertido, sin mutar el original.

```javascript
const reversed = originalArray.toReversed()
console.log('originalArray', originalArray) // [ 1, 2, 3, 4, 5 ]
console.log('reversed', reversed) // [ 5, 4, 3, 2, 1 ]

originalArray.push(6)
console.log('originalArray.push(6)-->', originalArray) // [ 1, 2, 3, 4, 5, 6 ]
console.log('reversed -->', reversed) // [ 5, 4, 3, 2, 1 ]
```

## for()

Con el ciclo `for` lo que hacemos es recorrer el array original comenzando por el final y yendo hasta el principio del mismo. Agregando a un nuevo array el valor de la posición en cada iteración

```jsx
const originalArray = [1, 2, 3, 4, 5]
const reversedArray = []

for (let i = originalArray.length - 1; i >= 0; i--) {
  reversedArray.push(originalArray[i])
}
console.log(reversedArray) // [5, 4, 3, 2, 1]
```

## reduce()

Con el método reduce también podemos invertir el orden de un array. Para entenderlo mejor, vamos a ver cómo se usa este método:

El método `reduce()` recibe un callback que nos proporciona con los siguientes parámetros:

- **Acumulador**, que va conteniendo lo retornado en cada iteración
- **Valor actual** en cada iteración
- (opcional) **Índice**
- (opcional) **Array** con el que estamos trabajando

A su vez, el método reduce recibe un segundo argumento, que es opcional, en el cual indicamos el valor inicial del acumulador. En nuestro caso, queremos retornar un nuevo array, así que le indicamos un array vacío.

En cada iteración estamos añadiendo el siguiente valor de la iteración y esparciendo los distintos valores del array acumulador. Sencillo pero algo engorroso de entender al principio.

```jsx
const originalArray = [1, 2, 3, 4, 5]

const reversedArray = originalArray.reduce((accumulator, currentValue) => {
  return [currentValue, ...accumulator]
}, [])
```

## Conclusión

Existen varias formas de invertir el orden de los arrays en Javascript, desde el método `reverse()`, `toReversed()` hasta el uso del bucle `for`, el _spread_ operator y el método `reduce()`, el cual es muy interesante de aprender. Es importante tener en cuenta que el uso de cada una de estas formas puede tener un impacto distinto en el rendimiento de la aplicación, por lo que es necesario evaluar la mejor opción según las necesidades del proyecto. En mi opinión soy fan del spread operator, pero habría que ver el impacto que puede causar con arrays complejos. Aún así usar el método `reverse()` veo que es el más óptimo porque es una función propia del lenguaje y está optimizada para ello
