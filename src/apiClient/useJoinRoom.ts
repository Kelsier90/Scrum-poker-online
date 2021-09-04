import Room from '../types/Room'
import ServerEvent from '../shared/types/ServerEvent'
import ClientEvent from '../shared/types/ClientEvent'
import useSocketSendWithListener from './core/useSocketSendWithListener'

interface JoinRoomInput {
  id: string
  userName: string
}

export default function useJoinRoom(): (
  data: JoinRoomInput,
  callback: (data: Room) => void,
  onError?: (message: string) => void
) => void {
  return useSocketSendWithListener(
    ServerEvent.JOIN_ROOM,
    ClientEvent.JOINED_TO_ROOM
  )
}
