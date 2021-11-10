import Controller from '@api/app/shared/Controller'
import LeaveRoom from '@api/rooms/application/LeaveRoom'
import { NextApiRequest, NextApiResponse } from 'next'
import MessageClient from '@api/shared/MessageClient'
import {
  getRoomIdFromRoomChannel,
  isRoomChannel
} from '@src/shared/rooms/utils/roomChannel'
import GetUserFromRoom from '@api/rooms/application/GetUserFromRoom'
import ClientEvent from '@src/shared/types/ClientEvent'
import { responseOk } from '@api/app/shared/response'
import GetRoom from '@api/rooms/application/GetRoom'

export default class ChannelPresenceController extends Controller {
  private leaveRoom: LeaveRoom
  private getUserFromRoom: GetUserFromRoom
  private getRoom: GetRoom

  constructor(
    leaveRoom: LeaveRoom,
    getUserFromRoom: GetUserFromRoom,
    getRoom: GetRoom
  ) {
    super()
    this.getRoom = getRoom
    this.getUserFromRoom = getUserFromRoom
    this.leaveRoom = leaveRoom
  }

  protected async execute(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const isValidWebhook = await MessageClient.isValidWebhookRequest(req)

    if (!isValidWebhook) {
      res.status(401).send(null)
      return Promise.resolve()
    }

    const { events } = req.body

    const removedMemberChannels = events.filter(
      ev => ev.name === 'member_removed' && isRoomChannel(ev.channel)
    )

    for (const event of removedMemberChannels) {
      const userId = event.user_id
      const roomId = getRoomIdFromRoomChannel(event.channel)

      const userResponse = await this.getUserFromRoom.dispatch({
        roomId,
        userId
      })

      await this.leaveRoom.dispatch({
        userId,
        roomId
      })

      const messages = []

      if (userResponse)
        messages.push({
          channel: event.channel,
          name: ClientEvent.USER_LEFT_ROOM,
          data: responseOk(userResponse)
        })

      const roomResponse = await this.getRoom.dispatch({
        id: roomId
      })

      if (roomResponse)
        messages.push({
          channel: event.channel,
          name: ClientEvent.UPDATED_ROOM,
          data: responseOk(roomResponse)
        })

      await MessageClient.sendMultiple(messages)
    }

    res.status(200).json({
      events: removedMemberChannels
    })
  }
}
