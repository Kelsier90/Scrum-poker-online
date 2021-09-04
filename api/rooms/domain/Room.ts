import Id from '../../shared/domain/Id'
import RoomUser from './RoomUser'
import RoomIssue from './RoomIssue'

export default interface Room {
  readonly id: Id
  users: RoomUser[]
  reveal: boolean
  issue?: RoomIssue
}
