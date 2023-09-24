import { DataTypes } from "sequelize";

import User from "./User.js";
import Comment from "./Comment.js";

import db from "../config/db.js";

const Likes = db.define(
  "likes",
  {
    comment_id: {
      type: DataTypes.UUID,
      references: {
        model: Comment,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "likes",
    underscored: true,
    timestamps: false,
  },
);

User.belongsToMany(Comment, { through: Likes, foreignKey: "user_id" });
Comment.belongsToMany(User, { through: Likes, foreignKey: "comment_id" });

export default Likes;
