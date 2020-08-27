const { Router } = require('express');
const AuthUserComponent = require('../Auth');
const Auth = require('../../polices/isAuth');

const authUserRouter = Router();

authUserRouter.get('/login', AuthUserComponent.loginPage);

authUserRouter.post('/login', AuthUserComponent.login);

authUserRouter.get('/logout', AuthUserComponent.logout);

authUserRouter.get('/401', AuthUserComponent.anauthorized);

authUserRouter.get('/403', AuthUserComponent.forbidden);

authUserRouter.post('/createUser', AuthUserComponent.createUser);

authUserRouter.post('/updateToken', Auth.isAuthJWT);

authUserRouter.post('/update', AuthUserComponent.updateUserPass);

module.exports = authUserRouter;
