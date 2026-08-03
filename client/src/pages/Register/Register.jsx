import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
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

            await registerUser(formData);

            alert("Account Created Successfully!");

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration Failed"
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

                <h1>Create Account</h1>

                <br />

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                />

                <br />
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
                        ? "Creating..."
                        : "Register"}

                </button>

                <br />
                <br />

                <p>

                    Already have an account?

                    <Link to="/login">

                        {" "}Login

                    </Link>

                </p>

            </form>

        </div>

    );

}