import styles from '@styles/components/RoomPage/ResultStadistics.module.css'

import React from 'react'
import Drawer from '../../common/Drawer'
import Room from '../../../types/Room'
import PokerCard from '../../common/PokerCard'
import clsx from 'clsx'

interface ResultStatisticsProps {
  room: Room
  onClose: () => void
}

const ResultStatistics = ({ room, onClose }: ResultStatisticsProps) => {
  const stats: Record<string, number> = {}

  let participantsCount = 0

  room.users.forEach(user => {
    if (user.selectedCard === null) return

    if (stats[user.selectedCard] === undefined) stats[user.selectedCard] = 0
    stats[user.selectedCard] += 1

    participantsCount++
  })

  const values = Object.values(stats)
  const maxValue = values.length > 0 ? Math.max(...values) : 0

  return (
    <Drawer onClose={onClose}>
      <div className={styles.root}>
        <div className={styles.root__chart}>
          {Object.keys(stats).map(card => (
            <div key={card} className={styles.root__chart__line}>
              <div className={styles.root__chart__line__yaxis}>
                <PokerCard status="displayed" value={card} size="small" />
              </div>

              <div className={styles.root__chart__line__content}>
                <div
                  className={clsx(styles.root__chart__line__content__bar, {
                    [styles['root__chart__line__content__bar--featured-true']]:
                      maxValue === stats[card]
                  })}
                  style={{
                    width:
                      maxValue === 0
                        ? '100%'
                        : (stats[card] / maxValue) * 100 + '%'
                  }}
                />

                <div
                  className={clsx(styles.root__chart__line__content__value, {
                    [styles[
                      'root__chart__line__content__value--featured-true'
                    ]]: maxValue === stats[card]
                  })}
                >
                  {stats[card]}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.root__participants}>
          {participantsCount} of {room.users.length} user
          {room.users.length > 1 ? 's' : ''} have been participated
        </div>
      </div>
    </Drawer>
  )
}

export default ResultStatistics
