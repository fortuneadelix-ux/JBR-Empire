import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            select: false
        },

        status: {
            type: String,
            enum: ["employee", "owner"],
            default: "employee"

        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)
export default User