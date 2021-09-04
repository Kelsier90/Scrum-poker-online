import RoomRepository from '../domain/RoomRepository'
import CreateRoomCommand from './CreateRoomCommand'
import Id from '../../shared/domain/Id'
import RoomUserId from '../domain/RoomUserId'
import RoomUserName from '../domain/RoomUserName'
import EventBus from '@api/shared/domain/EventBus'
import RoomCreatedEvent from '@api/rooms/domain/events/RoomCreatedEvent'

export default class CreateRoom {
  private repository: RoomRepository
  private eventBus: EventBus

  constructor(repository: RoomRepository, eventBus: EventBus) {
    this.repository = repository
    this.eventBus = eventBus
  }

  public async dispatch(command: CreateRoomCommand): Promise<void> {
    const id = new Id(command.id)
    const userId = new RoomUserId(command.userId)

    await this.repository.save({
      id,
      users: [
        {
          id: userId,
          name: new RoomUserName(command.userName),
          isMaster: true,
          selectedCard: null
        }
      ],
      reveal: false
    })

    await this.eventBus.publish([RoomCreatedEvent.createNew(id, { userId })])
  }
}
