import React from 'react'
import ClientEvent from '../../shared/types/ClientEvent'
import ApiResponse from '../types/ApiResponse'
import { useSocketContext } from '../../shared/socket/SocketContextProvider'

export default function useSocketListener(
  event: ClientEvent,
  callback,
  isError = false
) {
  const socket = useSocketContext()

  React.useEffect(() => {
    const listener = (data: ApiResponse<unknown>) => {
      callback(isError ? data.message : data.data)
    }
    socket.on(event, listener)

    return () => socket.off(event, listener)
  }, [callback, event, isError, socket])
}
