import "./src/config/env.js";

import app from "./src/app.js";
import connectDB from "./src/database/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};

startServer();