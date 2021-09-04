import React from 'react'
import { useSocketContext } from '../shared/socket/SocketContextProvider'
import ServerEvent from '../shared/types/ServerEvent'

interface ResetRoomInput {
  roomId: string
}

export default function useResetRoom(): (data: ResetRoomInput) => void {
  const socket = useSocketContext()

  return React.useCallback(
    data => {
      socket.send(ServerEvent.RESET_ROOM, data)
    },
    [socket]
  )
}
