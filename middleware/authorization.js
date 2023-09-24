/**
 * Event app authorisation middleware
 * this is tentative with assumption that session object in request will contain user id generated at authentication and supplied by the frontend
 *
 */
import Event from "../models/Event.js";
import Group from "../models/Group.js";
import {
  successResponse,
  errorResponse,
} from "../utils/helpers/response.helpers.js";

// authorises entry into the app to ensure user is logged in
export const userAuthorisation = (req, res, next) => {
  // if user is not loggen in,
  if (!req.isAuthenticated() || !req.user)
    return errorResponse(res, "You are not logged in", 401);
  // all other endpoints are accessible
  return next();
};

export const userCRUDAuthorisation = (req, res, next) => {
  // if user is not loggen in,
  if (req.user.id !== req.params.id)
    return errorResponse(
      res,
      "You are not authorised to edit or delete another user",
      401,
    );
  // all other endpoints are accessible
  return next();
};

// Events endpoint authorisation needed of PUT and DELETE
export const eventCRUDAuthorise = async (req, res, next) => {
  const userId = req.user.id;
  const { eventId } = req.params;
  const event = Event.findByPk(eventId);

  if (!event)
    // if event is not found
    return errorResponse(res, "Event doesnt exist", 404);

  // for PUT and DELETE check if user is creator
  if (req.method === "PUT" || req.method === "DELETE") {
    if (event.creator !== userId)
      return errorResponse(res, "You are not the creator of this event", 401);
  }
  return next();
};

// Groups endpoint authorisation for updating and deleting groups
export const groupCrudAuthorisation = (req, res, next) => {
  const userId = req.user.id;
  const { groupId } = req.params;
  const group = Group.findByPk(groupId);

  if (!group)
    // check if a group exists
    return errorResponse(res, "Group doesnt exist", 404);

  // for PUT and DELETE check if user is admin
  if (req.method === "PUT" || req.method === "DELETE") {
    if (group.creator_id !== userId)
      return errorResponse(res, "You are not the creator of this group", 401);
  }

  return next();
};

// Authorisation for deletion of group members (DELETE only) the if statement for request is to guard for delete
export const groupMembershipCrudAuthorisation = (req, res, next) => {
  const userId = req.user.id;
  const { groupId } = req.params;
  const group = Group.findByPk(groupId);
  if (!group)
    // group doesnt exist
    return errorResponse(res, "Group doesnt exist", 404);

  //   for DELETE and ADD only

  if (group.creator_id !== userId || userId != req.params.userId)
    return errorResponse(
      res,
      "You are not authorised to add or delete another user",
      401,
    );

  return next();
};

// Interests: user can only remove his own interest
export const interestsAuthorisation = (req, res, next) => {
  const userId = req.user.id;
  const { userId: usertoDelete } = req.params;

  if (userId !== usertoDelete)
    return errorResponse(
      res,
      "You are not authorised to delete or add interests for others",
      401,
    );

  return next();
};

//likes: user can only unlike whe he/she liked
export const likesAuthorisation = (req, res, next) => {
  const userId = req.user.id;
  const { userId: usertoDelete } = req.params;
  if (userId !== usertoDelete)
    return errorResponse(
      res,
      "You are not authorised to add/remove another user's likes",
      401,
    );

  return next();
};
