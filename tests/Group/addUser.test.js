import addUserToGroup from '../../controllers/groupController/methods/addUserToGroup';
import GroupMembership from '../../models/GroupMembership';

jest.mock('../../models/GroupMembership', () => ({
  create: jest.fn(), // Mock the create function
}));

describe('addUserToGroup', () => {
  it('should create a new GroupMembership with the correct user and group IDs', () => {
    const req = {
      params: {
        userId: 1,
        groupId: 2,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the create function to return a resolved value
    GroupMembership.create.mockResolvedValue({ user_id: 1, group_id: 2 });

    addUserToGroup(req, res);

    // Check if GroupMembership.create was called with the expected parameters
    expect(GroupMembership.create).toHaveBeenCalledWith({
      user_id: 1,
      group_id: 2,
    });
  });

  it('should return a success message with a 200 status code', async () => {
    const req = {
      params: {
        userId: 1,
        groupId: 2,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the create function to return a resolved value
    GroupMembership.create.mockResolvedValue({ user_id: 1, group_id: 2 });

    await addUserToGroup(req, res);

    // Check if the response status and JSON were set correctly
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: 'user has been successfully added to group.', data: { user_id: 1, group_id: 2 } });
  });

  // Add more test cases as needed

});
