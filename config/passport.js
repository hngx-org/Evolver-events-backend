import passport from "passport";
import { Strategy as GoogleStrategy } from"passport-google-oauth20"
import User from "../models/User.js";

// serialize the user
passport.serializeUser((user, done) => {
    done(null, user);
  });


  passport.deserializeUser((id, done) => {
    const user = User .findByPk(id)
    done(null, user);
  });
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4500/auth/google/callback",
        // passReqToCallback : true
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({where:{ 'google.id': profile.id }});
            // if user exists return the user 
            if (existingUser) {
              return done(null, existingUser);
            }
            // if user does not exist create a new user
            console.log('Creating new user...');
            const newUser = new User({
              method: 'google',
              google: {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar:profile._json.picture
              }
            });
            await newUser.save();
            return done(null, newUser,accessToken,refreshToken);
        } catch (error) {
            return done(error, false)
        }
      }
    ));
 
    export default passport;