import express from "express";
import { listComments } from "../controllers/commentController/index.js";
import { userAuthorisation } from "../middleware/authorization.js";

const commentRouter = express.Router();

commentRouter.get("/events/:eventId/comments", userAuthorisation, listComments);

export default commentRouter;
