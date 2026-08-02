import File from "../models/file.model.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../utils/cloudinary.js";

export const uploadFile = async (req, res) => {
    try {
        console.log("========== FILE RECEIVED ==========");
        console.log(req.file);
        console.log("===================================");

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const uploadedFile = await uploadOnCloudinary(req.file.path);

        console.log("Uploaded File Response:", uploadedFile);

        if (!uploadedFile) {
            return res.status(500).json({
                success: false,
                message: "Cloudinary upload failed",
            });
        }

        const file = await File.create({
            owner: req.user._id,
            fileName: req.file.originalname,
            publicId: uploadedFile.public_id,
            url: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            size: req.file.size,
        });

        return res.status(201).json({
            success: true,
            message: "File uploaded successfully",
            file,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getAllFiles = async (req, res) => {
    try {
        const files = await File.find({
            owner: req.user._id,
            isTrash: false,
        })
            .sort({ createdAt: -1 });
            

        return res.status(200).json({
            success: true,
            totalFiles: files.length,
            files,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;

        const file = await File.findOne({
            _id: id,
            owner: req.user._id,
        });

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found",
            });
        }

        await deleteFromCloudinary(file.publicId);

        await File.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "File deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};