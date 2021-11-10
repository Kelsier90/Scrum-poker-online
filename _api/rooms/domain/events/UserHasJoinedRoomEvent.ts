import RoomUserId from '@api/rooms/domain/RoomUserId'
import Id from '@api/shared/domain/Id'
import Event from '@api/shared/domain/Event'
import EventName from '@api/shared/domain/EventName'

type UserHasJoinedRoomEventData = { userId: RoomUserId }

export default class UserHasJoinedRoomEvent extends Event<
  UserHasJoinedRoomEventData,
  Id
> {
  static readonly NAME = 'UserHasJoinedRoom'

  constructor(
    id: Id,
    roomId: Id,
    data: UserHasJoinedRoomEventData,
    date: Date
  ) {
    super(id, new EventName(UserHasJoinedRoomEvent.NAME), roomId, data, date)
  }

  static createNew(
    roomId: Id,
    data: UserHasJoinedRoomEventData
  ): UserHasJoinedRoomEvent {
    return new UserHasJoinedRoomEvent(Id.random(), roomId, data, new Date())
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
