import { Router } from "express";
import {
    uploadFile,
    getAllFiles,
} from "../controllers/file.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
    "/upload",
    verifyJWT,
    upload.single("file"),
    uploadFile
);
router.get(
    "/",
    verifyJWT,
    getAllFiles
);

export default router;