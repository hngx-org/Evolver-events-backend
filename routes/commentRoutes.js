import express from "express";
import { listComments } from "../controllers/commentController/index.js";
import { userAuthorisation } from "../middleware/authorization.js";
import { AddCommentToEvent } from "../controllers/commentController/index.js";

const commentRouter = express.Router();

commentRouter.get("/events/:eventId/comments", userAuthorisation, listComments);

commentRouter.post("/events/:eventId/comment/:userId", userAuthorisation, AddCommentToEvent);


export default commentRouter;
