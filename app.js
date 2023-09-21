import express from "express";

const app = express();

import createGroupRouter from "./routes/createGroup.route.js";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", createGroupRouter);

export default app;
