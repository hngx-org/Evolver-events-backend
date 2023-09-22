import removeUserFromGroup from '../../controllers/groupController/methods/removeUserFromGroup';
import userGroups from '../../models/GroupMembership';

jest.mock('../../models/GroupMembership', () => ({
  destroy: jest.fn(),
}));

describe('removeUserFromGroup', () => {
  it('should remove a user from a group and return a success message', async () => {
    const mockDeletedRows = 1;

    userGroups.destroy.mockResolvedValue(mockDeletedRows);

    const req = {
      params: {
        groupId: 1,
        userId: 2,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await removeUserFromGroup(req, res);

    expect(userGroups.destroy).toHaveBeenCalledWith({
      where: {
        group_id: req.params.groupId,
        user_id: req.params.userId,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'User removed from the group' });
  });

  it('should handle the case when the user is not found in the group', async () => {
    const mockDeletedRows = 0;

    userGroups.destroy.mockResolvedValue(mockDeletedRows);

    const req = {
      params: {
        groupId: 1,
        userId: 2,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await removeUserFromGroup(req, res);

    expect(userGroups.destroy).toHaveBeenCalledWith({
      where: {
        group_id: req.params.groupId,
        user_id: req.params.userId,
      },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found in the group' });
  });

  it('should handle errors when removing a user from a group', async () => {
    const errorMessage = 'Database error';

    userGroups.destroy.mockRejectedValue(new Error(errorMessage));

    const req = {
      params: {
        groupId: 1,
        userId: 2,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await removeUserFromGroup(req, res);

    expect(userGroups.destroy).toHaveBeenCalledWith({
      where: {
        group_id: req.params.groupId,
        user_id: req.params.userId,
      },
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});