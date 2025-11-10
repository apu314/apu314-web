'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

interface Props {
  children: ReactNode
}
const Providers = ({ children }: Props) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </>
  )
}
export default Providers
