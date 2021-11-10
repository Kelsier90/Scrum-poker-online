import RoomRepository from '../domain/RoomRepository'
import RemoveRoomCommand from './RemoveRoomCommand'
import Id from '../../shared/domain/Id'

export default class RemoveRoom {
  private repository: RoomRepository

  constructor(repository: RoomRepository) {
    this.repository = repository
  }

  public async dispatch(command: RemoveRoomCommand): Promise<void> {
    const room = await this.repository.find(new Id(command.id))
    if (room) await this.repository.remove(room)
  }
}
