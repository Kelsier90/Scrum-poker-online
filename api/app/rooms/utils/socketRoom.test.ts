import {
  composeSocketRoom,
  getRoomIdFromSocketRoom,
  isSocketRoom
} from './socketRoom'
import Id from '../../../shared/domain/Id'

describe('socketRoom', () => {
  test('isSocketRoom returns true when the socket identifier is a Room identifier', () => {
    const id = Id.random().getValue()
    expect(isSocketRoom(`room_${id}`)).toBe(true)
  })

  test('isSocketRoom returns false when the socket identifier is not a Room identifier', () => {
    expect(isSocketRoom('840f7251fe34')).toBe(false)
  })

  test('composeSocketRoom returns a correct socket room identifier', () => {
    const id = Id.random().getValue()
    expect(composeSocketRoom(id)).toEqual(`room_${id}`)
  })

  test('getRoomIdFromSocketRoom returns a correct room id', () => {
    const id = Id.random().getValue()
    expect(getRoomIdFromSocketRoom(`room_${id}`)).toEqual(id)
  })
})
