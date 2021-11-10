import ClientEvent from '@src/shared/types/ClientEvent'
import { responseOk } from '../../shared/response'
import { composeRoomChannel } from '@src/shared/rooms/utils/roomChannel'
import Controller from '@api/app/shared/Controller'
import SetRoomIssue from '@api/rooms/application/SetRoomIssue'
import GetRoom from '@api/rooms/application/GetRoom'
import { NextApiRequest, NextApiResponse } from 'next'
import userIsMasterInRoom from '@api/app/rooms/middlewares/userIsMasterInRoom'
import MessageClient from '@api/shared/MessageClient'

export default class SetRoomIssueController extends Controller {
  private setRoomIssue: SetRoomIssue
  private getRoom: GetRoom

  constructor(setRoomIssue: SetRoomIssue, getRoom: GetRoom) {
    super()
    this.setRoomIssue = setRoomIssue
    this.getRoom = getRoom
  }

  protected async execute(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const userId = this.getAuthUserId(req)
    const { roomId, issue } = req.body

    await this.runMiddleware(req, res, userIsMasterInRoom(userId, roomId))

    await this.setRoomIssue.dispatch({
      roomId,
      issue
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
