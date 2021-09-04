import { Server as ServerIO, Socket } from 'socket.io'
import Container from '../../../shared/Container'
import ClientEvent from '@src/shared/types/ClientEvent'
import { responseOk } from '../../shared/response'
import { composeSocketRoom } from '../utils/socketRoom'

export default async (
  io: ServerIO,
  socket: Socket | null,
  data: { id: string; userId: string }
) => {
  const getUserFromRoom = Container.getGetUserFromRoom()

  const userResponse = await getUserFromRoom.dispatch({
    roomId: data.id,
    userId: data.userId
  })

  const leaveRoom = Container.getLeaveRoom()

  await leaveRoom.dispatch({
    roomId: data.id,
    userId: data.userId
  })

  const socketRoom = composeSocketRoom(data.id)

  if (socket) socket.leave(socketRoom)

  if (userResponse)
    io.to(socketRoom).emit(ClientEvent.USER_LEFT_ROOM, responseOk(userResponse))

  const getRoom = Container.getGetRoom()

  const roomResponse = await getRoom.dispatch({
    id: data.id
  })

  io.to(socketRoom).emit(ClientEvent.UPDATED_ROOM, responseOk(roomResponse))
}
