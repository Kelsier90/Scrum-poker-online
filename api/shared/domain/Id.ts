import { v4 as uuidv4, validate } from 'uuid'

export default class Id {
  private readonly value: string

  constructor(value: string) {
    if (!validate(value)) {
      throw new Error(`${value} is not a valid ID`)
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
