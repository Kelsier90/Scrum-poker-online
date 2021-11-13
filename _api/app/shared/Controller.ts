import { NextApiRequest, NextApiResponse } from 'next'
import InvalidDataError from '@api/shared/domain/errors/InvalidDataError'
import ResourceNotFoundError from '@api/shared/domain/errors/ResourceNotFoundError'
import InvalidOperationError from '@api/shared/domain/errors/InvalidOperationError'
import PermissionDeniedError from '@api/shared/domain/errors/PermissionDeniedError'
import cors from '@api/app/rooms/middlewares/cors'

export default abstract class Controller {
  public async run(
    httpMethod: string,
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    try {
      await this.runMiddleware(req, res, cors(httpMethod))
      await this.execute(req, res)
    } catch (e) {
      if (e instanceof TypeError) {
        res.status(400).json({ status: 'error', message: 'Bad request' })
      } else if (e instanceof InvalidDataError) {
        res.status(400).json({ status: 'error', message: e.message })
      } else if (e instanceof PermissionDeniedError) {
        res.status(403).json({ status: 'error', message: e.message })
      } else if (e instanceof ResourceNotFoundError) {
        res.status(404).json({ status: 'error', message: e.message })
      } else if (e instanceof InvalidOperationError) {
        res.status(409).json({ status: 'error', message: e.message })
      } else {
        res.status(500).json({ status: 'error', message: 'Unexpected error' })
      }
    }
  }

  protected getAuthUserId(req: NextApiRequest): string {
    return req.headers.authorization
  }

  protected abstract execute(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void>

  protected runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: any
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      fn(req, res, result => {
        if (result instanceof Error) {
          return reject(result)
        }

        return resolve(result)
      })
    })
  }
}
