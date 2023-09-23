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

// <<<<<<< authorization
// =======
// groupRouter.post("/groups", createGroup);
// groupRouter.put("/groups/:groupId", updateGroup);
// groupRouter.delete("/groups/:groupId", deleteGroup);
// groupRouter.post("/groups/:groupId/members/:userId", addUserToGroup);
// groupRouter.delete("/groups/:groupId/members/:userId", removeUserFromGroup);
// >>>>>>> dev
groupRouter.get("/groups/:groupId", userAuthorisation, getGroupDetails);
groupRouter.post("/groups", userAuthorisation, createGroup);
groupRouter.put("/groups/:groupId",userAuthorisation, groupCrudAuthorisation, updateGroup); // route controller to follow
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
