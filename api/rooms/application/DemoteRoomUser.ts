import RoomRepository from '@api/rooms/domain/RoomRepository'
import DemoteRoomUserCommand from '@api/rooms/application/DemoteRoomUserCommand'
import Id from '@api/shared/domain/Id'
import ResourceNotFoundError from '@api/shared/domain/errors/ResourceNotFoundError'

export default class DemoteRoomUser {
  private repository: RoomRepository

  constructor(repository: RoomRepository) {
    this.repository = repository
  }

  async dispatch(command: DemoteRoomUserCommand): Promise<void> {
    const room = await this.repository.find(new Id(command.roomId))

    if (!room) throw new ResourceNotFoundError('Room not found')

    const user = room.users.find(u => u.id.getValue() === command.userId)

    if (!user) throw new ResourceNotFoundError('User not found')

    user.isMaster = false

    await this.repository.save(room)
  }
}
