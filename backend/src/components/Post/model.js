const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const PostSchema = new Schema({
    author_id: {
        type: String,
        required: true,
    },
    author_name: {
        type: String,
        required: true,
    },
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
    likes: {
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

module.exports = connections.model('PostModel', PostSchema);