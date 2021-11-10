import Event from './Event'

export default interface EventBus {
  publish(events: Event<unknown>[]): Promise<void>
}
