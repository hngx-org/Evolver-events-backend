import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import db from './config/db.js';
import passport from 'passport';
import  './config/passport.js'
import session from 'express-session';
// Create Express app
const app = express();

// Enable CORS
app.use(cors());

app.use(
  session({
    name: 'google-auth-session',
    secret: "test",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Parse requests of content-type - application/toJSON();
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.get(
//   "/auth/google/redirect",
//   passport.authenticate("google", { session: false }),
//   (req, res) => {
//     jwt.sign(
//       { user: req.user },
//       "secretKey",
//       { expiresIn: "1h" },
//       (err, token) => {
//         if (err) {
//           return res.json({
//             token: null,
//           });
//         }
//         res.json({
//           token,
//         });
//       }
//     );
//   }
// );

// define api root route
app.use("/api", router);


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
