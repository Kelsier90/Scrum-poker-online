import Room from './Room'
import Id from '../../shared/domain/Id'

export default interface RoomRepository {
  save(room: Room): Promise<void>
  find(id: Id): Promise<Room | null>
  remove(room: Room): Promise<void>
}
