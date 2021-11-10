import Event from '@api/shared/domain/Event'
import EventName from '@api/shared/domain/EventName'
import Id from '@api/shared/domain/Id'
import RoomUserId from '@api/rooms/domain/RoomUserId'

type RoomCreatedDataType = { userId: RoomUserId }

export default class RoomCreatedEvent extends Event<RoomCreatedDataType, Id> {
  static readonly NAME = 'RoomCreated'

  constructor(id: Id, roomId: Id, data: RoomCreatedDataType, date: Date) {
    super(id, new EventName(RoomCreatedEvent.NAME), roomId, data, date)
  }

  static createNew(roomId: Id, data: RoomCreatedDataType): RoomCreatedEvent {
    return new RoomCreatedEvent(Id.random(), roomId, data, new Date())
  }

  getSerializedData(): Record<string, unknown> {
    return {
      userId: this.data.userId.getValue()
    }
  }

  getSerializedAggregateId(): string {
    return this.aggregateId.getValue()
  }
}
