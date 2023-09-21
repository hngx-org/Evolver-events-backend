import GroupMembership from "../../../models/GroupMembership.js";


import Comment from "../../../models/Comment.js"

async function getImagesForComment(req, res) {


  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const images = await Image.findAll({
      where: { commentId },
    });

    const imageURLs = images.map((image) => image.url);
    return res.status(200).json(imageURLs);
  } catch (error) {
    console.error('Error fetching comment images:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default getImagesForComment;
