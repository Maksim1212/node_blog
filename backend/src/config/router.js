const express = require('express');
const http = require('http');
const AuthUserRouter = require('../components/Auth/router');
const PostRouter = require('../components/Post/router');
const CommentRouter = require('../components/Comment/router');

module.exports = {
    /**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
    init(app) {
        const router = express.Router();

        /**
         * Forwards any requests to the /v1/auth URI to AuthUserRouter.
         * @name /v1/users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/v1/auth', AuthUserRouter);

        app.use('/posts', PostRouter);

        app.use('/comments', CommentRouter);

        /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        app.use((req, res) => {
            res.status(404).json({
                message: 'page not found'
            });
        });

        /**
         * @function
         * @inner
         * @param {express.Router}
         */
        app.use(router);
    },
};
