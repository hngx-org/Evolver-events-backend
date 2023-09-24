import CommentImages from "../../../models/CommentImages.js";
import Image from "../../../models/Image.js";

export async function getImagesForComment(req, res) {
  const { commentId } = req.params;

  try {
    const commentImages = await CommentImages.findAll({
      where: { comment_id: commentId },
    });

    const imageIds = commentImages.map((ci) => ci.image_id);

    const images = await Image.findAll({
      where: { id: imageIds },
    });

    const imageUrls = images.map((image) => image.url);

    res.status(200).json({
      success: true,
      data: imageUrls,
    });
  } catch (err) {
    console.error("Error retrieving images for comment: ", err);
    res.status(500).json({ message: "Internal server error." });
  }
}
