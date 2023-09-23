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
import express from "express";
import { listComments } from "../controllers/commentController/index.js";

import { userAuthorisation } from "../middleware/authorization.js";
const commentRouter = express.Router();

commentRouter.get("/events/:eventId/comments", userAuthorisation, listComments);

export default commentRouter;
