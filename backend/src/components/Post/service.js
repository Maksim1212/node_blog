const PostModel = require('./model');


function findAll() {
    return PostModel.find({}).exec();
}

function sort(param) {
    return PostModel.aggregate([{
        $sort: {
            creation_time: param,
        }
    }, ]);
}

function sortByLikes() {
    return PostModel.aggregate([{ $unwind: "$likes" }, { $sortByCount: "$likes" }])
}


function findById(id) {
    return PostModel.findById(id).exec();
}

function findByUserId(author_id) {
    return PostModel.find({ author_id }).exec();
}


function create(post) {
    return PostModel.create(post);
}


function updateById(_id, newProfile) {
    return PostModel.updateOne({ _id }, newProfile).exec();
}


function deleteById(_id) {
    return PostModel.deleteOne({ _id }).exec();
}

function addLike(_id, user_id) {
    return PostModel.updateOne({ _id }, { $push: { likes: user_id } }).exec()
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    findByUserId,
    addLike,
    sort,
    sortByLikes,
};