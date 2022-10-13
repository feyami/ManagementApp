import mongoose from 'mongoose';
 

const { Schema } = mongoose
const projectSchema = new Schema({
      
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        teams: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        }],
        leads: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        sections: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Section'
        }],
        status: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status'
        },
        creator: {
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
