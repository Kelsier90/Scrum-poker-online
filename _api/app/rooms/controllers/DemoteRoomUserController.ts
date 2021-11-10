import ClientEvent from '@src/shared/types/ClientEvent'
import { responseOk } from '../../shared/response'
import { composeRoomChannel } from '@src/shared/rooms/utils/roomChannel'
import Controller from '@api/app/shared/Controller'
import DemoteRoomUser from '@api/rooms/application/DemoteRoomUser'
import GetRoom from '@api/rooms/application/GetRoom'
import { NextApiRequest, NextApiResponse } from 'next'
import MessageClient from '@api/shared/MessageClient'
import userIsMasterInRoom from '@api/app/rooms/middlewares/userIsMasterInRoom'

export default class DemoteRoomUserController extends Controller {
  private demoteRoomUser: DemoteRoomUser
  private getRoom: GetRoom

  constructor(demoteRoomUser: DemoteRoomUser, getRoom: GetRoom) {
    super()
    this.demoteRoomUser = demoteRoomUser
    this.getRoom = getRoom
  }

  protected async execute(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const authUserId = this.getAuthUserId(req)
    const { roomId, userId } = req.body

    await this.runMiddleware(req, res, userIsMasterInRoom(authUserId, roomId))

    await this.demoteRoomUser.dispatch({
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
