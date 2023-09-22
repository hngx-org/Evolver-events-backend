import { Sequelize, DataTypes } from "sequelize";

import db from "../config/db.js";
import Image from "./Image.js";
import Group from "./Group.js";

const GroupImage = db.define("group_image", {
  group_id: {
    type: DataTypes.UUID,
    references: {
      model: Group,
      key: "id",
    },
  },
  image_id: {
    type: DataTypes.UUID,
    references: {
      model: Image,
      key: "id",
    },
  },
});

Group.belongsToMany(Image, { through: GroupImage });
Image.belongsToMany(Group, { through: GroupImage });

export default GroupImage;
