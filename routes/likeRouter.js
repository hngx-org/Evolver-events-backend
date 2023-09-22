import { Router } from "express";
import { addLike, removeLike } from "../controllers/likeController/index.js";

const likeRouter = Router();

likeRouter.post("/comments/:commentId/likes/:userId", addLike);
likeRouter.delete("/comments/:commentId/likes/:userId", removeLike);

export default likeRouter;
