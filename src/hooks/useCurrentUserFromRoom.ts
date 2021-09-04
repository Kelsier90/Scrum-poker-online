import Room, { RoomUser } from '../types/Room'
import useUser from '../shared/user/useUser'

export default function useCurrentUserFromRoom(
  room: Room
): RoomUser | undefined {
  const { id } = useUser()

  return room.users.find(user => user.id === id)
}
