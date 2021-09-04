import React from 'react'
import clsx from 'clsx'

import styles from '@styles/components/common/Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <svg viewBox="25 25 50 50" className={styles.loader}>
        <circle className={styles.path} cx="50" cy="50" r="20" fill="none" />

        <circle
          className={clsx(styles.path, styles.reverse)}
          cx="50"
          cy="50"
          r="15"
          fill="none"
        />

        <circle className={styles.path} cx="50" cy="50" r="10" fill="none" />

        <circle
          className={clsx(styles.path, styles.reverse)}
          cx="50"
          cy="50"
          r="5"
          fill="none"
        />
      </svg>
    </div>
  )
}

export default Loader
