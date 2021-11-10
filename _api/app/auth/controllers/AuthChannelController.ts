import Controller from '@api/app/shared/Controller'
import { NextApiRequest, NextApiResponse } from 'next'
import IsUserInRoom from '@api/rooms/application/IsUserInRoom'
import {
  getRoomIdFromRoomChannel,
  isRoomChannel
} from '@src/shared/rooms/utils/roomChannel'
import MessageClient from '@api/shared/MessageClient'

export default class AuthChannelController extends Controller {
  private isUserInRoom: IsUserInRoom

  constructor(isUserInRoom: IsUserInRoom) {
    super()
    this.isUserInRoom = isUserInRoom
  }

  protected async execute(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const { socket_id: socketId, channel_name: channelName } = req.body
    if (!isRoomChannel(channelName)) {
      res.status(403).send(null)
      return
    }

    const isIn = await this.isUserInRoom.dispatch({
      userId: socketId,
      roomId: getRoomIdFromRoomChannel(channelName)
    })

    if (isIn) {
      const auth = MessageClient.auth(socketId, channelName)
      res.status(200).send(auth)
    } else {
      res.status(403).send(null)
    }
  }
}
