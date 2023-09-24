import express from "express";
import {
  addUserToGroup,
  removeUserFromGroup,
  createGroup,
  getGroupDetails,
  deleteGroup,
} from "../controllers/groupController/index.js";
import getUserGroups from "../controllers/groupController/methods/getUserGroups.js";

const groupRouter = express.Router();

groupRouter.post("/groups", createGroup);
// groupRouter.put("/groups/:groupId");
groupRouter.delete("/groups/:groupId", deleteGroup);
groupRouter.post("/groups/:groupId/members/:userId", addUserToGroup);
groupRouter.delete("/groups/:groupId/members/:userId", removeUserFromGroup);
groupRouter.get("/groups/:groupId", getGroupDetails);

// get user groups
groupRouter.get("/groups/user/:userId", getUserGroups);

export default groupRouter;
