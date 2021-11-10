import EventBus from '@api/shared/domain/EventBus'
import Event from '../domain/Event'
import EventRepository from '@api/shared/domain/EventRepository'
import EventHandler from '@api/shared/domain/EventHandler'

type EventHandlerFactory = () => EventHandler

export default class SyncEventBus implements EventBus {
  private readonly map: Record<string, EventHandlerFactory[]>
  private readonly repository: EventRepository

  constructor(
    map: Record<string, EventHandlerFactory[]>,
    repository: EventRepository
  ) {
    this.map = map
    this.repository = repository
  }

  async publish(events: Event<unknown>[]): Promise<void> {
    for (const event of events) {
      await this.repository.save(event)

      const binds = this.map[event.name.getValue()]

      if (!binds) continue

      for (const factory of binds) {
        const eventHandler = factory()
        await eventHandler.handle(event)
      }
    }
  }
}
