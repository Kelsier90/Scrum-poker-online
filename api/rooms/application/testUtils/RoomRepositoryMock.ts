import RoomRepository from '../../domain/RoomRepository'

export default jest.fn<RoomRepository, []>(() => ({
  save: jest.fn(),
  find: jest.fn(),
  remove: jest.fn()
}))
