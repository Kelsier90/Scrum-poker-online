import RoomRepository from '../domain/RoomRepository'
import SelectCardCommand from './SelectCardCommand'
import Id from '../../shared/domain/Id'
import RoomUserId from '../domain/RoomUserId'
import RoomUserCard from '../domain/RoomUserCard'
import ResourceNotFoundError from '@api/shared/domain/errors/ResourceNotFoundError'
import InvalidOperationError from '@api/shared/domain/errors/InvalidOperationError'

export default class SelectCard {
  private repository: RoomRepository

  constructor(repository: RoomRepository) {
    this.repository = repository
  }

  async dispatch(command: SelectCardCommand): Promise<void> {
    const room = await this.repository.find(new Id(command.roomId))
    if (!room) throw new ResourceNotFoundError('Room not found')
    if (room.reveal)
      throw new InvalidOperationError(
        'The card cannot be changed when it has been revealed'
      )

    const userId = new RoomUserId(command.userId)
    const user = room.users.find(
      user => user.id.getValue() === userId.getValue()
    )
    if (!user) throw new ResourceNotFoundError('User not found')

    user.selectedCard = new RoomUserCard(command.card)

    await this.repository.save(room)
  }
}
