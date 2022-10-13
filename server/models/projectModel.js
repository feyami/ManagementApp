import mongoose from 'mongoose';
 

const { Schema } = mongoose
const projectSchema = new Schema({
      
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        teams_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        }],
        leads_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        members_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        section_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Section'
        }],
        status_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status'
        },
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


export default mongoose.model("Project", projectSchema);
