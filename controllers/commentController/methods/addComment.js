
import Comment from "../../../models/Comment.js";
import Event from "../../../models/Event.js";
import User from "../../../models/User.js";


export const AddCommentToEvent = async (req, res, next) => {

    const EventId = req.params.eventId
    const UserId = req.params.userId


    try {
        // only user can update events
        const event = await Event.findByPk(EventId)
        const user = UserId == User.id
        // to check if eventid are valid

        if (event && user) {
            const createComment = await Comment.create({
                body: req.body.body,
                event_id: EventId,
                user_id: UserId

            })
            res.status(201).json({
                message: 'comment has been created successfully on the Event',
                createComment
            })

        }
        return res.status(404)
            .json({
                status: " failed",
                message: "  Event or  User does not Exit:"
            })


    }
    catch (error) {
        return res.status(404).json({
            message: 'failure in creating event comment ',
            status: error.message
        })
    }



}
