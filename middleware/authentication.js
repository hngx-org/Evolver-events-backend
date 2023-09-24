import User from "../models/User.js";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import TwitterStrategy from "passport-twitter";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID, // Your Credentials here.
      clientSecret: process.env.CLIENTSECRET, // Your Credentials here.
      // if environment is development, use process.env.URLGOOGLEDEV else use process.env.URLGOOGLE
      callbackURL:
        process.env.NODE_ENV === "development"
          ? process.env.URLGOOGLEDEV
          : process.env.URLGOOGLE,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({
        where: {
          id: profile.id.toString(),
          name: profile.name.givenName + " " + profile.name.familyName,
          email: profile.emails[0].value,
          avatar: profile.picture,
        },
      })
        .then((user, created) => {
          return done(null, user);
        })
        .catch((err) => {
          console.log(err);
          return done(new Error("Internal Server Error"));
        });
    },
  ),
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.CONSUMERKEY,
      consumerSecret: process.env.CONSUMERSECRET,
      callbackURL: process.env.URLTWITTER,
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, done) {
      User.findOrCreate({
        where: {
          id: profile.id.toString(),
          name: profile.displayName,
          email: "null",
          avatar: profile.photos[0].value,
        },
      })
        .then((user, created) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(new Error("Internal Server Error"));
        });
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
