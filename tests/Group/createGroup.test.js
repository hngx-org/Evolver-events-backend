import { StatusCodes } from "http-status-codes";
import createGroup from "../../controllers/groupController/methods/createGroup";
import Group from "../../models/Group.js";

jest.mock("../../models/Group.js");

describe("createGroup", () => {
  it("returns a 400 status if no title is provided", async () => {
    const req = {
      body: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createGroup(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        code: 400,
        message: "Please provide all required fields",
        type: "Bad Request",
      },
      success: false,
    });
  });

  it("creates a group and returns a 201 status if a title is provided", async () => {
    const mockTitle = "Test Group";

    const mockGroup = { id: "1", title: mockTitle };
    Group.create.mockResolvedValue(mockGroup);

    const req = {
      body: { title: mockTitle },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createGroup(req, res);

    expect(Group.create).toHaveBeenCalledWith({ title: mockTitle });
    expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(res.json).toHaveBeenCalledWith({
      message: "Group created successfully",
      payload: { group: mockGroup },
      success: true,
    });
  });
});
