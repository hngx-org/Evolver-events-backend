import { createEvent } from "../../controllers/eventController/methods/createEvent";
import Event from "../../models/Event.js";
import { validationResult } from "express-validator";

jest.mock("../../models/Event.js");
jest.mock("express-validator");

describe("createEvent", () => {
  it("returns a 400 status if there are validation errors", async () => {
    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => ["Error"],
    });

    const req = {
      body: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      msg: ["Error"],
    });
  });

  it("creates an event and returns a 201 status if there are no validation errors", async () => {
    validationResult.mockReturnValue({
      isEmpty: () => true,
    });

    const mockEvent = { id: "1", title: "Test Event" };
    Event.create.mockResolvedValue(mockEvent);

    const req = {
      body: { title: "Test Event" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createEvent(req, res);

    expect(Event.create).toHaveBeenCalledWith({ title: "Test Event" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      msg: "Event created",
      data: mockEvent,
    });
  });

  it("returns a 500 status if an error occurs", async () => {
    validationResult.mockReturnValue({
      isEmpty: () => true,
    });

    const mockError = new Error("Internal server error.");
    Event.create.mockRejectedValue(mockError);

    const req = {
      body: { title: "Test Event" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      msg: mockError.message,
    });
  });
});
