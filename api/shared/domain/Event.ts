import Id from '@api/shared/domain/Id'
import EventName from '@api/shared/domain/EventName'

export default abstract class Event<Data = unknown, AggregateId = unknown> {
  readonly id: Id
  readonly name: EventName
  static readonly NAME: string
  readonly aggregateId: AggregateId
  readonly data: Data
  readonly date: Date

  constructor(
    id: Id,
    name: EventName,
    aggregateId: AggregateId,
    data: Data,
    date: Date
  ) {
    this.id = id
    this.name = name
    this.aggregateId = aggregateId
    this.data = data
    this.date = date
  }

  abstract getSerializedData(): Record<string, unknown>
  abstract getSerializedAggregateId(): string
}
