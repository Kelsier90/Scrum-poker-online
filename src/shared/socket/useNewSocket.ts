import ClientEvent from '../types/ClientEvent'
import ApiResponse from '../../apiClient/types/ApiResponse'
import Pusher, { Channel } from 'pusher-js'
import { PUSHER_CLUSTER, PUSHER_KEY } from '@src/utils/browserEnv'

export type SocketAbstractionState =
  | 'connecting'
  | 'connected'
  | 'unavailable'
  | 'not-supported'
  | 'disconnected'

interface SocketAbstractionOptions {
  onConnectionChange?: (state: SocketAbstractionState) => void
}

export class SocketAbstraction {
  private socket: Pusher
  private subscribedChannels: Record<string, Channel> = {}

  constructor(pusher: Pusher, opts?: SocketAbstractionOptions) {
    this.socket = pusher
    if (opts?.onConnectionChange) {
      this.socket.connection
        .bind('connecting', () => opts.onConnectionChange('connecting'))
        .bind('connected', () => opts.onConnectionChange('connected'))
        .bind('unavailable', () => opts.onConnectionChange('unavailable'))
        .bind('failed', () => opts.onConnectionChange('not-supported'))
        .bind('disconnected', () => opts.onConnectionChange('disconnected'))
    }
  }

  getId(): string {
    return this.socket.connection.socket_id
  }

  on<T = unknown>(
    channelName: string,
    event: ClientEvent,
    callback: (data: ApiResponse<T>) => void
  ) {
    const channel = this.socket.subscribe(channelName)
    this.subscribedChannels[channelName] = channel
    channel.bind(event, callback)
  }

  off<T = unknown>(
    channelName: string,
    event: ClientEvent,
    callback: (data: ApiResponse<T>) => void
  ) {
    const channel = this.subscribedChannels[channelName]
    if (channel) channel.unbind(event, callback)
  }
}

const pusher = new Pusher(PUSHER_KEY, {
  cluster: PUSHER_CLUSTER,
  authEndpoint: '/api/auth-channel'
})

export default function useNewSocket(opts?: SocketAbstractionOptions) {
  return new SocketAbstraction(pusher, opts)
}
