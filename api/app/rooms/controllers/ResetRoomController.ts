import { Server as ServerIO, Socket } from 'socket.io'
import Container from '../../../shared/Container'
import { composeSocketRoom } from '../utils/socketRoom'
import ClientEvent from '@src/shared/types/ClientEvent'
import { responseOk } from '../../shared/response'

export default async (
  io: ServerIO,
  socket: Socket,
  data: { roomId: string }
) => {
  const resetRoom = Container.getResetRoom()

  await resetRoom.dispatch({
    roomId: data.roomId
  })

  const getRoom = Container.getGetRoom()

  const roomResponse = await getRoom.dispatch({
    id: data.roomId
  })

  const socketRoom = composeSocketRoom(data.roomId)
  io.to(socketRoom).emit(ClientEvent.UPDATED_ROOM, responseOk(roomResponse))
}
