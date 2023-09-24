import express from "express";
import {
  createEvent,
  getEventDetails,
  listAllEvents,
  deleteEvent,
} from "../controllers/eventController/index.js";
import validate from "../middleware/validation.js";

import {
  AddCommentToEvent,
  listComments,
} from "../controllers/commentController/index.js";
import { userAuthorisation } from "../middleware/authorization.js";

const eventRouter = express.Router();

/* userAuthorisation middleware needs to 
be imported and passed before the validate.Event
in the createEvent route. It requires the req.session.userId. Ypu can refer to the createEvent method in the event controller */
eventRouter.post("/events", userAuthorisation, validate.Event, createEvent);
eventRouter.get("/events", userAuthorisation, listAllEvents);
eventRouter.get("/events/:id", userAuthorisation, getEventDetails);
eventRouter.delete("/events/:id", userAuthorisation, deleteEvent);
eventRouter.get("/events/:eventId/comments", userAuthorisation, listComments);

eventRouter.post("/events/:eventId", userAuthorisation, AddCommentToEvent);

export default eventRouter;
