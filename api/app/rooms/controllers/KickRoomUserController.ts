import { Server as ServerIO, Socket } from 'socket.io'
import Container from '../../../shared/Container'
import ClientEvent from '@src/shared/types/ClientEvent'
import { responseOk } from '../../shared/response'
import { composeSocketRoom } from '../utils/socketRoom'

export default async (
  io: ServerIO,
  socket: Socket | null,
  data: { roomId: string; userId: string }
) => {
  const getUserFromRoom = Container.getGetUserFromRoom()

  const userResponse = await getUserFromRoom.dispatch({
    roomId: data.roomId,
    userId: data.userId
  })

  const leaveRoom = Container.getLeaveRoom()

  await leaveRoom.dispatch({
    roomId: data.roomId,
    userId: data.userId
  })

  const socketRoom = composeSocketRoom(data.roomId)

  if (userResponse)
    io.to(socketRoom).emit(
      ClientEvent.USER_KICKED_FROM_ROOM,
      responseOk(userResponse)
    )

  const getRoom = Container.getGetRoom()

  const roomResponse = await getRoom.dispatch({
    id: data.roomId
  })

  io.to(socketRoom).emit(ClientEvent.UPDATED_ROOM, responseOk(roomResponse))
}
