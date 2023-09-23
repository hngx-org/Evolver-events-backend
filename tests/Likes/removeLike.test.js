import removeLike from '../../controllers/likeController/methods/removeLike';
import Likes from '../../models/Likes';

jest.mock('../../models/Likes', ()=>{{
   destroy: jest.fn()
}})

describe('remove like', () => {
  it('should remove like from a comment', async () => {
   const mockCommentId = '1';
   const mockUserId = '2';

   const req = {
     params: {
       commentId: mockCommentId,
       userId: mockUserId,
     },
   };

   const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await removeLike(req, res)
    expect(Likes.destroy).toHaveBeenCalledWith({
      where: {
         comment_id: req.params.commentId,
         user_id: req.params.userId,
      },})
  });
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ message: 'Like removed' });


});