'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { FcIdea, FcNoIdea } from 'react-icons/fc'

const DarkModeSwitcher = () => {
  const { setTheme, systemTheme, theme } = useTheme()

  // Derive currentTheme directly from theme and systemTheme
  const currentTheme = theme === 'system' ? systemTheme : theme

  const handleToggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      onClick={handleToggleTheme}
      className="dark-mode-switcher icon bg-white/5! dark:bg-card! dark:border-2 shadow-md hover:shadow-sm"
      // className='cursor-pointer'
      type="button"
    >
      {/* <button
        onClick={handleToggleTheme}
        className='cursor-pointer'
        type='button'
      > */}
      {currentTheme === 'dark' ? <FcIdea /> : <FcNoIdea />}
      {/* </button> */}
    </Button>
  )

  // return (
  //   <div className='dark-mode-switcher'>
  //     <button
  //       onClick={handleToggleTheme}
  //       className='cursor-pointer'
  //       type='button'
  //     >
  //       {currentTheme === 'dark' ? <FcIdea /> : <FcNoIdea />}
  //     </button>
  //   </div>
  // )
}

export default DarkModeSwitcher
