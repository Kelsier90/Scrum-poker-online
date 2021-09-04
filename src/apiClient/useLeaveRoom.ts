import React from 'react'
import { useSocketContext } from '../shared/socket/SocketContextProvider'
import ServerEvent from '../shared/types/ServerEvent'

interface LeaveRoomInput {
  id: string
}

export default function useLeaveRoom(): (data: LeaveRoomInput) => void {
  const socket = useSocketContext()

  return React.useCallback(
    data => {
      socket.send(ServerEvent.LEAVE_ROOM, data)
    },
    [socket]
  )
}
