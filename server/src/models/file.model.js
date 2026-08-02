import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        fileName: {
            type: String,
            required: true,
            trim: true,
        },

        publicId: {
            type: String,
            required: true,
        },

        url: {
            type: String,
            required: true,
        },

        fileType: {
            type: String,
            required: true,
        },

        size: {
            type: Number,
            required: true,
        },

        folder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Folder",
            default: null,
        },

        isFavorite: {
            type: Boolean,
            default: false,
        },

        isTrash: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const File = mongoose.model("File", fileSchema);

export default File;