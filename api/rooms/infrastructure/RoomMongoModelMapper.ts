import RoomMongoModel, { RoomMongoDoc } from './RoomMongoModel'
import Room from '../domain/Room'
import Id from '../../shared/domain/Id'
import RoomUserId from '../domain/RoomUserId'
import RoomUserName from '../domain/RoomUserName'
import RoomUserCard from '../domain/RoomUserCard'
import RoomUser from '../domain/RoomUser'
import RoomIssue from '../domain/RoomIssue'

export default abstract class RoomMongoModelMapper {
  public static getMongoDoc(entity: Room): RoomMongoDoc {
    return new RoomMongoModel({
      _id: entity.id.getValue(),
      users: entity.users.map(user => ({
        _id: user.id.getValue(),
        name: user.name.getValue(),
        isMaster: user.isMaster,
        selectedCard: user.selectedCard?.getValue() || null
      })),
      reveal: entity.reveal,
      issue: entity.issue?.getValue()
    })
  }

  public static getEntity(doc: RoomMongoDoc): Room {
    const users: RoomUser[] = []

    for (const docUser of doc.users) {
      users.push({
        id: new RoomUserId(docUser._id),
        name: new RoomUserName(docUser.name),
        isMaster: docUser.isMaster,
        selectedCard: docUser.selectedCard
          ? new RoomUserCard(docUser.selectedCard)
          : null
      })
    }

    return {
      id: new Id(doc._id),
      users,
      reveal: doc.reveal,
      issue: doc.issue ? new RoomIssue(doc.issue) : undefined
    }
  }
}
