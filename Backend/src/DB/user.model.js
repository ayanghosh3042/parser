import mongoose from "mongoose";

// Define the schema (table structure)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },
});

// Create a model (like a table class)
const User = mongoose.model("User", userSchema);

export default User;
