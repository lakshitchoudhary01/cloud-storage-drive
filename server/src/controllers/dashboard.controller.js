import File from "../models/file.model.js";
import Folder from "../models/folder.model.js";

export const getDashboard = async (req, res) => {
    try {
        const totalFiles = await File.countDocuments({
            owner: req.user._id,
            isTrash: false,
        });

        const totalFolders = await Folder.countDocuments({
            owner: req.user._id,
        });

        const files = await File.find({
            owner: req.user._id,
            isTrash: false,
        });

        const storageUsed = files.reduce(
            (total, file) => total + file.size,
            0
        );

        const recentFiles = await File.find({
            owner: req.user._id,
            isTrash: false,
        })
            .sort({ createdAt: -1 })
            .limit(5);

        return res.status(200).json({
            success: true,
            dashboard: {
                totalFiles,
                totalFolders,
                storageUsed,
                recentFiles,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};