import { Router } from "express";
import { addLike, removeLike } from "../controllers/likeController/index.js";

const likeRouter = Router();

/**
 * @swagger
 * /api/comments/{commentId}/likes/{userId}:
 *   post:
 *     summary: Add a like to a comment
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The ID of the comment to like.
 *         type: integer
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user liking the comment.
 *         type: integer
 *     responses:
 *       '201':
 *         description: Like added successfully.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Remove a like from a comment
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The ID of the comment to remove the like from.
 *         type: integer
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to remove the like.
 *         type: integer
 *     responses:
 *       '200':
 *         description: Like removed successfully.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 */

likeRouter.post("/comments/:commentId/likes/:userId", addLike);
likeRouter.delete("/comments/:commentId/likes/:userId", removeLike);

export default likeRouter;
