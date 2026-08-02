import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("Local File Path:", localFilePath);

        if (!localFilePath) {
            console.log("No local file path received");
            return null;
        }

        if (!fs.existsSync(localFilePath)) {
            console.log("File does not exist:", localFilePath);
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "cloud-storage-drive",
        });

        console.log("Upload Success:", response.secure_url);

        fs.unlinkSync(localFilePath);

        return response;

    } catch (error) {
        console.log("Cloudinary Error:");
        console.log(error);

        return null;
    }
};