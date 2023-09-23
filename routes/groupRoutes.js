import express from "express";
import {
  addUserToGroup,
  removeUserFromGroup,
  createGroup,
} from "../controllers/groupController/index.js";
import {
  groupCrudAuthorisation,
  groupMembershipCrudAuthorisation,
  userAuthorisation,
} from "../middleware/authorization.js";
import {
  getGroupDetails,
  deleteGroup,
  updateGroup,
} from "../controllers/groupController/index.js";

const groupRouter = express.Router();

/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Create a new group
 *     requestBody:
 *       description: Group data to create a new group.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Group created successfully.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 *   put:
 *     summary: Update group details
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: The ID of the group to update.
 *         type: integer
 *     requestBody:
 *       description: New group data to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Group details updated successfully.
 *       '404':
 *         description: Group not found.
 *       '500':
 *         description: Internal server error.
 *
 * /groups/{groupId}/members/{userId}:
 *   post:
 *     summary: Add a user to a group
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: The ID of the group to which the user will be added.
 *         type: integer
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to add to the group.
 *         type: integer
 *     responses:
 *       '200':
 *         description: User added successfully to the group.
 *       '404':
 *         description: User or group does not exist.
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Remove a user from a group
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: The ID of the group from which the user will be removed.
 *         type: integer
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to remove from the group.
 *         type: integer
 *     responses:
 *       '200':
 *         description: User removed successfully from the group.
 *       '404':
 *         description: User not found in the group.
 *       '500':
 *         description: Internal server error.
 * /groups/{groupId}:
 *   get:
 *     summary: Get group details by ID
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: The ID of the group to retrieve details.
 *         type: integer
 *     responses:
 *       '200':
 *         description: Group details fetched successfully.
 *       '404':
 *         description: Group not found.
 *       '500':
 *         description: Internal server error.
 */

groupRouter.get("/groups/:groupId", userAuthorisation, getGroupDetails);
groupRouter.post("/groups", userAuthorisation, createGroup);
groupRouter.put("/groups/:groupId", userAuthorisation, groupCrudAuthorisation); // route controller to follow
groupRouter.delete(
  "/groups/:groupId",
  userAuthorisation,
  groupCrudAuthorisation,
  deleteGroup,
);

groupRouter.post(
  "/groups/:groupId/members/:userId",
  userAuthorisation,
  groupMembershipCrudAuthorisation,
  addUserToGroup,
);
groupRouter.delete(
  "/groups/:groupId/members/:userId",
  userAuthorisation,
  groupMembershipCrudAuthorisation,
  removeUserFromGroup,
);

export default groupRouter;
