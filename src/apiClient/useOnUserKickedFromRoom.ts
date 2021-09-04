import useSocketListener from './core/useSocketListener'
import ClientEvent from '../shared/types/ClientEvent'
import { RoomUser } from '@src/types/Room'

export default function useOnUserKickedFromRoom(
  callback: (data: RoomUser) => void
): void {
  useSocketListener(ClientEvent.USER_KICKED_FROM_ROOM, callback)
}
