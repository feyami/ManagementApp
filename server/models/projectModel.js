import mongoose from 'mongoose';
 

const { Schema } = mongoose
const projectSchema = new Schema({
      
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        customer: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        }],
        teams: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        }],
        sections: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Section'
        }],
        status: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status'
        },
        note: {
            type: String,
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
