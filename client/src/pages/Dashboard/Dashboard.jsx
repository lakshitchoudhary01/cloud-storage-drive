import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDashboard } from "../../services/dashboardService";

export default function Dashboard() {

    const { user } = useAuth();

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboard();

            setDashboard(data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!dashboard) {

        return <h2>Loading...</h2>;

    }

    const storagePercent =
        Math.min(
            (dashboard.storageUsed / (1024 * 1024 * 100)) * 100,
            100
        );

    return (

        <div className="dashboard">

            <h1>

                Welcome back{user ? `, ${user.fullName}` : ""} 👋

            </h1>

            <br />

            <div className="dashboard-cards">

                <div className="card">

                    <h3>Total Files</h3>

                    <h2>{dashboard.totalFiles}</h2>

                </div>

                <div className="card">

                    <h3>Total Folders</h3>

                    <h2>{dashboard.totalFolders}</h2>

                </div>

                <div className="card">

                    <h3>Storage Used</h3>

                    <h2>

                        {(dashboard.storageUsed / 1024).toFixed(2)} KB

                    </h2>

                </div>

                <div className="card">

                    <h3>Last Upload</h3>

                    <h2>

                        {dashboard.recentFiles.length}

                    </h2>

                </div>

            </div>

            <h2>Storage Usage</h2>

            <br />

            <div className="storage-bar">

                <div
                    className="storage-fill"
                    style={{
                        width: `${storagePercent}%`,
                    }}
                />

            </div>

            <br />

            <p>

                {storagePercent.toFixed(2)}% Used

            </p>

            <br />
            <br />

            <h2>

                Recent Files

            </h2>

            <br />

            <div className="recent-files">

                {

                    dashboard.recentFiles.map((file) => (

                        <div
                            key={file._id}
                            className="file-row"
                        >

                            <span>

                                📄 {file.fileName}

                            </span>

                            <span>

                                {(file.size / 1024).toFixed(2)} KB

                            </span>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}