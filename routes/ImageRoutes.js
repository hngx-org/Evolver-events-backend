import express from "express";
import { addImageToComment } from "../controllers/imageController/index.js";

const ImageRoutes = express.Router();

ImageRoutes.post("/comments/:commentId/images", addImageToComment);

export default ImageRoutes;
