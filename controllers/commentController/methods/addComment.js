import Comment from "../../../models/Comment.js";
import Event from "../../../models/Event.js";
import User from "../../../models/User.js";

export const AddCommentToEvent = async (req, res, next) => {
  const { eventId, userId } = req.params;

  try {
    // only user can update events
    const event = await Event.findByPk(eventId);
    const user = await User.findByPk(userId);

    // to check if eventid are valid

    if (!event || !user) {
      return res.status(404).json({
        status: " failed",
        message: "  Event does not exit :",
      });
    }
    const createComment = await Comment.create({
      body: req.body.body,
      event_id: eventId,
      user_id: userId,
    });

    res.status(201).json({
      message: "comment has been created successfully on the Event",
      createComment,
    });
  } catch (error) {
    return res.status(404).json({
      message: "failure in creating event comment ",
      status: error.message,
    });
  }
};
