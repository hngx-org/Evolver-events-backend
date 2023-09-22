import express from "express";
import {
  addImageToComment,
  getImagesForComment,
} from "../controllers/imageController/index.js";

const ImageRoutes = express.Router();

/**
 * @swagger
 * /api/comments/{commentId}/images:
 *   post:
 *     summary: Add an image to a comment
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The ID of the comment to which the image will be added.
 *         type: integer
 *     requestBody:
 *       description: Image data to add to the comment.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Image added successfully to the comment.
 *       '500':
 *         description: Internal server error.
 *   get:
 *     summary: Get images for a comment
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The ID of the comment for which to retrieve images.
 *         type: integer
 *     responses:
 *       '200':
 *         description: Images retrieved successfully for the comment.
 *       '500':
 *         description: Internal server error.
 */

ImageRoutes.post("/comments/:commentId/images", addImageToComment);
ImageRoutes.get("/comments/:commentId/images", getImagesForComment);

export default ImageRoutes;
