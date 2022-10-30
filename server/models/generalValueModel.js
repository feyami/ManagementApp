import mongoose from 'mongoose';

const { Schema } = mongoose;

const generalValueSchema = new Schema({
    generalValueTitle: {
        type: String,
        required: true,
    },
    generalValue: [{
        type: String,
        required: true,
    }],
});

export default mongoose.model('GeneralValue', generalValueSchema);