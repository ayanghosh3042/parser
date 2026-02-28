import { Router } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../DB/user.model.js";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
dotenv.config();

const AuthRoute = Router();

AuthRoute.post("/register", async (req, res) => {
    const { name, password, email } = req.body;

    // Validate required fields
    if (!name || !password || !email) {
        return res.status(400).json({
            status: false,
            message: "All fields (name, email, password) are required",
        });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: false,
            message: "Invalid email format",
        });
    }

    // Validate password strength
    if (password.length < 6) {
        return res.status(400).json({
            status: false,
            message: "Password must be at least 6 characters long",
        });
    }

    // Check if password contains at least one number
    const hasNumber = /\d/.test(password);
    if (!hasNumber) {
        return res.status(400).json({
            status: false,
            message: "Password must contain at least one number",
        });
    }

    try {
        // Check if user already exists
        const userExist = await User.findOne({ email: email.toLowerCase() });
        if (userExist) {
            return res.status(400).json({
                status: false,
                message: "User with this email already exists",
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(
            password,
            parseInt(process.env.HASHING_ROUNDS),
        );

        // Create new user
        const newUser = new User({
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashPassword,
        });
        await newUser.save();

        res.status(201).json({
            status: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({
            status: false,
            message: "Internal server error. Please try again.",
        });
    }
});

AuthRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ status: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ status: false, message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "5h" },
        );

        res.cookie("token", token);
        return res.status(200).json({
            status: true,
            message: "Login successful",
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: `Error: ${err.message}`,
        });
    }
});

AuthRoute.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ status: true, message: "Logged out successfully" });
});

// Protected route to get user profile
AuthRoute.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found",
            });
        }

        res.json({
            status: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: `Error: ${err.message}`,
        });
    }
});

export default AuthRoute;
