import Room from '../types/Room'
import useSocketListener from './core/useSocketListener'
import ClientEvent from '../shared/types/ClientEvent'

export default function useOnUpdateRoom(callback: (room: Room) => void): void {
  useSocketListener(ClientEvent.UPDATED_ROOM, callback)
}
