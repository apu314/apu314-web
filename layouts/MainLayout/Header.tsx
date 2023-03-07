import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { HiOutlineHome } from 'react-icons/hi'
import { DarkModeSwitcher } from '../../components/ui/darkModeSwitcher'

type Props = {}

const Header: FC<Props> = (props) => {
  const [isHomePage, setIsHomePage] = useState(true)

  useEffect(() => {
    setIsHomePage(window.location.pathname === '/' ? true : false)
  }, [])

  return (
    <header className="header center-content">
      <div className="header-inner">
        <Link href={'/'} className={`logo ${isHomePage ? 'invisible' : ''}`}>
          <picture>
            <HiOutlineHome height={'44px'} width="44px" />
          </picture>
        </Link>

        <nav className="header-nav">
          <DarkModeSwitcher />
        </nav>
      </div>
    </header>
  )
}

export default Header
