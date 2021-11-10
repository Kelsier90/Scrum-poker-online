import RemoveRoom from '@api/rooms/application/RemoveRoom'

export default jest.fn<Partial<RemoveRoom>, []>(() => ({
  dispatch: jest.fn()
}))
