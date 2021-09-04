import RoomRepository from '../domain/RoomRepository'
import JoinRoomCommand from './JoinRoomCommand'
import Id from '../../shared/domain/Id'
import RoomUserId from '../domain/RoomUserId'
import RoomUserName from '../domain/RoomUserName'
import EventBus from '@api/shared/domain/EventBus'
import UserHasJoinedRoomEvent from '@api/rooms/domain/events/UserHasJoinedRoomEvent'

export default class JoinRoom {
  private repository: RoomRepository
  private eventBus: EventBus

  constructor(repository: RoomRepository, eventBus: EventBus) {
    this.eventBus = eventBus
    this.repository = repository
  }

  async dispatch(command: JoinRoomCommand): Promise<void> {
    const room = await this.repository.find(new Id(command.id))

    if (!room) throw new Error('Room not found')

    const userId = new RoomUserId(command.userId)
    // If the user is currently in the room there is nothing to do
    if (room.users.find(user => user.id.getValue() === userId.getValue()))
      return Promise.resolve()

    room.users.push({
      id: new RoomUserId(command.userId),
      name: new RoomUserName(command.userName),
      isMaster: room.users.filter(u => u.isMaster).length === 0,
      selectedCard: null
    })

    await this.repository.save(room)

    await this.eventBus.publish([
      UserHasJoinedRoomEvent.createNew(room.id, { userId })
    ])
  }
}
