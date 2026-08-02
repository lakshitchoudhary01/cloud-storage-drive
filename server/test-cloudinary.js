import "./src/config/env.js";
import cloudinary from "./src/config/cloudinary.js";

try {
    const result = await cloudinary.uploader.upload(
        "./temp/test.txt",
        {
            resource_type: "raw",
            folder: "cloud-storage-drive",
        }
    );

    console.log(result);
} catch (error) {
    console.log(error);
}