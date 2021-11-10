import ClientEvent from '@src/shared/types/ClientEvent'
import { responseOk } from '../../shared/response'
import { composeRoomChannel } from '@src/shared/rooms/utils/roomChannel'
import Controller from '@api/app/shared/Controller'
import { NextApiRequest, NextApiResponse } from 'next'
import LeaveRoom from '@api/rooms/application/LeaveRoom'
import GetUserFromRoom from '@api/rooms/application/GetUserFromRoom'
import GetRoom from '@api/rooms/application/GetRoom'
import MessageClient from '@api/shared/MessageClient'

export default class LeaveRoomController extends Controller {
  private leaveRoom: LeaveRoom
  private getUserFromRoom: GetUserFromRoom
  private getRoom: GetRoom

  constructor(
    leaveRoom: LeaveRoom,
    getUserFromRoom: GetUserFromRoom,
    getRoom: GetRoom
  ) {
    super()
    this.leaveRoom = leaveRoom
    this.getUserFromRoom = getUserFromRoom
    this.getRoom = getRoom
  }

  protected async execute(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const userId = this.getAuthUserId(req)
    const { roomId } = req.body

    const userResponse = await this.getUserFromRoom.dispatch({
      roomId,
      userId
    })

    await this.leaveRoom.dispatch({
      roomId,
      userId
    })

    const messages = []

    const roomChannel = composeRoomChannel(roomId)

    if (userResponse)
      messages.push({
        channel: roomChannel,
        name: ClientEvent.USER_LEFT_ROOM,
        data: responseOk(userResponse)
      })

    const roomResponse = await this.getRoom.dispatch({
      id: roomId
    })

    if (roomResponse)
      messages.push({
        channel: roomChannel,
        name: ClientEvent.UPDATED_ROOM,
        data: responseOk(roomResponse)
      })

    await MessageClient.sendMultiple(messages)

    res.status(204).send(null)
  }
}
