import EventBus from '@api/shared/domain/EventBus'

export default jest.fn<EventBus, []>(() => ({
  publish: jest.fn()
}))
