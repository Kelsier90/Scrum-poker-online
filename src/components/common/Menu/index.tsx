import styles from '@styles/components/common/Menu.module.css'

import React from 'react'
import CaretDownSvg from '@src/components/common/illustrations/CaretDownSvg'
import clsx from 'clsx'

interface MenuProps {
  title: unknown
  children: unknown
}

const Menu = ({ title, children }: MenuProps) => {
  const [open, setOpen] = React.useState(false)

  const toggle = () => {
    setOpen(!open)
  }

  return (
    <>
      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} />
      )}
      <div className={clsx(styles.root, { [styles['root--open']]: open })}>
        <div className={styles.root__title} onClick={toggle}>
          <div className={styles.root__title__content}>{title}</div>
          <CaretDownSvg className={styles.root__title__caret} />
        </div>
        <ul className={styles.root__content}>{children}</ul>
      </div>
    </>
  )
}

export default Menu
