import addLike from '../../controllers/likeController/methods/addLike';
import Likes from '../../models/Likes';

jest.mock('../../models/Likes');

describe('addLike', () => {
  it('should create a new like and return it as JSON', async () => {
    const mockCommentId = '1';
    const mockUserId = '2';

    const req = {
      params: {
        commentId: mockCommentId,
        userId: mockUserId,
      },
    };

    const mockLike = {
      id: '3',
      comment_id: mockCommentId,
      user_id: mockUserId,
    };

    Likes.create.mockResolvedValue(mockLike);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addLike(req, res);

    expect(Likes.create).toHaveBeenCalledWith({
      comment_id: mockCommentId,
      user_id: mockUserId,
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Like added successfully.',
      data: mockLike,
    });
  });

  it('should return a 400 status if data is not created', async () => {
    const mockCommentId = '1';
    const mockUserId = '2';

    const req = {
      params: {
        commentId: mockCommentId,
        userId: mockUserId,
      },
    };

    Likes.create.mockResolvedValue(null);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addLike(req, res);

    expect(Likes.create).toHaveBeenCalledWith({
      comment_id: mockCommentId,
      user_id: mockUserId,
    });

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Bad request.' });
  });

  it('should return a 500 status if an error occurs', async () => {
    const mockCommentId = '1';
    const mockUserId = '2';

    const req = {
      params: {
        commentId: mockCommentId,
        userId: mockUserId,
      },
    };

    const mockError = new Error('Internal server error.');

    Likes.create.mockRejectedValue(mockError);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addLike(req, res);

    expect(Likes.create).toHaveBeenCalledWith({
      comment_id: mockCommentId,
      user_id: mockUserId,
    });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error.' });
  });
});