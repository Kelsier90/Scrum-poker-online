import React from 'react'
import ApiClient from '@src/apiClient/core/ApiClient'
import { useSocketContext } from '@src/shared/socket/SocketContextProvider'

export default function useApiClient(): ApiClient {
  const socket = useSocketContext()

  const socketId = socket.getId()

  return React.useMemo(() => new ApiClient(socketId), [socketId])
}
