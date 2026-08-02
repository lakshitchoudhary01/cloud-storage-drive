import { Router } from "express";
import {
    createFolder,
    getFolders,
} from "../controllers/folder.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, createFolder);

router.get("/", verifyJWT, getFolders);

export default router;