import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose
const userSchema = new Schema({
    
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    fullName: {
        type: String,
    },
    phoneNumbers: [{
        numberType: {
            type: String,
            enum: ['home','mobile','other']
        },
        number: {
            type: String,
        },
    }],
    addresses: [{
        addressType: {
            type: String,
            enum: ['home','other']
        },
        address: {
            type: String,
        },
    }],
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
        const hashedPassword =  bcrypt.hash(this.password, salt);
        // replace plain text password with hashed password
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

//* This is a pre-save hook that will run before the user is saved to the database. It will join the first and last name to create a full name.
userSchema.pre('save', async function (next) {
    try {
        this.fullName = `${this.firstName} ${this.lastName}`;
        next();
    } catch (error) {
        next(error);
    }
});


export default mongoose.model("User", userSchema);
