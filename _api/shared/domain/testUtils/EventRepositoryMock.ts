import EventRepository from '@api/shared/domain/EventRepository'

export default jest.fn<EventRepository, []>(() => ({
  save: jest.fn()
}))
