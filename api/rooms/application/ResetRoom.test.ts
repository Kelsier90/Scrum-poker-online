import RoomRepositoryMock from './testUtils/RoomRepositoryMock'
import ResetRoom from './ResetRoom'
import RoomMother from '../domain/testUtils/RoomMother'
import RoomUserMother from '../domain/testUtils/RoomUserMother'
import RoomUserCard from '../domain/RoomUserCard'
import Id from '../../shared/domain/Id'

const repositoryMock = new RoomRepositoryMock()
const handler = new ResetRoom(repositoryMock)

describe('ResetRoom', () => {
  test('Hide and remove the cards in a room', async () => {
    const room = RoomMother.random({
      reveal: true,
      users: [
        RoomUserMother.random({
          selectedCard: new RoomUserCard('1')
        })
      ]
    })

    repositoryMock.find = jest.fn().mockReturnValueOnce(room)

    await handler.dispatch({
      roomId: room.id.getValue()
    })

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toHaveBeenCalledWith(room.id)

    expect(repositoryMock.save).toHaveBeenCalledTimes(1)
    expect(repositoryMock.save).toHaveBeenCalledWith({
      ...room,
      users: [{ ...room.users[0], selectedCard: null }],
      reveal: false
    })
  })

  test("Throws an error when the room doesn't exists", async () => {
    const roomId = Id.random()

    repositoryMock.find = jest.fn().mockReturnValueOnce(null)

    await expect(
      handler.dispatch({
        roomId: roomId.getValue()
      })
    ).rejects.toThrow()
  })
})
