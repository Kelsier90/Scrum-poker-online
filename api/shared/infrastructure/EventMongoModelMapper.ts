import Event from '@api/shared/domain/Event'
import EventMongoModel, {
  EventMongoDoc
} from '@api/shared/infrastructure/EventMongoModel'

export default abstract class EventMongoModelMapper {
  public static getMongoDoc(entity: Event<unknown>): EventMongoDoc {
    return new EventMongoModel({
      _id: entity.id.getValue(),
      name: entity.name.getValue(),
      aggregateId: entity.getSerializedAggregateId(),
      data: entity.getSerializedData(),
      date: entity.date
    })
  }
}
