import { StatusCodes } from "http-status-codes";
import Group from "../../../models/Group.js";
import tryCatchHelper from "../../../utils/helpers/tryCatch.helpers.js";
import { errorResponse, successResponse } from "../../../utils/helpers/response.helpers.js";

/**
 * @description Create a Group
 * @route POST /api/groups
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} Group Object
 */

const createGroup = tryCatchHelper(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return errorResponse(res, "Please provide all required fields", StatusCodes.BAD_REQUEST);
  }

  const group = await Group.create({ title });

  successResponse(res, "Group created successfully", { group }, StatusCodes.CREATED);
});

export default createGroup;
