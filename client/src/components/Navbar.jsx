import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const { user } = useAuth();

    return (
        <header className="navbar">

            <div>

                <h2>Dashboard</h2>

                <p>
                    Welcome back
                    {user ? `, ${user.fullName}` : ""}
                </p>

            </div>

        </header>
    );
}