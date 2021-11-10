import ClientEvent from '@src/shared/types/ClientEvent'
import { responseOk } from '../../shared/response'
import { composeRoomChannel } from '@src/shared/rooms/utils/roomChannel'
import Controller from '@api/app/shared/Controller'
import JoinRoom from '@api/rooms/application/JoinRoom'
import GetRoom from '@api/rooms/application/GetRoom'
import { NextApiRequest, NextApiResponse } from 'next'
import GetUserFromRoom from '@api/rooms/application/GetUserFromRoom'
import MessageClient from '@api/shared/MessageClient'

export default class JoinRoomController extends Controller {
  private joinRoom: JoinRoom
  private getRoom: GetRoom
  private getUserFromRoom: GetUserFromRoom

  constructor(
    joinRoom: JoinRoom,
    getRoom: GetRoom,
    getUserFromRoom: GetUserFromRoom
  ) {
    super()
    this.getUserFromRoom = getUserFromRoom
    this.joinRoom = joinRoom
    this.getRoom = getRoom
  }

  protected async execute(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const userId = this.getAuthUserId(req)
    const { roomId, userName } = req.body

    await this.joinRoom.dispatch({
      roomId,
      userId,
      userName
    })

    const roomChannel = composeRoomChannel(roomId)

    const userResponse = await this.getUserFromRoom.dispatch({
      roomId,
      userId
    })

    const roomResponse = await this.getRoom.dispatch({ id: roomId })

    await MessageClient.sendMultiple([
      {
        channel: roomChannel,
        name: ClientEvent.USER_JOINED_TO_ROOM,
        data: responseOk(userResponse)
      },
      {
        channel: roomChannel,
        name: ClientEvent.UPDATED_ROOM,
        data: responseOk(roomResponse)
      }
    ])

    res.status(200).json(roomResponse)
  }
}
