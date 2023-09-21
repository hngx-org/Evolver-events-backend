import { StatusCodes } from "http-status-codes";
import Group from "../../../models/group.model.js";
import tryCatchHelper from "../../../utils/helpers/tryCatch.helpers.js";
import { errorResponse, successResponse } from "../../../utils/helpers/response.helpers.js";

/**
 * @description Create a Group
 * @route POST /api/groups
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} Group Object
 */

export const createGroup = tryCatchHelper(async (req, res) => {
  const { id, title } = req.body;

  if (!id || !title) {
    return errorResponse(res, "Please provide all required fields", StatusCodes.BAD_REQUEST);
  }

  const group = await Group.create({ id, title });

  successResponse(res, "Group created successfully", { group }, StatusCodes.CREATED);
});
