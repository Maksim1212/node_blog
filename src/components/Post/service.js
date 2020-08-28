const PostModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<UserModel[]>
 */
function findAll() {
    return PostModel.find({}).exec();
}

/**
 * @exports
 * @method findById
 * @param {string} id
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
function findById(id) {
    return PostModel.findById(id).exec();
}

function findByUserId(author_id) {
    return PostModel.find({ author_id }).exec();
}

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function create(post) {
    return PostModel.create(post);
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {string} _id
 * @param {object} newProfile
 * @summary update a user's profile
 * @returns {Promise<void>}
 */
function updateById(_id, newProfile) {
    return PostModel.updateOne({ _id }, newProfile).exec();
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
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
};
