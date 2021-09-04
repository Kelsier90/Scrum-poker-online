import Middleware from '../../shared/middlewares'
import Container from '../../../shared/Container'
import ClientEvent from '@src/shared/types/ClientEvent'
import { responseKo } from '../../shared/response'

const userIsInRoom =
  (userId: string, roomId: string): Middleware =>
  async socket => {
    const isUserInRoom = Container.getIsUserInRoom()

    const exists = await isUserInRoom.dispatch({
      userId,
      roomId
    })

    if (!exists)
      socket.emit(
        ClientEvent.ERROR,
        responseKo(new Error('The user is not in the room'))
      )

    return exists
  }

export default userIsInRoom
