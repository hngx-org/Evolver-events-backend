import { DataTypes } from "sequelize";

import db from "../config/db.js";

const Like = db.define(
  "like",
  {
    commentId: {
      type: DataTypes.UUID,
      references: {
        model: Comment,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "like_events",
    underscored: true,
  }
);

// User.belongsToMany(Event, { through: Like });
// Comment.belongsToMany(User, { through: Like });
export default Like;
