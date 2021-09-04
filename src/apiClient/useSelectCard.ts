import React from 'react'
import { useSocketContext } from '../shared/socket/SocketContextProvider'
import ServerEvent from '../shared/types/ServerEvent'

interface SelectCardInput {
  roomId: string
  card: string
}

export default function useSelectCard(): (data: SelectCardInput) => void {
  const socket = useSocketContext()

  return React.useCallback(
    data => {
      socket.send(ServerEvent.SELECT_CARD, data)
    },
    [socket]
  )
}
