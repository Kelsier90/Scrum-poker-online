import { Server as ServerIO, Socket } from 'socket.io'
import Container from '../../../shared/Container'
import ClientEvent from '@src/shared/types/ClientEvent'
import { responseKo, responseOk } from '../../shared/response'
import { composeSocketRoom } from '../utils/socketRoom'

export default async (io: ServerIO, socket: Socket, data) => {
  try {
    const joinRoom = Container.getJoinRoom()

    await joinRoom.dispatch({
      id: data.id,
      userId: socket.id,
      userName: data.userName
    })

    const socketRoom = composeSocketRoom(data.id)
    socket.join(socketRoom)

    const getRoom = Container.getGetRoom()

    const roomResponse = await getRoom.dispatch({
      id: data.id
    })

    socket.emit(ClientEvent.JOINED_TO_ROOM, responseOk(roomResponse))

    const getUserFromRoom = Container.getGetUserFromRoom()

    const userResponse = await getUserFromRoom.dispatch({
      roomId: data.id,
      userId: socket.id
    })

    io.to(socketRoom).emit(
      ClientEvent.USER_JOINED_TO_ROOM,
      responseOk(userResponse)
    )
    io.to(socketRoom).emit(ClientEvent.UPDATED_ROOM, responseOk(roomResponse))
  } catch (e) {
    socket.emit(ClientEvent.JOINED_TO_ROOM, responseKo(e))
  }
}
