
import Comment from "../../../models/Comment.js";
import Event from "../../../models/Event.js";
import User from "../../../models/User.js";


export const AddCommentToEvent = async (req, res, next) => {

    const { EventId, UserId } = req.params

    try {

        const event = await Event.findByPk(EventId)
        const user = await User.findByPk(UserId)

        if (!event || !user) {
            return res.status(404).json({
                status: " failed",
                message: "  Event or  User does not Exit:"
            })
        }

        const createComment = await Comment.create({
            body: req.body.body,
            event_id: EventId,
            user_id: UserId
        })
        return res.status(201).json({
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
