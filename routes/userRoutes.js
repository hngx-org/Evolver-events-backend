import express from "express";
import { updateUser } from "../controllers/userController/index.js";
import {
  interestsAuthorisation,
  userAuthorisation,
  userCRUDAuthorisation,
} from "../middleware/authorization.js";

import { removeInterest } from "../controllers/interestController/index.js";

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


userRouter.put(
  "/user/:id",
  userAuthorisation,
  userCRUDAuthorisation,
  updateUser,
);

//awaiting user post interest controller
userRouter
  .route("/users/:userId/interests/:eventId")
  .delete(userAuthorisation, interestsAuthorisation, removeInterest)
  .post(userAuthorisation, interestsAuthorisation); //awaiting user post interest controller to follow

export default userRouter;
