const jwt = require('jsonwebtoken');
const AuthUserService = require('../components/Auth/service');
const { getJWTTokens } = require('../components/Auth/index');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function isAuthJWT(req, res, next) {
    let tokens;
    let decoded;
    try {
        let token = req.body.accessToken;
        tokens = await getJWTTokens(req.body.author_id);
        decoded = jwt.verify(token, process.env.JWT_Access_Secret_KEY);
    } catch (error) {
        if (error.message === 'jwt expired') {
            const user = await AuthUserService.getUserFromID(req.body.author_id);
            req.body.accessToken = tokens.accessToken;
            token = req.body.accessToken;
            decoded = jwt.verify(token, process.env.JWT_Access_Secret_KEY);
            if (!user) {
                return res.status(401).json({ message: 'user not found' });
            }
        } else {
            return res.status(403).json({
                message: 'wrong token',
            });
        }
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp > currentTime) {
        return next();
    }
    return res.status(200);
}


module.exports = {
    isAuthJWT,
};