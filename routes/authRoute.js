import express from 'express'
import '../middleware/authentication.js'
import { authGoogle } from '../controllers/userController/index.js'
import { logout } from '../controllers/userController/index.js'
import { authTwitter } from '../controllers/userController/index.js'
import passport from 'passport';

const authRouter = express.Router()

authRouter.get('/auth/google', passport.authenticate('google', { scope:
    [ 'email', 'profile' ]
}))
authRouter.get("/auth/twitter", passport.authenticate('twitter'));
authRouter.get('/auth/callback/google',passport.authenticate('google', { failureRedirect: '/', failureMessage: true }),authGoogle)
authRouter.get("/auth/callback/twitter", passport.authenticate('twitter', { failureRedirect: '/', failureMessage: true }), authTwitter);
authRouter.get('/logout', logout)

export default authRouter;