const { Router } = require('express');
const PostComponent = require('../Post');
const { isAuthJWT } = require('../../polices/isAuth');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const postRouter = Router();


postRouter.get('/', PostComponent.findAll);

postRouter.post('/sort', PostComponent.sort);

postRouter.post('/sortbylikes', isAuthJWT, PostComponent.sortByLikes);

postRouter.get('/:id', PostComponent.findById);

postRouter.get('/user/:id', PostComponent.findByUserId);

postRouter.post('/create', isAuthJWT, PostComponent.create);

postRouter.put('/update', isAuthJWT, PostComponent.updateById);

postRouter.put('/like', PostComponent.addLike);

postRouter.delete('/', PostComponent.deleteById);

module.exports = postRouter;