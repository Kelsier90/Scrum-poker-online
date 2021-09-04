export default interface Room {
  id: string
  users: RoomUser[]
  reveal: boolean
  issue: string
}

export interface RoomUser {
  id: string
  name: string
  isMaster: boolean
  selectedCard: string | null
  hasSelectedCard: boolean
}
