import { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";

export default function Dashboard() {
    const [dashboard, setDashboard] = useState(null);

    const loadDashboard = async () => {
        console.log("1. Loading dashboard...");

        try {
            console.log("2. Calling API...");

            const data = await getDashboard();

            console.log("3. API Response:", data);

            setDashboard(data);
        } catch (error) {
            console.log("========== ERROR ==========");
            console.log(error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
            }

            if (error.request) {
                console.log("Request:", error.request);
            }

            console.log("===========================");
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    if (!dashboard) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>Dashboard</h1>

            <br />

            <h3>Total Files : {dashboard.totalFiles}</h3>

            <h3>Total Folders : {dashboard.totalFolders}</h3>

            <h3>
                Storage Used : {(dashboard.storageUsed / 1024).toFixed(2)} KB
            </h3>

            <br />

            <h2>Recent Files</h2>

            <br />

            {dashboard.recentFiles.map((file) => (
                <div key={file._id}>
                    {file.fileName}
                </div>
            ))}
        </div>
    );
}