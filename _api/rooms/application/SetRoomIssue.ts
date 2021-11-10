import RoomRepository from '../domain/RoomRepository'
import SetRoomIssueCommand from './SetRoomIssueCommand'
import Id from '../../shared/domain/Id'
import RoomIssue from '../domain/RoomIssue'
import ResourceNotFoundError from '@api/shared/domain/errors/ResourceNotFoundError'

export default class SetRoomIssue {
  private repository: RoomRepository

  constructor(repository: RoomRepository) {
    this.repository = repository
  }

  async dispatch(command: SetRoomIssueCommand): Promise<void> {
    const room = await this.repository.find(new Id(command.roomId))
    if (!room) throw new ResourceNotFoundError('Room not found')

    room.issue = new RoomIssue(command.issue)

    await this.repository.save(room)
  }
}
