import styles from '@styles/components/RoomPage/Board.module.css'

import React from 'react'
import Room from '../../../types/Room'
import BoardSlot from './BoardSlot'
import usePromoteRoomUser from '@src/apiClient/usePromoteRoomUser'
import useDemoteRoomUser from '@src/apiClient/useDemoteRoomUser'
import useKickRoomUser from '@src/apiClient/useKickRoomUser'

interface BoardContainerProps {
  room: Room
}

const BoardContainer = ({ room }: BoardContainerProps) => {
  const promoteUser = usePromoteRoomUser()
  const demoteUser = useDemoteRoomUser()
  const kickUser = useKickRoomUser()

  const handlePromoteUser = userId => {
    promoteUser({ roomId: room.id, userId })
  }

  const handleDemoteUser = userId => {
    demoteUser({ roomId: room.id, userId })
  }

  const handleKickUser = userId => {
    kickUser({ roomId: room.id, userId })
  }

  return (
    <div className={styles.root}>
      {room.users.map(user => (
        <BoardSlot
          key={user.id}
          user={user}
          room={room}
          onPromoteUser={() => handlePromoteUser(user.id)}
          onDemoteUser={() => handleDemoteUser(user.id)}
          onKickUser={() => handleKickUser(user.id)}
        />
      ))}
    </div>
  )
}

export default BoardContainer
