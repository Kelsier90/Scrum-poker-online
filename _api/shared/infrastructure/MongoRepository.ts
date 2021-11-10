import mongoose, { Mongoose } from 'mongoose'
import RoomMongoModel from '../../rooms/infrastructure/RoomMongoModel'

export default abstract class MongoRepository {
  protected connect(): Promise<Mongoose> {
    return mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  protected async saveDocument(doc: mongoose.Document): Promise<void> {
    const existingDoc = await RoomMongoModel.findById(doc._id)
    doc.isNew = existingDoc === null

    await doc.save()
  }
}
