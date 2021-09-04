import RoomRepository from '@api/rooms/domain/RoomRepository'
import PromoteRoomUserCommand from '@api/rooms/application/PromoteRoomUserCommand'
import Id from '@api/shared/domain/Id'

export default class PromoteRoomUser {
  private repository: RoomRepository

  constructor(repository: RoomRepository) {
    this.repository = repository
  }

  async dispatch(command: PromoteRoomUserCommand): Promise<void> {
    const room = await this.repository.find(new Id(command.roomId))

    if (!room) throw new Error('Room not found')

    const user = room.users.find(u => u.id.getValue() === command.userId)

    if (!user) throw new Error('User not found')

    user.isMaster = true

    await this.repository.save(room)
  }
}
