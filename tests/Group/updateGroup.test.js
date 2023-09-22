import { updateGroup } from "../../controllers/groupController/methods/updateGroup";
import Group from "../../models/Group.js";

jest.mock("../../models/Group.js");

describe("updateGroup", () => {
  it("returns an error if no group is found", async () => {
    Group.findByPk.mockResolvedValue(null);

    const req = {
      body: {},
      params: { id: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateGroup(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Group not found" });
  });

  it("updates and saves the group if it is found", async () => {
    const group = { title: "Old Title", save: jest.fn() };
    Group.findByPk.mockResolvedValue(group);
  
    const req = {
      body: { title: "New Title" },
      params: { id: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await updateGroup(req, res);
  
    expect(group.title).toEqual({ title: "New Title" });
    expect(group.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Group details updated successfully!" });
  });
  
});
