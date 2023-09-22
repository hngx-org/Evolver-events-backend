import express from "express";
import { updateUser } from "../controllers/userController/index.js";
import {
  interestsAuthorisation,
  userCRUDAuthorisation,
} from "../middleware/authorization.js";

import { removeInterest } from "../controllers/interestController/index.js";

const userRouter = express.Router();

userRouter.put("/user/:id", userCRUDAuthorisation, updateUser);

//awaiting user post interest controller
userRouter
  .route("/users/:userId/interests/:eventId")
  .delete(interestsAuthorisation, removeInterest)
  .post(interestsAuthorisation); //awaiting user post interest controller to follow

export default userRouter;
