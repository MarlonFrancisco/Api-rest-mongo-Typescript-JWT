import mongoose from "../../database";
import { Schema, Document } from "mongoose";

interface IContent extends Document {
    project: any;
    content: any[];
    assignedTo: any;
    publish: Date;
}

const contentSchema = new mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Project",
    },
    content: {
        required: true,
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    publish: {
        type: Date,
        required: true,
    },
});

const Content = mongoose.model<IContent>("Content", contentSchema);

export default Content;
