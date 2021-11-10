import RoomRepositoryMock from './testUtils/RoomRepositoryMock'
import DemoteRoomUser from '@api/rooms/application/DemoteRoomUser'
import RoomMother from '../domain/testUtils/RoomMother'
import Id from '../../shared/domain/Id'
import RoomUserMother from '@api/rooms/domain/testUtils/RoomUserMother'
import RoomUserId from '@api/rooms/domain/RoomUserId'

const repositoryMock = new RoomRepositoryMock()
const handler = new DemoteRoomUser(repositoryMock)

describe('DemoteRoomUser', () => {
  test('Set as no master an existing user in an existing room', async () => {
    const user = RoomUserMother.random({ isMaster: true })
    const room = RoomMother.random({ users: [user] })

    repositoryMock.find = jest.fn().mockReturnValueOnce(room)

    await handler.dispatch({
      roomId: room.id.getValue(),
      userId: user.id.getValue()
    })

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toHaveBeenCalledWith(room.id)

    const updatedRoom = { ...room }
    updatedRoom.users[0].isMaster = false
    expect(repositoryMock.save).toHaveBeenCalledWith(updatedRoom)
  })

  test("Throws an error when the room doesn't exists", async () => {
    repositoryMock.find = jest.fn().mockReturnValueOnce(null)

    const roomId = Id.random()
    const userId = RoomUserId.random()

    await expect(
      handler.dispatch({
        roomId: roomId.getValue(),
        userId: userId.getValue()
      })
    ).rejects.toThrow()
  })

  test("Throws an error when the user doesn't exists in the room", async () => {
    const room = RoomMother.random()

    repositoryMock.find = jest.fn().mockReturnValueOnce(room)

    const userId = RoomUserId.random()

    await expect(
      handler.dispatch({
        roomId: room.id.getValue(),
        userId: userId.getValue()
      })
    ).rejects.toThrow()
  })
})
