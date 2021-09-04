import Event from './Event'

export default interface EventRepository {
  save(event: Event<unknown>): Promise<void>
}
