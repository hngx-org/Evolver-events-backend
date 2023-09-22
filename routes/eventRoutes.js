import express from "express";
import {
  createEvent,
  deleteEvent,
  getEventDetails,
  listAllEvents,
  updateEvent,
} from "../controllers/eventController/index.js";
import validate from "../middleware/validation.js";

import {
  AddCommentToEvent
} from "../controllers/commentController/index.js"


const eventRouter = express.Router();

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     requestBody:
 *       description: Event data to create a new event.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               creator_id:
 *                 type: integer
 *               location:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               start_time:
 *                 type: string
 *                 format: time
 *               end_time:
 *                 type: string
 *                 format: time
 *     responses:
 *       '201':
 *         description: Event created successfully.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 *   get:
 *     summary: Get a list of all events
 *     responses:
 *       '200':
 *         description: Events retrieved successfully.
 *       '500':
 *         description: Internal server error.
 * /events/{id}:
 *   get:
 *     summary: Get event details by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to retrieve details.
 *         type: integer
 *     responses:
 *       '200':
 *         description: Event details retrieved successfully.
 *       '404':
 *         description: Event not found.
 *       '500':
 *         description: Internal server error.
 */

/* userAuthorisation middleware needs to 
be imported and passed before the validate.Event
in the createEvent route. It requires the req.session.userId. Ypu can refer to the createEvent method in the event controller */
eventRouter.post("/events", validate.Event, createEvent);
eventRouter.get("/events", listAllEvents);
eventRouter.get("/events/:id", getEventDetails);
eventRouter.put("/events/:id", updateEvent);
eventRouter.delete("/events/:id", deleteEvent);

eventRouter.post("/events/:eventId", AddCommentToEvent);

export default eventRouter;
