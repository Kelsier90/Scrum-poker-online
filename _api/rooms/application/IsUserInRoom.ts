import RoomRepository from '../domain/RoomRepository'
import IsUserInRoomQuery from './IsUserInRoomQuery'
import Id from '../../shared/domain/Id'

export default class IsUserInRoom {
  private repository: RoomRepository

  constructor(repository: RoomRepository) {
    this.repository = repository
  }

  async dispatch(query: IsUserInRoomQuery): Promise<boolean> {
    const room = await this.repository.find(new Id(query.roomId))

    if (!room) return false

    return !!room.users.find(u => u.id.getValue() === query.userId)
  }
}
