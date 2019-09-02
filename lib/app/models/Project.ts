import mongoose from "./../../database";
import { Schema, Document } from "mongoose";

interface IProject extends Document {
    name: string;
    members: [{
        id: string;
    }];
    contents: any;
}

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: [{
        type: Schema.Types.ObjectId,
        unique: true,
        ref: "User",
    }],
    contents: [{
        type: Schema.Types.ObjectId,
        ref: "Content",
    }],
});

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
