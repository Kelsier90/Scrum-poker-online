import mongoose from 'mongoose'
import composeMongoModel from '@api/shared/infrastructure/composeMongoModel'

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

const EventMongoModel = composeMongoModel('Event', eventSchema)

export default EventMongoModel
