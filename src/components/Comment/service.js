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

module.exports = {
    findAll,
    findById,
    create
};
