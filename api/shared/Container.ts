import eventMap from '@api/shared/infrastructure/eventMap'
import RoomRepository from '@api/rooms/domain/RoomRepository'
import MongoRoomRepository from '@api/rooms/infrastructure/MongoRoomRepository'
import CreateRoom from '@api/rooms/application/CreateRoom'
import JoinRoom from '@api/rooms/application/JoinRoom'
import GetRoom from '@api/rooms/application/GetRoom'
import LeaveRoom from '@api/rooms/application/LeaveRoom'
import RemoveRoom from '@api/rooms/application/RemoveRoom'
import SelectCard from '@api/rooms/application/SelectCard'
import RevealCards from '@api/rooms/application/RevealCards'
import ResetRoom from '@api/rooms/application/ResetRoom'
import SetRoomIssue from '@api/rooms/application/SetRoomIssue'
import IsUserInRoom from '@api/rooms/application/IsUserInRoom'
import IsMasterUserInRoom from '@api/rooms/application/IsMasterUserInRoom'
import GetUserFromRoom from '@api/rooms/application/GetUserFromRoom'
import PromoteRoomUser from '@api/rooms/application/PromoteRoomUser'
import DemoteRoomUser from '@api/rooms/application/DemoteRoomUser'
import EventRepository from '@api/shared/domain/EventRepository'
import MongoEventRepository from '@api/shared/infrastructure/MongoEventRepository'
import EventBus from '@api/shared/domain/EventBus'
import SyncEventBus from '@api/shared/infrastructure/SyncEventBus'
import CreateRoomController from '@api/app/rooms/controllers/CreateRoomController'
import JoinRoomController from '@api/app/rooms/controllers/JoinRoomController'
import LeaveRoomController from '@api/app/rooms/controllers/LeaveRoomController'
import SelectCardController from '@api/app/rooms/controllers/SelectCardController'
import RevealCardsController from '@api/app/rooms/controllers/RevealCardsController'
import ResetRoomController from '@api/app/rooms/controllers/ResetRoomController'
import SetRoomIssueController from '@api/app/rooms/controllers/SetRoomIssueController'
import PromoteRoomUserController from '@api/app/rooms/controllers/PromoteRoomUserController'
import DemoteRoomUserController from '@api/app/rooms/controllers/DemoteRoomUserController'
import KickRoomUserController from '@api/app/rooms/controllers/KickRoomUserController'
import AuthChannelController from '@api/app/auth/controllers/AuthChannelController'
import ChannelPresenceController from '@api/app/presence/controllers/ChannelPresenceController'
import OnUserHasLeftRoomEventHandler from '@api/rooms/application/OnUserHasLeftRoomEventHandler'

export default abstract class Container {
  public static getRoomRepository(): RoomRepository {
    return new MongoRoomRepository()
  }

  public static getCreateRoom(): CreateRoom {
    return new CreateRoom(this.getRoomRepository(), this.getEventBus())
  }

  public static getJoinRoom(): JoinRoom {
    return new JoinRoom(this.getRoomRepository(), this.getEventBus())
  }

  public static getLeaveRoom(): LeaveRoom {
    return new LeaveRoom(this.getRoomRepository(), this.getEventBus())
  }

  public static getRemoveRoom(): RemoveRoom {
    return new RemoveRoom(this.getRoomRepository())
  }

  public static getGetRoom(): GetRoom {
    return new GetRoom(this.getRoomRepository())
  }

  public static getSelectCard(): SelectCard {
    return new SelectCard(this.getRoomRepository())
  }

  public static getRevealCards(): RevealCards {
    return new RevealCards(this.getRoomRepository())
  }

  public static getResetRoom(): ResetRoom {
    return new ResetRoom(this.getRoomRepository())
  }

  public static getSetRoomIssue(): SetRoomIssue {
    return new SetRoomIssue(this.getRoomRepository())
  }

  public static getIsUserInRoom(): IsUserInRoom {
    return new IsUserInRoom(this.getRoomRepository())
  }

  public static getGetUserFromRoom(): GetUserFromRoom {
    return new GetUserFromRoom(this.getRoomRepository())
  }

  public static getIsMasterUserInRoom(): IsMasterUserInRoom {
    return new IsMasterUserInRoom(this.getRoomRepository())
  }

  static getPromoteRoomUser(): PromoteRoomUser {
    return new PromoteRoomUser(this.getRoomRepository())
  }

  static getDemoteRoomUser(): DemoteRoomUser {
    return new DemoteRoomUser(this.getRoomRepository())
  }

  static getEventRepository(): EventRepository {
    return new MongoEventRepository()
  }

  static getEventBus(): EventBus {
    return new SyncEventBus(eventMap, this.getEventRepository())
  }

  static getCreateRoomController(): CreateRoomController {
    return new CreateRoomController(this.getCreateRoom(), this.getGetRoom())
  }

  static getJoinRoomController(): JoinRoomController {
    return new JoinRoomController(
      this.getJoinRoom(),
      this.getGetRoom(),
      this.getGetUserFromRoom()
    )
  }

  static getLeaveRoomController(): LeaveRoomController {
    return new LeaveRoomController(
      this.getLeaveRoom(),
      this.getGetUserFromRoom(),
      this.getGetRoom()
    )
  }

  static getSelectCardController(): SelectCardController {
    return new SelectCardController(this.getSelectCard(), this.getGetRoom())
  }

  static getRevealCardsController(): RevealCardsController {
    return new RevealCardsController(this.getRevealCards(), this.getGetRoom())
  }

  static getResetRoomController(): ResetRoomController {
    return new ResetRoomController(this.getResetRoom(), this.getGetRoom())
  }

  static getSetRoomIssueController(): SetRoomIssueController {
    return new SetRoomIssueController(this.getSetRoomIssue(), this.getGetRoom())
  }

  static getPromoteRoomUserController(): PromoteRoomUserController {
    return new PromoteRoomUserController(
      this.getPromoteRoomUser(),
      this.getGetRoom()
    )
  }

  static getDemoteRoomUserController(): DemoteRoomUserController {
    return new DemoteRoomUserController(
      this.getDemoteRoomUser(),
      this.getGetRoom()
    )
  }

  static getKickRoomUserController(): KickRoomUserController {
    return new KickRoomUserController(
      this.getLeaveRoom(),
      this.getGetUserFromRoom(),
      this.getGetRoom()
    )
  }

  static getAuthChannelController(): AuthChannelController {
    return new AuthChannelController(this.getIsUserInRoom())
  }

  static getChannelPresenceController(): ChannelPresenceController {
    return new ChannelPresenceController(
      this.getLeaveRoom(),
      this.getGetUserFromRoom(),
      this.getGetRoom()
    )
  }

  static getOnUserHasLeftRoomEventHandler(): OnUserHasLeftRoomEventHandler {
    return new OnUserHasLeftRoomEventHandler(
      this.getGetRoom(),
      this.getRemoveRoom()
    )
  }
}
