import express from 'express'
import userController from './user.controller'
const router = express.Router()

router.post('/create-user', userController.createUserHandler)
router.post('/verify-email', userController.verifyUserHandler)

export default router
