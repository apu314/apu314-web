import { FC, ReactNode } from 'react'
import { DarkModeSwitcher } from '../../components/ui/darkModeSwitcher'
import { MenuButton } from '../../components/ui/menu'
import Footer from './Footer'
import Header from './Header'

type Props = {
  children: ReactNode
  classNames?: string
}

const MainLayout: FC<Props> = (props) => {
  const { children, classNames } = props

  return (
    <>
      <Header />
      <div className="menu-container">
        <DarkModeSwitcher />
        {/* <MenuButton /> */}
      </div>
      <div className={classNames}>{children}</div>
      <Footer />
    </>
  )
}

export default MainLayout
