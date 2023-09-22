import { Router } from "express";
import welcomeRouter from "./welcomeRoute.js";
import userRouter from "./userRoutes.js";
import ImageRouter from "./ImageRoutes.js";
import eventRouter from "./eventRoutes.js";
import groupRouter from "./groupRoutes.js";
import commentRouter from "./commentRoutes.js";
import likeRouter from "./likeRouter.js";
import authRouter from "./authRoutes.js";

const router = Router();

router.use("/", welcomeRouter);

router.use(userRouter);
router.use(authRouter);

//describe the event routes
router.use(ImageRouter);
router.use(groupRouter)

router.use(commentRouter)

router.use(eventRouter);

router.use(likeRouter);

export default router;
