const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const CommentSchema = new Schema({
    author_id: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
    },
    post_id: {
        type: String,
        required: true,
    },
    creation_time: {
        type: Date,
        required: true,
        default: Date.now
    },

}, {
    collection: 'commentmodel',
    versionKey: false,
}, );

module.exports = connections.model('CommentModel', CommentSchema);
