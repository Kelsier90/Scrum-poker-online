import EventBus from '@api/shared/domain/EventBus'
import Event from '../domain/Event'
import EventRepository from '@api/shared/domain/EventRepository'

export default class SyncEventBus implements EventBus {
  private readonly repository: EventRepository

  constructor(repository: EventRepository) {
    this.repository = repository
  }

  async publish(events: Event<unknown>[]): Promise<void> {
    for (const event of events) {
      await this.repository.save(event)
    }
  }
}
