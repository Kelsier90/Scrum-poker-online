import MongoEventRepository from '@api/shared/infrastructure/MongoEventRepository'
import repositorySetup from '@api/tests/setup/repositorySetup'
import EventMother from '@api/shared/domain/testUtils/EventMother'

const getRepository = (): MongoEventRepository => new MongoEventRepository()

describe('MongoEventRepository', () => {
  repositorySetup()

  test('Saves a new event', async () => {
    const repository = getRepository()

    await repository.save(EventMother.random())
  })
})
