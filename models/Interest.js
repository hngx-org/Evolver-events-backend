import {  DataTypes } from "sequelize";

import db from "../config/db.js";

const Interest = db.define(
  "interest",
  {
    EventId: {
      type: DataTypes.UUID,
      references: {
        model: Event,
        key: "id",
      },
    },
    UserId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "interested_events",
    underscored: true,
  }
);
User.belongsToMany(Event, { through: Interest });
Event.belongsToMany(User, { through: Interest });

export default Interest;
