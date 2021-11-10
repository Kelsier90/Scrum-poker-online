import styles from '@styles/components/common/FullScreenLoader.module.css'

import React from 'react'
import Loader from '@src/components/common/Loader'
import clsx from 'clsx'

const FullScreenLoader = ({ active = true }) => {
  return (
    <div
      className={clsx(
        styles.root,
        active ? styles['root--status-active'] : styles['root--status-inactive']
      )}
    >
      <Loader />
    </div>
  )
}

export default FullScreenLoader
