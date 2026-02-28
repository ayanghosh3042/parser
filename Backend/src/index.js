import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./DB/connectDB.js";
import AuthRoute from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", // frontend URL
        // methods: ["GET", "POST"], // allowed methods
        credentials: true, // allow cookies (if using auth tokens)
    })
);
app.use(cookieParser());
app.use(json());
app.use("/auth", AuthRoute);

app.get("/", (req, res) => {
    console.log("hello bhai");
    req.user = { message: "i am a user" };
    // console.log(req);
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
