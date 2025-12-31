---
title: "Cómo Resolver el Problema N+1 en Prisma: Optimiza de 11 Queries a 1 con relationJoins"
description: Guía práctica para eliminar el problema N+1 en Prisma ORM. Aprende a usar relationLoadStrategy y relationJoins para reducir queries, mejorar performance y acelerar tu aplicación Next.js hasta un 86%.
isPublished: true
publishedDate: 2025/12/31
modifiedDate: 2025/12/31
type: post
slug: optimizar-prisma-n-plus-1-relationjoins
tags:
  - Prisma
  - PostgreSQL
  - Performance
  - Next.js
  - SQL
---

Recientemente me encontré con un problema de rendimiento que seguramente te resulta familiar: una página que debería cargar casi instantáneamente tardaba más de 5 segundos. El culpable: **Prisma estaba ejecutando 11 queries separadas** cuando debería hacer solo 1.

Si alguna vez has visto tu aplicación ralentizarse misteriosamente, es probable que sufras del **problema N+1**. En este artículo te muestro cómo lo identifiqué, resolví y **reduje el tiempo de carga en un 86%** usando la feature `relationJoins` de Prisma.

## Contenido

1. [¿Qué es el problema N+1 Queries?](#qué-es-el-problema-n1-queries-y-por-qué-arruina-el-performance)
2. [Cómo identificar el problema N+1 en Prisma](#cómo-identificar-el-problema-n1-en-prisma)
3. [Solución: Prisma relationJoins](#solución-definitiva-relationjoins-en-prisma-5)
4. [Optimizaciones adicionales](#optimizaciones-complementarias-para-máximo-rendimiento)
5. [Resultados y métricas](#resultados-y-métricas)
6. [Puntos clave a recordar](#puntos-clave-a-recordar)
7. [Preguntas frecuentes](#preguntas-frecuentes)

## ¿Qué es el problema N+1 Queries? (y por qué arruina el performance)

El **problema N+1** es uno de los problemas de rendimiento más comunes en aplicaciones con bases de datos relacionales. Ocurre cuando:

1. Haces 1 query para obtener una lista de registros (N registros)
2. Luego haces N queries adicionales para obtener datos relacionados de cada registro

**Resultado**: 1 + N queries = Muchísimas roundtrips a la base de datos

### Ejemplo del problema

Imagina que tienes un modelo `Post` con relaciones a `User` (autor), `Category`, y `Comment`:

```typescript
// ❌ Esto genera múltiples queries
const post = await prisma.post.findUnique({
  where: { id: postId },
  include: {
    author: true,
    category: true,
    comments: {
      include: {
        user: true
      }
    }
  }
})
```

Por defecto, Prisma ejecuta:

- 1 query para el post
- 1 query para el autor
- 1 query para la categoría
- 1 query para los comentarios
- N queries más para los usuarios de cada comentario

**Total: 4+ queries** cuando podríamos hacer solo 1 con JOINs.

### ¿Por qué es un problema?

Cada query a la base de datos implica:

- ⏳ Latencia de red (roundtrip)
- ⏳ Tiempo de procesamiento en el servidor de BD
- ⏳ Serialización/deserialización de datos
- ⏳ Conexión pool overhead

Con 11 queries, estos tiempos se multiplican y **destruyen el rendimiento** de tu aplicación.

## Cómo identificar el problema N+1 en Prisma

### 1. Habilita los logs de Prisma

En tu archivo de configuración del cliente Prisma, habilita el logging:

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query'] // ⏳ Solo en desarrollo
})

export default prisma
```

### 2. Observa la terminal durante desarrollo

Cuando recargas tu página, verás algo como:

```bash
prisma:query SELECT "posts"...
prisma:query SELECT "users"...
prisma:query SELECT "categories"...
prisma:query SELECT "comments"...
prisma:query SELECT "users"...
prisma:query SELECT "users"...
# ... más queries
```

Si ves múltiples queries para una sola operación, **tienes un problema N+1**.

### 3. Mide el impacto en producción

Usa las herramientas de desarrollo del navegador:

- **Network tab**: Tiempo total de la request
- **Performance**: LCP (Largest Contentful Paint)
- **Lighthouse**: Puntuación de performance
- **Database monitoring**: Tiempo total en queries

En mi caso:

- ❌ **Antes**: 11 queries, ~5.67s de carga
- ⏳ **Objetivo**: 3 queries, <1s de carga

### Señales de alerta

Tienes un problema N+1 si:

- 🚨 Páginas con datos relacionados cargan lentamente
- 🚨 El tiempo de carga aumenta proporcionalmente con la cantidad de registros
- 🚨 Ves múltiples queries en los logs para una sola operación
- 🚨 Tu base de datos tiene alta carga con pocas peticiones

## Solución definitiva: relationJoins en Prisma 5+

Prisma 5+ introdujo la feature `relationJoins` que permite forzar el uso de **SQL JOINs** en lugar de queries separadas.

### Paso 1: Habilitar la preview feature

Edita tu `schema.prisma`:

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["relationJoins"]
}
```

### Paso 2: Regenerar el cliente Prisma

```bash
npx prisma generate
```

Esto actualiza los tipos de TypeScript para reconocer la nueva opción `relationLoadStrategy`.

### Paso 3: Usar relationLoadStrategy en tus queries

Ahora puedes forzar la estrategia JOIN en tus queries:

```typescript
// ✅ Una sola query con JOINs
const post = await prisma.post.findUnique({
  where: { id: postId },
  relationLoadStrategy: 'join', // 🎯 La clave está aquí
  include: {
    author: true,
    category: true,
    comments: {
      include: {
        user: true
      }
    }
  }
})
```

### Cómo funciona por detrás

Prisma ahora genera una **sola query SQL con LEFT JOIN LATERAL**:

```sql
SELECT
  "posts".*,
  "author_data"."__prisma_data__" AS "author",
  "category_data"."__prisma_data__" AS "category",
  "comments_data"."__prisma_data__" AS "comments"
FROM "posts"
LEFT JOIN LATERAL (
  SELECT jsonb_build_object(
    'id', "users"."id",
    'name', "users"."name",
    'email', "users"."email"
  ) AS "__prisma_data__"
  FROM "users"
  WHERE "posts"."author_id" = "users"."id"
  LIMIT 1
) AS "author_data" ON true
LEFT JOIN LATERAL (
  SELECT jsonb_build_object(
    'id', "categories"."id",
    'name', "categories"."name"
  ) AS "__prisma_data__"
  FROM "categories"
  WHERE "posts"."category_id" = "categories"."id"
  LIMIT 1
) AS "category_data" ON true
LEFT JOIN LATERAL (
  SELECT jsonb_agg("__comment_data__") AS "__prisma_data__"
  FROM (
    SELECT jsonb_build_object(
      'id', "comments"."id",
      'content', "comments"."content",
      'user', "comment_user"."__prisma_data__"
    )
    FROM "comments"
    LEFT JOIN LATERAL (
      SELECT jsonb_build_object(
        'id', "users"."id",
        'name', "users"."name"
      ) AS "__prisma_data__"
      FROM "users"
      WHERE "comments"."user_id" = "users"."id"
    ) AS "comment_user" ON true
    WHERE "posts"."id" = "comments"."post_id"
  )
) AS "comments_data" ON true
WHERE "posts"."id" = $1
LIMIT 1
```

**Beneficios:**

- ✅ 1 sola roundtrip a la base de datos
- ✅ Carga de datos más rápida
- ✅ Menor latencia total
- ✅ Mejor uso de índices
- ✅ Menos overhead de conexión

### Crear funciones de servicio optimizadas

Te recomiendo centralizar queries optimizadas en funciones de servicio:

```typescript
// lib/services/post.service.ts

/**
 * Obtiene un post con TODAS las relaciones en 1 sola query
 *
 * PERFORMANCE: Usa JOIN strategy para evitar N+1
 * Incluye: autor, categoría, comentarios con usuarios
 */
export async function getPostWithAllRelations(postId: string) {
  return await prisma.post.findUnique({
    where: { id: postId },
    relationLoadStrategy: 'join',
    include: {
      author: true,
      category: true,
      comments: {
        include: {
          user: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })
}

// Tipo de retorno tipado
export type PostWithAllRelations = Prisma.PromiseReturnType<
  typeof getPostWithAllRelations
>
```

Esto hace que el código sea:

- ✅ Más mantenible
- ✅ Reutilizable en toda la aplicación
- ✅ Optimizado por defecto
- ✅ Con documentación clara del propósito
- ✅ Type-safe con TypeScript

## Optimizaciones complementarias para máximo rendimiento

Además del `relationLoadStrategy`, implementé otras optimizaciones que multiplicaron los resultados:

### 1. Pre-cargar datos en el servidor (Next.js Server Components)

En lugar de hacer fetch desde el cliente, pre-carga los datos en el Server Component:

```typescript
// ❌ Antes: Cliente hace fetch después del render
'use client'
export function MyComponent() {
  const [options, setOptions] = useState([])

  useEffect(() => {
    // Fetch adicional después de cargar la página
    // Waterfall: espera a que el componente monte
    fetch('/api/options').then(res => setOptions(res.data))
  }, [])

  return <Select options={options} />
}
```

```typescript
// ✅ Después: Server Component pre-carga en paralelo
export default async function MyPage() {
  // Carga en paralelo (no secuencial)
  const [post, options, currentUser] = await Promise.all([
    getPostWithAllRelations(postId),
    getSelectOptions(),
    getCurrentUser()
  ])

  return (
    <MyClientComponent
      post={post}
      initialOptions={options}
      user={currentUser}
    />
  )
}
```

**Beneficios:**

- ✅ Elimina waterfalls de carga
- ✅ SSR con datos completos
- ✅ Mejor SEO (contenido en HTML inicial)
- ✅ Faster Time to Interactive

### 2. Optimizar componentes React con useMemo

Para componentes con listas grandes (como MultiSelect), usa `useMemo` y estructuras de datos eficientes:

```typescript
// ❌ Array.find es O(n) - se ejecuta en cada render
function MySelect({ options, selectedIds }) {
  const selected = options.filter(opt =>
    selectedIds.includes(opt.id) // O(n²) en total
  )

  return <Select options={options} value={selected} />
}
```

```typescript
// ✅ Map lookup es O(1) - memoizado
function MySelect({ options, selectedIds }) {
  // Memoiza el Map para evitar recrearlo en cada render
  const optionsMap = useMemo(() => {
    const map = new Map()
    options.forEach(opt => map.set(opt.id, opt))
    return map
  }, [options])

  // Lookup O(1) por ID
  const selected = useMemo(() =>
    selectedIds
      .map(id => optionsMap.get(id))
      .filter(Boolean),
    [selectedIds, optionsMap]
  )

  return <Select options={options} value={selected} />
}
```

**Mejora:** O(n²) → O(n) en complejidad

### 3. Filtrado personalizado con shouldFilter={false}

En componentes de búsqueda, toma control del filtrado:

```typescript
// ✅ Control total sobre el filtrado
import { Command } from 'cmdk'

function SearchableSelect({ options, searchValue }) {
  // Filtrado custom memoizado
  const filteredOptions = useMemo(() => {
    const normalized = searchValue.trim().toLowerCase()
    if (!normalized) return options

    return options.filter(opt =>
      opt.label.toLowerCase().includes(normalized)
    )
  }, [options, searchValue])

  return (
    <Command shouldFilter={false}>
      {filteredOptions.map(opt => (
        <CommandItem key={opt.id} value={opt.id}>
          {opt.label}
        </CommandItem>
      ))}
    </Command>
  )
}
```

### 4. Prevenir re-renders innecesarios

```typescript
// ✅ Memoiza callbacks para evitar re-renders de hijos
const handleSelect = useCallback((value: string) => {
  setSelected(prev => [...prev, value])
}, [])

const handleRemove = useCallback((value: string) => {
  setSelected(prev => prev.filter(v => v !== value))
}, [])

return (
  <MyExpensiveComponent
    onSelect={handleSelect}
    onRemove={handleRemove}
  />
)
```

## Resultados y métricas

Después de aplicar todas las optimizaciones, los resultados fueron impresionantes:

| Métrica                            | Antes | Después | Mejora   |
| ---------------------------------- | ----- | ------- | -------- |
| **Queries totales**                | 11    | 3       | -73%     |
| **Tiempo de carga**                | 5.67s | 0.77s   | **-86%** |
| **LCP (Largest Contentful Paint)** | 1.89s | 0.82s   | -57%     |
| **CLS (Cumulative Layout Shift)**  | 0.54  | 0.00    | -100%    |
| **Tiempo de render**               | 1.2s  | 0.42s   | -65%     |

### Desglose de queries finales

**Queries actuales (3 totales):**

1. **Query para opciones del select** - Pre-carga desde servidor
2. **1 sola query con JOINs** para el recurso principal y todas sus relaciones ✨
3. **Query para el usuario actual** - Autenticación

**Queries eliminadas (8):**

- ❌ Query separada para autor
- ❌ Query separada para categoría
- ❌ Query separada para comentarios
- ❌ N queries para usuarios de comentarios
- ❌ Query separada para tags
- ❌ Queries duplicadas por waterfalls

### Impacto en experiencia de usuario

- ✅ **Carga casi instantánea** (< 1 segundo)
- ✅ **Sin layout shifts** (CLS = 0)
- ✅ **Mejor puntuación Lighthouse** (95+ en Performance)
- ✅ **Menor uso de CPU** en el servidor
- ✅ **Menor carga en la base de datos**

## Puntos clave a recordar

✅ **Identifica el problema N+1** habilitando logs de Prisma (`log: ['query']`) en desarrollo

✅ **Usa `relationLoadStrategy: 'join'`** para forzar SQL JOINs en queries con múltiples includes

✅ **Habilita la preview feature** `relationJoins` en tu `schema.prisma` y regenera el cliente con `npx prisma generate`

✅ **Pre-carga datos en el servidor** usando Next.js Server Components en lugar de fetch desde el cliente

✅ **Carga en paralelo** con `Promise.all()` para queries independientes

✅ **Optimiza componentes React** con `useMemo`, `useCallback` y estructuras de datos eficientes (Map en vez de Array para lookups)

✅ **Crea funciones de servicio** optimizadas y reutilizables para queries complejas con documentación clara

✅ **Mide los resultados** antes y después para validar la mejora con métricas reales

## ¿Cuándo usar relationJoins?

| Escenario                               | Usar JOIN             | Usar Query (default)         |
| --------------------------------------- | --------------------- | ---------------------------- |
| Pocas relaciones (1-3)                  | ✅ Recomendado         | ✅ También funciona           |
| Muchas relaciones (4+)                  | ✅ **Necesario**       | ❌ Muy lento                  |
| Relaciones con nested includes          | ✅ **Obligatorio**     | ❌ N+1 problem                |
| Queries en páginas de detalle           | ✅ Siempre             | ❌                            |
| Listas con paginación                   | ⏳ Depende del caso    | ✅ Si no necesitas relaciones |
| Datos que siempre se usan juntos        | ✅ Mejor opción        | ❌                            |
| Relaciones opcionales (pueden ser null) | ✅ LEFT JOIN funciona  | ✅ También funciona           |
| Muchos registros (1000+) en relación    | ⏳ Evaluar caso a caso | ⏳ Evaluar caso a caso        |

**Nota importante:** PostgreSQL optimiza muy bien los LATERAL JOINs. En MySQL, los resultados pueden variar. Siempre mide el performance con datos reales.

### Casos especiales

**¿Y si tengo relaciones MUY grandes?**

```typescript
// Para relaciones con muchos registros, considera paginación
const post = await prisma.post.findUnique({
  where: { id: postId },
  relationLoadStrategy: 'join',
  include: {
    author: true,
    category: true,
    // Limita comentarios y carga paginados por separado
    _count: {
      select: { comments: true }
    }
  }
})

// Carga comentarios por separado con paginación
const comments = await prisma.comment.findMany({
  where: { postId: post.id },
  include: { user: true },
  take: 10,
  skip: page * 10,
  orderBy: { createdAt: 'desc' }
})
```

## Preguntas Frecuentes

### ¿Qué es el problema N+1 en bases de datos?

El problema N+1 ocurre cuando una aplicación ejecuta 1 query inicial para obtener N registros, y luego N queries adicionales para obtener datos relacionados de cada registro, resultando en 1+N queries totales en lugar de una sola query optimizada con JOINs. Esto multiplica la latencia y destruye el rendimiento.

### ¿relationJoins funciona en todas las bases de datos?

`relationJoins` está disponible en **PostgreSQL, CockroachDB y MySQL**. PostgreSQL ofrece el mejor rendimiento gracias a sus LATERAL JOINs optimizados. SQL Server todavía no está soportado (actualmente en desarrollo).

### ¿Cuándo NO debería usar relationLoadStrategy: 'join'?

Evita usar JOIN strategy en:

- Queries con paginación de listas grandes donde **no necesitas las relaciones**
- Relaciones con miles de registros que no necesitas cargar todos
- Casos donde las relaciones son raramente usadas

En estos casos, puede aumentar el tamaño de la respuesta innecesariamente.

### ¿Es relationJoins una feature estable en Prisma 7?

En la versión actual de Prisma 7 sigue siendo una **preview feature**, pero es muy estable y ampliamente usada en producción. Se espera que sea GA (Generally Available) pronto. Puedes usarla en producción sin problemas - solo asegúrate de testear bien.

### ¿Necesito cambiar mi schema de base de datos?

No, `relationJoins` es solo una optimización de cómo Prisma genera las queries SQL. No requiere cambios en tu schema de Prisma ni en tu base de datos. Solo agregas la preview feature y usas `relationLoadStrategy: 'join'` en tus queries.

### ¿Hay algún downside de usar JOINs?

En la mayoría de casos, no. Los JOINs son más eficientes que queries separadas. Sin embargo:

- ⚠️ Queries muy complejas con muchos JOINs pueden ser difíciles de debuggear
- ⚠️ En relaciones con muchos registros (1-to-many muy grande), el resultado puede ser grande
- ⚠️ En bases de datos sin buenos índices, los JOINs pueden ser lentos

**Solución:** Siempre mide el performance con datos reales antes y después.

### ¿Puedo mezclar ambas estrategias?

Sí, puedes usar `relationLoadStrategy: 'join'` en algunas queries y dejar el default en otras:

```typescript
// Query optimizada para página de detalle
const detailedPost = await prisma.post.findUnique({
  where: { id },
  relationLoadStrategy: 'join', // JOIN para todo
  include: { author: true, comments: true }
})

// Query simple para listado
const posts = await prisma.post.findMany({
  // Default strategy (queries separadas está bien aquí)
  include: { author: true }
})
```

## Conclusión

El problema N+1 es uno de los problemas de performance más comunes en aplicaciones modernas, pero también uno de los más fáciles de resolver una vez que lo identificas. Con `relationJoins` de Prisma, puedes **reducir drásticamente el número de queries** y mejorar significativamente el rendimiento de tu aplicación.

En mi caso, pasé de **11 queries a 3** y reduje el tiempo de carga en un **86%**. Los usuarios ahora disfrutan de una experiencia mucho más rápida y fluida.

### Próximos pasos

1. ✅ Habilita logs de Prisma y identifica tus N+1 queries
2. ✅ Agrega `relationJoins` a tu schema.prisma
3. ✅ Usa `relationLoadStrategy: 'join'` en tus queries críticas
4. ✅ Pre-carga datos desde el servidor (Server Components)
5. ✅ Mide y celebra los resultados 🎉

### Aplica estas optimizaciones

Ahora que conoces cómo resolver el problema N+1 con `relationJoins`, es momento de aplicarlo en tus proyectos. Empieza identificando las queries más lentas y optimízalas una por una. Los resultados te sorprenderán.

---

## Recursos adicionales

### Documentación oficial

- [Prisma Relation Queries](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries) - Documentación oficial sobre queries con relaciones
- [Query Optimization Performance](https://www.prisma.io/docs/orm/prisma-client/queries/query-optimization-performance) - Guía de optimización de Prisma
- [Prisma relationJoins Preview Feature](https://www.prisma.io/blog/prisma-orm-now-lets-you-choose-the-best-join-strategy-preview) - Anuncio oficial de la feature
- [Preview Feature Feedback: relationJoins](https://github.com/prisma/prisma/discussions/22288) - Discusión en GitHub

### Herramientas

- [Prisma Studio](https://www.prisma.io/studio) - Visualiza tus datos y explora relaciones
- [pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html) - Analiza queries lentas en PostgreSQL
- [EXPLAIN ANALYZE](https://www.postgresql.org/docs/current/sql-explain.html) - Debugging de queries PostgreSQL

### Comunidad

- [Prisma Discord](https://pris.ly/discord) - Comunidad oficial de Prisma
- [Stack Overflow - Prisma](https://stackoverflow.com/questions/tagged/prisma) - Preguntas y respuestas

### Artículos relacionados en este blog

- [Migrando de Next.js 13 Pages Router a Next.js 16 App Router](https://apu314.com/posts/migrando-de-nextjs-13-pages-router-a-nextjs-16-app-router)

---

**¿Te ha sido útil este artículo?** Compártelo con otros developers que puedan beneficiarse de estas optimizaciones. Si quieres profundizar más, consulta los recursos adicionales y la documentación oficial de Prisma.

---

**Tags relacionados**: #Prisma #Optimización de Base de Datos #PostgreSQL #Performance #Next.js #N+1 Problem #SQL #Backend #ORM
