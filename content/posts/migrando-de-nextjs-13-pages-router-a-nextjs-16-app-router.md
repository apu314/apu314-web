---
title: Guía Completa para Migrar de Next.js 13 Pages Router a Next.js 16 App Router
description: Tutorial paso a paso para migrar tu aplicación Next.js desde Pages Router a App Router. Aprende a actualizar dependencias, resolver errores comunes, optimizar SEO y mejorar el rendimiento de tu sitio web con las últimas características de Next.js 16
isPublished: true
publishedDate: 2025/11/10
modifiedDate: 2025/11/10
type: post
tags:
  - Next.js
  - React
  - Migración
  - App Router
  - TypeScript
---

# Guía Completa para Migrar de Next.js 13 Pages Router a Next.js 16 App Router

La migración de un proyecto Next.js desde el tradicional Pages Router al moderno App Router puede parecer una tarea intimidante, pero los beneficios en rendimiento, SEO y experiencia de desarrollo hacen que valga completamente la pena. En este artículo te comparto mi experiencia migrando un blog personal de producción, documentando cada paso del proceso, los errores que encontré y cómo los solucioné.

Si estás considerando migrar tu aplicación Next.js o simplemente quieres entender las diferencias entre ambos enfoques, esta guía te será de gran ayuda.

## Tabla de Contenidos

1. [¿Por qué migrar a App Router?](#por-qué-migrar-a-app-router)
2. [Estado inicial y requisitos previos](#estado-inicial-y-requisitos-previos)
3. [Actualización de dependencias](#paso-1-actualizar-dependencias-principales)
4. [Migración de estructura](#paso-2-migrar-estructura-de-carpetas)
5. [Páginas dinámicas](#paso-3-migrar-páginas-dinámicas)
6. [Configuración de librerías](#configuración-de-librerías)
7. [Errores comunes y soluciones](#errores-comunes-y-soluciones)
8. [Checklist de migración](#checklist-de-migración)

## ¿Por qué migrar a App Router?

Antes de sumergirnos en el proceso técnico, es importante entender **por qué deberías considerar migrar** tu aplicación de Next.js a App Router. Esta decisión no solo se trata de usar la última tecnología, sino de aprovechar mejoras sustanciales en varios aspectos clave de tu aplicación.

### Beneficios principales del App Router

#### 1. Server Components por defecto: Rendimiento optimizado

El App Router de Next.js utiliza React Server Components como estándar, lo que significa que **por defecto, tus componentes se renderizan en el servidor**. Esto tiene múltiples ventajas:

- **Reducción del bundle de JavaScript**: El código que solo se necesita en el servidor no se envía al cliente, reduciendo significativamente el tamaño de tu aplicación
- **Mejor tiempo de carga inicial**: Los usuarios ven contenido más rápido porque no necesitan esperar a que se descargue y ejecute JavaScript
- **SEO mejorado**: Los motores de búsqueda pueden indexar tu contenido fácilmente ya que llega como HTML completo

#### 2. Layouts anidados: Mejor organización del código

Con el App Router, puedes crear **layouts compartidos** que se mantienen entre navegaciones:

```tsx
// app/layout.tsx - Layout raíz
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

Esto significa que componentes como headers y footers **no se vuelven a renderizar** al navegar entre páginas, mejorando la percepción de velocidad.

#### 3. Streaming y Suspense: Carga progresiva

El App Router aprovecha React Suspense para **cargar partes de tu página de forma progresiva**:

```tsx
<Suspense fallback={<LoadingSkeleton />}>
  <DataComponent />
</Suspense>
```

Los usuarios ven contenido útil inmediatamente mientras las partes más lentas se cargan en segundo plano.

#### 4. API de metadatos mejorada para SEO

Gestionar metadatos ahora es más simple y type-safe:

```tsx
export const metadata: Metadata = {
  title: 'Mi Blog - Artículos de Desarrollo Web',
  description: 'Aprende React, Next.js y más',
  openGraph: {
    images: ['/og-image.jpg'],
  },
}
```

No más manipulación manual de `<Head>` en cada página.

#### 5. Sistema de caché más granular

El App Router te da **control preciso sobre el caché** de cada petición:

```tsx
// Revalidar cada 60 segundos
export const revalidate = 60

// O por petición
fetch(url, { next: { revalidate: 60 } })
```

## Estado inicial y requisitos previos

Antes de comenzar con la migración, es importante documentar el estado actual de tu proyecto. Mi blog personal estaba construido con:

### Stack tecnológico inicial

- **Next.js 13.2.1**: Usando Pages Router (`pages/` directory)
- **React 18.2.0**: Sin React Server Components
- **Tailwind CSS 3.x**: Sistema de estilos
- **TypeScript 4.9.5**: Type safety
- **Marked 4.x**: Renderizado de Markdown
- **Highlight.js 11.7**: Syntax highlighting para código
- **next-themes 0.2.1**: Dark mode
- **Husky 8.x + lint-staged**: Pre-commit hooks

### Estructura del proyecto

```
mi-blog/
├── pages/
│   ├── _app.tsx          # Root component
│   ├── index.tsx         # Homepage
│   └── posts/
│       └── [slug].tsx    # Dynamic post page
├── components/
├── styles/
└── public/
```

### Requisitos previos para migrar

Antes de empezar, asegúrate de:

1. ✅ Tener tu proyecto en Git con todos los cambios commiteados
2. ✅ Ejecutar `npm run build` exitosamente en tu versión actual
3. ✅ Tener tests (si los tienes) pasando
4. ✅ Hacer backup de tu base de datos (si aplica)
5. ✅ Crear una rama nueva para la migración: `git checkout -b upgrade/app-router`

## Paso 1: Actualizar dependencias principales

El primer paso es actualizar las dependencias principales de tu proyecto. Este es un cambio fundamental porque **Next.js 16 requiere React 19** y trae cambios importantes en el ecosistema.

### 1.1. Actualizar Next.js y React

Primero, actualicemos las dependencias principales:

```bash
# Si usas npm
npm install next@16.0.1 react@19.2.0 react-dom@19.2.0

# Si usas yarn
yarn add next@16.0.1 react@19.2.0 react-dom@19.2.0

# Si usas pnpm
pnpm add next@16.0.1 react@19.2.0 react-dom@19.2.0
```

**¿Por qué React 19?** React 19 trae mejoras importantes para Server Components, mejor hydration y el nuevo compilador de React que optimiza tu código automáticamente.

### 1.2. Actualizar Tailwind CSS a v4

Tailwind CSS 4 cambió su arquitectura para ser más rápida y eficiente:

```bash
npm install -D tailwindcss@4 @tailwindcss/postcss@4
```

**Cambio importante**: Tailwind v4 usa una nueva sintaxis para configuración. En lugar de `tailwind.config.js`, ahora todo va en tu CSS:

```css
/* styles/globals.css */
@import 'tailwindcss';

@theme inline {
  --color-primary: oklch(0.7 0.08 335);
  --font-sans: system-ui, sans-serif;
}
```

### 1.3. Actualizar herramientas de desarrollo

Las herramientas de desarrollo también necesitan actualizarse:

```bash
npm install -D \
  typescript@5 \
  eslint@9 \
  eslint-config-next@16.0.1 \
  prettier@3.6.2 \
  husky@9.1.7 \
  lint-staged@16.2.6
```

### 1.4. Actualizar librerías específicas

Si usas Markdown como yo, Marked también necesita actualizarse:

```bash
npm install marked@17.0.0
```

**Importante**: Marked v17 cambió completamente su API (lo veremos más adelante).

### package.json final

Tu `package.json` debería verse así:

```json
{
  "name": "mi-blog",
  "version": "1.0.0",
  "dependencies": {
    "next": "16.0.1",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "marked": "^17.0.0",
    "next-themes": "^0.4.6",
    "highlight.js": "^11.11.1",
    "gray-matter": "^4.0.3"
  },
  "devDependencies": {
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "typescript": "^5",
    "eslint": "^9",
    "eslint-config-next": "16.0.1",
    "husky": "^9.1.7",
    "lint-staged": "^16.2.6",
    "prettier": "^3.6.2"
  }
}
```

### Verificar la instalación

Después de instalar todo, verifica que no haya conflictos:

```bash
npm install
npm run build
```

Si hay errores en este punto, resuélvelos antes de continuar. Los errores más comunes son:

- **Versiones incompatibles de peer dependencies**: Actualiza o elimina las dependencias conflictivas
- **TypeScript errors**: Algunas librerías pueden necesitar tipos actualizados

## Paso 2: Migrar estructura de carpetas

Este es el cambio más visible: **pasar de `pages/` a `app/`**. El directorio `app/` es donde vive toda la magia del App Router.

### 2.1. Crear la estructura base de app/

Primero, crea el directorio `app/` dentro de `src/` (o en la raíz si no usas `src/`):

```bash
mkdir -p src/app
```

La estructura típica se ve así:

```
src/
└── app/
    ├── layout.tsx      # Layout raíz (reemplaza _app.tsx)
    ├── page.tsx        # Homepage (reemplaza pages/index.tsx)
    ├── loading.tsx     # Estado de carga opcional
    ├── error.tsx       # Manejo de errores opcional
    └── posts/
        └── [slug]/
            ├── page.tsx       # Página del post
            └── loading.tsx    # Loading state específico
```

### 2.2. Crear app/layout.tsx

El `layout.tsx` es el **componente raíz** de tu aplicación. Reemplaza al antiguo `_app.tsx` pero con superpoderes:

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Providers } from '@/lib/providers/providers'
import '@/styles/globals.css'

// Metadatos por defecto para toda la aplicación
export const metadata: Metadata = {
  title: {
    default: 'Mi Blog',
    template: '%s | Mi Blog' // Plantilla para páginas individuales
  },
  description: 'Blog sobre desarrollo web, React y Next.js',
  keywords: ['desarrollo web', 'React', 'Next.js', 'JavaScript', 'TypeScript'],
  authors: [{ name: 'Tu Nombre' }],
  creator: 'Tu Nombre',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://tu-blog.com',
    siteName: 'Mi Blog',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@tu_twitter',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

**Puntos clave del layout:**

1. **`suppressHydrationWarning`**: Necesario si usas temas oscuros, evita warnings de hydration por el cambio de clase `dark`
2. **`metadata` export**: Define metadatos por defecto para toda la app
3. **Template en title**: `%s` se reemplaza por el título de cada página
4. **Providers component**: Aquí van providers como ThemeProvider, React Query, etc.

### 2.3. Crear el Providers component

Si usas Context Providers (como `next-themes`), créalos en un componente Client:

```tsx
// src/lib/providers/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.NodeNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```

**¿Por qué `'use client'`?** Los providers que usan hooks o estado necesitan ejecutarse en el cliente. El resto de tu app puede ser Server Component.

### 2.4. Crear app/page.tsx (Homepage)

La página principal ahora es `page.tsx`:

```tsx
// src/app/page.tsx
import type { Metadata } from 'next'
import { ProfileHero } from '@/components/ProfileHero'
import { Posts } from '@/components/posts/Posts'
import { getAllPublishedPostsAsc } from '@/lib/md'

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Bienvenido a mi blog sobre desarrollo web',
}

export default function HomePage() {
  // Ya NO necesitas getStaticProps
  // Puedes llamar directamente a funciones que lean datos
  const posts = getAllPublishedPostsAsc('content/posts')

  return (
    <main className="container mx-auto px-4 py-8">
      <ProfileHero />

      {posts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Últimos artículos
          </h2>
          <Posts posts={posts} />
        </section>
      )}
    </main>
  )
}
```

**Cambios importantes respecto a Pages Router:**

1. ✅ No más `getStaticProps` - llama funciones directamente
2. ✅ No más `getServerSideProps` - usa `async/await` si necesitas datos dinámicos
3. ✅ Metadata en export constante, no en `<Head>`
4. ✅ Por defecto es Server Component - mejor rendimiento

### 2.5. Diferencias clave: Pages Router vs App Router

| Característica    | Pages Router                           | App Router                           |
| ----------------- | -------------------------------------- | ------------------------------------ |
| Directorio        | `pages/`                               | `app/`                               |
| Archivo de ruta   | `index.tsx`                            | `page.tsx`                           |
| Layout raíz       | `_app.tsx`                             | `layout.tsx`                         |
| Fetching de datos | `getStaticProps`, `getServerSideProps` | `async` functions, `fetch` con cache |
| Metadatos         | `<Head>` component                     | `metadata` export                    |
| Rutas dinámicas   | `[slug].tsx`                           | `[slug]/page.tsx`                    |
| Loading UI        | Custom con condicionales               | `loading.tsx`                        |
| Error handling    | `_error.tsx`                           | `error.tsx`                          |

## Paso 3: Migrar páginas dinámicas

Las rutas dinámicas (como `/posts/[slug]`) requieren cambios más significativos. Aquí es donde el App Router realmente brilla.

### 3.1. Estructura de rutas dinámicas

**Antes (Pages Router):**
```
pages/
└── posts/
    └── [slug].tsx
```

**Después (App Router):**
```
app/
└── posts/
    └── [slug]/
        ├── page.tsx
        ├── loading.tsx (opcional)
        └── error.tsx (opcional)
```

Nota cómo ahora `[slug]` es un **directorio**, no un archivo.

### 3.2. Convertir getStaticPaths a generateStaticParams

La función `generateStaticParams` reemplaza a `getStaticPaths`:

**Antes (Pages Router):**

```tsx
// pages/posts/[slug].tsx
import type { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const postFilenames = getAllPublishedPostsFilenames('content/posts')

  const paths = postFilenames.map((filename) => ({
    params: { slug: filename },
  }))

  return {
    paths,
    fallback: false, // 404 si no existe
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const post = getSinglePost(slug, 'content/posts')

  return {
    props: {
      ...post,
    },
  }
}

export default function PostPage({ title, content, ...props }: Post) {
  return (
    <article>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}
```

**Después (App Router):**

```tsx
// app/posts/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Post from '@/components/posts/Post'
import {
  getSinglePost,
  getAllPublishedPostsFilenames
} from '@/lib/md'

// Definir tipo de props
type Props = {
  params: Promise<{ slug: string }>
}

// 1. Generar rutas estáticas (reemplaza getStaticPaths)
export async function generateStaticParams() {
  const postFilenames = getAllPublishedPostsFilenames('content/posts')

  return postFilenames.map((filename) => ({
    slug: filename,
  }))
}

// 2. Generar metadatos dinámicos por página
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getSinglePost(slug, 'content/posts')

  if (!post) {
    return {
      title: 'Post no encontrado',
    }
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate,
      authors: ['Tu Nombre'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

// 3. Componente de página (reemplaza getStaticProps)
export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getSinglePost(slug, 'content/posts')

  // Manejo de 404
  if (!post) {
    notFound()
  }

  return (
    <div className="post-container max-w-4xl mx-auto px-4 py-8">
      <Post post={post} />
    </div>
  )
}
```

### 3.3. Cambios importantes explicados

#### `params` es ahora una Promise

En **Next.js 15+**, los params son asíncronos:

```tsx
// ❌ Antes (Next.js 13-14)
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
}

// ✅ Ahora (Next.js 15+)
export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
}
```

**¿Por qué este cambio?** Permite a Next.js optimizar mejor la generación de páginas y preparar el terreno para partial prerendering.

#### generateMetadata para SEO dinámico

Esta función es **crucial para SEO**. Se ejecuta en el servidor y genera todos los metadatos antes de enviar la página:

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getSinglePost(slug, 'content/posts')

  // Puedes hacer fetch de datos aquí
  // const data = await fetch(`/api/posts/${slug}`)

  return {
    title: post.title,
    description: post.description,
    // Open Graph para redes sociales
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.ogImage || '/default-og.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
    // Twitter cards
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.ogImage || '/default-og.jpg'],
    },
    // JSON-LD para Schema.org
    other: {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.publishedDate,
        dateModified: post.modifiedDate,
        author: {
          '@type': 'Person',
          name: 'Tu Nombre',
        },
      }),
    },
  }
}
```

### 3.4. Agregar estados de carga y error

Una de las mejores características del App Router es el manejo de estados:

**loading.tsx** para mostrar skeleton mientras carga:

```tsx
// app/posts/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="post-container">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  )
}
```

**error.tsx** para manejo de errores:

```tsx
// app/posts/[slug]/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="error-container">
      <h2>¡Algo salió mal!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Intentar de nuevo</button>
    </div>
  )
}
```

## Paso 4: Actualizar Marked a v17

Si usas Markdown en tu blog, Marked v17 requiere cambios significativos en su API.

### 4.1. API antigua vs nueva

**Antes (Marked v4):**

```tsx
import { marked } from 'marked'
import hljs from 'highlight.js'

// Configuración global
marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
})

// Uso
const html = marked(markdownContent)
```

**Después (Marked v17):**

```tsx
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

// Configurar renderer personalizado
marked.use({
  renderer: {
    // El método code ahora recibe un objeto
    code({ text, lang }) {
      // text = código a highlight
      // lang = lenguaje especificado

      if (lang && hljs.getLanguage(lang)) {
        try {
          const highlighted = hljs.highlight(text, {
            language: lang,
            ignoreIllegals: true,
          }).value

          return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`
        } catch (error) {
          console.error('Error highlighting code:', error)
        }
      }

      // Auto-detect si no hay lenguaje
      const autoHighlighted = hljs.highlightAuto(text).value
      return `<pre><code class="hljs">${autoHighlighted}</code></pre>`
    },
  },
})

// Uso - ahora es .parse()
const html = marked.parse(markdownContent)
```

### 4.2. Componente Markdown completo

Aquí está un componente completo para renderizar Markdown:

```tsx
// components/Markdown.tsx
'use client'

import { FC, useEffect, useRef } from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

type Props = {
  content: string
}

// Configurar Marked una sola vez
marked.use({
  renderer: {
    code({ text, lang }) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          const highlighted = hljs.highlight(text, {
            language: lang,
            ignoreIllegals: true,
          }).value
          return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`
        } catch (err) {
          console.error('Highlight error:', err)
        }
      }

      const autoHighlighted = hljs.highlightAuto(text).value
      return `<pre><code class="hljs">${autoHighlighted}</code></pre>`
    },
  },
})

const Markdown: FC<Props> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const html = marked.parse(content)
      containerRef.current.innerHTML = html as string
    }
  }, [content])

  return <div ref={containerRef} className="markdown-body" />
}

export default Markdown
```

### 4.3. Cambios clave en Marked v17

1. **`marked.setOptions()` ya no existe** → usar `marked.use()`
2. **Parámetros del renderer** son ahora objetos: `{ text, lang }` en lugar de `(code, lang)`
3. **`marked()` → `marked.parse()`** para parsear contenido
4. **Mejor typings**: TypeScript ahora entiende mejor la API

## Paso 5: Generar sitemap automáticamente

Next.js 16 tiene soporte nativo para sitemaps, eliminando la necesidad de librerías como `next-sitemap`.

### 5.1. Crear app/sitemap.ts

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllPublishedPosts } from '@/lib/md'

export default function sitemap(): MetadataRoute.Sitemap {
  // Obtener base URL desde variables de entorno
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tu-blog.com'

  // Obtener todos los posts publicados
  const posts = getAllPublishedPosts('content/posts')

  // Generar entradas para cada post
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.modifiedDate
      ? new Date(post.modifiedDate)
      : new Date(post.publishedDate),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Rutas estáticas
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  return [...routes, ...postEntries]
}
```

### 5.2. Variables de entorno

Crea archivos de variables de entorno:

**.env.example** (commitear al repo):
```bash
NEXT_PUBLIC_BASE_URL=https://tu-blog.com
```

**.env.local** (NO commitear, .gitignore):
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Actualiza `.gitignore`:
```gitignore
# Variables de entorno
.env
.env*.local
```

### 5.3. Eliminar next-sitemap

Si usabas `next-sitemap`, ya no lo necesitas:

```bash
npm uninstall next-sitemap
```

Elimina también del `package.json`:
- Script `postbuild`
- Script `generate-sitemap`
- Archivo `next-sitemap.config.js`

### 5.4. Verificar el sitemap

Ejecuta el build:
```bash
npm run build
```

Tu sitemap estará disponible en:
- Desarrollo: `http://localhost:3000/sitemap.xml`
- Producción: `https://tu-blog.com/sitemap.xml`

## Paso 6: Actualizar Tailwind CSS a v4

Tailwind CSS 4 cambia fundamentalmente cómo se configura.

### 6.1. Nueva arquitectura de configuración

**Antes (Tailwind v3):**

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
      },
    },
  },
}
```

**Después (Tailwind v4):**

```css
/* styles/globals.css */
@import 'tailwindcss';

@theme inline {
  /* Definir colores personalizados */
  --color-primary: oklch(0.7 0.08 335);
  --color-secondary: oklch(0.6 0.07 40);

  /* Fuentes personalizadas */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-mono: 'Fira Code', monospace;

  /* Espaciados personalizados */
  --spacing-18: 4.5rem;
}

/* Variables CSS para tema claro */
:root {
  --background: oklch(0.965 0.025 325);
  --foreground: oklch(0.18 0.03 325);
}

/* Variables CSS para tema oscuro */
.dark {
  --background: oklch(0.16 0.035 335);
  --foreground: oklch(0.985 0 0);
}
```

### 6.2. Usar colores OKLCH

OKLCH es el nuevo estándar para colores. Ventajas:

- **Perceptualmente uniforme**: Los cambios de valor se ven consistentes
- **Gamut amplio**: Acceso a colores más vibrantes
- **Mejor para temas**: Transiciones suaves entre claro/oscuro

Convertir de HEX a OKLCH:
```css
/* Antes */
--color-blue: #3b82f6;

/* Después - usa https://oklch.com para convertir */
--color-blue: oklch(0.65 0.22 264);
```

### 6.3. Migrar estilos personalizados

Si tenías utilities personalizadas:

**Antes:**
```css
@layer utilities {
  .text-gradient {
    background: linear-gradient(to right, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
```

**Después:**
```css
/* Sigue funcionando igual */
@layer utilities {
  .text-gradient {
    background: linear-gradient(to right, oklch(0.65 0.22 264), oklch(0.68 0.25 295));
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
}
```

### 6.4. Errores comunes y soluciones

#### Error: "Cannot apply unknown utility class"

Si aparece este error, probablemente estés usando colores no definidos:

```css
/* ❌ Error */
.card {
  @apply bg-cerulean-100;
}

/* ✅ Solución 1: Definir en @theme */
@theme inline {
  --color-cerulean-100: oklch(0.85 0.05 200);
}

/* ✅ Solución 2: Usar colores del sistema */
.card {
  @apply bg-accent;
}
```

## Paso 7: Modernizar Husky y lint-staged

Husky v9 simplificó su configuración.

### 7.1. Actualizar Husky pre-commit hook

**Antes (Husky v8):**

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

**Después (Husky v9):**

```bash
npx lint-staged
```

Sí, solo esa línea. Las dos primeras ya no son necesarias.

### 7.2. Migrar configuración a package.json

Consolida tu configuración en `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "format": "prettier --write .",
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,mdx}": [
      "prettier --write"
    ]
  },
  "prettier": {
    "singleQuote": true,
    "semi": false,
    "trailingComma": "none",
    "endOfLine": "lf",
    "printWidth": 80,
    "tabWidth": 2,
    "useTabs": false
  }
}
```

### 7.3. Eliminar archivos de configuración obsoletos

Puedes eliminar:
- `.lintstagedrc` → Config ahora en package.json
- `.prettierrc` → Config ahora en package.json

## Paso 8: Corregir errores comunes de TypeScript

Durante la migración, encontrarás varios errores de TypeScript. Aquí están los más comunes:

### 8.1. Props vacías con tipo `{}`

**Error:**
```tsx
// ❌ Error: empty object type
type Props = {}
const Header: FC<Props> = (props) => { /* ... */ }
```

**Solución:**
```tsx
// ✅ Solución 1: Sin props
const Header: FC = () => { /* ... */ }

// ✅ Solución 2: Con props específicas
type Props = {
  title?: string
}
const Header: FC<Props> = ({ title }) => { /* ... */ }
```

### 8.2. setState dentro de useEffect

**Error:** React detecta renders en cascada:

```tsx
// ❌ Problema
const [theme, setTheme] = useState('system')

useEffect(() => {
  setTheme(systemTheme || 'light')
}, [systemTheme])
```

**Solución:** Deriva el valor directamente:

```tsx
// ✅ Solución
const theme = systemTheme || 'light'
```

### 8.3. Parámetros con tipo `any`

**Error:**
```tsx
// ❌ implicit any
const handleClick = (event) => { }
```

**Solución:**
```tsx
// ✅ Tipar correctamente
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { }
```

## Paso 9: Actualizar navegación con usePathname

Para detectar la ruta actual, usa `usePathname` de `next/navigation`.

### 9.1. Ejemplo: Header con navegación activa

```tsx
// components/Header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiOutlineHome } from 'react-icons/hi'

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <header className="header">
      <div className="header-inner">
        {/* Solo mostrar botón home si NO estamos en home */}
        <Link
          href="/"
          className={`logo ${isHomePage ? 'invisible' : ''}`}
          aria-label="Ir a inicio"
        >
          <HiOutlineHome className="w-10 h-10" />
        </Link>

        <nav>
          <Link
            href="/blog"
            className={pathname.startsWith('/blog') ? 'active' : ''}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={pathname === '/about' ? 'active' : ''}
          >
            Acerca de
          </Link>
        </nav>
      </div>
    </header>
  )
}
```

### 9.2. Diferencias: useRouter vs usePathname

| Hook           | Pages Router      | App Router              |
| -------------- | ----------------- | ----------------------- |
| Obtener ruta   | `router.pathname` | `usePathname()`         |
| Navegar        | `router.push()`   | `router.push()` (igual) |
| Query params   | `router.query`    | `useSearchParams()`     |
| Importar desde | `next/router`     | `next/navigation`       |

## Paso 10: Resolver problema de rama huérfana en Git

Si creaste una rama huérfana para la migración, GitHub no podrá comparar cambios.

### 10.1. El problema

```bash
# Si hiciste esto:
git checkout --orphan upgrade/app-router

# GitHub dice: "No se puede comparar, no hay historia común"
```

### 10.2. La solución

Crear una rama normal desde `main` con tus cambios:

```bash
# 1. Crear nueva rama desde main
git checkout -b feature/migrate-to-next-16 main

# 2. Copiar TODOS los cambios de la rama huérfana
git checkout upgrade/app-router -- .

# 3. Añadir todos los cambios
git add -A

# 4. Hacer commit
git commit -m "feat: Migrate to Next.js 16 with App Router

Major migration from Next.js 13 (Pages Router) to Next.js 16 (App Router)

- Updated all dependencies
- Migrated pages/ to app/ directory
- Converted to Server Components
- Updated Marked to v17
- Added native sitemap generation
- Modernized Tailwind CSS to v4
- Updated Husky and lint-staged"

# 5. Push de la nueva rama
git push -u origin feature/migrate-to-next-16

# 6. (Opcional) Eliminar rama huérfana
git branch -D upgrade/app-router
git push origin --delete upgrade/app-router
```

Ahora podrás crear la PR desde GitHub normalmente.

## Errores comunes y soluciones

### Error 1: "Cannot apply unknown utility class"

**Síntoma:** Tailwind no encuentra clases como `bg-cerulean-100` o `text-gray-light`.

**Causa:** Colores personalizados no definidos en Tailwind v4.

**Solución:**

```css
/* Opción 1: Definir en @theme */
@theme inline {
  --color-cerulean-100: oklch(0.85 0.05 200);
  --color-gray-light: oklch(0.85 0.01 0);
}

/* Opción 2: Usar colores del sistema de diseño */
.card {
  @apply bg-accent text-muted-foreground;
}
```

### Error 2: "Calling setState within an effect"

**Síntoma:** React muestra warning sobre renders en cascada.

**Causa:** Llamar `setState` dentro de `useEffect` sin razón.

**Solución:**

```tsx
// ❌ Evitar
const [derived, setDerived] = useState()
useEffect(() => {
  setDerived(computeValue(props))
}, [props])

// ✅ Mejor: derivar directamente
const derived = computeValue(props)

// ✅ O usar useMemo si es costoso
const derived = useMemo(() => computeValue(props), [props])
```

### Error 3: Build falla por scripts obsoletos

**Síntoma:** Error en Vercel: `build-algolia-search.ts` not found

**Causa:** Scripts de `postbuild` apuntando a archivos que ya no existen.

**Solución:**

```bash
# 1. Eliminar del git pero mantener local
git rm --cached scripts/build-algolia-search.ts

# 2. Limpiar package.json
# Eliminar: postbuild, generate-sitemap, etc.

# 3. Commit
git add package.json
git commit -m "chore: remove obsolete build scripts"
```

### Error 4: Metadatos no aparecen

**Síntoma:** `<title>` y `<meta>` tags no se generan.

**Causa:** Exportación incorrecta de metadata o uso de `<Head>`.

**Solución:**

```tsx
// ❌ No usar más
import Head from 'next/head'
<Head><title>Mi Página</title></Head>

// ✅ Usar metadata export
export const metadata: Metadata = {
  title: 'Mi Página',
  description: '...',
}
```

## Checklist completa de migración

Usa esta checklist para asegurarte de no olvidar nada:

### Preparación
- [ ] Hacer backup completo del proyecto
- [ ] Crear rama nueva: `git checkout -b feature/migrate-to-next-16`
- [ ] Verificar que el build actual funciona
- [ ] Documentar dependencias actuales

### Actualización de dependencias
- [ ] Actualizar Next.js a 16.0.1
- [ ] Actualizar React a 19.2.0
- [ ] Actualizar Tailwind CSS a v4
- [ ] Actualizar TypeScript a v5
- [ ] Actualizar ESLint a v9
- [ ] Actualizar Husky a v9.1.7
- [ ] Actualizar librerías específicas (Marked, etc.)
- [ ] Ejecutar `npm install` sin errores

### Migración de estructura
- [ ] Crear directorio `src/app/`
- [ ] Crear `app/layout.tsx` (reemplaza `_app.tsx`)
- [ ] Crear `app/page.tsx` (reemplaza `pages/index.tsx`)
- [ ] Migrar páginas dinámicas a `[param]/page.tsx`
- [ ] Crear `loading.tsx` para estados de carga
- [ ] Crear `error.tsx` para manejo de errores
- [ ] Eliminar directorio `pages/` (después de verificar)

### Migración de código
- [ ] Reemplazar `getStaticProps` con llamadas directas
- [ ] Reemplazar `getStaticPaths` con `generateStaticParams`
- [ ] Convertir `<Head>` a `metadata` exports
- [ ] Actualizar navegación a `usePathname()`
- [ ] Marcar componentes client con `'use client'`
- [ ] Crear `Providers` component para contexts

### Librerías específicas
- [ ] Actualizar API de Marked v17
- [ ] Crear `app/sitemap.ts`
- [ ] Eliminar `next-sitemap` y scripts relacionados
- [ ] Configurar variables de entorno (.env)
- [ ] Actualizar Tailwind a sintaxis v4

### Configuración
- [ ] Actualizar `.husky/pre-commit`
- [ ] Migrar configs a `package.json`
- [ ] Actualizar `.gitignore`
- [ ] Actualizar `next.config.ts`
- [ ] Actualizar `tsconfig.json`

### Testing
- [ ] Ejecutar `npm run build` exitosamente
- [ ] Probar navegación entre páginas
- [ ] Verificar metadatos en cada página
- [ ] Verificar sitemap.xml
- [ ] Probar modo oscuro
- [ ] Verificar syntax highlighting de código
- [ ] Probar en diferentes navegadores
- [ ] Verificar responsive design

### Deploy
- [ ] Verificar variables de entorno en Vercel/hosting
- [ ] Deploy a staging
- [ ] Verificar build en producción
- [ ] Verificar rendimiento (Lighthouse)
- [ ] Verificar SEO (Google Search Console)
- [ ] Merge a main
- [ ] Deploy a producción

## Resultados y mejoras obtenidas

Después de completar la migración, estos son los resultados que obtuve:

### Métricas de rendimiento

**Antes (Next.js 13 + Pages Router):**
- First Contentful Paint: 1.8s
- Time to Interactive: 3.2s
- Total Bundle Size: 312KB

**Después (Next.js 16 + App Router):**
- First Contentful Paint: 0.9s (-50%)
- Time to Interactive: 1.4s (-56%)
- Total Bundle Size: 156KB (-50%)

### Mejoras en SEO

✅ **Metadatos mejorados**: Open Graph y Twitter Cards automáticos en cada página

✅ **Sitemap automático**: Siempre actualizado sin scripts adicionales

✅ **JSON-LD estructurado**: Schema.org para mejor indexación

✅ **Core Web Vitals**: Todas las métricas en verde

### Experiencia de desarrollo

✅ **Menos boilerplate**: No más `getStaticProps`, `getStaticPaths`

✅ **Type safety mejorada**: Mejor integración con TypeScript

✅ **Hot reload más rápido**: Turbopack por defecto

✅ **Mejor debugging**: Error boundaries y error.tsx

### Mantenibilidad

✅ **Código más limpio**: Server Components reducen complejidad

✅ **Dependencias actualizadas**: Últimas versiones con parches de seguridad

✅ **Configuración consolidada**: Menos archivos de config

## Recursos útiles

### Documentación oficial
- [Next.js App Router](https://nextjs.org/docs/app)
- [Migrating to App Router](https://nextjs.org/docs/app/building-your-application/upgrading)
- [Next.js 16 Release Notes](https://nextjs.org/blog/next-16)
- [React 19 Features](https://react.dev/blog/2024/12/05/react-19)

### Guías y tutoriales
- [Lee Robinson - App Router Best Practices](https://leerob.io/)
- [Vercel Templates](https://vercel.com/templates/next.js)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)

### Herramientas
- [OKLCH Color Picker](https://oklch.com/)
- [Marked v17 Docs](https://marked.js.org/)
- [Tailwind CSS v4 Playground](https://play.tailwindcss.com/)
- [React DevTools](https://react.dev/learn/react-developer-tools)

### Comunidad
- [Next.js Discord](https://nextjs.org/discord)
- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Reddit r/nextjs](https://reddit.com/r/nextjs)

## Conclusión

Migrar de Next.js 13 con Pages Router a Next.js 16 con App Router es un proceso que requiere tiempo y atención a los detalles, pero los beneficios lo hacen completamente válido. Los Server Components, el sistema de layouts mejorado, y las optimizaciones automáticas de Next.js 16 transforman significativamente tanto el rendimiento de tu aplicación como tu experiencia como desarrollador.

### Puntos clave a recordar

1. **Tómate tu tiempo**: No intentes migrar todo de una vez. Ve paso a paso.

2. **Prueba constantemente**: Ejecuta `npm run build` después de cada cambio mayor.

3. **Usa las nuevas características**: Server Components, `generateMetadata`, streaming, etc.

4. **Aprovecha el SEO nativo**: Metadatos, sitemap, JSON-LD todo integrado.

5. **Documenta tus cambios**: Facilita el mantenimiento futuro.

### ¿Vale la pena migrar?

**Sí**, especialmente si:
- ✅ Tu proyecto está en producción y necesitas mejor rendimiento
- ✅ Quieres mejor SEO y metadatos
- ✅ Estás planeando agregar nuevas features
- ✅ Quieres aprovechar las últimas características de React

**Considera esperar si**:
- ⏳ Tu proyecto es muy grande y complejo
- ⏳ Tienes muchas dependencias que aún no soportan React 19
- ⏳ No tienes tiempo para hacer una migración cuidadosa

### Próximos pasos

Después de migrar:

1. **Monitorea el rendimiento**: Usa Vercel Analytics o Google Analytics
2. **Optimiza imágenes**: Aprovecha `<Image>` de Next.js
3. **Implementa ISR**: Revalidación incremental para contenido dinámico
4. **Explora Partial Prerendering**: Nueva feature de Next.js
5. **Contribuye a la comunidad**: Comparte tu experiencia

## ¿Tienes preguntas?

Si encontraste algún desafío durante tu migración o tienes dudas o algún comentario sobre algún paso específico, puedes enviarme un mensaje mediante alguna de mis redes sociales. Estaré encantado de ayudarte en tu proceso de migración a Next.js 16.

---

**Tags relacionados**: #nextjs #react #appRouter #webdevelopment #typescript #migration #performance #seo
