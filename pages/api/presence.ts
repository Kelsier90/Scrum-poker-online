import { NextApiRequest, NextApiResponse } from 'next'
import Container from '@api/shared/Container'

// export const config = {
//   api: {
//     bodyParser: false
//   }
// }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const controller = Container.getChannelPresenceController()

  await controller.run('POST', req, res)
}
