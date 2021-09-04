import { Server as ServerIO, Socket } from 'socket.io'
import Container from '../../../shared/Container'
import ClientEvent from '@src/shared/types/ClientEvent'
import { responseOk } from '../../shared/response'
import { composeSocketRoom } from '../utils/socketRoom'

export default async (
  io: ServerIO,
  socket: Socket,
  data: { roomId: string; userId: string }
) => {
  const promoteRoomUser = Container.getPromoteRoomUser()

  await promoteRoomUser.dispatch({
    roomId: data.roomId,
    userId: data.userId
  })

  const getRoom = Container.getGetRoom()

  const roomResponse = await getRoom.dispatch({
    id: data.roomId
  })

  const socketRoom = composeSocketRoom(data.roomId)

  io.to(socketRoom).emit(ClientEvent.UPDATED_ROOM, responseOk(roomResponse))
}
