import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="sidebar">

            <h2>CloudDrive</h2>

            <nav>

                <NavLink to="/">Dashboard</NavLink>

                <NavLink to="/files">Files</NavLink>

                <NavLink to="/folders">Folders</NavLink>

                <NavLink to="/profile">Profile</NavLink>

                <NavLink to="/settings">Settings</NavLink>

            </nav>

            <button>Logout</button>

        </aside>
    );
}