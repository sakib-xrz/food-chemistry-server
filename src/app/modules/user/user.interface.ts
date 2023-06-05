type IUser = {
  name: string
  email: string
  password: string
  confirmPassword: string
  verificationCode: string
  passwordResetCode: string | null
  verified: boolean
}

export default IUser
