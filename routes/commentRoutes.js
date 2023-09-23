import express from 'express'
import { listComments } from '../controllers/commentController/index.js';


const commentRouter = express.Router()

commentRouter.get('/events/:eventId/comment', listComments);


export default commentRouter;