import styles from '@styles/components/RoomPage/Board.module.css'

import React from 'react'
import Room from '../../../types/Room'
import BoardSlot from './BoardSlot'
import usePromoteRoomUser from '@src/apiClient/usePromoteRoomUser'
import useDemoteRoomUser from '@src/apiClient/useDemoteRoomUser'
import useKickRoomUser from '@src/apiClient/useKickRoomUser'
import { useNotifications } from '@src/components/common/NotificationsProvider'

interface BoardContainerProps {
  room: Room
}

const BoardContainer = ({ room }: BoardContainerProps) => {
  const { execute: PromoteRoomUser } = usePromoteRoomUser()
  const { execute: demoteRoomUser } = useDemoteRoomUser()
  const { execute: kickRoomUser } = useKickRoomUser()

  const { addNotification } = useNotifications()

  const notifyError = (error: string) => addNotification('error', error)

  const handlePromoteUser = userId => {
    PromoteRoomUser({ roomId: room.id, userId }, { onError: notifyError })
  }

  const handleDemoteUser = userId => {
    demoteRoomUser({ roomId: room.id, userId }, { onError: notifyError })
  }

  const handleKickUser = userId => {
    kickRoomUser({ roomId: room.id, userId }, { onError: notifyError })
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
