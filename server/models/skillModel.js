import mongoose from "mongoose";
const { Schema } = mongoose;
const skillSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.model("Skill", skillSchema);



