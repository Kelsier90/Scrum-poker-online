import React from 'react'
import ClientEvent from '../../shared/types/ClientEvent'
import ApiResponse from '../types/ApiResponse'
import { useSocketContext } from '@src/shared/socket/SocketContextProvider'

export default function useSocketListener(
  channel: string,
  event: ClientEvent,
  callback,
  isError = false,
  listen = true
) {
  const socket = useSocketContext()

  React.useEffect(() => {
    const listener = (data: ApiResponse<unknown>) => {
      callback(isError ? data.message : data.data)
    }

    if (listen) {
      socket.on(channel, event, listener)
    } else {
      socket.off(channel, event, listener)
    }

    return () => {
      if (listen) socket.off(channel, event, listener)
    }
  }, [listen, callback, channel, event, isError, socket])
}
