import RemoveRoom from './RemoveRoom'
import RoomMother from '../domain/testUtils/RoomMother'
import RoomRepositoryMock from './testUtils/RoomRepositoryMock'
import Id from '../../shared/domain/Id'

const repositoryMock = new RoomRepositoryMock()
const handler = new RemoveRoom(repositoryMock)

describe('RemoveRoom', () => {
  test('Removes a room', async () => {
    const room = RoomMother.random()

    repositoryMock.find = jest.fn().mockReturnValueOnce(room)

    await handler.dispatch({ id: room.id.getValue() })

    expect(repositoryMock.remove).toHaveBeenCalledTimes(1)
    expect(repositoryMock.remove).toHaveBeenCalledWith(room)
  })

  test("Doesn't remove a non existing room", async () => {
    repositoryMock.find = jest.fn().mockReturnValueOnce(null)

    await handler.dispatch({ id: Id.random().getValue() })

    expect(repositoryMock.remove).toHaveBeenCalledTimes(0)
  })
})
