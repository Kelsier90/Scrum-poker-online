import GetRoom from './GetRoom'
import RoomMother from '../domain/testUtils/RoomMother'
import RoomRepositoryMock from './testUtils/RoomRepositoryMock'
import GetRoomResponse from './GetRoomResponse'
import Id from '../../shared/domain/Id'

const repositoryMock = new RoomRepositoryMock()
const getter = new GetRoom(repositoryMock)

describe('GetRoom', () => {
  test('get a existing room', async () => {
    const room = RoomMother.random()

    repositoryMock.find = jest.fn().mockReturnValueOnce(Promise.resolve(room))

    const query = { id: room.id.getValue() }
    const response = await getter.dispatch(query)

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toHaveBeenCalledWith(room.id)
    expect(response).toEqual(new GetRoomResponse(room).serialize())
  })

  test('return null when a room doesnt exists', async () => {
    repositoryMock.find = jest.fn().mockReturnValueOnce(Promise.resolve(null))

    const id = Id.random()
    const query = { id: id.getValue() }
    const response = await getter.dispatch(query)

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toHaveBeenCalledWith(id)
    expect(response).toBeNull()
  })
})
