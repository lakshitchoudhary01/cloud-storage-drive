import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await loginUser(formData);

            localStorage.setItem(
                "token",
                response.token
            );

            setUser(response.user);

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-page">

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <h1>Login</h1>

                <br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <br />
                <br />

                <button type="submit">

                    {loading
                        ? "Signing In..."
                        : "Login"}

                </button>

                <br />
                <br />

                <p>

                    Don't have an account?

                    <Link to="/register">

                        {" "}Register

                    </Link>

                </p>

            </form>

        </div>

    );

}