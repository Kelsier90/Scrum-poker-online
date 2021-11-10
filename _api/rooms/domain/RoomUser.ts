import RoomUserName from './RoomUserName'
import RoomUserCard from './RoomUserCard'
import RoomUserId from './RoomUserId'

export default interface RoomUser {
  readonly id: RoomUserId
  name: RoomUserName
  isMaster: boolean
  selectedCard: RoomUserCard | null
}
