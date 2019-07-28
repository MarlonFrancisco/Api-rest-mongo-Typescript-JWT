import mongoose from "../../database";
import { NextFunction } from "connect";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetValidToken: {
        type: Date,
        select: false
    }
});

const user = mongoose.model("User", userSchema);

export default user;
