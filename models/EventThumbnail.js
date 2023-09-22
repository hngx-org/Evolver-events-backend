import { Sequelize, DataTypes } from "sequelize";
import Event from "./Event.js";
import Image from "./Image.js";

import db from "../config/db.js";

const EventThumbnail = db.define("event_thumbnail", {
  image_id: {
    type: DataTypes.UUID,
    references: {
      model: Image,
      key: "id",
    },
  },
  event_id: {
    type: DataTypes.UUID,
    references: {
      model: Event,
      key: "id",
    },
  },
});

Event.belongsToMany(Image, { through: EventThumbnail });
Image.belongsToMany(Event, { through: EventThumbnail });

export default EventThumbnail;
