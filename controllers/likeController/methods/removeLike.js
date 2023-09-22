import Likes from "../../../models/Likes.js";

export const removeLike = async (req, res) => {
  const { commentId, userId } = req.params;

  try {
    const data = await Likes.destroy({
      where: {
        comment_id: commentId,
        user_id: userId,
      },
    });

    if (!data) {
      res.status(400).json({ message: "Bad request." });
    }

    res.status(200).json({ success: true, message: "Like removed.", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
