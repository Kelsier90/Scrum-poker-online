import TestDatabase from './TestDatabase'

export default function (): void {
  beforeAll(async () => {
    await TestDatabase.reset()
  })

  afterEach(async () => {
    await TestDatabase.reset()
  })

  afterAll(async () => {
    await TestDatabase.disconnect()
  })
}
