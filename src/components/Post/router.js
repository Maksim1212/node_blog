const { Router } = require('express');
const csrf = require('csurf');
const PostComponent = require('../Post');
const { isAuthJWT } = require('../../polices/isAuth');

const csrfProtection = csrf({ cookie: true });

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const postRouter = Router();

/**
 * Route serving list of posts.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
postRouter.get('/', PostComponent.postsPageRender);
// userRouter.get('/', isAuthJWT, csrfProtection, UserComponent.findAll);

postRouter.get('/data', PostComponent.findAll);
/**
 * Route serving a user
 * @name /v1/users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
postRouter.get('/:id', csrfProtection, PostComponent.findById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
// userRouter.post('/', isAuthJWT, csrfProtection, UserComponent.create);
postRouter.post('/', PostComponent.create);
/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
postRouter.put('/', PostComponent.updateById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
postRouter.delete('/', PostComponent.deleteById);

module.exports = postRouter;