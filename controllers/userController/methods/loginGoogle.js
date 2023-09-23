import {
  errorResponse,
  successResponse,
} from "../../../utils/helpers/response.helpers.js";
export const authGoogle =  (req, res,next) => {
  return successResponse(res, "authenticated", { user: req.user }, 200);
  return errorResponse(res, "failed authentication", 401);
};
