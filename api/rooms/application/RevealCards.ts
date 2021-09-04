import RoomRepository from '../domain/RoomRepository'
import RevealCardsCommand from './RevealCardsCommand'
import Id from '../../shared/domain/Id'

export default class RevealCards {
  private repository: RoomRepository

  constructor(repository: RoomRepository) {
    this.repository = repository
  }

  public async dispatch(command: RevealCardsCommand): Promise<void> {
    const room = await this.repository.find(new Id(command.roomId))
    if (!room) throw new Error('Room not found')

    room.reveal = true

    await this.repository.save(room)
  }
}
