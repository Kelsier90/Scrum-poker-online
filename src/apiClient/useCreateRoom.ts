import Room from '../types/Room'
import ServerEvent from '../shared/types/ServerEvent'
import ClientEvent from '../shared/types/ClientEvent'
import useSocketSendWithListener from './core/useSocketSendWithListener'

interface CreateRoomInput {
  userName: string
}

export default function useCreateRoom(): (
  data: CreateRoomInput,
  callback: (data: Room) => void,
  onError?: (message: string) => void
) => void {
  return useSocketSendWithListener(
    ServerEvent.CREATE_ROOM,
    ClientEvent.JOINED_TO_ROOM
  )
}
