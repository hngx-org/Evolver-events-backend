import { DataTypes } from "sequelize";

import db from "../config/db.js";

const Image = db.define(
  "image",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: false },
);

export default Image;
