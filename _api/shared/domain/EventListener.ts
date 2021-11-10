import Event from './Event'

export default interface EventListener {
  handle(event: Event<unknown>): Promise<void>
}
