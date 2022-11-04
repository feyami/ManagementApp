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
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        },
        teams: {
            teamName: {
               name: {
                     type: String,
                },
                members: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }]
            }
        } ,
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }],
        
        status: {
            type: String,
            enum: ["Pending", "Waiting for Approval","In Progress", "Completed","Deleted"],
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
