import Event from '@api/shared/domain/Event'
import Id from '@api/shared/domain/Id'

export default class TestEvent extends Event<{ something: string }, Id> {
  static readonly NAME: string = 'Test'

  getSerializedAggregateId(): string {
    return this.aggregateId.getValue()
  }

  getSerializedData(): Record<string, unknown> {
    return this.data
  }
}
