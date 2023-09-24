import { StatusCodes } from "http-status-codes";
import deleteGroup from "../../controllers/groupController/methods/deleteGroup"
import Group from "../../models/Group.js";
import GroupMembership from "../../models/GroupMembership.js";
import GroupImage from "../../models/GroupImage.js";
import GroupEvents from "../../models/GroupEvent.js";

jest.mock("../../models/Group.js");
jest.mock("../../models/GroupMembership.js");
jest.mock("../../models/GroupImage.js");
jest.mock("../../models/GroupEvent.js");

describe("deleteGroup", () => {
  it("returns a 400 status if no group ID is provided", async () => {
    const req = {
      params: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteGroup(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid group ID" });
  });

  it("returns a 404 status if the group does not exist", async () => {
    const mockGroupId = "1";

    Group.findByPk.mockResolvedValue(null);

    const req = {
      params: { groupId: mockGroupId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteGroup(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({ error: "Group not found" });
  });

  it("deletes a group and returns a 200 status if the group exists", async () => {
    const mockGroupId = "1";
    const mockGroup = { id: mockGroupId, title: "Test Group", destroy: jest.fn() };

    Group.findByPk.mockResolvedValue(mockGroup);
    GroupMembership.destroy.mockResolvedValue(1);
    GroupImage.destroy.mockResolvedValue(1);
    GroupEvents.destroy.mockResolvedValue(1);

    const req = {
      params: { groupId: mockGroupId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteGroup(req, res);

    expect(GroupMembership.destroy).toHaveBeenCalledWith({ where: { group_id: mockGroupId } });
    expect(GroupImage.destroy).toHaveBeenCalledWith({ where: { group_id: mockGroupId } });
    expect(GroupEvents.destroy).toHaveBeenCalledWith({ where: { group_id: mockGroupId } });
    
    expect(mockGroup.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Test Group deleted successfully",
      data: 1,
    });
  });

  it("returns a 500 status if an error occurs", async () => {
    const mockGroupId = "1";

    const mockError = new Error("Internal server error.");
    
    Group.findByPk.mockRejectedValue(mockError);

    const req = {
      params: { groupId: mockGroupId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteGroup(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error." });
  });
});
