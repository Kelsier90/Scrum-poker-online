import React from 'react'
import { useSocketContext } from '../shared/socket/SocketContextProvider'
import ServerEvent from '../shared/types/ServerEvent'

interface KickRoomUserInput {
  roomId: string
  userId: string
}

export default function useKickRoomUser(): (data: KickRoomUserInput) => void {
  const socket = useSocketContext()

  return React.useCallback(
    data => {
      socket.send(ServerEvent.KICK_ROOM_USER, data)
    },
    [socket]
  )
}
