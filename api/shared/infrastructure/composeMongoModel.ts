import mongoose from 'mongoose'
import { EventMongoDoc } from '@api/shared/infrastructure/EventMongoModel'

const composeMongoModel = (
  name: string,
  schema: mongoose.Schema
): mongoose.Model<any> =>
  mongoose.models[name] || mongoose.model<EventMongoDoc>(name, schema)
export default composeMongoModel
