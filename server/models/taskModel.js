import mongoose from "mongoose";
const { Schema } = mongoose;
const taskSchema = new Schema({

    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "ongoing", "completed","deleted"],
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },
}, { timestamps: true });
export default mongoose.model("Task", taskSchema);

