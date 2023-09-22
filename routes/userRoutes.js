import express from 'express'
import { updateUser, registerUser } from '../controllers/userController/index.js'
import {removeInterest} from '../controllers/interestController/index.js'

const userRouter = express.Router()

userRouter.put('/user/:id', updateUser)
userRouter.delete('/users/:userId/interests/:eventId', removeInterest)
userRouter.post('/auth', registerUser);



export default userRouter;
