import express from 'express'
import { updateUser, registerUser } from '../controllers/userController/index.js'

const userRouter = express.Router()

userRouter.post('/auth', registerUser);

userRouter.put('/user/:id', updateUser);

export default userRouter;
