const ROOM_IDENTIFIER = 'room_'

export const isSocketRoom = (room: string): boolean =>
  room.startsWith(ROOM_IDENTIFIER)

export const composeSocketRoom = (id: string): string => ROOM_IDENTIFIER + id

export const getRoomIdFromSocketRoom = (room: string): string =>
  room.replace(ROOM_IDENTIFIER, '')
