import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        const user = await User.create({
            fullName,
            email,
            password,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = user.generateAccessToken();

        const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
        process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
};

        return res
            .status(200)
            .cookie("accessToken", token, options)
            .json({
                success: true,
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                },
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCurrentUser = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
};

export const logoutUser = async (req, res) => {

    return res
        .status(200)
        .clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        })
        .json({
            success: true,
            message: "Logged out successfully",
        });

};