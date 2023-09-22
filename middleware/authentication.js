import db from "./config/db.js";
const User = db.user;
import passport from 'passport';
import Google from 'passport-google-oauth2';
import Twitter from 'passport-twitter';
const GoogleStrategy = Google.Strategy;
const TwitterStrategy = Twitter.Strategy;
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
		return done(new Error('Internal Server Error'))
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
		return done(new Error('Internal Server Error'))
	   })
}))

passport.serializeUser((user , done) => {
	done(null, user);
})
passport.deserializeUser(function(userId, done){
	done(null, user);
  });