import { StatusCodes } from "http-status-codes";
import Group from "../../models/Group";
import tryCatchHelper from "../../utils/helpers/tryCatch.helpers.js";
import GroupMembership from "../../models/GroupMembership.js";
import GroupImage from "../../models/GroupImage.js";
import GroupEvents from "../../models/GroupEvent.js";
import deleteGroup from "../../controllers/groupController/methods/deleteGroup.js";

// Mock the http-status-codes module
jest.mock("http-status-codes", () => ({
  StatusCodes: {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    OK: 200,
  },
}));

// Mock the Group, GroupMembership, GroupImage, and GroupEvents models
jest.mock("../../models/Group.js");
jest.mock("../../models/GroupMembership.js");
jest.mock("../../models/GroupImage.js");
jest.mock("../../models/GroupEvent.js");

// Mock the tryCatchHelper function
jest.mock("../../utils/helpers/tryCatch.helpers.js");

describe("deleteGroup", () => {
  // Test case when group ID is invalid
  it("should return a 400 response with an error message when group ID is invalid", async () => {
    // Mock the request and response objects
    const req = {
      params: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the deleteGroup function
    await deleteGroup(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid group ID" });
  });

  // Test case when group is not found
  it("should return a 404 response with an error message when group is not found", async () => {
    // Mock the request and response objects
    const req = {
      params: {
        groupId: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock that Group.findByPk returns null
    Group.findByPk.mockResolvedValueOnce(null);

    // Call the deleteGroup function
    await deleteGroup(req, res);

    // Assertions
    expect(Group.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({ error: "Group not found" });
  });

  // Test case when group is successfully deleted
  it("should delete the group and return a success message", async () => {
    // Mock the request and response objects
    const req = {
      params: {
        groupId: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock that Group.findByPk returns a group
    const mockGroup = {
      id: 1,
      title: "Test Group",
    };
    Group.findByPk.mockResolvedValueOnce(mockGroup);

    // Mock that the destroy functions return 0 (success)
    GroupMembership.destroy.mockResolvedValueOnce(0);
    GroupImage.destroy.mockResolvedValueOnce(0);
    GroupEvents.destroy.mockResolvedValueOnce(0);

    // Call the deleteGroup function
    await deleteGroup(req, res);

    // Assertions
    expect(Group.findByPk).toHaveBeenCalledWith(1);
    expect(GroupMembership.destroy).toHaveBeenCalledWith({
      where: {
        group_id: 1,
      },
    });
    expect(GroupImage.destroy).toHaveBeenCalledWith({
      where: {
        group_id: 1,
      },
    });
    expect(GroupEvents.destroy).toHaveBeenCalledWith({
      where: {
        group_id: 1,
      },
    });
    expect(mockGroup.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: "Test Group deleted successfully",
    });
  });

  // Test case when group memberships cannot be deleted
  it("should return a 500 response with an error message when group memberships cannot be deleted", async () => {
    // Mock the request and response objects
    const req = {
      params: {
        groupId: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock that Group.findByPk returns a group
    const mockGroup = {
      id: 1,
      title: "Test Group",
    };
    Group.findByPk.mockResolvedValueOnce(mockGroup);

    // Mock that the destroy function for group memberships returns 1 (failure)
    GroupMembership.destroy.mockResolvedValueOnce(1);

    // Call the deleteGroup function
    await deleteGroup(req, res);

    // Assertions
    expect(GroupMembership.destroy).toHaveBeenCalledWith({
      where: {
        group_id: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    expect(res.json).toHaveBeenCalledWith({
      error: "Unable to delete group memberships",
    });
  });

  // Test case when group images cannot be deleted
  it("should return a 500 response with an error message when group images cannot be deleted", async () => {
    // Mock the request and response objects
    const req = {
      params: {
        groupId: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock that Group.findByPk returns a group
    const mockGroup = {
      id: 1,
      title: "Test Group",
    };
    Group.findByPk.mockResolvedValueOnce(mockGroup);

    // Mock that the destroy function for group images returns 1 (failure)
    GroupImage.destroy.mockResolvedValueOnce(1);

    // Call the deleteGroup function
    await deleteGroup(req, res);

    // Assertions
    expect(GroupImage.destroy).toHaveBeenCalledWith({
      where: {
        group_id: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    expect(res.json).toHaveBeenCalledWith({
      error: "Unable to delete group images",
    });
  });

  // Test case when group events cannot be deleted
  it("should return a 500 response with an error message when group events cannot be deleted", async () => {
    // Mock the request and response objects
    const req = {
      params: {
        groupId: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock that Group.findByPk returns a group
    const mockGroup = {
      id: 1,
      title: "Test Group",
    };
    Group.findByPk.mockResolvedValueOnce(mockGroup);

    // Mock that the destroy function for group events returns 1 (failure)
    GroupEvents.destroy.mockResolvedValueOnce(1);

    // Call the deleteGroup function
    await deleteGroup(req, res);

    // Assertions
    expect(GroupEvents.destroy).toHaveBeenCalledWith({
      where: {
        group_id: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    expect(res.json).toHaveBeenCalledWith({
      error: "Unable to delete group events",
    });
  });

  // Test case when group cannot be deleted
  it("should return a 500 response with an error message when group cannot be deleted", async () => {
    // Mock the request and response objects
    const req = {
      params: {
        groupId: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock that Group.findByPk returns a group
    const mockGroup = {
      id: 1,
      title: "Test Group",
      destroy: jest.fn().mockRejectedValueOnce(),
    };
    Group.findByPk.mockResolvedValueOnce(mockGroup);

    // Call the deleteGroup function
    await deleteGroup(req, res);

    // Assertions
    expect(mockGroup.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    expect(res.json).toHaveBeenCalledWith({
      error: "Unable to delete group",
    });
  });
});