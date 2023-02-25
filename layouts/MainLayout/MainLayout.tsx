import { FC, ReactNode } from 'react'
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
      {/* <MenuButton /> */}
      <div className={classNames}>{children}</div>
      <Footer />
    </>
  )
}

export default MainLayout
