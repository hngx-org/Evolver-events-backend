import express from 'express'
import { updateUser } from '../controllers/userController/index.js'
import { googleCallback, googleLogin } from '../controllers/userController/methods/loginUser.js'

const userRouter = express.Router()

userRouter.put('/user/:id', updateUser)
userRouter.get('/auth/google',googleLogin);
userRouter.get('/auth/google/callback',googleCallback);

export default userRouter;
