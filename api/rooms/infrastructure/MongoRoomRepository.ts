import RoomRepository from '../domain/RoomRepository'
import Room from '../domain/Room'
import MongoRepository from '../../shared/infrastructure/MongoRepository'
import RoomMongoModelMapper from './RoomMongoModelMapper'
import Id from '../../shared/domain/Id'
import RoomMongoModel from './RoomMongoModel'

export default class MongoRoomRepository
  extends MongoRepository
  implements RoomRepository
{
  save(room: Room): Promise<void> {
    return this.connect().then(async () => {
      const doc = RoomMongoModelMapper.getMongoDoc(room)

      await this.saveDocument(doc)
    })
  }

  find(id: Id): Promise<Room | null> {
    return this.connect().then(async () => {
      const doc = await RoomMongoModel.findById(id.getValue())

      return doc ? RoomMongoModelMapper.getEntity(doc) : null
    })
  }

  remove(room: Room): Promise<void> {
    return this.connect().then(async () => {
      await RoomMongoModel.findByIdAndDelete(room.id.getValue())
    })
  }
}
