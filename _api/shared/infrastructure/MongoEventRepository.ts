import MongoRepository from '@api/shared/infrastructure/MongoRepository'
import EventRepository from '@api/shared/domain/EventRepository'
import Event from '@api/shared/domain/Event'
import EventMongoModelMapper from '@api/shared/infrastructure/EventMongoModelMapper'

export default class MongoEventRepository
  extends MongoRepository
  implements EventRepository
{
  save(event: Event<unknown>): Promise<void> {
    return this.connect().then(async () => {
      const doc = EventMongoModelMapper.getMongoDoc(event)

      await this.saveDocument(doc)
    })
  }
}
