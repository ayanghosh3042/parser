import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./DB/connectDB.js";
import AuthRoute from "./routes/auth.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.use(json());
app.use("/auth", AuthRoute);

app.get("/", (req, res) => {
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
