import RoomRepositoryMock from './testUtils/RoomRepositoryMock'
import RevealCards from './RevealCards'
import RoomMother from '../domain/testUtils/RoomMother'
import Id from '../../shared/domain/Id'

const repositoryMock = new RoomRepositoryMock()
const handler = new RevealCards(repositoryMock)

describe('RevealCards', () => {
  test('Reveals the cards in a room', async () => {
    const room = RoomMother.random({ reveal: false })

    repositoryMock.find = jest.fn().mockReturnValueOnce(room)

    await handler.dispatch({
      roomId: room.id.getValue()
    })

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toHaveBeenCalledWith(room.id)

    expect(repositoryMock.save).toHaveBeenCalledTimes(1)
    expect(repositoryMock.save).toHaveBeenCalledWith({ ...room, reveal: true })
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
