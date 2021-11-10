import { v4 as uuidv4, validate } from 'uuid'
import InvalidDataError from '@api/shared/domain/errors/InvalidDataError'

export default class Id {
  private readonly value: string

  constructor(value: string) {
    if (!validate(value)) {
      throw new InvalidDataError(`"${value}" is not a valid ID`)
    }
    this.value = value
  }

  public getValue(): string {
    return this.value
  }

  public static random(): Id {
    return new Id(uuidv4())
  }
}
