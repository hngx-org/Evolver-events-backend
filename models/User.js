import db from "../config/db.js";
import { DataTypes } from "sequelize";

const User = db.define(
  "user",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
  },
);

export default User;
