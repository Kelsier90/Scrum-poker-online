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
import SyncEventBus from '@api/shared/application/SyncEventBus'

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
    return new SyncEventBus(this.getEventRepository())
  }
}
