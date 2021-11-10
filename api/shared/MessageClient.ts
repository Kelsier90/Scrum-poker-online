import Pusher from 'pusher'
import ClientEvent from '@src/shared/types/ClientEvent'
import { NextApiRequest } from 'next'
// import getRawBody from 'raw-body'
// import contentType from 'content-type'

export default abstract class MessageClient {
  private static readonly client: Pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
  })

  public static send(
    channel: string,
    message: { name: ClientEvent; data: unknown }
  ): Promise<void> {
    return MessageClient.client.trigger(channel, message.name, message.data)
  }

  public static sendMultiple(
    messages: { channel: string; name: ClientEvent; data: unknown }[]
  ): Promise<void> {
    return MessageClient.client.triggerBatch(messages)
  }

  static auth(userId: string, channel: string) {
    return MessageClient.client.authenticate(userId, channel, {
      user_id: userId,
      user_info: { name: userId }
    })
  }

  static async isValidWebhookRequest(req: NextApiRequest): Promise<boolean> {
    // const rawBody = await getRawBody(req, {
    //   length: req.headers['content-length'],
    //   encoding: contentType.parse(req).parameters.charset
    // })
    //
    // return this.client
    //   .webhook({
    //     headers: req.headers,
    //     rawBody
    //   })
    //   .isValid()

    return Promise.resolve(
      req.headers['x-pusher-key'] === process.env.PUSHER_KEY &&
        req.headers['x-pusher-signature'] !== undefined
    )
  }
}
