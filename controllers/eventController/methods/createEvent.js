import Event from "../../../models/Event.js";
import { validationResult } from "express-validator";

export const createEvent = async (req, res) => {
  try {
    //id and creator_id
    const {
      title,
      description,
      creator_id,
      location,
      start_date,
      end_date,
      start_time,
      end_time,
    } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        msg: errors.array(),
      });
    } else {
      const newEvent = {
        title,
        description,
        location,
        // no active session yet, so passing creator_id in the body
        creator_id,
        start_date,
        end_date,
        start_time,
        end_time,
      };
      // res.send(newEvent);
      const myEvent = await Event.create(newEvent);
      if (!myEvent) {
        res.status(400);
        throw new Error("Error creating event");
      } else {
        res.status(201).json({
          status: "success",
          msg: "Event created",
          data: myEvent,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
};
