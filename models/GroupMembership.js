import { Sequelize, DataTypes } from "sequelize";

import db from "../config/db.js";

const GroupMembership = db.define("GroupMembership", {
  group_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
});

export default GroupMembership;
