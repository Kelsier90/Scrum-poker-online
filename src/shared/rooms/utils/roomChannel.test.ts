import {
  composeRoomChannel,
  getRoomIdFromRoomChannel,
  isRoomChannel
} from './roomChannel'
import Id from '@api/shared/domain/Id'

describe('roomChannel', () => {
  test('isRoomChannel returns true when the channel identifier is a Room channel', () => {
    const id = Id.random().getValue()
    expect(isRoomChannel(`presence-room_${id}`)).toBe(true)
  })

  test('isRoomChannel returns false when the channel identifier is not a Room identifier', () => {
    expect(isRoomChannel('840f7251fe34')).toBe(false)
  })

  test('composeRoomChannel returns a correct channel room identifier', () => {
    const id = Id.random().getValue()
    expect(composeRoomChannel(id)).toEqual(`presence-room_${id}`)
  })

  test('getRoomIdFromRoomChannel returns a correct room id', () => {
    const id = Id.random().getValue()
    expect(getRoomIdFromRoomChannel(`presence-room_${id}`)).toEqual(id)
  })
})
