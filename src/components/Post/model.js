const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const UserSchema = new Schema({
    title: {
        type: String,
        trim: true,
    },
    body: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        trim: true,
    },
    like: {
        type: Array,
    },
    creation_time: {
        type: Date,
        required: true,
        default: Date.now
    },

}, {
    collection: 'postmodel',
    versionKey: false,
}, );

module.exports = connections.model('PostModel', UserSchema);