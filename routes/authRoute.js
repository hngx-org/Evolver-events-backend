import "../middleware/authentication.js";
import express from "express";
import { loginGoogle } from "../controllers/userController/index.js";
import { logoutUser } from "../controllers/userController/index.js";
import { loginTwitter } from "../controllers/userController/index.js";
import passport from "passport";

const authRouter = express.Router();

authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);
authRouter.get("/auth/twitter", passport.authenticate("twitter"));
authRouter.get(
  "/auth/callback/google",
  passport.authenticate("google"),
  loginGoogle,
);
authRouter.get("/auth/callback/twitter", loginTwitter);
authRouter.get("/logout", logoutUser);

export default authRouter;
