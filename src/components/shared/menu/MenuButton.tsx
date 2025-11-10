import { FC } from 'react'

import { FiMenu } from 'react-icons/fi'

const MenuButton: FC = () => {
  return (
    <button
      className="menu-button"
      style={{
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <FiMenu size={22} />
    </button>
  )
}

export default MenuButton
