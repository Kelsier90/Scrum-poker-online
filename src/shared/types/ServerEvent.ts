enum ServerEvent {
  CREATE_ROOM = 'client-CREATE_ROOM',
  JOIN_ROOM = 'client-JOIN_ROOM',
  LEAVE_ROOM = 'client-LEAVE_ROOM',
  SELECT_CARD = 'client-SELECT_CARD',
  REVEAL_CARDS = 'client-REVEAL_CARDS',
  RESET_ROOM = 'client-RESET_ROOM',
  SET_ROOM_ISSUE = 'client-SET_ROOM_ISSUE',
  PROMOTE_ROOM_USER = 'client-PROMOTE_ROOM_USER',
  DEMOTE_ROOM_USER = 'client-DEMOTE_ROOM_USER',
  KICK_ROOM_USER = 'client-KICK_ROOM_USER'
}

export default ServerEvent
