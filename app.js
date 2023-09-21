import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import db from './config/db.js';
import passport from 'passport';
import cookieSession from 'cookie-session';
require('./config/passport');
// Create Express app
const app = express();

// Enable CORS
app.use(cors());

// Parse requests of content-type - application/toJSON();
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  key: process.env.KEY, // The name of the cookie to store the session data
  secret: process.env.SECRET, // A secret string used to sign and encrypt the cookie
  maxAge: 24 * 60 * 60 * 1000 // The maximum age of the cookie in milliseconds
}));
app.use(passport.initialize());
app.use(passport.session());

// define api root route
app.use("/api", router);
require('./routes/authRoute.js')(app);


db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
