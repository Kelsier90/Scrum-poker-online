import ClientEvent from '@src/shared/types/ClientEvent'
import { responseOk } from '../../shared/response'
import { composeRoomChannel } from '@src/shared/rooms/utils/roomChannel'
import Controller from '@api/app/shared/Controller'
import PromoteRoomUser from '@api/rooms/application/PromoteRoomUser'
import GetRoom from '@api/rooms/application/GetRoom'
import { NextApiRequest, NextApiResponse } from 'next'
import MessageClient from '@api/shared/MessageClient'
import userIsMasterInRoom from '@api/app/rooms/middlewares/userIsMasterInRoom'

export default class PromoteRoomUserController extends Controller {
  private promoteRoomUser: PromoteRoomUser
  private getRoom: GetRoom

  constructor(promoteRoomUser: PromoteRoomUser, getRoom: GetRoom) {
    super()
    this.promoteRoomUser = promoteRoomUser
    this.getRoom = getRoom
  }

  protected async execute(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const authUserId = this.getAuthUserId(req)
    const { roomId, userId } = req.body

    await this.runMiddleware(req, res, userIsMasterInRoom(authUserId, roomId))

    await this.promoteRoomUser.dispatch({
      roomId,
      userId
    })

    const roomResponse = await this.getRoom.dispatch({
      id: roomId
    })

    const roomChannel = composeRoomChannel(roomId)

    await MessageClient.send(roomChannel, {
      name: ClientEvent.UPDATED_ROOM,
      data: responseOk(roomResponse)
    })

    res.status(204).send(null)
  }
}
