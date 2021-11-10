import RoomRepositoryMock from './testUtils/RoomRepositoryMock'
import SelectCard from './SelectCard'
import RoomMother from '../domain/testUtils/RoomMother'
import RoomUserMother from '../domain/testUtils/RoomUserMother'
import RoomUserId from '../domain/RoomUserId'
import RoomUserCard from '../domain/RoomUserCard'
import Id from '../../shared/domain/Id'

const repositoryMock = new RoomRepositoryMock()
const handler = new SelectCard(repositoryMock)

describe('SelectCard', () => {
  test('Saves the selected card on an existing user and room', async () => {
    const userId = RoomUserId.random()

    const room = RoomMother.random({
      users: [
        RoomUserMother.random({
          id: userId,
          selectedCard: null
        })
      ],
      reveal: false
    })

    repositoryMock.find = jest.fn().mockReturnValueOnce(room)

    const selectedCard = new RoomUserCard('1')

    await handler.dispatch({
      roomId: room.id.getValue(),
      userId: userId.getValue(),
      card: selectedCard.getValue()
    })

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toHaveBeenCalledWith(room.id)

    const updatedRoom = { ...room }
    updatedRoom.users[0].selectedCard = selectedCard
    expect(repositoryMock.save).toHaveBeenCalledWith(updatedRoom)
  })

  test("Throws an error when the room doesn't exists", async () => {
    repositoryMock.find = jest.fn().mockReturnValueOnce(null)

    const roomId = Id.random()

    await expect(
      handler.dispatch({
        roomId: roomId.getValue(),
        userId: RoomUserId.random().getValue(),
        card: '2'
      })
    ).rejects.toThrow()
  })

  test("Throws an error when the users doesn't exists in the room", async () => {
    const room = RoomMother.random({
      reveal: false
    })

    repositoryMock.find = jest.fn().mockReturnValueOnce(room)

    await expect(
      handler.dispatch({
        roomId: room.id.getValue(),
        userId: RoomUserId.random().getValue(),
        card: '2'
      })
    ).rejects.toThrow()
  })

  test('Throws an error when the room is revealed', async () => {
    const userId = RoomUserId.random()

    const room = RoomMother.random({
      users: [
        RoomUserMother.random({
          id: userId,
          selectedCard: null
        })
      ],
      reveal: true
    })

    repositoryMock.find = jest.fn().mockReturnValueOnce(room)

    await expect(
      handler.dispatch({
        roomId: room.id.getValue(),
        userId: userId.getValue(),
        card: '1'
      })
    ).rejects.toThrow()
  })
})
