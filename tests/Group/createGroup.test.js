import { StatusCodes } from "http-status-codes";
import createGroup from '../../controllers/groupController/methods/createGroup'; // Import your createGroup function
import Group from "../../models/Group.js";

// Mock the Group model methods
jest.mock("../../models/Group.js", () => ({
  create: jest.fn(),
}));

describe('createGroup', () => {
  beforeEach(() => {
    // Clear the mock function's calls before each test
    Group.create.mockClear();
  });

  it('should create a group when title is provided', async () => {
    const req = {
      body: {
        title: 'Test Group',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Group.create method
    const mockGroup = {
      id: 1,
      title: 'Test Group',
    };
    Group.create.mockResolvedValueOnce(mockGroup);

    // Call the createGroup function
    await createGroup(req, res);

    // Assertions
    expect(Group.create).toHaveBeenCalledWith({ title: 'Test Group' });
    expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Group created successfully',
      data: { group: mockGroup },
    });
  });

  it('should return a 400 response when title is not provided', async () => {
    const req = {
      body: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the createGroup function
    await createGroup(req, res);

    // Assertions
    expect(Group.create).not.toHaveBeenCalled(); // Group.create should not be called
    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Please provide all required fields',
    });
  });

  it('should handle errors and return a 500 response', async () => {
    const req = {
      body: {
        title: 'Test Group',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock that an error occurs during Group creation
    Group.create.mockRejectedValueOnce(new Error('Group creation error'));

    // Call the createGroup function
    await createGroup(req, res);

    // Assertions
    expect(Group.create).toHaveBeenCalledWith({ title: 'Test Group' });
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Internal server error',
    });
  });
});
