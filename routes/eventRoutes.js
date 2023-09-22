import express from "express";
import {
  createEvent,
  getEventDetails,
  listAllEvents,
  deleteEvent
} from "../controllers/eventController/index.js";
import validate from "../middleware/validation.js";

import {
  AddCommentToEvent
} from "../controllers/commentController/index.js"


const eventRouter = express.Router();

/* userAuthorisation middleware needs to 
be imported and passed before the validate.Event
in the createEvent route. It requires the req.session.userId. Ypu can refer to the createEvent method in the event controller */
eventRouter.post("/events", validate.Event, createEvent);
eventRouter.get("/events", listAllEvents);
eventRouter.get("/events/:id", getEventDetails);
eventRouter.delete("/events/:id", deleteEvent);

eventRouter.post("/events/:eventId", AddCommentToEvent);

export default eventRouter;
