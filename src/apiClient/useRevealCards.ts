import React from 'react'
import { useSocketContext } from '../shared/socket/SocketContextProvider'
import ServerEvent from '../shared/types/ServerEvent'

interface RevealCardsInput {
  roomId: string
}

export default function useRevelCards(): (data: RevealCardsInput) => void {
  const socket = useSocketContext()

  return React.useCallback(
    data => {
      socket.send(ServerEvent.REVEAL_CARDS, data)
    },
    [socket]
  )
}
