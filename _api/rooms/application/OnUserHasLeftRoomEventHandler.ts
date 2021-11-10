import EventHandler from '@api/shared/domain/EventHandler'
import GetRoom from '@api/rooms/application/GetRoom'
import RemoveRoom from '@api/rooms/application/RemoveRoom'
import UserHasJoinedRoomEvent from '@api/rooms/domain/events/UserHasJoinedRoomEvent'

export default class OnUserHasLeftRoomEventHandler implements EventHandler {
  private getRoom: GetRoom
  private removeRoom: RemoveRoom

  constructor(getRoom: GetRoom, removeRoom: RemoveRoom) {
    this.getRoom = getRoom
    this.removeRoom = removeRoom
  }

  async handle(event: UserHasJoinedRoomEvent): Promise<void> {
    const room = await this.getRoom.dispatch({
      id: event.aggregateId.getValue()
    })

    if (!room) return

    if (room.users.length === 0) {
      await this.removeRoom.dispatch({ id: room.id })
    }
  }
}
