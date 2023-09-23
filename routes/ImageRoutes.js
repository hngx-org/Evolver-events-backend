import express from "express";
import { addImageToComment } from "../controllers/imageController/index.js";
import { userAuthorisation } from "../middleware/authorization.js";

const ImageRoutes = express.Router();

ImageRoutes.post(
  "/comments/:commentId/images",
  userAuthorisation,
  addImageToComment,
);

export default ImageRoutes;
