import styles from '@styles/components/common/WarningMessage.module.css'

import React from 'react'

const WarningMessage = ({ children }: { children: unknown }) => {
  return <div className={styles.root}>{children}</div>
}

export default WarningMessage
