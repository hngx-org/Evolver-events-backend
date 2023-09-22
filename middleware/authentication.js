import User from "./../models/User.js";
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import dotenv from "dotenv";
dotenv.config();
const env = process.env.NODE_ENV;

passport.use(new GoogleStrategy({
	clientID: process.env.CLIENTID, // Your Credentials here.
	clientSecret: process.env.CLIENTSECRET, // Your Credentials here.
	callbackURL: process.env.URLGOOGLE ,
	passReqToCallback:true
},
function(request, accessToken, refreshToken, profile, done) {
	User.findOrCreate({ where: {
		id: profile.id.toString(),
		name: profile.name.givenName + ' ' + profile.name.familyName,
		email: profile.emails[0].value,
		avatar: profile.picture
	   }})
	   .then((user, created) => {
		return done(null, user)
	   })
	   .catch((err) => {
		return done(err)
	   })
}
));

passport.use(new TwitterStrategy({
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
    callbackURL: process.env.URLTWITTER,
	passReqToCallback:true
},
function(req, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ where: {
		id: profile.id.toString(),
		name: profile.displayName,
		email: "null",
		avatar: profile.photos[0].value
	   }})
	   .then((user, created) => {
		return done(null, user)
	   })
	   .catch((err) => {
		return done(err)
	   })
}))

passport.serializeUser((user , done) => {
	done(null, user);
})
passport.deserializeUser(function(user, done){
		done(null, user);
  });