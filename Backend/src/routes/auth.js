import { Router } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../DB/user.model.js";
import jwt from "jsonwebtoken";
dotenv.config();

const AuthRoute = Router();

AuthRoute.post("/register", async (req, res) => {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
        return res.status(400).json({
            status: false,
            message: "Bad Request : email password not provided",
        });
    }

    const userExist = await User.findOne({ email: email });
    if (userExist) {
        return res
            .status(400)
            .json({ status: false, message: "user allready exist" });
    }

    try {
        const hashPassword = await bcrypt.hash(
            password,
            parseInt(process.env.HASHING_ROUNDS)
        );

        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save();

        res.status(201).json({
            status: true,
            message: "User registered successfully",
            user: { name: newUser.name, email: newUser.email },
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: `error :${err} `,
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
            { expiresIn: "5h" }
        );

        return res.status(200).json({
            status: true,
            message: "Login successful",
            token: `${token}`,
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: `Error: ${err.message}`,
        });
    }
});

export default AuthRoute;
