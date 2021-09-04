import Middleware from '../../shared/middlewares'
import Container from '../../../shared/Container'
import ClientEvent from '@src/shared/types/ClientEvent'
import { responseKo } from '../../shared/response'

const userIsMasterInRoom =
  (userId: string, roomId: string): Middleware =>
  async socket => {
    const isMasterUserInRoom = Container.getIsMasterUserInRoom()

    const exists = await isMasterUserInRoom.dispatch({
      userId,
      roomId
    })

    if (!exists)
      socket.emit(
        ClientEvent.ERROR,
        responseKo(new Error('The user is not the master in the room'))
      )

    return exists
  }

export default userIsMasterInRoom
