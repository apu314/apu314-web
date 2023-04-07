---
title: Agregando y eliminando elementos de un array en Javascript
description: Descubre las distintas formas de agregar y eliminar elementos de un array en JavaScript
isPublished: true
publishedDate: 2023/04/10
modifiedDate: 2023/04/07
tags:
  - Javascript
  - Array
type: post
---

En programación, a menudo necesitamos agregar o eliminar elementos de un array en JavaScript. Dos de los métodos más comunes para hacer esto son `push` y `pop`, aunque también te mostraré cómo puedes usar los métodos `splice`, `shift` o `slice`. En este artículo, exploraremos cómo usar estos métodos y cuándo es apropiado usarlos.

## Agregar elementos a un array con 'push'

El método `push` permite agregar uno o más elementos al final de un array. Por ejemplo, podemos agregar un nuevo elemento a un array de números de la siguiente manera:

```jsx
const numeros = [1, 2, 3]
numeros.push(4)
console.log(numeros) // [1, 2, 3, 4]
```

También podemos agregar varios elementos a la vez:

```jsx
const numeros = [1, 2, 3]
numeros.push(4, 5, 6)
console.log(numeros) // [1, 2, 3, 4, 5, 6]
```

Es importante tener en cuenta que el método `push` modifica el array original y devuelve su nueva longitud.

## Eliminar elementos de un array con 'pop'

El método `pop` permite eliminar el último elemento de un array. Por ejemplo, podemos eliminar el último elemento de un array de números de la siguiente manera:

```jsx
const numeros = [1, 2, 3]
numeros.pop()
console.log(numeros) // [1, 2]
```

Es importante tener en cuenta que el método `pop` modifica el array original y devuelve el elemento eliminado.

## Cuándo usar 'push' y 'pop'

Los métodos 'push' y 'pop' son útiles para agregar y eliminar elementos de un array cuando estamos trabajando con una lista de elementos que se agregan o eliminan en orden. Sin embargo, si necesitamos agregar o eliminar elementos de un array en una posición específica, deberíamos usar los métodos `splice`, `shift` o `slice`.

Además, es importante tener en cuenta que el uso excesivo de `push` y `pop` puede hacer que nuestro código sea menos legible y más difícil de entender. Si estamos trabajando con arrays complejos o necesitamos hacer cambios más complicados, deberíamos considerar el uso de métodos más potentes y flexibles.

## Agregar y eliminar elementos de un array con 'splice'

El método splice nos permite agregar o eliminar elementos de un array en una determinada posición de la siguiente forma:

```jsx
const numeros = [1, 2, 3]
numeros.splice(1, 0, 4)
console.log(numeros) // [1, 4, 2, 3]
```

Vamos a ver más en detalle el método splice. En este ejemplo, vemos que el primer argumento (1) indica la posición del array en la que queremos realizar la modificación, con el segundo argumento (0) indicamos cuántos elementos vamos a eliminar (en este caso, al ser 0, estamos indicando que el número de elementos ) y del tercer argumento en adelante serán los elementos que se añadirán o eliminarán del array.

Veamos un ejemplo de `splice` **eliminando** elementos de una forma algo más compleja

```jsx
const array = [1, 2, 3, 4]
array.splice(1, 2, 'hola', 'manzanas', 'verdes')
console.log(array) // [1, 'hola', 'manzanas', 'verdes']
```

En este ejemplo hemos visto cómo podemos eliminar o, más bien sustituir, elementos de un array. Cabe destacar que los elementos que queremos añadir o eliminar de nuestro array pueden ser los que imaginemos, así sean números, strings, objetos, un array anidado, o lo que se nos ocurra.

## Eliminando elementos con ‘shift’

Este método de array nos va a permitir **eliminar el elemento en la primera posición** (0) del array original, retornando el elemento eliminado. Por tanto, lo que queda modificado es el array original. Veamos un ejemplo:

```jsx
const numeros = [1, 2, 3];
numeros.shift();
console.log(numeros); // [2, 3]
```

## Bonus: Extrayendo elementos de un array con ‘slice’

**Importante:** Ten en cuenta que de esta forma estamos trabajando con referencias, por lo que si modificamos el array u objeto original, su referencia cambiará.

```jsx
const numeros = [1, 2, 3, 4]
const nuevoArray = numeros.slice(1, 3)
console.log(numeros) // [1, 2, 3, 4]
console.log(nuevoArray) // [2, 3]
```

El primer argumento del método slice nos indica la posición en la que empezaremos la extracción, mientras que en el segundo argumento indica hasta qué posición se hará esta extracción, teniendo en cuenta que la posición de fin de extracción nunca será incluida.

## Conclusión

En conclusión, hay varias formas de agregar y eliminar elementos de un array en JavaScript. Los métodos `push` y `pop` son útiles para agregar y eliminar elementos al final de un array. Si necesitamos agregar o eliminar elementos en una posición específica, deberíamos usar los métodos `splice`, `shift` o `slice`.

Espero que este artículo haya sido de ayuda y que lo compartas en tus redes para que quien lo pueda necesitar se pueda nutrir de esta información.

Gracias por leerme, hasta la próxima 😊
