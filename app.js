import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

// Create Express app
const app = express();

// Enable CORS
app.use(cors());

// Parse requests of content-type - application/toJSON();
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// define api root route
app.use("/api", router);

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
