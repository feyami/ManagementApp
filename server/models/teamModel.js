import mongoose from 'mongoose';
 

const { Schema } = mongoose
const teamSchema = new Schema({

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    title: {
        type: String,
        default: 'Team'
    },
     
    description: {
        type: String,
    },
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    

}, { timestamps: true });

export default mongoose.model("Team", teamSchema);
