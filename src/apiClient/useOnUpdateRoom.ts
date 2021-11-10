import Room from '../types/Room'
import useSocketListener from './core/useSocketListener'
import ClientEvent from '../shared/types/ClientEvent'
import { composeRoomChannel } from '@src/shared/rooms/utils/roomChannel'

export default function useOnUpdateRoom(
  roomId: string,
  callback: (room: Room) => void,
  listen = true
): void {
  useSocketListener(
    composeRoomChannel(roomId),
    ClientEvent.UPDATED_ROOM,
    callback,
    false,
    listen
  )
}
