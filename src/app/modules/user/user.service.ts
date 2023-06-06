import IUser from './user.interface'
import { User } from './user.model'

const createUserToDatabase = (data: Partial<IUser>) => {
  return User.create(data)
}

const findUserByEmail = async (email: string) => {
  return User.findOne({ email: email })
}

const findUserById = async (id: string) => {
  return User.findById(id)
}

const verifyUser = async (email: string) => {
  return User.findOneAndUpdate({ email: email }, { verified: true })
}

export default {
  createUserToDatabase,
  findUserByEmail,
  verifyUser,
  findUserById,
}
