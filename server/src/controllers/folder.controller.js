import Folder from "../models/folder.model.js";

export const createFolder = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Folder name is required",
            });
        }

        const folderExists = await Folder.findOne({
            owner: req.user._id,
            name,
        });

        if (folderExists) {
            return res.status(409).json({
                success: false,
                message: "Folder already exists",
            });
        }

        const folder = await Folder.create({
            owner: req.user._id,
            name,
        });

        return res.status(201).json({
            success: true,
            message: "Folder created successfully",
            folder,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getFolders = async (req, res) => {
    try {
        const folders = await Folder.find({
            owner: req.user._id,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            totalFolders: folders.length,
            folders,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};