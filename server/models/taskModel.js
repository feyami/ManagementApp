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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
    },
    due_date: {
        type: Date,
    },
    project
        : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }],
    leads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
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
});
export default mongoose.model("Task", taskSchema);

