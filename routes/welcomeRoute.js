import { Router } from "express";

const welcomeRouter = Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Get a welcome message
 *     responses:
 *       '200':
 *         description: A welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A welcome message
 */

welcomeRouter.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

export default welcomeRouter;
