import InvalidDataError from '@api/shared/domain/errors/InvalidDataError'

export default class EventName {
  private readonly value: string

  constructor(value: string) {
    if (!value || value.trim().length === 0)
      throw new InvalidDataError('The event name cannot be empty')
    this.value = value.trim()
  }

  public getValue(): string {
    return this.value
  }
}
