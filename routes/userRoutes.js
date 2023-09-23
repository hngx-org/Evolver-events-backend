import express from "express";
import { updateUser } from "../controllers/userController/index.js";
import {
  interestsAuthorisation,
  userAuthorisation,
  userCRUDAuthorisation,
} from "../middleware/authorization.js";

import { removeInterest } from "../controllers/interestController/index.js";
import validate from "../middleware/validation.js";
import registerUser from "../controllers/userController/methods/registerUser.js";
import { getUserProfile } from "../controllers/userController/methods/getUserProfile.js";

const userRouter = express.Router();

userRouter.put(
  "/user/:user_id",
  userAuthorisation,
  userCRUDAuthorisation,
  updateUser,
);

//Register user
userRouter.post("/users/register", validate.User, registerUser);

// Get user profile
userRouter.get("/users/:user_id/profile", getUserProfile);

//awaiting user post interest controller
userRouter
  .route("/users/:userId/interests/:eventId")
  .delete(userAuthorisation, interestsAuthorisation, removeInterest)
  .post(userAuthorisation, interestsAuthorisation); //awaiting user post interest controller to follow

export default userRouter;
