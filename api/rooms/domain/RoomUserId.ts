import InvalidDataError from '@api/shared/domain/errors/InvalidDataError'

export default class RoomUserId {
  private readonly value: string

  constructor(value: string) {
    if (value.trim().length === 0)
      throw new InvalidDataError('The user id cannot be empty')

    this.value = value
  }

  getValue(): string {
    return this.value
  }

  static random(): RoomUserId {
    let id = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < 20; i++) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return new RoomUserId(id)
  }
}
