require('../config/passport');
const passport = require('passport');
const users = require("../controllers/userController/methods/loginUser");
const router = require("express").Router();

module.exports = function(app) {
// router.get("/", users.index); uncomment to test
    router.get("/auth/google", passport.authenticate('google', { scope:
        [ 'email', 'profile' ]
    }), users.authGoogle);
    router.get("/auth/twitter", passport.authenticate('twitter'));
    router.get("/auth/callback/google",passport.authenticate('google', { failureRedirect: '/', failureMessage: true }), users.authGoogle);
    router.get("/auth/callback/twitter", passport.authenticate('twitter', { failureRedirect: '/', failureMessage: true }), users.authTwitter);
    router.get("/logout", users.logout);

    app.use('/',router)
    

}