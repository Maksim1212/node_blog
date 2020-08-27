const { Router } = require('express');
const CommentComponent = require('../Comment');
const { isAuthJWT } = require('../../polices/isAuth');

const commentRouter = Router();


commentRouter.get('/', CommentComponent.findAll);


commentRouter.get('/:id', CommentComponent.findById);


commentRouter.post('/create', CommentComponent.create);


module.exports = commentRouter;
