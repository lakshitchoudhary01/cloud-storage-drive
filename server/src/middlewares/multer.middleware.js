import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = path.join(process.cwd(), "temp");

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        console.log("Multer received:", file.originalname);

        cb(null, tempDir);
    },

    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export default multer({ storage });