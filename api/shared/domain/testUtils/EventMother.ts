import TestEvent from '@api/shared/domain/testUtils/TestEvent'
import Id from '@api/shared/domain/Id'
import EventName from '@api/shared/domain/EventName'

export default abstract class EventMother {
  static random(): TestEvent {
    return new TestEvent(
      Id.random(),
      new EventName(TestEvent.NAME),
      Id.random(),
      { something: 'whatever' },
      new Date()
    )
  }
}
