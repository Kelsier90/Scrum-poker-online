import GetUserFromRoom from './GetUserFromRoom'
import RoomUserMother from '../domain/testUtils/RoomUserMother'
import RoomMother from '../domain/testUtils/RoomMother'
import RoomRepositoryMock from './testUtils/RoomRepositoryMock'
import GetUserFromRoomResponse from './GetUserFromRoomResponse'
import Id from '../../shared/domain/Id'
import RoomUserId from '../domain/RoomUserId'

const repositoryMock = new RoomRepositoryMock()
const getter = new GetUserFromRoom(repositoryMock)

describe('GetUserFromRoom', () => {
  test('get the existing user in the room', async () => {
    const user = RoomUserMother.random()
    const room = RoomMother.random({ users: [user] })

    repositoryMock.find = jest.fn().mockReturnValueOnce(Promise.resolve(room))

    const query = { roomId: room.id.getValue(), userId: user.id.getValue() }
    const response = await getter.dispatch(query)

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toHaveBeenCalledWith(room.id)
    expect(response).toEqual(new GetUserFromRoomResponse(user).serialize())
  })

  test('return null when the user is not in the room', async () => {
    const room = RoomMother.random()

    repositoryMock.find = jest.fn().mockReturnValueOnce(Promise.resolve(room))

    const query = {
      roomId: room.id.getValue(),
      userId: RoomUserId.random().getValue()
    }
    const response = await getter.dispatch(query)

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toHaveBeenCalledWith(room.id)
    expect(response).toBeNull()
  })

  test('return null when the room doesnt exists', async () => {
    repositoryMock.find = jest.fn().mockReturnValueOnce(Promise.resolve(null))

    const roomId = Id.random()
    const query = {
      roomId: roomId.getValue(),
      userId: RoomUserId.random().getValue()
    }
    const response = await getter.dispatch(query)

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toHaveBeenCalledWith(roomId)
    expect(response).toBeNull()
  })
})
