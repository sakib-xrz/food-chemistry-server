import { Request, Response } from 'express'
import userService from './user.service'
import bcrypt from 'bcrypt'
import generateToken from '../../utils/generateToken'
import config from '../../../config'
import sendEmail from '../../utils/sentEmail'
import jwt, { JwtPayload } from 'jsonwebtoken'

const createUserHandler = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body

  try {
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    if (password.length <= 7) {
      return res.status(400).json({
        success: false,
        message: 'Password is too short (min 8 chars)',
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      })
    }

    const existingUser = await userService.findUserByEmail(email)

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Account already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = {
      name,
      email,
      password: hashedPassword,
    }

    const token = generateToken(user)

    const activationUrl = `${config.FRONT_END_BASE_URL}/auth/email-verify?token=${token}`

    await sendEmail(user, activationUrl)

    await userService.createUserToDatabase(user)

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

const verifyUserHandler = async (req: Request, res: Response) => {
  const { token } = req.query

  const { JWT_SECRET } = config

  if (!JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: 'JWT secret is missing or undefined',
    })
  }

  const newUser = jwt.verify(token as string, JWT_SECRET) as JwtPayload

  if (!newUser) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Token',
    })
  }

  const { email } = newUser

  const existingUser = await userService.findUserByEmail(email)

  if (existingUser?.verified) {
    return res.status(409).json({
      success: false,
      message: 'Email already Verified',
    })
  }

  await userService.verifyUser(email)

  return res.status(201).json({
    success: true,
    message: 'Email verified successfully',
  })
}

const loginUserHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const { JWT_SECRET } = config

  if (!JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: 'JWT secret is missing or undefined',
    })
  }

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    const user = await userService.findUserByEmail(email)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    if (!user?.verified) {
      return res.status(404).json({
        success: false,
        message: 'Email not verified',
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect email or password',
      })
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: '5h',
    })

    const data = {
      _id: user?._id,
      email: user?.email,
      name: user?.name,
      photo: user?.photo,
    }

    return res.status(201).json({
      success: true,
      message: 'Login successful',
      token: token,
      user: data,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

const getUserHandler = async (req: Request, res: Response) => {
  const auth_Token = req.header('Authorization')

  if (!auth_Token) {
    return res.status(401).json({
      success: false,
      message: 'Authorization token is missing',
    })
  }

  const token = auth_Token.split(' ')[1]
  const { JWT_SECRET } = config

  if (!JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: 'JWT secret is missing or undefined',
    })
  }

  let email: string | JwtPayload

  try {
    email = jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    })
  }

  if (typeof email === 'string') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    })
  }

  const user = await userService.findUserByEmail(email.email)

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Success',
    user,
  })
}


export default {
  createUserHandler,
  verifyUserHandler,
  loginUserHandler,
  getUserHandler
}
