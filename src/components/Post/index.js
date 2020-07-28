const PostService = require('./service');
const PostValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

const dbError = 'MongoError: E11000 duplicate key error collection';
const defaultError = 'An error has occurred';
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */

async function postsPageRender(req, res, next) {
    try {
        return res.status(200).render('posts.html', {
            errors: req.flash('error'),
        });
    } catch (error) {
        req.flash('error', { message: defaultError });
        return next(error);
    }
}

async function findAll(req, res, next) {
    try {
        const posts = await PostService.findAll();

        return res.status(200).json(
            posts,
        );
    } catch (error) {
        req.flash('error', { message: defaultError });

        return next(error);
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
        const { error } = PostValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await PostService.findById(req.params.id);
        return res.status(200).json({
            data: user,
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
            message: 'user added successfully',
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.status(201).json({
                message: req.flash('error', error.message.data),
            });
        }
        if (error.name === 'MongoError') {
            return res.status(202).json({
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
            message: 'user updated successfully',
        });
    } catch (error) {

        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.status(201).json({
                message: req.flash('error', error.message.data),
            });
        }
        if (error.name === 'MongoError') {
            return res.status(202).json({
                message: defaultError,
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

module.exports = {
    postsPageRender,
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
