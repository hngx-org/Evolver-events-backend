import Comment from "../../../models/Comment.js";
import CommentImage from "../../../models/CommentImages.js";
import Image from "../../../models/Image.js";
import User from "../../../models/User.js";

const listComments = async (req, res) => {
  const event = req.params.eventId;

  try {
    const result = await Comment.findAll({
      attributes: ["id", "body"],
      where: { event_id: event },
      include: [
        {
          model: CommentImage,
          attributes: ["id"],
          include: [
            {
              model: Image,
              attributes: ["id", "url"],
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
    });

    return res.status(200).json({
      status: "Success",
      message: "Comments retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error getting comments" });
  }
};

export default listComments;
