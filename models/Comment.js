import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Event from "./Event.js";
import User from "./User.js";

const Comment = db.define(
  "comment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    body: {
      type: DataTypes.TEXT,
      defaultValue: "",
      allowNull: false,
    },
    event_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Event,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  },
);

Comment.belongsTo(Event, { foreignKey: "event_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

Event.hasMany(Comment, { foreignKey: "event_id" });
User.hasMany(Comment, { foreignKey: "user_id" });

export default Comment;
