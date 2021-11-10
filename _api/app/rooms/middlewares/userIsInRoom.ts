import Container from '../../../shared/Container'
import { NextApiRequest, NextApiResponse } from 'next'
import PermissionDeniedError from '@api/shared/domain/errors/PermissionDeniedError'

const userIsInRoom =
  (userId: string, roomId: string) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (result: unknown) => void
  ) => {
    const isUserInRoom = Container.getIsUserInRoom()

    const exists = await isUserInRoom.dispatch({
      userId,
      roomId
    })

    if (!exists) next(new PermissionDeniedError('The user is not in the room'))

    next(null)
  }

export default userIsInRoom
