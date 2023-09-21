import { Router } from "express";
import welcomeRouter from "./welcomeRoute.js";
import userRouter from "./userRoutes.js";
import eventRouter from "./eventRoutes.js";
import groupRouter from "./groupRoutes.js";
import imageRouter from "./imageroutes.js";

const router = Router();

// describe the route for the root path
router.use("/", welcomeRouter);

// describe the user routes
router.use(userRouter);

//descrive the group routes
router.use(groupRouter);

// describe the event routes
router.use(eventRouter);

// describe the event routes
router.use(imageRouter);

export default router;
