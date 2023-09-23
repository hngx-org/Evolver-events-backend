import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Comment from "./Comment.js";
import Image from "./Image.js";

const CommentImages = db.define(
  "comment_images",
  {
    comment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Comment,
        key: "id",
      },
    },
    image_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Image,
        key: "id",
      },
    },
  },
  { timestamps: false, underscored: true },
);

CommentImages.belongsTo(Comment, {foreignKey: "comment_id"})
CommentImages.belongsTo(Image, {foreignKey: "image_id"})

Comment.hasMany(CommentImages, {foreignKey: "comment_id"})
Image.hasMany(CommentImages, {foreignKey: "image_id"})

export default CommentImages;
