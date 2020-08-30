const PostService = require('./service');
const PostValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

const dbError = 'MongoError: E11000 duplicate key error collection';
const defaultError = 'An error has occurred';

async function findAll(req, res, next) {
    try {
        const posts = await PostService.findAll();
        return res.status(200).json(
            posts,
        );
    } catch (error) {
        return res.status(422).json({
            error: error.name,
            details: error.message,
        });
    }
}

async function sort(req, res, next) {
    try {
        const param = Number(req.body.param);
        const posts = await PostService.sort(param);
        return res.status(200).json(
            posts,
        );
    } catch (error) {
        return res.status(422).json({
            error: error.name,
            details: error.message,
        });
    }
}
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res, next) {
    try {
        console.log(req.params.id)
        const { error } = PostValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }
        console.log(req.params.id)

        const post = await PostService.findById(req.params.id);
        console.log(post)
        return res.status(200).json({
            post
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

async function findByUserId(req, res, next) {
    try {

        const { error } = PostValidation.findByUserId(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }

        const posts = await PostService.findByUserId(req.params.id);
        console.log('by user Id_______________');
        console.log(posts);
        return res.status(200).json({
            data: posts
        });
    } catch (error) {
        console.log('eeerrrrrpppprrrr');
        return res.status(422).json({
            error: error.name,
            details: error.message,
        });
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
    try {
        const { error } = PostValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        await PostService.create(req.body);
        console.log(req.body);
        return res.status(200).json({
            message: 'post added successfully',
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.message,
            });
        }
        if (error.name === 'MongoError') {
            return res.status(422).json({
                message: dbError,
            });
        }
        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
    try {
        const { error } = PostValidation.updateById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        await PostService.updateById(req.body.id, req.body);
        return res.status(200).json({
            message: 'post updated successfully',
        });
    } catch (error) {
        return res.status(422).json({
            message: error,
        });
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
    try {
        const { error } = PostValidation.deleteById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        await PostService.deleteById(req.body.id);
        return res.status(200).json({
            message: 'user deleted successfully',
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.status(201).json({
                message: req.flash('error', error.message.data),
            });
        }
        if (error.name === 'MongoError') {
            console.log(req.flash('error', { message: defaultError }));
            return res.status(202).json({
                message: defaultError,
            });
        }
        return next(error);
    }
}

async function addLike(req, res, next) {
    try {
        const { error } = PostValidation.likedUserId(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        let postData = await PostService.findById(req.body.post_id);
        let likesArr = [];
        likesArr.push(...postData.likes);
        let like = likesArr.find(id => id === `${req.body.user_id}`);
        if (like === undefined) {
            await PostService.addLike(req.body.post_id, req.body.user_id);
            const data = await PostService.findById(req.body.post_id);
            return res.status(200).json({
                data,
            });
        } else return res.status(422).json({
            dad: 'you have already liked this post'
        })
    } catch (error) {
        return res.status(422).json({
            message: error,
        });
    }
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
};