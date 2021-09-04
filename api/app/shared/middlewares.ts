import { Socket } from 'socket.io'

type Middleware = (socket: Socket) => Promise<boolean>

export default Middleware

export const applyMiddleware = async (
  socket: Socket,
  middlewares: Middleware[],
  callback: () => Promise<unknown>
): Promise<unknown> => {
  let ok = true

  for (const middleware of middlewares) {
    const r = await middleware(socket)
    if (!r) {
      ok = false
      break
    }
  }

  if (ok) return callback()
}
