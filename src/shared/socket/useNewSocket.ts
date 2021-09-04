import React from 'react'
import SocketIOClient, { Socket } from 'socket.io-client'
import { APP_BASE_URL } from '../../utils/browserEnv'
import ServerEvent from '../types/ServerEvent'
import ClientEvent from '../types/ClientEvent'
import ApiResponse from '../../apiClient/types/ApiResponse'

export class SocketAbstraction {
  private socket: Socket

  constructor(socket: Socket) {
    this.socket = socket
  }

  getId(): Promise<string> {
    return new Promise<string>(resolve => {
      if (this.socket.id) resolve(this.socket.id)
      this.socket.on('connect', () => {
        resolve(this.socket.id)
      })
    })
  }

  on<T = unknown>(
    event: ClientEvent,
    callback: (data: ApiResponse<T>) => void
  ) {
    this.socket.on(event, callback)
  }

  off<T = unknown>(
    event: ClientEvent,
    callback: (data: ApiResponse<T>) => void
  ) {
    this.socket.off(event, callback)
  }

  send(event: ServerEvent, data: unknown) {
    this.socket.emit(event, data)
  }
}

export default function useNewSocket() {
  const [socket] = React.useState(() =>
    SocketIOClient(APP_BASE_URL, { path: '/api/socket' })
  )

  React.useEffect((): (() => void) => () => socket.disconnect(), [socket])

  return new SocketAbstraction(socket)
}
