import db from "../config/db.js";

db.authenticate().then(() => {
  console.log("Connection has been established successfully.");
});

// error will be thrown if test fails
