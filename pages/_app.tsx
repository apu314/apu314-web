import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
      <Analytics />
    </>
  )
}

export default MyApp
