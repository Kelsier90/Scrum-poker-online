import useSocketListener from './core/useSocketListener'
import ClientEvent from '../shared/types/ClientEvent'
import { RoomUser } from '@src/types/Room'

export default function useOnUserLeftRoom(
  callback: (data: RoomUser) => void
): void {
  useSocketListener(ClientEvent.USER_LEFT_ROOM, callback)
}
