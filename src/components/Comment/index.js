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

// async function findById(req, res, next) {
//     try {
//         const { error } = PostValidation.findById(req.params);

//         if (error) {
//             throw new ValidationError(error.details);
//         }
//         console.log(req.params.id)

//         const post = await PostService.findById(req.params.id);
//         console.log(post)
//         return res.status(200).json({
//             post
//         });
//         // render('post.html', {
//         //     errors: req.flash('error'),
//         //)};
//     } catch (error) {
//         if (error instanceof ValidationError) {
//             return res.status(422).json({
//                 error: error.name,
//                 details: error.message,
//             });
//         }

//         res.status(500).json({
//             message: error.name,
//             details: error.message,
//         });

//         return next(error);
//     }
// }

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

async function findByPostId(req, res, next) {
    try {
        const { error } = CommentValidation.findByPostId(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }

        const comments = await CommentService.findByPostId(req.params.id);

        return res.status(200).json({
            comments
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }

        return res.status(500).json({
            message: error.name,
            details: error.message,
        });
    }
}

async function addLike(req, res, next) {
    try {
        const { error } = CommentValidation.likedUserId(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        let commentData = await CommentService.findById(req.body.comment_id);
        let likesArr = [];
        likesArr.push(...commentData.likes);
        let like = likesArr.find(id => id === `${req.body.user_id}`);
        if (like === undefined) {
            await CommentService.addLike(req.body.comment_id, req.body.user_id);
            return res.status(200).json({
                message: 'like added successfully'
            });
        }
        return res.status(200).json({
            message: 'you have already liked this comment'
        })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
            });
        }

        res.status(500).json({
            message: error.name,
        });

        return next(error);
    }
}
module.exports = {
    findAll,
    // findById,
    create,
    findByPostId,
    addLike,
};
