import mongoose from 'mongoose'

export default abstract class TestDatabase {
  public static async reset(): Promise<void> {
    if (process.env.NODE_ENV === 'test') {
      await mongoose.connection?.db?.dropDatabase()
    }
  }

  public static async disconnect(): Promise<void> {
    if (process.env.NODE_ENV === 'test') {
      await mongoose.connection?.close()
    }
  }
}
