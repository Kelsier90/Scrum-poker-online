const ROOM_IDENTIFIER = 'presence-room_'

export const isRoomChannel = (room: string): boolean =>
  room.startsWith(ROOM_IDENTIFIER)

export const composeRoomChannel = (id: string): string => ROOM_IDENTIFIER + id

export const getRoomIdFromRoomChannel = (room: string): string =>
  room.replace(ROOM_IDENTIFIER, '')
