import { Request, Response } from 'express'
import userService from './user.service'
import bcrypt from 'bcrypt'
import generateToken from '../../utils/generateToken'
import config from '../../../config'
import sendEmail from '../../utils/sentEmail'

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

export default {
  createUserHandler,
}
