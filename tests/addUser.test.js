import addUserToGroup from '../controllers/groupController/methods/addUserToGroup';
import GroupMembership from '../models/GroupMembership';

jest.mock('../models/GroupMembership', () => ({
  create: jest.fn(),
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

    addUserToGroup(req, res);

    expect(GroupMembership.create).toHaveBeenCalledWith({
      user_id: 1,
      group_id: 2,
    });
  });

  it('should return a success message with a 200 status code', () => {
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

    addUserToGroup(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'user has been successfully added to group.' });
  });

  it('should return a 500 status code and an error message if there is an error creating the GroupMembership', () => {
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
    GroupMembership.create.mockImplementation(() => {
      throw new Error('Test error');
    });

    addUserToGroup(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error.' });
  });
});