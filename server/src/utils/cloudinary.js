import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "cloud-storage-drive",
        });

        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        if (localFilePath) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export const deleteFromCloudinary = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId);
};