import RoomRepository from '../domain/RoomRepository'
import GetUserFromRoomQuery from './GetUserFromRoomQuery'
import Id from '../../shared/domain/Id'
import GetUserFromRoomResponse from './GetUserFromRoomResponse'

export default class GetUserFromRoom {
  private repository: RoomRepository

  constructor(repository: RoomRepository) {
    this.repository = repository
  }

  async dispatch(query: GetUserFromRoomQuery): Promise<unknown | null> {
    const room = await this.repository.find(new Id(query.roomId))
    const user = room?.users.find(u => u.id.getValue() === query.userId)
    return user ? new GetUserFromRoomResponse(user).serialize() : null
  }
}
