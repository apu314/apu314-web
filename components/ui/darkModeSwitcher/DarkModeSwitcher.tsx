import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FcIdea, FcNoIdea } from 'react-icons/fc'

type Props = {}

const DarkModeSwitcher = (props: Props) => {
  const [currentTheme, setCurrentTheme] = useState('system')
  const { setTheme, systemTheme, theme } = useTheme()

  useEffect(() => {
    if (systemTheme && theme) {
      setCurrentTheme(() => {
        return theme === 'system' ? systemTheme : theme
      })
    }
  }, [systemTheme, theme])

  const handleToggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="dark-mode-switcher">
      <button onClick={handleToggleTheme} type="button">
        {currentTheme === 'dark' ? <FcIdea /> : <FcNoIdea />}
      </button>
    </div>
  )
}

export default DarkModeSwitcher
