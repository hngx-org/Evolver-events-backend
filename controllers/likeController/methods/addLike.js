import Likes from "../../../models/Likes.js";

export const addLike = async (req, res) => {
  const { commentId, userId } = req.params;

  try {
    const data = await Likes.create({
      comment_id: commentId,
      user_id: userId,
    });

    if (!data) {
      res.status(400).json({ message: "Bad request." });
    }

    res.status(201).json({
      success: true,
      message: "Like added successfully.",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
export default addLike;