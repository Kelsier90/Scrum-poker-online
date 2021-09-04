import React from 'react'
import { useSocketContext } from '../shared/socket/SocketContextProvider'
import ServerEvent from '../shared/types/ServerEvent'

interface SelectCardInput {
  roomId: string
  issue: string
}

export default function useSetRoomIssue(): (data: SelectCardInput) => void {
  const socket = useSocketContext()

  return React.useCallback(
    data => {
      socket.send(ServerEvent.SET_ROOM_ISSUE, data)
    },
    [socket]
  )
}
