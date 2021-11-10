import GetRoom from '@api/rooms/application/GetRoom'

export default jest.fn<Partial<GetRoom>, []>(() => ({
  dispatch: jest.fn()
}))
