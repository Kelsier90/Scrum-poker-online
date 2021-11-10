import ClientEvent from '@src/shared/types/ClientEvent'
import { responseOk } from '../../shared/response'
import { composeRoomChannel } from '@src/shared/rooms/utils/roomChannel'
import SelectCard from '@api/rooms/application/SelectCard'
import GetRoom from '@api/rooms/application/GetRoom'
import Controller from '@api/app/shared/Controller'
import { NextApiRequest, NextApiResponse } from 'next'
import MessageClient from '@api/shared/MessageClient'
import userIsInRoom from '@api/app/rooms/middlewares/userIsInRoom'

export default class SelectCardController extends Controller {
  private selectCard: SelectCard
  private getRoom: GetRoom

  constructor(selectCard: SelectCard, getRoom: GetRoom) {
    super()
    this.selectCard = selectCard
    this.getRoom = getRoom
  }

  protected async execute(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const userId = this.getAuthUserId(req)
    const { roomId, card } = req.body

    await this.runMiddleware(req, res, userIsInRoom(userId, roomId))

    await this.selectCard.dispatch({
      roomId,
      userId,
      card
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
