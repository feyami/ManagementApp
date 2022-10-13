import mongoose from "mongoose";
const { Schema } = mongoose;
const taskSchema = new Schema({
     
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Status'
    },
    due_date: {
        type: Date,
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    section_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    },
    team_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    lead_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    member_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },
});
export default mongoose.model("Task", taskSchema);

