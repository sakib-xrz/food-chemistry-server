import jwt from 'jsonwebtoken'
import config from '../../config'
import IUser from '../modules/user/user.interface'

const generateToken = (user: Partial<IUser>) => {
  const jwtSecret = config.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined')
  }

  const token = jwt.sign(user, jwtSecret, {
    expiresIn: '1h',
  })

  return token
}

export default generateToken
