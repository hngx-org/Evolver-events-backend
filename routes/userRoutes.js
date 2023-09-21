import express from 'express'
import { updateUser } from '../controllers/userController/index.js'

const userRouter = express.Router()

userRouter.put('/user/:id', updateUser)

export default userRouter;
