import Room from '../Room'
import Id from '../../../shared/domain/Id'
import RoomUserId from '../RoomUserId'
import RoomUserName from '../RoomUserName'
import CreateRoomCommand from '../../application/CreateRoomCommand'
import RoomUserMother from './RoomUserMother'

export default abstract class RoomMother {
  public static random(room: Partial<Room> = {}): Room {
    return {
      id: Id.random(),
      users: [RoomUserMother.random()],
      reveal: false,
      ...room
    }
  }

  static fromCreateCommand(command: CreateRoomCommand): Room {
    return {
      id: new Id(command.id),
      users: [
        {
          id: new RoomUserId(command.userId),
          name: new RoomUserName(command.userName),
          isMaster: true,
          selectedCard: null
        }
      ],
      reveal: false
    }
  }
}
