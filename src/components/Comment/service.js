const CommentModel = require('./model');


function findAll() {
    return CommentModel.find({}).exec();
}


function findById(id) {
    return CommentModel.findById(id).exec();
}

function create(post) {
    return CommentModel.create(post);
}

function findByPostId(post_id) {
    return CommentModel.find({ post_id }).exec();
}
module.exports = {
    findAll,
    findById,
    create,
    findByPostId,
};
