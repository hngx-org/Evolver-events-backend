

import Comment from "../../../models/Comment.js";
import Event from "../../../models/Event.js";


export const AddCommentToEvent = async (req, res, next) => {

    const EventId = req.params.eventId


    try {
        // only user can update events
        const event = await Event.findByPk(EventId)

        // to check if userid and eventid are valid

        if (!event) {
            return res.status(404)
                .json({
                    status: " failed",
                    message: "  User can't comment on this Event :"
                })
        }
        const createComment = await Comment.create({
            body: req.body.body,
            user_id: UserId,
            event_id: EventId

        })
        res.status(201).json({
            message: 'comment has been created successfully on the Event',
            createComment
        })

    }
    catch (error) {
        return res.status(404).json({
            message: 'failure in creating event comment ',
            status: error.message
        })
    }



}
