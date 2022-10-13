import mongoose from 'mongoose';
 

const { Schema } = mongoose
const teamSchema = new Schema({

    
    title: {
        type: String,
    },
    expertise_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expertise'
    }],
    description: {
        type: String,
    },
    leads_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    members_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    

});

export default mongoose.model("Team", teamSchema);
