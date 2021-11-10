import EventHandler from '@api/shared/domain/EventHandler'

export default jest.fn<EventHandler, []>(() => ({
  handle: jest.fn()
}))
