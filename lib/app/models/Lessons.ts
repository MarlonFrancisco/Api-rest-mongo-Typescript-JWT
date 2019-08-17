import mongoose from "./../../database";

const lessonsSchema = new mongoose.Schema({
    matter: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        required: true,
        ref: "User",
    },
});

const lesson = mongoose.model("Lesson", lessonsSchema);

export default lesson;
