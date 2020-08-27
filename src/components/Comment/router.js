const { Router } = require('express');
const csrf = require('csurf');
const CommentComponent = require('../Comment');
const { isAuthJWT } = require('../../polices/isAuth');

const csrfProtection = csrf({ cookie: true });

const commentRouter = Router();


commentRouter.get('/', CommentComponent.findAll);


commentRouter.get('/:id', csrfProtection, CommentComponent.findById);


commentRouter.post('/create', CommentComponent.create);


module.exports = commentRouter;
