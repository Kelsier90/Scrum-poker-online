import mongoose from 'mongoose'
import composeMongoModel from '@api/shared/infrastructure/composeMongoModel'

export interface RoomMongoDoc extends mongoose.Document {
  _id: string
  users: {
    _id: string
    name: string
    isMaster: boolean
    selectedCard: string | null
    hasSelectedCard: boolean
  }[]
  reveal: boolean
  issue: string
}

const roomSchema = new mongoose.Schema({
  _id: String,
  users: [
    {
      _id: String,
      name: String,
      isMaster: Boolean,
      selectedCard: String,
      hasSelectedCard: Boolean
    }
  ],
  reveal: Boolean,
  issue: String
})

const RoomMongoModel = composeMongoModel('Room', roomSchema)

export default RoomMongoModel
