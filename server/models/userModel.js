import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose
const userSchema = new Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    is_active: {
        type: Boolean,
        default: true
    },
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    password: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    google: {
        id: {
            type: String,
        },
        displayName: {
            type: String,
        },
        name: {
            type: Object,
        },
        emails: {
            type: Array,
        },
        photos: {
            type: Array,
        },
    },
});

//* This is a pre-save hook that will run before the user is saved to the database. It will hash the password before saving it to the database.
userSchema.pre('save', async function (next) {
    try {
        // check method of registration
        const user = this;
        if (!user.isModified('password')) next();
        // generate salt
        const salt = await bcrypt.genSalt(10);
        // hash the password
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // replace plain text password with hashed password
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

export default mongoose.model("User", userSchema);
