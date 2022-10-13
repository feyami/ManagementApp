import mongoose from "mongoose";
const { Schema } = mongoose;
const statusSchema = new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },
});
export default mongoose.model("Status", statusSchema);

