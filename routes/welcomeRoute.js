import { Router } from "express";

const welcomeRouter = Router();

welcomeRouter.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

export default welcomeRouter;
