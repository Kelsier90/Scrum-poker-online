import RoomUserId from '@api/rooms/domain/RoomUserId'
import Id from '@api/shared/domain/Id'
import Event from '@api/shared/domain/Event'
import EventName from '@api/shared/domain/EventName'

type UserHasLeftRoomEventData = { userId: RoomUserId }

export default class UserHasLeftRoomEvent extends Event<
  UserHasLeftRoomEventData,
  Id
> {
  constructor(id: Id, roomId: Id, data: UserHasLeftRoomEventData, date: Date) {
    super(id, new EventName('UserHasLeftRoom'), roomId, data, date)
  }

  static createNew(
    roomId: Id,
    data: UserHasLeftRoomEventData
  ): UserHasLeftRoomEvent {
    return new UserHasLeftRoomEvent(Id.random(), roomId, data, new Date())
  }

  getSerializedAggregateId(): string {
    return this.aggregateId.getValue()
  }

  getSerializedData(): Record<string, unknown> {
    return {
      userId: this.data.userId.getValue()
    }
  }
}
