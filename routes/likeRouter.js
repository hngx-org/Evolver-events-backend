import { Router } from "express";
import { addLike, removeLike } from "../controllers/likeController/index.js";
import { likesAuthorisation } from "../middleware/authorization.js";

const likeRouter = Router();

likeRouter.post(
  "/comments/:commentId/likes/:userId",
  likesAuthorisation,
  addLike,
);
likeRouter.delete(
  "/comments/:commentId/likes/:userId",
  likesAuthorisation,
  removeLike,
);

export default likeRouter;
