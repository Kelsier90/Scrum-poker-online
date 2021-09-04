import React from 'react'
import styles from '@styles/components/common/Container.module.css'

const Container = ({ children }: { children: unknown }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__content}>{children}</div>
    </div>
  )
}

export default Container
