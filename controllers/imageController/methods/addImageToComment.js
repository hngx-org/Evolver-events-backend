import Image from "../../../models/Image.js";
import CommentImages from "../../../models/CommentImages.js";

export async function addImageToComment(req, res) {
  const { commentId } = req.params;
  const { url } = req.body;

  console.log("commentId: ", commentId);

  try {
    const image = await Image.create({
      url,
    });

    const data = await CommentImages.create({
      comment_id: commentId,
      image_id: image.id,
    });

    res.status(200).json({
      success: true,
      message: "Image successfully added to comment.",
      data,
    });
  } catch (err) {
    console.error("Error creating image: ", err);
    res.status(500).json({ message: "Internal server error." });
  }
}
export default addImageToComment;