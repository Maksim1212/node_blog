const Validation = require('../validation');

class AuthUserValidation extends Validation {
    /**
     * @param {String} profile.email
     * @param {String} profile.name
     * @param {String} profile.password
     * @returns
     * @memberof AuthUserValidation
     */
    createUser(profile) {
        return this.Joi
            .object({
                name: this.Joi
                    .string()
                    .min(1)
                    .max(30)
                    .required(),
                email: this.Joi.string().email().required(),
                password: this.Joi
                    .string()
                    .min(5)
                    .max(18)
                    .required(),
            })
            .validate(profile);
    }
    updateUserPass(data) {
        return this.Joi
            .object({
                password: this.Joi
                    .string()
                    .min(5)
                    .max(18)
                    .required(),
                newPassword: this.Joi
                    .string()
                    .min(5)
                    .max(18)
                    .required(),
                author_id: this.Joi
                    .string()
                    .min(15)
                    .max(35),
                accessToken: this.Joi
                    .string()
                    .min(40)
                    .max(200)
                    .required(),
                email: this.Joi.string().email().required(),
            })
            .validate(data);
    }

    /**
     * @param {String} data.email
     * @param {String} data.password
     * @returns
     * @memberof AuthUserValidation
     */

    login(data) {
        return this.Joi
            .object({
                email: this.Joi.string().email().required(),
                password: this.Joi.string().required(),
            })
            .validate(data);
    }

    /**
     * @param {String} data.refreshToken
     * @returns
     * @memberof AuthUserValidation
     */

    updateToken(data) {
        return this.Joi
            .object({
                refreshToken: this.Joi.string().required(),
            }).validate(data);
    }
    findById(id) {
        return this.Joi.object({
            id: this.Joi
                .string()
                .min(10)
                .max(35)
                .required()
        }).validate(id);
    }
}
module.exports = new AuthUserValidation();