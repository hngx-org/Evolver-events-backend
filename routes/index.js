import { Router } from "express";
import welcomeRouter from "./welcomeRoute.js";
import userRouter from "./userRoutes.js";

const router = Router();

// describe the route for the root path
router.use("/", welcomeRouter);

// describe the user routes
router.use(userRouter);

export default router;
