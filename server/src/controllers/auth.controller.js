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