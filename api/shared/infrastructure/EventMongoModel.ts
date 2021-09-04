import mongoose from 'mongoose'

export interface EventMongoDoc extends mongoose.Document {
  _id: string
  name: string
  aggregateId: string
  data: Record<string, unknown>
  date: Date
}

const eventSchema = new mongoose.Schema({
  _id: String,
  name: String,
  aggregateId: String,
  data: {},
  date: Date
})

const EventMongoModel = mongoose.model<EventMongoDoc>('Event', eventSchema)

export default EventMongoModel
