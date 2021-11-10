import UserHasLeftRoomEvent from '@api/rooms/domain/events/UserHasLeftRoomEvent'
import Container from '@api/shared/Container'

export default {
  [UserHasLeftRoomEvent.NAME]: [
    () => Container.getOnUserHasLeftRoomEventHandler()
  ]
}
