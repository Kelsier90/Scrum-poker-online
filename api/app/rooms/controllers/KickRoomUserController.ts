import ClientEvent from '@src/shared/types/ClientEvent'
import { responseOk } from '../../shared/response'
import { composeRoomChannel } from '@src/shared/rooms/utils/roomChannel'
import Controller from '@api/app/shared/Controller'
import LeaveRoom from '@api/rooms/application/LeaveRoom'
import GetUserFromRoom from '@api/rooms/application/GetUserFromRoom'
import GetRoom from '@api/rooms/application/GetRoom'
import { NextApiRequest, NextApiResponse } from 'next'
import userIsMasterInRoom from '@api/app/rooms/middlewares/userIsMasterInRoom'
import MessageClient from '@api/shared/MessageClient'

export default class KickRoomUserController extends Controller {
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
    const authUserId = this.getAuthUserId(req)
    const { roomId, userId } = req.body

    await this.runMiddleware(req, res, userIsMasterInRoom(authUserId, roomId))

    const userResponse = await this.getUserFromRoom.dispatch({
      roomId,
      userId
    })

    await this.leaveRoom.dispatch({
      roomId,
      userId
    })

    const roomChannel = composeRoomChannel(roomId)

    if (userResponse)
      await MessageClient.send(roomChannel, {
        name: ClientEvent.USER_KICKED_FROM_ROOM,
        data: responseOk(userResponse)
      })

    const roomResponse = await this.getRoom.dispatch({
      id: roomId
    })

    await MessageClient.send(roomChannel, {
      name: ClientEvent.UPDATED_ROOM,
      data: responseOk(roomResponse)
    })

    res.status(204).send(null)
  }
}
