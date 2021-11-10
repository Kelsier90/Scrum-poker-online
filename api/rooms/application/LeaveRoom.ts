import RoomRepository from '../domain/RoomRepository'
import LeaveRoomCommand from './LeaveRoomCommand'
import Id from '../../shared/domain/Id'
import EventBus from '@api/shared/domain/EventBus'
import UserHasLeftRoomEvent from '@api/rooms/domain/events/UserHasLeftRoomEvent'
import RoomUserId from '@api/rooms/domain/RoomUserId'

export default class LeaveRoom {
  private repository: RoomRepository
  private eventBus: EventBus

  constructor(repository: RoomRepository, eventBus: EventBus) {
    this.repository = repository
    this.eventBus = eventBus
  }

  async dispatch(command: LeaveRoomCommand): Promise<void> {
    const room = await this.repository.find(new Id(command.roomId))

    if (!room) return Promise.resolve()

    const userId = new RoomUserId(command.userId)
    room.users = room.users.filter(
      user => user.id.getValue() !== userId.getValue()
    )

    // If there are still users in the room and there is no leader,
    // make the first leader
    if (room.users.length > 0 && !room.users.find(user => user.isMaster)) {
      room.users[0].isMaster = true
    }

    await this.repository.save(room)

    await this.eventBus.publish([
      UserHasLeftRoomEvent.createNew(room.id, { userId })
    ])
  }
}
