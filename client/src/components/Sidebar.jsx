import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";

export default function Sidebar() {

    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const handleLogout = async () => {

        try {

            await logoutUser();

            localStorage.removeItem("token");

            setUser(null);

            navigate("/login");

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <aside className="sidebar">

            <div>

                <h1>CloudDrive</h1>

                <p className="user-email">

                    {user?.email}

                </p>

            </div>

            <nav>

                <NavLink to="/">Dashboard</NavLink>

                <NavLink to="/files">Files</NavLink>

                <NavLink to="/folders">Folders</NavLink>

                <NavLink to="/profile">Profile</NavLink>

                <NavLink to="/settings">Settings</NavLink>

            </nav>

            <button onClick={handleLogout}>

                Logout

            </button>

        </aside>

    );

}