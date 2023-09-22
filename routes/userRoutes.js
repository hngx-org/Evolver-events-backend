import express from "express";
import { updateUser } from "../controllers/userController/index.js";

const userRouter = express.Router();

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user's profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: User data to update.
 *       required: true
 *       content:
 *         application/json:

 *     responses:
 *       '200':
 *         description: User updated successfully.
 *         content:
 *           application/json:

 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:

 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:

 */

userRouter.put("/user/:id", updateUser);

export default userRouter;
