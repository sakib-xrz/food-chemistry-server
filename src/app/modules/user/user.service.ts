import IUser from "./user.interface"
import { User } from "./user.model"

const createUserToDatabase = (data: Partial<IUser>) => {
    return User.create(data)
}

const findUserByEmail = async (email:string) => {
    return User.findOne({ email: email })
}

export default {
  createUserToDatabase,
  findUserByEmail,
}