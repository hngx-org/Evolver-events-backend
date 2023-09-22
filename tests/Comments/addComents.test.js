import { AddCommentToEvent } from "../../controllers/commentController/methods/addComment";
import Comment from "../../models/Comment.js";
import Event from "../../models/Event.js";

jest.mock("../../models/Comment.js");
jest.mock("../../models/Event.js");

describe("AddCommentToEvent", () => {
  it("returns a 404 status if the event does not exist", async () => {
    const mockEventId = "1";

    Event.findByPk.mockResolvedValue(null);

    const req = {
      params: { eventId: mockEventId },
      body: { body: "Test comment" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await AddCommentToEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: " failed",
      message: "  Event does not exit :",
    });
  });

  it("creates a comment and returns a 201 status if the event exists", async () => {
    const mockEventId = "1";
    const mockCommentBody = "Test comment";

    const mockEvent = { id: mockEventId };
    Event.findByPk.mockResolvedValue(mockEvent);

    const mockComment = { body: mockCommentBody, event_id: mockEventId };
    Comment.create.mockResolvedValue(mockComment);

    const req = {
      params: { eventId: mockEventId },
      body: { body: mockCommentBody },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await AddCommentToEvent(req, res);

    expect(Comment.create).toHaveBeenCalledWith({
      body: mockCommentBody,
      event_id: mockEventId,
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "comment has been created successfully on the Event",
      createComment: mockComment,
    });
  });
});
