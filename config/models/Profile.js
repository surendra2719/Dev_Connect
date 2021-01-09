const mongoose = require(`mongoose`)
const ProfileSchema = new mongoose.Schema({
    user: {
        types: mongoose.Schema.Types.ObjectId,
        ref: `user`
    },
    company: { type: String },
    website: { type: String },
    location: { type: String },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true

    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experiences: [
        {
            tittle: {
                type: String,
                require: true
            },
            company: {
                type: String,
                require: true
            },
            location: {
                type: String,
                require: true
            },
            from: {
                type: Date,
                require: true
            },
            to: {
                type: String,
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }

        }

    ],
    education: [
        {
            school: {
                type: String,
                require: true
            },
            education: {
                type: String,
                require: true
            },
            fieldofStudy: {
                type: String,
                require: true
            },

            from: {
                type: Date,
                require: true
            },
            to: {
                type: String,
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        linkdedin: {
            type: String
        },
        instagram: {
            type: String
        }
    }



})
module.exports = Profile = mongoose.model(`profile`, ProfileSchema)