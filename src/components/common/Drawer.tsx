import styles from '@styles/components/common/Drawer.module.css'

import React from 'react'
import Button from './Button'

interface DrawerProps {
  onClose: () => void
  children: unknown
}

const Drawer = ({ onClose, children }: DrawerProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.root__actions}>
        <Button size="lg" color="transparent" compact onClick={onClose}>
          &times;
        </Button>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Drawer
