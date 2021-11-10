import IsMasterUserInRoom from './IsMasterUserInRoom'
import RoomMother from '../domain/testUtils/RoomMother'
import RoomRepositoryMock from './testUtils/RoomRepositoryMock'
import Id from '../../shared/domain/Id'
import RoomUserMother from '../domain/testUtils/RoomUserMother'
import RoomUserId from '../domain/RoomUserId'

const repositoryMock = new RoomRepositoryMock()
const handler = new IsMasterUserInRoom(repositoryMock)

describe('IsMasterUserInRoom', () => {
  test('returns true when the user is in the room and is master', async () => {
    const user = RoomUserMother.random({ isMaster: true })

    const room = RoomMother.random({
      users: [user]
    })

    repositoryMock.find = jest.fn().mockReturnValueOnce(Promise.resolve(room))

    const query = { roomId: room.id.getValue(), userId: user.id.getValue() }
    const response = await handler.dispatch(query)

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toHaveBeenCalledWith(room.id)
    expect(response).toBeTruthy()
  })

  test('return false when the user is in the room but is not master', async () => {
    const user = RoomUserMother.random({ isMaster: false })

    const room = RoomMother.random({
      users: [user]
    })

    repositoryMock.find = jest.fn().mockReturnValueOnce(Promise.resolve(room))

    const query = { roomId: room.id.getValue(), userId: user.id.getValue() }
    const response = await handler.dispatch(query)

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toHaveBeenCalledWith(room.id)
    expect(response).toBeFalsy()
  })

  test('return false when the user is not in the room', async () => {
    const room = RoomMother.random()

    repositoryMock.find = jest.fn().mockReturnValueOnce(Promise.resolve(room))

    const query = {
      roomId: room.id.getValue(),
      userId: RoomUserId.random().getValue()
    }
    const response = await handler.dispatch(query)

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toHaveBeenCalledWith(room.id)
    expect(response).toBeFalsy()
  })

  test('return false when the room doesnt exists', async () => {
    repositoryMock.find = jest.fn().mockReturnValueOnce(Promise.resolve(null))

    const id = Id.random()
    const query = {
      roomId: id.getValue(),
      userId: RoomUserId.random().getValue()
    }
    const response = await handler.dispatch(query)

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toHaveBeenCalledWith(id)
    expect(response).toBeFalsy()
  })
})
