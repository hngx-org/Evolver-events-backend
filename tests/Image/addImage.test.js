// Import the necessary modules and the addImageToComment function
import addImageToComment from '../../controllers/imageController/methods/addImageToComment';
import Image from '../../models/Image.js';
import CommentImages from '../../models/CommentImages.js';

// Mock the CommentImages and Image models
jest.mock('../../models/CommentImages.js', () => ({
  create: jest.fn(),
}));

jest.mock('../../models/Image.js', () => ({
  create: jest.fn(),
}));

describe('addImageToComment', () => {
  // Test case for adding an image to a comment
  it('should add an image to a comment and return a success response', async () => {
    // Mock the request and response objects
    const req = {
      params: {
        commentId: 1,
      },
      body: {
        url: 'https://example.com/image.jpg',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Image.create method
    const mockImage = {
      id: 1,
      url: 'https://example.com/image.jpg',
    };
    Image.create.mockResolvedValueOnce(mockImage);

    // Mock the CommentImages.create method
    const mockCommentImage = {
      comment_id: 1,
      image_id: 1,
    };
    CommentImages.create.mockResolvedValueOnce(mockCommentImage);

    // Call the addImageToComment function
    await addImageToComment(req, res);

    // Assertions
    expect(Image.create).toHaveBeenCalledWith({
      url: 'https://example.com/image.jpg',
    });
    expect(CommentImages.create).toHaveBeenCalledWith({
      comment_id: 1,
      image_id: 1,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Image successfully added to comment.',
      data: mockCommentImage,
    });
  });

  // Test case for handling errors
  it('should handle errors and return a 500 response', async () => {
    // Mock the request and response objects
    const req = {
      params: {
        commentId: 1,
      },
      body: {
        url: 'https://example.com/image.jpg',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock that an error occurs during image creation
    Image.create.mockRejectedValueOnce(new Error('Image creation error'));

    // Call the addImageToComment function
    await addImageToComment(req, res);

    // Assertions
    expect(Image.create).toHaveBeenCalledWith({
      url: 'https://example.com/image.jpg',
    });
    expect(CommentImages.create).not.toHaveBeenCalled(); // CommentImages.create should not be called
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error.' });
  });

  // Add more test cases as needed
});

