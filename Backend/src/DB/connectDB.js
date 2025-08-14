import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// const { connect, connection, disconnect } = pkg;
const uri = `mongodb+srv://myselfghoshayan:${process.env.DB_PASSWORD}@cluster0.kuk0ida.mongodb.net/pomodoro`;

export async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } catch (err) {
        console.log(err);
    }
}

// const mongoose = require("mongoose");
// const uri =
//     "mongodb+srv://myselfghoshayan:<db_password>@cluster0.kuk0ida.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const clientOptions = {
//     serverApi: { version: "1", strict: true, deprecationErrors: true },
// };
// async function run() {
//     try {
//         // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//         await mongoose.connect(uri, clientOptions);
//         await mongoose.connection.db.admin().command({ ping: 1 });
//         console.log(
//             "Pinged your deployment. You successfully connected to MongoDB!"
//         );
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await mongoose.disconnect();
//     }
// }
// run().catch(console.dir);
