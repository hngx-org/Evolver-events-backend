import addImageToComment from "../../controllers/imageController/methods/addImageToComment";
import Image from "../../models/Image.js";
import CommentImages from "../../models/CommentImages.js";

jest.mock("../../models/Image.js");
jest.mock("../../models/CommentImages.js");

describe("addImageToComment", () => {
  it("creates an image and adds it to a comment", async () => {
    const mockCommentId = "1";
    const mockUrl = "https://example.com/image.jpg";

    const mockImage = { id: "2", url: mockUrl };
    Image.create.mockResolvedValue(mockImage);

    const mockCommentImage = { comment_id: mockCommentId, image_id: mockImage.id };
    CommentImages.create.mockResolvedValue(mockCommentImage);

    const req = {
      params: { commentId: mockCommentId },
      body: { url: mockUrl },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addImageToComment(req, res);

    expect(Image.create).toHaveBeenCalledWith({ url: mockUrl });
    expect(CommentImages.create).toHaveBeenCalledWith({
      comment_id: mockCommentId,
      image_id: mockImage.id,
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Image successfully added to comment.",
      data: mockCommentImage,
    });
  });

  it("returns a 500 status if an error occurs", async () => {
    const mockCommentId = "1";
    const mockUrl = "https://example.com/image.jpg";

    const mockError = new Error("Internal server error.");
    Image.create.mockRejectedValue(mockError);

    const req = {
      params: { commentId: mockCommentId },
      body: { url: mockUrl },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addImageToComment(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error." });
  });
});
