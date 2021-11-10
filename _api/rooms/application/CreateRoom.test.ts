import CreateRoom from './CreateRoom'
import CreateRoomCommandMother from './testUtils/CreateRoomCommandMother'
import RoomMother from '../domain/testUtils/RoomMother'
import RoomRepositoryMock from './testUtils/RoomRepositoryMock'
import EventBusMock from '@api/shared/domain/testUtils/EventBusMock'

const repositoryMock = new RoomRepositoryMock()
const eventBusMock = new EventBusMock()
const creator = new CreateRoom(repositoryMock, eventBusMock)

describe('CreateRoom', () => {
  test('creates a room', async () => {
    const command = CreateRoomCommandMother.random()
    const room = RoomMother.fromCreateCommand(command)

    await creator.dispatch(command)

    expect(repositoryMock.save).toHaveBeenCalledTimes(1)
    expect(repositoryMock.save).toHaveBeenCalledWith(room)
  })
})
