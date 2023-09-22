import express from 'express'
import { listComments } from '../controllers/commentController/index.js';
import { AddCommentToEvent } from '../controllers/commentController/index.js';

const commentRouter = express.Router()

commentRouter.get('/events/:eventId/comment', listComments);

commentRouter.post("/events/:eventId", AddCommentToEvent);


export default commentRouter;