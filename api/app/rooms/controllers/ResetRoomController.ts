import { composeRoomChannel } from '@src/shared/rooms/utils/roomChannel'
import ClientEvent from '@src/shared/types/ClientEvent'
import { responseOk } from '../../shared/response'
import Controller from '@api/app/shared/Controller'
import ResetRoom from '@api/rooms/application/ResetRoom'
import GetRoom from '@api/rooms/application/GetRoom'
import { NextApiRequest, NextApiResponse } from 'next'
import MessageClient from '@api/shared/MessageClient'
import userIsMasterInRoom from '@api/app/rooms/middlewares/userIsMasterInRoom'

export default class ResetRoomController extends Controller {
  private resetRoom: ResetRoom
  private getRoom: GetRoom

  constructor(resetRoom: ResetRoom, getRoom: GetRoom) {
    super()
    this.resetRoom = resetRoom
    this.getRoom = getRoom
  }

  protected async execute(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const userId = this.getAuthUserId(req)
    const { roomId } = req.body

    await this.runMiddleware(req, res, userIsMasterInRoom(userId, roomId))

    await this.resetRoom.dispatch({
      roomId
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
