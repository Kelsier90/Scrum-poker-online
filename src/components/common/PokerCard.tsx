import styles from '../../../styles/components/common/PokerCard.module.css'

import React from 'react'
import clsx from 'clsx'

interface PokerCardProps {
  value: string
  active: boolean
}

const PokerCard = ({ value, active }: PokerCardProps) => {
  return (
    <div
      className={clsx(
        styles.card,
        !active ? styles['card--status-inactive'] : null
      )}
    >
      {value}
    </div>
  )
}

export default PokerCard
