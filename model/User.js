const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    email: {
        type: String,
    },
    username: {
        type: String,
        min: 6,
        required: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    posts: {
        type: Array,
        required: false
    }
}, { timestamps: true});

module.exports = schema;