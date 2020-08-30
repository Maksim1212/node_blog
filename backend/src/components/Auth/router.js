const { Router } = require('express');
const AuthUserComponent = require('../Auth');
const Auth = require('../../polices/isAuth');

const authUserRouter = Router();

authUserRouter.post('/login', AuthUserComponent.login);

authUserRouter.get('/logout', AuthUserComponent.logout);

authUserRouter.post('/createUser', AuthUserComponent.createUser);

authUserRouter.post('/updateToken', Auth.isAuthJWT);

authUserRouter.put('/update', Auth.isAuthJWT, AuthUserComponent.updateUserPass);

authUserRouter.get('/user/:id', AuthUserComponent.getUserFromID);

module.exports = authUserRouter;