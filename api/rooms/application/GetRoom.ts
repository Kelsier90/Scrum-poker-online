import RoomRepository from '../domain/RoomRepository'
import GetRoomQuery from './GetRoomQuery'
import Id from '../../shared/domain/Id'
import GetRoomResponse from './GetRoomResponse'

export default class GetRoom {
  private repository: RoomRepository

  constructor(repository: RoomRepository) {
    this.repository = repository
  }

  async dispatch(query: GetRoomQuery): Promise<unknown | null> {
    const room = await this.repository.find(new Id(query.id))

    return room ? new GetRoomResponse(room).serialize() : null
  }
}
