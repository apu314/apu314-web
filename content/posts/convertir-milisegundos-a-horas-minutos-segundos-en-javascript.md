---
title: Convertir milisegundos a horas, minutos y segundos en Javascript
description: Aprende a trabajar con fechas en javascript, dados unos milisegundos y convirtiéndolos al formato HH:MM:SS
isPublished: true
publishedDate: 2023/05/01
modifiedDate: 2023/05/02
type: post
tags:
  - Fechas
  - Javascript
---

Te doy la bienvenida a una nueva entrada del blog! 🎉

En el día de hoy te traigo una explicación con ejemplos sobre cómo convertir milisegundos a horas, minutos y segundos. Estoy seguro que alguna vez has necesitado hacer esta conversión y, déjame decirte que existen varias formas de hacerlo. Entre ellas, te voy a mostrar dos que me parecen muy instructivas.

## 1. Forma larga o convencional

Antes que nada debemos tener en cuenta lo siguiente:

- 1 segundo son 1000 milisegundos, por tanto debemos dividir los milisegundos entre 1000
- 1 minuto son 60 segundos. Dividiremos los segundos entre 60
- 1 hora son 60 minutos. Dividimos los minutos  entre 60
- Para los valores menores a 10 debemos añadir un cero delante, por tanto crearemos una función para hacer esto

```jsx
const padToTwoDigits = (num: number) => {
  return num.toString().padStart(2, '0')
}

const convertMsToHHMMSS = (ms: number) => {
  let seconds = Math.floor(ms / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)

  seconds = seconds % 60
  minutes = minutes % 60
  hours = hours % 24

  seconds = padToTwoDigits(seconds)
  minutes = padToTwoDigits(minutes)
  hours = padToTwoDigits(hours)

  return `${hours}:${minutes}:${seconds}`
}

console.log(convertMsToHHMMSS(153055000)) // 18:30:55
```

## 2. Forma corta y rápida

Y te preguntarás… ¿hay una forma más rápida y sencilla de hacer esto? La respuesta es sí, y es tremendamente sencilla, tanto que se puede hacer en una sola línea usando el método toISOString de la clase Date y cortando un pedazo de la cadena que nos devuelve.

```jsx
const ms = 153055000

console.log(new Date(ms).toISOString().slice(11, 19)) // 18:30:55
```

## Conclusión

Hoy te llevas dos formas de pasar de milisegundos a horas minutos y segundos. Una forma corta y la otra un poco más larga y elaborada.

Espero que hayas aprendido algo nuevo con el artículo de hoy y, como siempre digo, aquí aprendemos juntos, por lo que si ves alguna errata puedes dirigirte al repositorio de github y abrir una pull request con tu corrección. Decirte también que, para cualquier duda o sugerencia me puedes contactar por mis redes sociales o venirte a alguno de los directos que estoy haciendo semanalmente. Estaré encantado de ayudar y aportar siempre dentro de mis conocimientos.

Gracias por ser parte de esto y nos vemos leemos en la próxima entrega 😃
