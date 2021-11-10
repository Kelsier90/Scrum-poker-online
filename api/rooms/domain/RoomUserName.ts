import InvalidDataError from '@api/shared/domain/errors/InvalidDataError'

export default class RoomUserName {
  private readonly value: string

  constructor(value: string) {
    if (!value || value.trim().length === 0)
      throw new InvalidDataError('The user name cannot be empty')

    if (value.trim().length > 30)
      throw new InvalidDataError(
        'The user name cannot contain more than 30 characters'
      )

    this.value = value.trim()
  }

  public getValue(): string {
    return this.value
  }
}
