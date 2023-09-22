import express from "express";
import { listComments } from "../controllers/commentController/index.js";

const commentRouter = express.Router();

/**
 * @swagger
 * /events/{eventId}/comment:
 *   get:
 *     summary: Get comments for a specific event
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: The ID of the event for which to retrieve comments.
 *         type: integer
 *     responses:
 *       '200':
 *         description: Comments retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */

commentRouter.get("/events/:eventId/comment", listComments);

export default commentRouter;
