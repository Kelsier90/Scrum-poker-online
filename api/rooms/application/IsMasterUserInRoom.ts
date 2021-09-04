import RoomRepository from '../domain/RoomRepository'
import IsMasterUserInRoomQuery from './IsMasterUserInRoomQuery'
import Id from '../../shared/domain/Id'

export default class IsMasterUserInRoom {
  private repository: RoomRepository

  constructor(repository: RoomRepository) {
    this.repository = repository
  }

  async dispatch(query: IsMasterUserInRoomQuery): Promise<boolean> {
    const room = await this.repository.find(new Id(query.roomId))

    if (!room) return false

    return !!room.users.find(
      u => u.id.getValue() === query.userId && u.isMaster
    )
  }
}
