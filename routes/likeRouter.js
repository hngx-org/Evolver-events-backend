import { Router } from "express";
import { addLike, removeLike } from "../controllers/likeController/index.js";
import {
  likesAuthorisation,
  userAuthorisation,
} from "../middleware/authorization.js";

const likeRouter = Router();

likeRouter.post(
  "/comments/:commentId/likes/:userId",
  userAuthorisation,
  likesAuthorisation,
  addLike,
);
likeRouter.delete(
  "/comments/:commentId/likes/:userId",
  userAuthorisation,
  likesAuthorisation,
  removeLike,
);

export default likeRouter;
