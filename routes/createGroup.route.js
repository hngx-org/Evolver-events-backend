import { Router } from "express";

const router = Router();

import { createGroup } from "../controllers/groupController/methods/createGroup.js";

router.post("/groups", createGroup);

export default router;
