import { listAllEvents } from '../controllers/eventController/methods/listEvents';
import Event from '../models/Event';

jest.mock('../models/Event', () => ({
  findAll: jest.fn(),
}));

describe('listAllEvents', () => {
  it('should retrieve all events and return them as JSON', async () => {
    const mockEvents = [
      { id: 1, name: 'Event 1', date: '2022-01-01' },
      { id: 2, name: 'Event 2', date: '2022-02-01' },
    ];

    Event.findAll.mockResolvedValue(mockEvents);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await listAllEvents(req, res);

    expect(Event.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Events retrieved successfully',
      data: mockEvents,
    });
  });

  it('should handle errors when retrieving events', async () => {
    const errorMessage = 'Database error';

    Event.findAll.mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await listAllEvents(req, res);

    expect(Event.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error retrieving events' });
  });
});