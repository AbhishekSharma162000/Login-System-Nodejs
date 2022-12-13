const mongoose = require('mongoose');


const schema = mongoose.Schema;

const UserSchema = new schema({
    username: {
        type: String,
    },

    email: {
        type: String,
        lowercase:true,
        default: ''
    },

    password: {
        type: String,
    },

    mobile: {
        type: String,
        default: ''
    },

    token:{
        type: String,
        default: ''
    }},
    {timestamps: true, versionKey: false})

module.exports = mongoose.model("User", UserSchema);