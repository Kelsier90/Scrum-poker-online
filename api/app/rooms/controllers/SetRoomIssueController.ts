import { Server as ServerIO, Socket } from 'socket.io'
import Container from '../../../shared/Container'
import ClientEvent from '@src/shared/types/ClientEvent'
import { responseKo, responseOk } from '../../shared/response'
import { composeSocketRoom } from '../utils/socketRoom'

export default async (
  io: ServerIO,
  socket: Socket,
  data: { roomId: string; issue: string }
) => {
  try {
    const setRoomIssue = Container.getSetRoomIssue()

    await setRoomIssue.dispatch({
      roomId: data.roomId,
      issue: data.issue
    })

    const getRoom = Container.getGetRoom()

    const roomResponse = await getRoom.dispatch({
      id: data.roomId
    })

    const socketRoom = composeSocketRoom(data.roomId)

    socket.emit(ClientEvent.MODIFIED_ROOM_ISSUE, responseOk(roomResponse))
    io.to(socketRoom).emit(ClientEvent.UPDATED_ROOM, responseOk(roomResponse))
  } catch (e) {
    socket.emit(ClientEvent.MODIFIED_ROOM_ISSUE, responseKo(e))
  }
}
