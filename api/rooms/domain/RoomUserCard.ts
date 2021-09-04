export default class RoomUserCard {
  readonly values = [
    '0',
    '0.5',
    '1',
    '2',
    '3',
    '5',
    '8',
    '13',
    '20',
    '40',
    '100',
    'infinite',
    '?',
    'coffee'
  ]

  private value: string

  constructor(value: string) {
    if (!this.values.includes(value))
      throw new Error(`"${value}" is not a valid card value`)

    this.value = value
  }

  public getValue(): string {
    return this.value
  }
}
