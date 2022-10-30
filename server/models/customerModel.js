import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema({
    customerType: {
        type: String,
        enum: ['individual', 'business']
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    fullName: {
        type: String,
    },
    companyName: {
        type: String,
    },
    email:{
        type: String,
    },
    webSite: {
        type: String,
    },
    phoneNumbers: {
        Head: {
            type: String,
        },
        Branch: {
            type: String,
        },
        Fax: {
            type: String,
        },

    },
    address: {
        Head: {
            type: String,
        },
        Branch: {
            type: String,
        },

    },
    sector: {
        type: String,
    },
    contact: [{
        contactType: {
            type: String,    
        },
        contactInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contact',
        }
    }],
    notes: {
        type: String,
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],
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
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

customerSchema.pre('save', async function (next) {
    try {
        if (this.customerType === 'individual') {
            this.fullName = `${this.firstName} ${this.lastName}`;
            next();
        } else {
            this.fullName = this.businessName;
            next();
        }
    } catch (error) {
        next(error);
    }
});


export default mongoose.model('Customer', customerSchema);