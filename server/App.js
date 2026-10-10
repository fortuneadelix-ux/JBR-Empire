import mongoose, { mongo } from "mongoose";
import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routes/authRoutes/authRoutes.js";
import CRUDrouter from "./routes/userCrudRoutes.js"
import User from "./models/authmodels/user.js";
import bcrypt from "bcrypt";

dotenv.config()
const App = express();

App.use(cors());

App.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

try {
    await mongoose.connect(MONGO_URI)
    console.log('mongoDB connected');
} catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
}


App.use("/api/auth", authRouter)
App.use("/api/users", CRUDrouter)

App.listen(PORT, () => {
    console.log(`JBR_Empire running on ${PORT}`)
})

const ownerExist = await User.findOne({status: "owner"});
if(!ownerExist){
    const hashedPassword = await bcrypt.hash(process.env.FIRST_OWNER_PASSWORD, 10);
    await User.create({
    name: process.env.FIRST_OWNER_NAME,
    email: process.env.FIRST_OWNER_EMAIL,
    password: hashedPassword,
    status: "owner",
    isActive: true
    })
}