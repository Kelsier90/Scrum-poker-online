import Room from '../domain/Room'

interface GetRoomResponseSerialized {
  id: string
  users: {
    id: string
    name: string
    isMaster: boolean
    selectedCard: string | null
    hasSelectedCard: boolean
  }[]
  reveal: boolean
  issue?: string
}

export default class GetRoomResponse {
  private room: Room

  constructor(room: Room) {
    this.room = room
  }

  serialize(): GetRoomResponseSerialized {
    return {
      id: this.room.id.getValue(),
      users: this.room.users.map(user => ({
        id: user.id.getValue(),
        name: user.name.getValue(),
        isMaster: user.isMaster,
        selectedCard:
          this.room.reveal && user.selectedCard
            ? user.selectedCard.getValue()
            : null,
        hasSelectedCard: user.selectedCard !== null
      })),
      reveal: this.room.reveal,
      issue: this.room.issue?.getValue()
    }
  }
}
