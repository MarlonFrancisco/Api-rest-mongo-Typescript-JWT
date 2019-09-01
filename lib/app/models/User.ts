import mongoose from "../../database";
import { Document, Schema } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    member: [{
        id: string;
    }];
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    member: [{
        type: Schema.Types.ObjectId,
        ref: "Project",
    }],
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
