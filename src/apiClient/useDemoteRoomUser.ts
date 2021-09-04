import React from 'react'
import { useSocketContext } from '../shared/socket/SocketContextProvider'
import ServerEvent from '../shared/types/ServerEvent'

interface DemoteRoomUserInput {
  roomId: string
  userId: string
}

export default function useDemoteRoomUser(): (
  data: DemoteRoomUserInput
) => void {
  const socket = useSocketContext()

  return React.useCallback(
    data => {
      socket.send(ServerEvent.DEMOTE_ROOM_USER, data)
    },
    [socket]
  )
}
