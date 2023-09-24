import listComments from "../../controllers/commentController/methods/listComments";
import Comment from "../../models/Comment.js";
import CommentImage from "../../models/CommentImages.js";
import Image from "../../models/Image.js";
import User from "../../models/User.js";

jest.mock("../../models/Comment.js");
jest.mock("../../models/CommentImages.js");
jest.mock("../../models/Image.js");
jest.mock("../../models/User.js");

describe("listComments", () => {
  it("returns a list of comments with associated data", async () => {
    const mockEventId = "1";

    const mockComment = {
      id: "2",
      body: "Test comment",
      comment_images: [
        {
          id: "3",
          image: {
            id: "4",
            url: "https://example.com/image.jpg",
          },
        },
      ],
      user: {
        id: "5",
        name: "Test user",
      },
    };

    Comment.findAll.mockResolvedValue([mockComment]);

    const req = {
      params: { eventId: mockEventId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await listComments(req, res);

    expect(Comment.findAll).toHaveBeenCalledWith({
      attributes: ["id", "body"],
      where: { event_id: mockEventId },
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

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "Success",
      message: "Comments retrieved successfully",
      data: [mockComment],
    });
  });

  it("returns a 500 status if an error occurs", async () => {
    const mockEventId = "1";

    const mockError = new Error("Internal server error.");

    Comment.findAll.mockRejectedValue(mockError);

    const req = {
      params: { eventId: mockEventId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await listComments(req, res);

    expect(Comment.findAll).toHaveBeenCalledWith({
      attributes: ["id", "body"],
      where: { event_id: mockEventId },
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

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error getting comments" });
  });
});
