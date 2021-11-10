import { composeRoomChannel } from '@src/shared/rooms/utils/roomChannel'
import ClientEvent from '@src/shared/types/ClientEvent'
import { responseOk } from '../../shared/response'
import Controller from '@api/app/shared/Controller'
import RevealCards from '@api/rooms/application/RevealCards'
import GetRoom from '@api/rooms/application/GetRoom'
import { NextApiRequest, NextApiResponse } from 'next'
import MessageClient from '@api/shared/MessageClient'
import userIsMasterInRoom from '@api/app/rooms/middlewares/userIsMasterInRoom'

export default class RevealCardsController extends Controller {
  private revealCards: RevealCards
  private getRoom: GetRoom

  constructor(revealCards: RevealCards, getRoom: GetRoom) {
    super()
    this.revealCards = revealCards
    this.getRoom = getRoom
  }

  protected async execute(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const userId = this.getAuthUserId(req)
    const { roomId } = req.body

    await this.runMiddleware(req, res, userIsMasterInRoom(userId, roomId))

    await this.revealCards.dispatch({
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
