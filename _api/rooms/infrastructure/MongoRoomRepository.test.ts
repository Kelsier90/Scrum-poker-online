import MongoRoomRepository from './MongoRoomRepository'
import repositorySetup from '../../tests/setup/repositorySetup'
import RoomMother from '../domain/testUtils/RoomMother'
import Id from '../../shared/domain/Id'
import RoomUserId from '../domain/RoomUserId'
import RoomUserName from '../domain/RoomUserName'
import RoomUserCard from '../domain/RoomUserCard'

const getRepository = (): MongoRoomRepository => new MongoRoomRepository()

describe('MongoRoomRepository', () => {
  repositorySetup()

  test('Saves a new room', async () => {
    const repository = getRepository()

    await repository.save(RoomMother.random())
  })

  test('Saves a existing room', async () => {
    const repository = getRepository()

    const room = RoomMother.random()
    await repository.save(room)

    room.users = [
      {
        id: new RoomUserId('fpq43YGXgSX4dBosAAAF'),
        name: new RoomUserName('Added user'),
        isMaster: false,
        selectedCard: new RoomUserCard('5')
      }
    ]

    await repository.save(room)

    expect(await repository.find(room.id)).toEqual(room)
  })

  test('Returns an existing room', async () => {
    const repository = getRepository()

    const room = RoomMother.random()

    await repository.save(room)

    const retrievedRoom = await repository.find(room.id)

    expect(retrievedRoom).toEqual(room)
  })

  test('Returns null when room doesnt exists', async () => {
    const repository = getRepository()

    const retrievedRoom = await repository.find(Id.random())

    expect(retrievedRoom).toBeNull()
  })

  test('Removed an existing room', async () => {
    const repository = getRepository()

    const room = RoomMother.random()

    await repository.save(room)

    await repository.remove(room)

    const retrievedRoom = await repository.find(room.id)

    expect(retrievedRoom).toBeNull()
  })
})
