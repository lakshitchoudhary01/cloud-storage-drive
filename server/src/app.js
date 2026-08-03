import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";
import folderRoutes from "./routes/folder.routes.js";

import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Cloud Storage Drive API",
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/files", fileRoutes);
app.use("/api/v1/folders", folderRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

export default app;