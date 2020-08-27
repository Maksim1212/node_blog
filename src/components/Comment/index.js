const CommentService = require('./service');
const CommentValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

const dbError = 'MongoError: E11000 duplicate key error collection';
const defaultError = 'An error has occurred';

async function findAll(req, res, next) {
    try {
        const comments = await CommentService.findAll();
        return res.status(200).json(
            comments,
        );
    } catch (error) {
        req.flash('error', { message: defaultError });

        return next(error);
    }
}

async function findById(req, res, next) {
    try {
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
        // render('post.html', {
        //     errors: req.flash('error'),
        //)};
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

async function create(req, res, next) {
    try {
        const { error } = CommentValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        await CommentService.create(req.body);
        console.log(req.body);
        return res.status(200).json({
            message: 'comment added successfully',
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

module.exports = {
    findAll,
    findById,
    create,
};
