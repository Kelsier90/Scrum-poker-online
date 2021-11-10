import RoomRepositoryMock from './testUtils/RoomRepositoryMock'
import SetRoomIssue from './SetRoomIssue'
import RoomMother from '../domain/testUtils/RoomMother'
import Id from '../../shared/domain/Id'
import RoomIssue from '../domain/RoomIssue'

const repositoryMock = new RoomRepositoryMock()
const handler = new SetRoomIssue(repositoryMock)

describe('SetRoomIssue', () => {
  test('Saves the issue on an existing room', async () => {
    const room = RoomMother.random()

    repositoryMock.find = jest.fn().mockReturnValueOnce(room)

    const issue = new RoomIssue('TEST-1')

    await handler.dispatch({
      roomId: room.id.getValue(),
      issue: issue.getValue()
    })

    expect(repositoryMock.find).toHaveBeenCalledTimes(1)
    expect(repositoryMock.find).toHaveBeenCalledWith(room.id)

    const updatedRoom = { ...room }
    updatedRoom.issue = issue
    expect(repositoryMock.save).toHaveBeenCalledWith(updatedRoom)
  })

  test("Throws an error when the room doesn't exists", async () => {
    repositoryMock.find = jest.fn().mockReturnValueOnce(null)

    const roomId = Id.random()

    await expect(
      handler.dispatch({
        roomId: roomId.getValue(),
        issue: 'TEST-1'
      })
    ).rejects.toThrow()
  })
})
