import { Server as ServerIO, Socket } from 'socket.io'
import Container from '../../../shared/Container'
import ClientEvent from '@src/shared/types/ClientEvent'
import newId from '../../shared/newId'
import { responseKo, responseOk } from '../../shared/response'
import { composeSocketRoom } from '../utils/socketRoom'

export default async (
  io: ServerIO,
  socket: Socket,
  data: { userName: string }
) => {
  try {
    const createRoom = Container.getCreateRoom()

    const id = newId()
    await createRoom.dispatch({
      id,
      userId: socket.id,
      userName: data.userName
    })

    const socketRoom = composeSocketRoom(id)
    socket.join(socketRoom)

    const getRoom = Container.getGetRoom()

    const roomResponse = await getRoom.dispatch({
      id
    })

    socket.emit(ClientEvent.JOINED_TO_ROOM, responseOk(roomResponse))
    io.to(socketRoom).emit(ClientEvent.UPDATED_ROOM, responseOk(roomResponse))
  } catch (e) {
    socket.emit(ClientEvent.JOINED_TO_ROOM, responseKo(e))
  }
}
