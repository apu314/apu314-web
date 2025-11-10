'use client'

import type { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiOutlineHome } from 'react-icons/hi'
import { DarkModeSwitcher } from '@/components/shared/darkModeSwitcher'

const Header: FC = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <header className="header">
      <div className="header-inner">
        <Link href={'/'} className={`logo ${isHomePage ? 'invisible' : ''}`}>
          <picture>
            <HiOutlineHome height={'44px'} width="44px" />
          </picture>
        </Link>

        <nav className="header-nav">
          <DarkModeSwitcher />
          {/* <MenuButton /> */}
        </nav>
      </div>
    </header>
  )
}

export default Header
