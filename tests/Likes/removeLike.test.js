import { removeLike } from "../../controllers/likeController/methods/removeLike";
import Likes from "../../models/Likes.js";

jest.mock("../../models/Likes.js");

describe("removeLike", () => {
  it("returns a 400 status if no like is found to remove", async () => {
    const mockCommentId = "1";
    const mockUserId = "2";

    Likes.destroy.mockResolvedValue(0);

    const req = {
      params: { commentId: mockCommentId, userId: mockUserId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await removeLike(req, res);

    expect(Likes.destroy).toHaveBeenCalledWith({
      where: {
        comment_id: mockCommentId,
        user_id: mockUserId,
      },
    });

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Bad request." });
  });

  it("removes a like and returns a 200 status if the like exists", async () => {
    const mockCommentId = "1";
    const mockUserId = "2";

    Likes.destroy.mockResolvedValue(1);

    const req = {
      params: { commentId: mockCommentId, userId: mockUserId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await removeLike(req, res);

    expect(Likes.destroy).toHaveBeenCalledWith({
      where: {
        comment_id: mockCommentId,
        user_id: mockUserId,
      },
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Like removed.",
      data: 1,
    });
  });

  it("returns a 500 status if an error occurs", async () => {
    const mockCommentId = "1";
    const mockUserId = "2";

    const mockError = new Error("Internal server error.");
    Likes.destroy.mockRejectedValue(mockError);

    const req = {
      params: { commentId: mockCommentId, userId: mockUserId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await removeLike(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error." });
  });
});
