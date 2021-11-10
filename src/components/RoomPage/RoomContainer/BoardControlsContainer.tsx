import styles from '@styles/components/RoomPage/BoardControls.module.css'

import React from 'react'
import Room from '../../../types/Room'
import Button from '../../common/Button'
import SelectCardContainer from './SelectCardContainer'
import useRevelCards from '../../../apiClient/useRevealCards'
import useResetRoom from '../../../apiClient/useResetRoom'
import ResultsStatistics from './ResultsStatistics'
import useCurrentUserFromRoom from '../../../hooks/useCurrentUserFromRoom'
import ShowSvg from '@src/components/common/illustrations/ShowSvg'
import CardsSvg from '@src/components/common/illustrations/CardsSvg'
import ResetSvg from '@src/components/common/illustrations/ResetSvg'
import StatsSvg from '@src/components/common/illustrations/StatsSvg'
import FullScreenLoader from '@src/components/common/FullScreenLoader'

interface BoardControlsProps {
  room: Room
}

const BoardControlsContainer = ({ room }: BoardControlsProps) => {
  const [openCardSelector, setOpenCardSelector] = React.useState<boolean>(false)
  const [openStatistics, setOpenStatistics] = React.useState<boolean>(false)

  const { execute: revealCards, status: revealCardsStatus } = useRevelCards()

  const { execute: resetRoom, status: resetRoomStatus } = useResetRoom()

  const isLoading =
    revealCardsStatus === 'loading' || resetRoomStatus === 'loading'

  const handleSelectCard = () => {
    setOpenCardSelector(true)
  }

  const handleCloseSelectCard = () => {
    setOpenCardSelector(false)
  }

  const handleOpenStatistics = () => {
    setOpenStatistics(true)
  }

  const handleCloseStatistics = () => {
    setOpenStatistics(false)
  }

  const handleReveal = () => {
    revealCards({
      roomId: room.id
    })
  }

  const handleResetRoom = () => {
    resetRoom({
      roomId: room.id
    })
  }

  const currentUser = useCurrentUserFromRoom(room)

  return (
    <div className={styles.root}>
      {!room.reveal && currentUser?.isMaster && (
        <Button
          color="secondary"
          className={styles.root__action}
          onClick={handleReveal}
          startIcon={<ShowSvg />}
        >
          Reveal all
        </Button>
      )}

      {room.reveal && currentUser?.isMaster && (
        <Button
          color="primary"
          className={styles.root__action}
          onClick={handleResetRoom}
          startIcon={<ResetSvg />}
        >
          Reset
        </Button>
      )}

      {room.reveal && (
        <Button
          color="secondary"
          className={styles.root__action}
          onClick={handleOpenStatistics}
          startIcon={<StatsSvg />}
        >
          Statistics
        </Button>
      )}

      {!room.reveal && (
        <Button
          color="primary"
          className={styles.root__action}
          onClick={handleSelectCard}
          startIcon={<CardsSvg />}
        >
          Pick card
        </Button>
      )}

      {openCardSelector && !room.reveal && (
        <SelectCardContainer
          room={room}
          onClose={handleCloseSelectCard}
          onCardSelected={handleCloseSelectCard}
        />
      )}

      {openStatistics && room.reveal && (
        <ResultsStatistics room={room} onClose={handleCloseStatistics} />
      )}

      <FullScreenLoader active={isLoading} />
    </div>
  )
}

export default BoardControlsContainer
