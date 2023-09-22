import { DataTypes } from "sequelize";
import db from "../config/db.js";

const CommentImages = db.define(
  "comment_images",
  {
    comment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "comment",
        key: "id",
      },
    },
    image_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "image",
        key: "id",
      },
    },
  },
  { timestamps: false, underscored: true },
);

export default CommentImages;
