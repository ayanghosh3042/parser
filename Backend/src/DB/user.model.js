import mongoose from "mongoose";

// Define the schema (table structure)
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
});

// Create a model (like a table class)
const User = mongoose.model("User", userSchema);

export default User;
