import styles from '@styles/components/RoomPage/SelectCard.module.css'

import React from 'react'
import PokerCard from '../../common/PokerCard'
import Room from '../../../types/Room'
import useSelectCard from '../../../apiClient/useSelectCard'
import Drawer from '../../common/Drawer'
import cardValues from '../../../types/cardValues'

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
  const selectCard = useSelectCard()

  const handleSelectCard = (card: string) => {
    selectCard({
      roomId: room.id,
      card
    })
    onCardSelected(card)
  }

  const cards = cardValues()

  return (
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
  )
}

export default SelectCardContainer
