const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class PostValidation extends Validation {
    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof UserValidation
     */
    findById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }
    findByUserId(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }

    /**
     * @param {String} profile.email
     * @param {String} profile.fullName
     * @returns
     * @memberof UserValidation
     */
    create(post) {
        return this.Joi
            .object({
                author_id: this.Joi
                    .string()
                    .min(15)
                    .max(35)
                    .required(),
                title: this.Joi
                    .string()
                    .min(1)
                    .max(100)
                    .required(),
                body: this.Joi
                    .string()
                    .min(1)
                    .max(10000)
                    .required(),
                _csrf: this.Joi.string(),
                comment: this.Joi
                    .string()
                    .min(1)
                    .max(500),
            })
            .validate(post);
    }

    /**
     * @param {String} data.id - objectId
     * @param {String} data.fullName
     * @returns
     * @memberof UserValidation
     */
    updateById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
                title: this.Joi
                    .string()
                    .min(1)
                    .max(100)
                    .required(),
                body: this.Joi
                    .string()
                    .min(1)
                    .max(10000)
                    .required(),
                _csrf: this.Joi.string(),
            })
            .validate(data);
    }

    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof PostValidation
     */
    deleteById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
                _csrf: this.Joi.string(),
            })
            .validate(data);
    }
}

module.exports = new PostValidation();
