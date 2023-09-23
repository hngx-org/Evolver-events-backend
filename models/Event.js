import { DataTypes } from "sequelize";
import User from "./User.js";
import Comment from "./Comment.js";


import db from "../config/db.js";

const Event = db.define(
  "event",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    location: DataTypes.TEXT,
    creator_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
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

Event.belongsTo(User, { foreignKey: "creator_id" });
User.hasMany(Event, { foreignKey: "creator_id" });



export default Event;
