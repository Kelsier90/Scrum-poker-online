import RoomUser from '@api/rooms/domain/RoomUser'

export interface GetUserFromRoomResponseSerialized {
  id: string
  name: string
  isMaster: boolean
}

export default class GetUserFromRoomResponse {
  private user: RoomUser

  constructor(user: RoomUser) {
    this.user = user
  }

  serialize(): GetUserFromRoomResponseSerialized {
    return {
      id: this.user.id.getValue(),
      name: this.user.name.getValue(),
      isMaster: this.user.isMaster
    }
  }
}
