import { getEventDetails } from '../controllers/eventController/methods/getEventDetails';
import Event from '../models/Event';

// Mock the Event module and its methods
jest.mock('../models/Event', () => ({
  findByPk: jest.fn(), // Mock the findByPk method
}));

describe('getEventDetails', () => {
  it('should retrieve an event by ID and return it as JSON', async () => {
    const eventId = 1;
    const mockEvent = {
      id: eventId,
      name: 'Test Event',
      date: '2023-09-21',
    };
    
    // Mock the findByPk method to resolve with mockEvent
    Event.findByPk.mockResolvedValue(mockEvent);
    
    const req = { params: { id: eventId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getEventDetails(req, res);

    expect(Event.findByPk).toHaveBeenCalledWith(eventId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Event retrieved successfully',
      data: mockEvent,
    });
  });

  // ... (other test cases)
});
