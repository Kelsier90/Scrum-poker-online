import { NextApiRequest } from 'next'
import { NextApiResponseServerIO } from '@api/app/shared/next'
import { Server as ServerIO, Socket } from 'socket.io'
import { Server as NetServer } from 'http'
import ServerEvent from '@src/shared/types/ServerEvent'
import {
  getRoomIdFromSocketRoom,
  isSocketRoom
} from '@api/app/rooms/utils/socketRoom'
import { applyMiddleware } from '@api/app/shared/middlewares'
import userIsMasterInRoom from '@api/app/rooms/middlewares/userIsMasterInRoom'
import userIsInRoom from '@api/app/rooms/middlewares/userIsInRoom'
import CreateRoomController from '@api/app/rooms/controllers/CreateRoomController'
import JoinRoomController from '@api/app/rooms/controllers/JoinRoomController'
import LeaveRoomController from '@api/app/rooms/controllers/LeaveRoomController'
import RemoveRoomController from '@api/app/rooms/controllers/RemoveRoomController'
import SelectCardController from '@api/app/rooms/controllers/SelectCardController'
import RevealCardsController from '@api/app/rooms/controllers/RevealCardsController'
import ResetRoomController from '@api/app/rooms/controllers/ResetRoomController'
import SetRoomIssueController from '@api/app/rooms/controllers/SetRoomIssueController'
import PromoteRoomUserController from '@api/app/rooms/controllers/PromoteRoomUserController'
import DemoteRoomUserController from '@api/app/rooms/controllers/DemoteRoomUserController'
import KickRoomUserController from '@api/app/rooms/controllers/KickRoomUserController'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log('New Socket.io server...')
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: '/api/socket'
    })

    io.on('connection', async (socket: Socket) => {
      // CREATE ROOM
      socket.on(ServerEvent.CREATE_ROOM, async data => {
        await CreateRoomController(io, socket, data)
      })

      // JOIN ROOM
      socket.on(ServerEvent.JOIN_ROOM, async data => {
        await JoinRoomController(io, socket, data)
      })

      // LEAVE ROOM
      socket.on(ServerEvent.LEAVE_ROOM, async ({ id }) => {
        await LeaveRoomController(io, socket, { id, userId: socket.id })
      })

      // SELECT CARD
      socket.on(ServerEvent.SELECT_CARD, async data => {
        await applyMiddleware(
          socket,
          [userIsInRoom(socket.id, data.roomId)],
          () => SelectCardController(io, socket, data)
        )
      })

      // REVEAL CARDS
      socket.on(ServerEvent.REVEAL_CARDS, async data => {
        await applyMiddleware(
          socket,
          [userIsMasterInRoom(socket.id, data.roomId)],
          () => RevealCardsController(io, socket, data)
        )
      })

      // RESET ROOM
      socket.on(ServerEvent.RESET_ROOM, async data => {
        await applyMiddleware(
          socket,
          [userIsMasterInRoom(socket.id, data.roomId)],
          () => ResetRoomController(io, socket, data)
        )
      })

      // SET ROOM ISSUE
      socket.on(ServerEvent.SET_ROOM_ISSUE, async data => {
        await applyMiddleware(
          socket,
          [userIsMasterInRoom(socket.id, data.roomId)],
          () => SetRoomIssueController(io, socket, data)
        )
      })

      // PROMOTE ROOM USER
      socket.on(ServerEvent.PROMOTE_ROOM_USER, async data => {
        await applyMiddleware(
          socket,
          [userIsMasterInRoom(socket.id, data.roomId)],
          () => PromoteRoomUserController(io, socket, data)
        )
      })

      // DEMOTE ROOM USER
      socket.on(ServerEvent.DEMOTE_ROOM_USER, async data => {
        await applyMiddleware(
          socket,
          [userIsMasterInRoom(socket.id, data.roomId)],
          () => DemoteRoomUserController(io, socket, data)
        )
      })

      // KICK ROOM USER
      socket.on(ServerEvent.KICK_ROOM_USER, async data => {
        await applyMiddleware(
          socket,
          [userIsMasterInRoom(socket.id, data.roomId)],
          () => KickRoomUserController(io, socket, data)
        )
      })
    })

    // LEAVE ROOM
    io.of('/').adapter.on('leave-room', async (room, id) => {
      if (isSocketRoom(room)) {
        await LeaveRoomController(io, null, {
          id: getRoomIdFromSocketRoom(room),
          userId: id
        })
      }
    })

    // REMOVE ROOM
    io.of('/').adapter.on('delete-room', async room => {
      if (isSocketRoom(room)) {
        await RemoveRoomController({ id: getRoomIdFromSocketRoom(room) })
      }
    })

    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io
  }
  res.end()
}
