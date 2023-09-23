import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Group from "./Group.js";
import Event from "./Event.js";

const GroupEvents = db.define(
  "group_events",
  {
    group_id: {
      type: DataTypes.UUID,
      references: {
        model: Group,
        key: "id",
      },
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.UUID,
      references: {
        model: Event,
        key: "id",
      },
      primaryKey: true,
    },
  },
  { freezeTableName: true, timestamps: false },
);

Group.belongsToMany(Event, { through: GroupEvents });
Event.belongsToMany(Group, { through: GroupEvents });

export default GroupEvents;
