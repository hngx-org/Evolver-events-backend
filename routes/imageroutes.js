import express from "express";
import {
  addUserToGroup,
  removeUserFromGroup,
} from "../controllers/groupController/index.js";
import { getImagesForComment } from "../controllers/imageController/index.js";

const imageRouter = express.Router();

imageRouter.get("/comments/:commentId/images", getImagesForComment);

// groupRouter.post("/groups/:groupId/members/:userId", addUserToGroup);
// groupRouter.delete("/groups/:groupId/members/:userId", removeUserFromGroup);

export default imageRouter;
