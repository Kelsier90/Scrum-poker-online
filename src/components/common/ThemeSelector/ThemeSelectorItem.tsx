import styles from '@styles/components/common/ThemeSelectorItem.module.css'

import React from 'react'

const ThemeSelectorItem = ({
  leftIcon,
  title,
  rightIcon
}: {
  leftIcon: React.ReactElement
  title: string
  rightIcon: React.ReactNode
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.root__content}>
        {leftIcon}
        <span>{title}</span>
      </div>
      <div className={styles.root__right}>{rightIcon}</div>
    </div>
  )
}

export default ThemeSelectorItem
