---
title: Qué es y para qué sirve una función debounce
description: En esta entrega explicamos con ejemplos la función debounce. Qué es, para qué sirve y sus ventajas y desventajas
isPublished: true
publishedDate: 2023/05/18
modifiedDate: 2023/05/18
tags:
  - Patrones de diseño
  - Javascript
type: post
---

Hola de nuevo Dev!

En la entrega de hoy vamos a hablar sobre la función debounce, cómo funciona, sus ventajas, desventajas y dos ejemplos de uso en un formulario con React

Estoy seguro que en alguna ocasión te has encontrado con la necesidad de manejar eventos que ocurren con gran frecuencia, como la escritura en un campo de texto. En estos casos, la función debounce se convierte en una herramienta útil para optimizar el rendimiento y mejorar la experiencia del usuario.

## ¿Qué es una función debounce?

Una función debounce es una técnica que nos permite retrasar la ejecución de una función hasta que haya transcurrido un periodo de tiempo específico después de la última vez que se llamó a dicha función. Es especialmente útil cuando necesitamos manejar eventos que ocurren con alta frecuencia, como la entrada de texto en un campo de formulario, para evitar llamadas innecesarias y optimizar el rendimiento.

## Funcionamiento de la función debounce

Para que se entienda, la función debounce tiene un temporizador para retrasar la ejecución de una función. Cada vez que se llama a la función debounce, se reinicia el temporizador. Si la función se vuelve a llamar antes de que termine el temporizador, éste se reinicia nuevamente. De esta forma tendremos la certeza que la función real (callback) solo se ejecutará después de que haya pasado un período de inactividad durante el cual no se haya llamado a la función.

## Ventajas de utilizar una función debounce

- **Reducción de llamadas innecesarias.** Se evita que una función (callback se ejecute repetidamente durante eventos de alta frecuencia, lo cual reduce la carga en el navegador y mejora el rendimiento general de la aplicación.
- **Mejora de la experiencia del usuario.** Al retrasar la ejecución de una función hasta que haya una pausa en los eventos, se evita que la interfaz se bloquee o se vuelva lenta debido a llamadas excesivas.
- **Control del tiempo de espera.** La función debounce permite ajustar el tiempo de espera necesario antes de que se ejecute la función real, y esto permite adaptarla a las necesidades específicas de cada caso de uso.

## Desventajas de utilizar una función debounce

- **Retraso en la ejecución.** Debido a que la función debounce espera un período de inactividad antes de ejecutar la función real, puede haber un ligero retraso entre el evento y la ejecución de nuestro callback. En algunas situaciones, esto puede no ser deseable, especialmente en casos en los que se requiere una respuesta inmediata.
- **Configuración adecuada.** Determinar el tiempo de espera adecuado para una función debounce puede ser un desafío. Un tiempo de espera demasiado corto puede conducir a llamadas innecesarias, mientras que un tiempo de espera demasiado largo puede causar una respuesta lenta o retrasada.

## Ejemplo de uso en JavaScript Vanilla

Supón que tienes un formulario con un campo de entrada de texto que realiza una búsqueda en una base de datos a medida que el usuario escribe. Sin embargo, sabemos que evitar llamadas innecesarias a la base de datos, es siempre algo a tener en cuenta. Aquí hay un ejemplo de cómo implementar una función debounce en JavaScript Vanilla:

```jsx
const debounce = (func, delay) = {
  let timer

  return () => {
    clearTimeout(timer)
    timer = setTimeout(func, delay)
  }
}

const searchDatabase = () => {
  console.log('Realizando búsqueda en la base de datos...')
  // ...
}

const debounceSearch = debounce(searchDatabase, 300)

const inputField = document.getElementById('searchInput')
inputField.addEventListener('input', debounceSearch)
```

En este ejemplo, hemos definido la función **`debounce`** que acepta una función (**`func`**) y un retraso en milisegundos (**`delay`**). La función **`debounce`** devuelve una función interna que se encarga de reiniciar el temporizador cada vez que se llama a la función interna. Finalmente, hemos declarado la función **`searchDatabase`**, que simula la búsqueda en la base de datos.

Al utilizar **`debounce`**, hemos creado **`debounceSearch`**, una función debounce de búsqueda, que se ejecutará solo después de que haya transcurrido un período de inactividad de 300 ms después de la última llamada. Esta función debounce se utiliza como controlador de eventos para el evento **`input`** en el campo de búsqueda. De esta manera, evitamos realizar llamadas innecesarias a la base de datos durante la escritura rápida del usuario.

### Ejemplo de uso en ReactJS

En ReactJS, podemos aprovechar el hook **`useEffect`** para implementar una función debounce. Aquí tienes un ejemplo de cómo se puede utilizar una función debounce en un componente de React:

```jsx
import { useState, useEffect } from 'react'

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const searchDatabase = () => {
    // Lógica para buscar en la base de datos
    console.log('Realizando búsqueda en la base de datos...')
    // ...
  }

  const debounceSearch = debounce(searchDatabase, 300)

  useEffect(() => {
    debounceSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearchChange} />
    </div>
  )
}

export default SearchComponent
```

En este ejemplo de ReactJS, hemos creado un componente **`SearchComponent`** que incluye un campo de entrada de texto. Al escribir en este campo, se llama a la función **`handleSearchChange`**, que actualiza el estado **`searchTerm`** con el valor actual del campo de búsqueda.

Hemos utilizado el hook **`useEffect`** para observar los cambios en **`searchTerm`**. Dentro de este efecto, hemos llamado a la función **`debounceSearch`**, que implementa la función debounce. La función **`debounceSearch`** se ejecutará solo después de que haya transcurrido un período de inactividad de 300 ms después del último cambio en **`searchTerm`**. Esto asegura que la búsqueda en la base de datos se realice de manera eficiente sin llamadas innecesarias.

## Conclusión

En resumen, una función debounce es una solución eficiente para manejar eventos de alta frecuencia y evitar llamadas innecesarias en aplicaciones web. Permite controlar el tiempo de espera antes de ejecutar una función y mejora significativamente el rendimiento y la experiencia del usuario. Sin embargo, es importante tener en cuenta las posibles desventajas que te he comentado.

Espero que con este artículo te haya aclarado qué es una función debounce, cómo funciona y cuáles son sus ventajas y desventajas. Si estás interesado en aprender más sobre desarrollo web y JavaScript, te invito a que visites mis canales en diferentes plataformas.

¡No te pierdas los directos que hago en [Twitch](https://twitch.tv/apu314), donde aprendemos javascript en comunidad, se comparten noticias, se desarrollan proyectos y más cosas! Además, puedes seguirme en Instagram en **[https://instagram.com/apu314](https://instagram.com/apu314)** para estar al tanto de las últimas actualizaciones y contenido exclusivo. Y si quieres ver todos los directos que se suben a YouTube, puedes visitar el canal en **[https://youtube.com/apu314](https://youtube.com/apu314)**.

Gracias por leer este artículo y por tu interés en mejorar cada día un poco más. ¡Te espero en las redes para seguir aprendiendo juntos!

¡Hasta la próxima! Ah! Y cuidado con los bucles infinitos 😂
