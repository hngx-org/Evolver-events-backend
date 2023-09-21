import { DataTypes } from "sequelize";

import db from "../config/db.js";

const Event = db.define("event", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: DataTypes.TEXT,
  description: DataTypes.TEXT,
  location: DataTypes.TEXT,
  creator_id: DataTypes.UUID,
  start_date: DataTypes.DATE,
  end_date: DataTypes.DATE,
  start_time: DataTypes.TIME,
  end_time: DataTypes.TIME,
});

export default Event;
