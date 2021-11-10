import InvalidDataError from '@api/shared/domain/errors/InvalidDataError'

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

  private readonly value: string

  constructor(value: string) {
    if (!this.values.includes(value))
      throw new InvalidDataError(`"${value}" is not a valid card value`)

    this.value = value
  }

  public getValue(): string {
    return this.value
  }
}
