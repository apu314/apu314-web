import { FC, ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

type Props = {
  children: ReactNode
  classNames?: string
}

const MainLayout: FC<Props> = (props) => {
  const { children, classNames } = props

  return (
    <div className="min-h-screen">
      <Header />
      <div className={`${classNames || ''}`}>{children}</div>
      <Footer />
    </div>
  )
}

export default MainLayout
