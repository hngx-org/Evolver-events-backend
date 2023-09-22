// Import the necessary modules and the createEvent function
import { createEvent } from '../../controllers/eventController/methods/createEvent';
import Event from '../../models/Event.js';
import { validationResult } from 'express-validator';

// Mock the express-validator validationResult function
jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

// Mock the Event model
jest.mock('../../models/Event.js', () => ({
  create: jest.fn(),
}));

describe('createEvent', () => {
  // Test case when validation passes
  it('should create a new event and return a success response', async () => {
    // Mock the request and response objects
    const req = {
      body: {
        title: 'Test Event',
        description: 'Test description',
        creator_id: 1,
        location: 'Test location',
        start_date: '2023-09-30',
        end_date: '2023-10-01',
        start_time: '09:00',
        end_time: '17:00',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock that validation passes
    validationResult.mockReturnValueOnce({ isEmpty: () => true });

    // Mock the Event.create method
    const mockEvent = {
      id: 1,
      title: 'Test Event',
      // Add other fields as needed
    };
    Event.create.mockResolvedValueOnce(mockEvent);

    // Call the createEvent function
    await createEvent(req, res);

    // Assertions
    expect(validationResult).toHaveBeenCalledWith(req);
    expect(Event.create).toHaveBeenCalledWith({
      title: 'Test Event',
      description: 'Test description',
      creator_id: 1,
      location: 'Test location',
      start_date: '2023-09-30',
      end_date: '2023-10-01',
      start_time: '09:00',
      end_time: '17:00',
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      msg: 'Event created',
      data: mockEvent,
    });
  });

  // Test case when validation fails
  // Test case when validation fails
it('should return a 400 response with validation errors', async () => {
  // Mock the request and response objects
  const req = {
    body: {}, // Invalid request body with missing fields
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  // Mock that validation fails
  validationResult.mockReturnValueOnce({
    isEmpty: () => false,
    array: () => [{ param: 'title', msg: 'Title is required' }],
  });

  // Call the createEvent function
  await createEvent(req, res);

  // Assertions
  expect(validationResult).toHaveBeenCalledWith(req);
  expect(Event.create).not.toHaveBeenCalled(); // Event.create should not be called
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    status: 'error',
    msg: [{ param: 'title', msg: 'Title is required' }],
  });
});
  // Add more test cases as needed}
})
