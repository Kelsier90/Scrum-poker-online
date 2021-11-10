import styles from '@styles/components/RoomPage/SelectCard.module.css'

import React from 'react'
import PokerCard from '../../common/PokerCard'
import Room from '../../../types/Room'
import useSelectCard from '../../../apiClient/useSelectCard'
import Drawer from '../../common/Drawer'
import cardValues from '../../../types/cardValues'
import FullScreenLoader from '@src/components/common/FullScreenLoader'
import { useNotifications } from '@src/components/common/NotificationsProvider'

interface SelectCardContainerProps {
  room: Room
  onClose: () => void
  onCardSelected: (card: string) => void
}

const SelectCardContainer = ({
  room,
  onClose,
  onCardSelected
}: SelectCardContainerProps) => {
  const { execute: selectCard, status } = useSelectCard()

  const { addNotification } = useNotifications()

  const handleSelectCard = (card: string) => {
    selectCard(
      {
        roomId: room.id,
        card
      },
      {
        onSuccess: () => onCardSelected(card),
        onError: error => addNotification('error', error)
      }
    )
  }

  const cards = cardValues()

  return (
    <>
      <Drawer onClose={onClose}>
        <div className={styles.root}>
          {cards.map(card => (
            <PokerCard
              key={card}
              value={card}
              onClick={() => handleSelectCard(card)}
            />
          ))}
        </div>
      </Drawer>

      <FullScreenLoader active={status === 'loading'} />
    </>
  )
}

export default SelectCardContainer
