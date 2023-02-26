import { FcIdea, FcNoIdea } from 'react-icons/fc'
import { useTheme } from 'next-themes'

type Props = {}

const DarkModeSwitcher = (props: Props) => {
  const { setTheme, systemTheme, theme } = useTheme()

  const renderThemeToggle = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme

    return (
      <button
        onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
        type="button"
      >
        {currentTheme === 'dark' ? <FcIdea /> : <FcNoIdea />}
      </button>
    )
  }

  return <div className="dark-mode-switcher">{renderThemeToggle()}</div>
}

export default DarkModeSwitcher
