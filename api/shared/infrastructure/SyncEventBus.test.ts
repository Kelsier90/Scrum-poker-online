import SyncEventBus from '@api/shared/infrastructure/SyncEventBus'
import EventHandlerMock from '@api/shared/domain/testUtils/EventHandlerMock'
import TestEvent from '@api/shared/domain/testUtils/TestEvent'
import EventRepositoryMock from '@api/shared/domain/testUtils/EventRepositoryMock'
import EventMother from '@api/shared/domain/testUtils/EventMother'

describe('SyncEventBus', () => {
  test('Publish an event', async () => {
    const eventHandlerMock = new EventHandlerMock()
    const eventRepositoryMock = new EventRepositoryMock()

    const eventBus = new SyncEventBus(
      {
        [TestEvent.NAME]: [() => eventHandlerMock]
      },
      eventRepositoryMock
    )

    const event = EventMother.random()

    await eventBus.publish([event])

    expect(eventRepositoryMock.save).toHaveBeenCalledTimes(1)
    expect(eventRepositoryMock.save).toHaveBeenCalledWith(event)

    expect(eventHandlerMock.handle).toHaveBeenCalledTimes(1)
    expect(eventHandlerMock.handle).toHaveBeenCalledWith(event)
  })
})
