import {
  errorResponse,
  successResponse,
} from "../../../utils/helpers/response.helpers.js";
function authGoogle(req, res) {
  if (req.isAuthenticated())
    return successResponse(res, "authenticated", { user: req.user }, 200);
  return errorResponse(res, "failed authentication", 401);
}

export default authGoogle;
