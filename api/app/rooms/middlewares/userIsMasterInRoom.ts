import Container from '../../../shared/Container'
import { NextApiRequest, NextApiResponse } from 'next'
import PermissionDeniedError from '@api/shared/domain/errors/PermissionDeniedError'

const userIsMasterInRoom =
  (userId: string, roomId: string) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (result: unknown) => void
  ) => {
    const isMasterUserInRoom = Container.getIsMasterUserInRoom()

    const exists = await isMasterUserInRoom.dispatch({
      userId,
      roomId
    })

    if (!exists)
      next(new PermissionDeniedError('The user is not the room master'))

    next(null)
  }

export default userIsMasterInRoom
