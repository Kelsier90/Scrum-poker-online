import JoinRoom from './JoinRoom'
import JoinRoomCommand from './JoinRoomCommand'
import RoomMother from '../domain/testUtils/RoomMother'
import RoomUserId from '../domain/RoomUserId'
import RoomUserName from '../domain/RoomUserName'
import RoomRepositoryMock from './testUtils/RoomRepositoryMock'
import EventBusMock from '@api/shared/domain/testUtils/EventBusMock'
import Id from '../../shared/domain/Id'

const repositoryMock = new RoomRepositoryMock()
const eventBusMock = new EventBusMock()
const handler = new JoinRoom(repositoryMock, eventBusMock)

describe('JoinRoom', () => {
  test('Joins a existing room', async () => {
    const room = RoomMother.random()
    repositoryMock.find = jest.fn().mockReturnValueOnce(room)

    const userId = RoomUserId.random().getValue()
    const userName = 'John'
    const command: JoinRoomCommand = {
      roomId: room.id.getValue(),
      userId,
      userName
    }
    await handler.dispatch(command)

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toBeCalledWith(room.id)

    room.users.push({
      id: new RoomUserId(userId),
      name: new RoomUserName(userName),
      selectedCard: null,
      isMaster: false
    })

    expect(repositoryMock.save).toHaveBeenCalledTimes(1)
    expect(repositoryMock.save).toHaveBeenCalledWith(room)
  })

  test('Throws an error when the room doesnt exists', async () => {
    repositoryMock.find = jest.fn().mockReturnValueOnce(null)

    const roomId = Id.random()
    const userId = RoomUserId.random().getValue()
    const userName = 'John'
    const command: JoinRoomCommand = {
      roomId: roomId.getValue(),
      userId,
      userName
    }

    await expect(handler.dispatch(command)).rejects.toThrow()
  })
})
