import getGroupDetails from "../../controllers/groupController/methods/getGroupDetails";
import Group from "../../models/Group.js";

jest.mock("../../models/Group.js");

describe("getGroupDetails", () => {
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

    await getGroupDetails(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Group not found" });
  });

  it("returns group details and a 200 status if the group exists", async () => {
    const mockGroupId = "1";
    const mockGroup = { id: mockGroupId, name: "Test Group" };

    Group.findByPk.mockResolvedValue(mockGroup);

    const req = {
      params: { groupId: mockGroupId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getGroupDetails(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Group Details fetched successfully",
      groupDetails: mockGroup,
    });
  });
});
