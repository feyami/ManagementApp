import mongoose from 'mongoose';
import { factory } from 'fakingoose';
const { Schema } = mongoose;

const contactSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    company: {
        type: String,

    },
    phoneNumbers: {
        Work: {
            type: String,
        },
        Mobile: {
            type: String,
        },
        Home: {
            type: String,
        },

    },
    address: {
        Work: {
            type: String,
        },
        Home: {
            type: String,
        },

    },
    note: {
        type: String,
    },
    socialMedia: {
        facebook: {
            type: String,
        },
        twitter: {
            type: String,
        },
        linkedIn: {
            type: String,
        },
        instagram: {
            type: String,
        },
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

contactSchema.pre('save', async function (next) {
    try {
        this.fullName = `${this.firstName} ${this.lastName}`;
        next();
    } catch (error) {
        next(error);
    }
});


const contactfactory = factory(contactSchema)
const mock = contactfactory.generate();
console.log(mock);
export default mongoose.model('Contact', contactSchema);






