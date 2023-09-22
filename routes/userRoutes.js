import express from 'express'
import { updateUser } from '../controllers/userController/index.js'
import {removeInterest} from '../controllers/interestController/index.js'

const userRouter = express.Router()

userRouter.put('/user/:id', updateUser)
userRouter.delete('/users/:userId/interests/:eventId', removeInterest)

export default userRouter;
