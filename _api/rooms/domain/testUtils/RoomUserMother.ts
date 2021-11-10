import RoomUser from '../RoomUser'
import RoomUserId from '../RoomUserId'
import RoomUserName from '../RoomUserName'
import RoomUserCard from '../RoomUserCard'

export default abstract class RoomUserMother {
  public static random(user: Partial<RoomUser> = {}): RoomUser {
    return {
      id: RoomUserId.random(),
      name: new RoomUserName('John'),
      selectedCard: new RoomUserCard('2'),
      isMaster: true,
      ...user
    }
  }
}
