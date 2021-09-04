import React from 'react'
import { useSocketContext } from '../shared/socket/SocketContextProvider'
import ServerEvent from '../shared/types/ServerEvent'

interface PromoteRoomUserInput {
  roomId: string
  userId: string
}

export default function usePromoteRoomUser(): (
  data: PromoteRoomUserInput
) => void {
  const socket = useSocketContext()

  return React.useCallback(
    data => {
      socket.send(ServerEvent.PROMOTE_ROOM_USER, data)
    },
    [socket]
  )
}
