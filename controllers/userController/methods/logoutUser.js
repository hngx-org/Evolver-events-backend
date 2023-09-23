import { successResponse } from "../../../utils/helpers/response.helpers.js";
function logout(req, res, next) {
  req.logout();
  return successResponse(res, "success", { loggedOut: true }, 200);
}

export default logout;
