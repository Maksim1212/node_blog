const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthUserService = require('../Auth/service');
const AuthUserValidation = require('../Auth/validation');
const ValidationError = require('../../error/ValidationError');
const { getUserMainFields } = require('../../helpers/user');

const dbError = 'This email is already in use';
const defaultError = 'An error has occurred';
const userNotFound = 'This Email not found';
const wrongPassword = 'Wrong Password';
const saltRounds = 10;

async function getJWTTokens(user) {
    const accessToken = jwt.sign({ user }, process.env.JWT_Access_Secret_KEY, { expiresIn: 500 });
    const refreshToken = jwt.sign({}, process.env.JWT_Refresh_Secret_KEY, { expiresIn: '15d' });

    await AuthUserService.updateRefreshToken(user, refreshToken);
    return {
        accessToken,
        refreshToken,
    };
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function createUser(req, res, next) {
    try {
        const { error } = AuthUserValidation.createUser(req.body);
        if (error) {
            throw new ValidationError(error.details);
        }

        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        let user = await AuthUserService.createUser(req.body);
        return res.status(200).json({
            user
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.status(500).json({
                message: error.message[0].message
            });
        }
        if (error.name === 'MongoError') {
            req.flash('error', { message: dbError });
            return res.status(500).json({
                message: dbError
            })
        }
        return next(error);
    }
}

async function updateUserPass(req, res, next) {
    try {
        const { error } = AuthUserValidation.updateUserPass(req.body);
        if (error) {
            throw new ValidationError(error.details);
        }
        const updatingUser = await AuthUserService.findUser(req.body.email);
        if (!updatingUser) {
            req.flash('error', { message: userNotFound });

            return res.status(401).json({
                message: 'wrong Email'
            });
        }
        if (!error && updatingUser) {
            const reqPassword = req.body.password;
            const userPassword = updatingUser.password;
            const passwordsMatch = await bcrypt.compare(reqPassword, userPassword);
            if (!passwordsMatch) {
                return res.status(401).json({
                    message: wrongPassword
                });
            }
            newPassword = await bcrypt.hash(req.body.newPassword, saltRounds);
            await AuthUserService.updateUserPass(updatingUser._id, newPassword);
            return res.status(200).json({
                message: 'your password has been successfully updated'
            });
        }

    } catch (error) {
        return res.status(422).json({
            message: error.message,
        });
    }
}

async function getUserFromID(req, res, next) {
    try {
        const { error } = AuthUserValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }
        const user = await AuthUserService.getUserFromID(req.params.id);
        const name = user.name;
        return res.status(200).json({
            name,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error,
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
 * @returns {Promise<void>}
 */
async function login(req, res, next) {
    try {
        const { error } = AuthUserValidation.login(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await AuthUserService.findUser(req.body.email);
        if (!user) {
            return res.status(401).json({
                message: unregisterModule
            });
        }
        if (!error && user) {
            const reqPassword = req.body.password;
            const userPassword = user.password;
            const passwordsMatch = await bcrypt.compare(reqPassword, userPassword);
            if (!passwordsMatch) {
                return res.status(401).json({
                    message: wrongPassword
                });
            }
            const token = await getJWTTokens(user.id);
            const accessToken = token.accessToken;
            let data = {};
            data = {
                ...getUserMainFields(user),
                accessToken,
            };
            // req.session.user = data;
            return res.status(200).json({
                data
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function logout(req, res, next) {
    try {
        await AuthUserService.logout(req.body.user_id);
        return res.status(200);
    } catch (error) {
        req.flash('error', { message: defaultError });
        return next(error);
    }
}

module.exports = {
    createUser,
    logout,
    login,
    getJWTTokens,
    updateUserPass,
    getUserFromID,
};