---
title: Javascript Array methods
description: Explicación de los distintos métodos de los arrays en javascript
isPublished: true
publishedDate: 2023/03/02
tags:
  - Javascript
---

Los arrays son una estructura de datos fundamental en JavaScript, y hay una gran cantidad de métodos que se pueden utilizar para manipularlos. En este artículo, vamos a ver los métodos de los arrays en JavaScript.

## Introducción a los arrays en JavaScript

Un array es una estructura de datos que permite almacenar una colección de elementos en una sola variable. En JavaScript, los arrays pueden contener elementos de cualquier tipo de datos, incluyendo otros arrays. Para crear un array en JavaScript, se puede utilizar la sintaxis de corchetes:

```javascript
const myArray = [1, 2, 3, 4, 5]
```

JavaScript proporciona una gran cantidad de métodos integrados para trabajar con los arrays. Algunos de los métodos más comunes son los siguientes:

## push() y pop()

Los métodos push() y pop() se utilizan para agregar y eliminar elementos desde el final de un array, respectivamente:

```javascript
const myArray = [1, 2, 3]
myArray.push(4) // myArray es ahora [1, 2, 3, 4]
myArray.pop() // myArray es ahora [1, 2, 3]
```

## shift() y unshift()

Los métodos shift() y unshift() se utilizan para agregar y eliminar elementos desde el principio de un array, respectivamente:

```javascript
const myArray = [1, 2, 3]
myArray.unshift(0) // myArray es ahora [0, 1, 2, 3]
myArray.shift() // myArray es ahora [1, 2, 3]
```

## splice()

El método splice() se utiliza para agregar, eliminar o reemplazar elementos de un array en una posición específica:

```javascript
const myArray = [1, 2, 3]
myArray.splice(1, 1, 'hello') // myArray es ahora [1, 'hello', 3]
```

Este método toma tres argumentos: la posición de inicio, el número de elementos a eliminar y los elementos a agregar.

## slice()

El método slice() se utiliza para crear una copia de un subconjunto de elementos de un array, sin modificar el array original:

```javascript
const myArray = [1, 2, 3, 4, 5]
const newArray = myArray.slice(1, 3) // newArray es [2, 3]
```

Este método toma dos argumentos: la posición de inicio y la posición final.

## map()

El método map() se utiliza para crear un nuevo array que contiene los resultados de aplicar una función a cada elemento del array original:

```javascript
const myArray = [1, 2, 3]
const newArray = myArray.map((element) => element * 2) // newArray es [2, 4, 6]
```

Este método toma una función como argumento, que se ejecuta para cada elemento del array.

## filter()

El método filter() se utiliza para crear un nuevo array que contiene todos los elementos del array original que pasan una prueba especificada por una función:

```javascript
const myArray = [1, 2, 3, 4, 5]
const newArray = myArray.filter((element) => element > 3) // newArray es [4, 5]
```

Este método toma una función como argumento,

Este método toma una función como argumento, que se ejecuta para cada elemento del array y devuelve un valor booleano. Los elementos que pasan la prueba se agregan al nuevo array.

## reduce()

El método reduce() se utiliza para reducir un array a un único valor mediante la ejecución de una función acumuladora para cada elemento del array:

```javascript
const myArray = [1, 2, 3]
const result = myArray.reduce(
  (accumulator, currentValue) => accumulator + currentValue
) // result es 6
```

Este método toma una función acumuladora como argumento, que se ejecuta para cada elemento del array y acumula un valor final.

## forEach()

El método forEach() se utiliza para ejecutar una función para cada elemento del array, sin crear un nuevo array:

```javascript
const myArray = [1, 2, 3]
myArray.forEach((element) => console.log(element)) // imprime 1, 2, 3
```

Este método toma una función como argumento, que se ejecuta para cada elemento del array.

### Conclusión

En resumen, los arrays son una estructura de datos esencial en JavaScript, y los métodos que se pueden utilizar para manipularlos son una parte importante del lenguaje. En este artículo, hemos explorado algunos de los métodos más comunes de los arrays en JavaScript, incluyendo push(), pop(), shift(), unshift(), splice(), slice(), map(), filter(), reduce() y forEach(). Esperamos que esta introducción te haya resultado útil y te haya dado una buena comprensión de cómo trabajar con arrays en JavaScript.
