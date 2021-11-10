import OnUserHasLeftRoomEventHandler from '@api/rooms/application/OnUserHasLeftRoomEventHandler'
import GetRoomMock from '@api/rooms/application/testUtils/GetRoomMock'
import GetRoom from '@api/rooms/application/GetRoom'
import RemoveRoomMock from '@api/rooms/application/testUtils/RemoveRoomMock'
import RemoveRoom from '@api/rooms/application/RemoveRoom'
import UserHasJoinedRoomEvent from '@api/rooms/domain/events/UserHasJoinedRoomEvent'
import RoomMother from '@api/rooms/domain/testUtils/RoomMother'
import RoomUserId from '@api/rooms/domain/RoomUserId'
import RoomUserMother from '@api/rooms/domain/testUtils/RoomUserMother'
import Id from '@api/shared/domain/Id'
import GetRoomResponse from '@api/rooms/application/GetRoomResponse'

const getRoomMock = new GetRoomMock() as GetRoom
const removeRoomMock = new RemoveRoomMock() as RemoveRoom
const handler = new OnUserHasLeftRoomEventHandler(getRoomMock, removeRoomMock)

describe('OnUserHasLeftRoomEventHandler', () => {
  test('Get the room and remove it when has no users', async () => {
    const room = RoomMother.random({ users: [] })
    const userId = RoomUserId.random()

    const roomResponse = new GetRoomResponse(room)
    getRoomMock.dispatch = jest
      .fn()
      .mockReturnValueOnce(roomResponse.serialize())

    await handler.handle(UserHasJoinedRoomEvent.createNew(room.id, { userId }))

    expect(getRoomMock.dispatch).toHaveBeenCalledWith({
      id: room.id.getValue()
    })
    expect(getRoomMock.dispatch).toHaveBeenCalledTimes(1)

    expect(removeRoomMock.dispatch).toHaveBeenCalledWith({
      id: room.id.getValue()
    })
    expect(removeRoomMock.dispatch).toHaveBeenCalledTimes(1)
  })

  test('Get the room and does not remove it when still having users', async () => {
    const room = RoomMother.random({ users: [RoomUserMother.random()] })
    const userId = RoomUserId.random()

    getRoomMock.dispatch = jest.fn().mockReturnValueOnce(room)

    await handler.handle(UserHasJoinedRoomEvent.createNew(room.id, { userId }))

    expect(getRoomMock.dispatch).toHaveBeenCalledWith({
      id: room.id.getValue()
    })
    expect(getRoomMock.dispatch).toHaveBeenCalledTimes(1)

    expect(removeRoomMock.dispatch).toHaveBeenCalledTimes(0)
  })

  test('Do not nothing when the room does not exists', async () => {
    const roomId = Id.random()
    const userId = RoomUserId.random()

    getRoomMock.dispatch = jest.fn().mockReturnValueOnce(null)

    await handler.handle(UserHasJoinedRoomEvent.createNew(roomId, { userId }))

    expect(getRoomMock.dispatch).toHaveBeenCalledWith({
      id: roomId.getValue()
    })
    expect(getRoomMock.dispatch).toHaveBeenCalledTimes(1)

    expect(removeRoomMock.dispatch).toHaveBeenCalledTimes(0)
  })
})
