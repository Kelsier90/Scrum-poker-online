import React from 'react'
import ClientEvent from '../../shared/types/ClientEvent'
import ServerEvent from '../../shared/types/ServerEvent'
import { useSocketContext } from '../../shared/socket/SocketContextProvider'
import ApiResponse from '../types/ApiResponse'

type Output<InputType, OutputType> = (
  data: InputType,
  callback: (data: OutputType) => void,
  onError?: (message: string) => void
) => void

type Listener<T> = (data: ApiResponse<T>) => void

export default function useSocketSendWithListener<InputType, OutputType>(
  eventToSend: ServerEvent,
  eventToListen: ClientEvent
): Output<InputType, OutputType> {
  const socket = useSocketContext()
  const [listener, setListener] = React.useState<Listener<OutputType>>(null)

  React.useEffect(() => {
    if (listener) socket.on(eventToListen, listener)

    return () => {
      if (listener) socket.off(eventToListen, listener)
    }
  }, [eventToListen, listener, socket])

  return React.useCallback(
    (data, callback, onError) => {
      setListener(() => data => {
        if (data.ok) {
          callback(data.data)
        } else {
          if (onError) onError(data.message)
        }
      })
      socket.send(eventToSend, data)
    },
    [eventToSend, socket]
  )
}
