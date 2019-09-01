import mongoose from "../../database";
import { Schema } from "mongoose";

const contentSchema = new mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Project",
    },
    content: [{
        type: Schema.Types.ObjectId,
    }],
    assignedTo: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});

const Content = mongoose.model("Content", contentSchema);

export default Content;
