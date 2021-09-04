import styles from '@styles/components/common/Row.module.css'

import React from 'react'
import clsx from 'clsx'

interface RowProps {
  alignItems?: string
  justifyContent?: string
  spacing?: 0 | 1 | 2
  children: unknown
}

const Row = ({
  alignItems,
  justifyContent,
  children,
  spacing = 1
}: RowProps) => {
  return (
    <div
      className={clsx(styles.root, styles[`root--spacing-${spacing}`])}
      style={{ alignItems, justifyContent }}
    >
      {children}
    </div>
  )
}

export default Row
