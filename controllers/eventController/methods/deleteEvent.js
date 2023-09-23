import Event from "../../../models/Event.js";

import validate from "uuid-validate";

// defines a function to delete events by ID
const deleteEvent = async (req, res) => {
  try {
    // retrieve id as eventId
    const eventId = req.params.id;

    // checks if id is provided and an UUID
    if (!eventId || !validate(eventId, 4)) {
      throw new Error("missing or Invalid ID");
    }

    const events = await Event.findOne({
      where: {
        id: eventId,
      },
    });
    if (!events) {
      res.status(404).json("Event can not be found");
    }

    // deletes event
    await events.destroy();
    res.status(200).json({ message: "Event has been deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to deleted events", message: err.message });
  }
};

export default deleteEvent;
