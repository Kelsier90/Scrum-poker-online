import Event from '@api/shared/domain/Event'

export default interface EventHandler {
  handle(event: Event): Promise<void>
}
