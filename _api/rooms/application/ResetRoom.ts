import RoomRepository from '../domain/RoomRepository'
import ResetRoomCommand from './ResetRoomCommand'
import Id from '../../shared/domain/Id'
import ResourceNotFoundError from '@api/shared/domain/errors/ResourceNotFoundError'

export default class ResetRoom {
  private repository: RoomRepository

  constructor(repository: RoomRepository) {
    this.repository = repository
  }

  async dispatch(command: ResetRoomCommand): Promise<void> {
    const room = await this.repository.find(new Id(command.roomId))
    if (!room) throw new ResourceNotFoundError('Room not found')

    room.reveal = false
    room.users = room.users.map(user => ({ ...user, selectedCard: null }))

    await this.repository.save(room)
  }
}
