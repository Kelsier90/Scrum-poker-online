import styles from '@styles/components/common/PokerCard.module.css'

import React from 'react'
import clsx from 'clsx'
import PokerCardInfiniteIcon from './PorkerCardInfiniteIcon'
import PokerCardCoffeeIcon from './PorkerCardCoffeeIcon'

interface PokerCardProps {
  value?: React.ReactNode | null
  status?: 'displayed' | 'selected' | 'unselected'
  onClick?: () => void
  size?: 'small' | 'medium'
}

const PokerCard = ({
  value,
  status = 'displayed',
  onClick,
  size = 'medium'
}: PokerCardProps) => {
  let content = null

  if (status === 'displayed') {
    switch (value) {
      case 'infinite':
        content = <PokerCardInfiniteIcon />
        break
      case 'coffee':
        content = <PokerCardCoffeeIcon />
        break
      default:
        content = value
    }
  }

  return (
    <div
      className={clsx(styles.root, {
        [styles['root--status-reverse']]: status === 'selected',
        [styles['root--status-active']]: status === 'displayed',
        [styles['root--status-inactive']]: status === 'unselected',
        [styles['root--clickable-true']]: onClick !== undefined,
        [styles['root--size-small']]: size === 'small'
      })}
    >
      <div className={styles.root__front} onClick={onClick}>
        {content}
      </div>
      <div className={clsx(styles.root__back)} />
    </div>
  )
}

export default PokerCard
