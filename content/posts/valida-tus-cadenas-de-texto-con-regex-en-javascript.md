---
title: Valida tus cadenas de texto con RegEx
description: En esta entrega vemos una introducción a las RegEx, conceptos básicos, unos enlaces interesantes para seguir aprendiendo y extensiones de vscode
isPublished: true
publishedDate: 2023/05/08
modifiedDate: 2023/05/09
type: post
tags:
  - Fechas
  - Javascript
---

Hola Dev!

En esta entrega te traigo un artículo en el que voy a explicar el poder de las expresiones regulares en Javascript, para qué se usan y algunos ejemplos para entenderlas mejor. Comenzamos…

## ¿Qué es una expresión regular?

Tal como se cita en la web de Mozilla Developer Network (MDN), “El objeto `RegExp` se utiliza para hacer coincidir texto con un patrón.”

Ciertamente, las expresiones regulares nos permiten buscar, manipular y validar patrones de texto de una forma eficiente, siendo éstas una secuencia de caracteres que definen un patrón de búsqueda.

A la hora de crear una expresión regular podemos hacerlo de dos formas:

- Notación literal
- Usando el objeto RegExp

```jsx
// Notación literal
const regexLiteral = /patrón/

// Objeto RegExp
const regexObj = new RegExp('patrón')
```

Mi intención con este artículo no es enseñarte a manejar al cien por cien cómo construir una expresión regular, en cambio te voy a dar una introducción que te servirá como guía para comenzar a crear tus expresiones regulares en Javascript.

Vamos a ver algunos ejemplos con sus explicaciones

Las expresiones regulares pueden contener caracteres literales que coinciden exactamente con el texto a buscar. En el siguiente ejemplo tiene que haber al menos una coincidencia de la palabra “Hola” para que la condición o validación se cumpla

```jsx
const regex = /Hola/

console.log(regex.test('Hola mundo')) // true
console.log(regex.test('Hasta luego')) // false
```

Veremos que nuestro regex lo podemos modificar con infinidad de combinaciones para realizar las validaciones que necesitemos.

A continuación te muestro algunos de los metacaracteres y cuantificadores que podrás empezar a usar para construir tu regex:

- **`.`**: Coincide con cualquier carácter excepto el salto de línea.
- **`[]`**: Define una clase de caracteres y coincide con cualquier carácter dentro de la clase.
- `*`: Coincide con cero o más repeticiones del elemento anterior.
- **`+`**: Coincide con una o más repeticiones del elemento anterior.
- **`?`**: Coincide con cero o una repetición del elemento anterior.
- **`{n}`**: Coincide con exactamente n repeticiones del elemento anterior.
- **`{n, m}`**: Coincide con al menos n y como máximo m repeticiones del elemento anterior.

Verás que puedes crear cosas como esta, en la que se permiten 1 o más caracteres “o”, después de la “g” y antes de la “d”; y entre corchetes se especifica que, tras la “d”, podemos añadir cualquiera de las vocales sin máximo ni mínimo en el número de vocales que podemos añadir tras la letra”d”

```jsx
const regex = /go+d[aeiou]/

console.log(regex.test('god')) // false
console.log(regex.test('good')) // true
console.log(regex.test('gooood')) // true
console.log(regex.test('goooda')) // true
console.log(regex.test('gooodaeeeeiuoaa')) // true
console.log(regex.test('gud')) // false
console.log(regex.test('goodu')) // false
```

Te voy a mostrar un ejemplo de uso del RegEx para validar los campos de un formulario de registro de usuario básico

```jsx
// Validar nombre de usuario
const regexUsername = /^[a-zA-Z0-9_-]{3,16}$/
// RegEx para validar que el email sea válido
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
// Validar una contraseña
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
```

Te animo a que pruebes estas RegEx en alguno de los sitios que te dejo a continuación, donde además de explicarlo de una forma muy fácil, tienes recursos para indagar más.

- [https://regexr.com/](https://regexr.com/)
- [https://regex101.com](https://regex101.com/)
- [https://extendsclass.com/regex-tester.html](https://extendsclass.com/regex-tester.html)

Puedes consultar también la página de [Mozilla Developer Network (MDN)](<[https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp)>), en la que se describe en mayor profundidad el objet RegEx

## Conclusión

En resumen, las expresiones regulares en Javascript son una poderosa herramienta para buscar, manipular y validar patrones de texto. Permiten una amplia flexibilidad al combinar caracteres literales, metacaracteres y cuantificadores. Si aprendes a usar los RegEx de Javascript, podrás crear patrones de validación muy potentes.

### Sorpresa 🎉

Como has llegado hasta aquí, te dejo dos extensiones VSCode para probar expresiones regulares, que seguro encontrarás de utilidad

- [https://marketplace.visualstudio.com/items?itemName=chrmarti.regex](https://marketplace.visualstudio.com/items?itemName=chrmarti.regex)
- [https://marketplace.visualstudio.com/items?itemName=LouisWT.regexp-preview](https://marketplace.visualstudio.com/items?itemName=LouisWT.regexp-preview)
