export default class RoomUserId {
  private value: string
  private static readonly LENGTH = 20

  constructor(value: string) {
    if (value.replace(' ', '').length !== RoomUserId.LENGTH)
      throw new Error(`${value} is not a valid user ID`)

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
    for (let i = 0; i < this.LENGTH; i++) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return new RoomUserId(id)
  }
}
