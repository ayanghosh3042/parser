import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./DB/connectDB.js";
import User from "./DB/user.model.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.get("/", async (req, res) => {
    await User.create({
        name: "Ayan",
        age: 23,
        email: "ayan@example.com",
    });
    console.log("hello bhai");
    res.status(200).send("<h1>Hello bhai</h1>");
});

try {
    await connectDB();
    app.listen(port, () => {
        console.log(`🚀 Running at http://localhost:${port}`);
    });
} catch (err) {
    console.error("❌ Failed to connect to DB:", err);
}
