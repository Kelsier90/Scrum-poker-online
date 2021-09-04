import RoomMother from '../domain/testUtils/RoomMother'
import RoomRepositoryMock from './testUtils/RoomRepositoryMock'
import EventBusMock from '@api/shared/application/testUtils/EventBusMock'
import RoomUserMother from '../domain/testUtils/RoomUserMother'
import LeaveRoomCommand from './LeaveRoomCommand'
import LeaveRoom from './LeaveRoom'

const repositoryMock = new RoomRepositoryMock()
const eventBusMock = new EventBusMock()
const handler = new LeaveRoom(repositoryMock, eventBusMock)

describe('LeaveRoom', () => {
  test('Leaves an existing room', async () => {
    const user1 = RoomUserMother.random()
    const user2 = RoomUserMother.random()

    const room = RoomMother.random({ users: [user1, user2] })
    repositoryMock.find = jest.fn().mockReturnValueOnce(room)

    const command: LeaveRoomCommand = {
      roomId: room.id.getValue(),
      userId: user1.id.getValue()
    }
    await handler.dispatch(command)

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toBeCalledWith(room.id)

    // Must be at least 1 master in the room
    user2.isMaster = true
    room.users = [user2]

    expect(repositoryMock.save).toHaveBeenCalledTimes(1)
    expect(repositoryMock.save).toHaveBeenCalledWith(room)
  })
})
